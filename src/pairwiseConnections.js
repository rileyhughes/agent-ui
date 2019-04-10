import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/es/Typography/Typography";
import axios from "axios";
import {Route, Link} from 'react-router-dom';



export class MyPairwise extends Component {
    state = {
        state_data: {},
        table_rows: [
            {Name: "", tDID: "", Result: ""}
        ],
    };

    componentDidMount() {
        this.stateRequest()
    };

    stateRequest = () => {
        const state_req = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin/1.0/state_request'
        };

        axios.post("http://localhost:8094/ui", state_req).then(res =>{
            console.log(res.data);
            this.setState({
                state_data: res.data
            })
        })
    };

    handleTrustPing(their_did) {
        const ping = {
            "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin_trustping/1.0/send_trustping",
            "to": their_did,
        }

    }

    render() {
        const table_rows = Object.entries(this.state.state_data).length === 0 && this.state.state_data.constructor === Object ? [] : this.state.state_data.content.pairwise_connections;
        console.log(table_rows, " pairwise table rows");
        return (
            <div style={{display: 'flex', justifyContent: 'center', width:'100%', }}>
                <Paper style={{width: '100px', flexGrow: 1}}>
                    <div style={{padding: 24}}>
                        <Typography variant="title" color="inherit">
                            Pairwise Connections
                        </Typography>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Their DID</TableCell>
                                <TableCell>Trust Ping</TableCell>
                                <TableCell>Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table_rows.map(row =>(
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.metadata.label}</TableCell>
                                    <TableCell align="right">{row.their_did}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="raised" color="primary" onClick={() => {
                                            const their_did = row.their_did;
                                            this.handleTrustPing(their_did);
                                        }}>
                                            Ping
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </Paper>
            </div>
        )
    }
}