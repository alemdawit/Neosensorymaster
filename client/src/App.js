import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';
import Customersdetail from './components/customersdetail';
import NewCustomers from './components/newcustomer';
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <a href="/"> <div>  <img src={logo} className="App-logo" alt="logo" /></div></a>
         <h1 className="App-title">Neosensory</h1>
        </header>
        <Customers />
        
        <Router>
          <div>
            <Switch>
                <Route path="/newcustomer" exact component={NewCustomers}/>
                <Route path="/:id" exaxt component={Customersdetail}/>
            </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
