import {http}  from  '../config/http-common'

class ContainerService {

  getList() {
        return http.get("/api/containers");
  }
 
  createContainer(data:IContainer){
    return  http.post("/api/containers", data);    
  }

  updateContainer(id:string, data:IContainer){
    return  http.put("/api/containers/"+id, data);    
  }

  deleteContainer(id:string){
    return  http.delete("/api/containers/"+id);    
  }

  getContainerById(id:string){
    return  http.get("/api/containers/"+id);    
  }

  getProductListByContainerId(id:string){
    return  http.get("/api/containers/product/"+id);    
  }
 
}

const containerService = new ContainerService();
export default containerService;
