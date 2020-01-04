import React from 'react';
import ClientTableRow from './ClientTableRow';

const ClientTable = (props)=>{
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
               {props.clients.map(client=>{
                   return <ClientTableRow key={client._id}
                                            client={client}
                                            deleteHandler={props.deleteHandler}
                                            showEditForm={props.showEditForm}/>
               })}
            </tbody>
        </table>
    )
}

export default ClientTable;