import { Col, Typography, Collapse } from 'antd'
import { VideoCameraTwoTone } from '@ant-design/icons'

const { Panel } = Collapse
const { Title, Text } = Typography

const InfoMovies = (props) => {
  return (
    <Col className='gutter-row' span={12}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={< Text strong > Movies Info </Text>} key='1'>
          <Title level={2} type='success'>
            <VideoCameraTwoTone twoToneColor='#52c41a'/> {props.jumlah} Movies</Title>
        </Panel>
      </Collapse>
    </Col>
  )
}

export default InfoMovies