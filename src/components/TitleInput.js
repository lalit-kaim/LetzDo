import React, { Component } from 'react'
import { connect } from 'react-redux'

class TitleInput extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title:''
        }
    }

    inputTitleHandler = (event) => {
        this.setState({title:event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onTitleSubmit(this.state.title, this.props.titledate);
        this.props.temp();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input value={this.state.title} onChange={this.inputTitleHandler} placeholder="Name The Day..."/>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onTitleSubmit : (title, titledate) => dispatch({type:'ADD_TITLE', mytitle:title, titledate:titledate})
    }
}

export default connect(null, mapDispatchToProps)(TitleInput)
