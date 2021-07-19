import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

//

let Web3 = require('web3');

let abi = JSON.parse('[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"uint256","name":"n","type":"uint256"},{"internalType":"string","name":"t","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]');
let address = "0xa25842C2c4532B6e5aa1A3A3B04C15D3911b4c8f";

//

class DataForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSet = this.handleSet.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    async handleSet(event) {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed')
            const web3 = new Web3(window.ethereum);
            let sender = await window.ethereum.request({ method: 'eth_requestAccounts' })
            sender = web3.utils.toChecksumAddress(sender[0]);
            const contract = new web3.eth.Contract(abi, address);
            await contract.methods.set(this.state.num, this.state.text).send({ 'to': address, 'from': sender });
        }
    };

    render() {
        return (
            <form>
                <input type="number" name="num" value={this.state.num} onChange={this.handleChange} /> (num)<br />
                <input type="text" name="text" value={this.state.text} onChange={this.handleChange} /> (text)<br />
                <button type="button" onClick={this.handleSet}>Update Storage</button><br />
            </form>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            text: 'Waiting...',
            textFieldNum: '',
            textFieldText: '',
            swithChangeChecked: false,
        };
    }

    async getData() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const contract = new web3.eth.Contract(abi, address);
            const data = await contract.methods.get().call();
            this.setState({ num: data[0], text: data[1] });
        }
    }

    //

    handleSwithChange = (event) => {
        this.setState({ swithChangeChecked: event.target.checked });
    }

    handleTextFieldChange = (event, targetProp) => {
        this.setState({
            ...this.state,
            [targetProp]: event.target.value
        });
    };

    //

    render() {
        return (
            <Container>
                <Switch
                    checked={this.state.swithChangeChecked}
                    onChange={this.handleSwithChange}
                />
                {
                    (this.state.swithChangeChecked)
                        ? (
                            <React.Fragment>
                                <Box sx={{ "mt": 2 }}>
                                    <Typography variant="h5">Simple Storage</Typography>
                                    <Typography variant="h6">Blockchain</Typography>
                                </Box>
                                <Paper sx={{ "p": 2, "mt": 2 }}>
                                    <Stack spacing={2} divider={<Divider flexItem />}>
                                        <Box
                                            component="form"
                                            display="flex"
                                            justifyContent="space-around"
                                            alignItems="center"
                                            sx={{ "column-gap": "16px" }}
                                        >
                                            <TextField
                                                label="Read Only"
                                                defaultValue={this.state.num}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="filled"
                                                sx={{ "width": "50%" }}
                                            />
                                            <TextField
                                                label="Read Only"
                                                defaultValue={this.state.text}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="filled"
                                                sx={{ "width": "50%" }}
                                            />
                                        </Box>
                                        <Button variant="outlined" onClick={this.getData}>Get Storage</Button>
                                    </Stack>
                                </Paper>
                                <Paper sx={{ "p": 2, "mt": 4 }}>
                                    <Stack spacing={2} divider={<Divider flexItem />}>
                                        <Box
                                            component="form"
                                            display="flex"
                                            justifyContent="space-around"
                                            alignItems="center"
                                            sx={{ "column-gap": "16px" }}
                                        >
                                            <TextField
                                                label="num"
                                                value={this.state.textFieldNum}
                                                onChange={(event) => this.handleTextFieldChange(event, "textFieldNum")}
                                                variant="outlined"
                                                sx={{ "width": "50%" }}
                                            />
                                            <TextField
                                                label="text"
                                                value={this.state.textFieldText}
                                                onChange={(event) => this.handleTextFieldChange(event, "textFieldText")}
                                                variant="outlined"
                                                sx={{ "width": "50%" }}
                                            />
                                        </Box>
                                        <Button variant="outlined">Set Storage</Button>
                                    </Stack>
                                </Paper>
                            </React.Fragment>
                        )
                        : (
                            <React.Fragment>
                                <div id="title">
                                    <h1>Simple Storage on Blockchain</h1>
                                </div>
                                <div id="data">
                                    <table border="1px">
                                        <tr>
                                            <th>num</th>
                                            <th>text</th>
                                            <th>Get</th>
                                            <th>Set</th>
                                        </tr>
                                        <tr>
                                            <td>{this.state.num}</td>
                                            <td>{this.state.text}</td>
                                            <td><button onClick={() => this.getData()}>Fefesh Storage</button></td>
                                            <td><DataForm /></td>
                                        </tr>
                                    </table>
                                </div>
                            </React.Fragment>
                        )
                }

            </Container>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);