import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Layout} from 'antd'

import MyHeader from '../Layouts/BaseLayout/MyHeader'
import MyFooter from '../Layouts/BaseLayout/MyFooter'
import MySideNav from '../Layouts/BaseLayout/MySideNav'
import Home from '../Layouts/Section/Home'
import ListMovie from '../Layouts/Section/ListMovie'
import ListGame from '../Layouts/Section/ListGame'
import Login from '../Layouts/Admin/Login'
import GameDetail from '../Layouts/Section/GameDetail'
import MovieDetail from '../Layouts/Section/MovieDetail'
import Register from '../Layouts/Admin/Register'
import { DataContext } from '../Contexts/DataContext'
import { useContext } from 'react'
import Cookies from 'js-cookie'
import Dashboard from '../Layouts/Admin/Dashboard'
import MovieList from '../Layouts/List/MovieList'
import GameList from '../Layouts/List/GameList'
import MovieForm from '../Layouts/Form/MovieForm'
import GameForm from '../Layouts/Form/GameForm'
import GameBase from '../Layouts/Form/GameBase'
import MovieBase from '../Layouts/Form/MovieBase'
import ChangePass from '../Layouts/Admin/ChangePass'
import Auth from '../Layouts/Admin/Auth'

const {Content} = Layout

const Routes = () => {

  const {user} = useContext(DataContext)

  return (
    <Router>
      <Layout>
        {/* Header */}
        <MyHeader/>

        <Layout>

          {/* SideBar */}
          { Cookies.get('token') !== undefined && user !== undefined ? (<MySideNav/>) : ""}

          <Layout style={{padding: '0 24px', margin: '16px 0'}}>
            <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 455}}>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/movies' exact component={ListMovie}/>
                    <Route path='/games' exact component={ListGame}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/movies/info/:slug' exact component={MovieDetail}/>
                    <Route path='/games/info/:slug' exact component={GameDetail}/>
                    {Cookies.get("token") !== undefined ? (
                      <>
                      <Route path='/admin/dashboard' exact component={Dashboard}/>
                      <Route path='/admin/changepass' exact component={ChangePass}/>
                      <Route path='/admin/movies/list' exact component={MovieList}/>
                      <Route path='/admin/movies/form' exact component={MovieForm}/>
                      <Route path='/admin/movies/edit/:slug' exact component={MovieBase}/>
                      <Route path='/admin/games/list' exact component={GameList}/>
                      <Route path='/admin/games/form' exact component={GameForm}/>
                      <Route path='/admin/games/edit/:slug' exact component={GameBase}/>
                      </>
                    ) : <Auth/>}
                </Switch>
            </Content>
          </Layout>

        </Layout>

        <MyFooter/>
      </Layout>
    </Router>
  )
}

export default Routes