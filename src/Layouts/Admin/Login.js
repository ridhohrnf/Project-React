import {Card, Form, Input, Button, Divider} from 'antd'
import {Typography} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {DataContext} from '../../Contexts/DataContext'
import {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import './Admin.css'

const {Title, Text} = Typography

const Login = () => {

  const { setUser } = useContext(DataContext)
  let history = useHistory()
  const swal = withReactContent(Swal)

  const onFinish = (values) => {
    console.log('Login process')
    let data = {
      email: values.email,
      password: values.password
    }
      swal.showLoading()
      axios.post(`https://backendexample.sanbersy.com/api/user-login`, data)
        .then((res) => {
          Cookies.set('token', res.data.token)
          setUser(res.data.user)
          swal.fire({
            title: <strong>Berhasil Login !</strong>,
            timer: 1500,
            showConfirmButton: false,
            icon: "success",
          }).then(() => {
            history.push('/admin/dashboard')
          });
        }).catch((error) => {
          if (error.response.status === 400) {
            swal.fire({
              title: <strong>Gagal Login !</strong>,
              html: <i>Email atau password salah</i>,
              showConfirmButton: false,
              timer: 1500,
              icon: "error",
            });
          }
        });
  };

  const onFinishFailed = (errorInfo) => {}

  return (
    <Card className='myContainer'>
      <Title className='myCenter' level={2}>Login</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">

        <Form.Item
          name="email"
          rules={[{
            required: true,
            type: 'email',
            message: 'Masukkan alamat email terdaftar!'
          }
        ]}>
          <Input
            prefix={< UserOutlined className = "site-form-item-icon" />}
            placeholder="Email"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Masukkan password dengan benar!'
          }
        ]}>
          <Input.Password
            prefix={< LockOutlined className = "site-form-item-icon" />}
            placeholder="Password"/>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" className='myFormButton'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Divider>
        <Text type='secondary'>Don't have an account?</Text>
      </Divider>
      <Button type='primary' className='myRegister myFormButton'>
        <Link to='/register'>Register</Link>
      </Button>

    </Card>
  )
}

export default Login