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

class ViewAccounts extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            bill: this.props.billData,
            accounts: [],
            discountedAmount: "",
            grandTotalAmount: this.props.totalPrice,
            debitAmount: "",
            paymentMethods: "",
            creditAmount: "",
            
        }
        this.accountList = [];
        this.totalDebit= 0;
        this.initialTotalDebit =0;
    
        
    }
    componentDidMount() {
        let data= this.state.bill;
      
        this.accountList=[];
        this.totalDebit=0;
        let accountlist= [];
     
        accountlist= accountlist.concat(data[0].account);
        this.accountList= accountlist;
        console.log("start123");
        console.log("start123",this.accountList);
        let totaldebit =0;
        for (const data of this.accountList){
            totaldebit= totaldebit+ parseInt(data.Debit);
        }
        this.totalDebit= totaldebit;
        this.initialTotalDebit= totaldebit;
        this.setState({
            accounts: data[0].account,
        
        })
        this.props.accountData(this.accountList);
    };
   

    myChangeHandler = async (event) => {
      
        let nam = event.target.name;
        let val = event.target.value;
        await this.setState({ [nam]: val });
        
      };

      addAccount = (e) => {
        e.preventDefault();
    
        let sumAmount = parseFloat(this.props.totalPrice);
        this.totalDebit= parseFloat(this.totalDebit)+ parseFloat(this.state.debitAmount);
        let creditAmount = sumAmount - this.totalDebit;
        console.log("creditAmount",creditAmount);
        
        this.setState({
          
         
        });
        
        
        var data = {
            AccountId: '123',
            GrandTotal: sumAmount.toString(),
            Debit: this.totalDebit,
            Credit: creditAmount.toString(),
            PaymentMethod: this.state.paymentMethods,
        };
        this.accountList.push(data);
        console.log("addaccount",this.accountList);
        
        this.setState({
          accounts: this.accountList,
          debitAmount: "",
          paymentMethods: "",
          creditAmount: creditAmount.toString(),
          grandTotalAmount: sumAmount.toString(),
        });
        this.props.accountData(this.accountList);
        console.log("object12345678996643", this.accountList, creditAmount, this.state)
      };

      
      delete= (accountId) => {
        var tempAccounts= this.state.accounts;
        const filterAccounts= tempAccounts.filter((json) => {
            return json.AccountId !== accountId
        });
        this.accountList= filterAccounts;
        console.log("deleteed",accountId);
        
        if(accountId=='123' && filterAccounts.length>0){
          this.totalDebit=this.initialTotalDebit;
        }
        else if(accountId=='123' && filterAccounts.length==0){
          this.totalDebit=0;
        }
        else{
          let temptotaldebit =0;
          if(Array.isArray(filterAccounts) && filterAccounts.length){
            for (const data of filterAccounts){
                temptotaldebit= temptotaldebit+ parseInt(data.Debit);
            }
            this.totalDebit= temptotaldebit;
          }
         else{
          this.totalDebit= temptotaldebit;
         }
         
        }
      
        this.setState({
            accounts: filterAccounts,
            debitAmount: "",
            paymentMethods: "",
            creditAmount: "",
        })
        this.props.accountData(this.accountList);
    }
    render() {
        const { totalPrice } = this.props;
        const { accounts } = this.state;
      
        return (
            <>
                 <h2>Accounts</h2>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <form>
              <ListItemText primary="Total Amount" />
              <h1>{totalPrice}</h1>
            </form>
          </Grid>
          <Grid item xs={2}>
            <form>
              <ListItemText primary="Total Debit" />
              <h1>{this.totalDebit}</h1>
            </form>
          </Grid>

          <Grid item xs={2}>
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
          <Grid item xs={2}>
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

          <Grid item xs={2}>
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
                <TableRow key={row.AccountId ? row.AccountId : '123'}>
                  <TableCell>{row.GrandTotal}</TableCell>
                  <TableCell>{row.Debit}</TableCell>
                  <TableCell>{row.Credit}</TableCell>
                  <TableCell>{row.PaymentMethod}</TableCell>
                  <TableCell>{ row.DateCreated ? moment(row.DateCreated).format('Do MMM YYYY') : moment().format("Do MMM YYYY")}</TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => this.delete(row.AccountId)}
                    ></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
            </>
        )
    }

    
}
export default ViewAccounts