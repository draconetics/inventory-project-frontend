import React from 'react';
import Webcam from "react-webcam";
import {Button, Form, Row, Col } from 'react-bootstrap';
import { RouteComponentProps, Link } from "react-router-dom";
import { urlPreviewImage } from '../../config/google-drive';

interface IPropsProductCreateComponent extends RouteComponentProps<any>{
  brands: IBrand[];
  containers: IContainer[];
  states: IState[];
  productSelected: IProduct;
  getBrands: () => Promise<void>;
  getContainers: () => Promise<void>;
  getStates: () => Promise<void>;
  createProduct:(data:IProduct, image:string)=> void;
  updateProduct:(data:IProduct, image:string)=> void;
  getProductById:(data:string) => void;
}

interface IStateProductCreateComponent{
  _id:string;
  gender:string;
  cost:number;
  brand:string;
  imageSrc:string;
  editMode:boolean;
  container:string;
  state:string;
}

export default class ProductCreateComponent extends React.Component<IPropsProductCreateComponent,IStateProductCreateComponent> {

  camera:any;
  constructor(props:IPropsProductCreateComponent){
    super(props);
    this.state = {
        _id:'',
        gender:'',
        cost:0,
        container:'',
        brand:'',
        imageSrc:'',
        editMode:false,
        state:''
    };

    this.camera = React.createRef();

    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.capture = this.capture.bind(this);
  }

  async componentDidMount() {
      await this.props.getBrands();  
      await this.props.getContainers();     
      await this.props.getStates();
      await this.getDefaultValueOfSelect();
      this.getDefaultValuesToUpdate();
  }

  getDefaultValueOfSelect() {
    if(this.props.brands.length > 0){
        let firstBrand = this.props.brands[0]._id;
        if(firstBrand){
            this.setState({
                ...this.state,
                brand: firstBrand,
            });
        }
    }else{
        this.props.history.push('/brands');
    } 
  }

   async getDefaultValuesToUpdate() {
    const params = this.props.match.params;
    if( params && params.id && params.id.length === 24){
        console.log('watching id - edit object')
        const {id} = this.props.match.params;
        await this.props.getProductById(id);
        console.log(this.props.productSelected);
        const product = this.props.productSelected;
        const brandId = (product.brand&&product.brand._id)?product.brand._id:'';
        this.setState({
            ...this.state,
            gender:product.gender,
            cost:product.cost,
            brand:brandId,
            imageSrc:product.imageId+'',
            container:product.container?._id?product.container._id:'',
            state:product.state?._id?product.state._id:'',
            editMode:true,
            _id:id
        });
    }
  }

  saveProduct() {
    const brandId = this.state.brand;
    const brandList = this.props.brands;
    const brand = brandList.filter((item)=>item._id === brandId)[0];

    const containerId = this.state.container;
    const containerList = this.props.containers;
    const container = containerList.filter((item)=>item._id === containerId)[0];

    const stateId = this.state.state;
    const stateList = this.props.states;
    const state = stateList.filter((item)=>item._id === stateId)[0];

    const {cost, gender, _id} = this.state;
    let product:IProduct = {cost, gender, brand, container, state };
    

    if(this.state.imageSrc && brand && state && cost && gender){
        const imageBase64 = this.state.imageSrc;
        if(this.state.editMode === false){    
            this.props.createProduct( product, imageBase64);
          }else{
            product = { _id:_id, ...product };  
            this.props.updateProduct( product, imageBase64);
          }
          this.props.history.push('/products');
    }else
    console.log('we need more data');
  }

  onChangeBrand(e) {

      this.setState({
          ...this.state,
          [e.target.name]: e.target.value
      });
  }

  webcamComponent(){
      return (
        <>
            <Webcam
                audio={false}
                ref={this.camera}
                screenshotFormat="image/jpeg"
            />
            <Button onClick={this.capture}>Capture photo</Button>
        </>
      );
  }
  
  capture() {
      this.setState({
          ...this.state,
          imageSrc:this.camera.current.getScreenshot()
      });
  }

  registerForm() {
      const brands = this.props.brands;
      const containers = this.props.containers;
      const states = this.props.states;
      const selectedId = this.state.brand;
      const containerId = this.state.container;
      const stateId = this.state.state;
      return(
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select the Brand</Form.Label>
                <Form.Control name="brand" as="select" onChange={this.onChangeBrand}>
                {brands && brands.map((item,index) => {
                    return (
                        <option
                            key={index}
                            value={item._id}
                            selected={selectedId === item._id?true:false}
                        >
                            {item.name}
                        </option>
                    );
                })}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelectContainer">
                <Form.Label>Select the Container</Form.Label>
                <Form.Control name="container" as="select" onChange={this.onChangeBrand}>
                    <option value="" selected={containerId === ""?true:false}>-Empty-</option>
                    {containers && containers.map((item,index) => {
                        return (
                            <option
                                key={index}
                                value={item._id}
                                selected={containerId === item._id?true:false}
                            >
                                {item.type}-{item.space}
                            </option>
                        );
                    })}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelectState">
                <Form.Label>Select the State</Form.Label>
                <Form.Control name="state" as="select" onChange={this.onChangeBrand}>
                    <option value="" selected={stateId === ""?true:false}>-Empty-</option>
                    {states && states.map((item,index) => {
                        return (
                            <option
                                key={index}
                                value={item._id}
                                selected={stateId === item._id?true:false}
                            >
                                {item.name}-{item.description}
                            </option>
                        );
                    })}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control 
                    value={this.state.gender}
                    name="gender"
                    type="text"
                    placeholder="Enter gender"
                    onChange={this.onChangeBrand}
                />
            </Form.Group>
            <Form.Group controlId="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                    value={this.state.cost}
                    name="cost"
                    type="number"
                    placeholder="12.4"
                    onChange={this.onChangeBrand}
                />
            </Form.Group>
            <Button variant="primary" onClick={this.saveProduct}>
                Save Product
            </Button>
            <Link to={'/products/'}>
                <Button variant="outline-secondary">Cancel</Button>
            </Link>
        </Form>
      );
  }

  render(){
      const src = this.state.imageSrc;
      const editMode = this.state.editMode;
    return (
        <div className="product-create-component container">
            <h2>this is create product component</h2>
            <h3>{JSON.stringify(this.state)}</h3>
            <Row>
                <Col sm={12} md={6}>
                    {
                        editMode?
                        ""
                        :
                        (<div><Webcam
                            audio={false}
                            ref={this.camera}
                            screenshotFormat="image/jpeg"
                        /><Button onClick={this.capture}>Capture photo</Button></div>)
                    }

                </Col>
                <Col sm={12} md={6}>
                    {editMode?
                        <img src={urlPreviewImage+src} alt="Not Found"/>
                        :
                        <img src={(src)?src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAXVBMVEUpMTRnjLEiJiNcfJxrkbgkKSgoLzEmLS5EWWxXdpM0QkxAVGUuOT9kiKslKytSbohPaYJggqM+UF8wO0I6SldIX3Q2RE9LY3oyP0crNDk+UWFWdJA7S1lPaH9jhacMRR/OAAADlElEQVR4nO3c7XKqMBSFYSi4CSCB8CGkKvd/mUfAVoNgHUiPdbuef51aprwDAQLiOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6NAbiySAT17jVYIZFNloUVZ1cjg2Wu1WJypxLUqUVn87LVaiLbKtxuj46vti+4wwvKmMUjEs9drkaBSv1HDdVX1isOHPA45fIuGHLV89rot8DH8861oIksa0Q6BP569bgucc3gbsmbjMchhb5HIYeCWo9/kly+SVQ4K9GlU3RXLT7M55dBNlXbXHfu6WrqBMMpBTfx1zq6KhT3Y5CAdeZcLmHa37LqDTY5tap5o74sli2ScY8nmwSVHUI0uw/wqWtCDTY56PPNRl/M5Zs9NuOSQ2aiGG4r5s4/oc2ZXYpMjHefw5ictxN7NDpM93jAH6dM6t+nklPn75aAy7H+fTu0vXHLcHFnmdgfKz2Nu0k4cetjkEKMavmimclBwmW0Ob2cGuOSgnWfmULvJv9nGV58pb3YnLjkcKcxpdTG5bezMZDeXemxyUCSSy5mYX01tHAGZI0ySCGn2YJPDISevPZWctF74OTmM5sfxbSpVlcYn+OQ4BZFadNM/x6aYOsaSbt0bbWh8lFMOx9GlOPkstlMf11O3MBOVX/fgleN0HD2ZPt8o5+5uX4+nzHLMIhnP1EhUeVnAu+TQ4Z1HH7LvJTDNMdpf6HNiFL0S7s5/wDMHRdr4udjfreG2mR56sMxBjrfPrzYQEd6v0e0vh/4AwzGHLivfVeXXBhLE9/eUgddfADPMQU3abQ3ZefvQdDMVMqmfHmGYQ59nkVXe/USifuwBsrR74odhju9L/bS7Exf8PG4wzkEkLvcms1LK+NFHLVnmOJinW573aA2OOUgezEmg5PEHT/nloObeqfi75SA5e9X6hjkoEt699X2vHNtov+p5fV45qBHrvr3AKseqUZRfDpmt/WYLrxyPXachB3IgB3Ighwk5DMhhMHOsPO/weeXIkpUyTjkcvV2pvw/BJoez9kuS/UL45LACOQwMcqhSB5boUr1wjuEQmWQitkRk55n3V8zx9UoCi+8kGJanjq/4SgLK10wV3+HlL/k+k039Ozlqi4Pz/xQcbh6cXS05Hl7xZSYdKoTVl5n0w4dY+p3kv6DIhVX5ou/f/hlEtk46Bmve7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/wCGXEuzlUGJPAAAAABJRU5ErkJggg=='} alt="Not Found"/>
                    }
                    
                </Col>
            </Row>
            <h2>this is the form2</h2>
            {this.registerForm()}
        </div>
    );
  }
}
