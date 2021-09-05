import {http}  from  '../config/http-common'

class ClientService {

  getList() {
      return http.get("/api/clients");
  }

  createClient(data:IClient){
      return  http.post("/api/clients", data);    
  }

  getClientById(id:string) {
      return  http.get("/api/clients/"+id);    
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

const clientService = new ClientService();
export default clientService;
