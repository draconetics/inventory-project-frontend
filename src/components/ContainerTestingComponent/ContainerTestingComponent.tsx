import React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row, Image, Modal, ModalFooter } from 'react-bootstrap'
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsContainerViewComponent extends RouteComponentProps<any>{
    containerProductList:IProduct[];
    getProductListByContainerId:(code:string)=> void;
    deleteProductFromContainer:(code:string)=> void;
    
}

interface IStateContainertViewComponent{
    selectedContainer:IContainer;
    warningDialogShow: boolean;
    productToDelete: IProduct;
}

export default class ContainerTestingComponent extends React.Component<IPropsContainerViewComponent,IStateContainertViewComponent> {
    componentRef:any;
    constructor(props:IPropsContainerViewComponent){
        super(props);
        this.state = {
            selectedContainer:{
                type:'',
                space:''
            },
            warningDialogShow:false,
            productToDelete:{
                _id:'',
                gender:'',
                cost:0
            }
        };
        this.warningModalHandleClose = this.warningModalHandleClose.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        console.log('component did mount')
        const params = this.props.match.params;
        if( params && params.code ){
            console.log('watching id')
            const {code} = this.props.match.params;
            if(this.props.location.state)
                this.setState({
                    ...this.state,
                    selectedContainer:(this.props.location.state as IContainer)
                })
            this.props.getProductListByContainerId(code);
        }else{
            console.log('redirection');
            this.props.history.push('/containers');
        }
    }

    deleteProduct(){
        const item = this.state.productToDelete;
        console.log('delete'+item._id);
        if(item._id)
        this.props.deleteProductFromContainer(item._id);
        this.warningModalHandleClose();
    }

    warningModalHandleClose() {
        this.setState({
          ...this.state,
          warningDialogShow:false
        });
    }

    warningModalHandleShow(item:IProduct) {
        this.setState({
          ...this.state,
          warningDialogShow:true,
          productToDelete:item
        });
    }
    

    warningModalComponent(){
        const item = this.state.productToDelete;
        return (<Modal show={this.state.warningDialogShow} onHide={this.warningModalHandleClose}>
          <Modal.Header>
            <Modal.Title>Product Verified</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <Image thumbnail src={urlPreviewImage+item.imageId} alt={'not found'}/>
            <h1><b>{item.code}</b></h1>
          </Modal.Body>
          <ModalFooter className="d-flex justify-content-between">
            <Button variant="secondary" onClick={this.warningModalHandleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.deleteProduct}>
              Item Verified!
            </Button>
          </ModalFooter>
        </Modal>);
      }

    render(){
       
        const productList = this.props.containerProductList;
        const containerSelected = this.state.selectedContainer;
        return (
            <div className="product-view-component container">
                <h2>VIEW COMPONENT</h2>
                <h3>{JSON.stringify(productList)}</h3>
                <h3>{JSON.stringify(containerSelected)}</h3>

                <Row>
                    <Col xs={12} md={6} lg={6} xl={6}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Product View
                                    <Col xs={12} md={12}>
                                        {containerSelected._id}
                                    </Col>
                                </Card.Title>
                                <ListGroup>
                                    <ListGroup.Item><b>Space:</b>{containerSelected.space}</ListGroup.Item>
                                    <ListGroup.Item><b>Type:</b> {containerSelected.type}</ListGroup.Item>
                                    <ListGroup.Item><b>Id:</b> {(containerSelected._id)?containerSelected._id:'no number'}</ListGroup.Item>
                                    <ListGroup.Item><b>Url:</b> {window.location.href}</ListGroup.Item>
                                </ListGroup>
                                <Link to="/containers">
                                    <Button variant="primary">Back to Containers</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                        </Col>
                    <Col xs={12} md={6} lg={6} xl={6}>
                        <Card style={{ width: '18rem' }}>
                            
                            <Card.Body>
                                <Card.Title>Product list to TESTING
                                </Card.Title>
                                <ListGroup>
                                    {
                                        productList && productList.map((item, index)=>{
                                            return(<div key={index} onClick={()=>this.warningModalHandleShow(item)}>
                                                <Image thumbnail src={urlPreviewImage+item.imageId} alt={'not found'}/>
                                                <ListGroup.Item><b>{item.code}</b> {item.gender} - {item.cost}Bs</ListGroup.Item>
                                            </div>);
                                        })
                                    }
                                </ListGroup>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                </Row>
                {this.warningModalComponent()}
            </div>
        );
    }

}
