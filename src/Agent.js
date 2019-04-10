import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {Route, Link} from 'react-router-dom';
import {MyConnections} from './connectionsPage';
import MyCredentials from './credentialsPage';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';



export class Agent extends Component {
    state = {
        state_data: {}
    };
    componentDidMount() {
        console.log(this.props, "props");
        console.log(this.props)
    }

    render() {
        return (
            <div style={{flexGrow: 1}}>
                {/* The AppBar */}
                <AppBar position="static">
                    <Toolbar>
                        {/* insert logo here */}
                        <Button component={Link} to={'/agent/connections'} style={{color: 'white'}}>Connections</Button>
                        <Button component={Link} to={'/agent/credentials'} style={{color: 'white'}}>Credentials</Button>
                        <div style={{flexGrow: 1}}></div>
                        <Button component={Link} to={'/agent'} style={{color: 'white'}}>{this.props.state_data.agent_name}</Button>
                    </Toolbar>
                </AppBar>

                {/* Connections page */}
                <Route path={'/agent/connections'} render={routeProps => {
                    return (
                            <MyConnections {...routeProps} state_data={this.props.state_data} onRequestState={() => this.props.onRequestState}/>
                    )
                }}/>

                {/* Credentials page */}
                <Route path={'/agent/credentials'} render={routeProps => {
                    return (
                        //notice there is no display:flex in the div below, thus the different formatting...
                        <div style={{width: '100%', maxWidth: '1200px', marginRight: '50px', marginLeft: '50px',  justifyContent: 'center'}}>
                            <MyCredentials {...routeProps} state_data={this.props.state_data} onRequestState={() => this.props.onRequestState}/>
                        </div>
                    )
                }}/>

                {/* generic page */}
                <Route exact path={'/agent'} render={routeProps => {
                    return (
                        <div style={{width: '100%', maxWidth: '1200px', marginRight: '50px', marginLeft: '50px', display: 'flex', justifyContent: 'center'}}>
                            <Paper style={{display: 'flex', justifyContent:'center',  maxWidth: '600px', width: '100%', marginTop: '40px', padding: 40}}>
                                <div style={{display:'flex', width:'100%'}}>
                                    <Typography variant="title" color="inherit">
                                        Please follow a link in the upper-left corner to view your wallet.
                                    </Typography>
                                </div>
                            </Paper>
                        </div>
                    )
                }}/>



                {/*view history dialog*/}
                <Dialog open={this.state.view_hist_dialog_open} onClose={() => this.setState({view_hist_dialog_open: false})}>
                    <DialogTitle>History</DialogTitle>
                    <DialogContent>
                        <ListItem>
                            {/*insert generated connection invitation*/}
                            <ListItemText />
                            <ListItemIcon>
                                <IconButton onClick={() => this.function()}>
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