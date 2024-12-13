import { Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext } from "react";
import DataContext from "../Data/DataContext";

const Task = ({ task, category }) => {
    const { handleEdit, handleEditClick, handleDelete, editingTaskId, editedTask, setEditedTask } = useContext(DataContext)
    const [{ isDragging }, dragRef] = useDrag({
        type: "TASK",
        item: { task, category },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <div
            className="task"
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: "10px",
                margin: "5px",
            }}
        >

            <Card style={{ borderRadius: "7px", border: "1px solid gray" }} elevation={5} className='mt-2'>
                <CardContent className='d-flex justify-content-between'>
                    {editingTaskId === task._id ? (
                        <>
                            <TextField
                                value={editedTask}
                                variant='standard'
                                onChange={(e) => setEditedTask(e.target.value)}
                                fullWidth
                                placeholder="Edit Task"
                            />
                            <IconButton onClick={handleEdit}>
                                <CheckCircleIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center" style={{ width: "100%", padding: "8px" }}>


                                <div style={{ maxWidth: "200px", wordBreak: "break-word", overflowWrap: "break-word" }}>
                                    <Typography>{task.Task}</Typography>
                                </div>


                                <div>
                                    <IconButton onClick={() => handleEditClick(task._id, task.Task)}>
                                        <EditIcon style={{ color: "blue" }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(task._id)}>
                                        <DeleteIcon style={{ color: "red" }} />
                                    </IconButton>
                                </div>

                            </div>
                        </>

                    )}
                </CardContent>
            </Card>
        </div >
    );
};

export default Task