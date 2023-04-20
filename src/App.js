import React, { useEffect } from 'react'
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import AppRouter from './router'
import { ReduxState } from './redux/types'
import { userProfile } from './modules/auth/redux'
import storage from './helper/storage'

toast.configure()
function App() {
  const dispatch = useDispatch()
  const { status: authStatus } = useSelector(state => state.auth)

  useEffect(() => {
    storage.getAccessToken() && dispatch(userProfile())
  }, [])

  return <AppRouter />
}

export default App
