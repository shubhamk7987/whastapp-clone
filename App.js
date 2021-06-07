import React from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./Login";
import {useStateValue} from "./StateProvider";



function App() {
const [{user}, dispatch] = useStateValue();



  return (
    <div className="app">
   {!user ? (
     <Login/>
   ):(
    <div className="app-body">

    <Router>

    <Sidebar  exact path="/user/:userId/rooms/:roomId" />
   <Switch>
   
   
   
  
    
    
      <Route exact strict path="/rooms/:roomId" component={Chat}>
    
    </Route>
    </Switch>
    
 {    // <Route exact strict path={`/users/${user.id}`} component={Sidebar}>
   //  </Route>
}       
      
     </Router>
       
    </div>
       
        
   )}


    </div>

  
  );
}

export default App;
