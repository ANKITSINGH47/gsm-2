import React from 'react';
import MainLayout from "./components/MainLayout";
import CreateTasks from "./components/CreateTasks";

const App = () => {
    return (
        <MainLayout>
            <CreateTasks />
        </MainLayout>
    )
};

export default App;