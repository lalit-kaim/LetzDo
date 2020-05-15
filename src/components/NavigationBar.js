import React, { Component } from 'react'
import classes from './NavigationBar.module.css'
import { NavLink } from 'react-router-dom';
import {initialize} from './Config'
import { connect } from 'react-redux';
import firebase from 'firebase'




class NavigationBar extends Component{

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenavouter").style.width = "100%";
    }
      
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenavouter").style.width = "0%";
    
    }
    
    logout=()=>{
        localStorage.removeItem('localstate')
        localStorage.removeItem('user')
        this.props.onLogOut();
        initialize.auth().signOut()
        window.location.reload()
        window.location.href ='/' 
    }



    render(){
        const nav= (
            <div>
                <div id="mySidenav" className={classes.sidenav}>
                    <label  className={classes.closebtn} onClick={this.closeNav}>&times;</label>
                    <NavLink to="/">Today</NavLink>
                    <NavLink to="/upcoming" >Upcoming</NavLink>
                    <a onClick={this.logout}>Logout</a>
                </div>
                <div onClick={this.closeNav} className={classes.sidenavouter} id="mySidenavouter">
                </div>
            </div>
        )

        return (
            <div className="container-fluid">
                <div className="row" style={{margin:'0'}}>
                    <span className={classes.navLogo} style={{fontSize:'30px',cursor:'pointer'}} onClick={this.openNav}>&#9776;</span>
                    <h2 className={classes.title}>LetzDo</h2>
                    <hr/>
                    {nav}
                </div>
            </div>
        )
    }
    
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogOut : () => dispatch({type:'LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(NavigationBar)
