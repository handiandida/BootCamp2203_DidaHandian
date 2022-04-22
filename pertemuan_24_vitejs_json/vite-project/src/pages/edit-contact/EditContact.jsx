import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditContact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
  
    
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
          setMobile(res.data.mobile)
        })
    },[])

    const contact = {name, email, mobile}

    function updateContact(e) {
      e.preventDefault()
      axios.put(`http://localhost:3000/contacts/${id}`, contact).then(navigate('/'))
    }

  return (
    <div className='container mt-5'>
        <h1>Edit Add Contact</h1>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nama</label>
            <input value={contact.name} onChange={(e) => setName(e.target.value)} class="form-control" id="name" placeholder='Masukkan Nama Anda' />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input value={contact.email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="name" placeholder='Masukkan Email Anda' />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Mobile</label>
            <input value={contact.mobile} onChange={(e) => setMobile(e.target.value)} class="form-control" id="name" placeholder='Masukkan No Handphone Anda' />
          </div>
          <button onClick={updateContact} class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default EditContact