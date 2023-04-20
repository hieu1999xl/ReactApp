import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import paths from '../helper/pathRoutes'
import { selectIsLogged } from '../modules/auth/redux'

import PropTypes from 'prop-types'

const propTypes = {
  component: PropTypes.element
}

const defaultProps = {
  component: null
}

function PrivateRouter({ component: Component, ...restOfProps }) {
  const isAuthenticated = useSelector(selectIsLogged)
  return (
    <Route
      {...restOfProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={paths.login} />
        )
      }
    />
  )
}

PrivateRouter.propTypes = propTypes
PrivateRouter.defaultProps = defaultProps

export default memo(PrivateRouter)
