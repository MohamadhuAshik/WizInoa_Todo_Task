import { createContext, useEffect, useState } from "react";
import API_Services from "../api/apiServices";

const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [tasks, setTasks] = useState({
        Todo: [],
        InProcess: [],
        Done: [],
    });
    const [newTask, setNewTask] = useState("")
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState("");


    const fetchTasks = () => {
        API_Services.getCategorytodo().then((res) => {
            console.log("Todo:", res);
            if (res.response_code === 200) {
                setTasks((prev) => ({
                    ...prev,
                    Todo: res.data || []
                }));
                API_Services.getCategoryInprogress().then((resInProgress) => {
                    console.log("InProgress:", resInProgress);
                    if (resInProgress.response_code === 200) {
                        setTasks((prev) => ({
                            ...prev,
                            InProcess: resInProgress.data || []
                        }));
                        API_Services.getCategoryDone().then((resDone) => {
                            console.log("Done:", resDone);
                            if (resDone.response_code === 200) {
                                setTasks((prev) => ({
                                    ...prev,
                                    Done: resDone.data || []
                                }));
                            }
                        }).catch((err) => console.error("Failed to fetch done tasks", err));
                    }
                }).catch((err) => console.error("Failed to fetch in-progress tasks", err));
            }
        }).catch((err) => console.error("Failed to fetch todo tasks", err));
    };


    const addTodo = () => {
        if (!newTask.trim()) {
            alert("Task cannot be empty");
            return;
        }
        const data = { todo: newTask };
        API_Services.addTodo(data)
            .then((res) => {
                if (res.response_code === 200) {
                    setNewTask("");
                    fetchTasks();
                }
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        fetchTasks();
    }, []);


    const handleEditClick = (id, taskText) => {
        setEditingTaskId(id);
        setEditedTask(taskText);
    };

    const handleEdit = () => {
        const data = { task: editedTask };
        API_Services.editTodo(editingTaskId, data)
            .then((res) => {
                if (res.response_code === 200) {
                    fetchTasks();
                    setEditingTaskId(null);
                    setEditedTask("");
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        API_Services.deleteTodo(id)
            .then((res) => {
                if (res.response_code === 200) {
                    fetchTasks();
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDrop = (item, targetCategory) => {
        const sourceCategory = item.category;
        const task = item.task;
        API_Services.statusUpdate(task._id, { status: targetCategory })
            .then((res) => {
                if (res.response_code === 200) {
                    setTasks((prev) => {
                        const updatedSource = prev[sourceCategory].filter((data) => data._id !== task._id);
                        const updatedTarget = [...prev[targetCategory], task];
                        return {
                            ...prev,
                            [sourceCategory]: updatedSource,
                            [targetCategory]: updatedTarget,
                        };
                    });

                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <DataContext.Provider value={{ addTodo, handleEdit, handleEditClick, handleDelete, handleDrop, tasks, newTask, setNewTask, editingTaskId, editedTask, setEditingTaskId, setEditedTask }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext