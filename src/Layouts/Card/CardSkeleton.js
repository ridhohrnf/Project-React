import { Card, Row, Col, Skeleton } from 'antd'

const { Meta } = Card

const MovieSkeleton = () => {
    return(
    <Row gutter={16}>
        <Col className='gutter-row myCard'>
        <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton >
                <Meta
                title="Card title"
                description="This is the description"
                />
            </Skeleton>
        </Card>
        </Col>
        <Col className='gutter-row myCard'>
        <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton >
                <Meta
                title="Card title"
                description="This is the description"
                />
            </Skeleton>
        </Card>
        </Col>
        <Col className='gutter-row myCard'>
        <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton >
                <Meta
                title="Card title"
                description="This is the description"
                />
            </Skeleton>
        </Card>
        </Col>
        <Col className='gutter-row myCard'>
        <Card style={{ width: 300, marginTop: 16 }}>
            <Skeleton >
                <Meta
                title="Card title"
                description="This is the description"
                />
            </Skeleton>
        </Card>
        </Col>
    </Row>
    )
}

export default MovieSkeleton