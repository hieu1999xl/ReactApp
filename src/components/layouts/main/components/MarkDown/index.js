import React, { memo } from 'react'
import parse from 'html-react-parser'

function MarkDown({ content, ...restProps }) {
  const html = content ?? '<p></p>'
  return <div {...restProps}>{parse(html)}</div>
}

export default memo(MarkDown)
