import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  const [contacts, setContacts] = useState([])
  
  const loadContact = () => {
    axios.get('http://localhost:3000/contacts')
    .then((res) => {
      setContacts(res.data)
    })

  };
  useEffect(() => {
    loadContact()
  },[])

  function deleteContact(id){
    axios.delete(`http://localhost:3000/contacts/${id}`).then(loadContact())
  }

  return (
    <div className='container mt-5'>
    <a href='add-contact' class="btn btn-outline-primary mb-3 rounded-pill"><i class="bi bi-plus-circle-fill"></i> Add Contacts</a>
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Mobile</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((item) => (
        <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>
          <Link to={`/contacts/${item.id}`}><button class="btn btn-success badge rounded-pill m-lg-2" id='btn-home'>Detail</button></Link>
          <Link to={`/edit-contact/${item.id}`}><button class="btn btn-primary badge rounded-pill" id='btn-home'>Edit</button></Link>
          <button type="button" class="btn btn-danger badge rounded-pill m-lg-2" onClick={() => deleteContact(item.id)} id='btn-home'>Delete</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Home