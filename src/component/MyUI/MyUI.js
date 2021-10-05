import React, { Component } from 'react'
import AdminList from '../AdmitList/AdminList.js'
import Changer from '../Changer/Changer.js'
import "../MyUI/MyUI.css"
import { getData } from '../Logic/Logic.js'
export default class MyUI extends Component {

    constructor(props) {
        super(props)

        this.debounceTimeout = 0;
        this.checker = [];
        this.isBox=false;
        this.state = {
            filtered_data: [],
            pageID: "0-10",
            btnNum: 5,
            data: [],
            isChecked: false,
            isBox:false,
        }
    }


    async getdatas() {
        let data = await getData();
        return await data;
    }

    changeRow(id) {
        let arrId = id.split("-");
        let value = this.state.data.slice(parseInt(arrId[0]), parseInt(arrId[1]));
        this.setState({ filtered_data: value });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageID !== this.state.pageID) {
            this.changeRow(this.state.pageID);
        } else {
            if (prevState.data.length !== this.state.data.length) {
                this.changeRow(this.state.pageID);
            }
        }
    }

    componentDidMount() {
        this.getdatas().then((Response) => {

            this.AllData = [...Response]
            this.setState({ data: this.AllData }, () => {
                this.changeRow(this.state.pageID);
                this.BtnStateChanger(this.state.pageID)
            })

        }).catch(err => {
            return null;
        });


    }

    inChanger(e) {
        this.setState({ pageID: "0-10" })
        let filt = this.AllData.filter((elem) => {
            if ((elem.name).search(e.target.value) !== -1 || (elem.role).search(e.target.value) !== -1 || (elem.email).search(e.target.value) !== -1) {
                return true;
            }
            return false;
        })

        this.setState({ data: filt });

        let len = (this.state.data).length / 10;
        this.setState({ btnNum: Math.ceil(len) })
    }

    debounceSearch = (event) => {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this.inChanger(event);
        }, 1000);
    }

    deleteFxn = () => {
        let filt = this.AllData.filter((elem) => {
            if (this.isBox) {
                for (let x of this.state.filtered_data) {
                    if (elem.id === x.id) {
                        return false;
                    }
                }
                return true;
            } else {
                for (let x of this.checker) {

                    if (elem.id === x) {

                        return false;
                    }
                }
                return true;
            }

        })
        this.isBox = false;
        var boxHead = document.getElementById("checkHead");
        boxHead.checked = false;
        var checkboxes = document.getElementsByName('check')
        checkboxes.forEach((item) => {
            item.checked = false;
        })

        this.AllData = [...filt];
        this.setState({ data: filt, isChecked: false }, () => {
            let len = (this.state.data).length / 10;
            this.setState({ btnNum: Math.ceil(len) })
            this.changeRow(this.state.pageID)
        });
    }

    clicker = (e) => {
        if (e.target.checked) {
            let ex=(e.target.id).charCodeAt(0)-96;
            this.checker.push(""+ex);

        }

    }

    AllCheck = (e) => {
        this.isBox = true;
        if (e.target.checked) {
            var checkboxes = document.getElementsByName('check')
            checkboxes.forEach((item) => {
                item.checked = true;
            })
        } else {
            var checkboxes = document.getElementsByName('check')
            checkboxes.forEach((item) => {
                item.checked = false;
                e.target.checked = false;
            })
        }
    }

    BtnStateChanger = (value) => {
        let elem = document.getElementById(value);
        elem.focus();
    }

    deleteElement=(e)=>{
        let id=e.currentTarget.parentNode.id;
        let filt=this.AllData.filter((elem)=>{
            
            if(elem.id===id){
                return false;
            }
            return true;
        });
        this.AllData=[...filt];
        this.setState({data:filt});
    }

    editElement=(id, data)=>{
        let elem=this.AllData.find((element)=>{
            if(element.id===id){
                return true;
            }
            return false;
        })
        if(!!data.name){
            elem.name=data.name;
        }

        if(!!data.email){
            elem.email=data.email;
        }

        if(!!data.role){
            elem.role=data.role;
        }
        
        
        
        this.setState({data:this.AllData});
    }



    render() {
        return (
            <div>
                <div className="parent">
                    <div className="search">
                        <input className="input" onChange={(event) => {
                            this.debounceSearch(event);
                        }} placeholder="Search by name email or role"></input>
                    </div>
                    <div className="list">
                        <AdminList clicked={this.clicker} editElement={this.editElement} deleteElement={this.deleteElement} AllCheck={this.AllCheck} data={this.state.filtered_data} />
                    </div>

                    <div className="changer">
                        <Changer deleteBtn={this.deleteFxn} btnNum={this.state.btnNum} pageID={this.state.pageID} onChanger={(value) => {
                            this.BtnStateChanger(value)
                            this.setState({ pageID: value })
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
