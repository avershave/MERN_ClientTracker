export default {
    getClients: () => {
        return fetch('/client')
        .then(res => res.json())
        .then(data => data);
    },
    deleteClient: (_id) => {
        return fetch(`/client/${_id}`,
                    {method: 'delete'})
                    .then(res => res.json())
                    .then(data => data);
    },
    updateClient: (client) => {
        return fetch(`/client/${client._id}`,
                    {method: 'put',
                    body: JSON.stringify(client),
                    headers: {
                        "Content-Type": "application/json"
                    }}).then(res => res.json())
                       .then(data => data);
    },
    createClient: (client) => {
        return fetch(`/client`,
                    {method: 'post',
                    body: JSON.stringify(client),
                    headers: {
                        "Content-Type": "application/json"
                    }}).then(res => res.json())
                       .then(data => data);
    }
}