import { RFC_2822 } from "moment";

import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
 export class Example extends Component {
  constructor(props){
    super(props)
    this.inputRef = React.createRef();
  }
  componentDidMount(){
    this.inputRef.current.focus();
  }
  render() {
    return (
      <div>
        <form ref={ this.inputRef}><TextField type="text" ></TextField></form>
      </div>
    )
  }
}

export default Example
