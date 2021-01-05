import React, { Component } from "react";
import axios from "axios";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ViewBill from "./ViewBill";
import Home from "../Home/home";
var request = require("request-promise");
var moment = require("moment");

export class ViewBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      deleteBillId: "",
      viewBillId: "",
      isEdit: 0,
      message: "Welcome Visitor",
      redirectToReferrrer: false,
      open:0,
    };
  }
  changeMessage() {
    this.setState({
      message: "Thank you for Subscribing",
    });
    this.setState({ redirectToReferrrer: true });
  }

  async componentDidMount() {
    console.log("hamro auth key", global.Authkey)
    var options = {
      method: "GET",
      url: "http://localhost:4003/Bills",
      headers: {
        "X-Security-AuthKey": global.Authkey,
      },
    };
    await request(options)
      .then((Response) => {
        let data = JSON.parse(Response);
        console.log(data);
        this.setState({
          bills: data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  delete = async(e) => {
    e.preventDefault();
    var options = {
      'method': 'DELETE',
      'url': `http://localhost:4003/Bills/${this.state.deleteBillId}`,
      'headers': {
        'X-Security-AuthKey': global.Authkey
      }
    };
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
   
    this.setState({
      open: 0
    })
    var tempBill= this.state.bills;
    const filterBill= tempBill.filter((json)=>{
      return json.BillId != this.state.deleteBillId;
    });
    console.log("object", filterBill);
    
    this.setState({
      bills: filterBill,
    });
  }

  edit = (billId) => {
    this.setState({
      isEdit: 1,
      viewBillId: billId,
    });
  };
  handleClickOpen = (billid) => {
    console.log("you clicek the delete btn")
    this.setState({
      open: 1,
      deleteBillId: billid
    });
  };
  handleCLickClose = (e) => {
    e.preventDefault();
    this.setState({
      open: 0,
    });
  };
  render() {
    if (this.state.redirectToReferrrer) {
      return <Home />;
    }

    let aa = "data:image/png;base64, ";
    const { bills } = this.state;
    return (
      <>
        {this.state.isEdit == 1 ? (
          <ViewBill viewBillId={this.state.viewBillId}></ViewBill>
        ) : (
          <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Customer Phone</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell >Credit Amount</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((row) => (
                  <TableRow key={row.BillId}>
                    <TableCell>{row.CustomerName}</TableCell>
                    <TableCell>{row.CustomerPhone}</TableCell>
                    <TableCell>{row.account[0].GrandTotal}</TableCell>
                    <TableCell>
                      {row.account[row.account.length - 1].Credit}
                    </TableCell>
                    <TableCell>
                      {moment(row.DateCreated).format("Do MMM YYYY")}
                    </TableCell>

                    <TableCell>
                      <DeleteIcon
                        onClick={() => this.handleClickOpen(row.BillId)}
                      ></DeleteIcon>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        onClick={() => this.edit(row.BillId)}
                      ></EditIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog
                open={this.state.open}
                onClose={this.handleCLickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you Sure??"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    For Data Retrival Contact Raghab :)
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCLickClose} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={this.delete} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
          
         
          
        )}
      </>
    );
  }
}

export default ViewBills;
