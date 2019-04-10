import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {Route, Link} from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from "axios";


export class InitializeAgent extends Component {
    state = {
        showPass: false,
        agent_pass: "",
        agent_name: "",
        state_data: "",
    };

    handleShowPass = () => {
        this.setState(state => ({showPass: !state.showPass}))
    };

    handleInitialize = (agent_name, agent_pass) => {
        const init_req = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_walletconnection/1.0/connect',
            name: agent_name,
            passphrase: agent_pass,
        };
        axios.post("http://localhost:8094/ui", init_req).then(res =>{
            console.log(res.data);
            this.setState({
                state_data: res.data
            })
        })
    };

    handleNameChange = (e) => {
        this.setState({agent_name: e.target.value})
    };

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
                            Initialize Wallet
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
                    <Paper style={{width: '100%', maxWidth: '400px'}}>
                        <div>
                            <ListItem style={{paddingTop: 24}}>
                                <ListItemText primary= "Initialize Your Wallet and Agent" style={{/*stylize this title*/}} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<TextField
                                    placeholder="Agent Name"
                                    style={{width: '100%'}}
                                    value={this.state.agent_name}
                                    onChange={(e) => this.handleNameChange(e)}/>}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={<TextField
                                    placeholder="Passphrase"
                                    style={{width: '100%'}}
                                    value={this.state.agent_pass}
                                    onChange={(e) => this.setState({agent_pass: e.target.value})}
                                    type={this.state.showPass ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => this.handleShowPass}>
                                                    {this.state.showPass ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                      }}/>}/>
                            </ListItem>
                            <ListItem>
                                <Button color='primary' component={Link} to={'/agent'} onClick={() => this.handleInitialize(this.state.agent_name, this.state.agent_pass)}>Initialize</Button>
                            </ListItem>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}