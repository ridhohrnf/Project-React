import {useState, createContext} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from "react-router-dom"

export const DataContext = createContext()

export const DataProvider = props => {

    const [movies, setMovies] = useState([])
    const [games, setGames] = useState([])
    const [fetchMovie, setFetchMovie] = useState(true)
    const [fetchGame, setFetchGame] = useState(true)
    const [user, setUser] = useState([])
    const [state, setState] = useState(false)

    let history = useHistory()

    let config = {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      };

    const login = (data) => {
        try {
            axios.post(`https://backendexample.sanbersy.com/api/user-login`, data).then((res) => {
                console.log(res)
                Cookies.set('token', res.data.token)
                setUser(res.data.user)
                lSuccess()
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const addMovie = (data) => {
        try {
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`, data, config).then((res) => {
                console.log(res)
                setMovies([...movies, res.data])
                setFetchMovie(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const addGame = (data) => {
        try {
            axios.post(`https://backendexample.sanbersy.com/api/data-game`, data, config).then((res) => {
                console.log(res)
                setGames([...games, res.data])
                setFetchGame(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const deleteMovie = (id) => {
       console.log(id)
        try{
            axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, config).then((res) => {
                console.log(res)
                setFetchMovie(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const deleteGame = (id) => {
       console.log(id)
        try{
            axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, config).then((res) => {
                console.log(res)
                setFetchGame(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const editGame = (id, data) => {
        console.log(id)
        console.log(data)
        try{
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, data, config).then((res) => {
                console.log(res)
                setFetchGame(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const editMovie = (id, data) => {
        console.log(id)
        console.log(data)
        try{
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, data, config).then((res) => {
                console.log(res)
                setFetchMovie(true)
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const lSuccess = () => {
        history.push('/')
    }

    const allMethod = {
        login,
        config,
        addMovie,
        addGame,
        deleteMovie,
        deleteGame,
        editGame,
        editMovie,

    }

    return(
        <DataContext.Provider value={{movies, setMovies, 
            games, setGames, 
            fetchMovie, setFetchMovie,
            user, setUser,
            fetchGame, setFetchGame,
             allMethod,
             state, setState
             }}>
            {props.children}
        </DataContext.Provider>
    )
}