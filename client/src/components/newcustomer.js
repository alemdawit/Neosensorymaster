import React from 'react';
import './customers.css';
import 'react-table-6/react-table.css';
import axios from 'axios';
function newCustomer () {
  
  

  const postUser = (e) =>{
    e.preventDefault();

    const name = e.target.elements.btnname.value;
    const email = e.target.elements.btnemail.value;
    const note = e.target.elements.btnnote.value;
    const enabled = e.target.elements.chkenabled.checked;
    axios.post('/users/',{
        "name":`${name}`,
        "email":`${email}`,
        "notes":`${note}`,
        "enabled":`${enabled}`
    })
    .then(function (res){
        console.log(res);
    })
    .catch(function (err){
        console.log(err);
    })
  }

 return (
<div class="form-style-6">
<h1>New User</h1>
    <form onSubmit={postUser}>
        <lable>Full Name</lable>
        <input type="text" name = "btnname"  placeholder="Enter Name"/><br/>
        <lable>Email</lable>
        <input type="email" name = "btnemail" required placeholder="Enter Email"/><br/>
        <lable>Notes</lable>
        <textarea name = "btnnote" placeholder="Enter Note"></textarea><br/>
        <lable>Enabled</lable>
        <input type="checkbox" name = "chkenabled"/><br/>
        <input type="submit" value="Add New User"/>
    </form>
</div>
 );
 }
export default newCustomer;