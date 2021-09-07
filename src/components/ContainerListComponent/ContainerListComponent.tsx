import React from 'react';
import {Button, Table, Modal, Form, ModalFooter} from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IPropsContainerListComponent {
  containers: IContainer[];
  getContainers: () => Promise<void>;
  createContainer:(data:IContainer)=> void;
  updateContainer:(data:IContainer)=> void;
  deleteContainer:(data:IContainer)=>void; 
}

interface IStateBrandListComponent{
  editMode:boolean;
  show:boolean;
  deleteDialogShow:boolean;
  newContainer:IContainer;
}

export default class BrandListComponent extends React.Component<IPropsContainerListComponent,IStateBrandListComponent> {

  constructor(props:IPropsContainerListComponent){
    super(props);
    this.state = {
        editMode:false,
        show:false,
        deleteDialogShow:false,
        newContainer:{
          _id:'',
          type: '',
          space: ''
        }
    };
    this.modalHandleShow = this.modalHandleShow.bind(this);
    this.modalHandleClose = this.modalHandleClose.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
    this.saveContainer = this.saveContainer.bind(this);
    this.deleteContainer = this.deleteContainer.bind(this);
    this.dialogDeleteContainer = this.dialogDeleteContainer.bind(this);
    this.deleteModalHandleClose = this.deleteModalHandleClose.bind(this);

  }


  componentDidMount(){
    this.props.getContainers();
  }

  modalHandleShow(){
    this.setState({
      ...this.state,
      show:true
    })
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

  modalHandleClose(){
    this.setState({
      ...this.state,
      show:false,
      newContainer:{
        _id:'',
        type:'',
        space:''
      }
    })
  }

  registerComponent(){
    return (
      <Form>
        {JSON.stringify(this.state)}
        <Form.Group controlId="formBrandCode">
          <Form.Label>Type</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="enter the type"
            name="type"
            defaultValue={this.state.newContainer.type}
            onChange={this.handleInputChange.bind(this)}
          />
        </Form.Group>
        <Form.Group controlId="formBrandName">
          <Form.Label>Space</Form.Label>
          <Form.Control
            type="text" 
            placeholder="enter the space"
            name="space"
            value={this.state.newContainer.space}
            onChange={e => this.handleInputChange(e)}
          />
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-around p-2">
          <Button variant="secondary" onClick={this.modalHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(this.state.editMode)?this.saveContainer:this.createContainer}>
            {(this.state.editMode)?"Update Container":"Create Container"}
          </Button>
        </div>
      </Form>
    );
  }

  handleInputChange(e:any){

    const { name, value } = e.target;
    console.log(e.target);
    this.modalHandleClose();
    this.setState({
      ...this.state, 
      newContainer:{...this.state.newContainer, [name]: value}
    }); 
  }

  createContainer(){
    const newContainer = this.state.newContainer;
    
    if(newContainer.type.trim() === '' || newContainer.space.trim() === '')
      return;

    this.props.createContainer({type:newContainer.type, space:newContainer.space});
    this.setState({
      ...this.state,
      show:false,
      newContainer:{
        _id:"",
        type:"",
        space:""
      }
    })
  }

  saveContainer(){
    const newContainer = {...this.state.newContainer}
    this.props.updateContainer(newContainer);
    this.setState({
      ...this.state,
      show:false,
      newContainer:{
        _id:'',
        type:'',
        space:''
      }
    })
  }

  
  updateContainer(item:IContainer) {
    this.setState({
      ...this.state,
      editMode:true,
      show:true,
      newContainer:{
        _id:item._id,
        type:item.type,
        space:item.space
      }
    });
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
        <Button variant="primary" onClick={this.deleteContainer}>
          Delete Brand
        </Button>
      </ModalFooter>
    </Modal>);
  }

  deleteModalHandleClose() {
    this.setState({
      ...this.state,
      deleteDialogShow:false,
    });
  }

  deleteContainer(){
      const item = this.state.newContainer;
      console.log(item);
      if(item._id){
        this.props.deleteContainer(item);
        this.setState({
          ...this.state,
          deleteDialogShow:false
        });
      }else{
        return;
      }
  }

  dialogDeleteContainer(item:IContainer){
    this.setState({
      ...this.state,
      deleteDialogShow:true,
      newContainer:{
        _id:item._id,
        type:item.type,
        space:item.space
      }
    });
  } 

  render(){
    const containerList = this.props.containers;
    return (
      <div className="brand-list">
          <h2>this is containerlist component</h2>
          <h3>{JSON.stringify(this.props.containers)}</h3>
          <div className="container">
            <button className="btn btn-primary" onClick={this.modalHandleShow}>Create new Container</button>
          </div>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Space</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {containerList && containerList.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.type}</td>
                      <td>{item.space}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => this.updateContainer(item) }>Edit</button>
                        <button className="btn btn-danger" onClick={ () => this.dialogDeleteContainer(item) } >Delete</button>
                        <Link to={
                          {
                            pathname:(item._id)?'/containers/code/'+item._id:'/containers',
                            state:item
                          }
                        }>
                            <Button variant="outline-secondary">View</Button>
                        </Link>
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
