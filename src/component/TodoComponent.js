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
            <Typography style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }} className="text-white text-center mt-5" variant="h4">To do</Typography>
            <Grid align="center" container

                justifyContent="center"
                alignItems="center"
                className="mt-3 p-5">


                <Paper elevation={5} style={{ width: 500, backgroundColor: "#9cc0ec", padding: 20, borderRadius: "7px", border: "1px solid gray" }}>
                    <TextField
                        fullWidth
                        sx={{
                            '& .MuiInputBase-input::placeholder': {
                                color: 'gray', // Placeholder text color
                                opacity: 1,    // Full opacity
                                fontWeight: 'bold',
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '120px',
                                borderColor: 'gray',
                                paddingLeft: '16px',  // Adds padding to the left to control width/space
                                '&:hover fieldset': {
                                    borderColor: '#1b65d3',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                }
                            }
                        }}
                        label="Add New Task"
                        placeholder="Add New Task "
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button style={{ margin: "8px 0px" }} onClick={addTodo} variant="contained" color="primary" size="large" >
                        Submit
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


