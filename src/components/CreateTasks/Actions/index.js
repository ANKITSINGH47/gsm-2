import React from "react";

class CreateTaskActions extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {

        this.handleSubmit = () => {
            const { accountId, token } = this.props;

            const data = {
                account: `https://gsmtasks.com/api/tasks/accounts/${accountId}/`,
                address: {
                    "raw_address": "Tallinn, Viru Keskus"
                },
                category: 'assignment',
            };
            // get auth token
            fetch(`https://gsmtasks.com/api/tasks/tasks/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }).then((res) => res.json())
                .then((response) => {
                    console.log('response', response);
                })
                .catch((err) => console.log('err', err));
        };

        return (
            <div className="create-tasks-section-small">
                <button onClick={this.handleSubmit}>Create sample task</button>
            </div>
        )
    }
}

export default CreateTaskActions;