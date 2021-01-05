import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dashboard from "../DashBoard/dashboard";

var request = require("request-promise");
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userBase64: "",
      redirectToReferrrer: false,
      error: null,
      open: 0,
      status: 0,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  };

  submitHandler = async (e) => {
    e.preventDefault();

    console.log(this.state);
  };
  handleClick = () => {
    this.setState({
      open: 1,
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: 0,
    });
  };

  PasalLogin(e) {
    return new Promise((resolve, reject) => {
      var request = require("request");
      var options = {
        method: "POST",
        url: "http://localhost:4001/login",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: this.state.username,
          password: this.state.password,
        }),
      };
      console.log("object23", options);
      request(options, function (error, response) {
       

        try {
         
          var res = JSON.parse(response.body);

          global.Authkey = res.authkey;
          console.log("ghbhjbjb", response.statusCode);
          
          
         

          resolve();
        } catch (error) {
          console.log("object", JSON.parse(error.error));
          //   reject(error);
          this.setState({
            error: JSON.parse(error.error),
            open: 2,
          });
        }
      });
    });
  }

  login = async (e) => {
    e.preventDefault();
    let userDetails = {
      userName: `${this.state.username}`,
      password: `${this.state.password}`,
    };

    console.log("tripantam", userDetails);
    this.PasalLogin(userDetails);
    this.setState({
      open: 1,
      redirectToReferrrer: true
    });
    console.log("324334tfdf",this.state.status);
    // if(this.state.status==200){
    //   console.log("it should be open")
    //   this.setState({
    //     open: 1,
    //     redirectToReferrrer: true
    //   });
    // }

    //
  };
  render() {
    if (this.state.redirectToReferrrer) {
      return <Dashboard />;
    }
    const { username, password, error } = this.state;
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column">
          <h2>Login Page</h2>
          <lable>Username</lable>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={this.changeHandler}
          />
          {error && error.username ? <p> {error.username} </p> : null}
          <label>password</label>

          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.changeHandler}
          />
          {error && error.password ? <p> {error.password}</p> : null}
          <div>
            <Button
              onClick={this.login}
              variant="contained"
              color="secondary"
              component="span"
            >
              Login
            </Button>
          </div>
          {this.state.open == 1 ? (
            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar>
          ) : this.state.open == 2 ? (
            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="error">
                UserName or Password did not match!
              </Alert>
            </Snackbar>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Login;
