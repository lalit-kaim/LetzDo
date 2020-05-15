import React, { Component } from 'react'
import ToDoListContainer from './ToDoListContainer'
import ToDoInput from './ToDoInput'
import { connect } from 'react-redux'


class Today extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             inputVal:'',
             date:''
        }

        this.inputRef=React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onToDoSubmit(this.state.inputVal, this.state.date);
        this.setState({inputVal:''})
        window.scrollTo(0,document.body.clientHeight)
    }
    
    inputHandler = (event) =>{
        this.setState({inputVal:event.target.value})
    }


    inputRef(){
        this.inputRef.current.focusInput()
    }

    componentDidMount(){
        let d = new Date();
        this.setState({date:d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()})
    }

    render(){
        return (
                <div className="container" style={{paddingBottom:'50px'}}>
                    <h4 style={{margin:'0'}}>TODAY</h4>
                    <ToDoListContainer date={this.state.date} usedforrerendering={this.state.inputVal}/>
                    <ToDoInput ref={this.inputRef} submit={this.submitHandler} inputVal={this.state.inputVal} onChange={this.inputHandler}/>
                </div>
            )
        }
    }



const mapDispatchToProps = dispatch =>{
    return {
        onToDoSubmit : (inputVal,date) => dispatch({type:'ADD_TO_TODOZ', todovalue: inputVal, tododate:date})
    }
}


export default  connect(null, mapDispatchToProps)(Today)
