import React from "react";

class CreateTaskActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        }
    }

    render () {

        this.handleSubmit = () => {
            const { accountId, token } = this.props;

            const data = {
                account: `https://gsmtasks.com/api/tasks/accounts/${accountId}/`,
                address: {
                    "raw_address": this.state.address,
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
                .then(() => {
                    this.setState({
                        address: '',
                    })
                })
                .catch((err) => console.log('err', err));
        };

        return (
            <div className="create-tasks-section-small">
                <div className="create-tasks-section-small-header">Create task</div>
                <div className="create-tasks-section-small-input">
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Insert address"
                        value={this.state.address}
                        onChange={(e) => this.setState({ address: e.target.value })}
                        required={true}
                    />
                    <button
                        onClick={this.handleSubmit}
                        disabled={!this.state.address}
                    >
                        Create task
                    </button>
                </div>
            </div>
        )
    }
}

export default CreateTaskActions;