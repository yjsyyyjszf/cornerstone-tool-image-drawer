!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(
        require("cornerstone-tools"),
        require("cornerstone-core")
      ))
    : "function" == typeof define && define.amd
    ? define(["cornerstone-tools", "cornerstone-core"], t)
    : "object" == typeof exports
    ? (exports.ImageDrawer = t(
        require("cornerstone-tools"),
        require("cornerstone-core")
      ))
    : (e.ImageDrawer = t(e.cornerstoneTools, e.cornerstoneCore));
})(window, function(e, t) {
  return (function(e) {
    var t = {};
    function o(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    return (
      (o.m = e),
      (o.c = t),
      (o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (o.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function(e, t) {
        if ((1 & t && (e = o(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            o.d(
              n,
              r,
              function(t) {
                return e[t];
              }.bind(null, r)
            );
        return n;
      }),
      (o.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 2))
    );
  })([
    function(t, o) {
      t.exports = e;
    },
    function(e, o) {
      e.exports = t;
    },
    function(e, t, o) {
      "use strict";
      o.r(t),
        o.d(t, "default", function() {
          return y;
        });
      var n = o(1),
        r = o.n(n),
        i = o(0);
      function u(e) {
        return (u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function c(e, t) {
        for (var o = 0; o < t.length; o++) {
          var n = t[o];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function a(e, t) {
        return !t || ("object" !== u(t) && "function" != typeof t)
          ? (function(e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      function f(e) {
        return (f = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      function l(e, t) {
        return (l =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      var s = Object(i.import)("base/BaseTool"),
        p = Object(i.import)("drawing/drawTextBox"),
        b = Object(i.import)("drawing/getNewContext"),
        y = (function(e) {
          function t() {
            var e,
              o =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
            var n = Object.assign(
              { name: "ImageDrawer", mixins: ["enabledOrDisabledBinaryTool"] },
              o
            );
            return (
              ((e = a(this, f(t).call(this, n))).initialConfiguration = n), e
            );
          }
          var o, n, u;
          return (
            (function(e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 }
              })),
                t && l(e, t);
            })(t, s),
            (o = t),
            (n = [
              {
                key: "enabledCallback",
                value: function() {
                  this._forceImageUpdate();
                }
              },
              {
                key: "disabledCallback",
                value: function() {
                  this._forceImageUpdate();
                }
              },
              {
                key: "_forceImageUpdate",
                value: function() {
                  r.a.getEnabledElement(this.element).image &&
                    r.a.updateImage(this.element, !0);
                }
              },
              {
                key: "renderToolData",
                value: function(e) {
                  var t = e.detail,
                    o = t.canvasContext,
                    n = t.image.stats,
                    r = [],
                    u = b(o.canvas),
                    c = i.toolColors.getToolColor();
                  Object.keys(n).forEach(function(e) {
                    var t = "".concat(e, " : ").concat(n[e]);
                    r.push(t);
                  }),
                    p(u, r, 0, 0, c);
                }
              }
            ]) && c(o.prototype, n),
            u && c(o, u),
            t
          );
        })();
    }
  ]);
});
