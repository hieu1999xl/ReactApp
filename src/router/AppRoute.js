import { Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  page: PropTypes.element,
  layout: PropTypes.element
}

const defaultProps = {
  page: null,
  layout: null
}

function AppRoute(props) {
  const { page: Component, layout: Layout, ...rest } = props
  return (
    <Route
      {...rest}
      render={appProps => {
        return Layout ? (
          <Layout {...appProps} {...rest}>
            {Component ? <Component {...appProps} {...rest} /> : null}
          </Layout>
        ) : Component ? (
          <Component {...appProps} />
        ) : null
      }}
    />
  )
}
AppRoute.propTypes = propTypes
AppRoute.defaultProps = defaultProps

export default AppRoute
