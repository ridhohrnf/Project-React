import { useHistory } from 'react-router-dom'
import { Card, Typography, Button } from 'antd'
import { StarTwoTone, ClockCircleTwoTone, ReadFilled } from '@ant-design/icons'

const { Meta } = Card
const { Text } = Typography

const MovieCard = (props) => {

    let history = useHistory()

    return (
    <Card hoverable span={4}
        style={{width: 300}}
        cover={<img alt="example" src={props.image_url} 
        style={{height: 300, maxWidth: '100%', objectFit: 'cover'}}/>}
        value={props.id}
        onClick={() => {
            history.push(`movies/info/${props.id}`)
        }}
        >
        
        <Meta title={props.title}/>
        <div>
            <hr/>
            <Text>Year : <Text type='secondary'>{props.year}</Text> </Text>
            <br/>
            <Text>Genre : <Text type='secondary'>{props.genre}</Text> </Text>
            <br/>
            <Text>Review : <Text type='success'>{props.review}</Text> </Text>
            <br/>
            <Text className='myRating'><StarTwoTone twoToneColor='#ebc034'/> 
                <Text strong> {props.rating}/10</Text>
            </Text>
            <Text className='myDuration'><ClockCircleTwoTone twoToneColor='#348ceb'/> {props.duration} mins</Text>
            <br/>
            <Button className='myReadMore' icon={<ReadFilled />}>Read More</Button>
        </div>
    </Card>
    )
}

export default MovieCard