import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from './firebase.js';

import "./SidebarChats.css";
import {Link} from "react-router-dom";
import {useStateValue} from "./StateProvider";







function SidebarChats({id, name,addNewChat, userId}) {

    const createChat = ()=>{
        const roomName= prompt("Please enter name for chat");
        if(roomName){
            //do some stuff..
    db.collection("user").doc(userId).collection('rooms').add({
        name: roomName
    })
        }
    };

    
    const [{user}, dispatch] = useStateValue();

const [messeges,setMesseges] = useState("");

useEffect(()=>{
    if(id){
        db.collection('rooms').doc(id).collection('messeges').orderBy("timestamp",'desc').onSnapshot(
            snapshot=> setMesseges(snapshot.docs.map(doc=> doc.data()))
        );
    }
},[id]);


    return !addNewChat ? (
        <Link to={`user/${user.id}/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
               <h2>{name}</h2>
               <p>{messeges[0]?.messege}</p> 
            </div>
        </div>
        </Link>
    )
    :(
        <Link to={`user/${user.id}/rooms/${id}`}>
        <div onClick={createChat} className="sidebarChat">
        <h2>Add new chat</h2>
        </div>
        </Link>
    );
   
}

export default SidebarChats
