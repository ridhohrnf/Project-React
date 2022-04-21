import { Row, Col, Typography, Card, Form, Input, InputNumber, Button,  } from 'antd'
import { DataContext } from '../../Contexts/DataContext'
import { useParams } from 'react-router-dom'
import { useContext, useState, } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import './Form.css'

const { Title } = Typography

const MovieForm = () => {

    const { allMethod, movies } = useContext(DataContext)
    const { editMovie } = allMethod
    let { slug } = useParams()

    const swal = withReactContent(Swal)
    let history = useHistory()
    const [editForm] = Form.useForm()
    const [inputMovies, setInputMovies] = useState(
        movies.filter((arr) => {
            if(arr.id === parseInt(slug)) return arr
        })
    )

    const onFinish = (values) => {
        let data = {
            description: values.description,
            duration: values.duration,
            genre: values.genre,
            image_url: values.image_url,
            rating: values.rating,
            review: values.review,
            title: values.title,
            year: values.year,
        }

        Swal.fire({
            title: 'Ready to edit movie ?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit movie!'
          }).then((result) => {
            if (result.isConfirmed) {
                editMovie(parseInt(slug), data)
                history.push('/admin/movies/list')
                Swal.fire(
                    'Edited!',
                    'Your movie has been edited.',
                    'success'
                )}
          })        
        editForm.resetFields()
    }

    return(
        <>
        <Card>
        <Row gutter={16}>
            <Col span={24}>
                <Title level={2} className="myFormCenter">Add Movie</Title>
            </Col>
        </Row>
        <Form
        form={editForm}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        rules={[{
                            required: true,
                            message: 'Please input title corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].title}
                        >
                        <Input placeholder="Title"/>
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
                        initialValue={inputMovies[0].genre}
                        >
                        <Input placeholder="Genre"/>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        rules={[{
                            required: true,
                            message: 'Please input description corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].description}
                        >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="review"
                        rules={[{
                            required: true,
                            message: 'Please input review corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].review}
                        >
                        <Input.TextArea placeholder="Review"/>
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
                        initialValue={inputMovies[0].image_url}
                        >
                        <Input placeholder="Image Url"/>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="year"
                        rules={[{
                            required: true,
                            message: 'Please input year corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].year}
                        >
                        <InputNumber placeholder="Year" min={1980} max={2021}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="rating"
                        rules={[{
                            required: true,
                            message: 'Please input rating corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].rating}
                        >
                        <InputNumber placeholder="Rating" min={0} max={10}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}> 
                <Col span={8}>
                    <Form.Item
                        name="duration"
                        rules={[{
                            required: true,
                            message: 'Please input duration corectly!'
                        }
                        ]}
                        initialValue={inputMovies[0].duration}
                        >
                        <InputNumber placeholder="Duration"/>
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

export default MovieForm