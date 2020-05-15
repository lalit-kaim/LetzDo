import React, { Component } from 'react'
import {initialize} from "./Config";
import { connect } from 'react-redux';
import classes from './Login.module.css'
import brand from './brand.svg'
import firebase from 'firebase'


class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             login:true
        }
        this.reff=React.createRef();
    }


    login=(event)=>{
        event.preventDefault();
        initialize.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.props.onLogSign)
            .catch(error => alert(error))
    }
    
    signup=(event)=>{
        event.preventDefault();
        initialize.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.props.onLogSign)
            .catch(error => alert(error))
    }

    inputHandler=(event)=>{
        this.setState({[event.target.name] : event.target.value})
    }

    showSignupButton=()=>{
        this.setState({login:false})
    }

    showLoginupButton=()=>{
        this.setState({login:true})
    }
    
    render() {
        const letzdo ={
            marginTop: '0px',
            marginBottom: '0px',
            color: '#009688'
        }
        let logsign = null;
        let belowlogsign = null
        let term = null
        let resetPassword = null

        const bottomlog={
            position:'absolute',
            width:'100%',
            bottom:'10px',
            textAlign:'center',
            color:'#888888'
        }
        term=(
            <p style={{fontSize:'12px',margin:'0'}}>Terms & Conditions <a href="/terms-conditions" className={classes.term}>Click Here</a></p>
        )
        resetPassword = (
            <p style={{margin:"3px 0 0"}}><a href="/forgot-password" className={classes.forgotPassword}>Forgot Password?</a></p>
        )
        if(this.state.login){
            logsign=(
                <button className="btn waves-effect waves-light" type="submit" onClick={this.login} name="action">Login
                    <i className="material-icons right">send</i>
                </button>
            )
            belowlogsign = (
                <div>
                    <p className="container" style={{marginBottom:"3px"}}>Don't have a LetzDo account <a className={classes.loginanchor} onClick={this.showSignupButton}>Signup</a></p>
                </div>
            )
        }
        else{
            logsign=(
                <button className="btn waves-effect waves-light" type="submit" onClick={this.signup} name="action">Singnup &nbsp;&nbsp;
                    <i className="fas fa-user-plus"></i>
                </button>
            )
            belowlogsign = (
                <div>
                    <p className="container" style={{marginBottom:"3px"}}>Already have an account <a className={classes.loginanchor} onClick={this.showLoginupButton}>Login</a></p>
                </div>
            )
        }
        return (
            <React.Fragment>
            <div className="container" style={{minHeight:window.innerHeight, position:'relative', paddingTop:"20px"}}>
                <div>
                    <h3 style={{margin:'0px 0 10px'}} className={classes.welcome}>Welcome To</h3>
                    <h2 style={{margin:'0 0 0'}} className={classes.kaimletzdo}>Kaim <span className={classes.letzdo}>LetzDo</span></h2>
                    <div className="container"><img src={brand} width="270px"/></div>
                </div>
                <form>
                    <div className="row">
                        <div className="col l6 m6 s12">
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input id="email" name="email" type="email" ref={this.reff} className="validate"  onChange={this.inputHandler} value={this.state.email}/>
                                <label style={{width:"auto"}}>Email</label>
                            </div>
                        </div>
                        <div className="col l6 m6 s12">
                            <div className="input-field">
                                <i className="material-icons prefix">security</i>
                                <input id="password" name="password" type="password" ref={this.reff} className="validate" onChange={this.inputHandler} value={this.state.password}/>
                                <label style={{width:"auto"}}>Password</label>
                            </div>
                        </div>
                        {logsign}
                        {resetPassword}
                    </div>
                </form> 
                {belowlogsign}
                {term}
                <p  style={bottomlog}><span>&copy; 2020-Present Lalit, All rights reserved.</span></p>
            </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogSign : ()=>dispatch({type:'LOGIN'})
    }
}

export default connect(null, mapDispatchToProps)(Login)
