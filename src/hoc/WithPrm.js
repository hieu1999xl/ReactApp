import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { selectPrmDecoded, checkUserExist } from '../modules/auth/redux'
import paths from '../helper/pathRoutes'

function WithPrm(WraperComponent) {
  function WithPrmHOC(props) {
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const prm = useSelector(selectPrmDecoded)

    useEffect(() => {
      const prmEncode =
        location.search && location.search.includes('prm=')
          ? location.search.split('=')[1]
          : ''
      // TODO if exist PRM and if dont exist prmEncode -> return
      if (prm && !prmEncode) {
        return
      }
      if (
        (!location.search || !prmEncode) &&
        location.pathname === paths.provisionalEntry
      ) {
        history.push(paths.notFound)
        return
      }
      dispatch(
        checkUserExist({
          prm: prmEncode,
          isRedirect: location.pathname === paths.provisionalEntry
        })
      )
      // setPrm(prmEncode)
    }, [location, prm])

    return <WraperComponent />
  }
  return WithPrmHOC
}

export default WithPrm
