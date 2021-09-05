//declare this instead install @types/webrtc
//declare module 'types-module';
//import {Dispatch} from 'redux'

//REDUX ACTION
interface IActionReducer{
    type: string,
    value: any       
}

type AppDispatch = any

//BRAND

interface IBrand{
    _id?: string,
    code: string,
    name: string
}

interface IBrandStateReducer {
    brands:IBrand[];
    brandLoading: boolean;
    brandError: string;
}

//PRODUCT
interface IProduct{
    code?:Number,
    _id?: string,
    gender: string,
    cost: number,
    brand?: IBrand,
    imageId?:string
}

interface IProductStateReducer {
    products:IProduct[];
    productsLoading: boolean;
    productsError: string;
    productSelected: IProduct;
}

//SALE

interface ISale{
    _id?: string,   
    sale_code: string,
    client:any,
    product:any,
    date:string
}

interface ISaleStateReducer {
    sales:ISale[];
    salesLoading: boolean;
    salesError: string;
    cart:IProduct[];
}

//CLIENT

interface IClient{
    _id?: string,
    name: string,
    phone: string,
    email: string,
    code: string,
}

interface IClientStateReducer {
    clients:IClient[];
    clientsLoading: boolean;
    clientsError: string;
}


//CART

interface ICartStateReducer {
    cart:IProduct[];
}