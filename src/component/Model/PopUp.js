import React, { Component } from "react";
import "../Model/PopUp.css"

export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    data={name:"", email:"", role:""};

    textChange=(e)=>{
        if(e.target.name==="name"){
            this.data.name=e.target.value;
        }

        if(e.target.name==="email"){
            this.data.email=e.target.value;
        }

        if(e.target.name==="role"){
            this.data.role=e.target.value;
        }


    }

    submitBtn=(e)=>{
        e.preventDefault();
        this.props.editElement(this.props.elementId, this.data);
        this.props.toggle()
    }
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <form className="form">
                        <label for="name">Name:</label><br />
                        <input type="text" onChange={this.textChange} className="text" id="name" name="name"></input><br />
                        <label for="email">Email:</label><br />
                        <input type="text" onChange={this.textChange} className="text" id="email" name="email"></input><br />
                        <label for="role">Role:</label><br />
                        <input type="text" id="role" onChange={this.textChange} className="text" name="role"></input><br />
                        <input type="submit" onClick={this.submitBtn} value="Submit"></input>
                    </form>

                </div>
            </div>
        );
    }
}