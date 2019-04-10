import React, { Component } from 'react';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import produce from 'immer';

const styles = theme => ({
  card: {
      width: 350,
      marginBottom: 20,
      marginRight: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

let id = 0;
function createData(Title, Issuer, Description, Details) {
  id += 1;
  return { Title, Issuer, Description, Details, open_menu: false, open_expand: false,};
}

const creds = [
  createData('Drivers License', 'Utah Department of Motor Vehicles', 'this license allows you to drive', '{\n' +
      '  "@context": "https://w3id.org/security/v1",\n' +
      '  "id": "http://example.gov/credentials/3732",\n' +
      '  "type": ["Credential", "ProofOfAgeCredential"],\n' +
      '  "issuer": "https://dmv.example.gov",\n' +
      '  "issued": "2010-01-01",\n' +
      '  "claim": {\n' +
      '    "id": "did:ebfeb1f712ebc6f1c276e12ec21",\n' +
      '    "ageOver": 21\n' +
      '  },\n' +
      '  "revocation": {\n' +
      '    "id": "http://example.gov/revocations/738",\n' +
      '    "type": "SimpleRevocationList2017"\n' +
      '  },\n' +
      '  "signature": {\n' +
      '    "type": "LinkedDataSignature2015",\n' +
      '    "created": "2016-06-18T21:19:10Z",\n' +
      '    "creator": "https://example.com/jdoe/keys/1",\n' +
      '    "domain": "json-ld.org",\n' +
      '    "nonce": "598c63d6",\n' +
      '    "signatureValue": "BavEll0/I1zpYw8XNi1bgVg/sCneO4Jugez8RwDg/+\n' +
      '    MCRVpjOboDoe4SxxKjkCOvKiCHGDvc4krqi6Z1n0UfqzxGfmatCuFibcC1wps\n' +
      '    PRdW+gGsutPTLzvueMWmFhwYmfIFpbBu95t501+rSLHIEuujM/+PXr9Cky6Ed\n' +
      '    +W3JT24="\n' +
      '  }\n' +
      '}'),
  createData('Credit Card', 'Visa',  'this card allows you to borrow money conveniently but expensively', 4.3),
  createData('Something Else', 'another one',  'this does something', 6.0),
  createData('Student Transcript', 'Brigham Young University',  'proof youve taken classes', 4.3),
  createData('Skydiving License', 'Skydiving Authority',  'dont kill yourself', 3.9),
    createData('Skydiving License 2', 'Skydiving Authority',  'dont kill yourself again', 3.9),
];

class MyCredentials extends Component {
    state = {
        expanded: false,
        menu_open: false,
        state_data: {},
        creds:[],
    };

    componentDidMount() {
        const state_req = {
            '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/admin/1.0/state_request'
        };
        axios.post("http://localhost:8094/ui", state_req).then(res =>{
            console.log(res.data);
            this.setState({
                state_data: res.data
            })
        });
        this.setState({creds: creds}, () => {
            console.log(this.state.creds)
        })
    };

    handleExpand = () => {
        this.setState(state => ({expanded: !state.expanded}))
    };

    handleMenu = (i) => {
        this.setState(() => ({
            creds: produce(this.state.creds, (x) => {
                x.push
            }),
        }))
    };

    render() {
        const { classes } = this.props;

        return (
            <div style={{display: 'flex'}}>
                <Paper style={{display: 'flex', flexWrap:'wrap', flexDirection:'row', justifyContent:'flex-start',  maxWidth: '2000px', width: '100%', marginTop: '40px', padding: 40}}>
                    <div style={{display:'flex', width:'100%', marginBottom:'30px'}}>
                        <Typography variant="title" color="inherit">
                            All Credentials
                        </Typography>
                    </div>
                    {this.state.creds.map(cred =>
                        <Card className={classes.card}>
                            <CardHeader
                                action={
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={cred.Title}
                                subheader={cred.Issuer}
                            />

                            {/*insert credential image*/}
                            <CardMedia
                                className={classes.media}
                                image={""}
                            />
                            <CardContent>
                                <Typography>
                                    {cred.Description}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={() => this.handleExpand}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {cred.Details}
                                </CardContent>
                            </Collapse>
                        </Card>
                    )}
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(MyCredentials);
