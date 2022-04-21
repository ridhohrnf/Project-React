import {Card, Form, Input, Button} from 'antd'
import {Typography} from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { DataContext } from '../../Contexts/DataContext'
import { useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const { Title } = Typography

const ChangePass = () => {

    const { allMethod } = useContext(DataContext)
    const { config } = allMethod
    let history = useHistory()
    const swal = withReactContent(Swal)

    const onFinish = (values) => {
        if(values.password === values.password_confirm) {

        axios.post(`https://backendexample.sanbersy.com/api/change-password`, values, config).then((res) => {
            swal.fire({
                title: <strong>Change Password Success!</strong>,
                timer: 1500,
                showConfirmButton: false,
                icon: "success",
              }).then(() => {
                history.push('/admin/dashboard')
              })
        }).catch((error) => {
            if (error.response.status === 400) {
              swal.fire({
                title: <strong>Change Password Failed!</strong>,
                html: <i>Check your old and new password</i>,
                showConfirmButton: false,
                timer: 1500,
                icon: "error",
              })
            }
          })
        } else {
            swal.fire({
                title: <strong>Password doesn't match!</strong>,
                timer: 1500,
                showConfirmButton: false,
                icon: "warning",
              })
        }
        
        console.log(values)
    }

    return(
        <Card className='myContainer'>
        <Title className='myCenter' level={2}>Reset Password</Title>
        <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off">

            <Form.Item
            name="current_password"
            rules={[{
                required: true,
                message: 'Input your prefered password!'
            }
            ]}>
            <Input.Password
                prefix={< LockOutlined className = "site-form-item-icon" />}
                placeholder="Your Older Password"/>
            </Form.Item>
            
            <Form.Item
            name="new_password"
            rules={[{
                required: true,
                message: 'Input your prefered password!'
            }
            ]}>
            <Input.Password
                prefix={< LockOutlined className = "site-form-item-icon" />}
                placeholder="New Password"/>
            </Form.Item>

            <Form.Item
            name="new_confirm_password"
            rules={[{
                required: true,
                message: 'Input your prefered password!'
            }
            ]}>
            <Input.Password
                prefix={< LockOutlined className = "site-form-item-icon" />}
                placeholder="Confirm New Password"/>
            </Form.Item>

            <Form.Item >
            <Button type="primary" htmlType="submit" className='myFormButton'>
                Reset Password
            </Button>
            </Form.Item>
        </Form>
        </Card>
    )
}

export default ChangePass