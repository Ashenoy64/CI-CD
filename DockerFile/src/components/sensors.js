import React from "react";
import SensorComponent from "./sensorsComponent";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database, auth, db } from "../server";
import { connectFirestoreEmulator, doc, setDoc } from "firebase/firestore";

class Sensors extends React.Component {
  constructor() {
    super();
    this.state = {
      sensors: [],
      username: "",
      component: "register",
      regNo: "",
      designation: "",
      regUser: "",
    };
  }
  componentDidMount() {
    let uid;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        console.log(user);
        this.setState({ username: user.email });
        const databaseRef = ref(database, "/UsersData/" + uid + "/readings");
        onValue(databaseRef, (data) => {
          this.changeValue(data.val());
        });
      } else {
        window.location.href = "/login";
      }
    });
  }
  logout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  changeValue = (data) => {
    // console.log(data)
    let arr = [];
    for (var i in data) {
      if (typeof data[i] == "object") arr.push(data[i]);
    }
    let sensor = arr.map(({ name, percentage, status }, i) => {
      return (
        <SensorComponent key={i} name={name} percentage={90} status={status} />
      );
    });
    this.setState({ sensors: sensor });
  };

  handleRegistration = async(e) => {
    let registartionNumber = this.state.regNo.replace("-", "");
    registartionNumber = registartionNumber.replace(" ", "");
    registartionNumber = registartionNumber.toUpperCase();
    let regName = this.state.regUser;
    let designation = this.state.designation;

    if (registartionNumber && regName && designation) {
      console.log("Suceess");
      e.preventDefault();
      console.log(registartionNumber.replace('-', ''));
      this.setState({ regName: "", regNo: "", designation: "" });

      // Add a new document in collection "cities"
      await setDoc(doc(db,"RegisteredCars",designation),{
          [registartionNumber]: regName,
        },{ merge: true })
    } else {
      e.preventDefault();
      console.log("Data is incorrect");
    }
  };

  render() {
    return (
      <>
        <div className="flex flex-row w-full md:w-full justify-between bg-slate-300">
          <span
            onClick={() => {
              this.setState({ component: "home" });
            }}
            className="p-2 w-44 md:p-4 text-md md:text-xl font-semibold my-auto"
          >
            Smart Parking
          </span>
          <ul className="flex flex-row p-2">
            <li className="text-lg font-semibold p-4 display">
              {this.state.username}
            </li>
            <li>
              <button
                onClick={() => {
                  this.setState({ component: "register" });
                }}
                className="p-4 md:p-4 rounded-xl md:mx-3 w-auto md:w-24 h-auto md:h-14 bg-slate-500"
              >
                Register User
              </button>
            </li>
            <li>
              <button
                onClick={this.logout}
                className="p-4 md:p-4 rounded-xl md:mx-3 w-auto md:w-24 h-auto md:h-14 bg-slate-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {this.state.component == "home" && (
          <div className="rounded-lg flex flex-col gap-5 md:flex-row justify-items-center md:justify-evenly bg-slate-900 w-full md:w-1/2 mx-auto my-44 px-28 py-12 md:p-12">
            {this.state.sensors}
          </div>
        )}

        {this.state.component == "register" && (
          <div className="w-1/2 mx-auto p-12">
            <form
              className="flex flex-col justify-between gap-5 px-auto"
              onSubmit={this.handleRegistration}
            >
              <input
                type="text"
                className="mx-auto rounded-2xl border-black border-lg h-10 p-2 w-1/2 md:w-1/2 text-black"
                onChange={(e) => {
                  this.setState({ regNo: e.target.value });
                }}
                required="required"
                placeholder="Registered Vehicle Number"
              />

              <input
                type="text"
                className=" mx-auto rounded-2xl border-black border-lg h-10 p-2 w-1/2 md:w-1/2 text-black"
                onChange={(e) => {
                  this.setState({ regUser: e.target.value });
                }}
                placeholder="Registered Name"
              />

              <input
                type="text"
                className=" mx-auto rounded-2xl border-black border-lg h-10 p-2 w-1/2 md:w-1/2 text-black"
                onChange={(e) => {
                  this.setState({ designation: e.target.value });
                }}
                required="required"
                placeholder="Designation"
              />

              <input
                type="submit"
                value="Submit"
                className="mt-2 bg-indigo-600 font-semibold text-lg rounded-xl w-48 md:w-64 p-2 mx-auto "
              />
            </form>
          </div>
        )}
      </>
    );
  }
}

// function Sensors(props)
// {
//   return (
//     <div className="flex flex-col gap-5 md:flex-row justify-items-center md:justify-evenly bg-lime-200 w-full md:w-1/2 mx-auto px-28 py-12 md:p-12">
//       {/* {this.state.sensors.map((obj,i)=><SensorComponent key={i} compObj={obj}/>)} */}
//       {this.state.sensors}
//     </div>
// }

export default Sensors;
