import { Row, Col, Typography, Card, Form, Input, InputNumber, Button, Switch  } from 'antd'
import { DataContext } from '../../Contexts/DataContext'
import { useContext, useState, } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import './Form.css'

const { Title, Text } = Typography

const GameForm = () => {

    const { allMethod } = useContext(DataContext)
    const { addGame } = allMethod

    const swal = withReactContent(Swal)
    let history = useHistory()
    const [single, setSingle] = useState(false) 
    const [multi, setMulti] = useState(false)
    const [form] = Form.useForm()
    const [inputGame, setInputGame] = useState({
        name: '',
        genre: '',
        platform: '',
        image_url: '',
        release: null,
    })

    const onFinish = (values) => {
        let data = {
            name: values.name,
            genre: values.genre,
            platform: values.platform,
            image_url: values.image_url,
            release: values.release,
            multiplayer: multi === true ? 1 : 0,
            singlePlayer: single === true ? 1 : 0,
        }
        
        Swal.fire({
            title: 'Ready to add game ?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add game!'
          }).then((result) => {
            if (result.isConfirmed) {
                addGame(data)
                history.push('/admin/games/list')
                Swal.fire(
                    'Added!',
                    'Your game has been added.',
                    'success'
                )
                }
          })
        form.resetFields()
        clearForm()
    }

    const clearForm = () => {
        setInputGame({
            name: '',
            genre: '',
            platform: '',
            image_url: '',
            release: null,
        })
        setMulti(false)
        setSingle(false)
    }

    const changeMulti = () => {
        setMulti(!multi)
      }

    const changeSingle = () => {
        setSingle(!single)
      }

    return(
        <>
        <Card>
        <Row gutter={16}>
            <Col span={24}>
                <Title level={2} className="myFormCenter">Add Game</Title>
            </Col>
        </Row>
        <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input name corectly!'
                        }
                        ]}
                        initialValue={inputGame.name}
                        >
                        <Input placeholder="Name"/>
                    </Form.Item>
                </Col>
                
                <Col span={12}>
                    <Form.Item
                        name="genre"
                        rules={[{
                            required: true,
                            message: 'Please input genre corectly!'
                        }
                        ]}
                        initialValue={inputGame.genre}
                        >
                        <Input placeholder="Genre"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="platform"
                        rules={[{
                            required: true,
                            message: 'Please input platform corectly!'
                        }
                        ]}
                        initialValue={inputGame.platform}
                        >
                        <Input placeholder="Platform"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="image_url"
                        rules={[{
                            required: true,
                            message: 'Please input image_url corectly!'
                        }
                        ]}
                        initialValue={inputGame.image_url}
                        >
                        <Input placeholder="Image Url"/>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="release"
                        rules={[{
                            required: true,
                            message: 'Please input release year corectly!'
                        }
                        ]}
                        initialValue={inputGame.release}
                        >
                        <InputNumber placeholder="Release" min={2000} max={2021}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                <Form.Item 
                    name="multiplayer"
                    label= {<Text type='secondary'>Multi Player</Text>} 
                    >
                    <Switch
                    checked={multi}
                    onChange={changeMulti}
                    />
                </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={8}>
                <Form.Item 
                    name="singlePlayer"
                    label= {<Text type='secondary'>Single Player</Text>} 
                    >
                    <Switch
                    checked={single}
                    onChange={changeSingle}
                    />
                </Form.Item>
                </Col>
            </Row>
            

            <Row>
                <Col span={24}>
                <Form.Item >
                    <Button type="primary" 
                    htmlType="submit" 
                    className='myFormButton' 
                    style={{width: '100%'}}
                    >
                        Submit
                    </Button>
                </Form.Item>
                </Col>
            </Row>
        </Form>
        </Card>
        </>
    )
}

export default GameForm