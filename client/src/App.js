import React from 'react';
import ClientTable from './components/ClientTable';
import Form from './components/Form';
import Message from './components/Message';
import ClientAPI from './ClientAPI';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients : [],
            isEditForm : false,
            client : {
                firstName : "",
                lastName : "",
                phoneNumber : "",
                email : ""
            },
            message : ""
        };

        this.deleteHandler = this.deleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
    }

    componentDidMount(){
        ClientAPI.getClients().then(data=>{
            console.log(data);
            this.setState({clients: data.response})});
    }

    resetForm(){
        this.setState({
            client: {
                firstName : "",
                lastName : "",
                phoneNumber : "",
                email : ""
            }
        });
    }

    handleChange(e){
        this.setState({
            client : {
                ...this.state.client,
                [e.target.name] : e.target.value
            }
        });
    }

    showEditForm(client){
        this.setState({isEditForm : true, client : client});
    }

    async deleteHandler(id){
        const deleteData = await ClientAPI.deleteClient(id);
        const message = deleteData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await ClientAPI.getClients();
            this.setState({message, clients : data.response})
        }
    }

    async updateHandler(e){
        e.preventDefault();
        const updateData = await ClientAPI.updateClient(this.state.client);
        const message = updateData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await ClientAPI.getClients();
            this.setState({message, clients: data.response})
        }
        this.setState({isEditForm: false});
        this.resetForm();
    }

    async addHandler(e){
        e.preventDefault();
        const postData = await ClientAPI.createClient(this.state.client);
        const message = postData.message;
        if(message.msgError){
            this.setState({message});
        }
        else{
            const data = await ClientAPI.getClients();
            this.setState({message, clients : data.response});
        }
        this.resetForm();
    }

    renderClientTable(){
        if(this.state.clients.length > 0){
            return(
                <ClientTable clients={this.state.clients}
                               deleteHandler={this.deleteHandler}
                               showEditForm={this.showEditForm}/>
            );
        }
        return null;
    }

    renderForm(){
       return(
           <Form isEditForm={this.state.isEditForm}
                 client={this.state.client}
                 handleChange={this.handleChange}
                 handler={!this.state.isEditForm ? this.addHandler : this.updateHandler}/>
       ); 
    }

    renderMessage(){
        if(this.state.message === "")
            return null;
        return(
            <Message message={this.state.message}/>
        );
    }

    render(){
        return(
            <div className="row">
                <div className="col"></div>
                <div className="col-10">
                    {this.renderClientTable()}
                    {this.renderForm()}
                    {this.renderMessage()}
                </div>
                <div className="col"></div>
            </div>
        )
    }
}

export default App;