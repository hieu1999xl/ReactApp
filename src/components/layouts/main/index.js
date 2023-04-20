import React, { memo, useEffect } from 'react'
import { Header, Footer } from '../main/components'
import LoadingBar from 'react-redux-loading-bar'
import Routes from '../../../router/routes'

function MainLayout({ children }) {
  // routes
  const publicRouter = Routes.filter(r => !r.private).map(p => p.path)

  return (
    <>
      {/* <LoadingBar className="loading-bar-redux" showFastActions /> */}
      <Header publicRouter={publicRouter} />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default memo(MainLayout)
