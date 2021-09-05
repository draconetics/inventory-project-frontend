import React from 'react';
import {Button, Table, Modal, Form, ModalFooter} from 'react-bootstrap';

interface IPropsBrandListComponent {
  brands: IBrand[];
  getBrands: () => Promise<void>;
  createBrand:(data:IBrand)=> void;
  updateBrand:(data:IBrand)=> void;
  deleteBrand:(data:IBrand)=>void;
}

interface IStateBrandListComponent{
  editMode:boolean;
  show:boolean;
  deleteDialogShow:boolean;
  newBrand:IBrand;
}

export default class BrandListComponent extends React.Component<IPropsBrandListComponent,IStateBrandListComponent> {

  constructor(props:IPropsBrandListComponent){
    super(props);
    this.state = {
        editMode:false,
        show:false,
        deleteDialogShow:false,
        newBrand:{
          _id:'',
          code: '',
          name: ''
        }
    };
    this.modalHandleClose = this.modalHandleClose.bind(this);
    this.modalHandleShow = this.modalHandleShow.bind(this);
    this.createBrand = this.createBrand.bind(this);
    this.updateBrand = this.updateBrand.bind(this);
    this.saveBrand = this.saveBrand.bind(this);
    this.deleteBrand = this.deleteBrand.bind(this);
    this.dialogDeleteBrand = this.dialogDeleteBrand.bind(this);
    this.deleteModalHandleClose = this.deleteModalHandleClose.bind(this);
  }


  componentDidMount(){
    this.props.getBrands();
  }

  modalComponent(){
    return (<Modal show={this.state.show} onHide={this.modalHandleClose}>
      <Modal.Header>
        <Modal.Title>Register a Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {this.registerComponent()}
      </Modal.Body>
    </Modal>);
  }

  deleteModalComponent(){
    return (<Modal show={this.state.deleteDialogShow} onHide={this.deleteModalHandleClose}>
      <Modal.Header>
        {JSON.stringify(this.state)}
        <Modal.Title>Delete a Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete this item?
      </Modal.Body>
      <ModalFooter>
        <Button variant="secondary" onClick={this.deleteModalHandleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={this.deleteBrand}>
          Delete Brand
        </Button>
      </ModalFooter>
    </Modal>);
  }


  handleInputChange(e:any){

    const { name, value } = e.target;
    console.log(e.target);
    this.modalHandleClose();
    this.setState({
      ...this.state, 
      newBrand:{...this.state.newBrand, [name]: value}
    }); 
  }

  registerComponent(){
    return (
      <Form>
        {JSON.stringify(this.state)}
        <Form.Group controlId="formBrandCode">
          <Form.Label>Code</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="enter the code"
            name="code"
            defaultValue={this.state.newBrand.code}
            onChange={this.handleInputChange.bind(this)}
          />
        </Form.Group>
        <Form.Group controlId="formBrandName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text" 
            placeholder="enter the name"
            name="name"
            value={this.state.newBrand.name}
            onChange={e => this.handleInputChange(e)}
          />
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-around p-2">
          <Button variant="secondary" onClick={this.modalHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(this.state.editMode)?this.saveBrand:this.createBrand}>
            {(this.state.editMode)?"Update Brand":"Create Brand"}
          </Button>
        </div>
      </Form>
    );
  }

  createBrand(){
    const newBrand = this.state.newBrand;
    
    if(newBrand.code.trim() === '' || newBrand.name.trim() === '')
      return;

    this.props.createBrand({code:newBrand.code, name:newBrand.name});
    this.setState({
      ...this.state,
      show:false,
      newBrand:{
        _id:"",
        code:"",
        name:""
      }
    })
  }

  saveBrand(){
    const newBrand = {...this.state.newBrand}
    this.props.updateBrand(newBrand);
    this.setState({
      ...this.state,
      show:false,
      newBrand:{
        _id:'',
        code:'',
        name:''
      }
    })
  }

  modalHandleClose(){
    this.setState({
      ...this.state,
      show:false,
      newBrand:{
        _id:'',
        code:'',
        name:''
      }
    })
  }

  deleteModalHandleClose() {
    this.setState({
      ...this.state,
      deleteDialogShow:false,
    });
  }

  modalHandleShow(){
    this.setState({
      ...this.state,
      show:true
    })
  }

  updateBrand(item:IBrand) {
      this.setState({
        ...this.state,
        editMode:true,
        show:true,
        newBrand:{
          _id:item._id,
          code:item.code,
          name:item.name
        }
      });
  }

  deleteBrand(){
      const item = this.state.newBrand;
      console.log(item);
      if(item._id){
        this.props.deleteBrand(item);
        this.setState({
          ...this.state,
          deleteDialogShow:false
        });
      }else{
        return;
      }
  }

  dialogDeleteBrand(item:IBrand){
    this.setState({
      ...this.state,
      deleteDialogShow:true,
      newBrand:{
        _id:item._id,
        code:item.code,
        name:item.name
      }
    });
  }

  render(){
    const brandList = this.props.brands;
    return (
      <div className="brand-list">
          <h2>this is brandlist component</h2>
          <h3>{JSON.stringify(this.props.brands)}</h3>
          <div className="container">
            <button className="btn btn-primary" onClick={this.modalHandleShow}>Create new Brand</button>
          </div>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {brandList && brandList.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => this.updateBrand(item)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => this.dialogDeleteBrand(item)} >Delete</button>
                      </td>
                    </tr>
                  )
                  })
                }
                
              </tbody>
            </Table>
            {this.modalComponent()}
            {this.deleteModalComponent()}
          </div>
      </div>
    );
  }
}
