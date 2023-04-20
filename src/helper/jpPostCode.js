import { URL_POST_CODE, YUBIN } from './consts'
// import axios from "axios";
const jsonp = require('jsonp')

const PREFECTURE_NAMES = [
  null,
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]
const ADDRESS_DATA_CACHES = {}

const getAddress = function (areaCode, townCode, callback) {
  // get master data in cache.
  // const addressData = ADDRESS_DATA_CACHES[areaCode];

  // exist cache?
  // if (addressData) {

  //   // Parsing and response address data.
  //   parseAddress(areaCode + townCode, addressData, callback);

  // }

  // get remote target master address data.
  jsonp(
    URL_POST_CODE + '/' + areaCode + '.js',
    { name: YUBIN },
    function (error, data) {
      // Occurred error.
      if (error) {
        // no-op
        return
      }

      // caching master address data.
      ADDRESS_DATA_CACHES[areaCode] = data

      // Parsing and response address data.
      parseAddress(areaCode + townCode, data, callback)
    }
  )
}

const parseAddress = function (postalCode, masterData, callback) {
  const addressData = masterData[postalCode]
  // empty address data?
  if (!addressData) {
    // no-op
    callback({})
    return
  }

  // get prefecture id
  const prefectureId = addressData[0]

  // empty prefecture id?
  if (!prefectureId) {
    // no-op
    callback({})
    return
  }

  // get prefecture name
  const prefectureName = PREFECTURE_NAMES[prefectureId]

  // empty prefecture name?
  if (!prefectureName) {
    // no-op
    callback({})
    return
  }

  // get city name
  var cityName = addressData[1]

  // empty city name?
  if (!cityName) {
    // set empty name
    cityName = ''
  }

  // get area name
  var areaName = addressData[2]

  // empty area name?
  if (!areaName) {
    // set empty name
    areaName = ''
  }

  // get street name
  var streetName = addressData[3]

  // empty street name?
  if (!streetName) {
    // set empty name
    streetName = ''
  }

  // response parsing data
  callback({
    prefecture_id: prefectureId,
    prefecture: prefectureName,
    city: cityName,
    area: areaName,
    street: streetName
  })
}
export const getPostCodeJA = (areaCode, townCode, completeFunc) => {
  return getAddress(areaCode, townCode, completeFunc)
}
