import React,{useState} from 'react'
import { collection, getDocs,doc, onSnapshot, query, where } from "firebase/firestore";
import{ref} from "firebase/database"
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { useEffect } from 'react';
import {db,database,auth} from "../server"
import { onValue } from 'firebase/database';

export default function Slots(props){
    const [slots,setSlots]=useState('')
    const[loggedIn,setLoggedIn]=useState(false);
    useEffect(()=>{
        
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true);
                const Dref=ref(database,"/UsersData")

            const unsub=onValue(Dref,(doc)=>{
                console.log(doc.val())
           })
            
        }
            else {
                alert("Login")
                window.location.href="/login"
              }
        })

        
    })
    
    return(
        <div>
            <h1>Slots</h1>
            {/* {
                slots && Object.keys(slots).map((slot,i)=>{
                    return(
                        <div key={i}>
                            <h2 style={{color:"white"}}>{slot}</h2>
                            <p style={{color:"white"}}>{slots[slot]}</p>
                        </div>
                    )
                })
            } */}
            <button onClick={()=>{
                 signOut(auth).then(() => {
                    window.location.href="/login"
                  }).catch((error) => {
                    console.log(error)
                  });
            }}>Signout</button>
        </div>
    )
}