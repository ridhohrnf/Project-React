import { Table, Row, Col, Typography, Space, Button, Modal, Tag,
     Image, Divider, Rate, Collapse, Input, Form, InputNumber  } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../Contexts/DataContext'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import './List.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const { Title, Text } = Typography
const { Panel } = Collapse
const { Search } = Input

const MovieList = () => {

    const { movies, setMovies, fetchMovie, setFetchMovie,state, setState, allMethod } = useContext(DataContext)
    const { deleteMovie } = allMethod
    let history = useHistory()
    
    const swal = withReactContent(Swal)
    const [filter] = Form.useForm()
    const [search, setSearch] = useState([])
    const [detail, setDetail] = useState([{
        created_at: '',
        description: '',
        duration: '',
        genre: '',
        id: '',
        image_url: '',
        index: '',
        rating: '',
        review: '',
        title: '',
        updated_at: '',
        year: '',
    }])
    useEffect(() => {
        
        const getData = async() => {
            try {
                await axios.get(`https://backendexample.sanbersy.com/api/data-movie`).then((res) => {
                    setMovies([...res.data])
                })
            }catch (err) {
                console.log(err)
            }
        }

        if(fetchMovie) {
            getData()
            setFetchMovie(false)
        }
    },[fetchMovie, setFetchMovie], [search, setSearch])

    let data = movies.map((arr, idx) => {
        arr.index = idx+1
        return arr
    })
    
    let temp = movies

    const columns = [
        {
          title: 'No',
          dataIndex: 'index',
          key: 'index',
          sorter: (a, b) => a.index - b.index,
          sortDirections: ['descend'],
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (txt, record) => {
                return(
                    <Image src={record.image_url} alt={record.name}
                    style={{width: 100, height: 100, objectFit: 'cover'}}
                    />
                )
            }
          },
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.year - b.year,
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rating - b.rating,
          },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (txt, record) => {
                return(
                    <Space size="middle">
                        <Button type="primary" onClick={() => {
                            buttonEdit(record.id)
                        }}>
                            <EditOutlined/>
                        </Button>
                        <Button type='primary' danger onClick={() => {
                            buttonDelete(record.id)
                        }}>
                            <DeleteOutlined/>
                        </Button>
                        <Button type='primary' onClick={() => {
                            buttonInfo(record.id)
                        }}>
                            <InfoCircleOutlined />
                        </Button>
                    </Space>
                )
            }
          },
      ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }

      const buttonEdit = (e) => {
        console.log(e)
        history.push(`/admin/movies/edit/${e}`)
      }

      const buttonDelete = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteMovie(e)
                Swal.fire(
                    'Deleted!',
                    'Movie has been deleted.',
                    'success'
                )
                }
          })
      }
      
      const buttonInfo = (e) => {
        console.log(e)
        let item = movies.filter(arr => {
            if(arr.id === parseInt(e)) return arr
        })
        setDetail(item)
        console.log(detail)
        setState(true)
      }

      const onFinish = (values) => {
        let result = movies.filter((arr) => {
            if(arr.title.toLowerCase().includes(values.genre.toLowerCase())) {
                if(arr.year >= values.year && arr.rating >= values.rating) return arr 
            }
        })

        setMovies(result)
        data = result
        console.log(data)
      }

      const resetForm = () => {
        filter.resetFields()
        setFetchMovie(true)
      }
    
      const onSearch = (values) => {
          if(values === "") {
              setFetchMovie(true)
          } else {
            let result = movies.filter((arr) => {
                if(arr.title.toLowerCase().includes(values.toLowerCase())) return arr
            })
            setMovies(result)
            data = result
            console.log(data)
          }
      }

    return(
        <>
        <Row gutter={16}>
            <Col span={24}>
                <Title level={2} className='myCenterTitle'>Movie List</Title>
            </Col>
        </Row>
        
        <Row gutter={16}>
            <Col span={24}>
                <Collapse>
                    <Panel header={<Text strong>Filter</Text>} key='1' width={"100%"}>
                        <Form
                            form={filter}
                            name="filter"
                            onFinish={onFinish}
                            autoComplete="off"
                            >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                name="genre"
                                rules={[{
                                required: true,
                                message: 'Input genre!'
                                }
                            ]}
                                >
                                    <Input placeholder="Genre"/>
                                </Form.Item>
                            </Col>

                            <Col span={3}>
                                <Form.Item
                                name="year"
                                rules={[{
                                required: true,
                                message: 'Input year!'
                                }
                            ]}
                                >
                                    <InputNumber placeholder="Year" min={1980} max={2021}/>
                                </Form.Item>
                            </Col>

                            <Col span={3}>
                                <Form.Item
                                name="rating"
                                rules={[{
                                required: true,
                                message: 'Input rating!'
                                }
                            ]}
                                >
                                    <InputNumber placeholder="Rating" min={0} max={10}/>
                                </Form.Item>
                            </Col>

                            <Col span={3}>
                            <Form.Item name='submit'>
                                <Button type="primary" htmlType="submit" >
                                    Filter
                                </Button>
                            </Form.Item>
                            </Col>
                            
                            <Col span={3}>
                            <Form.Item name='submit'>
                                <Button type="dashed" htmlType="submit" onClick={resetForm}>
                                    Reset
                                </Button>
                            </Form.Item>
                            </Col>
                        </Row>
                            
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
        <br/>
        
        <Row gutter={16}>
            <Col span={24}>
                <Search
                    placeholder="Search movie"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </Col>
        </Row>
        <br/>

        <Row gutter={16}>
            <Col span={24}>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </Col>
        </Row>

        <Modal
            title={<Title>{detail[0].title}</Title>}
            centered
            animation={false}
            visible={state}
            width={'90%'}
            onOk={() => setState(!state)}
            onCancel={() => setState(!state)}
            >
            <Row gutter={16}>
                <Col span={8}>
                    <Image src={detail[0].image_url} alt={detail.title}
                    style={{width: 300, height: 300, objectFit: 'cover'}}
                    />
                </Col>

                <Col span={16}>
                <Divider>
                    <Text type='secondary'>Details</Text>
                </Divider>
                <Row>
                    <Col span={4}>
                        <Text strong>Year :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='green'>{detail[0].year}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Genre :</Text>
                    </Col>
                    <Col span={20}>
                        <Tag color='orange'>{detail[0].genre}</Tag>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Rating :</Text>
                    </Col>
                    <Col span={20}>
                        <Rate disabled allowHalf defaultValue={(detail[0].rating / 2)} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Review :</Text>
                    </Col>
                    <Col span={20}>
                        <Text success>{detail[0].review}</Text>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        <Text strong>Description :</Text>
                    </Col>
                    <Col span={20}>
                        <Text type='secondary'>{detail[0].description}</Text>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Modal>
        </>
    )
}

export default MovieList