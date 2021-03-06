import axios from 'axios'
import API_URL from '../config'

export const getUserBoards = async (username) => {
    try {
        const user = await axios.get(`${API_URL}/api/users/${username}/boards`)
        return user.data
    }
    catch (error) {
        throw error.response
    }
}

export const getUserTeams = async (username) => {
    try {
        const teams = await axios.get(`${API_URL}/api/users/${username}/teams`)
        return teams.data
    }
    catch (error) {
        throw error.response
    }
}