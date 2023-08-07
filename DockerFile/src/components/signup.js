import React from "react";
import parking from "../assets/parking.svg"
import "../css/login.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../server"


class SignUp extends React.Component{

    constructor() 
    {
        super();
        this.state={
            email:"",
            password:"",
            confirmPassword:"",
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password.length<=6)
        {
          alert("Password Must Be Length 7 or more")
        }
        else if(this.state.password!==this.state.confirmPassword)
        {
          alert("Passwords Doesnt Match")
        }
        else{
        createUserWithEmailAndPassword(auth,this.state.email,this.state.password)
        .then((userCredential)=>{window.location.href="/login"}).catch(err=>console.log(err));
        }
      }
    render() {
        return (
          <div className="flex flex-col md:flex-row md:justify-evenly">
          <div className=" bg-slate-900  w-full mx-auto  md:w-auto md:m-auto p-12 my-40 md:my-auto h-4/5 md:h-auto  rounded-xl">
            <div className="text-center text-5xl my-14 font-semibold text-white mb-12">SignUp</div>
            <form action="" className="flex flex-col gap-5 h-full justify-center" onSubmit={this.handleSubmit}>
              {/* <label>Email</label> */}
              <input type="email" className="mt-2  mx-auto rounded-2xl h-10 p-2 w-48 text-black md:w-64 border-black border-lg" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Email" required="required"/>
    
              {/* <label>Password</label> */}
              <input type="password" className=" mx-auto rounded-2xl h-10 p-2 w-48 md:w-64 border-black border-lg" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Password" required="required"></input>

              {/* <label>Confirm Password</label> */}
              <input type="password" className="mx-auto rounded-2xl h-10 p-2 w-48 md:w-64 border-black border-lg" onChange={(e)=>{this.setState({confirmPassword:e.target.value})}} placeholder="Confirm Password" required="required"></input>
            
            <input type="submit" value="Submit" className="mt-2 bg-indigo-600 font-semibold text-lg rounded-xl w-48  md:w-64 p-2 mx-auto " />
            </form>
            <div className="text-sm text-center my-4 text-white" >Already Have a Account? <a className="text-blue-600">Click Here</a></div>
          </div>
            <div className="w-1/2 text-center display p-2 px-4 pr-10">
              <img src={parking} alt="" className="w-full" />
            </div>
          </div>
        );
        }
}

export default SignUp;