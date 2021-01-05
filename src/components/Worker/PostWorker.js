import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ViewWorkers from './ViewWorkers'
var request = require("request-promise");

var fs = require("fs");

export class PostWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerName: "",
      workerPhone: "",
      workerAddress: "",
      done: 0,
      workerBody: [],
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  fileSelectedHandler = (event) => {
    console.log(event);
  };

  postWorker = async (e) => {
    e.preventDefault();
    console.log("clicked", this.state);
    var body = [
      {
        WorkerName: this.state.workerName,
        WorkerAddress: this.state.workerAddress,
        WorkerPhone: this.state.workerPhone,
      },
    ];
    var options = {
      method: "POST",
      url: "http://localhost:4003/workers",
      headers: {
        "X-security-AuthKey": global.Authkey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    alert("Worker Added");
    this.setState({
      workerName: "",
      workerPhone: "",
      workerAddress: "",
      done: 1,
      workerBody: body,
    });
    
  };

  render() {
    const mystyle = {};
    const { posts } = this.state;
    return (
      <div style={mystyle}>
        <form>
          <ListItemText primary="Worker Name" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="workerName"
            value={this.state.workerName}
            onChange={this.myChangeHandler}
          />
        </form>

        <form>
          <ListItemText primary="Worker Phone" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="workerPhone"
            value={this.state.workerPhone}
            onChange={this.myChangeHandler}
          />
        </form>

        <form>
          <ListItemText primary="Worker Address" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="workerAddress"
            value={this.state.workerAddress}
            onChange={this.myChangeHandler}
          />
          {this.state.errormessage}
        </form>
        <form style={{ padding: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={this.postWorker}
          >
            {" "}
            Done{" "}
          </Button>
        </form>
        <div>
          {this.state.done == 1 ? <ViewWorkers propsFromPostWorker={this.state.workerBody}></ViewWorkers> : <ViewWorkers></ViewWorkers> }
          
        </div>
      </div>
    );
  }
}
export default PostWorker;
