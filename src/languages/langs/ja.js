const ja = {
  validation: {
    // メールアドレス
    requiredEmail: 'メールアドレスは必ず入力してください。',
    requiredEmailConfirm: 'メールアドレス（確認用）は必ず入力してください。',
    isEmail: 'メールアドレスを正しく入力してください。',
    registeredEmail:
      'ご入力いただいたメールアドレスはすでに、登録されています。',
    matchEmail: 'メールアドレスが一致していません。',

    // パスワード
    requiredPassword: 'パスワードは必ず入力してください。',
    requiredPasswordConfirm: 'パスワード（確認用）は必ず入力してください。',
    matchPassword: 'パスワードが一致していません。',
    passwordLength: '半角英数8文字〜16文字で入力してください。',

    // 名前
    requiredName: 'お名前は必ず入力してください。',
    requiredNameFurigana: 'お名前（フリガナ）は必ず入力してください。',

    // 性別
    requiredGender: '性別は必ず入力してください。',

    // 生年月日
    requiredBirthday: '生年月日は必ず入力してください。',
    isDate: '日付を正しく入力してください。',
    checkAdult: '未成年の方は登録できません。',

    // 住所
    requiredAddress:
      '「都道府県」 / 「市区町村」 / 「市区町村以下、番地」は必ず入力してください。',
    requiredAddressNumber: '郵便番号は必ず入力してください。',
    isAddressNumber: '郵便番号を正しく入力してください。',

    // 電話番号
    requiredPhoneNumber: '電話番号は必ず入力してください。',
    isPhoneNumber: '電話番号を正しく入力してください。',

    // お問い合わせ
    requiredQuestion: 'お問い合わせ内容は必ず入力してください。',
    requiredQuestionType: 'お問い合わせ種別は必ず入力してください。',

    // その他
    isKatakana: 'カタカナで入力してください。',
    registered: 'モニター登録はすでに完了しています。',
    checkAgree: '個人情報保護方針への同意が必要です。',
    correctOperation: 'もう一度入力してください。'
  }
}

export default ja
