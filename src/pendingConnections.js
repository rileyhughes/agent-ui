import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

export class MyPending extends Component {
    state = {
        state_data: {},
        history_dialog_open: false,
        history_content: "",
        table_rows: [
            {Key: "", Title: "", Status: "", History: "", Actions: ""}
        ],
    };

    componentDidMount() {
        const state_req = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin/1.0/state_request'
        };
        axios.post("http://localhost:8094/ui", state_req).then(res =>{
            console.log(res.data);
            console.log("^^state");
            console.log();
            this.setState({
                state_data: res.data,
            });
        });
    };

    handleHistory(content) {
        this.setState({
            history_content: content,
            history_dialog_open: true
        });
    };

    handleRequest(conn_key) {
        const conn_req = {
            "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_connections/1.0/send_request",
            "connection_key": conn_key,
        }
        axios.post("http://localhost:8094/ui", conn_req).then( res => {
            console.log("quest sent");
            console.log(res)
        })
    };

    handleRespond(conn_key) {
        const conn_res = {
            "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_connections/1.0/send_response",
            "connection_key": conn_key,
        }
        axios.post("http://localhost:8094/ui", conn_res).then( res => {
            console.log("response sent");
            console.log(res)
        })
    };




    render() {
        const table_rows = Object.entries(this.state.state_data).length === 0 && this.state.state_data.constructor === Object ? [] : this.state.state_data.content.invitations;
        console.log(table_rows, " pending table rows");
        return (
            <div style={{display: 'flex', justifyContent: 'center', width:'100%', }}>
                <Paper style={{width: '100%', flexGrow: 1}}>
                    <div style={{padding: 24}}>
                        <Typography variant="title" color="inherit">
                            Pending Connections
                        </Typography>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>History</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table_rows.map(row =>(
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.connection_key}</TableCell>
                                    <TableCell align="right">{row.label}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="raised" color="primary" onClick={() => {
                                            const history_content = row.history;
                                            this.handleHistory(history_content)
                                        }}>
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.status === "Invite Received"
                                            ? <Button variant="raised" color="primary" onClick={() => {
                                                const conn_key = row.connection_key;
                                                this.handleRequest(conn_key);
                                            }}>
                                                Request
                                            </Button>
                                            : [(row.status === "Request Sent"
                                                    ? ""
                                                    :<Button variant="raised" color="primary" onClick={() => {
                                                        const conn_key = row.connection_key;
                                                        this.handleRespond(conn_key);
                                                    }}>
                                                        Respond
                                                    </Button>
                                            )]
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </Paper>

                {/*view history dialog*/}
                <Dialog open={this.state.history_dialog_open} onClose={() => this.setState({history_dialog_open: false})}>
                    <DialogTitle>History</DialogTitle>
                    <DialogContent>
                        <div style={{padding: 10}}>
                            {this.state.history_content}
                        </div>
                    </DialogContent>
                </Dialog>


            </div>
        )
    }
}




