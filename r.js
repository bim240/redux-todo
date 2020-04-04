!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e((t.Redux = t.Redux || {}));
})(this, function(t) {
  "use strict";
  function e(t) {
    var e = h.call(t, g),
      n = t[g];
    try {
      t[g] = void 0;
      var r = !0;
    } catch (t) {}
    var o = v.call(t);
    return r && (e ? (t[g] = n) : delete t[g]), o;
  }
  function n(t) {
    return j.call(t);
  }
  function r(t) {
    return null == t
      ? void 0 === t
        ? m
        : w
      : O && O in Object(t)
      ? e(t)
      : n(t);
  }
  function o(t) {
    return null != t && "object" == typeof t;
  }
  function i(t) {
    if (!o(t) || r(t) != E) return !1;
    var e = x(t);
    if (null === e) return !0;
    var n = N.call(e, "constructor") && e.constructor;
    return "function" == typeof n && n instanceof n && S.call(n) == A;
  }
  function u(t, e, n) {
    function r() {
      p === l && (p = l.slice());
    }
    function o() {
      return s;
    }
    function c(t) {
      if ("function" != typeof t)
        throw Error("Expected listener to be a function.");
      var e = !0;
      return (
        r(),
        p.push(t),
        function() {
          if (e) {
            (e = !1), r();
            var n = p.indexOf(t);
            p.splice(n, 1);
          }
        }
      );
    }
    function a(t) {
      if (!i(t))
        throw Error(
          "Actions must be plain objects. Use custom middleware for async actions."
        );
      if (void 0 === t.type)
        throw Error(
          'Actions may not have an undefined "type" property. Have you misspelled a constant?'
        );
      if (y) throw Error("Reducers may not dispatch actions.");
      try {
        (y = !0), (s = d(s, t));
      } finally {
        y = !1;
      }
      for (var e = (l = p), n = 0; e.length > n; n++) (0, e[n])();
      return t;
    }
    var f;
    if (
      ("function" == typeof e && void 0 === n && ((n = e), (e = void 0)),
      void 0 !== n)
    ) {
      if ("function" != typeof n)
        throw Error("Expected the enhancer to be a function.");
      return n(u)(t, e);
    }
    if ("function" != typeof t)
      throw Error("Expected the reducer to be a function.");
    var d = t,
      s = e,
      l = [],
      p = l,
      y = !1;
    return (
      a({ type: P.INIT }),
      (f = {
        dispatch: a,
        subscribe: c,
        getState: o,
        replaceReducer: function(t) {
          if ("function" != typeof t)
            throw Error("Expected the nextReducer to be a function.");
          (d = t), a({ type: P.INIT });
        }
      }),
      (f[R] = function() {
        var t,
          e = c;
        return (
          (t = {
            subscribe: function(t) {
              function n() {
                t.next && t.next(o());
              }
              if ("object" != typeof t)
                throw new TypeError("Expected the observer to be an object.");
              return n(), { unsubscribe: e(n) };
            }
          }),
          (t[R] = function() {
            return this;
          }),
          t
        );
      }),
      f
    );
  }
  function c(t, e) {
    var n = e && e.type;
    return (
      "Given action " +
      ((n && '"' + n + '"') || "an action") +
      ', reducer "' +
      t +
      '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
    );
  }
  function a(t) {
    Object.keys(t).forEach(function(e) {
      var n = t[e];
      if (void 0 === n(void 0, { type: P.INIT }))
        throw Error(
          'Reducer "' +
            e +
            "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."
        );
      if (
        void 0 ===
        n(void 0, {
          type:
            "@@redux/PROBE_UNKNOWN_ACTION_" +
            Math.random()
              .toString(36)
              .substring(7)
              .split("")
              .join(".")
        })
      )
        throw Error(
          'Reducer "' +
            e +
            "\" returned undefined when probed with a random type. Don't try to handle " +
            P.INIT +
            ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
        );
    });
  }
  function f(t, e) {
    return function() {
      return e(t.apply(void 0, arguments));
    };
  }
  function d() {
    for (var t = arguments.length, e = Array(t), n = 0; t > n; n++)
      e[n] = arguments[n];
    return 0 === e.length
      ? function(t) {
          return t;
        }
      : 1 === e.length
      ? e[0]
      : e.reduce(function(t, e) {
          return function() {
            return t(e.apply(void 0, arguments));
          };
        });
  }
  var s,
    l =
      "object" == typeof global && global && global.Object === Object && global,
    p = "object" == typeof self && self && self.Object === Object && self,
    y = (l || p || Function("return this")()).Symbol,
    b = Object.prototype,
    h = b.hasOwnProperty,
    v = b.toString,
    g = y ? y.toStringTag : void 0,
    j = Object.prototype.toString,
    w = "[object Null]",
    m = "[object Undefined]",
    O = y ? y.toStringTag : void 0,
    x = (function(t, e) {
      return function(n) {
        return t(e(n));
      };
    })(Object.getPrototypeOf, Object),
    E = "[object Object]",
    I = Function.prototype,
    T = Object.prototype,
    S = I.toString,
    N = T.hasOwnProperty,
    A = S.call(Object),
    R = (function(t) {
      var e,
        n = t.Symbol;
      return (
        "function" == typeof n
          ? n.observable
            ? (e = n.observable)
            : ((e = n("observable")), (n.observable = e))
          : (e = "@@observable"),
        e
      );
    })(
      (s =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof module
          ? module
          : Function("return this")())
    ),
    P = { INIT: "@@redux/INIT" },
    k =
      Object.assign ||
      function(t) {
        for (var e = 1; arguments.length > e; e++) {
          var n = arguments[e];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
        return t;
      };
  (t.createStore = u),
    (t.combineReducers = function(t) {
      for (var e = Object.keys(t), n = {}, r = 0; e.length > r; r++) {
        var o = e[r];
        "function" == typeof t[o] && (n[o] = t[o]);
      }
      var i = Object.keys(n),
        u = void 0;
      try {
        a(n);
      } catch (t) {
        u = t;
      }
      return function() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = arguments[1];
        if (u) throw u;
        for (var r = !1, o = {}, a = 0; i.length > a; a++) {
          var f = i[a],
            d = n[f],
            s = t[f],
            l = d(s, e);
          if (void 0 === l) {
            var p = c(f, e);
            throw Error(p);
          }
          (o[f] = l), (r = r || l !== s);
        }
        return r ? o : t;
      };
    }),
    (t.bindActionCreators = function(t, e) {
      if ("function" == typeof t) return f(t, e);
      if ("object" != typeof t || null === t)
        throw Error(
          "bindActionCreators expected an object or a function, instead received " +
            (null === t ? "null" : typeof t) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(t), r = {}, o = 0; n.length > o; o++) {
        var i = n[o],
          u = t[i];
        "function" == typeof u && (r[i] = f(u, e));
      }
      return r;
    }),
    (t.applyMiddleware = function() {
      for (var t = arguments.length, e = Array(t), n = 0; t > n; n++)
        e[n] = arguments[n];
      return function(t) {
        return function(n, r, o) {
          var i = t(n, r, o),
            u = i.dispatch,
            c = [],
            a = {
              getState: i.getState,
              dispatch: function(t) {
                return u(t);
              }
            };
          return (
            (c = e.map(function(t) {
              return t(a);
            })),
            (u = d.apply(void 0, c)(i.dispatch)),
            k({}, i, { dispatch: u })
          );
        };
      };
    }),
    (t.compose = d),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
