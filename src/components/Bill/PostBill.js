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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import EditWorker from "../Worker/EditWorker";

import Account from "../FetchData/Account";
import { BillMapper } from "./BillMapper";
import ViewBills from "./ViewBills";
var request = require("request-promise");
var moment = require("moment");

class PostBill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      products: [],
      productsCopy: [],
      productName: "",
      sellingprice: 0,
      quantity: "",
      orderPrice: 0,
      orders: [],
      workOrder: [],
      accounts: [],
      productId: "",
      autocompleteProduct: {},
      totalPrice: "",
      open: 0,
      doneClicked: 0,
    };
    this.orderList = [];
  }

  componentDidMount() {
    let getCategoryOptions = {
      method: "GET",
      url: "http://localhost:4003/products",
      headers: {
        "X-security-Authkey": global.Authkey,
      },
    };
    request(getCategoryOptions)
      .then((Response) => {
        let data = JSON.parse(Response);
        this.setState({
          products: data,
          productsCopy: data,
        });
        console.log(data);
      })
      .catch((err) => {
        throw err;
      });
  }
  increment() {}
  addorders = (e) => {
    e.preventDefault();
    var tempProducts = this.state.products;
    var filterProducts = tempProducts.filter((json) => {
      return json.ProductId !== this.state.productId;
    });
    console.log("filterProducts", this.orderList);
    var data = {
      ProductId: this.state.productId,
      ProductName: this.state.productName,
      Quantity: this.state.quantity,
      OrderPrice: this.state.orderPrice,
    };
    this.orderList.push(data);

    let totalPrice = 0;
    for (const data of this.orderList) {
      totalPrice = totalPrice + parseInt(data.OrderPrice);
    }

    this.setState({
      orders: this.orderList,
      sellingprice: 0,
      quantity: "",
      orderPrice: 0,

      productName: "",
      products: filterProducts,
      autocompleteProduct: {},
      totalPrice: totalPrice,
    });
  };
  delete = (productId) => {
    var tempOrders = this.state.orders;
    var tempProducts = this.state.productsCopy;
    const filterData = tempOrders.filter((json) => {
      return json.ProductId !== productId;
    });
    var filterProducts = tempProducts.filter((json) => {
      return json.ProductId == productId;
    });
    console.log("filterProducts1111", filterProducts[0]);
    var productList = this.state.products;
    productList.push(filterProducts[0]);
    this.orderList = filterData;

    let totalPrice = 0;
    for (const data of this.orderList) {
      totalPrice = totalPrice + parseInt(data.OrderPrice);
    }
    this.setState({
      orders: filterData,
      products: productList,
      totalPrice: totalPrice,
    });
  };
  handleClickOpen = (e) => {
    e.preventDefault();
    this.setState({
      open: 1,
    });
  };
  handleCLickClose = (e) => {
    e.preventDefault();
    this.setState({
      open: 0,
    });
  };
  postBill = async (e) => {
    e.preventDefault();
    let mapper = new BillMapper();
    let models = await mapper.DTOtoModel(this.state);
    console.log("object342323", JSON.stringify(models));
    var options = {
      method: "POST",
      url: "http://localhost:4003/Bills",
      headers: {
        "X-Security-AuthKey": global.Authkey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(models),
    };
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    this.setState({
      open: 0,
      doneClicked: 1,
    });
  };
  workerData = (data) => {
    console.log("243223", data);
    this.setState({
      workOrder: data,
    });
  };
  accountData = (data) => {
    console.log("243223", data);
    this.setState({
      accounts: data,
    });
  };

  myChangeHandler = async (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    console.log(nam, val);
    await this.setState({ [nam]: val });

    let sp = parseFloat(this.state.sellingprice);
    let quantity = parseInt(this.state.quantity);
    let op = (sp * quantity).toString();
    this.setState({ orderPrice: op });
    console.log(this.state);
  };

  render() {
    const { products: posts } = this.state;
    const { orders } = this.state;
    const { totalPrice } = this.state;
    let total = this.state.totalPrice;
    console.log("12345", total);
    const mystyle = {};
    const Center = {
      display: "flex",
      "flex-direction": "column",
    };
    console.log("amazzz", this.state);
    return (
      <>
        {this.state.doneClicked == 1 ? (
          <ViewBills></ViewBills>
        ) : (
          <div style={mystyle}>
            <form>
              <ListItemText primary="Customer Name" />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="customerName"
                ref={this.inputRef}
                onChange={this.myChangeHandler}
              />
            </form>

            <form>
              <ListItemText primary="Customer Phone" />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="customerPhone"
                onChange={this.myChangeHandler}
              />
            </form>
            <form>
              <ListItemText primary="Customer Address" />
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="customerAddress"
                onChange={this.myChangeHandler}
              />
            </form>
            <div>
              <div>
                <h2>Orders</h2>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <form>
                      <ListItemText primary="Products" />
                      <Autocomplete
                        id="combo-box-demo"
                        name="categoryId"
                        autosize={true}
                        options={posts}
                        value={this.state.autocompleteProduct}
                        onChange={(event, newValue) => {
                          this.setState({
                            sellingprice: newValue.SellingPrice,
                            productId: newValue.ProductId,
                            productName: newValue.ProductName,
                            autocompleteProduct: newValue,
                          });

                          console.log("amamama", newValue);
                        }}
                        getOptionLabel={(option) => option.ProductName}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Products"
                            variant="outlined"
                          />
                        )}
                      />
                    </form>
                  </Grid>

                  <Grid item xs={3}>
                    <form>
                      <ListItemText primary="Quantity" />
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.myChangeHandler}
                      />
                    </form>
                  </Grid>
                  <Grid item xs={2}>
                    <form>
                      <ListItemText primary="Order Price" />
                      <h1>{this.state.orderPrice}</h1>
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
                            onClick={this.addorders.bind(this)}
                          >
                            Add Column
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="secondary"
                            component="span"
                            onClick={this.addorders}
                          >
                            Edit Column
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </div>
              {this.orderList.length ? (
                <div>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Order Price</TableCell>
                        <TableCell>Date Created</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((row) => (
                        <TableRow key={row.ProductId}>
                          <TableCell>{row.ProductName}</TableCell>
                          <TableCell>{row.Quantity}</TableCell>
                          <TableCell>{row.OrderPrice}</TableCell>
                          <TableCell>
                            {moment().format("Do MMM YYYY")}
                          </TableCell>
                          <TableCell>
                            <DeleteIcon
                              onClick={() => this.delete(row.ProductId)}
                            ></DeleteIcon>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <h1 style={{ padding: "14px" }}></h1>
              )}
              <div>
                <EditWorker workerData={this.workerData}></EditWorker>
              </div>
              <div>
                <Account
                  totalPrice={total}
                  accountData={this.accountData}
                ></Account>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={this.handleClickOpen}
            >
              DONE
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Just a Conformation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This can edited further So Chill!! Any kind of data can
                  retrived
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCLickClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.postBill} color="primary" autoFocus>
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
export default PostBill;
