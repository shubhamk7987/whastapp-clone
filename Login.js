import React from 'react';
import "./Login.css";
import {Button} from "@material-ui/core";
import {auth,provider } from "./firebase";
import {useStateValue} from "./StateProvider.js";
import {actionTypes} from "./reducer";

function Login() {
const [{}, dispatch] = useStateValue();

const signIn= ()=>{
    auth.signInWithPopup(provider).then(result=>{
       dispatch({
           type: actionTypes.SET_USER,
        user: result.user,       });
    }).catch((error)=>{ alert(error.messege)})

};

    return (
        <div className="login">
          <div className="login_container">
            <img src="https://logo-logos.com/wp-content/uploads/2016/10/WhatsApp_logo_logotype_text.png"
            alt=""/>

            <div className="login_text">
                <h1>Sign in to whatsapp</h1>
            </div>

            <Button type="submit" onClick={signIn} >
               <h3> Sign In with Google</h3>
            </Button>
            </div>
        </div>
    )
}

export default Login
