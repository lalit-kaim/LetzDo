import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar'
import Today from './components/Today';
import {Redirect, Route, Switch } from 'react-router-dom';
import Upcoming from './components/Upcoming';
import Login from './components/Login';
import {initialize} from "./components/Config";
import { Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './components/reducer'
import PageNotFound from './components/PageNotFound';
import TermCondition from './components/TermCondition';
import firebase from 'firebase'
import forgotPassword from './components/forgotPassword';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user:null
    }
  }
  


  componentDidMount(){
    this.authListener();
  }

  authListener=()=>{
    initialize.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user:user})
      }
      else{
        this.setState({user:null})
      }
    })
  }



  render(){
    let afterAuth = null

    if(this.state.user){
        afterAuth =(
          <Provider store={store}>
            <React.Fragment>
              <NavigationBar/>
              <Switch>
                <Route path="/" exact component={Today}/>
                <Route path="/upcoming" component={Upcoming}/>
                <Route path="*" exact component={PageNotFound}/>
              </Switch>
            </React.Fragment>
          </Provider>
        )
    }
    else if(!localStorage.getItem('user')){
      afterAuth =(
        <Provider store={store}>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/terms-conditions" component={TermCondition}/>
            <Route path="/forgot-password" component={forgotPassword}/>
            <Route path="*" exact component={PageNotFound}/>
          </Switch>
        </Provider>
      )
    }
    return (
      <React.Fragment>
        {afterAuth}
      </React.Fragment>
    )
  }
  
}

export default App;
