import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from "@material-ui/icons/Delete";
var request = require("request-promise");
var moment = require("moment");
 class ViewWorkers extends Component{
    constructor(props) {
        super(props)
    
        this.state = {

            workers: [],
            filterWorkers: [],
            workersCopy: [],
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
      
            // workeratDa= workerData.concat(this.props.propsFromPostWorker);
            
            this.setState({
             
              workers: workerData,
              workersCopy: workerData,
            });
          })
          .catch((err) => {
            throw err;
          });
    
      }
      delete= (workerId) =>{

       
        var options = {
          'method': 'DELETE',
          'url': `http://localhost:4003/Worker/${workerId}`,
          'headers': {
            'X-Security-AuthKey': global.Authkey
          }
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
        var tempWorkers= this.state.workers;
        const filterWorkers= tempWorkers.filter((json)=>{
          return json.WorkerId != workerId;
        });
        console.log("object", filterWorkers);
        
        this.setState({
          workers: filterWorkers,
        });
      }
      

    render() {
       
        const { workers } = this.state;
        return (
            
             <div>
<div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Worker Name</TableCell>
                    <TableCell>Worker Phone</TableCell>
                    <TableCell>Worker Address</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workers.map((row) => (
                    <TableRow key={row.WorkerId}>
                      <TableCell>{row.WorkerName}</TableCell>
                      <TableCell>{row.WorkerPhone}</TableCell>
                      <TableCell>{row.WorkerAddress}</TableCell>
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
             </div>
        );
    }
    
}
export default ViewWorkers