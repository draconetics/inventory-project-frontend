import React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row, Image } from 'react-bootstrap'
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsContainerViewComponent extends RouteComponentProps<any>{
    containerProductList:IProduct[];
    getProductListByContainerId:(code:string)=> void;
    
}

interface IStateContainertViewComponent{
    selectedContainer:IContainer;
}

export default class ContainerViewComponent extends React.Component<IPropsContainerViewComponent,IStateContainertViewComponent> {
    componentRef:any;
    constructor(props:IPropsContainerViewComponent){
        super(props);
        this.state = {
            selectedContainer:{
                type:'',
                space:''
            }
        };
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

    render(){
       
        const productList = this.props.containerProductList;
        const containerSelected = this.state.selectedContainer;
        return (
            <div className="product-view-component container">
                <h2>VIEW COMPONENT</h2>
                <Link to={
                        {
                        pathname:(containerSelected._id)?'/containers/testing/'+containerSelected._id:'/containers',
                        state:containerSelected
                        }
                    }>
                    <Button variant="outline-secondary">Test this container</Button>
                </Link>
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
                                <Card.Title>Product List
                                </Card.Title>
                                <ListGroup>
                                    {
                                        productList && productList.map((item, index)=>{
                                            return(<div key={index}>
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
            </div>
        );
    }

}
