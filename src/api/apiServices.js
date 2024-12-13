import axios from 'axios'


const URL = `http://localhost:4001/`



const getTodo = async () => {
    try {
        const response = await axios.get(
            URL + `todo/gettodo`
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const addTodo = async (data) => {
    try {
        const response = await axios.post(
            URL + `todo/addtodo`, data
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const getCategorytodo = async () => {
    try {
        const response = await axios.get(
            URL + `todo/getcategorytodo`
        )
        return response.data

    } catch (err) {
        throw err
    }
}
const getCategoryInprogress = async () => {
    try {
        const response = await axios.get(
            URL + `todo/getcategoryinprogress`
        )
        return response.data

    } catch (err) {
        throw err
    }
}
const getCategoryDone = async () => {
    try {
        const response = await axios.get(
            URL + `todo/getcategorydone`
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const editTodo = async (id, data) => {
    try {
        const response = await axios.put(
            URL + `todo/edittodo/${id}`, data
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const statusUpdate = async (id, data) => {
    try {
        const response = await axios.patch(
            URL + `todo/statusupdate/${id}`, data
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(
            URL + `todo/deletetodo/${id}`
        )
        return response.data

    } catch (err) {
        throw err
    }
}

const API_Services = { getTodo, addTodo, editTodo, statusUpdate, deleteTodo, getCategorytodo, getCategoryInprogress, getCategoryDone }

export default API_Services