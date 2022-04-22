import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function AddContact() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')

  const contact = {name, email, mobile}

  const navigate = useNavigate()

  function Submit(e){
    e.preventDefault()

    axios.post(`http://localhost:3000/contacts`, contact).then(navigate('/'))
  }
  
  
  return (
    <div className='container mt-5'>
        <h1>Form Add Contact</h1>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nama</label>
            <input value={name} onChange={(e) => setName(e.target.value)} class="form-control" id="name" placeholder='Masukkan Nama Anda' />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="name" placeholder='Masukkan Email Anda' />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Mobile</label>
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} class="form-control" id="name" placeholder='Masukkan No Handphone Anda' />
          </div>
          <button onClick={Submit} class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddContact