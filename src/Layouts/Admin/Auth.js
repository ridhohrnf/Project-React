import { Typography, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const { Title } = Typography

const Auth = () => {

    let history = useHistory();
    return(
        <>
            <Title>You dont have permission here :)</Title>
            <br/>
            <Button type='primary' onClick={() => {
                history.push('/login')
            }}>
                Login?
            </Button>
        </>
    )
}

export default Auth