import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadFile, userProfile } from '../../../modules/auth/redux'

function UploadAvatar() {
  const dispatch = useDispatch()

  const handleFileChange = e => {
    const file = e?.target.files[0]
    dispatch(
      uploadFile({
        payload: file,
        onSuccess: () => {
          dispatch(userProfile())
        }
      })
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0
      }}
    >
      <input
        onChange={handleFileChange}
        type="file"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default memo(UploadAvatar)
