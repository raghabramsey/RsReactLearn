import React,{useEffect,useState} from "react";
import axios from 'axios';
import {ProductDetailService} from "../../services/ProductDetailService"
import {ProductService} from "../../services/ProductService"
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});



function Row(props) {
  const { row } = props;
 
 const [product,setProducts] = useState(props.row);
 const [productDetail,setProductDetail] = useState(props.row.ProductDetail);
  const [open, setOpen] = React.useState(false);
  const [products, setProduct] = useState([]);
 
  const classes = useRowStyles();
 
  
  return (
    <React.Fragment>
      <TableRow className={classes.root} key={product.ProductId}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {product.ProductName}
        </TableCell>
        
        <TableCell align="right">{product.CategoryName}</TableCell>
        <TableCell align="right">{product.Description}</TableCell>
        <TableCell align="right">{product.Brand}</TableCell>
        
        <TableCell align="right"><EditIcon></EditIcon></TableCell>
        <TableCell align="right">
          <DeleteIcon onClick={()=> props.deleteProduct(product.ProductId)}>
          
          </DeleteIcon>
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Product Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell>Product Detail</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Batch Number</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { 
                  productDetail.map((historyRow) => (
                    <TableRow key={historyRow.ProductDetailId}>
                      <TableCell component="th" scope="row">
                        {historyRow.ProductDetail}
                      </TableCell>
                       
                      <TableCell>{historyRow.Barcode}</TableCell>
                      <TableCell>{historyRow.Color}</TableCell>
                      <TableCell align="right">{historyRow.Size}</TableCell>
                      <TableCell align="right">{historyRow.Unit}</TableCell>
                      <TableCell align="right">{historyRow.Quantity}</TableCell>
                      <TableCell align="right">{historyRow.BatchNumber}</TableCell>
                      
                      <TableCell align="right"><EditIcon></EditIcon></TableCell>
                      <TableCell align="right">
          <DeleteIcon onClick={async () => {
            let productsDetailsService= new ProductDetailService();
            let status= await productsDetailsService.deleteProductDetail(historyRow.ProductDetailId);
            var tempProducts= productDetail;
            const filterProducts= tempProducts.filter((json)=>{
              return json.ProductDetailId != historyRow.ProductDetailId;
            });
         
            setProductDetail(filterProducts)
            // this.setState({
            //   products: filterProducts,
            // });
          }}>
          
          </DeleteIcon>
          </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function GetProductDetail(props) {
  
  const [products, setProducts] = useState([]);
  
  const deleteProduct =  async (productId) =>{

       
    let productService= new ProductService();
    let status= await productService.deleteProduct(productId);
    var tempProducts= products;
    const filterProducts= tempProducts.filter((json)=>{
      return json.ProductId != productId;
    });
    console.log("object", filterProducts);
    setProducts(filterProducts)
    
  }

  useEffect( () => {
    let productsDetailsService= new ProductDetailService();
   productsDetailsService.GetProductsDetails().then( response=> {
    let product= response;
    
 
    let postProduct = props.postProduct;
    if(postProduct && postProduct.length >0){
      setProducts(product.concat(postProduct));
    }
    else{
      setProducts(product)
    }
   })
  }, [props])
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Product Name </TableCell>
            <TableCell align="right">Category Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Brand</TableCell>
          
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <Row key={row.name} row={row} deleteProduct = {deleteProduct}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const productBody = props => {
 

  
}
