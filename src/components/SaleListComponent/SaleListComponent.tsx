import React from 'react';
import { Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IPropsSaleListComponent {
    sales: ISale[];
    getSales: () => Promise<void>;
}
  
interface IStateSaleListComponent{
}


export default class SaleListComponent extends React.Component<IPropsSaleListComponent,IStateSaleListComponent> {


      componentDidMount(){
        this.props.getSales();
      }
    
      render(){
        const saleList = this.props.sales;
        return (
          <div className="brand-list">
              <h2>this is SALELIST component</h2>
              <h3>{JSON.stringify(this.props.sales)}</h3>
              <div className="container">
                <Link to="/sales/qr">
                  <Button variant="success">New Sale by CAMERA</Button>
                </Link>
                
              </div>
              <div className="container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Sale Code</th>
                      <th>Client</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleList && saleList.map((item, index)=>{
                      let client = item.client;
                      let product = item.product;
                      let productBrand = (product && product.brand && product.brand.name)?product.brand.name:'';
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.sale_code}</td>
                          <td>{(client.name)?client.name:client}</td>
                          <td>Cost:{(product && product.cost)?product.cost:''}-Brand:{productBrand}</td>
                          <td>{item.date}</td>
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
