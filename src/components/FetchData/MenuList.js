import React, { Component } from 'react';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Home from '../Home/home';
import { NavLink } from 'react-router-dom';
var request = require('request-promise');


export class MenuList extends Component {

    constructor(props){
        super(props);
        this.state={
            redirectToReferrer:false,
            clicked:false
        }
    }
    submitHandler= (e)=>{
        this.setState({redirectToReferrrer: true});
    }
    

    render() {
        console.log("aaaa",this.props)
        

        const hello='Say that you love me'

        return (
      

            <div>
                <ListItem button>
                    
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <NavLink to="/">Dashboard</NavLink>
                </ListItem>
                <ListItem button onClick={()=>this.props.triggerParent('AddWorker')}>
                    <ListItemIcon>
                    <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Worker" />
                </ListItem>
                <ListItem button onClick={()=>this.props.triggerParent('NewBill')}>
                    <ListItemIcon>
                       
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    
                   <ListItemText primary="NewBill" />
                </ListItem>

                <ListItem button  onClick={()=>this.props.triggerParent('Products')}>
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products"   />
                </ListItem>
                <ListItem button onClick={()=>this.props.triggerParent('Home')}>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home"  />
                </ListItem>
            </div>
           
           
           
        
        )
    }
}

export default MenuList