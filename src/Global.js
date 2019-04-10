import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import {InitializeAgent} from "./frontPage";
import {Agent} from "./Agent";
import axios from "axios";



export class Global extends Component {
    state = {
        state_data: {},
    };

    componentDidMount() {
        this.stateRequest()
    }

    stateRequest = () => {
        const state_req = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin/1.0/state_request'
        };
        axios.post("http://localhost:8094/ui", state_req).then(res =>{
            console.log(res.data);
            console.log("hello");
            this.setState({
                state_data: res.data,
            });
        })
    };


    render() {
        const check = Object.entries(this.state.state_data).length === 0 && this.state.state_data.constructor === Object ? false : true;
        return (
            <div>
                {check &&
                <div>
                    <Route exact path={"/"} render={routeProps => {
                        return (
                            <InitializeAgent {...routeProps} state_data={this.state.state_data} onRequestState={() => this.stateRequest()}/>
                        )
                    }}/>
                    <Route path={"/agent"} render={routeProps => {
                        return (
                            <Agent {...routeProps} state_data={this.state.state_data} onRequestState={() => this.stateRequest()}/>
                        )
                    }}/>

                </div>}
            </div>
        )
    }
}