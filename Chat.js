import { Avatar, IconButton } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import "./Chat.css";
import {useParams} from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import {useStateValue} from "./StateProvider";


function Chat(){

   const [input, setInput] = useState('');
  const {roomId} = useParams();
  
const [roomName,setRoomName] = useState("");
const [messeges, setMesseges]= useState([]);
const [{user}, dispatch] = useStateValue();


useEffect(()=>{
      
    if(roomId){
    db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
            setRoomName(snapshot.data().name);

            db.collection('rooms').doc(roomId).collection('messeges').orderBy("timestamp","asc").onSnapshot(
                snapshot=>{
                    setMesseges(snapshot.docs.map(doc=> doc.data()));
                }
            )
        });
       
    }
    
    
},[roomId,roomName])

const sendMessege=((e)=>{
e.preventDefault();
console.log("you typed >>>", input);

db.collection('rooms').doc(roomId).collection('messeges').add({
    messege: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
setInput('');

})



    return <div className="Chat">
        <div className="chat_header">
<Avatar/>
<div className="chat_headerInfo">
<h3>{roomName}</h3>
<p>last seen {new Date(messeges[messeges.length-1]?.timestamp?.toDate()).toUTCString()}</p>
    </div>

<div className="chat_headerRight">
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>								
</IconButton>
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg>								
</IconButton>
<IconButton>
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17 5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></svg>								
</IconButton>

</div>
</div>

<div className="chat_body">
{
    messeges.map(messege=>(
<p className={`chat_messege ${messege.name === user.displayName && "chat_receiver"}`}>
   
   <span className="chat_name">{messege.name}</span>
   
  {messege.messege}

<span className="chat_timestamp" >
   {new Date(messege.timestamp?.toDate()).toUTCString()}</span>


   </p>
    )

    )
}





 


</div>

<div className="chat_footer">

<form>
<input value={input}   onChange={(e)=> setInput(e.target.value)} placeholder="type a text" type="text"  />
    <button type="submit"  onClick={sendMessege}>
        send a messege</button>
</form>
 


</div>

</div>
}

export default Chat;

