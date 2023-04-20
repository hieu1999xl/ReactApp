import moment from 'moment'

export const formatJATime = date => {
  return moment(date).utc().format('YYYY年MM月DD日')
}

export const patternEmail =
  /^([a-zA-Z0-9_\-\.\+1])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
export const validateEmail = email => {
  if (!email) {
    return false
  }
  return patternEmail.test(String(email).toLowerCase())
}

export const validatePhonenumber = inputtxt => {
  var phoneno = /(^\d{2,4}-\d{2,4}-\d{4})$/
  if (inputtxt.match(phoneno)) {
    return true
  } else {
    return false
  }
}

export const compareEmail = (email, emailConf) => {
  if (
    !email['data'] ||
    !emailConf['data'] ||
    !email['extend'] ||
    !emailConf['extend']
  )
    return true
  const fullEmail = `${email['data']}@${email['extend']}`
  const fullEmailConf = `${emailConf['data']}@${emailConf['extend']}`
  if (fullEmail !== fullEmailConf) return true
  return false
}

export const rangeStartToEnd = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    x => start + x * step
  )
}

export const patternPassword = /^[A-Za-z\d]{8,16}$/
export const isValidPartentPassword = passW => {
  return patternPassword.test(passW)
}

export const isValidTextKatakana = text => {
  const pattern = /^[\u30A0-\u30FF]+$/
  return pattern.test(text)
}

export const validateFeatureDOB = ({ day, month, year }) => {
  if (!day || !month || !year) return false
  const dob = `${year}/${month}/${day}`
  if (new Date() < new Date(dob)) {
    return true
  }
  return false
}

export const matchFieldUserInfo = (obj, key) => {
  return obj['name'] === key ? obj['value'] : ''
}

export const listCity = [
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
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]

// export const listGender = ["男性", "女性", "その他", "無回答"];

export const listGender = [
  {
    value: '1',
    label: '男性'
  },
  {
    value: '2',
    label: '女性'
  },
  {
    value: '3',
    label: 'その他'
  },
  {
    value: '4',
    label: '無回答'
  }
]

// Deep flatten object
/**
 *
 * @param ob : Object input
 * @returns single object flattened
 */
export const flattenObject = inputObj => {
  const outputObj = {}

  for (const i in inputObj) {
    if (!inputObj.hasOwnProperty(i)) continue

    if (typeof inputObj[i] == 'object') {
      const flatObject = flattenObject(inputObj[i])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        outputObj[i + '.' + x] = flatObject[x]
      }
    } else {
      outputObj[i] = inputObj[i]
    }
  }
  return outputObj
}

export const validateDOBLatest18 = ({ day, month, year }) => {
  if (!day || !month || !year) return false
  const years = moment().diff(
    moment().set({ year: year, month: month, day: day }),
    'years',
    true
  )
  if (years >= 20) {
    return false
  }
  return true
}

export const validateScopeDay = ({ day, month }) => {
  if (!day || !month) return false
  if (day === '31' && month === '2') {
    return true
  }
  return false
}

export const validatePostCode = ({ zipCode1, zipCode2 }) => {
  if (!zipCode1 || !zipCode1) return false
  const postCode = `${zipCode1}${zipCode2}`
  const pattern = /^[0-9]{7}$/
  return pattern.test(String(postCode))
}
