var request = require('request-promise');
export class ProductDetailService{
    async GetProductsDetails(){
        let productsDetailsData;
        let getProductsDetailsOptions = {
            method: "GET",
            url: "http://localhost:4001/ProductDetails",
            headers: {
              'X-security-Authkey': '23a5aabb-470b-44da-9402-92f36ee67d61',
            },
          };
          await request(getProductsDetailsOptions)
            .then((Response) => {
               productsDetailsData = JSON.parse(Response);
              
              console.log(productsDetailsData);
            })
            .catch((err) => {
              throw err;
            });
        return productsDetailsData;
    }
    async deleteProductDetail(productDetailId){
      let status= 0;
      var options = {
          'method': 'DELETE',
          'url': `http://localhost:4001/ProductDetails/${productDetailId}`,
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