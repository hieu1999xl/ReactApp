import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }
  function onClose() {
    setIsShowing(false)
  }
  return {
    isShowing,
    toggle,
    onClose
  }
}

export default useModal
