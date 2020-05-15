import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from "firebase";
import {initialize} from './Config'
import classes from './ToDoListContainer.module.css';

const tododiv= {
    border:'1px solid #ccc',
    padding:'6px',
    paddingTop:'11px',
    marginBottom : '5px'
}

const style ={
    fontSize:'20px'
}

const todolistcontainer= {
    textAlign:'left',
    marginBottom:'120px'
}

const deletebutton= {
    float:'right',
    color:'#e87654',
    cursor:'pointer'
}

let firstTime = true

class ToDoListContainer extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             Conttodo:  []
        }
    }
    
    componentWillMount(){
        this.setState({});
    }

    sample = (index) => {
        this.props.deleteItem(this.props.date, index)
        this.forceUpdate();
    }

    componentDidMount(){
        const refr = firebase.database().ref('letzdo/'+initialize.auth().currentUser.uid);
        refr.once('value').then(snapshot => {
            if(snapshot.val())
                this.setState({Conttodo:[...snapshot.val().todoRoot]})
        });
    }

    render(){
        if(this.state.Conttodo.length===0 && firstTime && this.props.todoRoot.length===0){
            return <div className={classes.loader}></div>
        }

        if(this.props.todoRoot.length===0 && firstTime){

            const Contfound = this.state.Conttodo.find((el)=>{
                return el.date===this.props.date;
            });
            let ContfoundIndex = this.state.Conttodo.indexOf(Contfound);
    
    
            if(ContfoundIndex===-1){
                return <div></div>
            }

            return (
                    <div style={todolistcontainer}>
                        <h4 className="animated fadeIn" style={{color:'#e87654'}} >{this.state.Conttodo[ContfoundIndex].mytitle}</h4>
                        {this.state.Conttodo[ContfoundIndex].todoList.map((todo, index )=> {
                            return (
                                <div key={index} style={tododiv} className="row"  className="row animated fadeInUp">
                                    <div className="col l11 m11 s11">
                                        <label>
                                            <input type="checkbox" className="filled-in" value={index}/>
                                            <span style={style}>{todo}</span>
                                        </label>
                                    </div>
                                    <div className="col l1 m1 s1">
                                        <span style={deletebutton} onClick={()=>this.sample(index)}>
                                            <i className="material-icons">delete</i>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        else{

            firstTime = false

            const found = this.props.todoRoot.find((el)=>{
                return el.date===this.props.date;
            });
            let foundIndex = this.props.todoRoot.indexOf(found);
            
            if(foundIndex===-1){
                return <div></div>
            }

            return (
                <div style={todolistcontainer}>
                    <h4  className="animated fadeIn" style={{color:'#e87654'}}>{this.props.todoRoot[foundIndex].mytitle}</h4>
                    {this.props.todoRoot[foundIndex].todoList.map((todo, index )=> {
                        return (
                            <div key={index} style={tododiv} className="row animated fadeInUp" >
                                <div className="col l11 m11 s11">
                                    <label>
                                        <input type="checkbox" className="filled-in" value={index}/>
                                        <span style={style}>{todo}</span>
                                    </label>
                                </div>
                                <div className="col l1 m1 s1">
                                    <span style={deletebutton} onClick={()=>this.sample(index)}><i className="material-icons">delete</i></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        todoRoot : state.todoRoot
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem : (date, index) => dispatch({type:'DELETE_FROM_TODOZ', deleteDate:date, deleteIndex:index})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoListContainer)

