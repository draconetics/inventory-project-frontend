import React from 'react';
import {Button, Table, Modal, Form, ModalFooter} from 'react-bootstrap';

interface IPropsStateListComponent {
  states: IState[];
  getStates: () => Promise<void>;
  createState:(data:IState)=> void;
  updateState:(data:IState)=> void;
  deleteState:(data:IState)=>void;
}

interface IStateStateListComponent{
  editMode:boolean;
  show:boolean;
  deleteDialogShow:boolean;
  newState:IState;
}

export default class StateListComponent extends React.Component<IPropsStateListComponent,IStateStateListComponent> {

  constructor(props:IPropsStateListComponent){
    super(props);
    this.state = {
        editMode:false,
        show:false,
        deleteDialogShow:false,
        newState:{
          _id:'',
          description: '',
          name: ''
        }
    };
    this.modalHandleClose = this.modalHandleClose.bind(this);
    this.modalHandleShow = this.modalHandleShow.bind(this);
    this.createState = this.createState.bind(this);
    this.updateState = this.updateState.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.dialogDeleteState = this.dialogDeleteState.bind(this);
    this.deleteModalHandleClose = this.deleteModalHandleClose.bind(this);
  }


  componentDidMount(){
    this.props.getStates();
  }

  modalComponent(){
    return (<Modal show={this.state.show} onHide={this.modalHandleClose}>
      <Modal.Header>
        <Modal.Title>Register a State</Modal.Title>
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
        <Modal.Title>Delete a State</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete this item?
      </Modal.Body>
      <ModalFooter>
        <Button variant="secondary" onClick={this.deleteModalHandleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={this.deleteState}>
          Delete State
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
      newState:{...this.state.newState, [name]: value}
    }); 
  }

  registerComponent(){
    return (
      <Form>
        {JSON.stringify(this.state)}
        
        <Form.Group controlId="formStateName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text" 
            placeholder="enter the name"
            name="name"
            value={this.state.newState.name}
            onChange={e => this.handleInputChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formStateCode">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="enter the description"
            name="description"
            defaultValue={this.state.newState.description}
            onChange={this.handleInputChange.bind(this)}
          />
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-around p-2">
          <Button variant="secondary" onClick={this.modalHandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(this.state.editMode)?this.saveState:this.createState}>
            {(this.state.editMode)?"Update State":"Create State"}
          </Button>
        </div>
      </Form>
    );
  }

  createState(){
    const newState = this.state.newState;
    
    if(newState.description.trim() === '' || newState.name.trim() === '')
      return;

    this.props.createState({description:newState.description, name:newState.name});
    this.setState({
      ...this.state,
      show:false,
      newState:{
        _id:"",
        description:"",
        name:""
      }
    })
  }

  saveState(){
    const newState = {...this.state.newState}
    this.props.updateState(newState);
    this.setState({
      ...this.state,
      show:false,
      newState:{
        _id:'',
        description:'',
        name:''
      }
    })
  }

  modalHandleClose(){
    this.setState({
      ...this.state,
      show:false,
      newState:{
        _id:'',
        description:'',
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

  updateState(item:IState) {
      this.setState({
        ...this.state,
        editMode:true,
        show:true,
        newState:{
          _id:item._id,
          description:item.description,
          name:item.name
        }
      });
  }

  deleteState(){
      const item = this.state.newState;
      console.log(item);
      if(item._id){
        this.props.deleteState(item);
        this.setState({
          ...this.state,
          deleteDialogShow:false
        });
      }else{
        return;
      }
  }

  dialogDeleteState(item:IState){
    this.setState({
      ...this.state,
      deleteDialogShow:true,
      newState:{
        _id:item._id,
        description:item.description,
        name:item.name
      }
    });
  }

  render(){
    const StateList = this.props.states;
    return (
      <div className="State-list">
          <h2>this is Statelist component</h2>
          <h3>{JSON.stringify(StateList)}</h3>
          <div className="container">
            <button className="btn btn-primary" onClick={this.modalHandleShow}>Create new State</button>
          </div>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Name</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {StateList && StateList.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.description}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => this.updateState(item)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => this.dialogDeleteState(item)} >Delete</button>
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
