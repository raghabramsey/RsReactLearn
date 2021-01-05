var request = require('request-promise');
export class CategoryService{
    async GetCategory(){
        let data;
        let getCategoryOptions={
            method:'GET',
            url:'http://localhost:4001/category',
            headers:{
                'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
            }
        };
        await request(getCategoryOptions)
            .then((Response)=>{
                data= JSON.parse(Response);
                
                console.log(data)
            })
            .catch((err)=>{
                throw err
            })
        return data
    }
    async PostCategory(body){
        let status=0;
        var options = {
            'method': 'POST',
            'url': 'http://localhost:4001/category',
            'headers': {
              'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          
          };
          console.log("postcategory", options);
          await request(options, function (error, response) {
            if (error) throw new Error(error);
            status = response.statusCode;
            // window.location.reload();
         
          });
          return status;
    }
}