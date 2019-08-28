import React from "react";

class CreateTaskMap extends React.Component {
    constructor(props) {
        super(props);
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
                    console.log('response', response);
                })
                .catch((err) => console.log('err', err));

            // Every 5 sec fetch again
            setTimeout(this.startPollingForList, 5000)
        };

        return (
            <div className="create-tasks-section-large">
                map here
            </div>
        )
    }
}

export default CreateTaskMap;