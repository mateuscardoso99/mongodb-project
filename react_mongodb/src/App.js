import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch} from 'react-router-dom'

import Redirect from './components/redirect'

import CreateProduct from './pages/products/create'
import ViewProduct from './pages/products/view'
import UpdateProduct from './pages/products/update'

import CreateProvider from './pages/providers/create'
import ViewProvider from './pages/providers/view'
import UpdateProvider from './pages/providers/update'

const App = () => {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Redirect} exact/>
            <Route path='/products' component={ViewProduct} exact/>
            <Route path='/products/create' component={CreateProduct}/>
            <Route path='/products/update/:id' component={UpdateProduct}/>
            <Route path='/providers' component={ViewProvider} exact/>
            <Route path='/providers/create' component={CreateProvider}/>
            <Route path='/providers/update/:id' component={UpdateProvider}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
}

export default App