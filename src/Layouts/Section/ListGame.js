import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import GameCard from '../Card/GameCard'
import CardSkeleton from '../Card/CardSkeleton'


const ListGame = () => {

    const [games, setGames] = useState([])
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        
        const getData = async() => {
            try {
                await axios.get(`https://backendexample.sanbersy.com/api/data-game`).then((res) => {
                    console.log(res.data)
                    setGames([...res.data])
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
        <h2>All Games</h2>
        <Row gutter={16}>
                {games.length !== 0 ? (games.map((arr, idx) => {
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

export default ListGame