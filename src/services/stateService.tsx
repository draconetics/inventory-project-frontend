import {http}  from  '../config/http-common'

class StateService {

  getList() {
        return http.get("/api/states");
  }

  createState(data:IState){
    return  http.post("/api/states", data);    
  }

  updateState(id:string, data:IState){
    return  http.put("/api/states/"+id, data);    
  }

  deleteState(id:string){
    return  http.delete("/api/states/"+id);    
  }

}

const stateService = new StateService();
export default stateService;
