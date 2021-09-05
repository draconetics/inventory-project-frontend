import {http}  from  '../config/http-common'

class ProductService {

  getList() {
      return http.get("/api/products");
  }

  createProduct(data:IProduct){
      return  http.post("/api/products", data);    
  }

  getProductById(id:string) {
      return  http.get("/api/products/"+id);    
  }

  getProductByCode(id:number) {
    return  http.get("/api/products/code/"+id);    
  }

  deleteProductById(id:string){
    return  http.delete("/api/products/"+id);    
  }

  updateProduct(data:IProduct){
    return  http.put("/api/products/", data);    
  }
/*
  updateBrand(id:string, data:IBrand){
    return  http.put("/api/brands/"+id, data);    
  }

  deleteBrand(id:string){
    return  http.delete("/api/brands/"+id);    
  }
 */
}

const productService = new ProductService();
export default productService;
