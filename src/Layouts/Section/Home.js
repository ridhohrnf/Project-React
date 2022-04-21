import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col } from 'antd'
import GameCard from '../Card/GameCard'
import MovieCard from '../Card/MovieCard'
import CardSkeleton from '../Card/CardSkeleton'

const Home = () => {

    const [homeMovies, setHomeMovies] = useState([])
    const [homeGames, setHomeGames] = useState([])
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        
        const getData = async() => {
            try {
                await axios.get(`https://backendexample.sanbersy.com/api/data-game`).then((res) => {
                    setHomeGames([...res.data])
                })

                await axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then((res) => {
                    setHomeMovies([...res.data])
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
        <h2 className='myTitleData'>Latest Movies</h2>
        <Link to='/movies'>
            <h4 className='myViewMore'>View More</h4>
        </Link>
        <Row gutter={16} className='myRowData'>
                {homeMovies.length !== 0 ? (homeMovies.map((arr, idy) => {
                    if(idy >= 4) return("")
                    return (
                    <Col className="gutter-row myCard" key={idy}>
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

        <h2 className='myTitleData'>Latest Games</h2>
        <Link to='/games'>
            <h4 className='myViewMore'>View More</h4>
        </Link>
        <Row gutter={16} className='myRowData'>
                {homeGames.length !== 0 ? (homeGames.map((arr, idx) => {
                    if(idx >= 4) return("")
                    return (
                    <Col className="gutter-row myCard" key={idx}>
                        <GameCard
                        id={arr.id}
                        image_url= {arr.image_url}
                        name={arr.name}
                        release={arr.release}
                        genre={arr.genre}
                        />
                    </Col>
                    )
                })) : (<CardSkeleton/>)}
        </Row>
        </>
    )
}

export default Home