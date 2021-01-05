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
import EditIcon from "@material-ui/icons/Edit";
var request = require("request-promise");
var moment = require("moment");

class UpdateWorker extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            bill: this.props.billData,
            workers: [],
            workersCopy: [],
            workerName: '',
            workerPhone: '',
            workerAddress: '',
            workingDays: "",
            wage: "",
            autoCompleteWorker: {},
            workOrders: [],
        }
        this.workerList = [];
        this.workerOrderList =[]
    
        
    }
    componentDidMount() {
        let data=this.state.bill
        
        this.setState({
          workOrders: data[0].workers,
        })
        
        let workorderlist= [];
        workorderlist= workorderlist.concat(data[0].workers);

        this.workerOrderList= workorderlist;
        console.log("UpdateWorker", this.workerOrderList)
        let getCategoryOptions = {
          method: "GET",
          url: "http://localhost:4003/workers",
          headers: {
            "X-security-Authkey": global.Authkey,
          },
        };
        request(getCategoryOptions)
          .then((Response) => {
            let workerData = JSON.parse(Response);
      
            let workOrderId =[]
      
            for(const data of this.workerOrderList){
              workOrderId.push(data.WorkerId);
            }

            let workOrderNotInList= workerData.filter(json => !workOrderId.includes(json.WorkerId))
         
          
            this.workerList= workOrderNotInList;
            
            this.setState({

              workers: this.workerList,
              workersCopy: workerData,
            });
          })
          .catch((err) => {
            throw err;
          });
          this.props.workerData(this.workerOrderList);
      }
      addWorker = (e) => {
        e.preventDefault();
        
        var tempWorkers= this.state.workers;
        var filterWorkers= tempWorkers.filter((json)=>{
          return json.WorkerId !== this.state.workerId
        });
    
        var data = {
          WorkerId: this.state.workerId,
          WorkerName: this.state.workerName,
          WorkerPhone: this.state.workerPhone,
          WorkerAddress: this.state.workerAddress,
          Wage: this.state.wage,
          WorkingDays: this.state.workingDays,
        };
    
        this.workerOrderList.push(data);
        console.log("Nefoli Ho ni :D", this.workerOrderList);
    
        this.setState({
          workers: filterWorkers,
          workOrders: this.workerOrderList,
          workingDays: "",
          wage: "",
          autoCompleteWorker: {},
        });
        this.props.workerData(this.workerOrderList);
    
      };
      delete= (workerId) =>{

        var tempWorkers= this.state.workersCopy;
        const filterWorkers= tempWorkers.filter((json)=>{
          return json.WorkerId == workerId;
        });
        console.log("object", filterWorkers);
        var workerList= this.state.workers;
        workerList.push(filterWorkers[0]);
        
        var tempWorkOrders= this.state.workOrders;
        const filterWorkOrders= tempWorkOrders.filter((json)=> {
          return json.WorkerId !== workerId;
        });
        this.workerList = filterWorkOrders;
        this.workerOrderList= filterWorkOrders;
        console.log("Neali", this.workerOrderList);
        this.setState({
          workOrders: filterWorkOrders,
          workers: workerList,
        });
        this.props.workerData(filterWorkOrders);
    
      }
      myChangeHandler = async (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        await this.setState({ [nam]: val });
      };
      render() {
       
        const { workers } = this.state;
        const { workOrders } = this.state;
        return (
          <>
        
            <div>
            <h2>Workers</h2>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <form>
                  <ListItemText primary="Workers" />
                  <Autocomplete
                    id="combo-box-demo"
                    style={{ width: 300 }}
                    name="categoryId"
                    options={workers}
                    
                    value={this.state.autoCompleteWorker}
                    onChange={(event, newValue) => {
                      console.log("amamama", newValue);
                      this.setState({
                        workerId: newValue.WorkerId,
                        workerName: newValue.WorkerName,
                        workerPhone: newValue.WorkerPhone,
                        workerAddress: newValue.WorkerAddress,
                        autoCompleteWorker: newValue,
                      });
                    }}
                    getOptionLabel={(option) => option.WorkerName}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workers" variant="outlined" />
                    )}
                  />
                </form>
              </Grid>
    
              <Grid item xs={2}>
                <form>
                  <ListItemText primary="Wage" />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="wage"
                    value={this.state.wage}
                    onChange={this.myChangeHandler}
                  />
                </form>
              </Grid>
              <Grid item xs={2}>
                <form>
                  <ListItemText primary="Working Days" />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="workingDays"
                    value={this.state.workingDays}
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
                        onClick={this.addWorker.bind(this)}
                      >
                        Add Column
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        onClick={this.addWorker}
                      >
                        Edit Column
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            </div>
            <div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Worker Name</TableCell>
                    <TableCell>Worker Phone</TableCell>
                    <TableCell>Worker Address</TableCell>
                    <TableCell>Wage</TableCell>
                    <TableCell>Working Days</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workOrders.map((row) => (
                    <TableRow key={row.WorkerId}>
                      <TableCell>{row.WorkerName}</TableCell>
                      <TableCell>{row.WorkerPhone}</TableCell>
                      <TableCell>{row.WorkerAddress}</TableCell>
                      <TableCell>{row.Wage}</TableCell>
                      <TableCell>{row.WorkingDays}</TableCell>
                      <TableCell>{row.DateCreated ? moment(row.DateCreated).format('Do MMM YYYY') : moment().format("Do MMM YYYY")}</TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => this.delete(row.WorkerId)}
                        ></DeleteIcon>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
      
          </>
        );
      }
    
}
export default UpdateWorker