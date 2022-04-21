import { Row, Col, Image, Typography, Divider, Tag, Skeleton, Rate } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
 
const { Title, Text } = Typography

const MovieDetail = () => {

    let { slug } = useParams()
    const [detail, setDetail] = useState([])
    const [fetch, setFetch] = useState(true)

    useEffect(() => {
        const getData = async() => {
            try{
                await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${slug}`).then((res) => {
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
                    <Title>{detail.title}</Title>
                </Row>
                <Divider>
                    <Text type='secondary'>Details</Text>
                </Divider>
                <Row>
                    <Col span={4}>
                        <Text strong>Year :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='green'>{detail.year}</Tag>
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
                        <Text strong>Rating :</Text>
                    </Col>
                    <Col span={20}>
                        <Rate disabled allowHalf defaultValue={(detail.rating / 2)} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Review :</Text>
                    </Col>
                    <Col span={20}>
                        <Text success>{detail.review}</Text>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Description :</Text>
                    </Col>
                    <Col span={20}>
                        <Text type='secondary'>{detail.description}</Text>
                    </Col>
                </Row>
            </Col>
        </Row>
        ) : <Skeleton active />}
        </>
    )
}

export default MovieDetail