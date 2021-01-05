import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ViewProduct from './GetProducts';
var request = require('request-promise');
var fs = require('fs');


export class PostProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productName: '',
            productInfo: '',
            categoryId: '',
            brand: '',
            review: '',
            productSP: '',
            productCategory: '',
            posts : [],
            thumbnail:'',
            quantity:'',
            open: 0,
      doneClicked: 0,
            
        }
        this.inputRef = React.createRef();
    }
    async componentDidMount(){
        console.log(this.inputRef)
        this.inputRef.current.focus()
        console.log(this.props)
        let getCategoryOptions={
            method:'GET',
            url:'http://localhost:4001/category',
            headers:{
                'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
            }
        };
        await request(getCategoryOptions)
            .then((Response)=>{
                let data= JSON.parse(Response);
                this.setState({posts: data})
                console.log(data)
            })
            .catch((err)=>{
                throw err
            })
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "productMP") {
          if (val !="" && !Number(val)) {
            err = <strong style={{color:"red"}}>This field must be a number</strong>;
          }
        }
        this.setState({errormessage: err});
        this.setState({[nam]: val});
    }
 
    fileSelectedHandler = event => {
        console.log(event);
    }
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
    postProduct = async(e) =>{
        e.preventDefault();
        let a=[];
        var body={
            'productid':null,
            'ProductName': this.state.productName,
            'ProductInfo': this.state.productInfo,
            'MarkedPrice': this.state.brand,
            'MarkedPrice': this.state.review,
            'Thumbnail': this.state.thumbnail,
            'Quantity': this.state.quantity,
            'CategoryId': this.state.categoryId
        }
        a.push(body);
        console.log((a));
        var options = {
            'method': 'POST',
            'url': 'http://localhost:4003/product',
            'headers': {
              'X-security-AuthKey': global.Authkey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
          
          };
          await request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            window.location.reload();
         
          });
          this.setState({
            open: 0,
            doneClicked: 1,
          });
          alert('Product Added');
          
    }
    onChange = (e)=>{
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload=(e)=>{
            let data= e.target.result;
            let imageBase64= data.split(',')
            this.setState({thumbnail: imageBase64[1]})
        }
    }
    render() {
        const mystyle = {
            
          };
          const {posts} = this.state
        return (
            

            <div style={mystyle}>

                <h1>Product {this.props.name}</h1>
                <form >
                    <ListItemText primary="Product Name" />
                    <TextField id="outlined-basic" variant="outlined" name="productName" ref={this.inputRef} onChange={this.myChangeHandler}  />
                </form>

               
                <form >
                    <ListItemText primary="Product Information" />
                    <TextField id="outlined-basic" variant="outlined" name="productInfo" onChange={this.myChangeHandler} />
                </form>
                <form >
                    <ListItemText primary="Category" />
                    <Autocomplete
                    id="combo-box-demo"
                    name="categoryId"
                    options={posts}
                   
                    onChange={(event, newValue) => {
                        
                        this.setState({categoryId : newValue.CategoryId});
                        console.log(JSON.stringify(newValue.CategoryId));
                        console.log(JSON.stringify(this.state))
                       
                      }}
                    getOptionLabel={(option) => option.CategoryName}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined"  />}
                    />
                </form>


                <div >

                    <Grid container spacing={3}>

                        <Grid item xs={4}>
                            <form  >
                                <ListItemText primary="Product MP" />
                                <TextField id="outlined-basic" variant="outlined"  name="productMP"  onChange={this.myChangeHandler} />
                                
                            </form>
                            {this.state.errormessage}
                        </Grid>


                        <Grid item xs={4}>
                            <form  >
                                <ListItemText primary="Product SP" />
                                <TextField id="outlined-basic" variant="outlined" name="productSP"  onChange={this.myChangeHandler}  />
                                
                            </form>
                            {this.state.errormessage}
                        </Grid>
                        <Grid item xs={4}>
                            <form >
                                <ListItemText primary="Product DP" />
                                <TextField id="outlined-basic" variant="outlined"  name="productDP"  onChange={this.myChangeHandler} />
                               
                            </form>
                            {this.state.errormessage}
                        </Grid>
                    </Grid>
                </div>
                <form >
                    <ListItemText primary="Quantity" />
                    <TextField id="outlined-basic" variant="outlined" name="quantity" onChange={this.myChangeHandler} />
                    {this.state.errormessage}
                </form>
                <form >
                    <ListItemText primary="Select image:" />
                    <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>this.onChange(e)} />
                    
                    <Button variant="contained" color="primary" component="span" onClick={this.handleClickOpen} > Done </Button>
                </form>
                <div>
          {this.state.done == 1 ? <ViewProduct propsFromPostWorker={this.state.workerBody}></ViewProduct> : <ViewProduct></ViewProduct> }
          
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
                      This can edited further So Chill!! Any kind of data can
                      retrived
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
export default PostProduct