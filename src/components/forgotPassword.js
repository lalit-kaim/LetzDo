import React from 'react'
import firebase from 'firebase'
import {initialize} from './Config'

function sendEmail(){
    console.log(document.getElementById('myEmail').value)
    const auth = initialize.auth();
    const email = document.getElementById('myEmail').value
    auth.sendPasswordResetEmail(email)
    .then(function(res){
        alert("A password reset link has been sent to your email address");
        window.location.href="/";
    })
    .catch(function(error){
        alert(error.message)
    })
}

function forgotPassword() {
    return (
        <div className="container">
            <h3 style={{position:"relative", zIndex:"100", color:"#009688"}}>LetzDo</h3>
            <video style={{position:"fixed",left:"0", top:"0", minHeight:"100%", minWidth:"100%"}} autoPlay loop muted src="https://assets.mixkit.co/videos/preview/mixkit-a-white-cat-sits-in-front-of-a-white-wall-1535-large.mp4"/>
            <div className="card" style={{background:"none",width:"inherit",margin:"auto", padding:"20px 5px", position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}}>
                <h3>Forgot Your Password?</h3>
                <p style={{fontSize:"16px"}}>Please enter the email address for your account. A verification email will be sent to you. Once you have received the verification email. You will be able to create a new password for your account.</p>
                <div className="row" style={{display:"flex", justifyContent:"center"}}>
                    <div className="input-field col l6 m6 s12" style={{margin:"auto"}}>
                        <input id="myEmail" type="email" className="validate " style={{color:"white"}}/>
                        <label style={{width:"auto", color:"rgb(38, 166, 154)"}}>Type Your Email...</label>
                    </div>
                </div>
                <button onClick={sendEmail} className="btn waves-effect waves-light">Send Email <i className="material-icons right">send</i></button>
                <br/>
                <a style={{margin:"10px 0", display:"block", color:"white"}} href="/">Back</a>
            </div>
        </div>
    )
}

export default forgotPassword
