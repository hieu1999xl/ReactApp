import { isEmpty, groupBy, orderBy } from 'lodash'
import React, {
  memo,
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalPoints, pointHistoryByMember } from '../../redux'
import { withRouter } from 'react-router-dom'
import { formatJATime } from '../../../../helper/utils'

function PointAcquisition() {
  const dispatch = useDispatch()
  const listPointHistories = useSelector(state => state.myPoint.pointHistories)
  const totalPoints = useSelector(selectTotalPoints)

  useLayoutEffect(() => {
    dispatch(pointHistoryByMember())
  }, [])

  const listDataUnique = useMemo(() => {
    if (isEmpty(listPointHistories?.data)) return []
    let sortedData = []
    for (let index = 0; index < listPointHistories?.data.length; index++) {
      const createdAtItem = formatJATime(
        listPointHistories?.data[index]['created_at']
      )
      if (sortedData.includes(createdAtItem)) {
        continue
      }
      sortedData.push(createdAtItem)
    }
    return sortedData
  }, [listPointHistories])

  const objDateMapped = useMemo(() => {
    if (isEmpty(listPointHistories?.data)) return []
    return groupBy(listPointHistories?.data, p => formatJATime(p?.created_at))
  }, [listPointHistories])

  const handleFetchData = page => {
    dispatch(pointHistoryByMember(page))
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">獲得ポイント履歴</p>
        </div>
      </div>
      <div
        className="t-contents t-contents--sp-no-side-padding"
        style={{ paddingTop: '60px' }}
      >
        <div className="t-contents__body t-contents__body--slider">
          <div className="m-keep-point m-keep-point--slider u-mb20">
            <span className="m-keep-point__text">保有ポイント</span>
            <div className="m-keep-point__point-text">
              {totalPoints}
              <span className="m-keep-point__point-text__small">ポイント</span>
            </div>
          </div>
          {isEmpty(listDataUnique) ? (
            <p
              className="o-mypage-survey-slider__margin__wrap__box__title"
              style={{ textAlign: 'center' }}
            >
              データが見つかりません
            </p>
          ) : (
            <div className="u-mb60pc u-mb25sp js-slider">
              <div className="t-slider-margin">
                <table className="m-table m-table--keep-point">
                  <tbody>
                    {listDataUnique?.map((point, idx) => {
                      return (
                        <tr className="m-table-border" key={idx}>
                          <th className="m-table__head m-table__head--keep-point-date m-table-border__head m-table-border__head--no-sp">
                            {point}
                          </th>
                          <td className="m-table__body m-table__body--keep-point-large m-table-border__body m-table-border__body--no-sp">
                            {objDateMapped[point].map((data, index) => {
                              return (
                                <div className="m-point-table-box" key={index}>
                                  <div className="m-point-table-box__title">
                                    {data?.name ||
                                      '日用品に関するアンケート回答'}
                                  </div>
                                  <div className="m-point-table-box__line"></div>
                                  <div
                                    class={`m-point-table-box__point ${
                                      data?.type === 2
                                        ? 'a-color--pink'
                                        : 'a-color--yellow-green'
                                    }`}
                                  >
                                    {`${data?.type === 2 ? '+' : '-'}`}
                                    {data?.point_num}P
                                  </div>
                                </div>
                              )
                            })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!isEmpty(listPointHistories?.data) && (
            <div className="m-slick-arrow m-slick-arrow--sp-side-margin">
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--left"
                disabled={listPointHistories.current_page === 1 ? true : false}
                onClick={() =>
                  handleFetchData(listPointHistories.current_page - 1)
                }
              >
                <img
                  src="../assets/img/icon/icon_arrow-left-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
              <div className="m-slick-arrow__count">{`${listPointHistories.current_page} / ${listPointHistories.last_page}`}</div>
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--right"
                disabled={
                  listPointHistories.current_page ===
                  listPointHistories.last_page
                    ? true
                    : false
                }
                onClick={() =>
                  handleFetchData(listPointHistories.current_page + 1)
                }
              >
                <img
                  src="../assets/img/icon/icon_arrow-right-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(withRouter(PointAcquisition))
