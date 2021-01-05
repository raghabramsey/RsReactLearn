import React, { Component } from 'react';
import {ProductService} from "../../services/ProductService"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
var request = require("request-promise");
var moment = require("moment");

class ViewProducts extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
      products: [],
      productsCopy: [],
    }
  
  
  }
  async componentDidMount() {
    let productService= new ProductService();
    let productData= await productService.getProducts();

    this.setState({
      products: productData,
      productsCopy: productData,
    });
   
  }
  delete=  async (productId) =>{

       
    let productService= new ProductService();
    let status= await productService.deleteProduct(productId);
    var tempProducts= this.state.products;
    const filterProducts= tempProducts.filter((json)=>{
      return json.ProductId != productId;
    });
    console.log("object", filterProducts);
    
    this.setState({
      products: filterProducts,
    });
  }

  render() {
    const {products} = this.state;
    return (
      <>
        <div>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>CategoryName</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((row) => (
                        <TableRow key={row.ProductId}>
                          <TableCell>{row.ProductName}</TableCell>
                          <TableCell>{row.CategoryName}</TableCell>
                          <TableCell>{row.Description}</TableCell>
                          <TableCell>{row.Brand}</TableCell>
                          <TableCell>
                            <VisibilityIcon></VisibilityIcon>
                          </TableCell>
                          <TableCell>
                            <EditIcon>
                              onClick={() => this.edit(row.ProductId)}
                            </EditIcon>
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
      </>
    )
  }
  
}
export default ViewProducts;