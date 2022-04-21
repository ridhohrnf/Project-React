import { useHistory } from 'react-router-dom'
import { Card, Typography, Button } from 'antd'
import { ReadFilled } from '@ant-design/icons'

const { Meta } = Card
const { Text } = Typography

const GameCard = (props) => {

    let history = useHistory()

    return(
    <Card hoverable span={4}
        style={{width: 300}}
        value={props.id}
        cover={<img alt="example" src={props.image_url} style={{height: 300, maxWidth: '100%', objectFit: 'cover'}}/>}
        onClick={() => {
            history.push(`games/info/${props.id}`)
        }}>
        <Meta title={props.name}/>
        <div>
            <hr/>
            <Text>Year : <Text type='secondary'>{props.release}</Text> </Text>
            <br/>
            <Text>Genre : <Text type='secondary'>{props.genre}</Text> </Text>
            <br/>
            <br/>
            <Button className='myReadMore' icon={<ReadFilled />}>Read More</Button>
        </div>
    </Card>
    )
}

export default GameCard