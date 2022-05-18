import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom'

import Home from './pages/home/home'
import Dashboard from './pages/dashboard/dashboard'
import Login from './auth/login/login'
import Register from './auth/register/register'
import { useSelector } from 'react-redux'
import Product from './pages/coba-blog/product'
import User from './pages/user/user'
import Discussion from './pages/discussion/discussion'
import AddThread from './pages/discussion/add-thread'
import EditThread from './pages/discussion/edit-thread'
import MainForum from './pages/main/mainForum'
import SubForum from './pages/sub/subForum'
import AddMain from './pages/main/add-main'

const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <>
      {isAuth ? <Outlet /> : <Navigate to='/login' />}
    </>
  ) 
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <>
      {!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}
    </>
  ) 
}


const App = () => {
  return (
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/product' element={<Product />} />
        <Route path='/users/:id_user' element={<User />} />

        {/* discussion path */}
        <Route path='/discussion' element={<Discussion />} />
        <Route path='/add-thread' element={<AddThread />} />
        <Route path='/edit-thread' element={<EditThread />} />

        {/* main forum path */}
        <Route path='/main-forum' element={<MainForum />} />
        <Route path='/main-forum/add' element={<AddMain />} />

        {/* sub forum path */}
        <Route path='/sub-forum' element={<SubForum />} />
      </Route>

      <Route element={<RestrictedRoutes />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App 