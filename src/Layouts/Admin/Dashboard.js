import { Row, Col, Card, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Contexts/DataContext'
import axios from 'axios'
import { SmileTwoTone } from '@ant-design/icons'
import InfoMovies from '../Card/InfoMovies'
import InfoGames from '../Card/InfoGames'

const { Title } = Typography

const Dashboard = () => {

    const { movies, setMovies, games, setGames, user } = useContext(DataContext)
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        
        const getData = async() => {
            try {
                await axios.get(`https://backendexample.sanbersy.com/api/data-game`).then((res) => {
                    setGames([...res.data])
                })

                await axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then((res) => {
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

    console.log(user)

    return(
        <>
        <Row gutter={16}>
            <InfoMovies jumlah={movies.length}/>
            <InfoGames jumlah={games.length}/>
        </Row>
        <br/>
        <Row gutter={16}>
            <Col span={24}>
                <Card className="myCenter">
                    <Title>Hello {user.name} </Title>
                    <br/>
                    <SmileTwoTone style={{ fontSize: '110px'}}/>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default Dashboard