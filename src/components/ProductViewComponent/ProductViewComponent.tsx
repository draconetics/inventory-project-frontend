import React from 'react';
import QRCode from 'qrcode';
import ReactToPrint from "react-to-print";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row, Image } from 'react-bootstrap'
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsProductViewComponent extends RouteComponentProps<any>{
    productSelected:IProduct;
    getProductById:(id:string)=> void;
    getProductByCode:(code:number)=> void;
}

interface IStateProductViewComponent{
    codeQrImage:string;
}

export default class ProductViewComponent extends React.Component<IPropsProductViewComponent,IStateProductViewComponent> {
    componentRef:any;
    constructor(props:IPropsProductViewComponent){
        super(props);
        this.state = {
            codeQrImage:''
        };
        
    }
    componentDidMount() {
        console.log('component did mount')
        const params = this.props.match.params;
        if( params && params.code ){
            console.log('watching id')
            const {code} = this.props.match.params;
            this.props.getProductByCode(code);
            this.generateQrCode(code);
        }else{
            console.log('redirection');
            this.props.history.push('/products');
        }
    }

    async generateQrCode (id:string) {
        
        try {
              const response = await QRCode.toDataURL(id);
              this.setState({
                  ...this.state,
                  codeQrImage: response
              });
        }catch (error) {
          console.log(error);
        }
    }

    render(){
        const codeQrImage = this.state.codeQrImage;
        const productSelected = this.props.productSelected;
        return (
            <div className="product-view-component container">
                <h2>VIEW COMPONENT</h2>
                <h3>{JSON.stringify(productSelected)}</h3>

                <Row>
                    <Col xs={12} md={6} lg={6} xl={6}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Product View
                                    <Col xs={12} md={12}>
                                        <Image thumbnail src={urlPreviewImage + productSelected.imageId} alt={'not found'}/>
                                    </Col>
                                </Card.Title>
                                <ListGroup>
                                    <ListGroup.Item><b>Cost:</b>{productSelected.cost}</ListGroup.Item>
                                    <ListGroup.Item><b>Gender:</b> {productSelected.gender}</ListGroup.Item>
                                    <ListGroup.Item><b>Brand:</b> {(productSelected.brand)?productSelected.brand.name:'undefined'}</ListGroup.Item>
                                    <ListGroup.Item><b>Url:</b> {window.location.href}</ListGroup.Item>
                                </ListGroup>
                                <Link to="/products">
                                    <Button variant="primary">Back to Products</Button>
                                </Link>
                                
                            </Card.Body>
                        </Card>
                        </Col>
                    <Col xs={12} md={6} lg={6} xl={6}>
                        <Card style={{ width: '18rem' }}>
                            
                            <Card.Body>
                                <Card.Title>Download QR Code</Card.Title>
                                {codeQrImage ? (
                                <a href={codeQrImage} download>
                                    <img src={codeQrImage} alt="img"/>
                                </a>) : 'ERROR generating QR code'}
                                
                            </Card.Body>
                            <ReactToPrint
                                pageStyle={`{size: 2.28in 2.28in}`}
                                trigger={() => <Button variant="danger">Print ticket!</Button>}
                                content={() => this.componentRef }
                            />
                            <div style={{display:'block'}}>
                                <ComponentToPrint
                                    qrImage={codeQrImage}
                                    product={productSelected} 
                                    ref={(el) => (this.componentRef = el) } 
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}

interface IComProps{
    qrImage:string;
    product:IProduct;
}

const boxStyle = {
    
    width:'200px',
    height:'100px',
    display:'flex',
    FlexDirection:'row',
    FlexWrap:'no-wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'0px',
    margin:'0px',
    boxSize:'border-box'
}

const data = {
    padding:'0px',
    margin:'0px',
    boxSize:'border-box',
    fontSize:'12px'
}

const paragraph = {
    fontWeight: 900,
    padding:'0px',
    margin:'0px',
    boxSize:'border-box',
}

const cost = {
    fontSize:'16px',
}

class ComponentToPrint extends React.Component <IComProps,any>{
    
    render() {
      console.log(this.props);
      const qrImage = this.props.qrImage;
      const product = this.props.product;
      return (
        <div style={boxStyle}>
            <div style={data}>
                <p style={paragraph}>Aeropostale</p>
                <p style={paragraph}>Size: L</p>
                <p style={paragraph}>T-shirt</p>
                <p style={cost}>ID<b>{product.code}</b></p>
            </div>
            {qrImage ? (
            <a href={qrImage} download>
                <img src={qrImage} alt="img" style={{width:'70px',height:'70px'}}/>
            </a>) : 'ERROR generating QR code'}
            <p style={cost}>Bs <b>{product.cost}.00</b></p>
        </div>
      );
    }
}