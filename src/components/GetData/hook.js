import React, {useState, useEffect} from 'react';
var request = require('request-promise');

function HookCounter(){
   const [x,setX]=useState(0);
   const [y,setY]= useState(0);
   const logMousePosition = e =>{
       console.log('Mouse event');
       setX(e.clientX);
       setY(e.clientY)
   }
   useEffect(()=>{
       window.addEventListener('mousemove',logMousePosition)
       var options = {
        'method': 'GET',
        'url': 'http://localhost:4003/workers',
        'headers': {
          'X-security-AuthKey': global.Authkey
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
   }, [])
    return(
        
            <div>
                Hookes X={x} Y={y}
            </div>
    )
}
export default HookCounter