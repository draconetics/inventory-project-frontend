import {http}  from  '../config/http-common'

class BrandService {

  getList() {
        return http.get("/api/brands");
  }

  createBrand(data:IBrand){
    return  http.post("/api/brands", data);    
  }

  updateBrand(id:string, data:IBrand){
    return  http.put("/api/brands/"+id, data);    
  }

  deleteBrand(id:string){
    return  http.delete("/api/brands/"+id);    
  }

}

const brandService = new BrandService();
export default brandService;
