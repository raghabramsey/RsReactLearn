

var request = require('request-promise')

export function PostData(){
    let getProductOptions={
        method:'POST',
        url:'http://192.168.1.109:4003/login',
        headers:{
            'Authorization':'Basic cmFnaGFic2hyZXN0aGE6UmFtc2V5MTY=',
        }
    };
    request(getProductOptions)
        .then((Response)=>{
             let data= JSON.parse(Response);
             console.log(data.authkey);
             return data.authkey;
          
            //  data.forEach(function(table) {
            //   var tableName = table;
            //   console.log(tableName);
        //   });
               
            })
        .catch((err)=>{
            throw err;
        })
     
        

    
 
    
}