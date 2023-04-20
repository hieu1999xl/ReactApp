import { toast } from 'react-toastify'

export const toastify = ({
  type,
  msg,
  position = 'bottom-left',
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
  ...rest
}) => {
  return toast[type](msg, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: hideProgressBar,
    closeOnClick: closeOnClick,
    pauseOnHover: pauseOnHover,
    draggable: draggable,
    progress: progress,
    ...rest
  })
}
