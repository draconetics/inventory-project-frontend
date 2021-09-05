import {http}  from  '../config/http-common'

class SaleService {

  getList() {
      return http.get("/api/sales");
  }

  createSale(data:ISale){
      return  http.post("/api/sales", data);    
  }

  getSaleById(id:string) {
      return  http.get("/api/sales/"+id);    
  }
  
  updateSale(id:string, data:IBrand){
    return  http.put("/api/sales/"+id, data);    
  }

  deleteSale(id:string){
    return  http.delete("/api/sales/"+id);    
  }
}

const saleService = new SaleService();
export default saleService;
