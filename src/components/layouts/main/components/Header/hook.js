import { useState, useLayoutEffect } from 'react'

const useToogle = () => {
  const [isShowing, setIsShowing] = useState(false)

  useLayoutEffect(() => {
    if (window.innerWidth > 768) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  }, [])

  function toggle() {
    setIsShowing(!isShowing)
  }
  return {
    isShowing,
    toggle
  }
}

export default useToogle
