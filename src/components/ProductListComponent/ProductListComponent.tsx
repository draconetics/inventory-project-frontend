import React from 'react';
import { Table, Button, Modal, Image, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsProductListComponent {
    products: IProduct[];
    getProducts: () => Promise<void>;
    deleteProductById: (id:string) => Promise<void>;
    /* createBrand:(data:IBrand)=> void;
    updateBrand:(data:IBrand)=> void;
    deleteBrand:(data:IBrand)=>void; */
}
  
interface IStateProductListComponent{
    productIdToDelete:string;
}


export default class componentName extends React.Component<IPropsProductListComponent,IStateProductListComponent> {

    constructor(props:IPropsProductListComponent){
      super(props);
      this.state = {
        productIdToDelete:'',
      };

      this.openDeleteDialog = this.openDeleteDialog.bind(this);
      this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);

    }

      componentDidMount(){
        this.props.getProducts();
      }

      closeDeleteDialog () {
        this.setState({
          ...this.state,
          productIdToDelete:'',
        });
      }

      openDeleteDialog (id:string) {
        this.setState({
          ...this.state,
          productIdToDelete:id
        });
      }

      deleteProduct() {
        const idToDelete = this.state.productIdToDelete;
        console.log('delete product');
        this.props.deleteProductById(idToDelete);
        this.closeDeleteDialog();
      }
    
      deleteDialog() {
        const show = (this.state.productIdToDelete)?true:false;
        return (
          <Modal show={show} onHide={this.closeDeleteDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Dialog</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Do you want to delete this item?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeDeleteDialog}>Cancel</Button>
              <Button variant="primary" onClick={this.deleteProduct}>Yes</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    
      render(){
        const productList = this.props.products;
        return (
          <div className="brand-list">
              <h2>this is brandlist component</h2>
              <h3>{JSON.stringify(this.props.products)}</h3>
              <div className="container">
                
              </div>
              <Link to={'/products/create'}>
                <Button variant="primary">Create new Product</Button>
              </Link>
              <div className="container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Brand</th>
                      <th>Gender</th>
                      <th>Cost(Bs.)</th>
                      <th>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList && productList.map((item, index)=>{
                      return (
                        <tr key={index}>
                          <td>{(item.code)?item.code:'No code Found'}</td>
                          <td>{(item.brand)?item.brand.name:'No brand found'}</td>
                          <td>
                            <Col xs={3} md={3}>
                              <Image thumbnail src={urlPreviewImage+item.imageId} alt={'not found'}/>
                            </Col>
                          </td>
                          <td>{item.cost}</td>
                          <td>
                            <Link to={'/products/edit/'+item._id}>
                              <button className="btn btn-success" >Edit</button>
                            </Link>
                            <button className="btn btn-danger"  onClick={()=>this.openDeleteDialog(item._id?item._id:'')} >Delete</button>
                            <Link to={'/products/code/'+item.code}>
                              <Button variant="outline-secondary">View</Button>
                            </Link>
                          </td>
                        </tr>
                      )
                      })
                    }
                    
                  </tbody>
                </Table>
                {this.deleteDialog()}
              </div>
          </div>
        );
      }
}
