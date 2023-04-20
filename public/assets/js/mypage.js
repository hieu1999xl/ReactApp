!(function (e) {
  var t = {}
  function n(i) {
    if (t[i]) return t[i].exports
    var o = (t[i] = { i: i, l: !1, exports: {} })
    return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var i = Object.create(null)
      if (
        (n.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            i,
            o,
            function (t) {
              return e[t]
            }.bind(null, o)
          )
      return i
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 5))
})({
  5: function (e, t) {
    $(function () {
      new Vue({
        el: '#myPageNews',
        data: {
          apiUrl: 'https://insidefile5.sakura.ne.jp/anicom_json_test/data2.php',
          apiPage: '',
          lists: []
        },
        mounted: function () {
          var e = this
          axios
            .get(this.apiUrl)
            .then(function (t) {
              if (t.data.data.length <= 1) return !1
              for (var n = [], i = 0; i < 3; i++) n.push(t.data.data[i])
              e.lists = [].concat(n)
            })
            .catch(function (e) {
              console.log(e)
            })
        },
        methods: {
          openNews: function (e) {
            var t = $(e.currentTarget)
            t.find('.m-news-list__item__body').not(':animated').length >= 1 &&
              (t.find('.m-news-list__item__body').slideToggle(300),
              t.find('.m-news-list__item__head').hasClass('is-open')
                ? t.find('.m-news-list__item__head').removeClass('is-open')
                : t.find('.m-news-list__item__head').addClass('is-open'))
          },
          readMore: function (e) {
            e.preventDefault()
            var t = this
            axios
              .get(this.apiUrl)
              .then(function (e) {
                if (e.data.data.length <= 1) return !1
                for (var n = 0; n < 3; n++) t.lists.push(e.data.data[n])
              })
              .catch(function (e) {
                console.log(e)
              })
          }
        }
      })
    })
  }
})
