import { useDrop } from "react-dnd";
import Task from "./Task";
import { Divider } from "@mui/material";


const TaskColumn = ({ category, tasks, onDrop }) => {
    const [, dropRef] = useDrop({
        accept: "TASK",
        drop: (item) => onDrop(item, category),
    });
    return (

        <div className="column col-12 col-md-4 p-3 text-center" ref={dropRef} style={{ padding: "10px", border: "1px solid #ccc" }}>
            <h3>{category}</h3>
            <Divider />
            {tasks.map((task) => (

                <Task
                    key={task._id}
                    task={task}
                    category={category}
                />

            ))}
        </div>

    );
};
export default TaskColumn