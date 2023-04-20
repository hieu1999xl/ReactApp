import { en, ja } from './langs'

import { flattenObject } from '../helper/utils'

const language = {
  en: flattenObject(en),
  ja: flattenObject(ja)
}

export default language
