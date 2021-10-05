import React, { Component } from 'react'
import { RiArrowLeftSLine } from 'react-icons/ri';
import { RiArrowRightSLine } from 'react-icons/ri';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import "../Changer/Changer.css"
export default class Changer extends Component {
    

    strGen(value, boln = false) {
        let str = `${(value - 1) * 10}-${value * 10}`;
        return str;
    }

    elementBtn(value) {
        return (
            <div><button className="styler" id={this.strGen(value)} onClick={(e) => {
                this.props.onChanger(this.strGen(value));
            }}>{value}</button></div>
        )
    }

    stringSpliter = (isInc) => {
        let arr = this.props.pageID.split("-");
        let newStr;
        if (isInc && parseInt(arr[1]) <= (this.props.btnNum - 1) * 10) {
            newStr = this.strGen(parseInt(arr[1] / 10) + 1);
            return newStr;

        } else if (!isInc && parseInt(arr[0]) >= 10) {
            newStr = this.strGen(parseInt(arr[1] / 10) - 1);
            return newStr


        } else {
            return this.props.pageID;
        }
    



    }


    listBtn(value) {
        let arr = [];
        for (let i = 1; i < value + 1; i++) {
            let elem = this.elementBtn(i);
            arr.push(elem);
        }
        return arr;
    }

    render() {
        return (
            <div className="main-container">
                <div className="delete-btn">
                    <div>
                        <button onClick={this.props.deleteBtn} className="styler-1">
                            Delete Selected
                        </button>
                    </div>

                </div>
                <div className="container">
                    <div>
                        <button className="styler" onClick={(e) => {
                            this.props.onChanger(this.strGen(1))
                        }}><AiOutlineDoubleLeft /></button>
                    </div>
                    <div><button className="styler" onClick={(e) => {
                        this.props.onChanger(this.stringSpliter(false))
                    }}><RiArrowLeftSLine /></button></div>
                    {this.listBtn(this.props.btnNum)}
                    <div><button className="styler disabled" onClick={(e) => {
                        this.props.onChanger(this.stringSpliter(true))
                    }}><RiArrowRightSLine /></button></div>
                    <div><button className="styler" onClick={(e) => {
                        this.props.onChanger(this.strGen(this.props.btnNum))
                    }}><AiOutlineDoubleRight /></button></div>

                </div>
            </div>
        )
    }
}
