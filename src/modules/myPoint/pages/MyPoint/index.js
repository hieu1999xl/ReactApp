import { isEmpty } from 'lodash'
import React, {
  memo,
  Fragment,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import pathRoutes from '../../../../helper/pathRoutes'
import {
  listNotificationByMember,
  selectListNotifications,
  listSurveyByMember,
  selectListSurveys,
  pointHistoryByMember,
  selectTotalPoints
} from '../../redux'
import { selectUserProfile } from '../../../auth/redux'
import { PAGE_SIZE } from '../../../../helper/consts'
import { MarkDown } from '../../../../components/layouts/main/components'
import { cloneDeep } from 'lodash'

function MyPoint() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [openNew, setOpenNew] = useState('')
  const handleShowNew = (e, data) => {
    e.preventDefault()
    setOpenNew(preState => (preState === data?.id ? '' : data?.id))
  }

  const [page, setPage] = useState(0)

  const listNotifications = useSelector(selectListNotifications)
  const listSurveys = useSelector(selectListSurveys)
  const totalPoints = useSelector(selectTotalPoints)
  const userProfile = useSelector(selectUserProfile)

  useLayoutEffect(() => {
    dispatch(pointHistoryByMember())
    handleFetchListSurvey(page)
    dispatch(listNotificationByMember())
  }, [])

  const handleFetchListSurvey = page => {
    const data = {
      per_page: PAGE_SIZE,
      offset: page
    }
    setPage(page)
    dispatch(listSurveyByMember(data))
    window.scrollTo(0, 0)
  }

  const redirectRegisterEdit = e => {
    e.preventDefault()
    history.push(pathRoutes.userProfile)
  }

  const isConditionShowLabelButton = sur => {
    if (sur?.status === 'answered') {
      return '回答完了'
    }
    if (sur?.expired_flg === 1) {
      return '回答期間終了'
    }
    return '回答する'
  }

  const fetchSurveys = useMemo(() => {
    return (
      <>
        {isEmpty(listSurveys?.list_survey) ? (
          <p
            className="o-mypage-survey-slider__margin__wrap__box__title"
            style={{ textAlign: 'center' }}
          >
            データが見つかりません
          </p>
        ) : (
          <>
            <div className="o-mypage-survey-slider js-slider">
              <div className="o-mypage-survey-slider__margin">
                <div className="o-mypage-survey-slider__margin__wrap">
                  {listSurveys?.list_survey.map((sur, idx) => {
                    return (
                      <div
                        className="o-mypage-survey-slider__margin__wrap__box"
                        key={idx}
                      >
                        <p className="o-mypage-survey-slider__margin__wrap__box__title">
                          {sur?.expired_flg !== 1 &&
                            sur?.answer_status === 0 &&
                            sur?.status !== 'answered' && (
                              <span className="o-mypage-survey-slider__margin__wrap__box__title__label">
                                NEW
                              </span>
                            )}

                          {sur?.title}
                        </p>
                        <table className="m-table m-table__survey">
                          <tbody>
                            <tr>
                              <th className="m-table__survey__head m-table__survey__head--point">
                                回答ポイント
                              </th>
                              <td className="m-table__survey__body">
                                <span className="m-table__survey__point-count">
                                  {sur?.point_grant ? sur.point_grant : 'なし'}
                                </span>
                                {sur?.point_grant ? 'ポイント' : ''}
                              </td>
                            </tr>
                            <tr>
                              <th className="m-table__survey__head">
                                回答時間
                              </th>
                              <td
                                className="m-table__survey__body"
                                style={{
                                  whiteSpace: 'pre-wrap',
                                  wordBreak: 'break-all'
                                }}
                              >
                                {sur?.answer_time ? sur.answer_time : '未設定'}
                              </td>
                            </tr>
                            <tr>
                              <th className="m-table__survey__head">
                                回答期限
                              </th>
                              <td className="m-table__survey__body">
                                {sur?.expired_date}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          onClick={() =>
                            window.open(
                              'https://anicom-dev.smilesurvey.co' +
                                sur.answer_url,
                              '_blank'
                            )
                          }
                          disabled={
                            sur?.expired_flg === 1 || sur?.status == 'answered'
                          }
                          className={`a-button ${
                            sur?.expired_flg === 1 || sur?.status == 'answered'
                              ? 'a-button--gray'
                              : 'a-button--yellow a-button--shadow-yellow-1'
                          } a-button--shadow a-button--round`}
                        >
                          {isConditionShowLabelButton(sur)}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="m-slick-arrow u-ml20sp u-mr20sp">
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--left"
                data-slider="slider"
                disabled={page === 0 ? true : false}
                onClick={e => handleFetchListSurvey(page - 1)}
              >
                <img
                  src="../assets/img/icon/icon_arrow-left-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
              <div className="m-slick-arrow__count">{`${page + 1}/${Math.ceil(
                listSurveys.total / PAGE_SIZE
              )}`}</div>
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--right"
                data-slider="slider"
                disabled={
                  page + 1 === Math.ceil(listSurveys.total / PAGE_SIZE)
                    ? true
                    : false
                }
                onClick={e => handleFetchListSurvey(page + 1)}
              >
                <img
                  src="../assets/img/icon/icon_arrow-right-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
            </div>
          </>
        )}
      </>
    )
  }, [listSurveys])

  const [pageNotification, setPageNotification] = useState(0)
  const cloneListNoti = useMemo(() => {
    if (isEmpty(listNotifications)) return listNotifications
    const startEnd = {
      start: 0,
      end: pageNotification === 0 ? 3 : pageNotification + 3
    }
    const newList = cloneDeep(listNotifications)
    return newList.slice(startEnd.start, startEnd.end)
  }, [pageNotification, listNotifications])

  const fetchNotifications = useMemo(() => {
    return (
      <div className="o-mypage__news--box">
        {isEmpty(cloneListNoti) ? (
          <p
            className="o-mypage-survey-slider__margin__wrap__box__title"
            style={{ textAlign: 'center' }}
          >
            データが見つかりません
          </p>
        ) : (
          <>
            <ul className="m-news-list u-mb40pc u-mb20sp">
              {cloneListNoti?.map((data, idx) => {
                return (
                  <li key={idx} className="m-news-list__item">
                    <div
                      className="m-news-list__item__head"
                      onClick={e => {
                        handleShowNew(e, data)
                      }}
                    >
                      <span className="m-news-list__item__head__date">
                        {data.expired_date}
                      </span>{' '}
                      <p className="m-news-list__item__head__title">
                        {data.name}
                      </p>
                    </div>{' '}
                    <div
                      className="m-news-list__item__body"
                      style={{
                        display: `${data.id === openNew ? 'block' : 'none'}`
                      }}
                    >
                      <div className="m-news-list__item__body__contents">
                        <div>
                          <MarkDown
                            content={data.details}
                            style={{ wordBreak: 'break-all' }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            {!isEmpty(listNotifications) &&
            listNotifications.length > 3 &&
            !isEmpty(cloneListNoti) &&
            cloneListNoti.length !== listNotifications.length ? (
              <button
                onClick={() => setPageNotification(preState => preState + 3)}
                className="a-button a-button--light-green a-button--round u-fz24 u-fz14sp u-hover"
              >
                もっと見る
              </button>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    )
  }, [cloneListNoti, openNew, listNotifications])

  const useProfileName = useMemo(() => {
    if (isEmpty(userProfile)) {
      return ''
    }
    if (isEmpty(userProfile?.info)) {
      return ''
    }
    const parseUserInfo = JSON.parse(userProfile?.info)
    let name = ''
    for (let index = 0; index < parseUserInfo.length; index++) {
      if (
        !isEmpty(parseUserInfo[index]) &&
        parseUserInfo[index]['name'] === 'name'
      ) {
        name = parseUserInfo[index]['value']
        break
      }
    }
    return name
  }, [userProfile])

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">マイページ</p>
          <div className="m-pager-title__inner__name-box">
            <span className="m-pager-title__inner__name u-mr20">
              こんにちは
            </span>
            <span className="m-pager-title__inner__name m-pager-title__inner__name--large u-mr10">
              {useProfileName || ''}
            </span>
            <span className="m-pager-title__inner__name m-pager-title__inner__name--middle">
              さん
            </span>
          </div>
        </div>
      </div>
      <div className="o-mypage">
        <div className="o-mypage-header">
          <div className="o-mypage-point">
            <div className="o-mypage-point__sp-name">
              <p className="o-mypage-point__sp-name__text">
                <span className="o-mypage-point__sp-name__text__small">
                  こんにちは
                </span>
                <br />
                {useProfileName || ''}
                <span className="o-mypage-point__sp-name__text__middle">
                  さん
                </span>
              </p>
            </div>
            <div
              className="o-mypage-point__icon"
              style={{ cursor: 'pointer' }}
              onClick={e => redirectRegisterEdit(e)}
            >
              {userProfile?.avatar_url ? (
                <img
                  src={userProfile?.avatar_url}
                  className="o-mypage-point__icon__image"
                  alt="avatar"
                />
              ) : (
                <img
                  src="../assets/img/mypage/img_no-image.png"
                  className="o-mypage-point__icon__image"
                  alt="avatar"
                />
              )}
            </div>
            <div className="o-mypage-point-data">
              <div className="o-mypage-point-data__detail">
                <div className="o-mypage-point-data__detail__text">
                  <span className="o-mypage-point-data__detail__text__have-point">
                    保有ポイント
                  </span>
                  <p className="o-mypage-point-data__detail__text__count">
                    {totalPoints}
                    <span className="o-mypage-point-data__detail__text__count__point-text">
                      ポイント
                    </span>
                  </p>
                </div>
                <a
                  href="/point_acquisition"
                  className="o-mypage-point-data__detail__history u-hover"
                >
                  獲得ポイント履歴を確認する
                  <img
                    src="../assets/img/icon/icon_arrow-right.png"
                    className="o-mypage-point-data__detail__history__history-arrow"
                    alt=""
                  />
                </a>
              </div>
              <a
                href="/point_exchange_item"
                className="o-mypage-point-data__data-exchange"
              >
                ポイントを交換する
              </a>
            </div>
          </div>
          <div className="o-mypage-point-animals">
            <div className="o-mypage-point-animals__animals-inner">
              <img
                src="../assets/img/common/img_animals-image_3.png"
                className="o-mypage-point-animals__image"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="o-mypage-survey">
          <div className="o-mypage-survey-inner">
            <h2
              id="slider"
              className="a-fukidashi-title u-ml20 u-mr20 u-mb60pc u-mb20sp"
            >
              アンケート一覧
            </h2>
            {fetchSurveys}
          </div>
        </div>
        <div className="o-mypage__news">
          <div className="o-mypage__news--inner">
            <h2 className="a-fukidashi-title u-mb35pc u-mb20sp">お知らせ</h2>{' '}
            {fetchNotifications}
          </div>
        </div>
        <div className="m-sub-menu">
          <div className="m-sub-menu__list">
            <a href={pathRoutes.faq} className="m-sub-menu__link u-hover">
              よくある質問
            </a>
          </div>
          <div className="m-sub-menu__list">
            <a href={pathRoutes.inquiry} className="m-sub-menu__link u-hover">
              お問い合わせ
            </a>
          </div>
          <div className="m-sub-menu__list">
            <a
              href={pathRoutes.closeAccount}
              className="m-sub-menu__link u-hover"
            >
              退会
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MyPoint)
