import { Link } from 'react-router-dom'
import { Layout, Menu, Typography } from 'antd'
import { DashboardTwoTone , VideoCameraTwoTone , CarTwoTone, SettingTwoTone } from '@ant-design/icons'

const { SubMenu } = Menu
const { Sider } = Layout
const { Text } = Typography

const MySideNav = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
        height: '100%',
        borderRight: 0
      }}>
        <Menu.Item key='1' icon={< DashboardTwoTone  />}>
          <Link to='/admin/dashboard'/>
          <Text strong>Dashboard</Text>
        </Menu.Item>

        <SubMenu key="sub1" icon={< VideoCameraTwoTone  />} title={<Text strong>Movies</Text>}>
          <Menu.Item key="2">
            <Link to='/admin/movies/list'/>Movie List
          </Menu.Item>
          
          <Menu.Item key="3">
            <Link to='/admin/movies/form'/>Movie Form
          </Menu.Item>
          
        </SubMenu>

        <SubMenu key="sub2" icon={< CarTwoTone  />} title={<Text strong>Games</Text>}>
          <Menu.Item key="4">
            <Link to='/admin/games/list'/>Games List
          </Menu.Item>
          
          <Menu.Item key="5">
            <Link to='/admin/games/form'/>Games Form
          </Menu.Item>
        </SubMenu>

        <Menu.Item key='6' icon={< SettingTwoTone  />}>
          <Link to='/admin/changepass'/>
          <Text strong>Change Password</Text>
        </Menu.Item>

      </Menu>
    </Sider>
  )
}

export default MySideNav