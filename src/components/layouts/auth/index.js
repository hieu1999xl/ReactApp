import React, { memo } from 'react'

function AuthLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export default memo(AuthLayout)
