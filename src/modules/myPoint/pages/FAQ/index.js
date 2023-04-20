import React, { memo, Fragment, useState } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function FAQ() {
  const [faq, setFAQ] = useState({
    A: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    },
    B: {
      1: false,
      2: false,
      3: false,
      4: false
    },
    C: {
      1: false,
      2: false,
      3: false
    },
    D: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false
    },
    E: {
      1: false,
      2: false,
      3: false
    },
    F: {
      1: false
    }
  })

  const handleOpen = (block, key) => {
    setFAQ({
      ...faq,
      [block]: {
        ...faq[block],
        [key]: !faq[block][key]
      }
    })
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">よくあるご質問</p>
        </div>
      </div>
      <div className="t-contents">
        <div className="t-contents__body">
          <div className="o-faq-anchor u-mb50pc u-mb25sp">
            <div className="o-faq-anchor__item">
              <a
                href="#faq1"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                モニター登録について
              </a>
            </div>
            <div className="o-faq-anchor__item">
              <a
                href="#faq2"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                ログインについて
              </a>
            </div>
            <div className="o-faq-anchor__item">
              <a
                href="#faq3"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                アンケートについて
              </a>
            </div>
            <div className="o-faq-anchor__item">
              <a
                href="#faq4"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                ポイントについて
              </a>
            </div>
            <div className="o-faq-anchor__item">
              <a
                href="#faq5"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                登録情報の確認・変更について
              </a>
            </div>
            <div className="o-faq-anchor__item">
              <a
                href="#faq6"
                className="a-button a-button--side-large-margin a-button--yellow-green a-button--round a-button--text-center js-anchor"
              >
                その他
              </a>
            </div>
          </div>
          <div className="u-mb70pc u-mb35sp">
            <p id="faq1" className="u-fz18 u-fwBold u-mb15">
              モニター登録について
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 1)}
              >
                <div
                  className={`${
                    faq['A']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    仮登録完了メールが届かない。
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A&nbsp;
                      </span>
                      以下のことが考えられます。<br></br>
                      （１）メールアドレスが正しく入力されていない、または何らかの理由でメールアドレスが無効となっている。
                      <br></br>
                      再度、正しいメールアドレスをご入力ください。<br></br>
                      （２）ご利用のメールボックスが規定容量に達し、新しいメールを受信できない状態になっている。
                      <br></br>
                      メールボックスの残存メール容量をご確認ください。<br></br>
                      （３）迷惑メール設定をされている。<br></br>
                      各携帯電話会社の迷惑メール対策機能をご利用されている場合、メールを受け取れない可能性がございます。
                      <br></br>
                      当社からのメールが迷惑メールの扱いとならないように設定を行ってください。
                      <br></br>
                      当社メールドメイン：@ani-com.com<br></br>
                      まれに迷惑メールフォルダに振り分けられることもございますので、ご確認ください。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 2)}
              >
                <div
                  className={`${
                    faq['A']['2'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.2</span>
                  <span className="o-faq-list__item__head__title">
                    モニター登録は無料なの？
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['2'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      はい、モニターのご登録・サービスのご利用ともに無料です。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 3)}
              >
                <div
                  className={`${
                    faq['A']['3'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.3</span>
                  <span className="o-faq-list__item__head__title">
                    モニター登録はどの品種、契約プランでも登録できるの？
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['3'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      アニコム損保のご契約者であれば、全品種、全契約プランの方が登録できます。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 4)}
              >
                <div
                  className={`${
                    faq['A']['4'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.4</span>
                  <span className="o-faq-list__item__head__title">
                    何名までモニター登録できるの？{' '}
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['4'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      モニター登録できる人数は１名までです。 ani
                      voiceではご契約者1名につき専用URLを１つ発行しています。そのため、同一名義のご契約者で2頭以上契約いただいている場合も、登録できるモニターは1名のみです。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 5)}
              >
                <div
                  className={`${
                    faq['A']['5'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.5</span>
                  <span className="o-faq-list__item__head__title">
                    契約者以外でもモニター登録できるの？{' '}
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['5'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ご契約者向けのアンケートサイトのため、モニターのご登録はご契約者または被保険者のいずれか１名に限ります。ただし、未成年者のモニター登録はできません。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('A', 6)}
              >
                <div
                  className={`${
                    faq['A']['6'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.6</span>
                  <span className="o-faq-list__item__head__title">
                    モニター登録をしようとしたら、「アクセスしようとしたページは表示できませんでした。」というエラーページが表示されました。{' '}
                  </span>
                </div>
                <div
                  className={`${
                    faq['A']['6'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      アニコム損保のマイページにあるani
                      voiceのバナーからアクセスしてください。ani
                      voiceではご契約者1名につき専用URLを１つ発行しており、専用URL以外から新規モニター登録のページへアクセスした場合、アクセス制限を設けています。{' '}
                    </p>
                    <div style={{ textAlign: 'center' }}>
                      <div className="faq-guidance-text">
                        <p
                          className="u-fz18 u-fwBold u-pt20 u-pb15"
                          style={{ color: '#007048' }}
                        >
                          マイページからのアクセス方法
                        </p>
                        <p
                          className="u-fz16 u-fwBold u-pb10 has-text-left"
                          style={{ color: '#007048' }}
                        >
                          STEP1
                        </p>
                        <p className="u-fz16 u-fwBold has-text-left">
                          アニコム損保のマイページにログインしてください。
                        </p>
                      </div>
                      <img
                        className="faq-guidance-image"
                        src="assets/img/register/guidance_1.png"
                      />
                      <div className="faq-guidance-text">
                        <p
                          className="u-fz16 u-fwBold u-pb10 has-text-left"
                          style={{ color: '#007048' }}
                        >
                          STEP2
                        </p>
                        <p className="u-fz16 u-fwBold has-text-left">
                          「ani voice」のバナーをクリックしてください。
                        </p>
                      </div>
                      <img
                        className="faq-guidance-image"
                        src="assets/img/register/guidance_2.png"
                      />
                      <div className="faq-guidance-text">
                        <p
                          className="u-fz16 u-fwBold u-pb10 has-text-left"
                          style={{ color: '#007048' }}
                        >
                          STEP3
                        </p>
                        <p className="u-fz16 u-fwBold has-text-left">
                          「新規モニター登録はこちら」から、モニター登録を行ってください。
                        </p>
                      </div>
                      <img
                        className="faq-guidance-image"
                        src="assets/img/register/guidance_3.png"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="u-mb70pc u-mb35sp">
            <p id="faq2" className="u-fz18 u-fwBold u-mb15">
              ログインについて
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item "
                onClick={() => handleOpen('B', 1)}
              >
                <div
                  className={`${
                    faq['B']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    ログインIDを忘れてしまった。
                  </span>
                </div>
                <div
                  className={`${
                    faq['B']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ログインIDはani
                      voiceにご登録いただいた際のメールアドレスです。お忘れの場合には、お手持ちのメールアドレスでログインをお試しください。また
                      <a
                        href={pathRoutes.forgetId}
                        style={{ fontWeight: 'bold' }}
                      >
                        「ログインIDを忘れた方はこちら」
                      </a>
                      からご確認も可能です。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('B', 2)}
              >
                <div
                  className={`${
                    faq['B']['2'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.2</span>
                  <span className="o-faq-list__item__head__title">
                    パスワードを忘れてしまった。
                  </span>
                </div>
                <div
                  className={`${
                    faq['B']['2'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      <a
                        href={pathRoutes.resetPassword}
                        style={{ fontWeight: 'bold' }}
                      >
                        「パスワードを忘れた方はこちら」
                      </a>
                      から再設定をお願いいたします。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item "
                onClick={() => handleOpen('B', 3)}
              >
                <div
                  className={`${
                    faq['B']['3'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.3</span>
                  <span className="o-faq-list__item__head__title">
                    ログインができない。
                  </span>
                </div>
                <div
                  className={`${
                    faq['B']['3'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      以下のことが考えられます。<br></br>
                      （１）ログインIDまたはパスワードに誤りがある。<br></br>
                      （２）Cookieが無効になっている。<br></br>
                      ブラウザのCookieを有効にして、再度お試しください。
                      <br></br>
                      （３）システムエラーが起きている。<br></br>
                      恐れ入りますが、しばらく時間をおいて再度お試しください。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item "
                onClick={() => handleOpen('B', 4)}
              >
                <div
                  className={`${
                    faq['B']['4'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.4</span>
                  <span className="o-faq-list__item__head__title">
                    メールアドレス・パスワードを入力しても、ログインできない。{' '}
                  </span>
                </div>
                <div
                  className={`${
                    faq['B']['4'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      【よくあるトラブル例】<br></br>
                      メールアドレス・パスワードともに必ず半角英数字でご入力ください。
                      <br></br>
                      全角で入力すると、エラーになり認証されません。<br></br>
                      また、前後にスペース（空白）が入っていないかご確認ください。{' '}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="u-mb70pc u-mb35sp">
            <p id="faq3" className="u-fz18 u-fwBold u-mb15">
              アンケートについて
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('C', 1)}
              >
                <div
                  className={`${
                    faq['C']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    アンケートメールを削除してしまった。
                  </span>
                </div>
                <div
                  className={`${
                    faq['C']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ani
                      voiceのマイページにある「アンケート一覧」からご回答いただけます。
                      <br></br>
                      なお、メールの再送は行っておりません。{' '}
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('C', 2)}
              >
                <div
                  className={`${
                    faq['C']['2'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.2</span>
                  <span className="o-faq-list__item__head__title">
                    アンケート回答依頼メールを配信停止したい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['C']['2'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      恐れ入りますが、アンケート回答依頼メールの配信停止は受付いたしかねます。アンケートメールの停止をご希望の場合、モニターの退会手続きをお願いいたします。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('C', 3)}
              >
                <div
                  className={`${
                    faq['C']['3'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.3</span>
                  <span className="o-faq-list__item__head__title">
                    アンケートに回答したのにポイントが付与されない。
                  </span>
                </div>
                <div
                  className={`${
                    faq['C']['3'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ポイントが付与されないアンケートもございます。ポイント付与の有無はアンケートをお願いする際のメールまたはアンケート一覧に明記しておりますので、そちらをご確認ください。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="u-mb70pc u-mb35sp">
            <p id="faq4" className="u-fz18 u-fwBold u-mb15">
              ポイントについて
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 1)}
              >
                <div
                  className={`${
                    faq['D']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    付与されるポイント数を知りたい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      付与ポイントはアンケートをお願いする際のメールまたはアンケート一覧に明記しております。また、付与ポイントはアンケートの質問数等によって異なります。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 2)}
              >
                <div
                  className={`${
                    faq['D']['2'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.2</span>
                  <span className="o-faq-list__item__head__title">
                    ポイント履歴・残高を確認したい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['2'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ani
                      voiceのマイページにある「獲得ポイント履歴」からポイントの履歴・残高をご確認いただけます。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 3)}
              >
                <div
                  className={`${
                    faq['D']['3'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.3</span>
                  <span className="o-faq-list__item__head__title">
                    ポイントの有効期限を知りたい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['3'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ポイントは付与月から5年間有効です。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 4)}
              >
                <div
                  className={`${
                    faq['D']['4'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.4</span>
                  <span className="o-faq-list__item__head__title">
                    退会するとポイントはどうなるのか。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['4'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      貯まったポイントは退会と同時に失効いたします。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 5)}
              >
                <div
                  className={`${
                    faq['D']['5'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.5</span>
                  <span className="o-faq-list__item__head__title">
                    保険契約を解約するとポイントはどうなるか。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['5'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      アニコム損保で有効な保険契約が全てなくなった場合、保険のご解約を確認後、30日後に自動的にani
                      voiceの退会処理を行わせていただきます。退会になりますと、保有しているani
                      voiceのポイントはすべて失効いたします。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 6)}
              >
                <div
                  className={`${
                    faq['D']['6'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.6</span>
                  <span className="o-faq-list__item__head__title">
                    交換した商品が届きません。
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['6'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      商品はお申込みから２週間～１ヶ月を目安にお届けいたします。
                      <br></br>
                      なお商品の在庫状況により、到着が遅れる可能性があります。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('D', 7)}
              >
                <div
                  className={`${
                    faq['D']['7'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.7</span>
                  <span className="o-faq-list__item__head__title">
                    ポイント交換の対象にはどのような商品があるの？
                  </span>
                </div>
                <div
                  className={`${
                    faq['D']['7'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ani
                      voiceのマイページにある「ポイントを交換する」ページより、交換できる商品の一覧をご確認いただけます。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="u-mb70pc u-mb35sp">
            <p id="faq5" className="u-fz18 u-fwBold u-mb15">
              登録情報の確認・変更について
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('E', 1)}
              >
                <div
                  className={`${
                    faq['E']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    登録情報を確認・変更したい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['E']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ani
                      voiceのマイページ右上のメニューボタン内「モニター情報確認・変更」ボタンからご確認・ご変更いただけます。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('E', 2)}
              >
                <div
                  className={`${
                    faq['E']['2'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.2</span>
                  <span className="o-faq-list__item__head__title">
                    どうぶつの情報は登録できるの？
                  </span>
                </div>
                <div
                  className={`${
                    faq['E']['2'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      モニターさまご自身でどうぶつさんの情報を登録することはできません。ご契約中のどうぶつさんの情報はモニター登録時に自動的にani
                      voiceに連携します。アニコム損保にご契約のないどうぶつさんの情報は登録できません。
                    </p>
                  </div>
                </div>
              </li>
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('E', 3)}
              >
                <div
                  className={`${
                    faq['E']['3'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.3</span>
                  <span className="o-faq-list__item__head__title">
                    契約者を変更しました。 ani voiceの情報を変更できますか？
                  </span>
                </div>
                <div
                  className={`${
                    faq['E']['3'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      モニター登録後にご契約者が変更になった場合、ani
                      voiceと契約データとの連携ができなくなります。お手数をおかけしますが、
                      <a
                        href={pathRoutes.inquiry}
                        style={{ fontWeight: 'bold' }}
                      >
                        ani voiceのお問合せ窓口
                      </a>
                      までご連絡をお願いします。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <p id="faq6" className="u-fz18 u-fwBold u-mb15">
              その他
            </p>
            <ul className="o-faq-list">
              <li
                className="o-faq-list__item"
                onClick={() => handleOpen('F', 1)}
              >
                <div
                  className={`${
                    faq['F']['1'] ? 'is-open' : ''
                  } o-faq-list__item__head`}
                >
                  <span className="o-faq-list__item__head__question">Q.1</span>
                  <span className="o-faq-list__item__head__title">
                    退会したい。
                  </span>
                </div>
                <div
                  className={`${
                    faq['F']['1'] ? 'is-open' : ''
                  } o-faq-list__item__body`}
                >
                  <div className="o-faq-list__item__body__contents">
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial">
                        A.&nbsp;
                      </span>
                      ani
                      voiceのマイページ下層にある「退会」ボタンからお手続きください。スマートフォンの場合は右上のメニューにある「退会」ボタンからもお手続き可能です。{' '}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FAQ)
