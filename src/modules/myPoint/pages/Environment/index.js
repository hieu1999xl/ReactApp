import React, { memo, Fragment } from 'react'
import paths from '../../../../helper/pathRoutes'

function Environment() {
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">推奨環境</p>
        </div>
      </div>
      <div className="t-contents t-contents--sp-no-side-padding">
        <div className="t-contents__body">
          <div className="o-environment">
            <div className="o-environment__contents">
              <div className="u-mb20">
                <p className="u-fwBold">Windowsパソコン</p>
                <ul className="m-dots-list">
                  <li>Internet Explorer11以降</li>
                  <li>Chrome（最新版）</li>
                  <li>Firefox（最新版）</li>
                </ul>
              </div>
              <div className="u-mb20">
                <p className="u-fwBold">Macパソコン</p>
                <ul className="m-dots-list">
                  <li>Safari（最新版）</li>
                  <li>Chrome（最新版）</li>
                  <li>Firefox（最新版）</li>
                </ul>
              </div>
              <div className="u-mb20">
                <p className="u-fwBold">iOSデバイス</p>
                <p>iOS9以降の標準ブラウザ</p>
              </div>
              <p className="u-fwBold">Androidデバイス</p>
              <p>Android5.0以降の標準ブラウザまたはGoogle Chrome</p>
              <p>
                ※スマートフォン端末は、上記推奨環境の場合でも機種によってはご利用いただけない機能があります。
              </p>
            </div>
            <div className="o-environment__contents">
              <p className="u-fwBold u-mb30">プラグインについて</p>
              <p className="u-mb20">
                本サイトでは、PDFファイルをご覧いただくためにAdobe Acrobat
                Readerが必要となります。必要なプラグインは、以下よりインストールされることをお勧めいたします。
              </p>
              <div className="u-mb10">
                <a
                  href="https://www.adobe.com/jp/acrobat/pdf-reader.html"
                  className="o-environment__contents__pdf-bnr"
                  target="_blank"
                >
                  <img
                    src="../assets/img/environment/bnr_adobe-pdf.png"
                    className="o-environment__contents__pdf-bnr__image"
                    alt="GET Adobe Acrobat Reader"
                  />
                </a>
              </div>
              <p className="u-fz11 u-mb20">
                PDFファイルをご覧いただくには、Adobe Acrobat
                Readerが必要です。Adobe Acrobat
                Readerはアドビシステムズ社より、無償で配布されております。
              </p>
              <p className="u-fz11">
                ※プラグインとは、ソフトウェア（ブラウザ）が標準で備えていない機能を拡張する外部ソフトウェアのことです。
              </p>
            </div>
            <div className="o-environment__contents">
              <p className="u-fwBold u-mb30">JavaScriptについて</p>
              <p>
                本サイトでは、JavaScriptを使用しております。お使いのブラウザでJavaScript機能を無効にされている場合には、正しく表示されなかったり、意図した機能が動かないことがあります。ご覧になる際にはJavaScriptを有効にすることを推奨します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Environment)
