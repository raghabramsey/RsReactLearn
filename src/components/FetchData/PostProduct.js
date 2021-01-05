import React, { Component } from "react";
import { ProductService } from "../../services/ProductService";
import { CategoryService } from "../../services/CategoryService";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ViewProduct from "./GetProducts";
import GetProductDetail from "../ProductDetail/ProductDetail"
var request = require("request-promise");

var fs = require("fs");

export class PostProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      categoryName: "",
      description: "",
      productInfo: "",
      categoryId: "",
      brand: "",
      review: "",
      productSP: "",
      productCategory: "",
      posts: [],
      postProduct: [],
      thumbnail: "",
      quantity: "",
      open: 0,
      doneClicked: 0,
      done:0
    };
    this.inputRef = React.createRef();
  }
  async componentDidMount() {
    // console.log("what inputref",this.inputRef);
    // this.inputRef.current.focus();

    let categoryService = new CategoryService();
    let categoryData = await categoryService.GetCategory();
    this.setState({ posts: categoryData });
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  fileSelectedHandler = (event) => {
    console.log(event);
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
  postProduct = async (e) => {
    e.preventDefault();
    let productBody=[];
    var body = {
      productid: null,
      ProductName: this.state.productName,
      Brand: this.state.brand,
      CategoryId: this.state.categoryId,
      CategoryName: this.state.categoryName,
      Description: this.state.description,
      ProductDetail : []
    };
    let productService = new ProductService();
    var status = await productService.PostProducts(body);
    productBody.push(body);

    console.log("status", status);
    this.setState({
      open: 0,
      doneClicked: 1,
      productName: "",
      brand: "",
      categoryId: "",
      postProduct: productBody,
    });
    alert("Product Added");
    console.log("post", this.state.postProduct);
  };
  postCategory = async (e) => {
    e.preventDefault();

    let categoryBody = [];
    var body = {
      CategoryId: null,
      CategoryName: this.state.categoryName,
      Description: this.state.description,
    };
    categoryBody.push(body);
    let categoryService = new CategoryService();
    let categoryPostStatus = categoryService.PostCategory(categoryBody);
    console.log("categorypoststatus", categoryPostStatus);
    this.setState({
      open: 0,
      doneClicked: 1,
      categoryName:"",
      description:"",
      
    });
    alert("Category Added");
  };
  onChange = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      let data = e.target.result;
      let imageBase64 = data.split(",");
      this.setState({ thumbnail: imageBase64[1] });
    };
  };
  render() {
    const mystyle = {};
    const { posts } = this.state;

    return (
      <div style={mystyle}>
        <h1>Product {this.props.name}</h1>
        <form>
          <ListItemText primary="Product Name" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="productName"
            value= {this.state.productName}
            onChange={this.myChangeHandler}
          />
        </form>

        <form>
          <ListItemText primary="Category" />
          <Autocomplete
            id="combo-box-demo"
            name="categoryId"
            options={posts}
            onChange={(event, newValue) => {
              this.setState({ 
                  categoryId: newValue.CategoryId,
                  categoryName: newValue.CategoryName,
                  description: newValue.Description,
                              });
              console.log(JSON.stringify(newValue.CategoryId));
              console.log(JSON.stringify(this.state));
            }}
            getOptionLabel={(option) => option.CategoryName}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </form>

        <form>
          <ListItemText primary="Brand" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="brand"
            value={this.state.brand}
            onChange={this.myChangeHandler}
          />
        </form>

        <form>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={this.handleClickOpen}
          >
            {" "}
            Done{" "}
          </Button>
        </form>
        <h1>Category {this.props.name}</h1>
        <form>
          <ListItemText primary="Category Name" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="categoryName"
            value={this.state.categoryName}
            onChange={this.myChangeHandler}
          />
        </form>
        <form>
          <ListItemText primary="Description" />
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="description"
            value={this.state.description}
            onChange={this.myChangeHandler}
          />
        </form>
        <form>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={this.postCategory}
          >
            {" "}
            Done{" "}
          </Button>
        </form>
        {/* <div>
          <ViewProduct></ViewProduct>
        </div> */}
        <div>
        <GetProductDetail postProduct= {this.state.postProduct}></GetProductDetail>
          {/* {this.state.done == 1 ? <GetProductDetail postProduct= {this.state.postProduct}></GetProductDetail> : <GetProductDetail ></GetProductDetail>} */}
        </div>
        
        
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
              This can edited further So Chill!! Any kind of data can retrived
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCLickClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.postProduct} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PostProduct;
