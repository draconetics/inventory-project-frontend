import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BrandListComponent from './components/BrandListComponent';
import ProductCreateComponent from './components/ProductCreateComponent';
import ProductListComponent from './components/ProductListComponent';
import SaleListComponent from './components/SaleListComponent';
import Home from './components/Home';
import ProductViewComponent from './components/ProductViewComponent';
import MenuComponent from './components/MenuComponent';
import NotFoundComponent from './components/NotFoundComponent'
import ClientListComponent from './components/ClientListComponent';
import SalesByQrComponent from './components/SaleByQrComponent';
import ContainerListComponent from './components/ContainerListComponent';
import ContainerViewComponent from './components/ContainerComponent';
import StateListComponent from './components/StateListComponent';
import ContainerTestingComponent from './components/ContainerTestingComponent';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <MenuComponent />
        </div>
        <Switch>
            <Route exact path={["/","/home"]} component={Home}></Route>
            <Route exact path={'/brands'} component={BrandListComponent}></Route>
            <Route exact path={'/products'} component={ProductListComponent}></Route>
            <Route exact path={'/sales'} component={SaleListComponent}></Route>
            <Route exact path={'/sales/qr'} component={SalesByQrComponent}></Route>
            <Route exact path={'/clients'} component={ClientListComponent}></Route>
            <Route exact path={'/products/create'} component={ProductCreateComponent}></Route>
            <Route exact path={'/products/code/:code'} component={ProductViewComponent} />
            <Route exact path={'/products/edit/:id'} component={ProductCreateComponent} />
            <Route exact path={'/containers'} component={ContainerListComponent} />
            <Route exact path={'/containers/code/:code'} component={ContainerViewComponent} />
            <Route exact path={'/containers/testing/:code'} component={ContainerTestingComponent} />
            <Route exact path={'/states'} component={StateListComponent} />
            <Route path='/404' component={NotFoundComponent} />
            <Redirect from='*' to='/404' />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
