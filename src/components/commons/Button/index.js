import React from 'react'
import { memo } from 'react'

function CButton({
  title = '',
  children,
  onClick,
  size = 1,
  backgroundColor,
  color,
  ...rest
}) {
  return <>{children}</>
}

export default memo(CButton)
