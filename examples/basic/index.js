(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
	  if (val === null || val === undefined) {
	    throw new TypeError('Object.assign cannot be called with null or undefined');
	  }

	  return Object(val);
	}

	function shouldUseNative() {
	  try {
	    if (!Object.assign) {
	      return false;
	    } // Detect buggy property enumeration order in older V8 versions.
	    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


	    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

	    test1[5] = 'de';

	    if (Object.getOwnPropertyNames(test1)[0] === '5') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test2 = {};

	    for (var i = 0; i < 10; i++) {
	      test2['_' + String.fromCharCode(i)] = i;
	    }

	    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
	      return test2[n];
	    });

	    if (order2.join('') !== '0123456789') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test3 = {};
	    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
	      test3[letter] = letter;
	    });

	    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
	      return false;
	    }

	    return true;
	  } catch (err) {
	    // We don't expect any of the above to throw, but better to be safe.
	    return false;
	  }
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	  var from;
	  var to = toObject(target);
	  var symbols;

	  for (var s = 1; s < arguments.length; s++) {
	    from = Object(arguments[s]);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }

	    if (getOwnPropertySymbols) {
	      symbols = getOwnPropertySymbols(from);

	      for (var i = 0; i < symbols.length; i++) {
	        if (propIsEnumerable.call(from, symbols[i])) {
	          to[symbols[i]] = from[symbols[i]];
	        }
	      }
	    }
	  }

	  return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;

	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame

	    throw error;
	  }
	}

	var invariant_1 = invariant;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyObject = {};

	var emptyObject_1 = emptyObject;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */


	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);

	emptyFunction.thatReturnsThis = function () {
	  return this;
	};

	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction;

	var r = "function" === typeof Symbol && Symbol.for,
	    t = r ? Symbol.for("react.element") : 60103,
	    u = r ? Symbol.for("react.portal") : 60106,
	    v = r ? Symbol.for("react.fragment") : 60107,
	    w = r ? Symbol.for("react.strict_mode") : 60108,
	    x = r ? Symbol.for("react.profiler") : 60114,
	    y = r ? Symbol.for("react.provider") : 60109,
	    z = r ? Symbol.for("react.context") : 60110,
	    A = r ? Symbol.for("react.async_mode") : 60111,
	    B = r ? Symbol.for("react.forward_ref") : 60112;
	var C = "function" === typeof Symbol && Symbol.iterator;

	function D(a) {
	  for (var b = arguments.length - 1, e = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) e += "&args[]=" + encodeURIComponent(arguments[c + 1]);

	  invariant_1(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", e);
	}

	var E = {
	  isMounted: function () {
	    return !1;
	  },
	  enqueueForceUpdate: function () {},
	  enqueueReplaceState: function () {},
	  enqueueSetState: function () {}
	};

	function F(a, b, e) {
	  this.props = a;
	  this.context = b;
	  this.refs = emptyObject_1;
	  this.updater = e || E;
	}

	F.prototype.isReactComponent = {};

	F.prototype.setState = function (a, b) {
	  "object" !== typeof a && "function" !== typeof a && null != a ? D("85") : void 0;
	  this.updater.enqueueSetState(this, a, b, "setState");
	};

	F.prototype.forceUpdate = function (a) {
	  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};

	function G() {}

	G.prototype = F.prototype;

	function H(a, b, e) {
	  this.props = a;
	  this.context = b;
	  this.refs = emptyObject_1;
	  this.updater = e || E;
	}

	var I = H.prototype = new G();
	I.constructor = H;
	objectAssign(I, F.prototype);
	I.isPureReactComponent = !0;
	var J = {
	  current: null
	},
	    K = Object.prototype.hasOwnProperty,
	    L = {
	  key: !0,
	  ref: !0,
	  __self: !0,
	  __source: !0
	};

	function M(a, b, e) {
	  var c = void 0,
	      d = {},
	      g = null,
	      h = null;
	  if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = b[c]);
	  var f = arguments.length - 2;
	  if (1 === f) d.children = e;else if (1 < f) {
	    for (var l = Array(f), m = 0; m < f; m++) l[m] = arguments[m + 2];

	    d.children = l;
	  }
	  if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);
	  return {
	    $$typeof: t,
	    type: a,
	    key: g,
	    ref: h,
	    props: d,
	    _owner: J.current
	  };
	}

	function N(a) {
	  return "object" === typeof a && null !== a && a.$$typeof === t;
	}

	function escape(a) {
	  var b = {
	    "=": "=0",
	    ":": "=2"
	  };
	  return "$" + ("" + a).replace(/[=:]/g, function (a) {
	    return b[a];
	  });
	}

	var O = /\/+/g,
	    P = [];

	function Q(a, b, e, c) {
	  if (P.length) {
	    var d = P.pop();
	    d.result = a;
	    d.keyPrefix = b;
	    d.func = e;
	    d.context = c;
	    d.count = 0;
	    return d;
	  }

	  return {
	    result: a,
	    keyPrefix: b,
	    func: e,
	    context: c,
	    count: 0
	  };
	}

	function R(a) {
	  a.result = null;
	  a.keyPrefix = null;
	  a.func = null;
	  a.context = null;
	  a.count = 0;
	  10 > P.length && P.push(a);
	}

	function S(a, b, e, c) {
	  var d = typeof a;
	  if ("undefined" === d || "boolean" === d) a = null;
	  var g = !1;
	  if (null === a) g = !0;else switch (d) {
	    case "string":
	    case "number":
	      g = !0;
	      break;

	    case "object":
	      switch (a.$$typeof) {
	        case t:
	        case u:
	          g = !0;
	      }

	  }
	  if (g) return e(c, a, "" === b ? "." + T(a, 0) : b), 1;
	  g = 0;
	  b = "" === b ? "." : b + ":";
	  if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
	    d = a[h];
	    var f = b + T(d, h);
	    g += S(d, f, e, c);
	  } else if (null === a || "undefined" === typeof a ? f = null : (f = C && a[C] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(d = a.next()).done;) d = d.value, f = b + T(d, h++), g += S(d, f, e, c);else "object" === d && (e = "" + a, D("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
	  return g;
	}

	function T(a, b) {
	  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
	}

	function U(a, b) {
	  a.func.call(a.context, b, a.count++);
	}

	function V(a, b, e) {
	  var c = a.result,
	      d = a.keyPrefix;
	  a = a.func.call(a.context, b, a.count++);
	  Array.isArray(a) ? W(a, c, e, emptyFunction_1.thatReturnsArgument) : null != a && (N(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + e, a = {
	    $$typeof: t,
	    type: a.type,
	    key: b,
	    ref: a.ref,
	    props: a.props,
	    _owner: a._owner
	  }), c.push(a));
	}

	function W(a, b, e, c, d) {
	  var g = "";
	  null != e && (g = ("" + e).replace(O, "$&/") + "/");
	  b = Q(b, g, c, d);
	  null == a || S(a, "", V, b);
	  R(b);
	}

	var X = {
	  Children: {
	    map: function (a, b, e) {
	      if (null == a) return a;
	      var c = [];
	      W(a, c, null, b, e);
	      return c;
	    },
	    forEach: function (a, b, e) {
	      if (null == a) return a;
	      b = Q(null, null, b, e);
	      null == a || S(a, "", U, b);
	      R(b);
	    },
	    count: function (a) {
	      return null == a ? 0 : S(a, "", emptyFunction_1.thatReturnsNull, null);
	    },
	    toArray: function (a) {
	      var b = [];
	      W(a, b, null, emptyFunction_1.thatReturnsArgument);
	      return b;
	    },
	    only: function (a) {
	      N(a) ? void 0 : D("143");
	      return a;
	    }
	  },
	  createRef: function () {
	    return {
	      current: null
	    };
	  },
	  Component: F,
	  PureComponent: H,
	  createContext: function (a, b) {
	    void 0 === b && (b = null);
	    a = {
	      $$typeof: z,
	      _calculateChangedBits: b,
	      _defaultValue: a,
	      _currentValue: a,
	      _currentValue2: a,
	      _changedBits: 0,
	      _changedBits2: 0,
	      Provider: null,
	      Consumer: null
	    };
	    a.Provider = {
	      $$typeof: y,
	      _context: a
	    };
	    return a.Consumer = a;
	  },
	  forwardRef: function (a) {
	    return {
	      $$typeof: B,
	      render: a
	    };
	  },
	  Fragment: v,
	  StrictMode: w,
	  unstable_AsyncMode: A,
	  unstable_Profiler: x,
	  createElement: M,
	  cloneElement: function (a, b, e) {
	    null === a || void 0 === a ? D("267", a) : void 0;
	    var c = void 0,
	        d = objectAssign({}, a.props),
	        g = a.key,
	        h = a.ref,
	        f = a._owner;

	    if (null != b) {
	      void 0 !== b.ref && (h = b.ref, f = J.current);
	      void 0 !== b.key && (g = "" + b.key);
	      var l = void 0;
	      a.type && a.type.defaultProps && (l = a.type.defaultProps);

	      for (c in b) K.call(b, c) && !L.hasOwnProperty(c) && (d[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
	    }

	    c = arguments.length - 2;
	    if (1 === c) d.children = e;else if (1 < c) {
	      l = Array(c);

	      for (var m = 0; m < c; m++) l[m] = arguments[m + 2];

	      d.children = l;
	    }
	    return {
	      $$typeof: t,
	      type: a.type,
	      key: g,
	      ref: h,
	      props: d,
	      _owner: f
	    };
	  },
	  createFactory: function (a) {
	    var b = M.bind(null, a);
	    b.type = a;
	    return b;
	  },
	  isValidElement: N,
	  version: "16.4.2",
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    ReactCurrentOwner: J,
	    assign: objectAssign
	  }
	},
	    Y = {
	  default: X
	},
	    Z = Y && X || Y;
	var react_production_min = Z.default ? Z.default : Z;

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_production_min;
	}
	});
	var react_1 = react.Component;
	var react_2 = react.PureComponent;
	var react_3 = react.Fragment;
	var react_4 = react.Children;
	var react_5 = react.createElement;
	var react_6 = react.createContext;
	var react_7 = react.forwardRef;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */

	var ExecutionEnvironment = {
	  canUseDOM: canUseDOM,
	  canUseWorkers: typeof Worker !== 'undefined',
	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
	  canUseViewport: canUseDOM && !!window.screen,
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};
	var ExecutionEnvironment_1 = ExecutionEnvironment;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/* eslint-disable fb-www/typeof-undefined */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */

	function getActiveElement(doc)
	/*?DOMElement*/
	{
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);

	  if (typeof doc === 'undefined') {
	    return null;
	  }

	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}

	var getActiveElement_1 = getActiveElement;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 * 
	 */

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */

	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */


	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  } // Test for A's keys different from B.


	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	var shallowEqual_1 = shallowEqual;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */

	function isNode(object) {
	  var doc = object ? object.ownerDocument || object : document;
	  var defaultView = doc.defaultView || window;
	  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}

	var isNode_1 = isNode;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */


	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */


	function isTextNode(object) {
	  return isNode_1(object) && object.nodeType == 3;
	}

	var isTextNode_1 = isTextNode;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */


	/*eslint-disable no-bitwise */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 */


	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode_1(outerNode)) {
	    return false;
	  } else if (isTextNode_1(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if ('contains' in outerNode) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	var containsNode_1 = containsNode;

	function A$1(a) {
	  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) c += "&args[]=" + encodeURIComponent(arguments[d + 1]);

	  invariant_1(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
	}

	react ? void 0 : A$1("227");

	function ia(a, b, c, d, e, f, g, h, k) {
	  this._hasCaughtError = !1;
	  this._caughtError = null;
	  var n = Array.prototype.slice.call(arguments, 3);

	  try {
	    b.apply(c, n);
	  } catch (r) {
	    this._caughtError = r, this._hasCaughtError = !0;
	  }
	}

	var B$1 = {
	  _caughtError: null,
	  _hasCaughtError: !1,
	  _rethrowError: null,
	  _hasRethrowError: !1,
	  invokeGuardedCallback: function (a, b, c, d, e, f, g, h, k) {
	    ia.apply(B$1, arguments);
	  },
	  invokeGuardedCallbackAndCatchFirstError: function (a, b, c, d, e, f, g, h, k) {
	    B$1.invokeGuardedCallback.apply(this, arguments);

	    if (B$1.hasCaughtError()) {
	      var n = B$1.clearCaughtError();
	      B$1._hasRethrowError || (B$1._hasRethrowError = !0, B$1._rethrowError = n);
	    }
	  },
	  rethrowCaughtError: function () {
	    return ka.apply(B$1, arguments);
	  },
	  hasCaughtError: function () {
	    return B$1._hasCaughtError;
	  },
	  clearCaughtError: function () {
	    if (B$1._hasCaughtError) {
	      var a = B$1._caughtError;
	      B$1._caughtError = null;
	      B$1._hasCaughtError = !1;
	      return a;
	    }

	    A$1("198");
	  }
	};

	function ka() {
	  if (B$1._hasRethrowError) {
	    var a = B$1._rethrowError;
	    B$1._rethrowError = null;
	    B$1._hasRethrowError = !1;
	    throw a;
	  }
	}

	var la = null,
	    ma = {};

	function na() {
	  if (la) for (var a in ma) {
	    var b = ma[a],
	        c = la.indexOf(a);
	    -1 < c ? void 0 : A$1("96", a);

	    if (!oa[c]) {
	      b.extractEvents ? void 0 : A$1("97", a);
	      oa[c] = b;
	      c = b.eventTypes;

	      for (var d in c) {
	        var e = void 0;
	        var f = c[d],
	            g = b,
	            h = d;
	        pa.hasOwnProperty(h) ? A$1("99", h) : void 0;
	        pa[h] = f;
	        var k = f.phasedRegistrationNames;

	        if (k) {
	          for (e in k) k.hasOwnProperty(e) && qa(k[e], g, h);

	          e = !0;
	        } else f.registrationName ? (qa(f.registrationName, g, h), e = !0) : e = !1;

	        e ? void 0 : A$1("98", d, a);
	      }
	    }
	  }
	}

	function qa(a, b, c) {
	  ra[a] ? A$1("100", a) : void 0;
	  ra[a] = b;
	  sa[a] = b.eventTypes[c].dependencies;
	}

	var oa = [],
	    pa = {},
	    ra = {},
	    sa = {};

	function ta(a) {
	  la ? A$1("101") : void 0;
	  la = Array.prototype.slice.call(a);
	  na();
	}

	function ua(a) {
	  var b = !1,
	      c;

	  for (c in a) if (a.hasOwnProperty(c)) {
	    var d = a[c];
	    ma.hasOwnProperty(c) && ma[c] === d || (ma[c] ? A$1("102", c) : void 0, ma[c] = d, b = !0);
	  }

	  b && na();
	}

	var va = {
	  plugins: oa,
	  eventNameDispatchConfigs: pa,
	  registrationNameModules: ra,
	  registrationNameDependencies: sa,
	  possibleRegistrationNames: null,
	  injectEventPluginOrder: ta,
	  injectEventPluginsByName: ua
	},
	    wa = null,
	    xa = null,
	    ya = null;

	function za(a, b, c, d) {
	  b = a.type || "unknown-event";
	  a.currentTarget = ya(d);
	  B$1.invokeGuardedCallbackAndCatchFirstError(b, c, void 0, a);
	  a.currentTarget = null;
	}

	function Aa(a, b) {
	  null == b ? A$1("30") : void 0;
	  if (null == a) return b;

	  if (Array.isArray(a)) {
	    if (Array.isArray(b)) return a.push.apply(a, b), a;
	    a.push(b);
	    return a;
	  }

	  return Array.isArray(b) ? [a].concat(b) : [a, b];
	}

	function Ba(a, b, c) {
	  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
	}

	var Ca = null;

	function Da(a, b) {
	  if (a) {
	    var c = a._dispatchListeners,
	        d = a._dispatchInstances;
	    if (Array.isArray(c)) for (var e = 0; e < c.length && !a.isPropagationStopped(); e++) za(a, b, c[e], d[e]);else c && za(a, b, c, d);
	    a._dispatchListeners = null;
	    a._dispatchInstances = null;
	    a.isPersistent() || a.constructor.release(a);
	  }
	}

	function Ea(a) {
	  return Da(a, !0);
	}

	function Fa(a) {
	  return Da(a, !1);
	}

	var Ga = {
	  injectEventPluginOrder: ta,
	  injectEventPluginsByName: ua
	};

	function Ha(a, b) {
	  var c = a.stateNode;
	  if (!c) return null;
	  var d = wa(c);
	  if (!d) return null;
	  c = d[b];

	  a: switch (b) {
	    case "onClick":
	    case "onClickCapture":
	    case "onDoubleClick":
	    case "onDoubleClickCapture":
	    case "onMouseDown":
	    case "onMouseDownCapture":
	    case "onMouseMove":
	    case "onMouseMoveCapture":
	    case "onMouseUp":
	    case "onMouseUpCapture":
	      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
	      a = !d;
	      break a;

	    default:
	      a = !1;
	  }

	  if (a) return null;
	  c && "function" !== typeof c ? A$1("231", b, typeof c) : void 0;
	  return c;
	}

	function Ia(a, b) {
	  null !== a && (Ca = Aa(Ca, a));
	  a = Ca;
	  Ca = null;
	  a && (b ? Ba(a, Ea) : Ba(a, Fa), Ca ? A$1("95") : void 0, B$1.rethrowCaughtError());
	}

	function Ja(a, b, c, d) {
	  for (var e = null, f = 0; f < oa.length; f++) {
	    var g = oa[f];
	    g && (g = g.extractEvents(a, b, c, d)) && (e = Aa(e, g));
	  }

	  Ia(e, !1);
	}

	var Ka = {
	  injection: Ga,
	  getListener: Ha,
	  runEventsInBatch: Ia,
	  runExtractedEventsInBatch: Ja
	},
	    La = Math.random().toString(36).slice(2),
	    C$1 = "__reactInternalInstance$" + La,
	    Ma = "__reactEventHandlers$" + La;

	function Na(a) {
	  if (a[C$1]) return a[C$1];

	  for (; !a[C$1];) if (a.parentNode) a = a.parentNode;else return null;

	  a = a[C$1];
	  return 5 === a.tag || 6 === a.tag ? a : null;
	}

	function Oa(a) {
	  if (5 === a.tag || 6 === a.tag) return a.stateNode;
	  A$1("33");
	}

	function Pa(a) {
	  return a[Ma] || null;
	}

	var Qa = {
	  precacheFiberNode: function (a, b) {
	    b[C$1] = a;
	  },
	  getClosestInstanceFromNode: Na,
	  getInstanceFromNode: function (a) {
	    a = a[C$1];
	    return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
	  },
	  getNodeFromInstance: Oa,
	  getFiberCurrentPropsFromNode: Pa,
	  updateFiberProps: function (a, b) {
	    a[Ma] = b;
	  }
	};

	function F$1(a) {
	  do a = a.return; while (a && 5 !== a.tag);

	  return a ? a : null;
	}

	function Ra(a, b, c) {
	  for (var d = []; a;) d.push(a), a = F$1(a);

	  for (a = d.length; 0 < a--;) b(d[a], "captured", c);

	  for (a = 0; a < d.length; a++) b(d[a], "bubbled", c);
	}

	function Sa(a, b, c) {
	  if (b = Ha(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = Aa(c._dispatchListeners, b), c._dispatchInstances = Aa(c._dispatchInstances, a);
	}

	function Ta(a) {
	  a && a.dispatchConfig.phasedRegistrationNames && Ra(a._targetInst, Sa, a);
	}

	function Ua(a) {
	  if (a && a.dispatchConfig.phasedRegistrationNames) {
	    var b = a._targetInst;
	    b = b ? F$1(b) : null;
	    Ra(b, Sa, a);
	  }
	}

	function Va(a, b, c) {
	  a && c && c.dispatchConfig.registrationName && (b = Ha(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = Aa(c._dispatchListeners, b), c._dispatchInstances = Aa(c._dispatchInstances, a));
	}

	function Xa(a) {
	  a && a.dispatchConfig.registrationName && Va(a._targetInst, null, a);
	}

	function Ya(a) {
	  Ba(a, Ta);
	}

	function Za(a, b, c, d) {
	  if (c && d) a: {
	    var e = c;

	    for (var f = d, g = 0, h = e; h; h = F$1(h)) g++;

	    h = 0;

	    for (var k = f; k; k = F$1(k)) h++;

	    for (; 0 < g - h;) e = F$1(e), g--;

	    for (; 0 < h - g;) f = F$1(f), h--;

	    for (; g--;) {
	      if (e === f || e === f.alternate) break a;
	      e = F$1(e);
	      f = F$1(f);
	    }

	    e = null;
	  } else e = null;
	  f = e;

	  for (e = []; c && c !== f;) {
	    g = c.alternate;
	    if (null !== g && g === f) break;
	    e.push(c);
	    c = F$1(c);
	  }

	  for (c = []; d && d !== f;) {
	    g = d.alternate;
	    if (null !== g && g === f) break;
	    c.push(d);
	    d = F$1(d);
	  }

	  for (d = 0; d < e.length; d++) Va(e[d], "bubbled", a);

	  for (a = c.length; 0 < a--;) Va(c[a], "captured", b);
	}

	var $a = {
	  accumulateTwoPhaseDispatches: Ya,
	  accumulateTwoPhaseDispatchesSkipTarget: function (a) {
	    Ba(a, Ua);
	  },
	  accumulateEnterLeaveDispatches: Za,
	  accumulateDirectDispatches: function (a) {
	    Ba(a, Xa);
	  }
	};

	function ab(a, b) {
	  var c = {};
	  c[a.toLowerCase()] = b.toLowerCase();
	  c["Webkit" + a] = "webkit" + b;
	  c["Moz" + a] = "moz" + b;
	  c["ms" + a] = "MS" + b;
	  c["O" + a] = "o" + b.toLowerCase();
	  return c;
	}

	var bb = {
	  animationend: ab("Animation", "AnimationEnd"),
	  animationiteration: ab("Animation", "AnimationIteration"),
	  animationstart: ab("Animation", "AnimationStart"),
	  transitionend: ab("Transition", "TransitionEnd")
	},
	    cb = {},
	    db = {};
	ExecutionEnvironment_1.canUseDOM && (db = document.createElement("div").style, "AnimationEvent" in window || (delete bb.animationend.animation, delete bb.animationiteration.animation, delete bb.animationstart.animation), "TransitionEvent" in window || delete bb.transitionend.transition);

	function eb(a) {
	  if (cb[a]) return cb[a];
	  if (!bb[a]) return a;
	  var b = bb[a],
	      c;

	  for (c in b) if (b.hasOwnProperty(c) && c in db) return cb[a] = b[c];

	  return a;
	}

	var fb = eb("animationend"),
	    gb = eb("animationiteration"),
	    hb = eb("animationstart"),
	    ib = eb("transitionend"),
	    jb = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
	    kb = null;

	function lb() {
	  !kb && ExecutionEnvironment_1.canUseDOM && (kb = "textContent" in document.documentElement ? "textContent" : "innerText");
	  return kb;
	}

	var G$1 = {
	  _root: null,
	  _startText: null,
	  _fallbackText: null
	};

	function mb() {
	  if (G$1._fallbackText) return G$1._fallbackText;
	  var a,
	      b = G$1._startText,
	      c = b.length,
	      d,
	      e = nb(),
	      f = e.length;

	  for (a = 0; a < c && b[a] === e[a]; a++);

	  var g = c - a;

	  for (d = 1; d <= g && b[c - d] === e[f - d]; d++);

	  G$1._fallbackText = e.slice(a, 1 < d ? 1 - d : void 0);
	  return G$1._fallbackText;
	}

	function nb() {
	  return "value" in G$1._root ? G$1._root.value : G$1._root[lb()];
	}

	var ob = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
	    pb = {
	  type: null,
	  target: null,
	  currentTarget: emptyFunction_1.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function (a) {
	    return a.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};

	function H$1(a, b, c, d) {
	  this.dispatchConfig = a;
	  this._targetInst = b;
	  this.nativeEvent = c;
	  a = this.constructor.Interface;

	  for (var e in a) a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);

	  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? emptyFunction_1.thatReturnsTrue : emptyFunction_1.thatReturnsFalse;
	  this.isPropagationStopped = emptyFunction_1.thatReturnsFalse;
	  return this;
	}

	objectAssign(H$1.prototype, {
	  preventDefault: function () {
	    this.defaultPrevented = !0;
	    var a = this.nativeEvent;
	    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue);
	  },
	  stopPropagation: function () {
	    var a = this.nativeEvent;
	    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = emptyFunction_1.thatReturnsTrue);
	  },
	  persist: function () {
	    this.isPersistent = emptyFunction_1.thatReturnsTrue;
	  },
	  isPersistent: emptyFunction_1.thatReturnsFalse,
	  destructor: function () {
	    var a = this.constructor.Interface,
	        b;

	    for (b in a) this[b] = null;

	    for (a = 0; a < ob.length; a++) this[ob[a]] = null;
	  }
	});
	H$1.Interface = pb;

	H$1.extend = function (a) {
	  function b() {}

	  function c() {
	    return d.apply(this, arguments);
	  }

	  var d = this;
	  b.prototype = d.prototype;
	  var e = new b();
	  objectAssign(e, c.prototype);
	  c.prototype = e;
	  c.prototype.constructor = c;
	  c.Interface = objectAssign({}, d.Interface, a);
	  c.extend = d.extend;
	  qb(c);
	  return c;
	};

	qb(H$1);

	function rb(a, b, c, d) {
	  if (this.eventPool.length) {
	    var e = this.eventPool.pop();
	    this.call(e, a, b, c, d);
	    return e;
	  }

	  return new this(a, b, c, d);
	}

	function sb(a) {
	  a instanceof this ? void 0 : A$1("223");
	  a.destructor();
	  10 > this.eventPool.length && this.eventPool.push(a);
	}

	function qb(a) {
	  a.eventPool = [];
	  a.getPooled = rb;
	  a.release = sb;
	}

	var tb = H$1.extend({
	  data: null
	}),
	    ub = H$1.extend({
	  data: null
	}),
	    vb = [9, 13, 27, 32],
	    wb = ExecutionEnvironment_1.canUseDOM && "CompositionEvent" in window,
	    xb = null;
	ExecutionEnvironment_1.canUseDOM && "documentMode" in document && (xb = document.documentMode);
	var yb = ExecutionEnvironment_1.canUseDOM && "TextEvent" in window && !xb,
	    zb = ExecutionEnvironment_1.canUseDOM && (!wb || xb && 8 < xb && 11 >= xb),
	    Ab = String.fromCharCode(32),
	    Bb = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: "onBeforeInput",
	      captured: "onBeforeInputCapture"
	    },
	    dependencies: ["compositionend", "keypress", "textInput", "paste"]
	  },
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionEnd",
	      captured: "onCompositionEndCapture"
	    },
	    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionStart",
	      captured: "onCompositionStartCapture"
	    },
	    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionUpdate",
	      captured: "onCompositionUpdateCapture"
	    },
	    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
	  }
	},
	    Cb = !1;

	function Db(a, b) {
	  switch (a) {
	    case "keyup":
	      return -1 !== vb.indexOf(b.keyCode);

	    case "keydown":
	      return 229 !== b.keyCode;

	    case "keypress":
	    case "mousedown":
	    case "blur":
	      return !0;

	    default:
	      return !1;
	  }
	}

	function Eb(a) {
	  a = a.detail;
	  return "object" === typeof a && "data" in a ? a.data : null;
	}

	var Fb = !1;

	function Gb(a, b) {
	  switch (a) {
	    case "compositionend":
	      return Eb(b);

	    case "keypress":
	      if (32 !== b.which) return null;
	      Cb = !0;
	      return Ab;

	    case "textInput":
	      return a = b.data, a === Ab && Cb ? null : a;

	    default:
	      return null;
	  }
	}

	function Hb(a, b) {
	  if (Fb) return "compositionend" === a || !wb && Db(a, b) ? (a = mb(), G$1._root = null, G$1._startText = null, G$1._fallbackText = null, Fb = !1, a) : null;

	  switch (a) {
	    case "paste":
	      return null;

	    case "keypress":
	      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
	        if (b.char && 1 < b.char.length) return b.char;
	        if (b.which) return String.fromCharCode(b.which);
	      }

	      return null;

	    case "compositionend":
	      return zb ? null : b.data;

	    default:
	      return null;
	  }
	}

	var Ib = {
	  eventTypes: Bb,
	  extractEvents: function (a, b, c, d) {
	    var e = void 0;
	    var f = void 0;
	    if (wb) b: {
	      switch (a) {
	        case "compositionstart":
	          e = Bb.compositionStart;
	          break b;

	        case "compositionend":
	          e = Bb.compositionEnd;
	          break b;

	        case "compositionupdate":
	          e = Bb.compositionUpdate;
	          break b;
	      }

	      e = void 0;
	    } else Fb ? Db(a, c) && (e = Bb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = Bb.compositionStart);
	    e ? (zb && (Fb || e !== Bb.compositionStart ? e === Bb.compositionEnd && Fb && (f = mb()) : (G$1._root = d, G$1._startText = nb(), Fb = !0)), e = tb.getPooled(e, b, c, d), f ? e.data = f : (f = Eb(c), null !== f && (e.data = f)), Ya(e), f = e) : f = null;
	    (a = yb ? Gb(a, c) : Hb(a, c)) ? (b = ub.getPooled(Bb.beforeInput, b, c, d), b.data = a, Ya(b)) : b = null;
	    return null === f ? b : null === b ? f : [f, b];
	  }
	},
	    Jb = null,
	    Kb = {
	  injectFiberControlledHostComponent: function (a) {
	    Jb = a;
	  }
	},
	    Lb = null,
	    Mb = null;

	function Nb(a) {
	  if (a = xa(a)) {
	    Jb && "function" === typeof Jb.restoreControlledState ? void 0 : A$1("194");
	    var b = wa(a.stateNode);
	    Jb.restoreControlledState(a.stateNode, a.type, b);
	  }
	}

	function Ob(a) {
	  Lb ? Mb ? Mb.push(a) : Mb = [a] : Lb = a;
	}

	function Pb() {
	  return null !== Lb || null !== Mb;
	}

	function Qb() {
	  if (Lb) {
	    var a = Lb,
	        b = Mb;
	    Mb = Lb = null;
	    Nb(a);
	    if (b) for (a = 0; a < b.length; a++) Nb(b[a]);
	  }
	}

	var Rb = {
	  injection: Kb,
	  enqueueStateRestore: Ob,
	  needsStateRestore: Pb,
	  restoreStateIfNeeded: Qb
	};

	function Sb(a, b) {
	  return a(b);
	}

	function Tb(a, b, c) {
	  return a(b, c);
	}

	function Ub() {}

	var Vb = !1;

	function Wb(a, b) {
	  if (Vb) return a(b);
	  Vb = !0;

	  try {
	    return Sb(a, b);
	  } finally {
	    Vb = !1, Pb() && (Ub(), Qb());
	  }
	}

	var Xb = {
	  color: !0,
	  date: !0,
	  datetime: !0,
	  "datetime-local": !0,
	  email: !0,
	  month: !0,
	  number: !0,
	  password: !0,
	  range: !0,
	  search: !0,
	  tel: !0,
	  text: !0,
	  time: !0,
	  url: !0,
	  week: !0
	};

	function Yb(a) {
	  var b = a && a.nodeName && a.nodeName.toLowerCase();
	  return "input" === b ? !!Xb[a.type] : "textarea" === b ? !0 : !1;
	}

	function Zb(a) {
	  a = a.target || a.srcElement || window;
	  a.correspondingUseElement && (a = a.correspondingUseElement);
	  return 3 === a.nodeType ? a.parentNode : a;
	}

	function $b(a, b) {
	  if (!ExecutionEnvironment_1.canUseDOM || b && !("addEventListener" in document)) return !1;
	  a = "on" + a;
	  b = a in document;
	  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
	  return b;
	}

	function ac(a) {
	  var b = a.type;
	  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
	}

	function bc(a) {
	  var b = ac(a) ? "checked" : "value",
	      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
	      d = "" + a[b];

	  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
	    var e = c.get,
	        f = c.set;
	    Object.defineProperty(a, b, {
	      configurable: !0,
	      get: function () {
	        return e.call(this);
	      },
	      set: function (a) {
	        d = "" + a;
	        f.call(this, a);
	      }
	    });
	    Object.defineProperty(a, b, {
	      enumerable: c.enumerable
	    });
	    return {
	      getValue: function () {
	        return d;
	      },
	      setValue: function (a) {
	        d = "" + a;
	      },
	      stopTracking: function () {
	        a._valueTracker = null;
	        delete a[b];
	      }
	    };
	  }
	}

	function cc(a) {
	  a._valueTracker || (a._valueTracker = bc(a));
	}

	function dc(a) {
	  if (!a) return !1;
	  var b = a._valueTracker;
	  if (!b) return !0;
	  var c = b.getValue();
	  var d = "";
	  a && (d = ac(a) ? a.checked ? "true" : "false" : a.value);
	  a = d;
	  return a !== c ? (b.setValue(a), !0) : !1;
	}

	var ec = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
	    fc = "function" === typeof Symbol && Symbol.for,
	    gc = fc ? Symbol.for("react.element") : 60103,
	    hc = fc ? Symbol.for("react.portal") : 60106,
	    ic = fc ? Symbol.for("react.fragment") : 60107,
	    jc = fc ? Symbol.for("react.strict_mode") : 60108,
	    kc = fc ? Symbol.for("react.profiler") : 60114,
	    lc = fc ? Symbol.for("react.provider") : 60109,
	    mc = fc ? Symbol.for("react.context") : 60110,
	    pc = fc ? Symbol.for("react.async_mode") : 60111,
	    qc = fc ? Symbol.for("react.forward_ref") : 60112,
	    rc = fc ? Symbol.for("react.timeout") : 60113,
	    sc = "function" === typeof Symbol && Symbol.iterator;

	function tc(a) {
	  if (null === a || "undefined" === typeof a) return null;
	  a = sc && a[sc] || a["@@iterator"];
	  return "function" === typeof a ? a : null;
	}

	function uc(a) {
	  var b = a.type;
	  if ("function" === typeof b) return b.displayName || b.name;
	  if ("string" === typeof b) return b;

	  switch (b) {
	    case pc:
	      return "AsyncMode";

	    case mc:
	      return "Context.Consumer";

	    case ic:
	      return "ReactFragment";

	    case hc:
	      return "ReactPortal";

	    case kc:
	      return "Profiler(" + a.pendingProps.id + ")";

	    case lc:
	      return "Context.Provider";

	    case jc:
	      return "StrictMode";

	    case rc:
	      return "Timeout";
	  }

	  if ("object" === typeof b && null !== b) switch (b.$$typeof) {
	    case qc:
	      return a = b.render.displayName || b.render.name || "", "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef";
	  }
	  return null;
	}

	function vc(a) {
	  var b = "";

	  do {
	    a: switch (a.tag) {
	      case 0:
	      case 1:
	      case 2:
	      case 5:
	        var c = a._debugOwner,
	            d = a._debugSource;
	        var e = uc(a);
	        var f = null;
	        c && (f = uc(c));
	        c = d;
	        e = "\n    in " + (e || "Unknown") + (c ? " (at " + c.fileName.replace(/^.*[\\\/]/, "") + ":" + c.lineNumber + ")" : f ? " (created by " + f + ")" : "");
	        break a;

	      default:
	        e = "";
	    }

	    b += e;
	    a = a.return;
	  } while (a);

	  return b;
	}

	var wc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
	    xc = Object.prototype.hasOwnProperty,
	    zc = {},
	    Ac = {};

	function Bc(a) {
	  if (xc.call(Ac, a)) return !0;
	  if (xc.call(zc, a)) return !1;
	  if (wc.test(a)) return Ac[a] = !0;
	  zc[a] = !0;
	  return !1;
	}

	function Cc(a, b, c, d) {
	  if (null !== c && 0 === c.type) return !1;

	  switch (typeof b) {
	    case "function":
	    case "symbol":
	      return !0;

	    case "boolean":
	      if (d) return !1;
	      if (null !== c) return !c.acceptsBooleans;
	      a = a.toLowerCase().slice(0, 5);
	      return "data-" !== a && "aria-" !== a;

	    default:
	      return !1;
	  }
	}

	function Dc(a, b, c, d) {
	  if (null === b || "undefined" === typeof b || Cc(a, b, c, d)) return !0;
	  if (d) return !1;
	  if (null !== c) switch (c.type) {
	    case 3:
	      return !b;

	    case 4:
	      return !1 === b;

	    case 5:
	      return isNaN(b);

	    case 6:
	      return isNaN(b) || 1 > b;
	  }
	  return !1;
	}

	function I$1(a, b, c, d, e) {
	  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
	  this.attributeName = d;
	  this.attributeNamespace = e;
	  this.mustUseProperty = c;
	  this.propertyName = a;
	  this.type = b;
	}

	var J$1 = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
	  J$1[a] = new I$1(a, 0, !1, a, null);
	});
	[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
	  var b = a[0];
	  J$1[b] = new I$1(b, 1, !1, a[1], null);
	});
	["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
	  J$1[a] = new I$1(a, 2, !1, a.toLowerCase(), null);
	});
	["autoReverse", "externalResourcesRequired", "preserveAlpha"].forEach(function (a) {
	  J$1[a] = new I$1(a, 2, !1, a, null);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
	  J$1[a] = new I$1(a, 3, !1, a.toLowerCase(), null);
	});
	["checked", "multiple", "muted", "selected"].forEach(function (a) {
	  J$1[a] = new I$1(a, 3, !0, a.toLowerCase(), null);
	});
	["capture", "download"].forEach(function (a) {
	  J$1[a] = new I$1(a, 4, !1, a.toLowerCase(), null);
	});
	["cols", "rows", "size", "span"].forEach(function (a) {
	  J$1[a] = new I$1(a, 6, !1, a.toLowerCase(), null);
	});
	["rowSpan", "start"].forEach(function (a) {
	  J$1[a] = new I$1(a, 5, !1, a.toLowerCase(), null);
	});
	var Ec = /[\-:]([a-z])/g;

	function Fc(a) {
	  return a[1].toUpperCase();
	}

	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
	  var b = a.replace(Ec, Fc);
	  J$1[b] = new I$1(b, 1, !1, a, null);
	});
	"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
	  var b = a.replace(Ec, Fc);
	  J$1[b] = new I$1(b, 1, !1, a, "http://www.w3.org/1999/xlink");
	});
	["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
	  var b = a.replace(Ec, Fc);
	  J$1[b] = new I$1(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
	});
	J$1.tabIndex = new I$1("tabIndex", 1, !1, "tabindex", null);

	function Gc(a, b, c, d) {
	  var e = J$1.hasOwnProperty(b) ? J$1[b] : null;
	  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
	  f || (Dc(b, c, e, d) && (c = null), d || null === e ? Bc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
	}

	function Hc(a, b) {
	  var c = b.checked;
	  return objectAssign({}, b, {
	    defaultChecked: void 0,
	    defaultValue: void 0,
	    value: void 0,
	    checked: null != c ? c : a._wrapperState.initialChecked
	  });
	}

	function Ic(a, b) {
	  var c = null == b.defaultValue ? "" : b.defaultValue,
	      d = null != b.checked ? b.checked : b.defaultChecked;
	  c = Jc(null != b.value ? b.value : c);
	  a._wrapperState = {
	    initialChecked: d,
	    initialValue: c,
	    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
	  };
	}

	function Kc(a, b) {
	  b = b.checked;
	  null != b && Gc(a, "checked", b, !1);
	}

	function Lc(a, b) {
	  Kc(a, b);
	  var c = Jc(b.value);
	  if (null != c) if ("number" === b.type) {
	    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
	  } else a.value !== "" + c && (a.value = "" + c);
	  b.hasOwnProperty("value") ? Mc(a, b.type, c) : b.hasOwnProperty("defaultValue") && Mc(a, b.type, Jc(b.defaultValue));
	  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
	}

	function Nc(a, b, c) {
	  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
	    b = "" + a._wrapperState.initialValue;
	    var d = a.value;
	    c || b === d || (a.value = b);
	    a.defaultValue = b;
	  }

	  c = a.name;
	  "" !== c && (a.name = "");
	  a.defaultChecked = !a.defaultChecked;
	  a.defaultChecked = !a.defaultChecked;
	  "" !== c && (a.name = c);
	}

	function Mc(a, b, c) {
	  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
	}

	function Jc(a) {
	  switch (typeof a) {
	    case "boolean":
	    case "number":
	    case "object":
	    case "string":
	    case "undefined":
	      return a;

	    default:
	      return "";
	  }
	}

	var Oc = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: "onChange",
	      captured: "onChangeCapture"
	    },
	    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
	  }
	};

	function Pc(a, b, c) {
	  a = H$1.getPooled(Oc.change, a, b, c);
	  a.type = "change";
	  Ob(c);
	  Ya(a);
	  return a;
	}

	var Qc = null,
	    Rc = null;

	function Sc(a) {
	  Ia(a, !1);
	}

	function Tc(a) {
	  var b = Oa(a);
	  if (dc(b)) return a;
	}

	function Uc(a, b) {
	  if ("change" === a) return b;
	}

	var Vc = !1;
	ExecutionEnvironment_1.canUseDOM && (Vc = $b("input") && (!document.documentMode || 9 < document.documentMode));

	function Wc() {
	  Qc && (Qc.detachEvent("onpropertychange", Xc), Rc = Qc = null);
	}

	function Xc(a) {
	  "value" === a.propertyName && Tc(Rc) && (a = Pc(Rc, a, Zb(a)), Wb(Sc, a));
	}

	function Yc(a, b, c) {
	  "focus" === a ? (Wc(), Qc = b, Rc = c, Qc.attachEvent("onpropertychange", Xc)) : "blur" === a && Wc();
	}

	function Zc(a) {
	  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Tc(Rc);
	}

	function $c(a, b) {
	  if ("click" === a) return Tc(b);
	}

	function ad(a, b) {
	  if ("input" === a || "change" === a) return Tc(b);
	}

	var bd = {
	  eventTypes: Oc,
	  _isInputEventSupported: Vc,
	  extractEvents: function (a, b, c, d) {
	    var e = b ? Oa(b) : window,
	        f = void 0,
	        g = void 0,
	        h = e.nodeName && e.nodeName.toLowerCase();
	    "select" === h || "input" === h && "file" === e.type ? f = Uc : Yb(e) ? Vc ? f = ad : (f = Zc, g = Yc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = $c);
	    if (f && (f = f(a, b))) return Pc(f, c, d);
	    g && g(a, e, b);
	    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && Mc(e, "number", e.value);
	  }
	},
	    cd = H$1.extend({
	  view: null,
	  detail: null
	}),
	    dd = {
	  Alt: "altKey",
	  Control: "ctrlKey",
	  Meta: "metaKey",
	  Shift: "shiftKey"
	};

	function ed(a) {
	  var b = this.nativeEvent;
	  return b.getModifierState ? b.getModifierState(a) : (a = dd[a]) ? !!b[a] : !1;
	}

	function fd() {
	  return ed;
	}

	var gd = cd.extend({
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  pageX: null,
	  pageY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: fd,
	  button: null,
	  buttons: null,
	  relatedTarget: function (a) {
	    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
	  }
	}),
	    hd = gd.extend({
	  pointerId: null,
	  width: null,
	  height: null,
	  pressure: null,
	  tiltX: null,
	  tiltY: null,
	  pointerType: null,
	  isPrimary: null
	}),
	    id = {
	  mouseEnter: {
	    registrationName: "onMouseEnter",
	    dependencies: ["mouseout", "mouseover"]
	  },
	  mouseLeave: {
	    registrationName: "onMouseLeave",
	    dependencies: ["mouseout", "mouseover"]
	  },
	  pointerEnter: {
	    registrationName: "onPointerEnter",
	    dependencies: ["pointerout", "pointerover"]
	  },
	  pointerLeave: {
	    registrationName: "onPointerLeave",
	    dependencies: ["pointerout", "pointerover"]
	  }
	},
	    jd = {
	  eventTypes: id,
	  extractEvents: function (a, b, c, d) {
	    var e = "mouseover" === a || "pointerover" === a,
	        f = "mouseout" === a || "pointerout" === a;
	    if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;
	    e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;
	    f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Na(b) : null) : f = null;
	    if (f === b) return null;
	    var g = void 0,
	        h = void 0,
	        k = void 0,
	        n = void 0;
	    if ("mouseout" === a || "mouseover" === a) g = gd, h = id.mouseLeave, k = id.mouseEnter, n = "mouse";else if ("pointerout" === a || "pointerover" === a) g = hd, h = id.pointerLeave, k = id.pointerEnter, n = "pointer";
	    a = null == f ? e : Oa(f);
	    e = null == b ? e : Oa(b);
	    h = g.getPooled(h, f, c, d);
	    h.type = n + "leave";
	    h.target = a;
	    h.relatedTarget = e;
	    c = g.getPooled(k, b, c, d);
	    c.type = n + "enter";
	    c.target = e;
	    c.relatedTarget = a;
	    Za(h, c, f, b);
	    return [h, c];
	  }
	};

	function kd(a) {
	  var b = a;
	  if (a.alternate) for (; b.return;) b = b.return;else {
	    if (0 !== (b.effectTag & 2)) return 1;

	    for (; b.return;) if (b = b.return, 0 !== (b.effectTag & 2)) return 1;
	  }
	  return 3 === b.tag ? 2 : 3;
	}

	function ld(a) {
	  2 !== kd(a) ? A$1("188") : void 0;
	}

	function md(a) {
	  var b = a.alternate;
	  if (!b) return b = kd(a), 3 === b ? A$1("188") : void 0, 1 === b ? null : a;

	  for (var c = a, d = b;;) {
	    var e = c.return,
	        f = e ? e.alternate : null;
	    if (!e || !f) break;

	    if (e.child === f.child) {
	      for (var g = e.child; g;) {
	        if (g === c) return ld(e), a;
	        if (g === d) return ld(e), b;
	        g = g.sibling;
	      }

	      A$1("188");
	    }

	    if (c.return !== d.return) c = e, d = f;else {
	      g = !1;

	      for (var h = e.child; h;) {
	        if (h === c) {
	          g = !0;
	          c = e;
	          d = f;
	          break;
	        }

	        if (h === d) {
	          g = !0;
	          d = e;
	          c = f;
	          break;
	        }

	        h = h.sibling;
	      }

	      if (!g) {
	        for (h = f.child; h;) {
	          if (h === c) {
	            g = !0;
	            c = f;
	            d = e;
	            break;
	          }

	          if (h === d) {
	            g = !0;
	            d = f;
	            c = e;
	            break;
	          }

	          h = h.sibling;
	        }

	        g ? void 0 : A$1("189");
	      }
	    }
	    c.alternate !== d ? A$1("190") : void 0;
	  }

	  3 !== c.tag ? A$1("188") : void 0;
	  return c.stateNode.current === c ? a : b;
	}

	function nd(a) {
	  a = md(a);
	  if (!a) return null;

	  for (var b = a;;) {
	    if (5 === b.tag || 6 === b.tag) return b;
	    if (b.child) b.child.return = b, b = b.child;else {
	      if (b === a) break;

	      for (; !b.sibling;) {
	        if (!b.return || b.return === a) return null;
	        b = b.return;
	      }

	      b.sibling.return = b.return;
	      b = b.sibling;
	    }
	  }

	  return null;
	}

	function od(a) {
	  a = md(a);
	  if (!a) return null;

	  for (var b = a;;) {
	    if (5 === b.tag || 6 === b.tag) return b;
	    if (b.child && 4 !== b.tag) b.child.return = b, b = b.child;else {
	      if (b === a) break;

	      for (; !b.sibling;) {
	        if (!b.return || b.return === a) return null;
	        b = b.return;
	      }

	      b.sibling.return = b.return;
	      b = b.sibling;
	    }
	  }

	  return null;
	}

	var pd = H$1.extend({
	  animationName: null,
	  elapsedTime: null,
	  pseudoElement: null
	}),
	    qd = H$1.extend({
	  clipboardData: function (a) {
	    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
	  }
	}),
	    rd = cd.extend({
	  relatedTarget: null
	});

	function sd(a) {
	  var b = a.keyCode;
	  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
	  10 === a && (a = 13);
	  return 32 <= a || 13 === a ? a : 0;
	}

	var td = {
	  Esc: "Escape",
	  Spacebar: " ",
	  Left: "ArrowLeft",
	  Up: "ArrowUp",
	  Right: "ArrowRight",
	  Down: "ArrowDown",
	  Del: "Delete",
	  Win: "OS",
	  Menu: "ContextMenu",
	  Apps: "ContextMenu",
	  Scroll: "ScrollLock",
	  MozPrintableKey: "Unidentified"
	},
	    ud = {
	  8: "Backspace",
	  9: "Tab",
	  12: "Clear",
	  13: "Enter",
	  16: "Shift",
	  17: "Control",
	  18: "Alt",
	  19: "Pause",
	  20: "CapsLock",
	  27: "Escape",
	  32: " ",
	  33: "PageUp",
	  34: "PageDown",
	  35: "End",
	  36: "Home",
	  37: "ArrowLeft",
	  38: "ArrowUp",
	  39: "ArrowRight",
	  40: "ArrowDown",
	  45: "Insert",
	  46: "Delete",
	  112: "F1",
	  113: "F2",
	  114: "F3",
	  115: "F4",
	  116: "F5",
	  117: "F6",
	  118: "F7",
	  119: "F8",
	  120: "F9",
	  121: "F10",
	  122: "F11",
	  123: "F12",
	  144: "NumLock",
	  145: "ScrollLock",
	  224: "Meta"
	},
	    vd = cd.extend({
	  key: function (a) {
	    if (a.key) {
	      var b = td[a.key] || a.key;
	      if ("Unidentified" !== b) return b;
	    }

	    return "keypress" === a.type ? (a = sd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? ud[a.keyCode] || "Unidentified" : "";
	  },
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: fd,
	  charCode: function (a) {
	    return "keypress" === a.type ? sd(a) : 0;
	  },
	  keyCode: function (a) {
	    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
	  },
	  which: function (a) {
	    return "keypress" === a.type ? sd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
	  }
	}),
	    wd = gd.extend({
	  dataTransfer: null
	}),
	    xd = cd.extend({
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: fd
	}),
	    yd = H$1.extend({
	  propertyName: null,
	  elapsedTime: null,
	  pseudoElement: null
	}),
	    zd = gd.extend({
	  deltaX: function (a) {
	    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
	  },
	  deltaY: function (a) {
	    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
	  },
	  deltaZ: null,
	  deltaMode: null
	}),
	    Ad = [["abort", "abort"], [fb, "animationEnd"], [gb, "animationIteration"], [hb, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [ib, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
	    Bd = {},
	    Cd = {};

	function Dd(a, b) {
	  var c = a[0];
	  a = a[1];
	  var d = "on" + (a[0].toUpperCase() + a.slice(1));
	  b = {
	    phasedRegistrationNames: {
	      bubbled: d,
	      captured: d + "Capture"
	    },
	    dependencies: [c],
	    isInteractive: b
	  };
	  Bd[a] = b;
	  Cd[c] = b;
	}

	[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
	  Dd(a, !0);
	});
	Ad.forEach(function (a) {
	  Dd(a, !1);
	});
	var Ed = {
	  eventTypes: Bd,
	  isInteractiveTopLevelEventType: function (a) {
	    a = Cd[a];
	    return void 0 !== a && !0 === a.isInteractive;
	  },
	  extractEvents: function (a, b, c, d) {
	    var e = Cd[a];
	    if (!e) return null;

	    switch (a) {
	      case "keypress":
	        if (0 === sd(c)) return null;

	      case "keydown":
	      case "keyup":
	        a = vd;
	        break;

	      case "blur":
	      case "focus":
	        a = rd;
	        break;

	      case "click":
	        if (2 === c.button) return null;

	      case "dblclick":
	      case "mousedown":
	      case "mousemove":
	      case "mouseup":
	      case "mouseout":
	      case "mouseover":
	      case "contextmenu":
	        a = gd;
	        break;

	      case "drag":
	      case "dragend":
	      case "dragenter":
	      case "dragexit":
	      case "dragleave":
	      case "dragover":
	      case "dragstart":
	      case "drop":
	        a = wd;
	        break;

	      case "touchcancel":
	      case "touchend":
	      case "touchmove":
	      case "touchstart":
	        a = xd;
	        break;

	      case fb:
	      case gb:
	      case hb:
	        a = pd;
	        break;

	      case ib:
	        a = yd;
	        break;

	      case "scroll":
	        a = cd;
	        break;

	      case "wheel":
	        a = zd;
	        break;

	      case "copy":
	      case "cut":
	      case "paste":
	        a = qd;
	        break;

	      case "gotpointercapture":
	      case "lostpointercapture":
	      case "pointercancel":
	      case "pointerdown":
	      case "pointermove":
	      case "pointerout":
	      case "pointerover":
	      case "pointerup":
	        a = hd;
	        break;

	      default:
	        a = H$1;
	    }

	    b = a.getPooled(e, b, c, d);
	    Ya(b);
	    return b;
	  }
	},
	    Fd = Ed.isInteractiveTopLevelEventType,
	    Gd = [];

	function Hd(a) {
	  var b = a.targetInst;

	  do {
	    if (!b) {
	      a.ancestors.push(b);
	      break;
	    }

	    var c;

	    for (c = b; c.return;) c = c.return;

	    c = 3 !== c.tag ? null : c.stateNode.containerInfo;
	    if (!c) break;
	    a.ancestors.push(b);
	    b = Na(c);
	  } while (b);

	  for (c = 0; c < a.ancestors.length; c++) b = a.ancestors[c], Ja(a.topLevelType, b, a.nativeEvent, Zb(a.nativeEvent));
	}

	var Id = !0;

	function Kd(a) {
	  Id = !!a;
	}

	function K$1(a, b) {
	  if (!b) return null;
	  var c = (Fd(a) ? Ld : Md).bind(null, a);
	  b.addEventListener(a, c, !1);
	}

	function Nd(a, b) {
	  if (!b) return null;
	  var c = (Fd(a) ? Ld : Md).bind(null, a);
	  b.addEventListener(a, c, !0);
	}

	function Ld(a, b) {
	  Tb(Md, a, b);
	}

	function Md(a, b) {
	  if (Id) {
	    var c = Zb(b);
	    c = Na(c);
	    null === c || "number" !== typeof c.tag || 2 === kd(c) || (c = null);

	    if (Gd.length) {
	      var d = Gd.pop();
	      d.topLevelType = a;
	      d.nativeEvent = b;
	      d.targetInst = c;
	      a = d;
	    } else a = {
	      topLevelType: a,
	      nativeEvent: b,
	      targetInst: c,
	      ancestors: []
	    };

	    try {
	      Wb(Hd, a);
	    } finally {
	      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > Gd.length && Gd.push(a);
	    }
	  }
	}

	var Od = {
	  get _enabled() {
	    return Id;
	  },

	  setEnabled: Kd,
	  isEnabled: function () {
	    return Id;
	  },
	  trapBubbledEvent: K$1,
	  trapCapturedEvent: Nd,
	  dispatchEvent: Md
	},
	    Pd = {},
	    Qd = 0,
	    Rd = "_reactListenersID" + ("" + Math.random()).slice(2);

	function Sd(a) {
	  Object.prototype.hasOwnProperty.call(a, Rd) || (a[Rd] = Qd++, Pd[a[Rd]] = {});
	  return Pd[a[Rd]];
	}

	function Td(a) {
	  for (; a && a.firstChild;) a = a.firstChild;

	  return a;
	}

	function Ud(a, b) {
	  var c = Td(a);
	  a = 0;

	  for (var d; c;) {
	    if (3 === c.nodeType) {
	      d = a + c.textContent.length;
	      if (a <= b && d >= b) return {
	        node: c,
	        offset: b - a
	      };
	      a = d;
	    }

	    a: {
	      for (; c;) {
	        if (c.nextSibling) {
	          c = c.nextSibling;
	          break a;
	        }

	        c = c.parentNode;
	      }

	      c = void 0;
	    }

	    c = Td(c);
	  }
	}

	function Vd(a) {
	  var b = a && a.nodeName && a.nodeName.toLowerCase();
	  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
	}

	var Wd = ExecutionEnvironment_1.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
	    Xd = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: "onSelect",
	      captured: "onSelectCapture"
	    },
	    dependencies: "blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")
	  }
	},
	    Yd = null,
	    Zd = null,
	    $d = null,
	    ae = !1;

	function be(a, b) {
	  if (ae || null == Yd || Yd !== getActiveElement_1()) return null;
	  var c = Yd;
	  "selectionStart" in c && Vd(c) ? c = {
	    start: c.selectionStart,
	    end: c.selectionEnd
	  } : window.getSelection ? (c = window.getSelection(), c = {
	    anchorNode: c.anchorNode,
	    anchorOffset: c.anchorOffset,
	    focusNode: c.focusNode,
	    focusOffset: c.focusOffset
	  }) : c = void 0;
	  return $d && shallowEqual_1($d, c) ? null : ($d = c, a = H$1.getPooled(Xd.select, Zd, a, b), a.type = "select", a.target = Yd, Ya(a), a);
	}

	var ce = {
	  eventTypes: Xd,
	  extractEvents: function (a, b, c, d) {
	    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
	        f;

	    if (!(f = !e)) {
	      a: {
	        e = Sd(e);
	        f = sa.onSelect;

	        for (var g = 0; g < f.length; g++) {
	          var h = f[g];

	          if (!e.hasOwnProperty(h) || !e[h]) {
	            e = !1;
	            break a;
	          }
	        }

	        e = !0;
	      }

	      f = !e;
	    }

	    if (f) return null;
	    e = b ? Oa(b) : window;

	    switch (a) {
	      case "focus":
	        if (Yb(e) || "true" === e.contentEditable) Yd = e, Zd = b, $d = null;
	        break;

	      case "blur":
	        $d = Zd = Yd = null;
	        break;

	      case "mousedown":
	        ae = !0;
	        break;

	      case "contextmenu":
	      case "mouseup":
	        return ae = !1, be(c, d);

	      case "selectionchange":
	        if (Wd) break;

	      case "keydown":
	      case "keyup":
	        return be(c, d);
	    }

	    return null;
	  }
	};
	Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
	wa = Qa.getFiberCurrentPropsFromNode;
	xa = Qa.getInstanceFromNode;
	ya = Qa.getNodeFromInstance;
	Ga.injectEventPluginsByName({
	  SimpleEventPlugin: Ed,
	  EnterLeaveEventPlugin: jd,
	  ChangeEventPlugin: bd,
	  SelectEventPlugin: ce,
	  BeforeInputEventPlugin: Ib
	});
	var de = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0,
	    ee = Date,
	    fe = setTimeout,
	    ge = clearTimeout,
	    he = void 0;

	if ("object" === typeof performance && "function" === typeof performance.now) {
	  var ie = performance;

	  he = function () {
	    return ie.now();
	  };
	} else he = function () {
	  return ee.now();
	};

	var je = void 0,
	    ke = void 0;

	if (ExecutionEnvironment_1.canUseDOM) {
	  var le = "function" === typeof de ? de : function () {
	    A$1("276");
	  },
	      L$1 = null,
	      me = null,
	      ne = -1,
	      oe = !1,
	      pe = !1,
	      qe = 0,
	      re = 33,
	      se = 33,
	      te = {
	    didTimeout: !1,
	    timeRemaining: function () {
	      var a = qe - he();
	      return 0 < a ? a : 0;
	    }
	  },
	      ve = function (a, b) {
	    var c = a.scheduledCallback,
	        d = !1;

	    try {
	      c(b), d = !0;
	    } finally {
	      ke(a), d || (oe = !0, window.postMessage(ue, "*"));
	    }
	  },
	      ue = "__reactIdleCallback$" + Math.random().toString(36).slice(2);

	  window.addEventListener("message", function (a) {
	    if (a.source === window && a.data === ue && (oe = !1, null !== L$1)) {
	      if (null !== L$1) {
	        var b = he();

	        if (!(-1 === ne || ne > b)) {
	          a = -1;

	          for (var c = [], d = L$1; null !== d;) {
	            var e = d.timeoutTime;
	            -1 !== e && e <= b ? c.push(d) : -1 !== e && (-1 === a || e < a) && (a = e);
	            d = d.next;
	          }

	          if (0 < c.length) for (te.didTimeout = !0, b = 0, d = c.length; b < d; b++) ve(c[b], te);
	          ne = a;
	        }
	      }

	      for (a = he(); 0 < qe - a && null !== L$1;) a = L$1, te.didTimeout = !1, ve(a, te), a = he();

	      null === L$1 || pe || (pe = !0, le(we));
	    }
	  }, !1);

	  var we = function (a) {
	    pe = !1;
	    var b = a - qe + se;
	    b < se && re < se ? (8 > b && (b = 8), se = b < re ? re : b) : re = b;
	    qe = a + se;
	    oe || (oe = !0, window.postMessage(ue, "*"));
	  };

	  je = function (a, b) {
	    var c = -1;
	    null != b && "number" === typeof b.timeout && (c = he() + b.timeout);
	    if (-1 === ne || -1 !== c && c < ne) ne = c;
	    a = {
	      scheduledCallback: a,
	      timeoutTime: c,
	      prev: null,
	      next: null
	    };
	    null === L$1 ? L$1 = a : (b = a.prev = me, null !== b && (b.next = a));
	    me = a;
	    pe || (pe = !0, le(we));
	    return a;
	  };

	  ke = function (a) {
	    if (null !== a.prev || L$1 === a) {
	      var b = a.next,
	          c = a.prev;
	      a.next = null;
	      a.prev = null;
	      null !== b ? null !== c ? (c.next = b, b.prev = c) : (b.prev = null, L$1 = b) : null !== c ? (c.next = null, me = c) : me = L$1 = null;
	    }
	  };
	} else {
	  var xe = new Map();

	  je = function (a) {
	    var b = {
	      scheduledCallback: a,
	      timeoutTime: 0,
	      next: null,
	      prev: null
	    },
	        c = fe(function () {
	      a({
	        timeRemaining: function () {
	          return Infinity;
	        },
	        didTimeout: !1
	      });
	    });
	    xe.set(a, c);
	    return b;
	  };

	  ke = function (a) {
	    var b = xe.get(a.scheduledCallback);
	    xe.delete(a);
	    ge(b);
	  };
	}

	function ye(a) {
	  var b = "";
	  react.Children.forEach(a, function (a) {
	    null == a || "string" !== typeof a && "number" !== typeof a || (b += a);
	  });
	  return b;
	}

	function ze(a, b) {
	  a = objectAssign({
	    children: void 0
	  }, b);
	  if (b = ye(b.children)) a.children = b;
	  return a;
	}

	function Ae(a, b, c, d) {
	  a = a.options;

	  if (b) {
	    b = {};

	    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;

	    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
	  } else {
	    c = "" + c;
	    b = null;

	    for (e = 0; e < a.length; e++) {
	      if (a[e].value === c) {
	        a[e].selected = !0;
	        d && (a[e].defaultSelected = !0);
	        return;
	      }

	      null !== b || a[e].disabled || (b = a[e]);
	    }

	    null !== b && (b.selected = !0);
	  }
	}

	function Be(a, b) {
	  var c = b.value;
	  a._wrapperState = {
	    initialValue: null != c ? c : b.defaultValue,
	    wasMultiple: !!b.multiple
	  };
	}

	function Ce(a, b) {
	  null != b.dangerouslySetInnerHTML ? A$1("91") : void 0;
	  return objectAssign({}, b, {
	    value: void 0,
	    defaultValue: void 0,
	    children: "" + a._wrapperState.initialValue
	  });
	}

	function De(a, b) {
	  var c = b.value;
	  null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? A$1("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : A$1("93"), b = b[0]), c = "" + b), null == c && (c = ""));
	  a._wrapperState = {
	    initialValue: "" + c
	  };
	}

	function Ee(a, b) {
	  var c = b.value;
	  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && (a.defaultValue = c));
	  null != b.defaultValue && (a.defaultValue = b.defaultValue);
	}

	function Fe(a) {
	  var b = a.textContent;
	  b === a._wrapperState.initialValue && (a.value = b);
	}

	var Ge = {
	  html: "http://www.w3.org/1999/xhtml",
	  mathml: "http://www.w3.org/1998/Math/MathML",
	  svg: "http://www.w3.org/2000/svg"
	};

	function He(a) {
	  switch (a) {
	    case "svg":
	      return "http://www.w3.org/2000/svg";

	    case "math":
	      return "http://www.w3.org/1998/Math/MathML";

	    default:
	      return "http://www.w3.org/1999/xhtml";
	  }
	}

	function Ie(a, b) {
	  return null == a || "http://www.w3.org/1999/xhtml" === a ? He(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
	}

	var Je = void 0,
	    Ke = function (a) {
	  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
	    MSApp.execUnsafeLocalFunction(function () {
	      return a(b, c, d, e);
	    });
	  } : a;
	}(function (a, b) {
	  if (a.namespaceURI !== Ge.svg || "innerHTML" in a) a.innerHTML = b;else {
	    Je = Je || document.createElement("div");
	    Je.innerHTML = "<svg>" + b + "</svg>";

	    for (b = Je.firstChild; a.firstChild;) a.removeChild(a.firstChild);

	    for (; b.firstChild;) a.appendChild(b.firstChild);
	  }
	});

	function Le(a, b) {
	  if (b) {
	    var c = a.firstChild;

	    if (c && c === a.lastChild && 3 === c.nodeType) {
	      c.nodeValue = b;
	      return;
	    }
	  }

	  a.textContent = b;
	}

	var Me = {
	  animationIterationCount: !0,
	  borderImageOutset: !0,
	  borderImageSlice: !0,
	  borderImageWidth: !0,
	  boxFlex: !0,
	  boxFlexGroup: !0,
	  boxOrdinalGroup: !0,
	  columnCount: !0,
	  columns: !0,
	  flex: !0,
	  flexGrow: !0,
	  flexPositive: !0,
	  flexShrink: !0,
	  flexNegative: !0,
	  flexOrder: !0,
	  gridRow: !0,
	  gridRowEnd: !0,
	  gridRowSpan: !0,
	  gridRowStart: !0,
	  gridColumn: !0,
	  gridColumnEnd: !0,
	  gridColumnSpan: !0,
	  gridColumnStart: !0,
	  fontWeight: !0,
	  lineClamp: !0,
	  lineHeight: !0,
	  opacity: !0,
	  order: !0,
	  orphans: !0,
	  tabSize: !0,
	  widows: !0,
	  zIndex: !0,
	  zoom: !0,
	  fillOpacity: !0,
	  floodOpacity: !0,
	  stopOpacity: !0,
	  strokeDasharray: !0,
	  strokeDashoffset: !0,
	  strokeMiterlimit: !0,
	  strokeOpacity: !0,
	  strokeWidth: !0
	},
	    Ne = ["Webkit", "ms", "Moz", "O"];
	Object.keys(Me).forEach(function (a) {
	  Ne.forEach(function (b) {
	    b = b + a.charAt(0).toUpperCase() + a.substring(1);
	    Me[b] = Me[a];
	  });
	});

	function Oe(a, b) {
	  a = a.style;

	  for (var c in b) if (b.hasOwnProperty(c)) {
	    var d = 0 === c.indexOf("--");
	    var e = c;
	    var f = b[c];
	    e = null == f || "boolean" === typeof f || "" === f ? "" : d || "number" !== typeof f || 0 === f || Me.hasOwnProperty(e) && Me[e] ? ("" + f).trim() : f + "px";
	    "float" === c && (c = "cssFloat");
	    d ? a.setProperty(c, e) : a[c] = e;
	  }
	}

	var Pe = objectAssign({
	  menuitem: !0
	}, {
	  area: !0,
	  base: !0,
	  br: !0,
	  col: !0,
	  embed: !0,
	  hr: !0,
	  img: !0,
	  input: !0,
	  keygen: !0,
	  link: !0,
	  meta: !0,
	  param: !0,
	  source: !0,
	  track: !0,
	  wbr: !0
	});

	function Qe(a, b, c) {
	  b && (Pe[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? A$1("137", a, c()) : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? A$1("60") : void 0, "object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML ? void 0 : A$1("61")), null != b.style && "object" !== typeof b.style ? A$1("62", c()) : void 0);
	}

	function Re(a, b) {
	  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

	  switch (a) {
	    case "annotation-xml":
	    case "color-profile":
	    case "font-face":
	    case "font-face-src":
	    case "font-face-uri":
	    case "font-face-format":
	    case "font-face-name":
	    case "missing-glyph":
	      return !1;

	    default:
	      return !0;
	  }
	}

	var Se = emptyFunction_1.thatReturns("");

	function Te(a, b) {
	  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
	  var c = Sd(a);
	  b = sa[b];

	  for (var d = 0; d < b.length; d++) {
	    var e = b[d];

	    if (!c.hasOwnProperty(e) || !c[e]) {
	      switch (e) {
	        case "scroll":
	          Nd("scroll", a);
	          break;

	        case "focus":
	        case "blur":
	          Nd("focus", a);
	          Nd("blur", a);
	          c.blur = !0;
	          c.focus = !0;
	          break;

	        case "cancel":
	        case "close":
	          $b(e, !0) && Nd(e, a);
	          break;

	        case "invalid":
	        case "submit":
	        case "reset":
	          break;

	        default:
	          -1 === jb.indexOf(e) && K$1(e, a);
	      }

	      c[e] = !0;
	    }
	  }
	}

	function Ue(a, b, c, d) {
	  c = 9 === c.nodeType ? c : c.ownerDocument;
	  d === Ge.html && (d = He(a));
	  d === Ge.html ? "script" === a ? (a = c.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : a = "string" === typeof b.is ? c.createElement(a, {
	    is: b.is
	  }) : c.createElement(a) : a = c.createElementNS(d, a);
	  return a;
	}

	function Ve(a, b) {
	  return (9 === b.nodeType ? b : b.ownerDocument).createTextNode(a);
	}

	function We(a, b, c, d) {
	  var e = Re(b, c);

	  switch (b) {
	    case "iframe":
	    case "object":
	      K$1("load", a);
	      var f = c;
	      break;

	    case "video":
	    case "audio":
	      for (f = 0; f < jb.length; f++) K$1(jb[f], a);

	      f = c;
	      break;

	    case "source":
	      K$1("error", a);
	      f = c;
	      break;

	    case "img":
	    case "image":
	    case "link":
	      K$1("error", a);
	      K$1("load", a);
	      f = c;
	      break;

	    case "form":
	      K$1("reset", a);
	      K$1("submit", a);
	      f = c;
	      break;

	    case "details":
	      K$1("toggle", a);
	      f = c;
	      break;

	    case "input":
	      Ic(a, c);
	      f = Hc(a, c);
	      K$1("invalid", a);
	      Te(d, "onChange");
	      break;

	    case "option":
	      f = ze(a, c);
	      break;

	    case "select":
	      Be(a, c);
	      f = objectAssign({}, c, {
	        value: void 0
	      });
	      K$1("invalid", a);
	      Te(d, "onChange");
	      break;

	    case "textarea":
	      De(a, c);
	      f = Ce(a, c);
	      K$1("invalid", a);
	      Te(d, "onChange");
	      break;

	    default:
	      f = c;
	  }

	  Qe(b, f, Se);
	  var g = f,
	      h;

	  for (h in g) if (g.hasOwnProperty(h)) {
	    var k = g[h];
	    "style" === h ? Oe(a, k, Se) : "dangerouslySetInnerHTML" === h ? (k = k ? k.__html : void 0, null != k && Ke(a, k)) : "children" === h ? "string" === typeof k ? ("textarea" !== b || "" !== k) && Le(a, k) : "number" === typeof k && Le(a, "" + k) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (ra.hasOwnProperty(h) ? null != k && Te(d, h) : null != k && Gc(a, h, k, e));
	  }

	  switch (b) {
	    case "input":
	      cc(a);
	      Nc(a, c, !1);
	      break;

	    case "textarea":
	      cc(a);
	      Fe(a, c);
	      break;

	    case "option":
	      null != c.value && a.setAttribute("value", c.value);
	      break;

	    case "select":
	      a.multiple = !!c.multiple;
	      b = c.value;
	      null != b ? Ae(a, !!c.multiple, b, !1) : null != c.defaultValue && Ae(a, !!c.multiple, c.defaultValue, !0);
	      break;

	    default:
	      "function" === typeof f.onClick && (a.onclick = emptyFunction_1);
	  }
	}

	function Xe(a, b, c, d, e) {
	  var f = null;

	  switch (b) {
	    case "input":
	      c = Hc(a, c);
	      d = Hc(a, d);
	      f = [];
	      break;

	    case "option":
	      c = ze(a, c);
	      d = ze(a, d);
	      f = [];
	      break;

	    case "select":
	      c = objectAssign({}, c, {
	        value: void 0
	      });
	      d = objectAssign({}, d, {
	        value: void 0
	      });
	      f = [];
	      break;

	    case "textarea":
	      c = Ce(a, c);
	      d = Ce(a, d);
	      f = [];
	      break;

	    default:
	      "function" !== typeof c.onClick && "function" === typeof d.onClick && (a.onclick = emptyFunction_1);
	  }

	  Qe(b, d, Se);
	  b = a = void 0;
	  var g = null;

	  for (a in c) if (!d.hasOwnProperty(a) && c.hasOwnProperty(a) && null != c[a]) if ("style" === a) {
	    var h = c[a];

	    for (b in h) h.hasOwnProperty(b) && (g || (g = {}), g[b] = "");
	  } else "dangerouslySetInnerHTML" !== a && "children" !== a && "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && "autoFocus" !== a && (ra.hasOwnProperty(a) ? f || (f = []) : (f = f || []).push(a, null));

	  for (a in d) {
	    var k = d[a];
	    h = null != c ? c[a] : void 0;
	    if (d.hasOwnProperty(a) && k !== h && (null != k || null != h)) if ("style" === a) {
	      if (h) {
	        for (b in h) !h.hasOwnProperty(b) || k && k.hasOwnProperty(b) || (g || (g = {}), g[b] = "");

	        for (b in k) k.hasOwnProperty(b) && h[b] !== k[b] && (g || (g = {}), g[b] = k[b]);
	      } else g || (f || (f = []), f.push(a, g)), g = k;
	    } else "dangerouslySetInnerHTML" === a ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(a, "" + k)) : "children" === a ? h === k || "string" !== typeof k && "number" !== typeof k || (f = f || []).push(a, "" + k) : "suppressContentEditableWarning" !== a && "suppressHydrationWarning" !== a && (ra.hasOwnProperty(a) ? (null != k && Te(e, a), f || h === k || (f = [])) : (f = f || []).push(a, k));
	  }

	  g && (f = f || []).push("style", g);
	  return f;
	}

	function Ye(a, b, c, d, e) {
	  "input" === c && "radio" === e.type && null != e.name && Kc(a, e);
	  Re(c, d);
	  d = Re(c, e);

	  for (var f = 0; f < b.length; f += 2) {
	    var g = b[f],
	        h = b[f + 1];
	    "style" === g ? Oe(a, h, Se) : "dangerouslySetInnerHTML" === g ? Ke(a, h) : "children" === g ? Le(a, h) : Gc(a, g, h, d);
	  }

	  switch (c) {
	    case "input":
	      Lc(a, e);
	      break;

	    case "textarea":
	      Ee(a, e);
	      break;

	    case "select":
	      a._wrapperState.initialValue = void 0, b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? Ae(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? Ae(a, !!e.multiple, e.defaultValue, !0) : Ae(a, !!e.multiple, e.multiple ? [] : "", !1));
	  }
	}

	function Ze(a, b, c, d, e) {
	  switch (b) {
	    case "iframe":
	    case "object":
	      K$1("load", a);
	      break;

	    case "video":
	    case "audio":
	      for (d = 0; d < jb.length; d++) K$1(jb[d], a);

	      break;

	    case "source":
	      K$1("error", a);
	      break;

	    case "img":
	    case "image":
	    case "link":
	      K$1("error", a);
	      K$1("load", a);
	      break;

	    case "form":
	      K$1("reset", a);
	      K$1("submit", a);
	      break;

	    case "details":
	      K$1("toggle", a);
	      break;

	    case "input":
	      Ic(a, c);
	      K$1("invalid", a);
	      Te(e, "onChange");
	      break;

	    case "select":
	      Be(a, c);
	      K$1("invalid", a);
	      Te(e, "onChange");
	      break;

	    case "textarea":
	      De(a, c), K$1("invalid", a), Te(e, "onChange");
	  }

	  Qe(b, c, Se);
	  d = null;

	  for (var f in c) if (c.hasOwnProperty(f)) {
	    var g = c[f];
	    "children" === f ? "string" === typeof g ? a.textContent !== g && (d = ["children", g]) : "number" === typeof g && a.textContent !== "" + g && (d = ["children", "" + g]) : ra.hasOwnProperty(f) && null != g && Te(e, f);
	  }

	  switch (b) {
	    case "input":
	      cc(a);
	      Nc(a, c, !0);
	      break;

	    case "textarea":
	      cc(a);
	      Fe(a, c);
	      break;

	    case "select":
	    case "option":
	      break;

	    default:
	      "function" === typeof c.onClick && (a.onclick = emptyFunction_1);
	  }

	  return d;
	}

	function $e(a, b) {
	  return a.nodeValue !== b;
	}

	var af = {
	  createElement: Ue,
	  createTextNode: Ve,
	  setInitialProperties: We,
	  diffProperties: Xe,
	  updateProperties: Ye,
	  diffHydratedProperties: Ze,
	  diffHydratedText: $e,
	  warnForUnmatchedText: function () {},
	  warnForDeletedHydratableElement: function () {},
	  warnForDeletedHydratableText: function () {},
	  warnForInsertedHydratedElement: function () {},
	  warnForInsertedHydratedText: function () {},
	  restoreControlledState: function (a, b, c) {
	    switch (b) {
	      case "input":
	        Lc(a, c);
	        b = c.name;

	        if ("radio" === c.type && null != b) {
	          for (c = a; c.parentNode;) c = c.parentNode;

	          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

	          for (b = 0; b < c.length; b++) {
	            var d = c[b];

	            if (d !== a && d.form === a.form) {
	              var e = Pa(d);
	              e ? void 0 : A$1("90");
	              dc(d);
	              Lc(d, e);
	            }
	          }
	        }

	        break;

	      case "textarea":
	        Ee(a, c);
	        break;

	      case "select":
	        b = c.value, null != b && Ae(a, !!c.multiple, b, !1);
	    }
	  }
	},
	    bf = null,
	    cf = null;

	function df(a, b) {
	  switch (a) {
	    case "button":
	    case "input":
	    case "select":
	    case "textarea":
	      return !!b.autoFocus;
	  }

	  return !1;
	}

	function ef(a, b) {
	  return "textarea" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && "string" === typeof b.dangerouslySetInnerHTML.__html;
	}

	var ff = he,
	    gf = je,
	    hf = ke;

	function jf(a) {
	  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) a = a.nextSibling;

	  return a;
	}

	function kf(a) {
	  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) a = a.nextSibling;

	  return a;
	}
	var lf = [],
	    mf = -1;

	function nf(a) {
	  return {
	    current: a
	  };
	}

	function M$1(a) {
	  0 > mf || (a.current = lf[mf], lf[mf] = null, mf--);
	}

	function N$1(a, b) {
	  mf++;
	  lf[mf] = a.current;
	  a.current = b;
	}

	var of = nf(emptyObject_1),
	    O$1 = nf(!1),
	    pf = emptyObject_1;

	function qf(a) {
	  return rf(a) ? pf : of.current;
	}

	function sf(a, b) {
	  var c = a.type.contextTypes;
	  if (!c) return emptyObject_1;
	  var d = a.stateNode;
	  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
	  var e = {},
	      f;

	  for (f in c) e[f] = b[f];

	  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
	  return e;
	}

	function rf(a) {
	  return 2 === a.tag && null != a.type.childContextTypes;
	}

	function tf(a) {
	  rf(a) && (M$1(O$1, a), M$1(of, a));
	}

	function uf(a) {
	  M$1(O$1, a);
	  M$1(of, a);
	}

	function vf(a, b, c) {
	  of.current !== emptyObject_1 ? A$1("168") : void 0;
	  N$1(of, b, a);
	  N$1(O$1, c, a);
	}

	function wf(a, b) {
	  var c = a.stateNode,
	      d = a.type.childContextTypes;
	  if ("function" !== typeof c.getChildContext) return b;
	  c = c.getChildContext();

	  for (var e in c) e in d ? void 0 : A$1("108", uc(a) || "Unknown", e);

	  return objectAssign({}, b, c);
	}

	function xf(a) {
	  if (!rf(a)) return !1;
	  var b = a.stateNode;
	  b = b && b.__reactInternalMemoizedMergedChildContext || emptyObject_1;
	  pf = of.current;
	  N$1(of, b, a);
	  N$1(O$1, O$1.current, a);
	  return !0;
	}

	function yf(a, b) {
	  var c = a.stateNode;
	  c ? void 0 : A$1("169");

	  if (b) {
	    var d = wf(a, pf);
	    c.__reactInternalMemoizedMergedChildContext = d;
	    M$1(O$1, a);
	    M$1(of, a);
	    N$1(of, d, a);
	  } else M$1(O$1, a);

	  N$1(O$1, b, a);
	}

	function zf(a, b, c, d) {
	  this.tag = a;
	  this.key = c;
	  this.sibling = this.child = this.return = this.stateNode = this.type = null;
	  this.index = 0;
	  this.ref = null;
	  this.pendingProps = b;
	  this.memoizedState = this.updateQueue = this.memoizedProps = null;
	  this.mode = d;
	  this.effectTag = 0;
	  this.lastEffect = this.firstEffect = this.nextEffect = null;
	  this.expirationTime = 0;
	  this.alternate = null;
	}

	function Af(a, b, c) {
	  var d = a.alternate;
	  null === d ? (d = new zf(a.tag, b, a.key, a.mode), d.type = a.type, d.stateNode = a.stateNode, d.alternate = a, a.alternate = d) : (d.pendingProps = b, d.effectTag = 0, d.nextEffect = null, d.firstEffect = null, d.lastEffect = null);
	  d.expirationTime = c;
	  d.child = a.child;
	  d.memoizedProps = a.memoizedProps;
	  d.memoizedState = a.memoizedState;
	  d.updateQueue = a.updateQueue;
	  d.sibling = a.sibling;
	  d.index = a.index;
	  d.ref = a.ref;
	  return d;
	}

	function Bf(a, b, c) {
	  var d = a.type,
	      e = a.key;
	  a = a.props;
	  if ("function" === typeof d) var f = d.prototype && d.prototype.isReactComponent ? 2 : 0;else if ("string" === typeof d) f = 5;else switch (d) {
	    case ic:
	      return Cf(a.children, b, c, e);

	    case pc:
	      f = 11;
	      b |= 3;
	      break;

	    case jc:
	      f = 11;
	      b |= 2;
	      break;

	    case kc:
	      return d = new zf(15, a, e, b | 4), d.type = kc, d.expirationTime = c, d;

	    case rc:
	      f = 16;
	      b |= 2;
	      break;

	    default:
	      a: {
	        switch ("object" === typeof d && null !== d ? d.$$typeof : null) {
	          case lc:
	            f = 13;
	            break a;

	          case mc:
	            f = 12;
	            break a;

	          case qc:
	            f = 14;
	            break a;

	          default:
	            A$1("130", null == d ? d : typeof d, "");
	        }

	        f = void 0;
	      }

	  }
	  b = new zf(f, a, e, b);
	  b.type = d;
	  b.expirationTime = c;
	  return b;
	}

	function Cf(a, b, c, d) {
	  a = new zf(10, a, d, b);
	  a.expirationTime = c;
	  return a;
	}

	function Df(a, b, c) {
	  a = new zf(6, a, null, b);
	  a.expirationTime = c;
	  return a;
	}

	function Ef(a, b, c) {
	  b = new zf(4, null !== a.children ? a.children : [], a.key, b);
	  b.expirationTime = c;
	  b.stateNode = {
	    containerInfo: a.containerInfo,
	    pendingChildren: null,
	    implementation: a.implementation
	  };
	  return b;
	}

	function Ff(a, b, c) {
	  b = new zf(3, null, null, b ? 3 : 0);
	  a = {
	    current: b,
	    containerInfo: a,
	    pendingChildren: null,
	    earliestPendingTime: 0,
	    latestPendingTime: 0,
	    earliestSuspendedTime: 0,
	    latestSuspendedTime: 0,
	    latestPingedTime: 0,
	    pendingCommitExpirationTime: 0,
	    finishedWork: null,
	    context: null,
	    pendingContext: null,
	    hydrate: c,
	    remainingExpirationTime: 0,
	    firstBatch: null,
	    nextScheduledRoot: null
	  };
	  return b.stateNode = a;
	}

	var Gf = null,
	    Hf = null;

	function If(a) {
	  return function (b) {
	    try {
	      return a(b);
	    } catch (c) {}
	  };
	}

	function Jf(a) {
	  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
	  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
	  if (b.isDisabled || !b.supportsFiber) return !0;

	  try {
	    var c = b.inject(a);
	    Gf = If(function (a) {
	      return b.onCommitFiberRoot(c, a);
	    });
	    Hf = If(function (a) {
	      return b.onCommitFiberUnmount(c, a);
	    });
	  } catch (d) {}

	  return !0;
	}

	function Kf(a) {
	  "function" === typeof Gf && Gf(a);
	}

	function Lf(a) {
	  "function" === typeof Hf && Hf(a);
	}

	var Mf = !1;

	function Nf(a) {
	  return {
	    expirationTime: 0,
	    baseState: a,
	    firstUpdate: null,
	    lastUpdate: null,
	    firstCapturedUpdate: null,
	    lastCapturedUpdate: null,
	    firstEffect: null,
	    lastEffect: null,
	    firstCapturedEffect: null,
	    lastCapturedEffect: null
	  };
	}

	function Of(a) {
	  return {
	    expirationTime: a.expirationTime,
	    baseState: a.baseState,
	    firstUpdate: a.firstUpdate,
	    lastUpdate: a.lastUpdate,
	    firstCapturedUpdate: null,
	    lastCapturedUpdate: null,
	    firstEffect: null,
	    lastEffect: null,
	    firstCapturedEffect: null,
	    lastCapturedEffect: null
	  };
	}

	function Pf(a) {
	  return {
	    expirationTime: a,
	    tag: 0,
	    payload: null,
	    callback: null,
	    next: null,
	    nextEffect: null
	  };
	}

	function Qf(a, b, c) {
	  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
	  if (0 === a.expirationTime || a.expirationTime > c) a.expirationTime = c;
	}

	function Rf(a, b, c) {
	  var d = a.alternate;

	  if (null === d) {
	    var e = a.updateQueue;
	    var f = null;
	    null === e && (e = a.updateQueue = Nf(a.memoizedState));
	  } else e = a.updateQueue, f = d.updateQueue, null === e ? null === f ? (e = a.updateQueue = Nf(a.memoizedState), f = d.updateQueue = Nf(d.memoizedState)) : e = a.updateQueue = Of(f) : null === f && (f = d.updateQueue = Of(e));

	  null === f || e === f ? Qf(e, b, c) : null === e.lastUpdate || null === f.lastUpdate ? (Qf(e, b, c), Qf(f, b, c)) : (Qf(e, b, c), f.lastUpdate = b);
	}

	function Sf(a, b, c) {
	  var d = a.updateQueue;
	  d = null === d ? a.updateQueue = Nf(a.memoizedState) : Tf(a, d);
	  null === d.lastCapturedUpdate ? d.firstCapturedUpdate = d.lastCapturedUpdate = b : (d.lastCapturedUpdate.next = b, d.lastCapturedUpdate = b);
	  if (0 === d.expirationTime || d.expirationTime > c) d.expirationTime = c;
	}

	function Tf(a, b) {
	  var c = a.alternate;
	  null !== c && b === c.updateQueue && (b = a.updateQueue = Of(b));
	  return b;
	}

	function Uf(a, b, c, d, e, f) {
	  switch (c.tag) {
	    case 1:
	      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

	    case 3:
	      a.effectTag = a.effectTag & -1025 | 64;

	    case 0:
	      a = c.payload;
	      e = "function" === typeof a ? a.call(f, d, e) : a;
	      if (null === e || void 0 === e) break;
	      return objectAssign({}, d, e);

	    case 2:
	      Mf = !0;
	  }

	  return d;
	}

	function Vf(a, b, c, d, e) {
	  Mf = !1;

	  if (!(0 === b.expirationTime || b.expirationTime > e)) {
	    b = Tf(a, b);

	    for (var f = b.baseState, g = null, h = 0, k = b.firstUpdate, n = f; null !== k;) {
	      var r = k.expirationTime;

	      if (r > e) {
	        if (null === g && (g = k, f = n), 0 === h || h > r) h = r;
	      } else n = Uf(a, b, k, n, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = k : (b.lastEffect.nextEffect = k, b.lastEffect = k));

	      k = k.next;
	    }

	    r = null;

	    for (k = b.firstCapturedUpdate; null !== k;) {
	      var w = k.expirationTime;

	      if (w > e) {
	        if (null === r && (r = k, null === g && (f = n)), 0 === h || h > w) h = w;
	      } else n = Uf(a, b, k, n, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = k : (b.lastCapturedEffect.nextEffect = k, b.lastCapturedEffect = k));

	      k = k.next;
	    }

	    null === g && (b.lastUpdate = null);
	    null === r ? b.lastCapturedUpdate = null : a.effectTag |= 32;
	    null === g && null === r && (f = n);
	    b.baseState = f;
	    b.firstUpdate = g;
	    b.firstCapturedUpdate = r;
	    b.expirationTime = h;
	    a.memoizedState = n;
	  }
	}

	function Wf(a, b) {
	  "function" !== typeof a ? A$1("191", a) : void 0;
	  a.call(b);
	}

	function Xf(a, b, c) {
	  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
	  a = b.firstEffect;

	  for (b.firstEffect = b.lastEffect = null; null !== a;) {
	    var d = a.callback;
	    null !== d && (a.callback = null, Wf(d, c));
	    a = a.nextEffect;
	  }

	  a = b.firstCapturedEffect;

	  for (b.firstCapturedEffect = b.lastCapturedEffect = null; null !== a;) b = a.callback, null !== b && (a.callback = null, Wf(b, c)), a = a.nextEffect;
	}

	function Yf(a, b) {
	  return {
	    value: a,
	    source: b,
	    stack: vc(b)
	  };
	}

	var Zf = nf(null),
	    $f = nf(null),
	    ag = nf(0);

	function bg(a) {
	  var b = a.type._context;
	  N$1(ag, b._changedBits, a);
	  N$1($f, b._currentValue, a);
	  N$1(Zf, a, a);
	  b._currentValue = a.pendingProps.value;
	  b._changedBits = a.stateNode;
	}

	function cg(a) {
	  var b = ag.current,
	      c = $f.current;
	  M$1(Zf, a);
	  M$1($f, a);
	  M$1(ag, a);
	  a = a.type._context;
	  a._currentValue = c;
	  a._changedBits = b;
	}

	var dg = {},
	    eg = nf(dg),
	    fg = nf(dg),
	    gg = nf(dg);

	function hg(a) {
	  a === dg ? A$1("174") : void 0;
	  return a;
	}

	function jg(a, b) {
	  N$1(gg, b, a);
	  N$1(fg, a, a);
	  N$1(eg, dg, a);
	  var c = b.nodeType;

	  switch (c) {
	    case 9:
	    case 11:
	      b = (b = b.documentElement) ? b.namespaceURI : Ie(null, "");
	      break;

	    default:
	      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = Ie(b, c);
	  }

	  M$1(eg, a);
	  N$1(eg, b, a);
	}

	function kg(a) {
	  M$1(eg, a);
	  M$1(fg, a);
	  M$1(gg, a);
	}

	function lg(a) {
	  fg.current === a && (M$1(eg, a), M$1(fg, a));
	}

	function mg(a, b, c) {
	  var d = a.memoizedState;
	  b = b(c, d);
	  d = null === b || void 0 === b ? d : objectAssign({}, d, b);
	  a.memoizedState = d;
	  a = a.updateQueue;
	  null !== a && 0 === a.expirationTime && (a.baseState = d);
	}

	var qg = {
	  isMounted: function (a) {
	    return (a = a._reactInternalFiber) ? 2 === kd(a) : !1;
	  },
	  enqueueSetState: function (a, b, c) {
	    a = a._reactInternalFiber;
	    var d = ng();
	    d = og(d, a);
	    var e = Pf(d);
	    e.payload = b;
	    void 0 !== c && null !== c && (e.callback = c);
	    Rf(a, e, d);
	    pg(a, d);
	  },
	  enqueueReplaceState: function (a, b, c) {
	    a = a._reactInternalFiber;
	    var d = ng();
	    d = og(d, a);
	    var e = Pf(d);
	    e.tag = 1;
	    e.payload = b;
	    void 0 !== c && null !== c && (e.callback = c);
	    Rf(a, e, d);
	    pg(a, d);
	  },
	  enqueueForceUpdate: function (a, b) {
	    a = a._reactInternalFiber;
	    var c = ng();
	    c = og(c, a);
	    var d = Pf(c);
	    d.tag = 2;
	    void 0 !== b && null !== b && (d.callback = b);
	    Rf(a, d, c);
	    pg(a, c);
	  }
	};

	function rg(a, b, c, d, e, f) {
	  var g = a.stateNode;
	  a = a.type;
	  return "function" === typeof g.shouldComponentUpdate ? g.shouldComponentUpdate(c, e, f) : a.prototype && a.prototype.isPureReactComponent ? !shallowEqual_1(b, c) || !shallowEqual_1(d, e) : !0;
	}

	function sg(a, b, c, d) {
	  a = b.state;
	  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
	  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
	  b.state !== a && qg.enqueueReplaceState(b, b.state, null);
	}

	function tg(a, b) {
	  var c = a.type,
	      d = a.stateNode,
	      e = a.pendingProps,
	      f = qf(a);
	  d.props = e;
	  d.state = a.memoizedState;
	  d.refs = emptyObject_1;
	  d.context = sf(a, f);
	  f = a.updateQueue;
	  null !== f && (Vf(a, f, e, d, b), d.state = a.memoizedState);
	  f = a.type.getDerivedStateFromProps;
	  "function" === typeof f && (mg(a, f, e), d.state = a.memoizedState);
	  "function" === typeof c.getDerivedStateFromProps || "function" === typeof d.getSnapshotBeforeUpdate || "function" !== typeof d.UNSAFE_componentWillMount && "function" !== typeof d.componentWillMount || (c = d.state, "function" === typeof d.componentWillMount && d.componentWillMount(), "function" === typeof d.UNSAFE_componentWillMount && d.UNSAFE_componentWillMount(), c !== d.state && qg.enqueueReplaceState(d, d.state, null), f = a.updateQueue, null !== f && (Vf(a, f, e, d, b), d.state = a.memoizedState));
	  "function" === typeof d.componentDidMount && (a.effectTag |= 4);
	}

	var ug = Array.isArray;

	function vg(a, b, c) {
	  a = c.ref;

	  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
	    if (c._owner) {
	      c = c._owner;
	      var d = void 0;
	      c && (2 !== c.tag ? A$1("110") : void 0, d = c.stateNode);
	      d ? void 0 : A$1("147", a);
	      var e = "" + a;
	      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

	      b = function (a) {
	        var b = d.refs === emptyObject_1 ? d.refs = {} : d.refs;
	        null === a ? delete b[e] : b[e] = a;
	      };

	      b._stringRef = e;
	      return b;
	    }

	    "string" !== typeof a ? A$1("148") : void 0;
	    c._owner ? void 0 : A$1("254", a);
	  }

	  return a;
	}

	function wg(a, b) {
	  "textarea" !== a.type && A$1("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
	}

	function xg(a) {
	  function b(b, c) {
	    if (a) {
	      var d = b.lastEffect;
	      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
	      c.nextEffect = null;
	      c.effectTag = 8;
	    }
	  }

	  function c(c, d) {
	    if (!a) return null;

	    for (; null !== d;) b(c, d), d = d.sibling;

	    return null;
	  }

	  function d(a, b) {
	    for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;

	    return a;
	  }

	  function e(a, b, c) {
	    a = Af(a, b, c);
	    a.index = 0;
	    a.sibling = null;
	    return a;
	  }

	  function f(b, c, d) {
	    b.index = d;
	    if (!a) return c;
	    d = b.alternate;
	    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
	    b.effectTag = 2;
	    return c;
	  }

	  function g(b) {
	    a && null === b.alternate && (b.effectTag = 2);
	    return b;
	  }

	  function h(a, b, c, d) {
	    if (null === b || 6 !== b.tag) return b = Df(c, a.mode, d), b.return = a, b;
	    b = e(b, c, d);
	    b.return = a;
	    return b;
	  }

	  function k(a, b, c, d) {
	    if (null !== b && b.type === c.type) return d = e(b, c.props, d), d.ref = vg(a, b, c), d.return = a, d;
	    d = Bf(c, a.mode, d);
	    d.ref = vg(a, b, c);
	    d.return = a;
	    return d;
	  }

	  function n(a, b, c, d) {
	    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Ef(c, a.mode, d), b.return = a, b;
	    b = e(b, c.children || [], d);
	    b.return = a;
	    return b;
	  }

	  function r(a, b, c, d, f) {
	    if (null === b || 10 !== b.tag) return b = Cf(c, a.mode, d, f), b.return = a, b;
	    b = e(b, c, d);
	    b.return = a;
	    return b;
	  }

	  function w(a, b, c) {
	    if ("string" === typeof b || "number" === typeof b) return b = Df("" + b, a.mode, c), b.return = a, b;

	    if ("object" === typeof b && null !== b) {
	      switch (b.$$typeof) {
	        case gc:
	          return c = Bf(b, a.mode, c), c.ref = vg(a, null, b), c.return = a, c;

	        case hc:
	          return b = Ef(b, a.mode, c), b.return = a, b;
	      }

	      if (ug(b) || tc(b)) return b = Cf(b, a.mode, c, null), b.return = a, b;
	      wg(a, b);
	    }

	    return null;
	  }

	  function P(a, b, c, d) {
	    var e = null !== b ? b.key : null;
	    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

	    if ("object" === typeof c && null !== c) {
	      switch (c.$$typeof) {
	        case gc:
	          return c.key === e ? c.type === ic ? r(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

	        case hc:
	          return c.key === e ? n(a, b, c, d) : null;
	      }

	      if (ug(c) || tc(c)) return null !== e ? null : r(a, b, c, d, null);
	      wg(a, c);
	    }

	    return null;
	  }

	  function nc(a, b, c, d, e) {
	    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

	    if ("object" === typeof d && null !== d) {
	      switch (d.$$typeof) {
	        case gc:
	          return a = a.get(null === d.key ? c : d.key) || null, d.type === ic ? r(b, a, d.props.children, e, d.key) : k(b, a, d, e);

	        case hc:
	          return a = a.get(null === d.key ? c : d.key) || null, n(b, a, d, e);
	      }

	      if (ug(d) || tc(d)) return a = a.get(c) || null, r(b, a, d, e, null);
	      wg(b, d);
	    }

	    return null;
	  }

	  function Jd(e, g, h, k) {
	    for (var u = null, x = null, t = g, q = g = 0, n = null; null !== t && q < h.length; q++) {
	      t.index > q ? (n = t, t = null) : n = t.sibling;
	      var l = P(e, t, h[q], k);

	      if (null === l) {
	        null === t && (t = n);
	        break;
	      }

	      a && t && null === l.alternate && b(e, t);
	      g = f(l, g, q);
	      null === x ? u = l : x.sibling = l;
	      x = l;
	      t = n;
	    }

	    if (q === h.length) return c(e, t), u;

	    if (null === t) {
	      for (; q < h.length; q++) if (t = w(e, h[q], k)) g = f(t, g, q), null === x ? u = t : x.sibling = t, x = t;

	      return u;
	    }

	    for (t = d(e, t); q < h.length; q++) if (n = nc(t, e, q, h[q], k)) a && null !== n.alternate && t.delete(null === n.key ? q : n.key), g = f(n, g, q), null === x ? u = n : x.sibling = n, x = n;

	    a && t.forEach(function (a) {
	      return b(e, a);
	    });
	    return u;
	  }

	  function E(e, g, h, k) {
	    var u = tc(h);
	    "function" !== typeof u ? A$1("150") : void 0;
	    h = u.call(h);
	    null == h ? A$1("151") : void 0;

	    for (var t = u = null, n = g, x = g = 0, y = null, l = h.next(); null !== n && !l.done; x++, l = h.next()) {
	      n.index > x ? (y = n, n = null) : y = n.sibling;
	      var r = P(e, n, l.value, k);

	      if (null === r) {
	        n || (n = y);
	        break;
	      }

	      a && n && null === r.alternate && b(e, n);
	      g = f(r, g, x);
	      null === t ? u = r : t.sibling = r;
	      t = r;
	      n = y;
	    }

	    if (l.done) return c(e, n), u;

	    if (null === n) {
	      for (; !l.done; x++, l = h.next()) l = w(e, l.value, k), null !== l && (g = f(l, g, x), null === t ? u = l : t.sibling = l, t = l);

	      return u;
	    }

	    for (n = d(e, n); !l.done; x++, l = h.next()) l = nc(n, e, x, l.value, k), null !== l && (a && null !== l.alternate && n.delete(null === l.key ? x : l.key), g = f(l, g, x), null === t ? u = l : t.sibling = l, t = l);

	    a && n.forEach(function (a) {
	      return b(e, a);
	    });
	    return u;
	  }

	  return function (a, d, f, h) {
	    var k = "object" === typeof f && null !== f && f.type === ic && null === f.key;
	    k && (f = f.props.children);
	    var n = "object" === typeof f && null !== f;
	    if (n) switch (f.$$typeof) {
	      case gc:
	        a: {
	          n = f.key;

	          for (k = d; null !== k;) {
	            if (k.key === n) {
	              if (10 === k.tag ? f.type === ic : k.type === f.type) {
	                c(a, k.sibling);
	                d = e(k, f.type === ic ? f.props.children : f.props, h);
	                d.ref = vg(a, k, f);
	                d.return = a;
	                a = d;
	                break a;
	              } else {
	                c(a, k);
	                break;
	              }
	            } else b(a, k);
	            k = k.sibling;
	          }

	          f.type === ic ? (d = Cf(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Bf(f, a.mode, h), h.ref = vg(a, d, f), h.return = a, a = h);
	        }

	        return g(a);

	      case hc:
	        a: {
	          for (k = f.key; null !== d;) {
	            if (d.key === k) {
	              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
	                c(a, d.sibling);
	                d = e(d, f.children || [], h);
	                d.return = a;
	                a = d;
	                break a;
	              } else {
	                c(a, d);
	                break;
	              }
	            } else b(a, d);
	            d = d.sibling;
	          }

	          d = Ef(f, a.mode, h);
	          d.return = a;
	          a = d;
	        }

	        return g(a);
	    }
	    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = Df(f, a.mode, h), d.return = a, a = d), g(a);
	    if (ug(f)) return Jd(a, d, f, h);
	    if (tc(f)) return E(a, d, f, h);
	    n && wg(a, f);
	    if ("undefined" === typeof f && !k) switch (a.tag) {
	      case 2:
	      case 1:
	        h = a.type, A$1("152", h.displayName || h.name || "Component");
	    }
	    return c(a, d);
	  };
	}

	var yg = xg(!0),
	    zg = xg(!1),
	    Ag = null,
	    Bg = null,
	    Cg = !1;

	function Dg(a, b) {
	  var c = new zf(5, null, null, 0);
	  c.type = "DELETED";
	  c.stateNode = b;
	  c.return = a;
	  c.effectTag = 8;
	  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
	}

	function Eg(a, b) {
	  switch (a.tag) {
	    case 5:
	      var c = a.type;
	      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
	      return null !== b ? (a.stateNode = b, !0) : !1;

	    case 6:
	      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

	    default:
	      return !1;
	  }
	}

	function Fg(a) {
	  if (Cg) {
	    var b = Bg;

	    if (b) {
	      var c = b;

	      if (!Eg(a, b)) {
	        b = jf(c);

	        if (!b || !Eg(a, b)) {
	          a.effectTag |= 2;
	          Cg = !1;
	          Ag = a;
	          return;
	        }

	        Dg(Ag, c);
	      }

	      Ag = a;
	      Bg = kf(b);
	    } else a.effectTag |= 2, Cg = !1, Ag = a;
	  }
	}

	function Gg(a) {
	  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag;) a = a.return;

	  Ag = a;
	}

	function Hg(a) {
	  if (a !== Ag) return !1;
	  if (!Cg) return Gg(a), Cg = !0, !1;
	  var b = a.type;
	  if (5 !== a.tag || "head" !== b && "body" !== b && !ef(b, a.memoizedProps)) for (b = Bg; b;) Dg(a, b), b = jf(b);
	  Gg(a);
	  Bg = Ag ? jf(a.stateNode) : null;
	  return !0;
	}

	function Ig() {
	  Bg = Ag = null;
	  Cg = !1;
	}

	function Q$1(a, b, c) {
	  Jg(a, b, c, b.expirationTime);
	}

	function Jg(a, b, c, d) {
	  b.child = null === a ? zg(b, null, c, d) : yg(b, a.child, c, d);
	}

	function Kg(a, b) {
	  var c = b.ref;
	  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
	}

	function Lg(a, b, c, d, e) {
	  Kg(a, b);
	  var f = 0 !== (b.effectTag & 64);
	  if (!c && !f) return d && yf(b, !1), R$1(a, b);
	  c = b.stateNode;
	  ec.current = b;
	  var g = f ? null : c.render();
	  b.effectTag |= 1;
	  f && (Jg(a, b, null, e), b.child = null);
	  Jg(a, b, g, e);
	  b.memoizedState = c.state;
	  b.memoizedProps = c.props;
	  d && yf(b, !0);
	  return b.child;
	}

	function Mg(a) {
	  var b = a.stateNode;
	  b.pendingContext ? vf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && vf(a, b.context, !1);
	  jg(a, b.containerInfo);
	}

	function Ng(a, b, c, d) {
	  var e = a.child;
	  null !== e && (e.return = a);

	  for (; null !== e;) {
	    switch (e.tag) {
	      case 12:
	        var f = e.stateNode | 0;

	        if (e.type === b && 0 !== (f & c)) {
	          for (f = e; null !== f;) {
	            var g = f.alternate;
	            if (0 === f.expirationTime || f.expirationTime > d) f.expirationTime = d, null !== g && (0 === g.expirationTime || g.expirationTime > d) && (g.expirationTime = d);else if (null !== g && (0 === g.expirationTime || g.expirationTime > d)) g.expirationTime = d;else break;
	            f = f.return;
	          }

	          f = null;
	        } else f = e.child;

	        break;

	      case 13:
	        f = e.type === a.type ? null : e.child;
	        break;

	      default:
	        f = e.child;
	    }

	    if (null !== f) f.return = e;else for (f = e; null !== f;) {
	      if (f === a) {
	        f = null;
	        break;
	      }

	      e = f.sibling;

	      if (null !== e) {
	        e.return = f.return;
	        f = e;
	        break;
	      }

	      f = f.return;
	    }
	    e = f;
	  }
	}

	function Rg(a, b, c) {
	  var d = b.type._context,
	      e = b.pendingProps,
	      f = b.memoizedProps,
	      g = !0;
	  if (O$1.current) g = !1;else if (f === e) return b.stateNode = 0, bg(b), R$1(a, b);
	  var h = e.value;
	  b.memoizedProps = e;
	  if (null === f) h = 1073741823;else if (f.value === e.value) {
	    if (f.children === e.children && g) return b.stateNode = 0, bg(b), R$1(a, b);
	    h = 0;
	  } else {
	    var k = f.value;

	    if (k === h && (0 !== k || 1 / k === 1 / h) || k !== k && h !== h) {
	      if (f.children === e.children && g) return b.stateNode = 0, bg(b), R$1(a, b);
	      h = 0;
	    } else if (h = "function" === typeof d._calculateChangedBits ? d._calculateChangedBits(k, h) : 1073741823, h |= 0, 0 === h) {
	      if (f.children === e.children && g) return b.stateNode = 0, bg(b), R$1(a, b);
	    } else Ng(b, d, h, c);
	  }
	  b.stateNode = h;
	  bg(b);
	  Q$1(a, b, e.children);
	  return b.child;
	}

	function R$1(a, b) {
	  null !== a && b.child !== a.child ? A$1("153") : void 0;

	  if (null !== b.child) {
	    a = b.child;
	    var c = Af(a, a.pendingProps, a.expirationTime);
	    b.child = c;

	    for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Af(a, a.pendingProps, a.expirationTime), c.return = b;

	    c.sibling = null;
	  }

	  return b.child;
	}

	function Sg(a, b, c) {
	  if (0 === b.expirationTime || b.expirationTime > c) {
	    switch (b.tag) {
	      case 3:
	        Mg(b);
	        break;

	      case 2:
	        xf(b);
	        break;

	      case 4:
	        jg(b, b.stateNode.containerInfo);
	        break;

	      case 13:
	        bg(b);
	    }

	    return null;
	  }

	  switch (b.tag) {
	    case 0:
	      null !== a ? A$1("155") : void 0;
	      var d = b.type,
	          e = b.pendingProps,
	          f = qf(b);
	      f = sf(b, f);
	      d = d(e, f);
	      b.effectTag |= 1;
	      "object" === typeof d && null !== d && "function" === typeof d.render && void 0 === d.$$typeof ? (f = b.type, b.tag = 2, b.memoizedState = null !== d.state && void 0 !== d.state ? d.state : null, f = f.getDerivedStateFromProps, "function" === typeof f && mg(b, f, e), e = xf(b), d.updater = qg, b.stateNode = d, d._reactInternalFiber = b, tg(b, c), a = Lg(a, b, !0, e, c)) : (b.tag = 1, Q$1(a, b, d), b.memoizedProps = e, a = b.child);
	      return a;

	    case 1:
	      return e = b.type, c = b.pendingProps, O$1.current || b.memoizedProps !== c ? (d = qf(b), d = sf(b, d), e = e(c, d), b.effectTag |= 1, Q$1(a, b, e), b.memoizedProps = c, a = b.child) : a = R$1(a, b), a;

	    case 2:
	      e = xf(b);
	      if (null === a) {
	        if (null === b.stateNode) {
	          var g = b.pendingProps,
	              h = b.type;
	          d = qf(b);
	          var k = 2 === b.tag && null != b.type.contextTypes;
	          f = k ? sf(b, d) : emptyObject_1;
	          g = new h(g, f);
	          b.memoizedState = null !== g.state && void 0 !== g.state ? g.state : null;
	          g.updater = qg;
	          b.stateNode = g;
	          g._reactInternalFiber = b;
	          k && (k = b.stateNode, k.__reactInternalMemoizedUnmaskedChildContext = d, k.__reactInternalMemoizedMaskedChildContext = f);
	          tg(b, c);
	          d = !0;
	        } else {
	          h = b.type;
	          d = b.stateNode;
	          k = b.memoizedProps;
	          f = b.pendingProps;
	          d.props = k;
	          var n = d.context;
	          g = qf(b);
	          g = sf(b, g);
	          var r = h.getDerivedStateFromProps;
	          (h = "function" === typeof r || "function" === typeof d.getSnapshotBeforeUpdate) || "function" !== typeof d.UNSAFE_componentWillReceiveProps && "function" !== typeof d.componentWillReceiveProps || (k !== f || n !== g) && sg(b, d, f, g);
	          Mf = !1;
	          var w = b.memoizedState;
	          n = d.state = w;
	          var P = b.updateQueue;
	          null !== P && (Vf(b, P, f, d, c), n = b.memoizedState);
	          k !== f || w !== n || O$1.current || Mf ? ("function" === typeof r && (mg(b, r, f), n = b.memoizedState), (k = Mf || rg(b, k, f, w, n, g)) ? (h || "function" !== typeof d.UNSAFE_componentWillMount && "function" !== typeof d.componentWillMount || ("function" === typeof d.componentWillMount && d.componentWillMount(), "function" === typeof d.UNSAFE_componentWillMount && d.UNSAFE_componentWillMount()), "function" === typeof d.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof d.componentDidMount && (b.effectTag |= 4), b.memoizedProps = f, b.memoizedState = n), d.props = f, d.state = n, d.context = g, d = k) : ("function" === typeof d.componentDidMount && (b.effectTag |= 4), d = !1);
	        }
	      } else h = b.type, d = b.stateNode, f = b.memoizedProps, k = b.pendingProps, d.props = f, n = d.context, g = qf(b), g = sf(b, g), r = h.getDerivedStateFromProps, (h = "function" === typeof r || "function" === typeof d.getSnapshotBeforeUpdate) || "function" !== typeof d.UNSAFE_componentWillReceiveProps && "function" !== typeof d.componentWillReceiveProps || (f !== k || n !== g) && sg(b, d, k, g), Mf = !1, n = b.memoizedState, w = d.state = n, P = b.updateQueue, null !== P && (Vf(b, P, k, d, c), w = b.memoizedState), f !== k || n !== w || O$1.current || Mf ? ("function" === typeof r && (mg(b, r, k), w = b.memoizedState), (r = Mf || rg(b, f, k, n, w, g)) ? (h || "function" !== typeof d.UNSAFE_componentWillUpdate && "function" !== typeof d.componentWillUpdate || ("function" === typeof d.componentWillUpdate && d.componentWillUpdate(k, w, g), "function" === typeof d.UNSAFE_componentWillUpdate && d.UNSAFE_componentWillUpdate(k, w, g)), "function" === typeof d.componentDidUpdate && (b.effectTag |= 4), "function" === typeof d.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof d.componentDidUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 4), "function" !== typeof d.getSnapshotBeforeUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = k, b.memoizedState = w), d.props = k, d.state = w, d.context = g, d = r) : ("function" !== typeof d.componentDidUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 4), "function" !== typeof d.getSnapshotBeforeUpdate || f === a.memoizedProps && n === a.memoizedState || (b.effectTag |= 256), d = !1);
	      return Lg(a, b, d, e, c);

	    case 3:
	      Mg(b);
	      e = b.updateQueue;
	      if (null !== e) {
	        if (d = b.memoizedState, d = null !== d ? d.element : null, Vf(b, e, b.pendingProps, null, c), e = b.memoizedState.element, e === d) Ig(), a = R$1(a, b);else {
	          d = b.stateNode;
	          if (d = (null === a || null === a.child) && d.hydrate) Bg = kf(b.stateNode.containerInfo), Ag = b, d = Cg = !0;
	          d ? (b.effectTag |= 2, b.child = zg(b, null, e, c)) : (Ig(), Q$1(a, b, e));
	          a = b.child;
	        }
	      } else Ig(), a = R$1(a, b);
	      return a;

	    case 5:
	      a: {
	        hg(gg.current);
	        e = hg(eg.current);
	        d = Ie(e, b.type);
	        e !== d && (N$1(fg, b, b), N$1(eg, d, b));
	        null === a && Fg(b);
	        e = b.type;
	        k = b.memoizedProps;
	        d = b.pendingProps;
	        f = null !== a ? a.memoizedProps : null;

	        if (!O$1.current && k === d) {
	          if (k = b.mode & 1 && !!d.hidden) b.expirationTime = 1073741823;

	          if (!k || 1073741823 !== c) {
	            a = R$1(a, b);
	            break a;
	          }
	        }

	        k = d.children;
	        ef(e, d) ? k = null : f && ef(e, f) && (b.effectTag |= 16);
	        Kg(a, b);
	        1073741823 !== c && b.mode & 1 && d.hidden ? (b.expirationTime = 1073741823, b.memoizedProps = d, a = null) : (Q$1(a, b, k), b.memoizedProps = d, a = b.child);
	      }

	      return a;

	    case 6:
	      return null === a && Fg(b), b.memoizedProps = b.pendingProps, null;

	    case 16:
	      return null;

	    case 4:
	      return jg(b, b.stateNode.containerInfo), e = b.pendingProps, O$1.current || b.memoizedProps !== e ? (null === a ? b.child = yg(b, null, e, c) : Q$1(a, b, e), b.memoizedProps = e, a = b.child) : a = R$1(a, b), a;

	    case 14:
	      return e = b.type.render, c = b.pendingProps, d = b.ref, O$1.current || b.memoizedProps !== c || d !== (null !== a ? a.ref : null) ? (e = e(c, d), Q$1(a, b, e), b.memoizedProps = c, a = b.child) : a = R$1(a, b), a;

	    case 10:
	      return c = b.pendingProps, O$1.current || b.memoizedProps !== c ? (Q$1(a, b, c), b.memoizedProps = c, a = b.child) : a = R$1(a, b), a;

	    case 11:
	      return c = b.pendingProps.children, O$1.current || null !== c && b.memoizedProps !== c ? (Q$1(a, b, c), b.memoizedProps = c, a = b.child) : a = R$1(a, b), a;

	    case 15:
	      return c = b.pendingProps, b.memoizedProps === c ? a = R$1(a, b) : (Q$1(a, b, c.children), b.memoizedProps = c, a = b.child), a;

	    case 13:
	      return Rg(a, b, c);

	    case 12:
	      a: if (d = b.type, f = b.pendingProps, k = b.memoizedProps, e = d._currentValue, g = d._changedBits, O$1.current || 0 !== g || k !== f) {
	        b.memoizedProps = f;
	        h = f.unstable_observedBits;
	        if (void 0 === h || null === h) h = 1073741823;
	        b.stateNode = h;
	        if (0 !== (g & h)) Ng(b, d, g, c);else if (k === f) {
	          a = R$1(a, b);
	          break a;
	        }
	        c = f.children;
	        c = c(e);
	        b.effectTag |= 1;
	        Q$1(a, b, c);
	        a = b.child;
	      } else a = R$1(a, b);

	      return a;

	    default:
	      A$1("156");
	  }
	}

	function Tg(a) {
	  a.effectTag |= 4;
	}

	var Ug = void 0,
	    Vg = void 0,
	    Wg = void 0;

	Ug = function () {};

	Vg = function (a, b, c) {
	  (b.updateQueue = c) && Tg(b);
	};

	Wg = function (a, b, c, d) {
	  c !== d && Tg(b);
	};

	function Xg(a, b) {
	  var c = b.pendingProps;

	  switch (b.tag) {
	    case 1:
	      return null;

	    case 2:
	      return tf(b), null;

	    case 3:
	      kg(b);
	      uf(b);
	      var d = b.stateNode;
	      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
	      if (null === a || null === a.child) Hg(b), b.effectTag &= -3;
	      Ug(b);
	      return null;

	    case 5:
	      lg(b);
	      d = hg(gg.current);
	      var e = b.type;

	      if (null !== a && null != b.stateNode) {
	        var f = a.memoizedProps,
	            g = b.stateNode,
	            h = hg(eg.current);
	        g = Xe(g, e, f, c, d);
	        Vg(a, b, g, e, f, c, d, h);
	        a.ref !== b.ref && (b.effectTag |= 128);
	      } else {
	        if (!c) return null === b.stateNode ? A$1("166") : void 0, null;
	        a = hg(eg.current);
	        if (Hg(b)) c = b.stateNode, e = b.type, f = b.memoizedProps, c[C$1] = b, c[Ma] = f, d = Ze(c, e, f, a, d), b.updateQueue = d, null !== d && Tg(b);else {
	          a = Ue(e, c, d, a);
	          a[C$1] = b;
	          a[Ma] = c;

	          a: for (f = b.child; null !== f;) {
	            if (5 === f.tag || 6 === f.tag) a.appendChild(f.stateNode);else if (4 !== f.tag && null !== f.child) {
	              f.child.return = f;
	              f = f.child;
	              continue;
	            }
	            if (f === b) break;

	            for (; null === f.sibling;) {
	              if (null === f.return || f.return === b) break a;
	              f = f.return;
	            }

	            f.sibling.return = f.return;
	            f = f.sibling;
	          }

	          We(a, e, c, d);
	          df(e, c) && Tg(b);
	          b.stateNode = a;
	        }
	        null !== b.ref && (b.effectTag |= 128);
	      }

	      return null;

	    case 6:
	      if (a && null != b.stateNode) Wg(a, b, a.memoizedProps, c);else {
	        if ("string" !== typeof c) return null === b.stateNode ? A$1("166") : void 0, null;
	        d = hg(gg.current);
	        hg(eg.current);
	        Hg(b) ? (d = b.stateNode, c = b.memoizedProps, d[C$1] = b, $e(d, c) && Tg(b)) : (d = Ve(c, d), d[C$1] = b, b.stateNode = d);
	      }
	      return null;

	    case 14:
	      return null;

	    case 16:
	      return null;

	    case 10:
	      return null;

	    case 11:
	      return null;

	    case 15:
	      return null;

	    case 4:
	      return kg(b), Ug(b), null;

	    case 13:
	      return cg(b), null;

	    case 12:
	      return null;

	    case 0:
	      A$1("167");

	    default:
	      A$1("156");
	  }
	}

	function Yg(a, b) {
	  var c = b.source;
	  null === b.stack && null !== c && vc(c);
	  null !== c && uc(c);
	  b = b.value;
	  null !== a && 2 === a.tag && uc(a);

	  try {
	    b && b.suppressReactErrorLogging || console.error(b);
	  } catch (d) {
	    d && d.suppressReactErrorLogging || console.error(d);
	  }
	}

	function Zg(a) {
	  var b = a.ref;
	  if (null !== b) if ("function" === typeof b) try {
	    b(null);
	  } catch (c) {
	    $g(a, c);
	  } else b.current = null;
	}

	function ah(a) {
	  "function" === typeof Lf && Lf(a);

	  switch (a.tag) {
	    case 2:
	      Zg(a);
	      var b = a.stateNode;
	      if ("function" === typeof b.componentWillUnmount) try {
	        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
	      } catch (c) {
	        $g(a, c);
	      }
	      break;

	    case 5:
	      Zg(a);
	      break;

	    case 4:
	      bh(a);
	  }
	}

	function ch(a) {
	  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
	}

	function dh(a) {
	  a: {
	    for (var b = a.return; null !== b;) {
	      if (ch(b)) {
	        var c = b;
	        break a;
	      }

	      b = b.return;
	    }

	    A$1("160");
	    c = void 0;
	  }

	  var d = b = void 0;

	  switch (c.tag) {
	    case 5:
	      b = c.stateNode;
	      d = !1;
	      break;

	    case 3:
	      b = c.stateNode.containerInfo;
	      d = !0;
	      break;

	    case 4:
	      b = c.stateNode.containerInfo;
	      d = !0;
	      break;

	    default:
	      A$1("161");
	  }

	  c.effectTag & 16 && (Le(b, ""), c.effectTag &= -17);

	  a: b: for (c = a;;) {
	    for (; null === c.sibling;) {
	      if (null === c.return || ch(c.return)) {
	        c = null;
	        break a;
	      }

	      c = c.return;
	    }

	    c.sibling.return = c.return;

	    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag;) {
	      if (c.effectTag & 2) continue b;
	      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
	    }

	    if (!(c.effectTag & 2)) {
	      c = c.stateNode;
	      break a;
	    }
	  }

	  for (var e = a;;) {
	    if (5 === e.tag || 6 === e.tag) {
	      if (c) {
	        if (d) {
	          var f = b,
	              g = e.stateNode,
	              h = c;
	          8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
	        } else b.insertBefore(e.stateNode, c);
	      } else d ? (f = b, g = e.stateNode, 8 === f.nodeType ? f.parentNode.insertBefore(g, f) : f.appendChild(g)) : b.appendChild(e.stateNode);
	    } else if (4 !== e.tag && null !== e.child) {
	      e.child.return = e;
	      e = e.child;
	      continue;
	    }
	    if (e === a) break;

	    for (; null === e.sibling;) {
	      if (null === e.return || e.return === a) return;
	      e = e.return;
	    }

	    e.sibling.return = e.return;
	    e = e.sibling;
	  }
	}

	function bh(a) {
	  for (var b = a, c = !1, d = void 0, e = void 0;;) {
	    if (!c) {
	      c = b.return;

	      a: for (;;) {
	        null === c ? A$1("160") : void 0;

	        switch (c.tag) {
	          case 5:
	            d = c.stateNode;
	            e = !1;
	            break a;

	          case 3:
	            d = c.stateNode.containerInfo;
	            e = !0;
	            break a;

	          case 4:
	            d = c.stateNode.containerInfo;
	            e = !0;
	            break a;
	        }

	        c = c.return;
	      }

	      c = !0;
	    }

	    if (5 === b.tag || 6 === b.tag) {
	      a: for (var f = b, g = f;;) if (ah(g), null !== g.child && 4 !== g.tag) g.child.return = g, g = g.child;else {
	        if (g === f) break;

	        for (; null === g.sibling;) {
	          if (null === g.return || g.return === f) break a;
	          g = g.return;
	        }

	        g.sibling.return = g.return;
	        g = g.sibling;
	      }

	      e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
	    } else if (4 === b.tag ? d = b.stateNode.containerInfo : ah(b), null !== b.child) {
	      b.child.return = b;
	      b = b.child;
	      continue;
	    }

	    if (b === a) break;

	    for (; null === b.sibling;) {
	      if (null === b.return || b.return === a) return;
	      b = b.return;
	      4 === b.tag && (c = !1);
	    }

	    b.sibling.return = b.return;
	    b = b.sibling;
	  }
	}

	function eh(a, b) {
	  switch (b.tag) {
	    case 2:
	      break;

	    case 5:
	      var c = b.stateNode;

	      if (null != c) {
	        var d = b.memoizedProps;
	        a = null !== a ? a.memoizedProps : d;
	        var e = b.type,
	            f = b.updateQueue;
	        b.updateQueue = null;
	        null !== f && (c[Ma] = d, Ye(c, f, e, a, d));
	      }

	      break;

	    case 6:
	      null === b.stateNode ? A$1("162") : void 0;
	      b.stateNode.nodeValue = b.memoizedProps;
	      break;

	    case 3:
	      break;

	    case 15:
	      break;

	    case 16:
	      break;

	    default:
	      A$1("163");
	  }
	}

	function fh(a, b, c) {
	  c = Pf(c);
	  c.tag = 3;
	  c.payload = {
	    element: null
	  };
	  var d = b.value;

	  c.callback = function () {
	    gh(d);
	    Yg(a, b);
	  };

	  return c;
	}

	function hh(a, b, c) {
	  c = Pf(c);
	  c.tag = 3;
	  var d = a.stateNode;
	  null !== d && "function" === typeof d.componentDidCatch && (c.callback = function () {
	    null === ih ? ih = new Set([this]) : ih.add(this);
	    var c = b.value,
	        d = b.stack;
	    Yg(a, b);
	    this.componentDidCatch(c, {
	      componentStack: null !== d ? d : ""
	    });
	  });
	  return c;
	}

	function jh(a, b, c, d, e, f) {
	  c.effectTag |= 512;
	  c.firstEffect = c.lastEffect = null;
	  d = Yf(d, c);
	  a = b;

	  do {
	    switch (a.tag) {
	      case 3:
	        a.effectTag |= 1024;
	        d = fh(a, d, f);
	        Sf(a, d, f);
	        return;

	      case 2:
	        if (b = d, c = a.stateNode, 0 === (a.effectTag & 64) && null !== c && "function" === typeof c.componentDidCatch && (null === ih || !ih.has(c))) {
	          a.effectTag |= 1024;
	          d = hh(a, b, f);
	          Sf(a, d, f);
	          return;
	        }

	    }

	    a = a.return;
	  } while (null !== a);
	}

	function kh(a) {
	  switch (a.tag) {
	    case 2:
	      tf(a);
	      var b = a.effectTag;
	      return b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 3:
	      return kg(a), uf(a), b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 5:
	      return lg(a), null;

	    case 16:
	      return b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 4:
	      return kg(a), null;

	    case 13:
	      return cg(a), null;

	    default:
	      return null;
	  }
	}

	var lh = ff(),
	    mh = 2,
	    nh = lh,
	    oh = 0,
	    ph = 0,
	    qh = !1,
	    S$1 = null,
	    rh = null,
	    T$1 = 0,
	    sh = -1,
	    th = !1,
	    U$1 = null,
	    uh = !1,
	    vh = !1,
	    ih = null;

	function wh() {
	  if (null !== S$1) for (var a = S$1.return; null !== a;) {
	    var b = a;

	    switch (b.tag) {
	      case 2:
	        tf(b);
	        break;

	      case 3:
	        kg(b);
	        uf(b);
	        break;

	      case 5:
	        lg(b);
	        break;

	      case 4:
	        kg(b);
	        break;

	      case 13:
	        cg(b);
	    }

	    a = a.return;
	  }
	  rh = null;
	  T$1 = 0;
	  sh = -1;
	  th = !1;
	  S$1 = null;
	  vh = !1;
	}

	function xh(a) {
	  for (;;) {
	    var b = a.alternate,
	        c = a.return,
	        d = a.sibling;

	    if (0 === (a.effectTag & 512)) {
	      b = Xg(b, a, T$1);
	      var e = a;

	      if (1073741823 === T$1 || 1073741823 !== e.expirationTime) {
	        var f = 0;

	        switch (e.tag) {
	          case 3:
	          case 2:
	            var g = e.updateQueue;
	            null !== g && (f = g.expirationTime);
	        }

	        for (g = e.child; null !== g;) 0 !== g.expirationTime && (0 === f || f > g.expirationTime) && (f = g.expirationTime), g = g.sibling;

	        e.expirationTime = f;
	      }

	      if (null !== b) return b;
	      null !== c && 0 === (c.effectTag & 512) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));
	      if (null !== d) return d;
	      if (null !== c) a = c;else {
	        vh = !0;
	        break;
	      }
	    } else {
	      a = kh(a, th, T$1);
	      if (null !== a) return a.effectTag &= 511, a;
	      null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 512);
	      if (null !== d) return d;
	      if (null !== c) a = c;else break;
	    }
	  }

	  return null;
	}

	function yh(a) {
	  var b = Sg(a.alternate, a, T$1);
	  null === b && (b = xh(a));
	  ec.current = null;
	  return b;
	}

	function zh(a, b, c) {
	  qh ? A$1("243") : void 0;
	  qh = !0;
	  if (b !== T$1 || a !== rh || null === S$1) wh(), rh = a, T$1 = b, sh = -1, S$1 = Af(rh.current, null, T$1), a.pendingCommitExpirationTime = 0;
	  var d = !1;
	  th = !c || T$1 <= mh;

	  do {
	    try {
	      if (c) for (; null !== S$1 && !Ah();) S$1 = yh(S$1);else for (; null !== S$1;) S$1 = yh(S$1);
	    } catch (f) {
	      if (null === S$1) d = !0, gh(f);else {
	        null === S$1 ? A$1("271") : void 0;
	        c = S$1;
	        var e = c.return;

	        if (null === e) {
	          d = !0;
	          gh(f);
	          break;
	        }

	        jh(a, e, c, f, th, T$1, nh);
	        S$1 = xh(c);
	      }
	    }

	    break;
	  } while (1);

	  qh = !1;
	  if (d) return null;

	  if (null === S$1) {
	    if (vh) return a.pendingCommitExpirationTime = b, a.current.alternate;
	    th ? A$1("262") : void 0;
	    0 <= sh && setTimeout(function () {
	      var b = a.current.expirationTime;
	      0 !== b && (0 === a.remainingExpirationTime || a.remainingExpirationTime < b) && Bh(a, b);
	    }, sh);
	    Ch(a.current.expirationTime);
	  }

	  return null;
	}

	function $g(a, b) {
	  var c;

	  a: {
	    qh && !uh ? A$1("263") : void 0;

	    for (c = a.return; null !== c;) {
	      switch (c.tag) {
	        case 2:
	          var d = c.stateNode;

	          if ("function" === typeof c.type.getDerivedStateFromCatch || "function" === typeof d.componentDidCatch && (null === ih || !ih.has(d))) {
	            a = Yf(b, a);
	            a = hh(c, a, 1);
	            Rf(c, a, 1);
	            pg(c, 1);
	            c = void 0;
	            break a;
	          }

	          break;

	        case 3:
	          a = Yf(b, a);
	          a = fh(c, a, 1);
	          Rf(c, a, 1);
	          pg(c, 1);
	          c = void 0;
	          break a;
	      }

	      c = c.return;
	    }

	    3 === a.tag && (c = Yf(b, a), c = fh(a, c, 1), Rf(a, c, 1), pg(a, 1));
	    c = void 0;
	  }

	  return c;
	}

	function Dh() {
	  var a = 2 + 25 * (((ng() - 2 + 500) / 25 | 0) + 1);
	  a <= oh && (a = oh + 1);
	  return oh = a;
	}

	function og(a, b) {
	  a = 0 !== ph ? ph : qh ? uh ? 1 : T$1 : b.mode & 1 ? Eh ? 2 + 10 * (((a - 2 + 15) / 10 | 0) + 1) : 2 + 25 * (((a - 2 + 500) / 25 | 0) + 1) : 1;
	  Eh && (0 === Fh || a > Fh) && (Fh = a);
	  return a;
	}

	function pg(a, b) {
	  for (; null !== a;) {
	    if (0 === a.expirationTime || a.expirationTime > b) a.expirationTime = b;
	    null !== a.alternate && (0 === a.alternate.expirationTime || a.alternate.expirationTime > b) && (a.alternate.expirationTime = b);
	    if (null === a.return) if (3 === a.tag) {
	      var c = a.stateNode;
	      !qh && 0 !== T$1 && b < T$1 && wh();
	      var d = c.current.expirationTime;
	      qh && !uh && rh === c || Bh(c, d);
	      Gh > Hh && A$1("185");
	    } else break;
	    a = a.return;
	  }
	}

	function ng() {
	  nh = ff() - lh;
	  return mh = (nh / 10 | 0) + 2;
	}

	function Ih(a) {
	  var b = ph;
	  ph = 2 + 25 * (((ng() - 2 + 500) / 25 | 0) + 1);

	  try {
	    return a();
	  } finally {
	    ph = b;
	  }
	}

	function Jh(a, b, c, d, e) {
	  var f = ph;
	  ph = 1;

	  try {
	    return a(b, c, d, e);
	  } finally {
	    ph = f;
	  }
	}

	var Kh = null,
	    V$1 = null,
	    Lh = 0,
	    Mh = void 0,
	    W$1 = !1,
	    X$1 = null,
	    Y$1 = 0,
	    Fh = 0,
	    Nh = !1,
	    Oh = !1,
	    Ph = null,
	    Qh = null,
	    Z$1 = !1,
	    Rh = !1,
	    Eh = !1,
	    Sh = null,
	    Hh = 1E3,
	    Gh = 0,
	    Th = 1;

	function Uh(a) {
	  if (0 !== Lh) {
	    if (a > Lh) return;
	    null !== Mh && hf(Mh);
	  }

	  var b = ff() - lh;
	  Lh = a;
	  Mh = gf(Vh, {
	    timeout: 10 * (a - 2) - b
	  });
	}

	function Bh(a, b) {
	  if (null === a.nextScheduledRoot) a.remainingExpirationTime = b, null === V$1 ? (Kh = V$1 = a, a.nextScheduledRoot = a) : (V$1 = V$1.nextScheduledRoot = a, V$1.nextScheduledRoot = Kh);else {
	    var c = a.remainingExpirationTime;
	    if (0 === c || b < c) a.remainingExpirationTime = b;
	  }
	  W$1 || (Z$1 ? Rh && (X$1 = a, Y$1 = 1, Wh(a, 1, !1)) : 1 === b ? Xh() : Uh(b));
	}

	function Yh() {
	  var a = 0,
	      b = null;
	  if (null !== V$1) for (var c = V$1, d = Kh; null !== d;) {
	    var e = d.remainingExpirationTime;

	    if (0 === e) {
	      null === c || null === V$1 ? A$1("244") : void 0;

	      if (d === d.nextScheduledRoot) {
	        Kh = V$1 = d.nextScheduledRoot = null;
	        break;
	      } else if (d === Kh) Kh = e = d.nextScheduledRoot, V$1.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === V$1) {
	        V$1 = c;
	        V$1.nextScheduledRoot = Kh;
	        d.nextScheduledRoot = null;
	        break;
	      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;

	      d = c.nextScheduledRoot;
	    } else {
	      if (0 === a || e < a) a = e, b = d;
	      if (d === V$1) break;
	      c = d;
	      d = d.nextScheduledRoot;
	    }
	  }
	  c = X$1;
	  null !== c && c === b && 1 === a ? Gh++ : Gh = 0;
	  X$1 = b;
	  Y$1 = a;
	}

	function Vh(a) {
	  Zh(0, !0, a);
	}

	function Xh() {
	  Zh(1, !1, null);
	}

	function Zh(a, b, c) {
	  Qh = c;
	  Yh();
	  if (b) for (; null !== X$1 && 0 !== Y$1 && (0 === a || a >= Y$1) && (!Nh || ng() >= Y$1);) ng(), Wh(X$1, Y$1, !Nh), Yh();else for (; null !== X$1 && 0 !== Y$1 && (0 === a || a >= Y$1);) Wh(X$1, Y$1, !1), Yh();
	  null !== Qh && (Lh = 0, Mh = null);
	  0 !== Y$1 && Uh(Y$1);
	  Qh = null;
	  Nh = !1;
	  $h();
	}

	function ai(a, b) {
	  W$1 ? A$1("253") : void 0;
	  X$1 = a;
	  Y$1 = b;
	  Wh(a, b, !1);
	  Xh();
	  $h();
	}

	function $h() {
	  Gh = 0;

	  if (null !== Sh) {
	    var a = Sh;
	    Sh = null;

	    for (var b = 0; b < a.length; b++) {
	      var c = a[b];

	      try {
	        c._onComplete();
	      } catch (d) {
	        Oh || (Oh = !0, Ph = d);
	      }
	    }
	  }

	  if (Oh) throw a = Ph, Ph = null, Oh = !1, a;
	}

	function Wh(a, b, c) {
	  W$1 ? A$1("245") : void 0;
	  W$1 = !0;
	  c ? (c = a.finishedWork, null !== c ? bi(a, c, b) : (c = zh(a, b, !0), null !== c && (Ah() ? a.finishedWork = c : bi(a, c, b)))) : (c = a.finishedWork, null !== c ? bi(a, c, b) : (c = zh(a, b, !1), null !== c && bi(a, c, b)));
	  W$1 = !1;
	}

	function bi(a, b, c) {
	  var d = a.firstBatch;

	  if (null !== d && d._expirationTime <= c && (null === Sh ? Sh = [d] : Sh.push(d), d._defer)) {
	    a.finishedWork = b;
	    a.remainingExpirationTime = 0;
	    return;
	  }

	  a.finishedWork = null;
	  uh = qh = !0;
	  c = b.stateNode;
	  c.current === b ? A$1("177") : void 0;
	  d = c.pendingCommitExpirationTime;
	  0 === d ? A$1("261") : void 0;
	  c.pendingCommitExpirationTime = 0;
	  ng();
	  ec.current = null;
	  if (1 < b.effectTag) {
	    if (null !== b.lastEffect) {
	      b.lastEffect.nextEffect = b;
	      var e = b.firstEffect;
	    } else e = b;
	  } else e = b.firstEffect;
	  bf = Id;
	  var f = getActiveElement_1();

	  if (Vd(f)) {
	    if ("selectionStart" in f) var g = {
	      start: f.selectionStart,
	      end: f.selectionEnd
	    };else a: {
	      var h = window.getSelection && window.getSelection();

	      if (h && 0 !== h.rangeCount) {
	        g = h.anchorNode;
	        var k = h.anchorOffset,
	            n = h.focusNode;
	        h = h.focusOffset;

	        try {
	          g.nodeType, n.nodeType;
	        } catch (Wa) {
	          g = null;
	          break a;
	        }

	        var r = 0,
	            w = -1,
	            P = -1,
	            nc = 0,
	            Jd = 0,
	            E = f,
	            t = null;

	        b: for (;;) {
	          for (var x;;) {
	            E !== g || 0 !== k && 3 !== E.nodeType || (w = r + k);
	            E !== n || 0 !== h && 3 !== E.nodeType || (P = r + h);
	            3 === E.nodeType && (r += E.nodeValue.length);
	            if (null === (x = E.firstChild)) break;
	            t = E;
	            E = x;
	          }

	          for (;;) {
	            if (E === f) break b;
	            t === g && ++nc === k && (w = r);
	            t === n && ++Jd === h && (P = r);
	            if (null !== (x = E.nextSibling)) break;
	            E = t;
	            t = E.parentNode;
	          }

	          E = x;
	        }

	        g = -1 === w || -1 === P ? null : {
	          start: w,
	          end: P
	        };
	      } else g = null;
	    }
	    g = g || {
	      start: 0,
	      end: 0
	    };
	  } else g = null;

	  cf = {
	    focusedElem: f,
	    selectionRange: g
	  };
	  Kd(!1);

	  for (U$1 = e; null !== U$1;) {
	    f = !1;
	    g = void 0;

	    try {
	      for (; null !== U$1;) {
	        if (U$1.effectTag & 256) {
	          var u = U$1.alternate;
	          k = U$1;

	          switch (k.tag) {
	            case 2:
	              if (k.effectTag & 256 && null !== u) {
	                var y = u.memoizedProps,
	                    D = u.memoizedState,
	                    ja = k.stateNode;
	                ja.props = k.memoizedProps;
	                ja.state = k.memoizedState;
	                var ni = ja.getSnapshotBeforeUpdate(y, D);
	                ja.__reactInternalSnapshotBeforeUpdate = ni;
	              }

	              break;

	            case 3:
	            case 5:
	            case 6:
	            case 4:
	              break;

	            default:
	              A$1("163");
	          }
	        }

	        U$1 = U$1.nextEffect;
	      }
	    } catch (Wa) {
	      f = !0, g = Wa;
	    }

	    f && (null === U$1 ? A$1("178") : void 0, $g(U$1, g), null !== U$1 && (U$1 = U$1.nextEffect));
	  }

	  for (U$1 = e; null !== U$1;) {
	    u = !1;
	    y = void 0;

	    try {
	      for (; null !== U$1;) {
	        var q = U$1.effectTag;
	        q & 16 && Le(U$1.stateNode, "");

	        if (q & 128) {
	          var z = U$1.alternate;

	          if (null !== z) {
	            var l = z.ref;
	            null !== l && ("function" === typeof l ? l(null) : l.current = null);
	          }
	        }

	        switch (q & 14) {
	          case 2:
	            dh(U$1);
	            U$1.effectTag &= -3;
	            break;

	          case 6:
	            dh(U$1);
	            U$1.effectTag &= -3;
	            eh(U$1.alternate, U$1);
	            break;

	          case 4:
	            eh(U$1.alternate, U$1);
	            break;

	          case 8:
	            D = U$1, bh(D), D.return = null, D.child = null, D.alternate && (D.alternate.child = null, D.alternate.return = null);
	        }

	        U$1 = U$1.nextEffect;
	      }
	    } catch (Wa) {
	      u = !0, y = Wa;
	    }

	    u && (null === U$1 ? A$1("178") : void 0, $g(U$1, y), null !== U$1 && (U$1 = U$1.nextEffect));
	  }

	  l = cf;
	  z = getActiveElement_1();
	  q = l.focusedElem;
	  u = l.selectionRange;

	  if (z !== q && containsNode_1(document.documentElement, q)) {
	    null !== u && Vd(q) && (z = u.start, l = u.end, void 0 === l && (l = z), "selectionStart" in q ? (q.selectionStart = z, q.selectionEnd = Math.min(l, q.value.length)) : window.getSelection && (z = window.getSelection(), y = q[lb()].length, l = Math.min(u.start, y), u = void 0 === u.end ? l : Math.min(u.end, y), !z.extend && l > u && (y = u, u = l, l = y), y = Ud(q, l), D = Ud(q, u), y && D && (1 !== z.rangeCount || z.anchorNode !== y.node || z.anchorOffset !== y.offset || z.focusNode !== D.node || z.focusOffset !== D.offset) && (ja = document.createRange(), ja.setStart(y.node, y.offset), z.removeAllRanges(), l > u ? (z.addRange(ja), z.extend(D.node, D.offset)) : (ja.setEnd(D.node, D.offset), z.addRange(ja)))));
	    z = [];

	    for (l = q; l = l.parentNode;) 1 === l.nodeType && z.push({
	      element: l,
	      left: l.scrollLeft,
	      top: l.scrollTop
	    });

	    "function" === typeof q.focus && q.focus();

	    for (q = 0; q < z.length; q++) l = z[q], l.element.scrollLeft = l.left, l.element.scrollTop = l.top;
	  }

	  cf = null;
	  Kd(bf);
	  bf = null;
	  c.current = b;

	  for (U$1 = e; null !== U$1;) {
	    e = !1;
	    q = void 0;

	    try {
	      for (z = d; null !== U$1;) {
	        var ig = U$1.effectTag;

	        if (ig & 36) {
	          var oc = U$1.alternate;
	          l = U$1;
	          u = z;

	          switch (l.tag) {
	            case 2:
	              var ca = l.stateNode;
	              if (l.effectTag & 4) if (null === oc) ca.props = l.memoizedProps, ca.state = l.memoizedState, ca.componentDidMount();else {
	                var xi = oc.memoizedProps,
	                    yi = oc.memoizedState;
	                ca.props = l.memoizedProps;
	                ca.state = l.memoizedState;
	                ca.componentDidUpdate(xi, yi, ca.__reactInternalSnapshotBeforeUpdate);
	              }
	              var Og = l.updateQueue;
	              null !== Og && (ca.props = l.memoizedProps, ca.state = l.memoizedState, Xf(l, Og, ca, u));
	              break;

	            case 3:
	              var Pg = l.updateQueue;

	              if (null !== Pg) {
	                y = null;
	                if (null !== l.child) switch (l.child.tag) {
	                  case 5:
	                    y = l.child.stateNode;
	                    break;

	                  case 2:
	                    y = l.child.stateNode;
	                }
	                Xf(l, Pg, y, u);
	              }

	              break;

	            case 5:
	              var zi = l.stateNode;
	              null === oc && l.effectTag & 4 && df(l.type, l.memoizedProps) && zi.focus();
	              break;

	            case 6:
	              break;

	            case 4:
	              break;

	            case 15:
	              break;

	            case 16:
	              break;

	            default:
	              A$1("163");
	          }
	        }

	        if (ig & 128) {
	          l = void 0;
	          var yc = U$1.ref;

	          if (null !== yc) {
	            var Qg = U$1.stateNode;

	            switch (U$1.tag) {
	              case 5:
	                l = Qg;
	                break;

	              default:
	                l = Qg;
	            }

	            "function" === typeof yc ? yc(l) : yc.current = l;
	          }
	        }

	        var Ai = U$1.nextEffect;
	        U$1.nextEffect = null;
	        U$1 = Ai;
	      }
	    } catch (Wa) {
	      e = !0, q = Wa;
	    }

	    e && (null === U$1 ? A$1("178") : void 0, $g(U$1, q), null !== U$1 && (U$1 = U$1.nextEffect));
	  }

	  qh = uh = !1;
	  "function" === typeof Kf && Kf(b.stateNode);
	  b = c.current.expirationTime;
	  0 === b && (ih = null);
	  a.remainingExpirationTime = b;
	}

	function Ah() {
	  return null === Qh || Qh.timeRemaining() > Th ? !1 : Nh = !0;
	}

	function gh(a) {
	  null === X$1 ? A$1("246") : void 0;
	  X$1.remainingExpirationTime = 0;
	  Oh || (Oh = !0, Ph = a);
	}

	function Ch(a) {
	  null === X$1 ? A$1("246") : void 0;
	  X$1.remainingExpirationTime = a;
	}

	function ci(a, b) {
	  var c = Z$1;
	  Z$1 = !0;

	  try {
	    return a(b);
	  } finally {
	    (Z$1 = c) || W$1 || Xh();
	  }
	}

	function di(a, b) {
	  if (Z$1 && !Rh) {
	    Rh = !0;

	    try {
	      return a(b);
	    } finally {
	      Rh = !1;
	    }
	  }

	  return a(b);
	}

	function ei(a, b) {
	  W$1 ? A$1("187") : void 0;
	  var c = Z$1;
	  Z$1 = !0;

	  try {
	    return Jh(a, b);
	  } finally {
	    Z$1 = c, Xh();
	  }
	}

	function fi(a, b, c) {
	  if (Eh) return a(b, c);
	  Z$1 || W$1 || 0 === Fh || (Zh(Fh, !1, null), Fh = 0);
	  var d = Eh,
	      e = Z$1;
	  Z$1 = Eh = !0;

	  try {
	    return a(b, c);
	  } finally {
	    Eh = d, (Z$1 = e) || W$1 || Xh();
	  }
	}

	function gi(a) {
	  var b = Z$1;
	  Z$1 = !0;

	  try {
	    Jh(a);
	  } finally {
	    (Z$1 = b) || W$1 || Zh(1, !1, null);
	  }
	}

	function hi(a, b, c, d, e) {
	  var f = b.current;

	  if (c) {
	    c = c._reactInternalFiber;
	    var g;

	    b: {
	      2 === kd(c) && 2 === c.tag ? void 0 : A$1("170");

	      for (g = c; 3 !== g.tag;) {
	        if (rf(g)) {
	          g = g.stateNode.__reactInternalMemoizedMergedChildContext;
	          break b;
	        }

	        (g = g.return) ? void 0 : A$1("171");
	      }

	      g = g.stateNode.context;
	    }

	    c = rf(c) ? wf(c, g) : g;
	  } else c = emptyObject_1;

	  null === b.context ? b.context = c : b.pendingContext = c;
	  b = e;
	  e = Pf(d);
	  e.payload = {
	    element: a
	  };
	  b = void 0 === b ? null : b;
	  null !== b && (e.callback = b);
	  Rf(f, e, d);
	  pg(f, d);
	  return d;
	}

	function ii(a) {
	  var b = a._reactInternalFiber;
	  void 0 === b && ("function" === typeof a.render ? A$1("188") : A$1("268", Object.keys(a)));
	  a = nd(b);
	  return null === a ? null : a.stateNode;
	}

	function ji(a, b, c, d) {
	  var e = b.current,
	      f = ng();
	  e = og(f, e);
	  return hi(a, b, c, e, d);
	}

	function ki(a) {
	  a = a.current;
	  if (!a.child) return null;

	  switch (a.child.tag) {
	    case 5:
	      return a.child.stateNode;

	    default:
	      return a.child.stateNode;
	  }
	}

	function li(a) {
	  var b = a.findFiberByHostInstance;
	  return Jf(objectAssign({}, a, {
	    findHostInstanceByFiber: function (a) {
	      a = nd(a);
	      return null === a ? null : a.stateNode;
	    },
	    findFiberByHostInstance: function (a) {
	      return b ? b(a) : null;
	    }
	  }));
	}

	var mi = {
	  updateContainerAtExpirationTime: hi,
	  createContainer: function (a, b, c) {
	    return Ff(a, b, c);
	  },
	  updateContainer: ji,
	  flushRoot: ai,
	  requestWork: Bh,
	  computeUniqueAsyncExpiration: Dh,
	  batchedUpdates: ci,
	  unbatchedUpdates: di,
	  deferredUpdates: Ih,
	  syncUpdates: Jh,
	  interactiveUpdates: fi,
	  flushInteractiveUpdates: function () {
	    W$1 || 0 === Fh || (Zh(Fh, !1, null), Fh = 0);
	  },
	  flushControlled: gi,
	  flushSync: ei,
	  getPublicRootInstance: ki,
	  findHostInstance: ii,
	  findHostInstanceWithNoPortals: function (a) {
	    a = od(a);
	    return null === a ? null : a.stateNode;
	  },
	  injectIntoDevTools: li
	};

	function oi(a, b, c) {
	  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
	  return {
	    $$typeof: hc,
	    key: null == d ? null : "" + d,
	    children: a,
	    containerInfo: b,
	    implementation: c
	  };
	}

	Kb.injectFiberControlledHostComponent(af);

	function pi(a) {
	  this._expirationTime = Dh();
	  this._root = a;
	  this._callbacks = this._next = null;
	  this._hasChildren = this._didComplete = !1;
	  this._children = null;
	  this._defer = !0;
	}

	pi.prototype.render = function (a) {
	  this._defer ? void 0 : A$1("250");
	  this._hasChildren = !0;
	  this._children = a;
	  var b = this._root._internalRoot,
	      c = this._expirationTime,
	      d = new qi();
	  hi(a, b, null, c, d._onCommit);
	  return d;
	};

	pi.prototype.then = function (a) {
	  if (this._didComplete) a();else {
	    var b = this._callbacks;
	    null === b && (b = this._callbacks = []);
	    b.push(a);
	  }
	};

	pi.prototype.commit = function () {
	  var a = this._root._internalRoot,
	      b = a.firstBatch;
	  this._defer && null !== b ? void 0 : A$1("251");

	  if (this._hasChildren) {
	    var c = this._expirationTime;

	    if (b !== this) {
	      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));

	      for (var d = null, e = b; e !== this;) d = e, e = e._next;

	      null === d ? A$1("251") : void 0;
	      d._next = e._next;
	      this._next = b;
	      a.firstBatch = this;
	    }

	    this._defer = !1;
	    ai(a, c);
	    b = this._next;
	    this._next = null;
	    b = a.firstBatch = b;
	    null !== b && b._hasChildren && b.render(b._children);
	  } else this._next = null, this._defer = !1;
	};

	pi.prototype._onComplete = function () {
	  if (!this._didComplete) {
	    this._didComplete = !0;
	    var a = this._callbacks;
	    if (null !== a) for (var b = 0; b < a.length; b++) (0, a[b])();
	  }
	};

	function qi() {
	  this._callbacks = null;
	  this._didCommit = !1;
	  this._onCommit = this._onCommit.bind(this);
	}

	qi.prototype.then = function (a) {
	  if (this._didCommit) a();else {
	    var b = this._callbacks;
	    null === b && (b = this._callbacks = []);
	    b.push(a);
	  }
	};

	qi.prototype._onCommit = function () {
	  if (!this._didCommit) {
	    this._didCommit = !0;
	    var a = this._callbacks;
	    if (null !== a) for (var b = 0; b < a.length; b++) {
	      var c = a[b];
	      "function" !== typeof c ? A$1("191", c) : void 0;
	      c();
	    }
	  }
	};

	function ri(a, b, c) {
	  this._internalRoot = Ff(a, b, c);
	}

	ri.prototype.render = function (a, b) {
	  var c = this._internalRoot,
	      d = new qi();
	  b = void 0 === b ? null : b;
	  null !== b && d.then(b);
	  ji(a, c, null, d._onCommit);
	  return d;
	};

	ri.prototype.unmount = function (a) {
	  var b = this._internalRoot,
	      c = new qi();
	  a = void 0 === a ? null : a;
	  null !== a && c.then(a);
	  ji(null, b, null, c._onCommit);
	  return c;
	};

	ri.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
	  var d = this._internalRoot,
	      e = new qi();
	  c = void 0 === c ? null : c;
	  null !== c && e.then(c);
	  ji(b, d, a, e._onCommit);
	  return e;
	};

	ri.prototype.createBatch = function () {
	  var a = new pi(this),
	      b = a._expirationTime,
	      c = this._internalRoot,
	      d = c.firstBatch;
	  if (null === d) c.firstBatch = a, a._next = null;else {
	    for (c = null; null !== d && d._expirationTime <= b;) c = d, d = d._next;

	    a._next = d;
	    null !== c && (c._next = a);
	  }
	  return a;
	};

	function si(a) {
	  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
	}

	Sb = mi.batchedUpdates;
	Tb = mi.interactiveUpdates;
	Ub = mi.flushInteractiveUpdates;

	function ti(a, b) {
	  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
	  if (!b) for (var c; c = a.lastChild;) a.removeChild(c);
	  return new ri(a, !1, b);
	}

	function ui(a, b, c, d, e) {
	  si(c) ? void 0 : A$1("200");
	  var f = c._reactRootContainer;

	  if (f) {
	    if ("function" === typeof e) {
	      var g = e;

	      e = function () {
	        var a = ki(f._internalRoot);
	        g.call(a);
	      };
	    }

	    null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
	  } else {
	    f = c._reactRootContainer = ti(c, d);

	    if ("function" === typeof e) {
	      var h = e;

	      e = function () {
	        var a = ki(f._internalRoot);
	        h.call(a);
	      };
	    }

	    di(function () {
	      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
	    });
	  }

	  return ki(f._internalRoot);
	}

	function vi(a, b) {
	  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
	  si(b) ? void 0 : A$1("200");
	  return oi(a, b, null, c);
	}

	var wi = {
	  createPortal: vi,
	  findDOMNode: function (a) {
	    return null == a ? null : 1 === a.nodeType ? a : ii(a);
	  },
	  hydrate: function (a, b, c) {
	    return ui(null, a, b, !0, c);
	  },
	  render: function (a, b, c) {
	    return ui(null, a, b, !1, c);
	  },
	  unstable_renderSubtreeIntoContainer: function (a, b, c, d) {
	    null == a || void 0 === a._reactInternalFiber ? A$1("38") : void 0;
	    return ui(a, b, c, !1, d);
	  },
	  unmountComponentAtNode: function (a) {
	    si(a) ? void 0 : A$1("40");
	    return a._reactRootContainer ? (di(function () {
	      ui(null, null, a, !1, function () {
	        a._reactRootContainer = null;
	      });
	    }), !0) : !1;
	  },
	  unstable_createPortal: function () {
	    return vi.apply(void 0, arguments);
	  },
	  unstable_batchedUpdates: ci,
	  unstable_deferredUpdates: Ih,
	  unstable_interactiveUpdates: fi,
	  flushSync: ei,
	  unstable_flushControlled: gi,
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    EventPluginHub: Ka,
	    EventPluginRegistry: va,
	    EventPropagators: $a,
	    ReactControlledComponent: Rb,
	    ReactDOMComponentTree: Qa,
	    ReactDOMEventListener: Od
	  },
	  unstable_createRoot: function (a, b) {
	    return new ri(a, !0, null != b && !0 === b.hydrate);
	  }
	};
	li({
	  findFiberByHostInstance: Na,
	  bundleType: 0,
	  version: "16.4.2",
	  rendererPackageName: "react-dom"
	});
	var Bi = {
	  default: wi
	},
	    Ci = Bi && wi || Bi;
	var reactDom_production_min = Ci.default ? Ci.default : Ci;

	var reactDom = createCommonjsModule(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
	    return;
	  }

	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = reactDom_production_min;
	}
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _toPropertyKey(key) {
	  if (typeof key === "symbol") {
	    return key;
	  } else {
	    return String(key);
	  }
	}

	var rngBrowser = createCommonjsModule(function (module) {
	// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection
	// getRandomValues needs to be invoked in a context where "this" is a Crypto
	// implementation. Also, find the complete implementation of crypto on IE11.
	var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

	if (getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

	  module.exports = function whatwgRNG() {
	    getRandomValues(rnds8);
	    return rnds8;
	  };
	} else {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var rnds = new Array(16);

	  module.exports = function mathRNG() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}
	});

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

	  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
	}

	var bytesToUuid_1 = bytesToUuid;

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof options == 'string') {
	    buf = options === 'binary' ? new Array(16) : null;
	    options = null;
	  }

	  options = options || {};
	  var rnds = options.random || (options.rng || rngBrowser)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid_1(rnds);
	}

	var v4_1 = v4;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	/** Used as references for various `Number` constants. */

	var NAN = 0 / 0;
	/** `Object#toString` result references. */

	var symbolTag = '[object Symbol]';
	/** Used to match leading and trailing whitespace. */

	var reTrim = /^\s+|\s+$/g;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt = parseInt;
	/** Detect free variable `global` from Node.js. */

	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root = freeGlobal || freeSelf || Function('return this')();
	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var objectToString = objectProto.toString;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax = Math.max,
	    nativeMin = Math.min;
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now = function () {
	  return root.Date.now();
	};
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */


	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  wait = toNumber(wait) || 0;

	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */


	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */


	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */


	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */


	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */


	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol(value)) {
	    return NAN;
	  }

	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	var lodash_throttle = throttle;

	const PathContext = react_6([]);
	const RootContext = react_6({
	  rootKey: null,
	  handleDragOver: () => {
	    throw new Error('Cannot handle dragover outside of Guration.Root');
	  },
	  handleDrop: () => {
	    throw new Error('Cannot handle drop outside of Guration.Root');
	  }
	});
	const DedupeContext = react_6({});

	class DedupeNode extends react.Component {
	  constructor(...args) {
	    var _temp;

	    return _temp = super(...args), _defineProperty(this, "deregister", () => {}), _defineProperty(this, "reregister", () => {
	      const {
	        dedupeContext
	      } = this;
	      const {
	        data,
	        dedupeKey
	      } = this.props;

	      if (!dedupeKey) {
	        return;
	      }

	      this.deregister();

	      if (!dedupeContext) {
	        return;
	      }

	      const {
	        register,
	        deregister
	      } = dedupeContext;
	      register(dedupeKey, data);

	      this.deregister = () => deregister(dedupeKey);
	    }), _defineProperty(this, "componentDidMount", () => this.reregister()), _defineProperty(this, "componentDidUpdate", () => this.reregister()), _defineProperty(this, "componentWillUnmount", () => this.deregister()), _temp;
	  }

	  get dedupeContext() {
	    return this.props.context[this.props.type];
	  }

	  get getDuplicate() {
	    const {
	      dedupeContext
	    } = this;

	    if (!dedupeContext) {
	      return () => null;
	    }

	    return dedupeContext.getDuplicate;
	  }

	  render() {
	    return this.props.children(this.getDuplicate);
	  }

	}

	var DedupeNode$1 = (props => react.createElement(DedupeContext.Consumer, null, context => react.createElement(DedupeNode, _extends({}, props, {
	  context: context
	}))));

	const addChildrenFieldToParent = (path, childrenField, type, id, index) => {
	  const parent = path[path.length - 1];
	  return [...path.slice(0, path.length - 1), ...(parent ? [_objectSpread({}, parent, {
	    childrenField
	  })] : []), {
	    type,
	    id,
	    index
	  }];
	};

	const AddPathLevel = ({
	  type,
	  id,
	  index,
	  childrenField,
	  children
	}) => react.createElement(PathContext.Consumer, null, path => {
	  const newPath = addChildrenFieldToParent(path, childrenField, type, id, index);
	  return react.createElement(PathContext.Provider, {
	    value: newPath
	  }, children(newPath));
	});

	const elEq = (a, b, checkChildren = false) => {
	  const {
	    index: i1,
	    type: t1,
	    childrenField: c1
	  } = a;
	  const {
	    index: i2,
	    type: t2,
	    childrenField: c2
	  } = b; // we're still a sub path if the we're on the last and it doesn't have a
	  // childrenField

	  return !isNaN(i1) && i1 === i2 && t1 && t1 === t2 && (c1 === c2 || !checkChildren);
	};

	const eq = (a, b) => a.length === b.length && a.every((el, i) => elEq(el, b[i], i !== a.length - 1));

	const isSubPath = (path, candidate) => candidate.length > path.length && !!path.length && path.every((el, i) => elEq(el, candidate[i], i !== path.length - 1));

	const pathForMove = (source, target) => {
	  const newPath = [];

	  for (let i = 0; i < target.length; i += 1) {
	    const targetPathSpec = target[i];
	    const {
	      id: kt,
	      index: it,
	      type: tt,
	      childrenField: ct
	    } = targetPathSpec || {};
	    const {
	      index: is,
	      childrenField: cs
	    } = source[i] || {};

	    if (i < source.length - 1 && (is !== it || ct !== cs)) {
	      return target;
	    } else if (i === source.length - 1 && ct === cs && is < it) {
	      newPath.push({
	        id: kt,
	        index: it - 1,
	        type: tt,
	        childrenField: ct
	      });
	    } else {
	      newPath.push(targetPathSpec);
	    }
	  }

	  return newPath;
	};

	const hasMoved = (prevPath, nextPath) => {
	  if (prevPath.length !== nextPath.length) {
	    return true;
	  }

	  for (let i = 0; i < prevPath.length; i += 1) {
	    const {
	      index: i1,
	      childrenField: c1
	    } = prevPath[i];
	    const {
	      index: i2,
	      childrenField: c2
	    } = nextPath[i];

	    if (i < prevPath.length - 1) {
	      if (c1 !== c2) {
	        return true;
	      } else if (i1 !== i2) {
	        return true;
	      }
	    } else {
	      if (i2 < i1 || i2 > i1 + 1) {
	        return true;
	      }

	      return false;
	    }
	  } // in case we have empty paths?


	  return false;
	};

	const addOffset = (candidatePath, offset) => {
	  const parent = candidatePath[candidatePath.length - 1];
	  return [...candidatePath.slice(0, candidatePath.length - 1), _objectSpread({}, parent, {
	    index: parent.index + offset
	  })];
	};

	const getDropIndexOffset = ({
	  currentTarget: el,
	  clientY
	}) => {
	  const {
	    top,
	    height
	  } = el.getBoundingClientRect();
	  const y = clientY - top;
	  return y > height / 2 ? 1 : 0;
	};

	class Node extends react.Component {
	  render() {
	    const {
	      item,
	      id,
	      dedupeKey,
	      type,
	      childrenField,
	      index,
	      handleDragStart,
	      handleDragOver,
	      handleDrop,
	      children
	    } = this.props;
	    return react.createElement(AddPathLevel, {
	      id: id,
	      type: type,
	      childrenField: childrenField,
	      index: index
	    }, path => react.createElement(DedupeNode$1, {
	      dedupeKey: dedupeKey,
	      type: type,
	      data: {
	        index,
	        path
	      }
	    }, getDuplicate => children(item, () => _objectSpread({
	      draggable: true,
	      onDragStart: handleDragStart(item, path, id, type)
	    }, handleDrop ? {
	      onDrop: handleDrop(path, getDuplicate, getDropIndexOffset),
	      onDragOver: handleDragOver(path, getDuplicate, getDropIndexOffset)
	    } : {}), index)));
	  }

	}

	class DedupeLevel extends react.Component {
	  constructor(...args) {
	    var _temp;

	    return _temp = super(...args), _defineProperty(this, "dedupeContext", {}), _defineProperty(this, "register", (key, data) => {
	      this.dedupeContext = _objectSpread({}, this.dedupeContext, {
	        [key]: data
	      });
	    }), _defineProperty(this, "deregister", key => {
	      const _this$dedupeContext = this.dedupeContext,
	            rest = _objectWithoutProperties(_this$dedupeContext, [key].map(_toPropertyKey));

	      this.dedupeContext = rest;
	    }), _defineProperty(this, "getDuplicate", key => this.dedupeContext[key] || null), _temp;
	  }

	  render() {
	    const context = this.props.type ? _objectSpread({
	      [this.props.type]: {
	        register: this.register,
	        deregister: this.deregister,
	        getDuplicate: this.getDuplicate
	      }
	    }, this.props.parentContext) : this.props.parentContext;
	    return react.createElement(DedupeContext.Provider, {
	      value: context
	    }, this.props.children);
	  }

	}

	var DedupeLevel$1 = (props => react.createElement(DedupeContext.Consumer, null, parentContext => react.createElement(DedupeLevel, _extends({}, props, {
	  parentContext: parentContext
	}))));

	class Level extends react.Component {
	  get childrenField() {
	    return this.props.field || `${this.props.type}s`;
	  }

	  render() {
	    const {
	      arr,
	      type,
	      children,
	      renderDrop,
	      getKey = ({
	        id
	      }) => id,
	      getDedupeKey = getKey,
	      dropOnNode,
	      dedupeType
	    } = this.props;
	    return react.createElement(DedupeLevel$1, {
	      type: dedupeType
	    }, react.createElement(DedupeNode$1, {
	      type: type
	    }, getDuplicate => react.createElement(RootContext.Consumer, null, ({
	      handleDragStart,
	      handleDragOver,
	      handleDrop,
	      dropInfo: {
	        canDrop,
	        path: dropPath
	      }
	    }) => react.createElement(react.Fragment, null, arr.map((item, i) => react.createElement(react.Fragment, {
	      key: getKey(item)
	    }, react.createElement(AddPathLevel, {
	      childrenField: this.childrenField,
	      id: "@@DROP",
	      type: type,
	      index: i
	    }, path => renderDrop && renderDrop(() => ({
	      onDrop: handleDrop(path, getDuplicate, 0),
	      onDragOver: handleDragOver(path, getDuplicate, 0)
	    }), {
	      canDrop,
	      isOver: dropPath && eq(path, dropPath)
	    }, i)), react.createElement(Node, {
	      item: item,
	      id: getKey(item),
	      dedupeKey: getDedupeKey(item),
	      type: type,
	      index: i,
	      childrenField: this.childrenField // TODO: maybe move this into Node?
	      ,
	      handleDragStart: handleDragStart,
	      handleDragOver: dropOnNode && handleDragOver,
	      handleDrop: dropOnNode && handleDrop
	    }, children))), react.createElement(AddPathLevel, {
	      childrenField: this.childrenField,
	      id: "@@DROP",
	      type: type,
	      index: arr.length
	    }, path => renderDrop && renderDrop(() => ({
	      onDrop: handleDrop(path, getDuplicate, 0),
	      onDragOver: handleDragOver(path, getDuplicate, 0)
	    }), {
	      canDrop,
	      isOver: dropPath && eq(path, dropPath)
	    }, arr.length))))));
	  }

	}

	_defineProperty(Level, "defaultProps", {
	  dropOnNode: true // sets node drag props to allow drops

	});

	const move = (type, id, dragPath, path, newIndex) => ({
	  type: 'MOVE',
	  payload: {
	    type,
	    id,
	    from: {
	      parent: dragPath[dragPath.length - 2]
	    },
	    to: {
	      parent: path[path.length - 2],
	      index: newIndex
	    }
	  }
	});

	const insert = (type, id, dragPath, newIndex) => ({
	  type: 'INSERT',
	  payload: {
	    type,
	    id,
	    path: {
	      parent: dragPath[dragPath.length - 2],
	      index: newIndex
	    }
	  }
	});

	const getEdits = (inputData, inputPath, getDuplicate) => inputData.dropType === 'INTERNAL' ? handleMove(inputData.path, inputPath) : handleInsert(inputData, inputPath, getDuplicate);

	const handleMove = (prevPath, nextPath) => {
	  const {
	    type: dragType,
	    id
	  } = prevPath[prevPath.length - 1];
	  const {
	    type
	  } = nextPath[nextPath.length - 1];

	  if (dragType !== type) {
	    throw new Error(`can't drop ${dragType} where ${type} should go`);
	  }

	  if (isSubPath(prevPath, nextPath)) {
	    throw new Error(`can't drop into itself`);
	  }

	  const movePath = pathForMove(prevPath, nextPath);
	  const {
	    index
	  } = movePath[movePath.length - 1];
	  const edits = [hasMoved(prevPath, nextPath) ? move(type, id, prevPath, movePath, index) : null].filter(Boolean);
	  return edits;
	};

	const handleInsert = ({
	  type: dragType,
	  id
	}, path, getDuplicate) => {
	  const {
	    type,
	    index
	  } = path[path.length - 1];

	  if (dragType !== type) {
	    throw new Error(`can't drop ${dragType} where ${type} should go`);
	  }

	  const duplicate = getDuplicate(id);
	  return duplicate ? handleMove(duplicate.path, path) : [insert(type, id, path, index)].filter(Boolean);
	};

	const extractIndexOffset = (e, getIndexOffset) => typeof getIndexOffset === 'function' ? getIndexOffset(e) : getIndexOffset;

	const sanitizeExternalDrops = mappers => Object.entries(mappers).reduce((acc, [key, mapper]) => _objectSpread({}, acc, {
	  [key]: text => {
	    const data = mapper(text);

	    if (typeof data === 'string') {
	      return data;
	    }

	    return _objectSpread({}, data, {
	      dropType: 'EXTERNAL'
	    });
	  }
	}), {});

	const internalMapIn = data => _objectSpread({}, JSON.parse(data), {
	  dropType: 'INTERNAL'
	});

	const internalMapOut = (item, path, id, type) => JSON.stringify({
	  id,
	  type,
	  path
	});

	class Root extends react.Component {
	  constructor(...args) {
	    var _temp;

	    return _temp = super(...args), _defineProperty(this, "state", {
	      dragData: null,
	      dropInfo: {
	        path: null,
	        canDrop: false
	      }
	    }), _defineProperty(this, "eventHandled", false), _defineProperty(this, "rootKey", v4_1()), _defineProperty(this, "handleRootDragOver", () => {
	      if (!this.eventHandled) {
	        this.setDropInfo(null, false);
	      }

	      this.eventHandled = false;
	    }), _defineProperty(this, "handleRootDrop", () => {
	      this.setDropInfo(null, false);
	      this.eventHandled = false;
	    }), _defineProperty(this, "handleNodeDragStart", (item, path, id, type) => e => this.runLowest(() => {
	      Object.keys(this.mapOut).forEach(key => {
	        const mapper = this.mapOut[key];
	        e.dataTransfer.setData(key, mapper(item, path, id, type));
	      });
	      this.setState({
	        dragData: {
	          dropType: 'INTERNAL',
	          rootKey: this.rootKey,
	          path,
	          type
	        }
	      });
	    })), _defineProperty(this, "handleDropZoneDragOver", (candidatePath, getDuplicate, getIndexOffset) => e => this.runLowest(() => {
	      e.preventDefault();
	      this.runDropZoneDragOver(candidatePath, getDuplicate, getIndexOffset, e);
	    })), _defineProperty(this, "runDropZoneDragOver", lodash_throttle((candidatePath, getDuplicate, getIndexOffset, e) => {
	      const {
	        path,
	        canDrop
	      } = this.run(e, candidatePath, getDuplicate, getIndexOffset, this.state.dragData || true);
	      this.setDropInfo(path, canDrop);
	    }, 100, {
	      trailing: false
	    })), _defineProperty(this, "handleDropZoneDrop", (candidatePath, getDuplicate, getIndexOffset) => e => this.runLowest(() => {
	      e.preventDefault();
	      this.run(e, candidatePath, getDuplicate, getIndexOffset);
	    })), _defineProperty(this, "run", (e, candidatePath, getDuplicate, getIndexOffset, dragData) => {
	      const path = addOffset(candidatePath, extractIndexOffset(e, getIndexOffset));

	      if (dragData === true) {
	        return {
	          path,
	          canDrop: true
	        };
	      }

	      const data = dragData || this.getDropData(e);

	      if (typeof data === 'string') {
	        !dragData && this.props.onError(data);
	        return {
	          path,
	          canDrop: false
	        };
	      }

	      try {
	        const edits = getEdits(data, path, getDuplicate);

	        if (edits.length) {
	          !dragData && this.props.onChange(edits);
	          return {
	            path,
	            canDrop: true
	          };
	        }

	        return {
	          path,
	          canDrop: false
	        };
	      } catch (e) {
	        !dragData && this.props.onError(e.message);
	        return {
	          path,
	          canDrop: false
	        };
	      }
	    }), _temp;
	  }

	  /**
	   * This wraps set state to make sure we don't call it too much and keep
	   * rerendering, only changing the drop state if things have actually changed
	   */
	  setDropInfo(path, canDrop) {
	    const {
	      path: prevPath
	    } = this.state.dropInfo;

	    if (!path && prevPath || path && !prevPath || path && prevPath && !eq(path, prevPath)) {
	      this.setState({
	        dropInfo: {
	          path,
	          canDrop
	        }
	      });
	    }
	  }
	  /**
	   * This uses event bubbling to make sure we're only handling drops for the
	   * lowest handler (so we can drop into nested dropzones)
	   *
	   * When the event bubbles outside of the root we reset the `eventHandled` flag
	   */


	  runLowest(fn) {
	    if (!this.eventHandled) {
	      this.eventHandled = true;
	      fn();
	    }
	  }
	  /**
	   * When a dragover event happens that has not been handled by a nodeDragOver
	   * we are not in a position to dop anything
	   */


	  /**
	   * All of the functions that map a drop to a node, the key being the
	   * key on the `dataTransfer` object that this mapper can handle
	   */
	  get mapIn() {
	    return _objectSpread({}, sanitizeExternalDrops(this.props.mapIn), {
	      [this.rootKey]: internalMapIn
	    });
	  }
	  /**
	   * All of the functions that map a node to a drag, the key being the
	   * key on the `dataTransfer` object that this mapper will create
	   */


	  get mapOut() {
	    return _objectSpread({}, this.props.mapOut, {
	      [this.rootKey]: internalMapOut
	    });
	  } // TODO: add mapOut

	  /**
	   * Runs through the inMappers to get the data
	   */


	  getDropData(e) {
	    const {
	      mapIn
	    } = this;
	    const type = Object.keys(mapIn).find(key => e.dataTransfer.getData(key));

	    if (!type) {
	      return `Unable to drop this: unknown drop type`;
	    }

	    const mapper = mapIn[type];
	    return mapper(e.dataTransfer.getData(type));
	  }

	  render() {
	    return react.createElement("div", {
	      onDragOver: this.handleRootDragOver,
	      onDrop: this.handleRootDrop,
	      onDragEnd: this.handleRootDrop
	    }, react.createElement(RootContext.Provider, {
	      value: {
	        handleDragStart: this.handleNodeDragStart,
	        handleDragOver: this.handleDropZoneDragOver,
	        handleDrop: this.handleDropZoneDrop,
	        dropInfo: this.state.dropInfo
	      }
	    }, react.createElement(Level, {
	      type: "root",
	      arr: [{
	        id: 'ROOT'
	      }]
	    }, () => this.props.children)));
	  }

	}

	_defineProperty(Root, "defaultProps", {
	  mapIn: {},
	  mapOut: {},
	  onError: () => {}
	});

	const DragZone = ({
	  children,
	  type,
	  data,
	  json
	}) => react.createElement("div", {
	  draggable: true,
	  onDragStart: e => e.dataTransfer.setData(type, json ? JSON.stringify(data) : data)
	}, children);

	const DropZone = (_ref) => {
	  let {
	    isOver,
	    canDrop
	  } = _ref,
	      props = _objectWithoutProperties(_ref, ["isOver", "canDrop"]);

	  return react.createElement("div", _extends({}, props, {
	    style: {
	      border: `2px dashed ${isOver ? 'gold' : 'white'}`,
	      height: '20px',
	      backgroundColor: isOver ? canDrop ? 'white' : 'grey' : 'transparent'
	    }
	  }));
	};

	const Indent = props => react.createElement("div", _extends({}, props, {
	  style: {
	    marginLeft: '50px',
	    padding: 10,
	    border: '1px solid white'
	  }
	}));

	const json = (fn = a => a) => str => fn(JSON.parse(str));

	const renderDrop = (getDropProps, {
	  isOver,
	  canDrop
	}) => react.createElement(DropZone, _extends({}, getDropProps(), {
	  isOver: isOver,
	  canDrop: canDrop
	}));

	const App = ({
	  front
	}) => react.createElement("div", null, react.createElement(DragZone, {
	  type: "json",
	  json: true,
	  data: {
	    type: 'articleFragment',
	    id: 1
	  }
	}, "Article 1 (is a dupe)"), react.createElement(DragZone, {
	  type: "json",
	  json: true,
	  data: {
	    type: 'articleFragment',
	    id: 9
	  }
	}, "Article 9 (is not a dupe)"), react.createElement(Root, {
	  id: front.id,
	  type: "front",
	  onChange: console.log,
	  onError: console.log,
	  dropMappers: {
	    json: json()
	  }
	}, react.createElement(Level, {
	  arr: front.collections,
	  type: "collection",
	  renderDrop: renderDrop,
	  dedupeType: "articleFragment"
	}, ({
	  title,
	  groups
	}) => react.createElement("div", null, react.createElement("h1", null, title), react.createElement(Indent, null, react.createElement(Level, {
	  arr: groups,
	  type: "group",
	  renderDrop: renderDrop
	}, ({
	  id,
	  articleFragments
	}) => react.createElement("div", null, react.createElement("h1", null, id), react.createElement(Indent, null, react.createElement(Level, {
	  arr: articleFragments,
	  type: "articleFragment",
	  renderDrop: renderDrop,
	  maxChildren: 2
	}, ({
	  title,
	  meta: {
	    supporting
	  }
	}, afNodeProps) => react.createElement("div", _extends({}, afNodeProps(), {
	  style: {
	    padding: 10
	  }
	}), react.createElement("h1", null, title), react.createElement(Indent, null, react.createElement(Level, {
	  arr: supporting,
	  type: "articleFragment",
	  renderDrop: renderDrop
	}, ({
	  title
	}, sNodeProps, sDropProps) => react.createElement("div", _extends({}, sNodeProps(), {
	  style: {
	    padding: 10
	  }
	}), react.createElement("h1", null, title))))))))))))));

	const front = {
	  id: '1',
	  title: 'Front',
	  collections: [{
	    id: '1',
	    title: 'Coll 1',
	    groups: [{
	      id: 'big',
	      articleFragments: [{
	        id: '1',
	        title: 'Af 1',
	        meta: {
	          supporting: [{
	            id: '2',
	            title: 'Af 2'
	          }]
	        }
	      }, {
	        id: '5',
	        title: 'Af 5',
	        meta: {
	          supporting: [{
	            id: '6',
	            title: 'Af 6'
	          }]
	        }
	      }]
	    }, {
	      id: 'medium',
	      articleFragments: [{
	        id: '3',
	        title: 'Af 3',
	        meta: {
	          supporting: [{
	            id: '4',
	            title: 'Af 4'
	          }]
	        }
	      }]
	    }]
	  }]
	};
	const root$1 = document.getElementById('root');

	if (root$1) {
	  reactDom.render(react.createElement(App, {
	    front: front
	  }), root$1);
	}

}());
//# sourceMappingURL=index.js.map
