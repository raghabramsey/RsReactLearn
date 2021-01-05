import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Home from '../Home/home';
import PrimarySearchAppBar from '../Home/Header'

class Message extends Component {

    

    constructor(){
        super()
        this.state={
            message : 'Welcome Visitor',
            redirectToReferrrer:false
        }
    }
    changeMessage(){
        this.setState({
            message: 'Thank you for Subscribing'
        })
        this.setState({redirectToReferrrer:true});
    }

    render(){

       
          
        
        return(
            
            <div>
                <PrimarySearchAppBar/>
                <h1>
                {this.state.message}
            </h1>
            <div >
            
        
            </div>
            <button onClick={()=>{
                this.changeMessage()
            }}> Subscribe</button>

            </div>
            
        )
    }
}

export default Message;