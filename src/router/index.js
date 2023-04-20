import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Redirect, Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AppRoute from '../router/AppRoute'
import Routes from './routes'
import pathRoutes from '../helper/pathRoutes'
import storage from '../helper/storage'
import history from '../helper/history'
import { selectIsLogged } from '../modules/auth/redux'
import MainLayout from '../components/layouts/main'
import Register from '../modules/auth/pages/Register'
import ScrollToTop from '../components/commons/ScrollToTop'

import PrivateRouter from './PrivateRouter'

function AppRouter() {
  const publicRouter = Routes.filter(r => !r.private)
  const privateRouter = Routes.filter(r => r.private)
  const listPaths = Routes.map(r => r.path)

  return (
    <Router history={history}>
      {/* <Switch>
        {Routes.map((route, idx) => {
          return <AppRoute key={idx} {...route} />;
        })}
      </Switch> */}
      <ScrollToTop />
      <Switch>
        <MainLayout>
          {!listPaths.includes(history.location.pathname) && (
            <Redirect to={pathRoutes.notFound} />
          )}

          {publicRouter.map((router, idx) => {
            return (
              <Route
                key={idx}
                path={router.path}
                component={router.page}
                exact={router.exact}
              />
            )
          })}
          {privateRouter.map((router, idx) => {
            return (
              <PrivateRouter
                key={idx}
                path={router.path}
                component={router.page}
                exact={router.exact}
              />
            )
          })}
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default AppRouter
