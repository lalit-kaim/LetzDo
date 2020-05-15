import React, { Component } from 'react'
import classes from './CreateToDo.module.css'


class ToDoInput extends Component {
    constructor(props) {
        super(props)
    
        this.inputRef=React.createRef()
    }

    componentDidMount(){
        this.inputRef.current.focus();
    }
    
    componentDidUpdate(){
            this.inputRef.current.focus();
    }

    render(){
        return (
            <div className={"container "+classes.footer}>
                <form onSubmit={this.props.submit}>
                    <div className="row" style={{display:'flex'}}>
                        <div className="col s10 m10 l10" style={{padding:'0'}}>
                            <div className="input-field">
                                <input id="icon_prefix2" type="text" ref={this.inputRef} onChange={this.props.onChange} value={this.props.inputVal}/>
                                <label >Your LetzDo</label>
                            </div>
                        </div>
                        <div className="col s2 m2 l2" style={{padding:'0', justifyContent:'center', alignSelf:'center'}}>
                            <button className={"btn waves-effect waves-light "+ classes.button} type="submit" name="action">
                                <i className="material-icons">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default ToDoInput

