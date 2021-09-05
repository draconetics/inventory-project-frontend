import React from 'react';
import { Table} from 'react-bootstrap';

interface IPropsProductListComponent {
    clients: IClient[];
    getClients: () => Promise<void>;
    /* createBrand:(data:IBrand)=> void;
    updateBrand:(data:IBrand)=> void;
    deleteBrand:(data:IBrand)=>void; */
}
  
interface IStateProductListComponent{
}


export default class componentName extends React.Component<IPropsProductListComponent,IStateProductListComponent> {


      componentDidMount(){
        this.props.getClients();
      }
    
      render(){
        const clientList = this.props.clients;
        return (
          <div className="brand-list">
              <h2>this is CLIENT component</h2>
              <h3>{JSON.stringify(this.props.clients)}</h3>
              <div className="container">
                <button className="btn btn-primary">Create new Client</button>
              </div>
              <div className="container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientList && clientList.map((item, index)=>{
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            <button className="btn btn-success" >Edit</button>
                            <button className="btn btn-danger" >Delete</button>
                          </td>
                        </tr>
                      )
                      })
                    }
                    
                  </tbody>
                </Table>
              </div>
          </div>
        );
      }
}
