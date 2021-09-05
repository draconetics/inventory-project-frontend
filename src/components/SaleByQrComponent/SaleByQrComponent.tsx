import React from 'react';
import {Button, Image, Col, Row, Table, Modal, Form} from 'react-bootstrap';
import { RouteComponentProps } from "react-router-dom";
import QrReader from 'modern-react-qr-reader';
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsSaleQromponent extends RouteComponentProps<any>{
  cart: IProduct[];
  productSelected:IProduct,
  productsError:string;
  addToCart:(data:IProduct) => Promise<void>,
  deleteFromCart:(data:IProduct) => Promise<void>,
  getProductById:(id:string) => Promise<void>,
  getProductByCode:(id:number) => Promise<void>,
  
}

interface IStateSaleQrComponent{
  scanResultWebcam:string;
  showDialogItemFound:boolean;
  inputSearch:string;
  
}

export default class ProductCreateComponent extends React.Component<IPropsSaleQromponent,IStateSaleQrComponent> {

  constructor(props:IPropsSaleQromponent){
    super(props);
    this.state = {
        scanResultWebcam:'',
        showDialogItemFound:false,
        inputSearch:''
    };

    this.handleErrorWebCam = this.handleErrorWebCam.bind(this);
    this.handleScanWebCam = this.handleScanWebCam.bind(this);
    this.closeDialogItemFound = this.closeDialogItemFound.bind(this);
    this.openDialogItemFound = this.openDialogItemFound.bind(this);

    this.searchProductByCode = this.searchProductByCode.bind(this);
    this.onInputSearch = this.onInputSearch.bind(this);
    
  }

  handleErrorWebCam(error){
    console.log(error);
    alert(error);
  }
  async handleScanWebCam(result){
    if (result){
        console.log(result);
        await this.props.getProductByCode(result);
        await this.props.addToCart(this.props.productSelected);
        this.setState({
            ...this.state,
            scanResultWebcam:result,
            showDialogItemFound:true
        });
    }
   }

   deleteItem(item:IProduct) {
       if(item._id){
            this.props.deleteFromCart(item);
       }
   }

   async searchProductByCode() {
        const code = Number.parseInt(this.state.inputSearch,10);
        await this.props.getProductByCode(code);
        console.log(this.props.productsError);
        if(this.props.productsError.length === 0){
            await this.props.addToCart(this.props.productSelected);
            this.setState({
                ...this.state,
                showDialogItemFound:true,
            });
        }
            
   }

   onInputSearch(e) {
        console.log(e);
        this.setState({
            ...this.state,
            inputSearch:e.target.value
        });
   }

   tableProductList() {
       let cart = this.props.cart;
       let error = this.props.productsError;
       return (
        <>
        <Form>
            <Form.Row className="align-items-center">
                <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                    Search by Code - {error}
                </Form.Label>
                <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="10000"
                    type="number"
                    onChange={this.onInputSearch}
                />
                </Col>
                <Col xs="auto">
                <Button className="mb-2" onClick={this.searchProductByCode}>
                    Search
                </Button>
                </Col>
            </Form.Row>
        </Form>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Cost</th>
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>
            {cart.length === 0?<tr><td>Cart is Empty</td></tr>:null}
            {cart && cart.map((item, index)=>{
                return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><Image thumbnail src={urlPreviewImage+item.imageId} alt={'not found'}/></td>
                    <td>Bs. {item.cost}</td>
                    <td>
                        <Button variant="danger" onClick={() => this.deleteItem(item)} >Delete</Button>
                    </td>
                </tr>
                )
                })
            }
            
            </tbody>
        </Table>
        </>
       );
   }

  render(){
      const cart = this.props.cart;
      
    return (
        <div className="product-create-component container">
            <h2>SALE BY QR</h2>
            <Row>
                <h3>Qr Code Scan by Web Cam</h3>
                <h4>CART COUNT: {cart.length}</h4>
                <Col sm={12} md={6}>
                    <QrReader
                    delay={500}
                    style={{width: '100%'}}
                    onError={this.handleErrorWebCam}
                    onScan={this.handleScanWebCam}
                    />
                    <h3>Scanned By WebCam Code: {this.state.scanResultWebcam}</h3>
                </Col>
                <Col sm={12} md={6}>
                    <div>this is a list</div>
                    {this.tableProductList()}
                </Col>
                {this.dialogItemFound()}
            </Row>
            <h3>{JSON.stringify(this.state)}</h3>
            <h2>this is the form2</h2>
        </div>
    );
  }

  closeDialogItemFound() {
      this.setState({
          ...this.state,
          showDialogItemFound:false
      });
  }

  openDialogItemFound() {
    this.setState({
        ...this.state,
        showDialogItemFound:true
    });
  }

  dialogItemFound() {
      const show = this.state.showDialogItemFound;
      const product = this.props.productSelected;
      return (
        <Modal show={show} onHide={this.closeDialogItemFound}>
            <Modal.Header closeButton>
            <Modal.Title>Item found!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div><Image thumbnail src={urlPreviewImage+product.imageId} alt={'not found'}/></div>
                <h3>Bs. {product.cost}</h3>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={this.closeDialogItemFound}>
                Accept
            </Button>
            </Modal.Footer>
        </Modal>
      );
  }
}
