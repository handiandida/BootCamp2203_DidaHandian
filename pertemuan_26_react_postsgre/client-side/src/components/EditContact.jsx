import React, { Fragment, useState } from "react";

const EditTodo = ({ contact }) => {
    const [updateName, setUpdateName] = useState(contact.name);
    const [updateEmail, setUpdateEmail] = useState(contact.email);
    const [updateMobile, setUpdateMobile] = useState(contact.mobile);

    const updateContact = async e => {
        e.preventDefault();
        try {
            const body = { updateName, updateEmail,updateMobile };
            const response = await fetch(
            `http://localhost:3001/contacts/${contact.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
    
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${contact.id}`}>
            Edit
            </button>

            <div class="modal fade" id={`id${contact.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Contact</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div mb-3>
                            <label for="name" className="form-label">Nama</label>
                            <input 
                                type="name" 
                                className="form-control" 
                                id="name"
                                name="name"
                                value={updateName}
                                onChange = { e => setUpdateName(e.target.value)}
                            />
                        </div>
                        <div mb-3 mt-3>
                            <label for="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email"
                                name="email"
                                value={updateEmail}
                                onChange = {e => setUpdateEmail(e.target.value)}
                            />
                        </div>
                        <div mb-3 mt-3>
                            <label for="mobile" className="form-label">Mobile</label>
                            <input 
                                type="mobile" 
                                className="form-control" 
                                id="mobile"
                                name="mobile"
                                value={updateMobile}
                                onChange = {e => setUpdateMobile(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={e => updateContact(e)}>Save changes</button>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
            </div>
    </Fragment>
    )

}

export default EditTodo