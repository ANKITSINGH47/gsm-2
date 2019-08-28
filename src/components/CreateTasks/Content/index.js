import React from "react";
import CreateTasksContentMap from "./Map";

class CreateTaskContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
        }
    }

    componentDidMount () {
        if (this.props.accountId) {
            this.startPollingForList();
        }
    }

    render () {

        this.startPollingForList = () => {
            const { accountId, token } = this.props;
            // get auth token
            fetch(`https://gsmtasks.com/api/tasks/tasks/?account=${accountId}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }).then((res) => res.json())
                .then((response) => {
                    if (response.length !== this.state.locations.length) {
                        this.setState({
                            locations: response.map((location) => location.address)
                        })
                    }
                })
                .catch((err) => console.log('err', err));

            // Every 5 sec fetch again
            setTimeout(this.startPollingForList, 5000)
        };
        return (
            <div className="create-tasks-section-large">
                <CreateTasksContentMap locations={this.state.locations} />
            </div>
        )
    }
}

export default CreateTaskContent;