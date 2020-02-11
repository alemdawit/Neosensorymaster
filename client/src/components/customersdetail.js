import React, { useState,useEffect } from 'react';
import './customers.css';
import 'react-table-6/react-table.css';
import axios from 'axios';
function Customersdetail ({match}) {
  useEffect (()=>{
      fetchUser();
      
  },[]);

 const [user,setCutomer] = useState({
     name:'',
     email:'',
     notes:'',
     enabled:''
 });
 const fetchUser = async () =>{
    const fetchUser = await fetch (`/users/${match.params.id}`);
    const user = await fetchUser.json();
    setCutomer(user.id);
console.log(user);
}

const patchUser = (e) =>{
    e.preventDefault();

    const name = e.target.elements.btnname.value;
    const email = e.target.elements.btnemail.value;
    const note = e.target.elements.btnnote.value;
    const enabled = e.target.elements.chkenabled.checked;
    axios.put(`/users/${match.params.id}`,{
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
  /* THIS IS FOR TWO WAY BINDING, IT IS BETTER WITHOUT IT
  const handleChange = event =>{
    this.useState({
        name:event.target.value,
    })
  };*/
 return (
<div class="form-style-6">
    <h1>{user.name}</h1>
    <form onSubmit={patchUser}>
        <lable>Full Name</lable>
        <input type="text" value={user.name} disabled/>
        <input type="text" name = "btnname" placeholder="You New Name" /><br/>
        <lable>Email</lable>
        <input type="email" value={user.email} disabled/>
        <input type="email" name = "btnemail" placeholder="You New Email"/><br/>
        <lable>Notes</lable>
        <textarea value={user.notes} disabled></textarea><textarea name = "btnnote" placeholder="Enter New Note"></textarea><br/>
        <lable>Enabled</lable>
        <input type="text" value={user.enabled} disabled/><input type="checkbox" name = "chkenabled"/><br/>
        <button>Update</button>
    </form>
</div>
 );
 }
export default Customersdetail;