import React,{Component} from 'react';
import MaterialTable from 'material-table';
var request = require('request-promise');

export class MaterialTableDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      gets: [],
      data: [],
      columns: []
    }
  }
  updateWorker =(e) =>{
   
    console.log(this.state.data)
  }
  async componentDidMount(){
    let col=[
      { title: 'Worker Name', field: 'WorkerName' },
      { title: 'Worker Address', field: 'WorkerAddress' },
      { title: 'Worker Phone', field: 'WorkerPhone' },
    ]
    
    var options = {
      'method': 'GET',
      'url': 'http://localhost:4003/workers',
      'headers': {
        "X-Security-AuthKey": '7d9b436f-f551-46e3-9765-322adb5b8450',
      }
  };
  await request(options)
    .then((Response)=>{
      let data= JSON.parse(Response);
      this.setState({data: data})
      this.setState({columns: col})
      console.log(this.state.columns)
      console.log(this.state.data)
    })
  }
  render(){
    return(
      <div>
 <MaterialTable
      title="Editable Example"
      columns={this.state.columns}
      data={this.state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              this.setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                
                
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  this.updateWorker();
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              this.setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
      </div>
    )
  }
}
export default MaterialTableDemo