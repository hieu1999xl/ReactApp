import React, { memo, Fragment, useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import storage from '../../../../helper/storage'
import paths from '../../../../helper/pathRoutes'
import history from '../../../../helper/history'
import { userProfile } from '../../redux'

function SuccessRegister() {
  const dispatch = useDispatch()

  const handleSubmitLogin = async e => {
    e.preventDefault()
    const token = await storage.getAccessToken('token')
    if (token) {
      dispatch(
        userProfile({
          onSuccess: () => {
            history.push(paths.myPoint)
          }
        })
      )
    } else {
      history.push(paths.login)
    }
  }
  return (
    <div>
      <div className="m-animal-header">
        <div className="m-animal-header__animal-box">
          <p className="m-animal-header__normal-title">
            モニター登録が完了しました！
            <br />
            ようこそアニボイスへ！
          </p>
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_2.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
        </div>
      </div>

      <form id="form" action="#" method="post">
        <div
          className="t-contents t-contents--bg-ivory"
          style={{ paddingTop: 60 }}
        >
          <div className="o-entry">
            {/* <p
							className="m-animal-header__normal-title u-mb5"
							style={{ color: "#333" }}
						>
							モニターへの登録が完了しました。
						</p> */}
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              ご登録いただいたメールアドレスに
            </p>
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              「本登録完了のお知らせ」が
            </p>
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              送信されますので、ご確認ください。
            </p>
          </div>
          <div className="o-entry" style={{ marginTop: 30 }}>
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              ご登録いただいた情報は
            </p>
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              アニボイスのマイページから
            </p>
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              ご確認いただけます。
            </p>
          </div>
          <div className="o-entry" style={{ marginTop: 50 }}>
            <button
              style={{ borderRadius: '50px', cursor: 'pointer' }}
              className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16"
              onClick={handleSubmitLogin}
            >
              ani voiceへログインする
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(SuccessRegister)
