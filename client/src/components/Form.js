import React from 'react';
import Input from './Input';

const Form = (props)=>{
    return(
        <form onSubmit={props.handler}>
            <h4>{props.isEditForm ? "Editing Client: " : "Add Client: "}</h4>
            <div className="form-group">
                <Input name="firstName"
                       placeholder="Enter First Name"
                       labelName="First Name: "
                       handleChange={props.handleChange}
                       value={props.client.firstName}/>
                <Input name="lastName"
                       placeholder="Enter Last Name"
                       labelName="Last Name: "
                       handleChange={props.handleChange}
                       value={props.client.lastName}/>
                <Input name="phoneNumber"
                        placeholder="Enter Phone Number"
                        labelName="Phone Number: "
                        handleChange={props.handleChange}
                        value={props.client.phoneNumber}/>
                <Input name="email"
                        placeholder="Enter Email"
                        labelName="Email: "
                        handleChange={props.handleChange}
                        value={props.client.email}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> 
    )
}

export default Form;