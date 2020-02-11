import React, { Component } from 'react';

import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
class Customers extends Component {
 constructor() {
  super();
  this.state = {
   customers: [],
   selectedCustomer: null
  };
 }
 handleCustomerSelect(customer) {
  return (e) => {
   if (this.state.selectedCustomer) {
   }

   this.setState({ selectedCustomer: customer });
  }
 }
 componentDidMount() {
  fetch('/users')
   .then(res => res.json())
   .then(customers => this.setState({ customers: customers.data }));
 }
 render() {
  const colomns = [
    
   {
    Header: <a href="/newcustomer">New User</a>,
    accessor:'uuid',
    Cell: row=>(<a href={row.value}>Edit</a>)
   },
   {
    Header: "User ID",
    accessor: "uuid"
   },
   {
    Header: "Name",
    accessor: "name"
   },
   {
    Header: "Email",
    accessor: "email"
   }
   , {
    Header: "Note",
    accessor: "notes"
   }
   
  ]
  if (this.state.selectedCustomer) {
   return (
    <div>
     selected customer form for {this.state.selectedCustomer.name}
    </div>
   )
  }

  return (

<ReactTable 

data = {this.state.customers}
columns = {colomns}
defaultPageSize= {10}
/>   
  );
 }
}


export default Customers;