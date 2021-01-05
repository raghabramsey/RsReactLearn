var request = require('request-promise');
export class ProductService {
    async PostProducts(body){
        let status= 0;
        var options = {
            'method': 'POST',
            'url': 'http://localhost:4001/products',
            'headers': {
              'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          
          };
          console.log("postproduct", options);
          await request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log("response234234",response.statusCode);
            //window.location.reload();
           status= response.statusCode;
         
          });
          return status;
    }
    async getProducts(){
        let productData;
        let getProductOptions = {
            method: "GET",
            url: "http://localhost:4001/products",
            headers: {
              'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
            },
          };
          await request(getProductOptions)
            .then((Response) => {
               productData = JSON.parse(Response);
              
              console.log(productData);
            })
            .catch((err) => {
              throw err;
            });
        return productData;
    }
    async deleteProduct(productId){
        let status= 0;
        var options = {
            'method': 'DELETE',
            'url': `http://localhost:4001/Products/${productId}`,
            'headers': {
              'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
            }
          };
          await request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            status = response.statusCode;
          });
          return status;
    }
}