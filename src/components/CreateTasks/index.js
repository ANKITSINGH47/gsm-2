import React from "react";
import CreateTaskActions from "./Actions";
import CreateTaskContent from "./Content";

class CreateTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: null,
            token: null,
        };
    }

    componentDidMount () {
        this.getAccountInfo();
    }

    render () {

        this.getAccountInfo = () => {
            // Just for testing purposes obviously. Otherwise should keep this delicate info hidden in .env files and out of client side.
            const userInfo = {
                username: 'kaidohus@gmail.com',
                password: 'testtest1',
            };
            // get auth token
            fetch('https://gsmtasks.com/api/authenticate/', {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((response) => {
                    if (response && response.account) {
                        this.setState({
                            accountId: response.account,
                            token: response.token,
                        })
                    }
                })
                .catch(() => <p>Something went wrong</p>);
        };

        const { accountId, token } = this.state;

        return (
            <div className="create-tasks-main">
                {accountId ? (
                    <React.Fragment>
                        <CreateTaskContent token={token} accountId={accountId} />
                        <CreateTaskActions token={token} accountId={accountId}  />
                    </React.Fragment>
                ) : (
                    <p>Fetching</p>
                )}

            </div>
        )
    }
}

export default CreateTasks;