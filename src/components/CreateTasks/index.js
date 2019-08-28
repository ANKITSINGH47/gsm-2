import React from "react";
import CreateTaskActions from "./Actions";
import CreateTaskMap from "./Map";

class CreateTasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="create-tasks-main">
                <CreateTaskMap />
                <CreateTaskActions/>
            </div>
        )
    }
}

export default CreateTasks;