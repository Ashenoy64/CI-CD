import React from "react";
import "../css/login.css";
import { auth } from "../server";
import parking from "../assets/parking.svg";
import { signInWithEmailAndPassword } from "firebase/auth";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLogin = (e) => {
    e.preventDefault();
    console.log(this.state);
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        console.log(userCredential);
        localStorage.setItem("islogined", true);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="bg-slate-900 w-full mx-auto md:w-auto p-12 my-40 md:my-auto h-4/5 md:h-auto  rounded-xl">
          <div className="text-center text-5xl my-14 font-semibold  text-white mb-12">
            Login
          </div>
          <form
            action=""
            className="flex flex-col gap-5 h-full justify-center"
            onSubmit={this.handleLogin}
          >
            {/* <label className=" mt-2 text-white">Email</label> */}
            <input
              type="email"
              className="mt-2 mx-auto rounded-2xl border-black border-lg h-10 p-2 w-48 md:w-64 text-black"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
              required="required"
            />

            {/* <label className="mt-2 text-white">Password</label> */}
            <input
              type="password"
              className="rounded-2xl mx-auto border-black border-lg h-10 p-2 w-48 text-black md:w-64"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              required="required"
            ></input>

            <input
              type="submit"
              value="Submit"
              className="mt-2 bg-indigo-600 font-semibold text-lg rounded-xl w-48 md:w-64 p-2 mx-auto "
            />
          </form>
          <div className="text-sm text-center my-4 text-white">
            Don't Have a Account? <a className="text-blue-600">Click Here</a>
          </div>
        </div>
        <div className="w-1/2 text-center display p-2 px-4 pr-10">
              <img src={parking} alt="" className="w-full"/>
        </div>
      </div>
    );
  }
}

export default Login;
