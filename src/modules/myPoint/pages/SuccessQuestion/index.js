import React, { memo, useEffect } from 'react'

function SuccessQuestion() {
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            お問合せ＞お問合せフォーム＞内容確認＞送信完了
          </p>
        </div>
      </div>
      {/* <form id="form" action="#" method="post"> */}
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry" style={{ textAlign: 'center' }}>
          <p
            className="m-animal-header__normal-title u-mb20"
            style={{ color: '#333' }}
          >
            お問い合わせが完了しました
          </p>
          <img
            src="/assets/img/common/img_hamster_success_question.png"
            style={{ width: '10%', paddingBottom: '20px' }}
          />
          <p
            className="m-animal-header__normal-title u-mb20"
            style={{ color: '#333', fontWeight: 'normal', fontSize: '16px' }}
          >
            お問い合わせいただきありがとうございました。
            <br />
            ご回答につきましては5営業日を目途としておりますが、お問い合わせ内容により、お時間をいただく場合があります。あらかじめご了承ください。
          </p>
          <p
            className="m-animal-header__normal-title u-mb5"
            style={{ color: '#333', fontWeight: 'normal', fontSize: '16px' }}
          >
            なお、ご入力いただいたメールアドレス宛に受付完了メールを配信しております。
            <br />
            完了メールが届かない場合、処理が正常に行われていない可能性があります。
            <br />
            大変お手数ですが、再度お問い合わせの手続きをお願いいたします。
          </p>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default memo(SuccessQuestion)
