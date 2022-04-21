import { Col, Typography, Collapse } from 'antd'
import { CarTwoTone } from '@ant-design/icons'

const { Panel } = Collapse
const { Title, Text } = Typography

const InfoGames = (props) => {
  return (
    <Col className='gutter-row' span={12}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={< Text strong > Games Info </Text>} key='1'>
          <Title level={2} type='success'>
            <CarTwoTone twoToneColor='#52c41a'/> {props.jumlah} Games</Title>
        </Panel>
      </Collapse>
    </Col>
  )
}

export default InfoGames