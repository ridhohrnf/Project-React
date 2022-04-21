import { Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import MovieCard from '../Card/MovieCard'
import axios from 'axios'
import CardSkeleton from '../Card/CardSkeleton'

import './Section.css'

const ListMovie = () => {

    const [movies, setMovies] = useState([])
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        
        const getData = async() => {
            try {
                await axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then((res) => {
                    console.log(res.data)
                    setMovies([...res.data])
                })
            }catch (err) {
                console.log(err)
            }
        }

        if(fetch) {
            getData()
            setFetch(false)
        }
    },[fetch, setFetch])

    return(
        <>
        <h2>All Movie</h2>
        <Row gutter={16}>
                {movies.length !== 0 ? (movies.map((arr, idx) => {
                    return (
                    <Col className="gutter-row myCard" key={idx}>
                        <MovieCard 
                        title = {arr.title}
                        image_url= {arr.image_url}
                        year = {arr.year}
                        genre = {arr.genre}
                        review = {arr.review}
                        rating = {arr.rating}
                        duration = {arr.duration}
                        id = {arr.id}
                        />
                    </Col>)
                })) : (<CardSkeleton/>)}
        </Row>
        </>
    )
}

export default ListMovie