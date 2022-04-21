import { Row, Col, Image, Typography, Divider, Tag, Skeleton } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
 
const { Title, Text } = Typography

const GameDetail = () => {

    let { slug } = useParams()
    const [detail, setDetail] = useState([])
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        const getData = async() => {
            try{
                await axios.get(`https://backendexample.sanbersy.com/api/data-game/${slug}`).then((res) => {
                setDetail(res.data)
            })
            } catch (err) {
                console.log(err)
            }
        }

        if(fetch) {
            getData()
            setFetch(false)
        }
    })

    return(
        <>
        {detail.length !== 0 ? (
            <Row>
            <Col span={8}>
                <Image height={400} src={detail.image_url} style={{maxWidth: 400}}></Image>
            </Col>
            <Col span={16}>
                <Row>
                    <Title>{detail.name}</Title>
                </Row>
                <Divider>
                    <Text type='secondary'>Details</Text>
                </Divider>
                <Row>
                    <Col span={4}>
                        <Text strong>Year :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='green'>{detail.release}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Genre :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='orange'>{detail.genre}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Platform :</Text>
                    </Col>
                    <Col span={20}>
                    <Tag color="cyan">{detail.platform}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>SinglePlayer :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='geekblue'>{detail.singlePlayer === 1 ? 'Yes' : 'No'}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>MultiPlayer</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='geekblue'>{detail.multiplayer === 1 ? 'Yes' : 'No'}</Tag>
                    </Col>
                </Row>
            </Col>
        </Row>
        ) : <Skeleton active />}
        </>
    )
}

export default GameDetail