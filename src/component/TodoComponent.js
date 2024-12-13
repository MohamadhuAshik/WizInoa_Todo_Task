import React, { useContext } from "react";
import { DndProvider, } from "react-dnd";
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./Taskcolumn";
import DataContext from "../Data/DataContext";

const TodoComponent = () => {
    const { addTodo, handleDrop, tasks, newTask, setNewTask } = useContext(DataContext)
    return (
        <DndProvider backend={HTML5Backend}>
            <Typography style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }} className="text-block text-center mt-2" variant="h4">Todo</Typography>
            <Grid align="center" container

                justifyContent="center"
                alignItems="center"
                className="mt-3 p-5">


                <Paper elevation={5} style={{ width: 500, padding: 20 }}>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Add New Task"
                        placeholder="Enter Task "
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button style={{ margin: "8px 0px" }} onClick={addTodo} variant="contained" color="primary" size="large" >
                        Add
                    </Button>
                </Paper>

            </Grid>
            <div className='row mt-5'>
                <div className="board d-flex flex-wrap justify-content-center">

                    {Object.keys(tasks).map((category) => (

                        <TaskColumn
                            key={category}
                            category={category}
                            tasks={tasks[category]}
                            onDrop={handleDrop}
                        />

                    ))}

                </div>
            </div>
        </DndProvider >
    );
};

export default TodoComponent;


