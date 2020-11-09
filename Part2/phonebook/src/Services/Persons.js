import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = ( id, updatedObject ) => {
    return axios.put(`${baseUrl}/${id}`, updatedObject)
}

export default { getAll, addNew, remove, update }