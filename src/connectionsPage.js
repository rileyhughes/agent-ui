import React, { Component } from 'react';
import {MyPending} from './pendingConnections';
import {MyPairwise} from './pairwiseConnections';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import {TextField} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Route, Link} from 'react-router-dom';


export class MyConnections extends Component {
    state = {
        gen_inv_dialog_open: false,
        rec_inv_dialog_open: false,
        view_hist_dialog_open: false,
        invite_data: {
            data: ""
        },
        rec_inv:"",
    };

    generateInvite = () => {
        const gen_inv = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_connections/1.0/generate_invite',
        };
        console.log("step 1");
        axios.post("http://localhost:8094/ui", gen_inv).then(res =>{
            console.log(res);
            this.setState({
                invite_data: res
            });
        })
    //    add something here that shows you've sent an invite but it hasn't been responded to yet?
    };

    handleReceiveInvite = (inv) => {
        const rec_inv = {
            "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_connections/1.0/receive_invite",
            "label": "",
            "invite": inv,
        };
        axios.post("http://localhost:8094/ui", rec_inv).then(res =>{
            console.log(res);
            this.setState({
                rec_inv_dialog_open: false,
            })
        });
        this.props.onRequestState()
    };

    handlePutInvite = () => {

    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center',}}>
                <Paper style={{maxWidth: '1200px', width: '100%', marginTop: '40px', padding: 40}}>
                    <div style={{marginBottom: '40px', display: 'flex'}}>
                        <Typography variant="headline" color="inherit">
                            All Connections
                        </Typography>
                        <div style={{flexGrow: 1}}></div>
                        <div style={{marginRight: '20px'}}>
                            <Button variant="raised" color="secondary" onClick={() => {
                                this.setState({gen_inv_dialog_open: true});
                                this.generateInvite();
                            }}>
                                Invite
                            </Button>
                        </div>
                        <div>
                            <Button variant="raised" color="secondary" onClick={() => {
                                this.setState({rec_inv_dialog_open: true});
                            }}>
                                Receive
                            </Button>
                        </div>
                    </div>
                    <div style={{width: '100%'}}>
                        <MyPending state_data={this.props.state_data} onRequestState={() => this.props.onRequestState}/>
                    </div>
                    <div style={{width: '100%', marginTop: '20px'}}>
                        <MyPairwise state_data={this.props.state_data} onRequestState={() => this.props.onRequestState}/>
                    </div>
                </Paper>

                {/*generate connection invitation dialog*/}
                <Dialog open={this.state.gen_inv_dialog_open} onClose={() => this.setState({gen_inv_dialog_open: false})}>
                    <DialogTitle>Generated Connection Invitation</DialogTitle>
                    <DialogContent>
                        <ListItem>
                            {/*insert generated connection invitation*/}
                            <ListItemText primary={<TextField value={this.state.invite_data.data.invite} style={{width: '100%'}}/>}/>
                            <ListItemIcon>
                                <CopyToClipboard text={this.state.invite_data.data.invite} onCopy={() =>
                                    this.setState({
                                        gen_inv_dialog_open: false
                                })}>
                                    <IconButton>
                                        <AddIcon/>
                                    </IconButton>
                                </CopyToClipboard>
                            </ListItemIcon>
                        </ListItem>
                    </DialogContent>
                </Dialog>

                {/*receive invitation dialog*/}
                <Dialog open={this.state.rec_inv_dialog_open} onClose={() => this.setState({rec_inv_dialog_open: false})}>
                    <DialogTitle>Receive Invite</DialogTitle>
                    <DialogContent>
                        <ListItem>
                            <ListItemText primary={<TextField placeholder={"Paste connection invite"} style={{width: '100%'}} onChange={(e) => {
                                this.setState({
                                    rec_inv: e.target.value});
                                console.log(e.target.value)
                            }}/>}/>
                            <ListItemIcon>
                                <IconButton onClick={() => {
                                    const inv = this.state.rec_inv;
                                    this.handleReceiveInvite(inv)
                                }}>
                                    <AddIcon/>
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    </DialogContent>
                </Dialog>
            </div>


        )
    }
}
