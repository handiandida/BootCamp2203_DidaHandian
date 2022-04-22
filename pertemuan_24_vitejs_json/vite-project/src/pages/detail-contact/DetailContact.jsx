import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


function DetailContact() {

    const [listContact, setContact] = useState()

    useEffect(() => {
        axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          setContact(res.data)
        })
    },[])

    const {id} = useParams()


  return (
    <div className='container mt-5'>
      <h2>Detail Contact</h2>
        {listContact && (
          <>
          <div class="card-body">
            <h5 class="card-title">{listContact.name}</h5>
            <p class="card-text">{listContact.email}</p>
            <p class="card-text">{listContact.mobile}</p>
            <a href='/' class="btn btn-outline-primary">Kembali</a>
          </div>
          </>
        )}
        {/* {listContact && (
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{listContact.name}</h5>
            <p class="card-text">{listContact.email}</p>
            <p class="card-text">{listContact.mobile}</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
        )} */}
    </div>
  )
}

export default DetailContact