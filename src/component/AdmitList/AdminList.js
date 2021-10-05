import React, { Component } from 'react'
import "../AdmitList/AdminList.css"
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import PopUp from "../Model/PopUp"
export default class AdminList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seen: false,
            elementID: ""
        };

    }

    togglePop = (e = null) => {
        if (e != null) {
            let id = e.currentTarget.parentNode.id;
            this.setState({
                seen: !this.state.seen,
                elementID: id,
            });
        } else {
            this.setState({
                seen: !this.state.seen,
            })
        }

    };

        getElement(element) {
            return (
                <>
                    <tr>
                        <td><input name="check" type="checkbox" onChange={(e) => {
                            this.props.clicked(e);
                        }}></input></td>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                        <td id={element.id}><button onClick={this.props.deleteElement} className="delElem"><RiDeleteBin7Line /> </button> <button className="edit" onClick={this.togglePop}><FiEdit /></button></td>
                    </tr>


                </>

            )
        }
        render() {
            return (
                <div>
                    <div>
                        <table>
                            <tr>
                                <th><input type="checkbox" onChange={this.props.AllCheck} id="checkHead" ></input></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            {this.props.data.map((element) => {
                                return this.getElement(element)
                            })}
                        </table>
                        {this.state.seen ? <PopUp elementId={this.state.elementID} editElement={this.props.editElement} toggle={this.togglePop} /> : null}
                    </div>
                </div>
            )
        }
    }
