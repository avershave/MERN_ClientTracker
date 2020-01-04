import React from 'react';

const ClientTableRow = (props)=>{
    const {firstName,lastName,phoneNumber,email,_id} = props.client;
    return(
        <tr>
            <th scope="row">{_id}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={props.showEditForm.bind(this,props.client)} className="btn btn-secondary">Edit</button>
                    <button type="button" onClick={props.deleteHandler.bind(this,_id)} className="btn btn-danger">Delete</button>
                </div>
            </td>
            
        </tr>
    )
}

export default ClientTableRow;