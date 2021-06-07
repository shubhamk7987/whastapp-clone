import React,{useState,useEffect} from 'react';
import './Sidebar';
//import DonutLargeIcon from "@material-ui/core";
import {Avatar, IconButton} from "@material-ui/core";
//import ChatIcon from "@material-ui/icons/Chat";
//import MoreVertIcon from "@material-ui/icons/MoreVertIcon";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SidebarChat from "./SidebarChats";
import db from './firebase';
import {useStateValue} from "./StateProvider";
import {useParams} from "react-router-dom";

function Sidebar() {
    const [rooms,setRooms] = useState([]);
    const [{user}, dispatch] =useStateValue();
    const {userId} = useParams();
   



    useEffect(()=>{
        const unsubscribe = db.collection("user").doc(userId).collection("rooms").onSnapshot(snapshot=>{
            setRooms(snapshot.docs.map(doc=>
         (
    {
        id: doc.id,
        data: doc.data()
    }
             ) ))
        })

        return ()=>{
            unsubscribe();
        }
    },[userId]);

    return (
        <div className="Sidebar">
    <div className="Sidebar_header">
<Avatar src={user?.photoURL}/>

        <div className="Sidebar_headerRight">
      <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"/></svg>								
       </IconButton>
       <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>								
        </IconButton>
        <IconButton>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17 5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></svg>								
        </IconButton>
        </div>
        
        
    </div>
    <div className="sidebar_search">
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <OutlinedInput notched='true' placeholder="Type any Text" type="text" color="primary"  margin="dense" />
            </div>


        </div>
        <div className="sidebar_chats">
         <SidebarChat addNewChat />
         {
             rooms.map(room=>{
               return  <SidebarChat userId id={room.id}  name={room.data.name}/>
             })

         }
           
        
        </div>
    </div>

        </div>
    );
}

export default Sidebar;

