import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
var request = require("request-promise");
var moment = require("moment");

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      discountedAmount: "",
      grandTotalAmount: this.props.totalPrice,
      debitAmount: "",
      paymentMethods: "",
      creditAmount: "",
    };
    this.accountList = [];
  }
  myChangeHandler = async (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    await this.setState({ [nam]: val });
    if (nam == "debitAmount") {
      let sumAmount = parseFloat(this.props.totalPrice);
      let creditAmount = sumAmount - parseFloat(this.state.debitAmount);
      
      this.setState({
        creditAmount: creditAmount.toString(),
        grandTotalAmount: sumAmount.toString(),
      });
    }
  };

  addAccount = (e) => {
    e.preventDefault();
    var data = {
      GrandTotal: this.state.grandTotalAmount,
      Debit: this.state.debitAmount,
      Credit: this.state.creditAmount,
      PaymentMethod: this.state.paymentMethods,
    };
    this.accountList.push(data);
    console.log("object", this.accountList)
    this.setState({
      accounts: this.accountList,
      debitAmount: "",
      paymentMethods: "",
      creditAmount: "",
    });
    this.props.accountData(this.accountList);

    
  };
  delete= (accountId) => {
      var tempAccounts= this.state.accounts;
      const filterAccounts= tempAccounts.filter((json) => {
          return json.AccountId !== accountId
      });
      this.accountList = filterAccounts;
      this.setState({
          accounts: filterAccounts
      })
  }
  render() {
    const { totalPrice } = this.props;
    const { accounts } = this.state;

    return (
      <>
        <h2>Accounts</h2>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <form>
              <ListItemText primary="Total Amount" />
              <h1>{totalPrice}</h1>
            </form>
          </Grid>

          <Grid item xs={3}>
            <form>
              <ListItemText primary="Debit" />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="debitAmount"
                value={this.state.debitAmount}
                onChange={this.myChangeHandler}
              />
            </form>
          </Grid>
          <Grid item xs={3}>
            <form>
              <ListItemText primary="Payment Methods" />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="paymentMethods"
                value={this.state.paymentMethods}
                onChange={this.myChangeHandler}
              />
            </form>
          </Grid>

          <Grid item xs={3}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={this.addAccount.bind(this)}
                  >
                    Add Column
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    onClick={this.addAccount}
                  >
                    Edit Column
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        {this.accountList.length ? 
        <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Total Amount</TableCell>
              <TableCell>Debit Amount</TableCell>
              <TableCell>Credit Amount</TableCell>
              <TableCell>Payment Methods</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((row) => (
              <TableRow key={row.AccountId}>
                <TableCell>{row.GrandTotal}</TableCell>
                <TableCell>{row.Debit}</TableCell>
                <TableCell>{row.Credit}</TableCell>
                <TableCell>{row.PaymentMethod}</TableCell>
                <TableCell>{moment().format("Do MMM YYYY")}</TableCell>
                <TableCell>
                  <DeleteIcon
                    onClick={() => this.delete(row.AccountId)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> : <h1 style={{padding:"14px"}}></h1>}
      </>
    );
  }
}
export default Account;
