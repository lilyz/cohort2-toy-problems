/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 3.8.1
 * @date    2016-12-15
 *
 * @license
 * Copyright (C) 2013-2016 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["math"] = factory();
	else
		root["math"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(1);

	/**
	 * math.js factory function. Creates a new instance of math.js
	 *
	 * @param {Object} [config] Available configuration options:
	 *                            {number} epsilon
	 *                              Minimum relative difference between two
	 *                              compared values, used by all comparison functions.
	 *                            {string} matrix
	 *                              A string 'matrix' (default) or 'array'.
	 *                            {string} number
	 *                              A string 'number' (default), 'bignumber', or
	 *                              'fraction'
	 *                            {number} precision
	 *                              The number of significant digits for BigNumbers.
	 *                              Not applicable for Numbers.
	 *                            {boolean} predictable
	 *                              Predictable output type of functions. When true,
	 *                              output type depends only on the input types. When
	 *                              false (default), output type can vary depending
	 *                              on input values. For example `math.sqrt(-2)`
	 *                              returns `NaN` when predictable is false, and
	 *                              returns `complex('2i')` when true.
	 */
	function create (config) {
	  // create a new math.js instance
	  var math = core.create(config);
	  math.create = create;

	  // import data types, functions, constants, expression parser, etc.
	  math['import'](__webpack_require__(13));

	  return math;
	}

	// return a new instance of math.js
	module.exports = create();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isFactory = __webpack_require__(3).isFactory;
	var deepExtend = __webpack_require__(3).deepExtend;
	var typedFactory = __webpack_require__(4);
	var emitter = __webpack_require__(8);

	var importFactory = __webpack_require__(10);
	var configFactory = __webpack_require__(12);

	/**
	 * Math.js core. Creates a new, empty math.js instance
	 * @param {Object} [options] Available options:
	 *                            {number} epsilon
	 *                              Minimum relative difference between two
	 *                              compared values, used by all comparison functions.
	 *                            {string} matrix
	 *                              A string 'Matrix' (default) or 'Array'.
	 *                            {string} number
	 *                              A string 'number' (default), 'BigNumber', or 'Fraction'
	 *                            {number} precision
	 *                              The number of significant digits for BigNumbers.
	 *                              Not applicable for Numbers.
	 *                            {boolean} predictable
	 *                              Predictable output type of functions. When true,
	 *                              output type depends only on the input types. When
	 *                              false (default), output type can vary depending
	 *                              on input values. For example `math.sqrt(-2)`
	 *                              returns `NaN` when predictable is false, and
	 *                              returns `complex('2i')` when true.
	 * @returns {Object} Returns a bare-bone math.js instance containing
	 *                   functions:
	 *                   - `import` to add new functions
	 *                   - `config` to change configuration
	 *                   - `on`, `off`, `once`, `emit` for events
	 */
	exports.create = function create (options) {
	  // simple test for ES5 support
	  if (typeof Object.create !== 'function') {
	    throw new Error('ES5 not supported by this JavaScript engine. ' +
	    'Please load the es5-shim and es5-sham library for compatibility.');
	  }

	  // cached factories and instances
	  var factories = [];
	  var instances = [];

	  // create a namespace for the mathjs instance, and attach emitter functions
	  var math = emitter.mixin({});
	  math.type = {};
	  math.expression = {
	    transform: Object.create(math)
	  };

	  // create a new typed instance
	  math.typed = typedFactory.create(math.type);

	  // create configuration options. These are private
	  var _config = {
	    // minimum relative difference between two compared values,
	    // used by all comparison functions
	    epsilon: 1e-12,

	    // type of default matrix output. Choose 'matrix' (default) or 'array'
	    matrix: 'Matrix',

	    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
	    number: 'number',

	    // number of significant digits in BigNumbers
	    precision: 64,

	    // predictable output type of functions. When true, output type depends only
	    // on the input types. When false (default), output type can vary depending
	    // on input values. For example `math.sqrt(-2)` returns `NaN` when
	    // predictable is false, and returns `complex('2i')` when true.
	    predictable: false
	  };

	  /**
	   * Load a function or data type from a factory.
	   * If the function or data type already exists, the existing instance is
	   * returned.
	   * @param {{type: string, name: string, factory: Function}} factory
	   * @returns {*}
	   */
	  function load (factory) {
	    if (!isFactory(factory)) {
	      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
	    }

	    var index = factories.indexOf(factory);
	    var instance;
	    if (index === -1) {
	      // doesn't yet exist
	      if (factory.math === true) {
	        // pass with math namespace
	        instance = factory.factory(math.type, _config, load, math.typed, math);
	      }
	      else {
	        instance = factory.factory(math.type, _config, load, math.typed);
	      }

	      // append to the cache
	      factories.push(factory);
	      instances.push(instance);
	    }
	    else {
	      // already existing function, return the cached instance
	      instance = instances[index];
	    }

	    return instance;
	  }

	  // load the import and config functions
	  math['import'] = load(importFactory);
	  math['config'] = load(configFactory);

	  // apply options
	  if (options) {
	    math.config(options);
	  }

	  return math;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Clone an object
	 *
	 *     clone(x)
	 *
	 * Can clone any primitive type, array, and object.
	 * If x has a function clone, this function will be invoked to clone the object.
	 *
	 * @param {*} x
	 * @return {*} clone
	 */
	exports.clone = function clone(x) {
	  var type = typeof x;

	  // immutable primitive types
	  if (type === 'number' || type === 'string' || type === 'boolean' ||
	      x === null || x === undefined) {
	    return x;
	  }

	  // use clone function of the object when available
	  if (typeof x.clone === 'function') {
	    return x.clone();
	  }

	  // array
	  if (Array.isArray(x)) {
	    return x.map(function (value) {
	      return clone(value);
	    });
	  }

	  if (x instanceof Number)    return new Number(x.valueOf());
	  if (x instanceof String)    return new String(x.valueOf());
	  if (x instanceof Boolean)   return new Boolean(x.valueOf());
	  if (x instanceof Date)      return new Date(x.valueOf());
	  if (x && x.isBigNumber === true) return x; // bignumbers are immutable
	  if (x instanceof RegExp)  throw new TypeError('Cannot clone ' + x);  // TODO: clone a RegExp

	  // object
	  var m = {};
	  for (var key in x) {
	    if (x.hasOwnProperty(key)) {
	      m[key] = clone(x[key]);
	    }
	  }
	  return m;
	};

	/**
	 * Extend object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 */
	exports.extend = function(a, b) {
	  for (var prop in b) {
	    if (b.hasOwnProperty(prop)) {
	      a[prop] = b[prop];
	    }
	  }
	  return a;
	};

	/**
	 * Deep extend an object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {Object}
	 */
	exports.deepExtend = function deepExtend (a, b) {
	  // TODO: add support for Arrays to deepExtend
	  if (Array.isArray(b)) {
	    throw new TypeError('Arrays are not supported by deepExtend');
	  }

	  for (var prop in b) {
	    if (b.hasOwnProperty(prop)) {
	      if (b[prop] && b[prop].constructor === Object) {
	        if (a[prop] === undefined) {
	          a[prop] = {};
	        }
	        if (a[prop].constructor === Object) {
	          deepExtend(a[prop], b[prop]);
	        }
	        else {
	          a[prop] = b[prop];
	        }
	      } else if (Array.isArray(b[prop])) {
	        throw new TypeError('Arrays are not supported by deepExtend');
	      } else {
	        a[prop] = b[prop];
	      }
	    }
	  }
	  return a;
	};

	/**
	 * Deep test equality of all fields in two pairs of arrays or objects.
	 * @param {Array | Object} a
	 * @param {Array | Object} b
	 * @returns {boolean}
	 */
	exports.deepEqual = function deepEqual (a, b) {
	  var prop, i, len;
	  if (Array.isArray(a)) {
	    if (!Array.isArray(b)) {
	      return false;
	    }

	    if (a.length != b.length) {
	      return false;
	    }

	    for (i = 0, len = a.length; i < len; i++) {
	      if (!exports.deepEqual(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	  else if (a instanceof Object) {
	    if (Array.isArray(b) || !(b instanceof Object)) {
	      return false;
	    }

	    for (prop in a) {
	      //noinspection JSUnfilteredForInLoop
	      if (!exports.deepEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }
	    for (prop in b) {
	      //noinspection JSUnfilteredForInLoop
	      if (!exports.deepEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }
	    return true;
	  }
	  else {
	    return (typeof a === typeof b) && (a == b);
	  }
	};

	/**
	 * Test whether the current JavaScript engine supports Object.defineProperty
	 * @returns {boolean} returns true if supported
	 */
	exports.canDefineProperty = function () {
	  // test needed for broken IE8 implementation
	  try {
	    if (Object.defineProperty) {
	      Object.defineProperty({}, 'x', { get: function () {} });
	      return true;
	    }
	  } catch (e) {}

	  return false;
	};

	/**
	 * Attach a lazy loading property to a constant.
	 * The given function `fn` is called once when the property is first requested.
	 * On older browsers (<IE8), the function will fall back to direct evaluation
	 * of the properties value.
	 * @param {Object} object   Object where to add the property
	 * @param {string} prop     Property name
	 * @param {Function} fn     Function returning the property value. Called
	 *                          without arguments.
	 */
	exports.lazy = function (object, prop, fn) {
	  if (exports.canDefineProperty()) {
	    var _uninitialized = true;
	    var _value;
	    Object.defineProperty(object, prop, {
	      get: function () {
	        if (_uninitialized) {
	          _value = fn();
	          _uninitialized = false;
	        }
	        return _value;
	      },

	      set: function (value) {
	        _value = value;
	        _uninitialized = false;
	      },

	      configurable: true,
	      enumerable: true
	    });
	  }
	  else {
	    // fall back to immediate evaluation
	    object[prop] = fn();
	  }
	};

	/**
	 * Traverse a path into an object.
	 * When a namespace is missing, it will be created
	 * @param {Object} object
	 * @param {string} path   A dot separated string like 'name.space'
	 * @return {Object} Returns the object at the end of the path
	 */
	exports.traverse = function(object, path) {
	  var obj = object;

	  if (path) {
	    var names = path.split('.');
	    for (var i = 0; i < names.length; i++) {
	      var name = names[i];
	      if (!(name in obj)) {
	        obj[name] = {};
	      }
	      obj = obj[name];
	    }
	  }

	  return obj;
	};

	/**
	 * Test whether an object is a factory. a factory has fields:
	 *
	 * - factory: function (type: Object, config: Object, load: function, typed: function [, math: Object])   (required)
	 * - name: string (optional)
	 * - path: string    A dot separated path (optional)
	 * - math: boolean   If true (false by default), the math namespace is passed
	 *                   as fifth argument of the factory function
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	exports.isFactory = function (object) {
	  return object && typeof object.factory === 'function';
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var typedFunction = __webpack_require__(5);
	var digits = __webpack_require__(6).digits;

	// returns a new instance of typed-function
	var createTyped = function () {
	  // initially, return the original instance of typed-function
	  // consecutively, return a new instance from typed.create.
	  createTyped = typedFunction.create;
	  return typedFunction;
	};

	/**
	 * Factory function for creating a new typed instance
	 * @param {Object} type   Object with data types like Complex and BigNumber
	 * @returns {Function}
	 */
	exports.create = function create(type) {
	  // TODO: typed-function must be able to silently ignore signatures with unknown data types

	  // get a new instance of typed-function
	  var typed = createTyped();

	  // define all types. The order of the types determines in which order function
	  // arguments are type-checked (so for performance it's important to put the
	  // most used types first).
	  typed.types = [
	    { name: 'number',               test: function (x) { return typeof x === 'number'; } },
	    { name: 'Complex',              test: function (x) { return x && x.isComplex; } },
	    { name: 'BigNumber',            test: function (x) { return x && x.isBigNumber; } },
	    { name: 'Fraction',             test: function (x) { return x && x.isFraction; } },
	    { name: 'Unit',                 test: function (x) { return x && x.isUnit; } },
	    { name: 'string',               test: function (x) { return typeof x === 'string'; } },
	    { name: 'Array',                test: Array.isArray },
	    { name: 'Matrix',               test: function (x) { return x && x.isMatrix; } },
	    { name: 'DenseMatrix',          test: function (x) { return x && x.isDenseMatrix; } },
	    { name: 'SparseMatrix',         test: function (x) { return x && x.isSparseMatrix; } },
	    { name: 'ImmutableDenseMatrix', test: function (x) { return x && x.isImmutableDenseMatrix; } },
	    { name: 'Range',                test: function (x) { return x && x.isRange; } },
	    { name: 'Index',                test: function (x) { return x && x.isIndex; } },
	    { name: 'boolean',              test: function (x) { return typeof x === 'boolean'; } },
	    { name: 'ResultSet',            test: function (x) { return x && x.isResultSet; } },
	    { name: 'Help',                 test: function (x) { return x && x.isHelp; } },
	    { name: 'function',             test: function (x) { return typeof x === 'function';} },
	    { name: 'Date',                 test: function (x) { return x instanceof Date; } },
	    { name: 'RegExp',               test: function (x) { return x instanceof RegExp; } },
	    { name: 'Object',               test: function (x) { return typeof x === 'object'; } },
	    { name: 'null',                 test: function (x) { return x === null; } },
	    { name: 'undefined',            test: function (x) { return x === undefined; } }
	  ];

	  // TODO: add conversion from BigNumber to number?
	  typed.conversions = [
	    {
	      from: 'number',
	      to: 'BigNumber',
	      convert: function (x) {
	        // note: conversion from number to BigNumber can fail if x has >15 digits
	        if (digits(x) > 15) {
	          throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' +
	          '(value: ' + x + '). ' +
	          'Use function bignumber(x) to convert to BigNumber.');
	        }
	        return new type.BigNumber(x);
	      }
	    }, {
	      from: 'number',
	      to: 'Complex',
	      convert: function (x) {
	        return new type.Complex(x, 0);
	      }
	    }, {
	      from: 'number',
	      to: 'string',
	      convert: function (x) {
	        return x + '';
	      }
	    }, {
	      from: 'BigNumber',
	      to: 'Complex',
	      convert: function (x) {
	        return new type.Complex(x.toNumber(), 0);
	      }
	    }, {
	      from: 'Fraction',
	      to: 'BigNumber',
	      convert: function (x) {
	        throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' +
	            'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
	      }
	    }, {
	      from: 'Fraction',
	      to: 'Complex',
	      convert: function (x) {
	        return new type.Complex(x.valueOf(), 0);
	      }
	    }, {
	      from: 'number',
	      to: 'Fraction',
	      convert: function (x) {
	        if (digits(x) > 15) {
	          throw new TypeError('Cannot implicitly convert a number with >15 significant digits to Fraction ' +
	              '(value: ' + x + '). ' +
	              'Use function fraction(x) to convert to Fraction.');
	        }
	        return new type.Fraction(x);
	      }
	    }, {
	    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
	    //  from: 'Fraction',
	    //  to: 'number',
	    //  convert: function (x) {
	    //    return x.valueOf();
	    //  }
	    //}, {
	      from: 'string',
	      to: 'number',
	      convert: function (x) {
	        var n = Number(x);
	        if (isNaN(n)) {
	          throw new Error('Cannot convert "' + x + '" to a number');
	        }
	        return n;
	      }
	    }, {
	      from: 'boolean',
	      to: 'number',
	      convert: function (x) {
	        return +x;
	      }
	    }, {
	      from: 'boolean',
	      to: 'BigNumber',
	      convert: function (x) {
	        return new type.BigNumber(+x);
	      }
	    }, {
	      from: 'boolean',
	      to: 'Fraction',
	      convert: function (x) {
	        return new type.Fraction(+x);
	      }
	    }, {
	      from: 'boolean',
	      to: 'string',
	      convert: function (x) {
	        return +x;
	      }
	    }, {
	      from: 'null',
	      to: 'number',
	      convert: function () {
	        return 0;
	      }
	    }, {
	      from: 'null',
	      to: 'string',
	      convert: function () {
	        return 'null';
	      }
	    }, {
	      from: 'null',
	      to: 'BigNumber',
	      convert: function () {
	        return new type.BigNumber(0);
	      }
	    }, {
	      from: 'null',
	      to: 'Fraction',
	      convert: function () {
	        return new type.Fraction(0);
	      }
	    }, {
	      from: 'Array',
	      to: 'Matrix',
	      convert: function (array) {
	        // TODO: how to decide on the right type of matrix to create?
	        return new type.DenseMatrix(array);
	      }
	    }, {
	      from: 'Matrix',
	      to: 'Array',
	      convert: function (matrix) {
	        return matrix.valueOf();
	      }
	    }
	  ];

	  return typed;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * typed-function
	 *
	 * Type checking for JavaScript functions
	 *
	 * https://github.com/josdejong/typed-function
	 */
	'use strict';

	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // OldNode. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like OldNode.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.typed = factory();
	  }
	}(this, function () {
	  // factory function to create a new instance of typed-function
	  // TODO: allow passing configuration, types, tests via the factory function
	  function create() {
	    /**
	     * Get a type test function for a specific data type
	     * @param {string} name                   Name of a data type like 'number' or 'string'
	     * @returns {Function(obj: *) : boolean}  Returns a type testing function.
	     *                                        Throws an error for an unknown type.
	     */
	    function getTypeTest(name) {
	      var test;
	      for (var i = 0; i < typed.types.length; i++) {
	        var entry = typed.types[i];
	        if (entry.name === name) {
	          test = entry.test;
	          break;
	        }
	      }

	      if (!test) {
	        var hint;
	        for (i = 0; i < typed.types.length; i++) {
	          entry = typed.types[i];
	          if (entry.name.toLowerCase() == name.toLowerCase()) {
	            hint = entry.name;
	            break;
	          }
	        }

	        throw new Error('Unknown type "' + name + '"' +
	            (hint ? ('. Did you mean "' + hint + '"?') : ''));
	      }
	      return test;
	    }

	    /**
	     * Retrieve the function name from a set of functions, and check
	     * whether the name of all functions match (if given)
	     * @param {Array.<function>} fns
	     */
	    function getName (fns) {
	      var name = '';

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];

	        // merge function name when this is a typed function
	        if (fn.signatures && fn.name != '') {
	          if (name == '') {
	            name = fn.name;
	          }
	          else if (name != fn.name) {
	            var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
	            err.data = {
	              actual: fn.name,
	              expected: name
	            };
	            throw err;
	          }
	        }
	      }

	      return name;
	    }

	    /**
	     * Create an ArgumentsError. Creates messages like:
	     *
	     *   Unexpected type of argument (expected: ..., actual: ..., index: ...)
	     *   Too few arguments (expected: ..., index: ...)
	     *   Too many arguments (expected: ..., actual: ...)
	     *
	     * @param {String} fn         Function name
	     * @param {number} argCount   Number of arguments
	     * @param {Number} index      Current argument index
	     * @param {*} actual          Current argument
	     * @param {string} [expected] An optional, comma separated string with
	     *                            expected types on given index
	     * @extends Error
	     */
	    function createError(fn, argCount, index, actual, expected) {
	      var actualType = getTypeOf(actual);
	      var _expected = expected ? expected.split(',') : null;
	      var _fn = (fn || 'unnamed');
	      var anyType = _expected && contains(_expected, 'any');
	      var message;
	      var data = {
	        fn: fn,
	        index: index,
	        actual: actual,
	        expected: _expected
	      };

	      if (_expected) {
	        if (argCount > index && !anyType) {
	          // unexpected type
	          message = 'Unexpected type of argument in function ' + _fn +
	              ' (expected: ' + _expected.join(' or ') + ', actual: ' + actualType + ', index: ' + index + ')';
	        }
	        else {
	          // too few arguments
	          message = 'Too few arguments in function ' + _fn +
	              ' (expected: ' + _expected.join(' or ') + ', index: ' + index + ')';
	        }
	      }
	      else {
	        // too many arguments
	        message = 'Too many arguments in function ' + _fn +
	            ' (expected: ' + index + ', actual: ' + argCount + ')'
	      }

	      var err = new TypeError(message);
	      err.data = data;
	      return err;
	    }

	    /**
	     * Collection with function references (local shortcuts to functions)
	     * @constructor
	     * @param {string} [name='refs']  Optional name for the refs, used to generate
	     *                                JavaScript code
	     */
	    function Refs(name) {
	      this.name = name || 'refs';
	      this.categories = {};
	    }

	    /**
	     * Add a function reference.
	     * @param {Function} fn
	     * @param {string} [category='fn']    A function category, like 'fn' or 'signature'
	     * @returns {string} Returns the function name, for example 'fn0' or 'signature2'
	     */
	    Refs.prototype.add = function (fn, category) {
	      var cat = category || 'fn';
	      if (!this.categories[cat]) this.categories[cat] = [];

	      var index = this.categories[cat].indexOf(fn);
	      if (index == -1) {
	        index = this.categories[cat].length;
	        this.categories[cat].push(fn);
	      }

	      return cat + index;
	    };

	    /**
	     * Create code lines for all function references
	     * @returns {string} Returns the code containing all function references
	     */
	    Refs.prototype.toCode = function () {
	      var code = [];
	      var path = this.name + '.categories';
	      var categories = this.categories;

	      for (var cat in categories) {
	        if (categories.hasOwnProperty(cat)) {
	          var category = categories[cat];

	          for (var i = 0; i < category.length; i++) {
	            code.push('var ' + cat + i + ' = ' + path + '[\'' + cat + '\'][' + i + '];');
	          }
	        }
	      }

	      return code.join('\n');
	    };

	    /**
	     * A function parameter
	     * @param {string | string[] | Param} types    A parameter type like 'string',
	     *                                             'number | boolean'
	     * @param {boolean} [varArgs=false]            Variable arguments if true
	     * @constructor
	     */
	    function Param(types, varArgs) {
	      // parse the types, can be a string with types separated by pipe characters |
	      if (typeof types === 'string') {
	        // parse variable arguments operator (ellipses '...number')
	        var _types = types.trim();
	        var _varArgs = _types.substr(0, 3) === '...';
	        if (_varArgs) {
	          _types = _types.substr(3);
	        }
	        if (_types === '') {
	          this.types = ['any'];
	        }
	        else {
	          this.types = _types.split('|');
	          for (var i = 0; i < this.types.length; i++) {
	            this.types[i] = this.types[i].trim();
	          }
	        }
	      }
	      else if (Array.isArray(types)) {
	        this.types = types;
	      }
	      else if (types instanceof Param) {
	        return types.clone();
	      }
	      else {
	        throw new Error('String or Array expected');
	      }

	      // can hold a type to which to convert when handling this parameter
	      this.conversions = [];
	      // TODO: implement better API for conversions, be able to add conversions via constructor (support a new type Object?)

	      // variable arguments
	      this.varArgs = _varArgs || varArgs || false;

	      // check for any type arguments
	      this.anyType = this.types.indexOf('any') !== -1;
	    }

	    /**
	     * Order Params
	     * any type ('any') will be ordered last, and object as second last (as other
	     * types may be an object as well, like Array).
	     *
	     * @param {Param} a
	     * @param {Param} b
	     * @returns {number} Returns 1 if a > b, -1 if a < b, and else 0.
	     */
	    Param.compare = function (a, b) {
	      // TODO: simplify parameter comparison, it's a mess
	      if (a.anyType) return 1;
	      if (b.anyType) return -1;

	      if (contains(a.types, 'Object')) return 1;
	      if (contains(b.types, 'Object')) return -1;

	      if (a.hasConversions()) {
	        if (b.hasConversions()) {
	          var i, ac, bc;

	          for (i = 0; i < a.conversions.length; i++) {
	            if (a.conversions[i] !== undefined) {
	              ac = a.conversions[i];
	              break;
	            }
	          }

	          for (i = 0; i < b.conversions.length; i++) {
	            if (b.conversions[i] !== undefined) {
	              bc = b.conversions[i];
	              break;
	            }
	          }

	          return typed.conversions.indexOf(ac) - typed.conversions.indexOf(bc);
	        }
	        else {
	          return 1;
	        }
	      }
	      else {
	        if (b.hasConversions()) {
	          return -1;
	        }
	        else {
	          // both params have no conversions
	          var ai, bi;

	          for (i = 0; i < typed.types.length; i++) {
	            if (typed.types[i].name === a.types[0]) {
	              ai = i;
	              break;
	            }
	          }

	          for (i = 0; i < typed.types.length; i++) {
	            if (typed.types[i].name === b.types[0]) {
	              bi = i;
	              break;
	            }
	          }

	          return ai - bi;
	        }
	      }
	    };

	    /**
	     * Test whether this parameters types overlap an other parameters types.
	     * Will not match ['any'] with ['number']
	     * @param {Param} other
	     * @return {boolean} Returns true when there are overlapping types
	     */
	    Param.prototype.overlapping = function (other) {
	      for (var i = 0; i < this.types.length; i++) {
	        if (contains(other.types, this.types[i])) {
	          return true;
	        }
	      }
	      return false;
	    };

	    /**
	     * Test whether this parameters types matches an other parameters types.
	     * When any of the two parameters contains `any`, true is returned
	     * @param {Param} other
	     * @return {boolean} Returns true when there are matching types
	     */
	    Param.prototype.matches = function (other) {
	      return this.anyType || other.anyType || this.overlapping(other);
	    };

	    /**
	     * Create a clone of this param
	     * @returns {Param} Returns a cloned version of this param
	     */
	    Param.prototype.clone = function () {
	      var param = new Param(this.types.slice(), this.varArgs);
	      param.conversions = this.conversions.slice();
	      return param;
	    };

	    /**
	     * Test whether this parameter contains conversions
	     * @returns {boolean} Returns true if the parameter contains one or
	     *                    multiple conversions.
	     */
	    Param.prototype.hasConversions = function () {
	      return this.conversions.length > 0;
	    };

	    /**
	     * Tests whether this parameters contains any of the provided types
	     * @param {Object} types  A Map with types, like {'number': true}
	     * @returns {boolean}     Returns true when the parameter contains any
	     *                        of the provided types
	     */
	    Param.prototype.contains = function (types) {
	      for (var i = 0; i < this.types.length; i++) {
	        if (types[this.types[i]]) {
	          return true;
	        }
	      }
	      return false;
	    };

	    /**
	     * Return a string representation of this params types, like 'string' or
	     * 'number | boolean' or '...number'
	     * @param {boolean} [toConversion]   If true, the returned types string
	     *                                   contains the types where the parameter
	     *                                   will convert to. If false (default)
	     *                                   the "from" types are returned
	     * @returns {string}
	     */
	    Param.prototype.toString = function (toConversion) {
	      var types = [];
	      var keys = {};

	      for (var i = 0; i < this.types.length; i++) {
	        var conversion = this.conversions[i];
	        var type = toConversion && conversion ? conversion.to : this.types[i];
	        if (!(type in keys)) {
	          keys[type] = true;
	          types.push(type);
	        }
	      }

	      return (this.varArgs ? '...' : '') + types.join('|');
	    };

	    /**
	     * A function signature
	     * @param {string | string[] | Param[]} params
	     *                         Array with the type(s) of each parameter,
	     *                         or a comma separated string with types
	     * @param {Function} fn    The actual function
	     * @constructor
	     */
	    function Signature(params, fn) {
	      var _params;
	      if (typeof params === 'string') {
	        _params = (params !== '') ? params.split(',') : [];
	      }
	      else if (Array.isArray(params)) {
	        _params = params;
	      }
	      else {
	        throw new Error('string or Array expected');
	      }

	      this.params = new Array(_params.length);
	      this.anyType = false;
	      this.varArgs = false;
	      for (var i = 0; i < _params.length; i++) {
	        var param = new Param(_params[i]);
	        this.params[i] = param;
	        if (param.anyType) {
	          this.anyType = true;
	        }
	        if (i === _params.length - 1) {
	          // the last argument
	          this.varArgs = param.varArgs;
	        }
	        else {
	          // non-last argument
	          if (param.varArgs) {
	            throw new SyntaxError('Unexpected variable arguments operator "..."');
	          }
	        }
	      }

	      this.fn = fn;
	    }

	    /**
	     * Create a clone of this signature
	     * @returns {Signature} Returns a cloned version of this signature
	     */
	    Signature.prototype.clone = function () {
	      return new Signature(this.params.slice(), this.fn);
	    };

	    /**
	     * Expand a signature: split params with union types in separate signatures
	     * For example split a Signature "string | number" into two signatures.
	     * @return {Signature[]} Returns an array with signatures (at least one)
	     */
	    Signature.prototype.expand = function () {
	      var signatures = [];

	      function recurse(signature, path) {
	        if (path.length < signature.params.length) {
	          var i, newParam, conversion;

	          var param = signature.params[path.length];
	          if (param.varArgs) {
	            // a variable argument. do not split the types in the parameter
	            newParam = param.clone();

	            // add conversions to the parameter
	            // recurse for all conversions
	            for (i = 0; i < typed.conversions.length; i++) {
	              conversion = typed.conversions[i];
	              if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
	                var j = newParam.types.length;
	                newParam.types[j] = conversion.from;
	                newParam.conversions[j] = conversion;
	              }
	            }

	            recurse(signature, path.concat(newParam));
	          }
	          else {
	            // split each type in the parameter
	            for (i = 0; i < param.types.length; i++) {
	              recurse(signature, path.concat(new Param(param.types[i])));
	            }

	            // recurse for all conversions
	            for (i = 0; i < typed.conversions.length; i++) {
	              conversion = typed.conversions[i];
	              if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
	                newParam = new Param(conversion.from);
	                newParam.conversions[0] = conversion;
	                recurse(signature, path.concat(newParam));
	              }
	            }
	          }
	        }
	        else {
	          signatures.push(new Signature(path, signature.fn));
	        }
	      }

	      recurse(this, []);

	      return signatures;
	    };

	    /**
	     * Compare two signatures.
	     *
	     * When two params are equal and contain conversions, they will be sorted
	     * by lowest index of the first conversions.
	     *
	     * @param {Signature} a
	     * @param {Signature} b
	     * @returns {number} Returns 1 if a > b, -1 if a < b, and else 0.
	     */
	    Signature.compare = function (a, b) {
	      if (a.params.length > b.params.length) return 1;
	      if (a.params.length < b.params.length) return -1;

	      // count the number of conversions
	      var i;
	      var len = a.params.length; // a and b have equal amount of params
	      var ac = 0;
	      var bc = 0;
	      for (i = 0; i < len; i++) {
	        if (a.params[i].hasConversions()) ac++;
	        if (b.params[i].hasConversions()) bc++;
	      }

	      if (ac > bc) return 1;
	      if (ac < bc) return -1;

	      // compare the order per parameter
	      for (i = 0; i < a.params.length; i++) {
	        var cmp = Param.compare(a.params[i], b.params[i]);
	        if (cmp !== 0) {
	          return cmp;
	        }
	      }

	      return 0;
	    };

	    /**
	     * Test whether any of the signatures parameters has conversions
	     * @return {boolean} Returns true when any of the parameters contains
	     *                   conversions.
	     */
	    Signature.prototype.hasConversions = function () {
	      for (var i = 0; i < this.params.length; i++) {
	        if (this.params[i].hasConversions()) {
	          return true;
	        }
	      }
	      return false;
	    };

	    /**
	     * Test whether this signature should be ignored.
	     * Checks whether any of the parameters contains a type listed in
	     * typed.ignore
	     * @return {boolean} Returns true when the signature should be ignored
	     */
	    Signature.prototype.ignore = function () {
	      // create a map with ignored types
	      var types = {};
	      for (var i = 0; i < typed.ignore.length; i++) {
	        types[typed.ignore[i]] = true;
	      }

	      // test whether any of the parameters contains this type
	      for (i = 0; i < this.params.length; i++) {
	        if (this.params[i].contains(types)) {
	          return true;
	        }
	      }

	      return false;
	    };

	    /**
	     * Test whether the path of this signature matches a given path.
	     * @param {Param[]} params
	     */
	    Signature.prototype.paramsStartWith = function (params) {
	      if (params.length === 0) {
	        return true;
	      }

	      var aLast = last(this.params);
	      var bLast = last(params);

	      for (var i = 0; i < params.length; i++) {
	        var a = this.params[i] || (aLast.varArgs ? aLast: null);
	        var b = params[i]      || (bLast.varArgs ? bLast: null);

	        if (!a ||  !b || !a.matches(b)) {
	          return false;
	        }
	      }

	      return true;
	    };

	    /**
	     * Generate the code to invoke this signature
	     * @param {Refs} refs
	     * @param {string} prefix
	     * @returns {string} Returns code
	     */
	    Signature.prototype.toCode = function (refs, prefix) {
	      var code = [];

	      var args = new Array(this.params.length);
	      for (var i = 0; i < this.params.length; i++) {
	        var param = this.params[i];
	        var conversion = param.conversions[0];
	        if (param.varArgs) {
	          args[i] = 'varArgs';
	        }
	        else if (conversion) {
	          args[i] = refs.add(conversion.convert, 'convert') + '(arg' + i + ')';
	        }
	        else {
	          args[i] = 'arg' + i;
	        }
	      }

	      var ref = this.fn ? refs.add(this.fn, 'signature') : undefined;
	      if (ref) {
	        return prefix + 'return ' + ref + '(' + args.join(', ') + '); // signature: ' + this.params.join(', ');
	      }

	      return code.join('\n');
	    };

	    /**
	     * Return a string representation of the signature
	     * @returns {string}
	     */
	    Signature.prototype.toString = function () {
	      return this.params.join(', ');
	    };

	    /**
	     * A group of signatures with the same parameter on given index
	     * @param {Param[]} path
	     * @param {Signature} [signature]
	     * @param {Node[]} childs
	     * @param {boolean} [fallThrough=false]
	     * @constructor
	     */
	    function Node(path, signature, childs, fallThrough) {
	      this.path = path || [];
	      this.param = path[path.length - 1] || null;
	      this.signature = signature || null;
	      this.childs = childs || [];
	      this.fallThrough = fallThrough || false;
	    }

	    /**
	     * Generate code for this group of signatures
	     * @param {Refs} refs
	     * @param {string} prefix
	     * @returns {string} Returns the code as string
	     */
	    Node.prototype.toCode = function (refs, prefix) {
	      // TODO: split this function in multiple functions, it's too large
	      var code = [];

	      if (this.param) {
	        var index = this.path.length - 1;
	        var conversion = this.param.conversions[0];
	        var comment = '// type: ' + (conversion ?
	                (conversion.from + ' (convert to ' + conversion.to + ')') :
	                this.param);

	        // non-root node (path is non-empty)
	        if (this.param.varArgs) {
	          if (this.param.anyType) {
	            // variable arguments with any type
	            code.push(prefix + 'if (arguments.length > ' + index + ') {');
	            code.push(prefix + '  var varArgs = [];');
	            code.push(prefix + '  for (var i = ' + index + '; i < arguments.length; i++) {');
	            code.push(prefix + '    varArgs.push(arguments[i]);');
	            code.push(prefix + '  }');
	            code.push(this.signature.toCode(refs, prefix + '  '));
	            code.push(prefix + '}');
	          }
	          else {
	            // variable arguments with a fixed type
	            var getTests = function (types, arg) {
	              var tests = [];
	              for (var i = 0; i < types.length; i++) {
	                tests[i] = refs.add(getTypeTest(types[i]), 'test') + '(' + arg + ')';
	              }
	              return tests.join(' || ');
	            }.bind(this);

	            var allTypes = this.param.types;
	            var exactTypes = [];
	            for (var i = 0; i < allTypes.length; i++) {
	              if (this.param.conversions[i] === undefined) {
	                exactTypes.push(allTypes[i]);
	              }
	            }

	            code.push(prefix + 'if (' + getTests(allTypes, 'arg' + index) + ') { ' + comment);
	            code.push(prefix + '  var varArgs = [arg' + index + '];');
	            code.push(prefix + '  for (var i = ' + (index + 1) + '; i < arguments.length; i++) {');
	            code.push(prefix + '    if (' + getTests(exactTypes, 'arguments[i]') + ') {');
	            code.push(prefix + '      varArgs.push(arguments[i]);');

	            for (var i = 0; i < allTypes.length; i++) {
	              var conversion_i = this.param.conversions[i];
	              if (conversion_i) {
	                var test = refs.add(getTypeTest(allTypes[i]), 'test');
	                var convert = refs.add(conversion_i.convert, 'convert');
	                code.push(prefix + '    }');
	                code.push(prefix + '    else if (' + test + '(arguments[i])) {');
	                code.push(prefix + '      varArgs.push(' + convert + '(arguments[i]));');
	              }
	            }
	            code.push(prefix + '    } else {');
	            code.push(prefix + '      throw createError(name, arguments.length, i, arguments[i], \'' + exactTypes.join(',') + '\');');
	            code.push(prefix + '    }');
	            code.push(prefix + '  }');
	            code.push(this.signature.toCode(refs, prefix + '  '));
	            code.push(prefix + '}');
	          }
	        }
	        else {
	          if (this.param.anyType) {
	            // any type
	            code.push(prefix + '// type: any');
	            code.push(this._innerCode(refs, prefix));
	          }
	          else {
	            // regular type
	            var type = this.param.types[0];
	            var test = type !== 'any' ? refs.add(getTypeTest(type), 'test') : null;

	            code.push(prefix + 'if (' + test + '(arg' + index + ')) { ' + comment);
	            code.push(this._innerCode(refs, prefix + '  '));
	            code.push(prefix + '}');
	          }
	        }
	      }
	      else {
	        // root node (path is empty)
	        code.push(this._innerCode(refs, prefix));
	      }

	      return code.join('\n');
	    };

	    /**
	     * Generate inner code for this group of signatures.
	     * This is a helper function of Node.prototype.toCode
	     * @param {Refs} refs
	     * @param {string} prefix
	     * @returns {string} Returns the inner code as string
	     * @private
	     */
	    Node.prototype._innerCode = function (refs, prefix) {
	      var code = [];
	      var i;

	      if (this.signature) {
	        code.push(prefix + 'if (arguments.length === ' + this.path.length + ') {');
	        code.push(this.signature.toCode(refs, prefix + '  '));
	        code.push(prefix + '}');
	      }

	      for (i = 0; i < this.childs.length; i++) {
	        code.push(this.childs[i].toCode(refs, prefix));
	      }

	      // TODO: shouldn't the this.param.anyType check be redundant
	      if (!this.fallThrough || (this.param && this.param.anyType)) {
	        var exceptions = this._exceptions(refs, prefix);
	        if (exceptions) {
	          code.push(exceptions);
	        }
	      }

	      return code.join('\n');
	    };


	    /**
	     * Generate code to throw exceptions
	     * @param {Refs} refs
	     * @param {string} prefix
	     * @returns {string} Returns the inner code as string
	     * @private
	     */
	    Node.prototype._exceptions = function (refs, prefix) {
	      var index = this.path.length;

	      if (this.childs.length === 0) {
	        // TODO: can this condition be simplified? (we have a fall-through here)
	        return [
	          prefix + 'if (arguments.length > ' + index + ') {',
	          prefix + '  throw createError(name, arguments.length, ' + index + ', arguments[' + index + ']);',
	          prefix + '}'
	        ].join('\n');
	      }
	      else {
	        var keys = {};
	        var types = [];

	        for (var i = 0; i < this.childs.length; i++) {
	          var node = this.childs[i];
	          if (node.param) {
	            for (var j = 0; j < node.param.types.length; j++) {
	              var type = node.param.types[j];
	              if (!(type in keys) && !node.param.conversions[j]) {
	                keys[type] = true;
	                types.push(type);
	              }
	            }
	          }
	        }

	        return prefix + 'throw createError(name, arguments.length, ' + index + ', arguments[' + index + '], \'' + types.join(',') + '\');';
	      }
	    };

	    /**
	     * Split all raw signatures into an array with expanded Signatures
	     * @param {Object.<string, Function>} rawSignatures
	     * @return {Signature[]} Returns an array with expanded signatures
	     */
	    function parseSignatures(rawSignatures) {
	      // FIXME: need to have deterministic ordering of signatures, do not create via object
	      var signature;
	      var keys = {};
	      var signatures = [];
	      var i;

	      for (var types in rawSignatures) {
	        if (rawSignatures.hasOwnProperty(types)) {
	          var fn = rawSignatures[types];
	          signature = new Signature(types, fn);

	          if (signature.ignore()) {
	            continue;
	          }

	          var expanded = signature.expand();

	          for (i = 0; i < expanded.length; i++) {
	            var signature_i = expanded[i];
	            var key = signature_i.toString();
	            var existing = keys[key];
	            if (!existing) {
	              keys[key] = signature_i;
	            }
	            else {
	              var cmp = Signature.compare(signature_i, existing);
	              if (cmp < 0) {
	                // override if sorted first
	                keys[key] = signature_i;
	              }
	              else if (cmp === 0) {
	                throw new Error('Signature "' + key + '" is defined twice');
	              }
	              // else: just ignore
	            }
	          }
	        }
	      }

	      // convert from map to array
	      for (key in keys) {
	        if (keys.hasOwnProperty(key)) {
	          signatures.push(keys[key]);
	        }
	      }

	      // order the signatures
	      signatures.sort(function (a, b) {
	        return Signature.compare(a, b);
	      });

	      // filter redundant conversions from signatures with varArgs
	      // TODO: simplify this loop or move it to a separate function
	      for (i = 0; i < signatures.length; i++) {
	        signature = signatures[i];

	        if (signature.varArgs) {
	          var index = signature.params.length - 1;
	          var param = signature.params[index];

	          var t = 0;
	          while (t < param.types.length) {
	            if (param.conversions[t]) {
	              var type = param.types[t];

	              for (var j = 0; j < signatures.length; j++) {
	                var other = signatures[j];
	                var p = other.params[index];

	                if (other !== signature &&
	                    p &&
	                    contains(p.types, type) && !p.conversions[index]) {
	                  // this (conversion) type already exists, remove it
	                  param.types.splice(t, 1);
	                  param.conversions.splice(t, 1);
	                  t--;
	                  break;
	                }
	              }
	            }
	            t++;
	          }
	        }
	      }

	      return signatures;
	    }

	    /**
	     * Filter all any type signatures
	     * @param {Signature[]} signatures
	     * @return {Signature[]} Returns only any type signatures
	     */
	    function filterAnyTypeSignatures (signatures) {
	      var filtered = [];

	      for (var i = 0; i < signatures.length; i++) {
	        if (signatures[i].anyType) {
	          filtered.push(signatures[i]);
	        }
	      }

	      return filtered;
	    }

	    /**
	     * create a map with normalized signatures as key and the function as value
	     * @param {Signature[]} signatures   An array with split signatures
	     * @return {Object.<string, Function>} Returns a map with normalized
	     *                                     signatures as key, and the function
	     *                                     as value.
	     */
	    function mapSignatures(signatures) {
	      var normalized = {};

	      for (var i = 0; i < signatures.length; i++) {
	        var signature = signatures[i];
	        if (signature.fn && !signature.hasConversions()) {
	          var params = signature.params.join(',');
	          normalized[params] = signature.fn;
	        }
	      }

	      return normalized;
	    }

	    /**
	     * Parse signatures recursively in a node tree.
	     * @param {Signature[]} signatures  Array with expanded signatures
	     * @param {Param[]} path            Traversed path of parameter types
	     * @param {Signature[]} anys
	     * @return {Node}                   Returns a node tree
	     */
	    function parseTree(signatures, path, anys) {
	      var i, signature;
	      var index = path.length;
	      var nodeSignature;

	      var filtered = [];
	      for (i = 0; i < signatures.length; i++) {
	        signature = signatures[i];

	        // filter the first signature with the correct number of params
	        if (signature.params.length === index && !nodeSignature) {
	          nodeSignature = signature;
	        }

	        if (signature.params[index] != undefined) {
	          filtered.push(signature);
	        }
	      }

	      // sort the filtered signatures by param
	      filtered.sort(function (a, b) {
	        return Param.compare(a.params[index], b.params[index]);
	      });

	      // recurse over the signatures
	      var entries = [];
	      for (i = 0; i < filtered.length; i++) {
	        signature = filtered[i];
	        // group signatures with the same param at current index
	        var param = signature.params[index];

	        // TODO: replace the next filter loop
	        var existing = entries.filter(function (entry) {
	          return entry.param.overlapping(param);
	        })[0];

	        //var existing;
	        //for (var j = 0; j < entries.length; j++) {
	        //  if (entries[j].param.overlapping(param)) {
	        //    existing = entries[j];
	        //    break;
	        //  }
	        //}

	        if (existing) {
	          if (existing.param.varArgs) {
	            throw new Error('Conflicting types "' + existing.param + '" and "' + param + '"');
	          }
	          existing.signatures.push(signature);
	        }
	        else {
	          entries.push({
	            param: param,
	            signatures: [signature]
	          });
	        }
	      }

	      // find all any type signature that can still match our current path
	      var matchingAnys = [];
	      for (i = 0; i < anys.length; i++) {
	        if (anys[i].paramsStartWith(path)) {
	          matchingAnys.push(anys[i]);
	        }
	      }

	      // see if there are any type signatures that don't match any of the
	      // signatures that we have in our tree, i.e. we have alternative
	      // matching signature(s) outside of our current tree and we should
	      // fall through to them instead of throwing an exception
	      var fallThrough = false;
	      for (i = 0; i < matchingAnys.length; i++) {
	        if (!contains(signatures, matchingAnys[i])) {
	          fallThrough = true;
	          break;
	        }
	      }

	      // parse the childs
	      var childs = new Array(entries.length);
	      for (i = 0; i < entries.length; i++) {
	        var entry = entries[i];
	        childs[i] = parseTree(entry.signatures, path.concat(entry.param), matchingAnys)
	      }

	      return new Node(path, nodeSignature, childs, fallThrough);
	    }

	    /**
	     * Generate an array like ['arg0', 'arg1', 'arg2']
	     * @param {number} count Number of arguments to generate
	     * @returns {Array} Returns an array with argument names
	     */
	    function getArgs(count) {
	      // create an array with all argument names
	      var args = [];
	      for (var i = 0; i < count; i++) {
	        args[i] = 'arg' + i;
	      }

	      return args;
	    }

	    /**
	     * Compose a function from sub-functions each handling a single type signature.
	     * Signatures:
	     *   typed(signature: string, fn: function)
	     *   typed(name: string, signature: string, fn: function)
	     *   typed(signatures: Object.<string, function>)
	     *   typed(name: string, signatures: Object.<string, function>)
	     *
	     * @param {string | null} name
	     * @param {Object.<string, Function>} signatures
	     * @return {Function} Returns the typed function
	     * @private
	     */
	    function _typed(name, signatures) {
	      var refs = new Refs();

	      // parse signatures, expand them
	      var _signatures = parseSignatures(signatures);
	      if (_signatures.length == 0) {
	        throw new Error('No signatures provided');
	      }

	      // filter all any type signatures
	      var anys = filterAnyTypeSignatures(_signatures);

	      // parse signatures into a node tree
	      var node = parseTree(_signatures, [], anys);

	      //var util = require('util');
	      //console.log('ROOT');
	      //console.log(util.inspect(node, { depth: null }));

	      // generate code for the typed function
	      var code = [];
	      var _name = name || '';
	      var _args = getArgs(maxParams(_signatures));
	      code.push('function ' + _name + '(' + _args.join(', ') + ') {');
	      code.push('  "use strict";');
	      code.push('  var name = \'' + _name + '\';');
	      code.push(node.toCode(refs, '  ', false));
	      code.push('}');

	      // generate body for the factory function
	      var body = [
	        refs.toCode(),
	        'return ' + code.join('\n')
	      ].join('\n');

	      // evaluate the JavaScript code and attach function references
	      var factory = (new Function(refs.name, 'createError', body));
	      var fn = factory(refs, createError);

	      //console.log('FN\n' + fn.toString()); // TODO: cleanup

	      // attach the signatures with sub-functions to the constructed function
	      fn.signatures = mapSignatures(_signatures);

	      return fn;
	    }

	    /**
	     * Calculate the maximum number of parameters in givens signatures
	     * @param {Signature[]} signatures
	     * @returns {number} The maximum number of parameters
	     */
	    function maxParams(signatures) {
	      var max = 0;

	      for (var i = 0; i < signatures.length; i++) {
	        var len = signatures[i].params.length;
	        if (len > max) {
	          max = len;
	        }
	      }

	      return max;
	    }

	    /**
	     * Get the type of a value
	     * @param {*} x
	     * @returns {string} Returns a string with the type of value
	     */
	    function getTypeOf(x) {
	      var obj;

	      for (var i = 0; i < typed.types.length; i++) {
	        var entry = typed.types[i];

	        if (entry.name === 'Object') {
	          // Array and Date are also Object, so test for Object afterwards
	          obj = entry;
	        }
	        else {
	          if (entry.test(x)) return entry.name;
	        }
	      }

	      // at last, test whether an object
	      if (obj && obj.test(x)) return obj.name;

	      return 'unknown';
	    }

	    /**
	     * Test whether an array contains some item
	     * @param {Array} array
	     * @param {*} item
	     * @return {boolean} Returns true if array contains item, false if not.
	     */
	    function contains(array, item) {
	      return array.indexOf(item) !== -1;
	    }

	    /**
	     * Returns the last item in the array
	     * @param {Array} array
	     * @return {*} item
	     */
	    function last (array) {
	      return array[array.length - 1];
	    }

	    // data type tests
	    var types = [
	      { name: 'number',    test: function (x) { return typeof x === 'number' } },
	      { name: 'string',    test: function (x) { return typeof x === 'string' } },
	      { name: 'boolean',   test: function (x) { return typeof x === 'boolean' } },
	      { name: 'Function',  test: function (x) { return typeof x === 'function'} },
	      { name: 'Array',     test: Array.isArray },
	      { name: 'Date',      test: function (x) { return x instanceof Date } },
	      { name: 'RegExp',    test: function (x) { return x instanceof RegExp } },
	      { name: 'Object',    test: function (x) { return typeof x === 'object' } },
	      { name: 'null',      test: function (x) { return x === null } },
	      { name: 'undefined', test: function (x) { return x === undefined } }
	    ];

	    // configuration
	    var config = {};

	    // type conversions. Order is important
	    var conversions = [];

	    // types to be ignored
	    var ignore = [];

	    // temporary object for holding types and conversions, for constructing
	    // the `typed` function itself
	    // TODO: find a more elegant solution for this
	    var typed = {
	      config: config,
	      types: types,
	      conversions: conversions,
	      ignore: ignore
	    };

	    /**
	     * Construct the typed function itself with various signatures
	     *
	     * Signatures:
	     *
	     *   typed(signatures: Object.<string, function>)
	     *   typed(name: string, signatures: Object.<string, function>)
	     */
	    typed = _typed('typed', {
	      'Object': function (signatures) {
	        var fns = [];
	        for (var signature in signatures) {
	          if (signatures.hasOwnProperty(signature)) {
	            fns.push(signatures[signature]);
	          }
	        }
	        var name = getName(fns);

	        return _typed(name, signatures);
	      },
	      'string, Object': _typed,
	      // TODO: add a signature 'Array.<function>'
	      '...Function': function (fns) {
	        var err;
	        var name = getName(fns);
	        var signatures = {};

	        for (var i = 0; i < fns.length; i++) {
	          var fn = fns[i];

	          // test whether this is a typed-function
	          if (!(typeof fn.signatures === 'object')) {
	            err = new TypeError('Function is no typed-function (index: ' + i + ')');
	            err.data = {index: i};
	            throw err;
	          }

	          // merge the signatures
	          for (var signature in fn.signatures) {
	            if (fn.signatures.hasOwnProperty(signature)) {
	              if (signatures.hasOwnProperty(signature)) {
	                if (fn.signatures[signature] !== signatures[signature]) {
	                  err = new Error('Signature "' + signature + '" is defined twice');
	                  err.data = {signature: signature};
	                  throw err;
	                }
	                // else: both signatures point to the same function, that's fine
	              }
	              else {
	                signatures[signature] = fn.signatures[signature];
	              }
	            }
	          }
	        }

	        return _typed(name, signatures);
	      }
	    });

	    /**
	     * Find a specific signature from a (composed) typed function, for
	     * example:
	     *
	     *   typed.find(fn, ['number', 'string'])
	     *   typed.find(fn, 'number, string')
	     *
	     * Function find only only works for exact matches.
	     *
	     * @param {Function} fn                   A typed-function
	     * @param {string | string[]} signature   Signature to be found, can be
	     *                                        an array or a comma separated string.
	     * @return {Function}                     Returns the matching signature, or
	     *                                        throws an errror when no signature
	     *                                        is found.
	     */
	    function find (fn, signature) {
	      if (!fn.signatures) {
	        throw new TypeError('Function is no typed-function');
	      }

	      // normalize input
	      var arr;
	      if (typeof signature === 'string') {
	        arr = signature.split(',');
	        for (var i = 0; i < arr.length; i++) {
	          arr[i] = arr[i].trim();
	        }
	      }
	      else if (Array.isArray(signature)) {
	        arr = signature;
	      }
	      else {
	        throw new TypeError('String array or a comma separated string expected');
	      }

	      var str = arr.join(',');

	      // find an exact match
	      var match = fn.signatures[str];
	      if (match) {
	        return match;
	      }

	      // TODO: extend find to match non-exact signatures

	      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
	    }

	    /**
	     * Convert a given value to another data type.
	     * @param {*} value
	     * @param {string} type
	     */
	    function convert (value, type) {
	      var from = getTypeOf(value);

	      // check conversion is needed
	      if (type === from) {
	        return value;
	      }

	      for (var i = 0; i < typed.conversions.length; i++) {
	        var conversion = typed.conversions[i];
	        if (conversion.from === from && conversion.to === type) {
	          return conversion.convert(value);
	        }
	      }

	      throw new Error('Cannot convert from ' + from + ' to ' + type);
	    }

	    // attach types and conversions to the final `typed` function
	    typed.config = config;
	    typed.types = types;
	    typed.conversions = conversions;
	    typed.ignore = ignore;
	    typed.create = create;
	    typed.find = find;
	    typed.convert = convert;

	    // add a type
	    typed.addType = function (type) {
	      if (!type || typeof type.name !== 'string' || typeof type.test !== 'function') {
	        throw new TypeError('Object with properties {name: string, test: function} expected');
	      }

	      typed.types.push(type);
	    };

	    // add a conversion
	    typed.addConversion = function (conversion) {
	      if (!conversion
	          || typeof conversion.from !== 'string'
	          || typeof conversion.to !== 'string'
	          || typeof conversion.convert !== 'function') {
	        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
	      }

	      typed.conversions.push(conversion);
	    };

	    return typed;
	  }

	  return create();
	}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var NumberFormatter = __webpack_require__(7);

	/**
	 * Test whether value is a number
	 * @param {*} value
	 * @return {boolean} isNumber
	 */
	exports.isNumber = function(value) {
	  return typeof value === 'number';
	};

	/**
	 * Check if a number is integer
	 * @param {number | boolean} value
	 * @return {boolean} isInteger
	 */
	exports.isInteger = function(value) {
	  return isFinite(value)
	      ? (value == Math.round(value))
	      : false;
	  // Note: we use ==, not ===, as we can have Booleans as well
	};

	/**
	 * Calculate the sign of a number
	 * @param {number} x
	 * @returns {*}
	 */
	exports.sign = Math.sign || function(x) {
	  if (x > 0) {
	    return 1;
	  }
	  else if (x < 0) {
	    return -1;
	  }
	  else {
	    return 0;
	  }
	};

	/**
	 * Convert a number to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'engineering'    Always use engineering notation.
	 *                                          For example '123.4e+0' and '14.0e+6'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lower` and `upper` bounds, and uses
	 *                                          exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential' and
	 *                                          'auto', `precision` defines the total
	 *                                          number of significant digits returned
	 *                                          and is undefined by default.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point, and is 0 by default.
	 *                     {Object} exponential An object containing two parameters,
	 *                                          {number} lower and {number} upper,
	 *                                          used by notation 'auto' to determine
	 *                                          when to return exponential notation.
	 *                                          Default values are `lower=1e-3` and
	 *                                          `upper=1e5`.
	 *                                          Only applicable for notation `auto`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4);                                        // '6.4'
	 *    format(1240000);                                    // '1.24e6'
	 *    format(1/3);                                        // '0.3333333333333333'
	 *    format(1/3, 3);                                     // '0.333'
	 *    format(21385, 2);                                   // '21000'
	 *    format(12.071, {notation: 'fixed'});                // '12'
	 *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
	 *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
	 *    format(12345678, {notation: 'engineering'});        // '12.345678e+6'
	 *
	 * @param {number} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */
	exports.format = function(value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  }

	  // handle special cases
	  if (value === Infinity) {
	    return 'Infinity';
	  }
	  else if (value === -Infinity) {
	    return '-Infinity';
	  }
	  else if (isNaN(value)) {
	    return 'NaN';
	  }

	  // default values for options
	  var notation = 'auto';
	  var precision = undefined;

	  if (options) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    }

	    // determine precision from options
	    if (exports.isNumber(options)) {
	      precision = options;
	    }
	    else if (options.precision) {
	      precision = options.precision;
	    }
	  }

	  // handle the various notations
	  switch (notation) {
	    case 'fixed':
	      return exports.toFixed(value, precision);

	    case 'exponential':
	      return exports.toExponential(value, precision);

	    case 'engineering':
	      return exports.toEngineering(value, precision);

	    case 'auto':
	      return exports
	          .toPrecision(value, precision, options && options.exponential)

	          // remove trailing zeros after the decimal point
	          .replace(/((\.\d*?)(0+))($|e)/, function () {
	            var digits = arguments[2];
	            var e = arguments[4];
	            return (digits !== '.') ? digits + e : e;
	          });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' +
	          'Choose "auto", "exponential", or "fixed".');
	  }
	};

	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {number} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */
	exports.toExponential = function(value, precision) {
	  return new NumberFormatter(value).toExponential(precision);
	};

	/**
	 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
	 * @param {number} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */
	exports.toEngineering = function(value, precision) {
	  return new NumberFormatter(value).toEngineering(precision);
	};

	/**
	 * Format a number with fixed notation.
	 * @param {number} value
	 * @param {number} [precision=0]        Optional number of decimals after the
	 *                                      decimal point. Zero by default.
	 */
	exports.toFixed = function(value, precision) {
	  return new NumberFormatter(value).toFixed(precision);
	};

	/**
	 * Format a number with a certain precision
	 * @param {number} value
	 * @param {number} [precision=undefined] Optional number of digits.
	 * @param {{lower: number, upper: number}} [options]  By default:
	 *                                                    lower = 1e-3 (excl)
	 *                                                    upper = 1e+5 (incl)
	 * @return {string}
	 */
	exports.toPrecision = function(value, precision, options) {
	  return new NumberFormatter(value).toPrecision(precision, options);
	};

	/**
	 * Count the number of significant digits of a number.
	 *
	 * For example:
	 *   2.34 returns 3
	 *   0.0034 returns 2
	 *   120.5e+30 returns 4
	 *
	 * @param {number} value
	 * @return {number} digits   Number of significant digits
	 */
	exports.digits = function(value) {
	  return value
	      .toExponential()
	      .replace(/e.*$/, '')          // remove exponential notation
	      .replace( /^0\.?0*|\./, '')   // remove decimal point and leading zeros
	      .length
	};

	/**
	 * Minimum number added to one that makes the result different than one
	 */
	exports.DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;

	/**
	 * Compares two floating point numbers.
	 * @param {number} x          First value to compare
	 * @param {number} y          Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	*/
	exports.nearlyEqual = function(x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon == null) {
	    return x == y;
	  }

	  // use "==" operator, handles infinities
	  if (x == y) {
	    return true;
	  }

	  // NaN
	  if (isNaN(x) || isNaN(y)) {
	    return false;
	  }

	  // at this point x and y should be finite
	  if(isFinite(x) && isFinite(y)) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = Math.abs(x - y);
	    if (diff < exports.DBL_EPSILON) {
	      return true;
	    }
	    else {
	      // use relative error
	      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
	    }
	  }

	  // Infinite and Number or negative Infinite and positive Infinite cases
	  return false;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Format a number using methods toPrecision, toFixed, toExponential.
	 * @param {number | string} value
	 * @constructor
	 */
	function NumberFormatter (value) {
	  // parse the input value
	  var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
	  if (!match) {
	    throw new SyntaxError('Invalid number');
	  }

	  var sign         = match[1];
	  var coefficients = match[2];
	  var exponent     = parseFloat(match[4] || '0');

	  var dot = coefficients.indexOf('.');
	  exponent += (dot !== -1) ? (dot - 1) : (coefficients.length - 1);

	  this.sign = sign;
	  this.coefficients = coefficients
	      .replace('.', '')  // remove the dot (must be removed before removing leading zeros)
	      .replace(/^0*/, function (zeros) {
	        // remove leading zeros, add their count to the exponent
	        exponent -= zeros.length;
	        return '';
	      })
	      .replace(/0*$/, '') // remove trailing zeros
	      .split('')
	      .map(function (d) {
	        return parseInt(d);
	      });

	  if (this.coefficients.length === 0) {
	    this.coefficients.push(0);
	    exponent++;
	  }

	  this.exponent = exponent;
	}


	/**
	 * Format a number with engineering notation.
	 * @param {number} [precision=0]        Optional number of decimals after the
	 *                                      decimal point. Zero by default.
	 */
	NumberFormatter.prototype.toEngineering = function(precision) {
	  var rounded = this.roundDigits(precision);

	  var e = rounded.exponent;
	  var c = rounded.coefficients;

	  // find nearest lower multiple of 3 for exponent
	  var newExp = e % 3 === 0 ? e : (e < 0 ? (e - 3) - (e % 3) : e - (e % 3));

	  // concatenate coefficients with necessary zeros
	  var significandsDiff = e >= 0 ? e : Math.abs(newExp);

	  // add zeros if necessary (for ex: 1e+8)
	  if (c.length - 1 < significandsDiff) c = c.concat(zeros(significandsDiff - (c.length - 1)));

	  // find difference in exponents
	  var expDiff = Math.abs(e - newExp);

	  var decimalIdx = 1;
	  var str = '';

	  // push decimal index over by expDiff times
	  while (--expDiff >= 0) decimalIdx++;

	  // if all coefficient values are zero after the decimal point, don't add a decimal value. 
	  // otherwise concat with the rest of the coefficients
	  var decimals = c.slice(decimalIdx).join('');
	  var decimalVal = decimals.match(/[1-9]/) ? ('.' + decimals) : '';

	  str = c.slice(0, decimalIdx).join('') + decimalVal;

	  str += 'e' + (e >= 0 ? '+' : '') + newExp.toString();
	  return rounded.sign + str;
	}

	/**
	 * Format a number with fixed notation.
	 * @param {number} [precision=0]        Optional number of decimals after the
	 *                                      decimal point. Zero by default.
	 */
	NumberFormatter.prototype.toFixed = function (precision) {
	  var rounded = this.roundDigits(this.exponent + 1 + (precision || 0));
	  var c = rounded.coefficients;
	  var p = rounded.exponent + 1; // exponent may have changed

	  // append zeros if needed
	  var pp = p + (precision || 0);
	  if (c.length < pp) {
	    c = c.concat(zeros(pp - c.length));
	  }

	  // prepend zeros if needed
	  if (p < 0) {
	    c = zeros(-p + 1).concat(c);
	    p = 1;
	  }

	  // insert a dot if needed
	  if (precision) {
	    c.splice(p, 0, (p === 0) ? '0.' : '.');
	  }

	  return this.sign + c.join('');
	};

	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 */
	NumberFormatter.prototype.toExponential = function (precision) {
	  // round if needed, else create a clone
	  var rounded = precision ? this.roundDigits(precision) : this.clone();
	  var c = rounded.coefficients;
	  var e = rounded.exponent;

	  // append zeros if needed
	  if (c.length < precision) {
	    c = c.concat(zeros(precision - c.length));
	  }

	  // format as `C.CCCe+EEE` or `C.CCCe-EEE`
	  var first = c.shift();
	  return this.sign + first + (c.length > 0 ? ('.' + c.join('')) : '') +
	      'e' + (e >= 0 ? '+' : '') + e;
	};

	/**
	 * Format a number with a certain precision
	 * @param {number} [precision=undefined] Optional number of digits.
	 * @param {{lower: number | undefined, upper: number | undefined}} [options]
	 *                                       By default:
	 *                                         lower = 1e-3 (excl)
	 *                                         upper = 1e+5 (incl)
	 * @return {string}
	 */
	NumberFormatter.prototype.toPrecision = function(precision, options) {
	  // determine lower and upper bound for exponential notation.
	  var lower = (options && options.lower !== undefined) ? options.lower : 1e-3;
	  var upper = (options && options.upper !== undefined) ? options.upper : 1e+5;

	  var abs = Math.abs(Math.pow(10, this.exponent));
	  if (abs < lower || abs >= upper) {
	    // exponential notation
	    return this.toExponential(precision);
	  }
	  else {
	    var rounded = precision ? this.roundDigits(precision) : this.clone();
	    var c = rounded.coefficients;
	    var e = rounded.exponent;

	    // append trailing zeros
	    if (c.length < precision) {
	      c = c.concat(zeros(precision - c.length));
	    }

	    // append trailing zeros
	    // TODO: simplify the next statement
	    c = c.concat(zeros(e - c.length + 1 +
	        (c.length < precision ? precision - c.length : 0)));

	    // prepend zeros
	    c = zeros(-e).concat(c);

	    var dot = e > 0 ? e : 0;
	    if (dot < c.length - 1) {
	      c.splice(dot + 1, 0, '.');
	    }

	    return this.sign + c.join('');
	  }
	};

	/**
	 * Crete a clone of the NumberFormatter
	 * @return {NumberFormatter} Returns a clone of the NumberFormatter
	 */
	NumberFormatter.prototype.clone = function () {
	  var clone = new NumberFormatter('0');
	  clone.sign = this.sign;
	  clone.coefficients = this.coefficients.slice(0);
	  clone.exponent = this.exponent;
	  return clone;
	};

	/**
	 * Round the number of digits of a number *
	 * @param {number} precision  A positive integer
	 * @return {NumberFormatter}  Returns a new NumberFormatter with the rounded
	 *                            digits
	 */
	NumberFormatter.prototype.roundDigits = function (precision) {
	  var rounded = this.clone();
	  var c = rounded.coefficients;

	  // prepend zeros if needed
	  while (precision <= 0) {
	    c.unshift(0);
	    rounded.exponent++;
	    precision++;
	  }

	  if (c.length > precision) {
	    var removed = c.splice(precision, c.length - precision);

	    if (removed[0] >= 5) {
	      var i = precision - 1;
	      c[i]++;
	      while (c[i] === 10) {
	        c.pop();
	        if (i === 0) {
	          c.unshift(0);
	          rounded.exponent++;
	          i++;
	        }
	        i--;
	        c[i]++;
	      }
	    }
	  }

	  return rounded;
	};

	/**
	 * Create an array filled with zeros.
	 * @param {number} length
	 * @return {Array}
	 */
	function zeros(length) {
	  var arr = [];
	  for (var i = 0; i < length; i++) {
	    arr.push(0);
	  }
	  return arr;
	}

	module.exports = NumberFormatter;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(9);

	/**
	 * Extend given object with emitter functions `on`, `off`, `once`, `emit`
	 * @param {Object} obj
	 * @return {Object} obj
	 */
	exports.mixin = function (obj) {
	  // create event emitter
	  var emitter = new Emitter();

	  // bind methods to obj (we don't want to expose the emitter.e Array...)
	  obj.on   = emitter.on.bind(emitter);
	  obj.off  = emitter.off.bind(emitter);
	  obj.once = emitter.once.bind(emitter);
	  obj.emit = emitter.emit.bind(emitter);

	  return obj;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	function E () {
		// Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
		on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	module.exports = E;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lazy = __webpack_require__(3).lazy;
	var isFactory = __webpack_require__(3).isFactory;
	var traverse = __webpack_require__(3).traverse;
	var extend = __webpack_require__(3).extend;
	var ArgumentsError = __webpack_require__(11);

	function factory (type, config, load, typed, math) {
	  /**
	   * Import functions from an object or a module
	   *
	   * Syntax:
	   *
	   *    math.import(object)
	   *    math.import(object, options)
	   *
	   * Where:
	   *
	   * - `object: Object`
	   *   An object with functions to be imported.
	   * - `options: Object` An object with import options. Available options:
	   *   - `override: boolean`
	   *     If true, existing functions will be overwritten. False by default.
	   *   - `silent: boolean`
	   *     If true, the function will not throw errors on duplicates or invalid
	   *     types. False by default.
	   *   - `wrap: boolean`
	   *     If true, the functions will be wrapped in a wrapper function
	   *     which converts data types like Matrix to primitive data types like Array.
	   *     The wrapper is needed when extending math.js with libraries which do not
	   *     support these data type. False by default.
	   *
	   * Examples:
	   *
	   *    // define new functions and variables
	   *    math.import({
	   *      myvalue: 42,
	   *      hello: function (name) {
	   *        return 'hello, ' + name + '!';
	   *      }
	   *    });
	   *
	   *    // use the imported function and variable
	   *    math.myvalue * 2;               // 84
	   *    math.hello('user');             // 'hello, user!'
	   *
	   *    // import the npm module 'numbers'
	   *    // (must be installed first with `npm install numbers`)
	   *    math.import(require('numbers'), {wrap: true});
	   *
	   *    math.fibonacci(7); // returns 13
	   *
	   * @param {Object | Array} object   Object with functions to be imported.
	   * @param {Object} [options]        Import options.
	   */
	  function math_import(object, options) {
	    var num = arguments.length;
	    if (num != 1 && num != 2) {
	      throw new ArgumentsError('import', num, 1, 2);
	    }

	    if (!options) {
	      options = {};
	    }

	    if (isFactory(object)) {
	      _importFactory(object, options);
	    }
	    // TODO: allow a typed-function with name too
	    else if (Array.isArray(object)) {
	      object.forEach(function (entry) {
	        math_import(entry, options);
	      });
	    }
	    else if (typeof object === 'object') {
	      // a map with functions
	      for (var name in object) {
	        if (object.hasOwnProperty(name)) {
	          var value = object[name];
	          if (isSupportedType(value)) {
	            _import(name, value, options);
	          }
	          else if (isFactory(object)) {
	            _importFactory(object, options);
	          }
	          else {
	            math_import(value, options);
	          }
	        }
	      }
	    }
	    else {
	      if (!options.silent) {
	        throw new TypeError('Factory, Object, or Array expected');
	      }
	    }
	  }

	  /**
	   * Add a property to the math namespace and create a chain proxy for it.
	   * @param {string} name
	   * @param {*} value
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */
	  function _import(name, value, options) {
	    if (options.wrap && typeof value === 'function') {
	      // create a wrapper around the function
	      value = _wrap(value);
	    }

	    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
	      if (options.override) {
	        // give the typed function the right name
	        value = typed(name, value.signatures);
	      }
	      else {
	        // merge the existing and typed function
	        value = typed(math[name], value);
	      }

	      math[name] = value;
	      _importTransform(name, value);
	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (math[name] === undefined || options.override) {
	      math[name] = value;
	      _importTransform(name, value);
	      math.emit('import', name, function resolver() {
	        return value;
	      });
	      return;
	    }

	    if (!options.silent) {
	      throw new Error('Cannot import "' + name + '": already exists');
	    }
	  }

	  function _importTransform (name, value) {
	    if (value && typeof value.transform === 'function') {
	      math.expression.transform[name] = value.transform;
	    }
	  }

	  /**
	   * Create a wrapper a round an function which converts the arguments
	   * to their primitive values (like convert a Matrix to Array)
	   * @param {Function} fn
	   * @return {Function} Returns the wrapped function
	   * @private
	   */
	  function _wrap (fn) {
	    var wrapper = function wrapper () {
	      var args = [];
	      for (var i = 0, len = arguments.length; i < len; i++) {
	        var arg = arguments[i];
	        args[i] = arg && arg.valueOf();
	      }
	      return fn.apply(math, args);
	    };

	    if (fn.transform) {
	      wrapper.transform = fn.transform;
	    }

	    return wrapper;
	  }

	  /**
	   * Import an instance of a factory into math.js
	   * @param {{factory: Function, name: string, path: string, math: boolean}} factory
	   * @param {Object} options  See import for a description of the options
	   * @private
	   */
	  function _importFactory(factory, options) {
	    if (typeof factory.name === 'string') {
	      var name = factory.name;
	      var namespace = factory.path ? traverse(math, factory.path) : math;
	      var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;

	      var resolver = function () {
	        var instance = load(factory);

	        if (isTypedFunction(existing) && isTypedFunction(instance)) {
	          if (options.override) {
	            // replace the existing typed function (nothing to do)
	          }
	          else {
	            // merge the existing and new typed function
	            instance = typed(existing, instance);
	          }

	          return instance;
	        }

	        if (existing === undefined || options.override) {
	          return instance;
	        }

	        if (!options.silent) {
	          throw new Error('Cannot import "' + name + '": already exists');
	        }
	      };

	      if (factory.lazy !== false) {
	        lazy(namespace, name, resolver);
	      }
	      else {
	        namespace[name] = resolver();
	      }

	      math.emit('import', name, resolver, factory.path);
	    }
	    else {
	      // unnamed factory.
	      // no lazy loading
	      load(factory);
	    }
	  }

	  /**
	   * Check whether given object is a type which can be imported
	   * @param {Function | number | string | boolean | null | Unit | Complex} object
	   * @return {boolean}
	   * @private
	   */
	  function isSupportedType(object) {
	    return typeof object == 'function'
	        || typeof object === 'number'
	        || typeof object === 'string'
	        || typeof object === 'boolean'
	        || object === null
	        || (object && object.isUnit === true)
	        || (object && object.isComplex === true)
	        || (object && object.isBigNumber === true)
	        || (object && object.isFraction === true)
	        || (object && object.isMatrix === true)
	        || (object && Array.isArray(object) === true)
	  }

	  /**
	   * Test whether a given thing is a typed-function
	   * @param {*} fn
	   * @return {boolean} Returns true when `fn` is a typed-function
	   */
	  function isTypedFunction (fn) {
	    return typeof fn === 'function' && typeof fn.signatures === 'object';
	  }

	  return math_import;
	}

	exports.math = true; // request access to the math namespace as 5th argument of the factory function
	exports.name = 'import';
	exports.factory = factory;
	exports.lazy = true;


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Create a syntax error with the message:
	 *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
	 * @param {string} fn     Function name
	 * @param {number} count  Actual argument count
	 * @param {number} min    Minimum required argument count
	 * @param {number} [max]  Maximum required argument count
	 * @extends Error
	 */
	function ArgumentsError(fn, count, min, max) {
	  if (!(this instanceof ArgumentsError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.fn = fn;
	  this.count = count;
	  this.min = min;
	  this.max = max;

	  this.message = 'Wrong number of arguments in function ' + fn +
	      ' (' + count + ' provided, ' +
	      min + ((max != undefined) ? ('-' + max) : '') + ' expected)';

	  this.stack = (new Error()).stack;
	}

	ArgumentsError.prototype = new Error();
	ArgumentsError.prototype.constructor = Error;
	ArgumentsError.prototype.name = 'ArgumentsError';
	ArgumentsError.prototype.isArgumentsError = true;

	module.exports = ArgumentsError;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(3);

	function factory (type, config, load, typed, math) {
	  var MATRIX = ['Matrix', 'Array'];                   // valid values for option matrix
	  var NUMBER = ['number', 'BigNumber', 'Fraction'];   // valid values for option number

	  /**
	   * Set configuration options for math.js, and get current options.
	   * Will emit a 'config' event, with arguments (curr, prev).
	   *
	   * Syntax:
	   *
	   *     math.config(config: Object): Object
	   *
	   * Examples:
	   *
	   *     math.config().number;                // outputs 'number'
	   *     math.eval('0.4');                    // outputs number 0.4
	   *     math.config({number: 'Fraction'});
	   *     math.eval('0.4');                    // outputs Fraction 2/5
	   *
	   * @param {Object} [options] Available options:
	   *                            {number} epsilon
	   *                              Minimum relative difference between two
	   *                              compared values, used by all comparison functions.
	   *                            {string} matrix
	   *                              A string 'Matrix' (default) or 'Array'.
	   *                            {string} number
	   *                              A string 'number' (default), 'BigNumber', or 'Fraction'
	   *                            {number} precision
	   *                              The number of significant digits for BigNumbers.
	   *                              Not applicable for Numbers.
	   *                            {string} parenthesis
	   *                              How to display parentheses in LaTeX and string
	   *                              output.
	   * @return {Object} Returns the current configuration
	   */
	  function _config(options) {
	    if (options) {
	      var prev = object.clone(config);

	      // validate some of the options
	      validateOption(options, 'matrix', MATRIX);
	      validateOption(options, 'number', NUMBER);

	      // merge options
	      object.deepExtend(config, options);

	      var curr = object.clone(config);

	      // emit 'config' event
	      math.emit('config', curr, prev);

	      return curr;
	    }
	    else {
	      return object.clone(config);
	    }
	  }

	  // attach the valid options to the function so they can be extended
	  _config.MATRIX = MATRIX;
	  _config.NUMBER = NUMBER;

	  return _config;
	}

	/**
	 * Test whether an Array contains a specific item.
	 * @param {Array.<string>} array
	 * @param {string} item
	 * @return {boolean}
	 */
	function contains (array, item) {
	  return array.indexOf(item) !== -1;
	}

	/**
	 * Find a string in an array. Case insensitive search
	 * @param {Array.<string>} array
	 * @param {string} item
	 * @return {number} Returns the index when found. Returns -1 when not found
	 */
	function findIndex (array, item) {
	  return array
	      .map(function (i) {
	        return i.toLowerCase();
	      })
	      .indexOf(item.toLowerCase());
	}

	/**
	 * Validate an option
	 * @param {Object} options         Object with options
	 * @param {string} name            Name of the option to validate
	 * @param {Array.<string>} values  Array with valid values for this option
	 */
	function validateOption(options, name, values) {
	  if (options[name] !== undefined && !contains(values, options[name])) {
	    var index = findIndex(values, options[name]);
	    if (index !== -1) {
	      // right value, wrong casing
	      // TODO: lower case values are deprecated since v3, remove this warning some day.
	      console.warn('Warning: Wrong casing for configuration option "' + name + '", should be "' + values[index] + '" instead of "' + options[name] + '".');

	      options[name] = values[index]; // change the option to the right casing
	    }
	    else {
	      // unknown value
	      console.warn('Warning: Unknown value "' + options[name] + '" for configuration option "' + name + '". Available options: ' + values.map(JSON.stringify).join(', ') + '.');
	    }
	  }
	}

	exports.name = 'config';
	exports.math = true; // request the math namespace as fifth argument
	exports.factory = factory;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  __webpack_require__(14),        // data types (Matrix, Complex, Unit, ...)
	  __webpack_require__(100),   // constants
	  __webpack_require__(102),  // expression parsing
	  __webpack_require__(339),    // functions
	  __webpack_require__(506),        // serialization utility (math.json.reviver)
	  __webpack_require__(508)        // errors
	];


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  __webpack_require__(15),
	  __webpack_require__(20),
	  __webpack_require__(21),
	  __webpack_require__(26),
	  __webpack_require__(33),
	  __webpack_require__(37),
	  __webpack_require__(70),
	  __webpack_require__(71),
	  __webpack_require__(73),
	  __webpack_require__(74)
	];


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(16),

	  // construction function
	  __webpack_require__(18)
	];


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Decimal = __webpack_require__(17);

	function factory (type, config, load, typed, math) {
	  var BigNumber = Decimal.clone({precision: config.precision});

	  /**
	   * Attach type information
	   */
	  BigNumber.prototype.type = 'BigNumber';
	  BigNumber.prototype.isBigNumber = true;

	  /**
	   * Get a JSON representation of a BigNumber containing
	   * type information
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "BigNumber", "value": "0.2"}`
	   */
	  BigNumber.prototype.toJSON = function () {
	    return {
	      mathjs: 'BigNumber',
	      value: this.toString()
	    };
	  };

	  /**
	   * Instantiate a BigNumber from a JSON object
	   * @param {Object} json  a JSON object structured as:
	   *                       `{"mathjs": "BigNumber", "value": "0.2"}`
	   * @return {BigNumber}
	   */
	  BigNumber.fromJSON = function (json) {
	    return new BigNumber(json.value);
	  };

	  // listen for changed in the configuration, automatically apply changed precision
	  math.on('config', function (curr, prev) {
	    if (curr.precision !== prev.precision) {
	      BigNumber.config({ precision: curr.precision });
	    }
	  });

	  return BigNumber;
	}

	exports.name = 'BigNumber';
	exports.path = 'type';
	exports.factory = factory;
	exports.math = true; // request access to the math namespace

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! decimal.js v5.0.8 https://github.com/MikeMcl/decimal.js/LICENCE */
	;(function (globalScope) {
	  'use strict';


	  /*
	   *  decimal.js v5.0.8
	   *  An arbitrary-precision Decimal type for JavaScript.
	   *  https://github.com/MikeMcl/decimal.js
	   *  Copyright (c) 2016 Michael Mclaughlin <M8ch88l@gmail.com>
	   *  MIT Expat Licence
	   */


	  // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


	    // The maximum exponent magnitude.
	    // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
	  var EXP_LIMIT = 9e15,                      // 0 to 9e15

	    // The limit on the value of `precision`, and on the value of the first argument to
	    // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
	    MAX_DIGITS = 1e9,                        // 0 to 1e9

	    // The base 88 alphabet used by `toJSON` and `fromJSON`.
	    // 7 printable ASCII characters omitted (space) \ " & ' < >
	    NUMERALS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~',

	    // The natural logarithm of 10 (1025 digits).
	    LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

	    // Pi (1025 digits).
	    PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


	    // The initial configuration properties of the Decimal constructor.
	    Decimal = {

	      // These values must be integers within the stated ranges (inclusive).
	      // Most of these values can be changed during run-time using `Decimal.config`.

	      // The maximum number of significant digits of the result of a calculation or base conversion.
	      // E.g. `Decimal.config({ precision: 20 });`
	      precision: 20,                         // 1 to MAX_DIGITS

	      // The rounding mode used when rounding to `precision`.
	      //
	      // ROUND_UP         0 Away from zero.
	      // ROUND_DOWN       1 Towards zero.
	      // ROUND_CEIL       2 Towards +Infinity.
	      // ROUND_FLOOR      3 Towards -Infinity.
	      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      //
	      // E.g.
	      // `Decimal.rounding = 4;`
	      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
	      rounding: 4,                           // 0 to 8

	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP         0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
	      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN  6 The IEEE 754 remainder function.
	      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
	      //
	      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
	      // division (9) are commonly used for the modulus operation. The other rounding modes can also
	      // be used, but they may not give useful results.
	      modulo: 1,                             // 0 to 9

	      // The exponent value at and beneath which `toString` returns exponential notation.
	      // JavaScript numbers: -7
	      toExpNeg: -7,                          // 0 to -EXP_LIMIT

	      // The exponent value at and above which `toString` returns exponential notation.
	      // JavaScript numbers: 21
	      toExpPos:  21,                         // 0 to EXP_LIMIT

	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // JavaScript numbers: -324  (5e-324)
	      minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // JavaScript numbers: 308  (1.7976931348623157e+308)
	      maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

	      // Whether to use cryptographically-secure random number generation, if available.
	      crypto: void 0                         // true/false/undefined
	    },


	  // ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


	    inexact, noConflict, quadrant,
	    cryptoObject = typeof crypto != 'undefined' ? crypto : null,
	    external = true,

	    decimalError = '[DecimalError] ',
	    invalidArgument = decimalError + 'Invalid argument: ',
	    precisionLimitExceeded = decimalError + 'Precision limit exceeded',

	    mathfloor = Math.floor,
	    mathpow = Math.pow,

	    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
	    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
	    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
	    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

	    BASE = 1e7,
	    LOG_BASE = 7,
	    MAX_SAFE_INTEGER = 9007199254740991,

	    LN10_PRECISION = LN10.length - 1,
	    PI_PRECISION = PI.length - 1,

	    // Decimal.prototype object
	    P = {};


	  // Decimal prototype methods


	  /*
	   *  absoluteValue             abs
	   *  ceil
	   *  comparedTo                cmp
	   *  cosine                    cos
	   *  cubeRoot                  cbrt
	   *  decimalPlaces             dp
	   *  dividedBy                 div
	   *  dividedToIntegerBy        divToInt
	   *  equals                    eq
	   *  floor
	   *  greaterThan               gt
	   *  greaterThanOrEqualTo      gte
	   *  hyperbolicCosine          cosh
	   *  hyperbolicSine            sinh
	   *  hyperbolicTangent         tanh
	   *  inverseCosine             acos
	   *  inverseHyperbolicCosine   acosh
	   *  inverseHyperbolicSine     asinh
	   *  inverseHyperbolicTangent  atanh
	   *  inverseSine               asin
	   *  inverseTangent            atan
	   *  isFinite
	   *  isInteger                 isInt
	   *  isNaN
	   *  isNegative                isNeg
	   *  isPositive                isPos
	   *  isZero
	   *  lessThan                  lt
	   *  lessThanOrEqualTo         lte
	   *  logarithm                 log
	   *  [maximum]                 [max]
	   *  [minimum]                 [min]
	   *  minus                     sub
	   *  modulo                    mod
	   *  naturalExponential        exp
	   *  naturalLogarithm          ln
	   *  negated                   neg
	   *  plus                      add
	   *  precision                 sd
	   *  round
	   *  sine                      sin
	   *  squareRoot                sqrt
	   *  tangent                   tan
	   *  times                     mul
	   *  toBinary
	   *  toDecimalPlaces           toDP
	   *  toExponential
	   *  toFixed
	   *  toFraction
	   *  toHexadecimal             toHex
	   *  toJSON
	   *  toNearest
	   *  toNumber
	   *  toOctal
	   *  toPower                   pow
	   *  toPrecision
	   *  toSignificantDigits       toSD
	   *  toString
	   *  truncated                 trunc
	   *  valueOf
	   */


	  /*
	   * Return a new Decimal whose value is the absolute value of this Decimal.
	   *
	   */
	  P.absoluteValue = P.abs = function () {
	    var x = new this.constructor(this);
	    if (x.s < 0) x.s = 1;
	    return finalise(x);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of positive Infinity.
	   *
	   */
	  P.ceil = function () {
	    return finalise(new this.constructor(this), this.e + 1, 2);
	  };


	  /*
	   * Return
	   *   1    if the value of this Decimal is greater than the value of `y`,
	   *  -1    if the value of this Decimal is less than the value of `y`,
	   *   0    if they have the same value,
	   *   NaN  if the value of either Decimal is NaN.
	   *
	   */
	  P.comparedTo = P.cmp = function (y) {
	    var i, j, xdL, ydL,
	      x = this,
	      xd = x.d,
	      yd = (y = new x.constructor(y)).d,
	      xs = x.s,
	      ys = y.s;

	    // Either NaN or ±Infinity?
	    if (!xd || !yd) {
	      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
	    }

	    // Either zero?
	    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

	    // Signs differ?
	    if (xs !== ys) return xs;

	    // Compare exponents.
	    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

	    xdL = xd.length;
	    ydL = yd.length;

	    // Compare digit by digit.
	    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
	      if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
	    }

	    // Compare lengths.
	    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
	  };


	  /*
	   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * cos(0)         = 1
	   * cos(-0)        = 1
	   * cos(Infinity)  = NaN
	   * cos(-Infinity) = NaN
	   * cos(NaN)       = NaN
	   *
	   */
	  P.cosine = P.cos = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.d) return new Ctor(NaN);

	    // cos(0) = cos(-0) = 1
	    if (!x.d[0]) return new Ctor(1);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;

	    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   *
	   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   *  cbrt(0)  =  0
	   *  cbrt(-0) = -0
	   *  cbrt(1)  =  1
	   *  cbrt(-1) = -1
	   *  cbrt(N)  =  N
	   *  cbrt(-I) = -I
	   *  cbrt(I)  =  I
	   *
	   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
	   *
	   */
	  P.cubeRoot = P.cbrt = function () {
	    var e, m, n, r, rep, s, sd, t, t3, t3plusx,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);
	    external = false;

	    // Initial estimate.
	    s = x.s * Math.pow(x.s * x, 1 / 3);

	     // Math.cbrt underflow/overflow?
	     // Pass x to Math.pow as integer, then adjust the exponent of the result.
	    if (!s || Math.abs(s) == 1 / 0) {
	      n = digitsToString(x.d);
	      e = x.e;

	      // Adjust n exponent so it is a multiple of 3 away from x exponent.
	      if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
	      s = Math.pow(n, 1 / 3);

	      // Rarely, e may be one less than the result exponent value.
	      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

	      if (s == 1 / 0) {
	        n = '5e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }

	      r = new Ctor(n);
	      r.s = x.s;
	    } else {
	      r = new Ctor(s.toString());
	    }

	    sd = (e = Ctor.precision) + 3;

	    // Halley's method.
	    // TODO? Compare Newton's method.
	    for (;;) {
	      t = r;
	      t3 = t.times(t).times(t);
	      t3plusx = t3.plus(x);
	      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);

	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
	        // , i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {

	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);

	            if (t.times(t).times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }

	          sd += 4;
	          rep = 1;
	        } else {

	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).times(r).eq(x);
	          }

	          break;
	        }
	      }
	    }

	    external = true;

	    return finalise(r, e, Ctor.rounding, m);
	  };


	  /*
	   * Return the number of decimal places of the value of this Decimal.
	   *
	   */
	  P.decimalPlaces = P.dp = function () {
	    var w,
	      d = this.d,
	      n = NaN;

	    if (d) {
	      w = d.length - 1;
	      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

	      // Subtract the number of trailing zeros of the last word.
	      w = d[w];
	      if (w) for (; w % 10 == 0; w /= 10) n--;
	      if (n < 0) n = 0;
	    }

	    return n;
	  };


	  /*
	   *  n / 0 = I
	   *  n / N = N
	   *  n / I = 0
	   *  0 / n = 0
	   *  0 / 0 = N
	   *  0 / N = N
	   *  0 / I = 0
	   *  N / n = N
	   *  N / 0 = N
	   *  N / N = N
	   *  N / I = N
	   *  I / n = I
	   *  I / 0 = I
	   *  I / N = N
	   *  I / I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedBy = P.div = function (y) {
	    return divide(this, new this.constructor(y));
	  };


	  /*
	   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
	   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.dividedToIntegerBy = P.divToInt = function (y) {
	    var x = this,
	      Ctor = x.constructor;
	    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
	  };


	  /*
	   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
	   *
	   */
	  P.equals = P.eq = function (y) {
	    return this.cmp(y) === 0;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	   * direction of negative Infinity.
	   *
	   */
	  P.floor = function () {
	    return finalise(new this.constructor(this), this.e + 1, 3);
	  };


	  /*
	   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
	   * false.
	   *
	   */
	  P.greaterThan = P.gt = function (y) {
	    return this.cmp(y) > 0;
	  };


	  /*
	   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
	   * otherwise return false.
	   *
	   */
	  P.greaterThanOrEqualTo = P.gte = function (y) {
	    var k = this.cmp(y);
	    return k == 1 || k === 0;
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [1, Infinity]
	   *
	   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
	   *
	   * cosh(0)         = 1
	   * cosh(-0)        = 1
	   * cosh(Infinity)  = Infinity
	   * cosh(-Infinity) = Infinity
	   * cosh(NaN)       = NaN
	   *
	   *  x        time taken (ms)   result
	   * 1000      9                 9.8503555700852349694e+433
	   * 10000     25                4.4034091128314607936e+4342
	   * 100000    171               1.4033316802130615897e+43429
	   * 1000000   3817              1.5166076984010437725e+434294
	   * 10000000  abandoned after 2 minute wait
	   *
	   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
	   *
	   */
	  P.hyperbolicCosine = P.cosh = function () {
	    var k, n, pr, rm, len,
	      x = this,
	      Ctor = x.constructor,
	      one = new Ctor(1);

	    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
	    if (x.isZero()) return one;

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;

	    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
	    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

	    // Estimate the optimum number of times to use the argument reduction.
	    // TODO? Estimation reused from cosine() and may not be optimal here.
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      n = Math.pow(4, -k).toString();
	    } else {
	      k = 16;
	      n = '2.3283064365386962890625e-10';
	    }

	    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

	    // Reverse argument reduction
	    var cosh2_x,
	      i = k,
	      d8 = new Ctor(8);
	    for (; i--;) {
	      cosh2_x = x.times(x);
	      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
	    }

	    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
	   *
	   * sinh(0)         = 0
	   * sinh(-0)        = -0
	   * sinh(Infinity)  = Infinity
	   * sinh(-Infinity) = -Infinity
	   * sinh(NaN)       = NaN
	   *
	   * x        time taken (ms)
	   * 10       2 ms
	   * 100      5 ms
	   * 1000     14 ms
	   * 10000    82 ms
	   * 100000   886 ms            1.4033316802130615897e+43429
	   * 200000   2613 ms
	   * 300000   5407 ms
	   * 400000   8824 ms
	   * 500000   13026 ms          8.7080643612718084129e+217146
	   * 1000000  48543 ms
	   *
	   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
	   *
	   */
	  P.hyperbolicSine = P.sinh = function () {
	    var k, pr, rm, len,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	    Ctor.rounding = 1;
	    len = x.d.length;

	    if (len < 3) {
	      x = taylorSeries(Ctor, 2, x, x, true);
	    } else {

	      // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
	      // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
	      // 3 multiplications and 1 addition

	      // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
	      // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
	      // 4 multiplications and 2 additions

	      // Estimate the optimum number of times to use the argument reduction.
	      k = 1.4 * Math.sqrt(len);
	      k = k > 16 ? 16 : k | 0;

	      x = x.times(Math.pow(5, -k));

	      x = taylorSeries(Ctor, 2, x, x, true);

	      // Reverse argument reduction
	      var sinh2_x,
	        d5 = new Ctor(5),
	        d16 = new Ctor(16),
	        d20 = new Ctor(20);
	      for (; k--;) {
	        sinh2_x = x.times(x);
	        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
	      }
	    }

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(x, pr, rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * tanh(x) = sinh(x) / cosh(x)
	   *
	   * tanh(0)         = 0
	   * tanh(-0)        = -0
	   * tanh(Infinity)  = 1
	   * tanh(-Infinity) = -1
	   * tanh(NaN)       = NaN
	   *
	   */
	  P.hyperbolicTangent = P.tanh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(x.s);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 7;
	    Ctor.rounding = 1;

	    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
	  };


	  /*
	   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
	   * this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [0, pi]
	   *
	   * acos(x) = pi/2 - asin(x)
	   *
	   * acos(0)       = pi/2
	   * acos(-0)      = pi/2
	   * acos(1)       = 0
	   * acos(-1)      = pi
	   * acos(1/2)     = pi/3
	   * acos(-1/2)    = 2*pi/3
	   * acos(|x| > 1) = NaN
	   * acos(NaN)     = NaN
	   *
	   */
	  P.inverseCosine = P.acos = function () {
	    var halfPi,
	      x = this,
	      Ctor = x.constructor,
	      k = x.abs().cmp(1),
	      pr = Ctor.precision,
	      rm = Ctor.rounding;

	    if (k !== -1) {
	      return k === 0
	        // |x| is 1
	        ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
	        // |x| > 1 or x is NaN
	        : new Ctor(NaN);
	    }

	    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

	    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;

	    x = x.asin();
	    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return halfPi.minus(x);
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [1, Infinity]
	   * Range: [0, Infinity]
	   *
	   * acosh(x) = ln(x + sqrt(x^2 - 1))
	   *
	   * acosh(x < 1)     = NaN
	   * acosh(NaN)       = NaN
	   * acosh(Infinity)  = Infinity
	   * acosh(-Infinity) = NaN
	   * acosh(0)         = NaN
	   * acosh(-0)        = NaN
	   * acosh(1)         = 0
	   * acosh(-1)        = NaN
	   *
	   */
	  P.inverseHyperbolicCosine = P.acosh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
	    if (!x.isFinite()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
	    Ctor.rounding = 1;
	    external = false;

	    x = x.times(x).minus(1).sqrt().plus(x);

	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.ln();
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * asinh(x) = ln(x + sqrt(x^2 + 1))
	   *
	   * asinh(NaN)       = NaN
	   * asinh(Infinity)  = Infinity
	   * asinh(-Infinity) = -Infinity
	   * asinh(0)         = 0
	   * asinh(-0)        = -0
	   *
	   */
	  P.inverseHyperbolicSine = P.asinh = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite() || x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
	    Ctor.rounding = 1;
	    external = false;

	    x = x.times(x).plus(1).sqrt().plus(x);

	    external = true;
	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.ln();
	  };


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
	   * value of this Decimal.
	   *
	   * Domain: [-1, 1]
	   * Range: [-Infinity, Infinity]
	   *
	   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
	   *
	   * atanh(|x| > 1)   = NaN
	   * atanh(NaN)       = NaN
	   * atanh(Infinity)  = NaN
	   * atanh(-Infinity) = NaN
	   * atanh(0)         = 0
	   * atanh(-0)        = -0
	   * atanh(1)         = Infinity
	   * atanh(-1)        = -Infinity
	   *
	   */
	  P.inverseHyperbolicTangent = P.atanh = function () {
	    var pr, rm, wpr, xsd,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    xsd = x.sd();

	    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

	    Ctor.precision = wpr = xsd - x.e;

	    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

	    Ctor.precision = pr + 4;
	    Ctor.rounding = 1;

	    x = x.ln();

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.times(0.5);
	  };


	  /*
	   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
	   * Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
	   *
	   * asin(0)       = 0
	   * asin(-0)      = -0
	   * asin(1/2)     = pi/6
	   * asin(-1/2)    = -pi/6
	   * asin(1)       = pi/2
	   * asin(-1)      = -pi/2
	   * asin(|x| > 1) = NaN
	   * asin(NaN)     = NaN
	   *
	   * TODO? Compare performance of Taylor series.
	   *
	   */
	  P.inverseSine = P.asin = function () {
	    var halfPi, k,
	      pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (x.isZero()) return new Ctor(x);

	    k = x.abs().cmp(1);
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    if (k !== -1) {

	      // |x| is 1
	      if (k === 0) {
	        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
	        halfPi.s = x.s;
	        return halfPi;
	      }

	      // |x| > 1 or x is NaN
	      return new Ctor(NaN);
	    }

	    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

	    Ctor.precision = pr + 6;
	    Ctor.rounding = 1;

	    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return x.times(2);
	  };


	  /*
	   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
	   * of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi/2, pi/2]
	   *
	   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	   *
	   * atan(0)         = 0
	   * atan(-0)        = -0
	   * atan(1)         = pi/4
	   * atan(-1)        = -pi/4
	   * atan(Infinity)  = pi/2
	   * atan(-Infinity) = -pi/2
	   * atan(NaN)       = NaN
	   *
	   */
	  P.inverseTangent = P.atan = function () {
	    var i, j, k, n, px, t, r, wpr, x2,
	      x = this,
	      Ctor = x.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding;

	    if (!x.isFinite()) {
	      if (!x.s) return new Ctor(NaN);
	      if (pr + 4 <= PI_PRECISION) {
	        r = getPi(Ctor, pr + 4, rm).times(0.5);
	        r.s = x.s;
	        return r;
	      }
	    } else if (x.isZero()) {
	      return new Ctor(x);
	    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
	      r = getPi(Ctor, pr + 4, rm).times(0.25);
	      r.s = x.s;
	      return r;
	    }

	    Ctor.precision = wpr = pr + 10;
	    Ctor.rounding = 1;

	    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

	    // Argument reduction
	    // Ensure |x| < 0.42
	    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

	    k = Math.min(28, wpr / LOG_BASE + 2 | 0);

	    for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

	    external = false;

	    j = Math.ceil(wpr / LOG_BASE);
	    n = 1;
	    x2 = x.times(x);
	    r = new Ctor(x);
	    px = x;

	    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	    for (; i !== -1;) {
	      px = px.times(x2);
	      t = r.minus(px.div(n += 2));

	      px = px.times(x2);
	      r = t.plus(px.div(n += 2));

	      if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
	    }

	    if (k) r = r.times(2 << (k - 1));

	    external = true;

	    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
	  };


	  /*
	   * Return true if the value of this Decimal is a finite number, otherwise return false.
	   *
	   */
	  P.isFinite = function () {
	    return !!this.d;
	  };


	  /*
	   * Return true if the value of this Decimal is an integer, otherwise return false.
	   *
	   */
	  P.isInteger = P.isInt = function () {
	    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
	  };


	  /*
	   * Return true if the value of this Decimal is NaN, otherwise return false.
	   *
	   */
	  P.isNaN = function () {
	    return !this.s;
	  };


	  /*
	   * Return true if the value of this Decimal is negative, otherwise return false.
	   *
	   */
	  P.isNegative = P.isNeg = function () {
	    return this.s < 0;
	  };


	  /*
	   * Return true if the value of this Decimal is positive, otherwise return false.
	   *
	   */
	  P.isPositive = P.isPos = function () {
	    return this.s > 0;
	  };


	  /*
	   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
	   *
	   */
	  P.isZero = function () {
	    return !!this.d && this.d[0] === 0;
	  };


	  /*
	   * Return true if the value of this Decimal is less than `y`, otherwise return false.
	   *
	   */
	  P.lessThan = P.lt = function (y) {
	    return this.cmp(y) < 0;
	  };


	  /*
	   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
	   *
	   */
	  P.lessThanOrEqualTo = P.lte = function (y) {
	    return this.cmp(y) < 1;
	  };


	  /*
	   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * If no base is specified, return log[10](arg).
	   *
	   * log[base](arg) = ln(arg) / ln(base)
	   *
	   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
	   * otherwise:
	   *
	   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
	   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
	   * between the result and the correctly rounded result will be one ulp (unit in the last place).
	   *
	   * log[-b](a)       = NaN
	   * log[0](a)        = NaN
	   * log[1](a)        = NaN
	   * log[NaN](a)      = NaN
	   * log[Infinity](a) = NaN
	   * log[b](0)        = -Infinity
	   * log[b](-0)       = -Infinity
	   * log[b](-a)       = NaN
	   * log[b](1)        = 0
	   * log[b](Infinity) = Infinity
	   * log[b](NaN)      = NaN
	   *
	   * [base] {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  P.logarithm = P.log = function (base) {
	    var isBase10, d, denominator, k, inf, num, sd, r,
	      arg = this,
	      Ctor = arg.constructor,
	      pr = Ctor.precision,
	      rm = Ctor.rounding,
	      guard = 5;

	    // Default base is 10.
	    if (base == null) {
	      base = new Ctor(10);
	      isBase10 = true;
	    } else {
	      base = new Ctor(base);
	      d = base.d;

	      // Return NaN if base is negative, or non-finite, or is 0 or 1.
	      if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

	      isBase10 = base.eq(10);
	    }

	    d = arg.d;

	    // Is arg negative, non-finite, 0 or 1?
	    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
	      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
	    }

	    // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
	    // integer power of 10.
	    if (isBase10) {
	      if (d.length > 1) {
	        inf = true;
	      } else {
	        for (k = d[0]; k % 10 === 0;) k /= 10;
	        inf = k !== 1;
	      }
	    }

	    external = false;
	    sd = pr + guard;
	    num = naturalLogarithm(arg, sd);
	    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

	    // The result will have 5 rounding digits.
	    r = divide(num, denominator, sd, 1);

	    // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
	    // calculate 10 further digits.
	    //
	    // If the result is known to have an infinite decimal expansion, repeat this until it is clear
	    // that the result is above or below the boundary. Otherwise, if after calculating the 10
	    // further digits, the last 14 are nines, round up and assume the result is exact.
	    // Also assume the result is exact if the last 14 are zero.
	    //
	    // Example of a result that will be incorrectly rounded:
	    // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
	    // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
	    // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
	    // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
	    // place is still 2.6.
	    if (checkRoundingDigits(r.d, k = pr, rm)) {

	      do {
	        sd += 10;
	        num = naturalLogarithm(arg, sd);
	        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
	        r = divide(num, denominator, sd, 1);

	        if (!inf) {

	          // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
	          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
	            r = finalise(r, pr + 1, 0);
	          }

	          break;
	        }
	      } while (checkRoundingDigits(r.d, k += 10, rm));
	    }

	    external = true;

	    return finalise(r, pr, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.max = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'lt');
	  };
	   */


	  /*
	   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
	   *
	   * arguments {number|string|Decimal}
	   *
	  P.min = function () {
	    Array.prototype.push.call(arguments, this);
	    return maxOrMin(this.constructor, arguments, 'gt');
	  };
	   */


	  /*
	   *  n - 0 = n
	   *  n - N = N
	   *  n - I = -I
	   *  0 - n = -n
	   *  0 - 0 = 0
	   *  0 - N = N
	   *  0 - I = -I
	   *  N - n = N
	   *  N - 0 = N
	   *  N - N = N
	   *  N - I = N
	   *  I - n = I
	   *  I - 0 = I
	   *  I - N = N
	   *  I - I = N
	   *
	   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.minus = P.sub = function (y) {
	    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // If either is not finite...
	    if (!x.d || !y.d) {

	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);

	      // Return y negated if x is finite and y is ±Infinity.
	      else if (x.d) y.s = -y.s;

	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with different signs.
	      // Return NaN if both are ±Infinity with the same sign.
	      else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

	      return y;
	    }

	    // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.plus(y);
	    }

	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    // If either is zero...
	    if (!xd[0] || !yd[0]) {

	      // Return y negated if x is zero and y is non-zero.
	      if (yd[0]) y.s = -y.s;

	      // Return x if y is zero and x is non-zero.
	      else if (xd[0]) y = new Ctor(x);

	      // Return zero if both are zero.
	      // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
	      else return new Ctor(rm === 3 ? -0 : 0);

	      return external ? finalise(y, pr, rm) : y;
	    }

	    // x and y are finite, non-zero numbers with the same sign.

	    // Calculate base 1e7 exponents.
	    e = mathfloor(y.e / LOG_BASE);
	    xe = mathfloor(x.e / LOG_BASE);

	    xd = xd.slice();
	    k = xe - e;

	    // If base 1e7 exponents differ...
	    if (k) {
	      xLTy = k < 0;

	      if (xLTy) {
	        d = xd;
	        k = -k;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = xe;
	        len = xd.length;
	      }

	      // Numbers with massively different exponents would result in a very high number of
	      // zeros needing to be prepended, but this can be avoided while still ensuring correct
	      // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

	      if (k > i) {
	        k = i;
	        d.length = 1;
	      }

	      // Prepend zeros to equalise exponents.
	      d.reverse();
	      for (i = k; i--;) d.push(0);
	      d.reverse();

	    // Base 1e7 exponents equal.
	    } else {

	      // Check digits to determine which is the bigger number.

	      i = xd.length;
	      len = yd.length;
	      xLTy = i < len;
	      if (xLTy) len = i;

	      for (i = 0; i < len; i++) {
	        if (xd[i] != yd[i]) {
	          xLTy = xd[i] < yd[i];
	          break;
	        }
	      }

	      k = 0;
	    }

	    if (xLTy) {
	      d = xd;
	      xd = yd;
	      yd = d;
	      y.s = -y.s;
	    }

	    len = xd.length;

	    // Append zeros to `xd` if shorter.
	    // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
	    for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

	    // Subtract yd from xd.
	    for (i = yd.length; i > k;) {

	      if (xd[--i] < yd[i]) {
	        for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
	        --xd[j];
	        xd[i] += BASE;
	      }

	      xd[i] -= yd[i];
	    }

	    // Remove trailing zeros.
	    for (; xd[--len] === 0;) xd.pop();

	    // Remove leading zeros and adjust exponent accordingly.
	    for (; xd[0] === 0; xd.shift()) --e;

	    // Zero?
	    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);

	    return external ? finalise(y, pr, rm) : y;
	  };


	  /*
	   *   n % 0 =  N
	   *   n % N =  N
	   *   n % I =  n
	   *   0 % n =  0
	   *  -0 % n = -0
	   *   0 % 0 =  N
	   *   0 % N =  N
	   *   0 % I =  0
	   *   N % n =  N
	   *   N % 0 =  N
	   *   N % N =  N
	   *   N % I =  N
	   *   I % n =  N
	   *   I % 0 =  N
	   *   I % N =  N
	   *   I % I =  N
	   *
	   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * The result depends on the modulo mode.
	   *
	   */
	  P.modulo = P.mod = function (y) {
	    var q,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
	    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

	    // Return x if y is ±Infinity or x is ±0.
	    if (!y.d || x.d && !x.d[0]) {
	      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
	    }

	    // Prevent rounding of intermediate calculations.
	    external = false;

	    if (Ctor.modulo == 9) {

	      // Euclidian division: q = sign(y) * floor(x / abs(y))
	      // result = x - q * y    where  0 <= result < abs(y)
	      q = divide(x, y.abs(), 0, 3, 1);
	      q.s *= y.s;
	    } else {
	      q = divide(x, y, 0, Ctor.modulo, 1);
	    }

	    q = q.times(y);

	    external = true;

	    return x.minus(q);
	  };


	  /*
	   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
	   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalExponential = P.exp = function () {
	    return naturalExponential(this);
	  };


	  /*
	   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   */
	  P.naturalLogarithm = P.ln = function () {
	    return naturalLogarithm(this);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
	   * -1.
	   *
	   */
	  P.negated = P.neg = function () {
	    var x = new this.constructor(this);
	    x.s = -x.s;
	    return finalise(x);
	  };


	  /*
	   *  n + 0 = n
	   *  n + N = N
	   *  n + I = I
	   *  0 + n = n
	   *  0 + 0 = 0
	   *  0 + N = N
	   *  0 + I = I
	   *  N + n = N
	   *  N + 0 = N
	   *  N + N = N
	   *  N + I = N
	   *  I + n = I
	   *  I + 0 = I
	   *  I + N = N
	   *  I + I = I
	   *
	   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   */
	  P.plus = P.add = function (y) {
	    var carry, d, e, i, k, len, pr, rm, xd, yd,
	      x = this,
	      Ctor = x.constructor;

	    y = new Ctor(y);

	    // If either is not finite...
	    if (!x.d || !y.d) {

	      // Return NaN if either is NaN.
	      if (!x.s || !y.s) y = new Ctor(NaN);

	      // Return x if y is finite and x is ±Infinity.
	      // Return x if both are ±Infinity with the same sign.
	      // Return NaN if both are ±Infinity with different signs.
	      // Return y if x is finite and y is ±Infinity.
	      else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

	      return y;
	    }

	     // If signs differ...
	    if (x.s != y.s) {
	      y.s = -y.s;
	      return x.minus(y);
	    }

	    xd = x.d;
	    yd = y.d;
	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    // If either is zero...
	    if (!xd[0] || !yd[0]) {

	      // Return x if y is zero.
	      // Return y if y is non-zero.
	      if (!yd[0]) y = new Ctor(x);

	      return external ? finalise(y, pr, rm) : y;
	    }

	    // x and y are finite, non-zero numbers with the same sign.

	    // Calculate base 1e7 exponents.
	    k = mathfloor(x.e / LOG_BASE);
	    e = mathfloor(y.e / LOG_BASE);

	    xd = xd.slice();
	    i = k - e;

	    // If base 1e7 exponents differ...
	    if (i) {

	      if (i < 0) {
	        d = xd;
	        i = -i;
	        len = yd.length;
	      } else {
	        d = yd;
	        e = k;
	        len = xd.length;
	      }

	      // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	      k = Math.ceil(pr / LOG_BASE);
	      len = k > len ? k + 1 : len + 1;

	      if (i > len) {
	        i = len;
	        d.length = 1;
	      }

	      // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	      d.reverse();
	      for (; i--;) d.push(0);
	      d.reverse();
	    }

	    len = xd.length;
	    i = yd.length;

	    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
	    if (len - i < 0) {
	      i = len;
	      d = yd;
	      yd = xd;
	      xd = d;
	    }

	    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
	    for (carry = 0; i;) {
	      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	      xd[i] %= BASE;
	    }

	    if (carry) {
	      xd.unshift(carry);
	      ++e;
	    }

	    // Remove trailing zeros.
	    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	    for (len = xd.length; xd[--len] == 0;) xd.pop();

	    y.d = xd;
	    y.e = getBase10Exponent(xd, e);

	    return external ? finalise(y, pr, rm) : y;
	  };


	  /*
	   * Return the number of significant digits of the value of this Decimal.
	   *
	   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	   *
	   */
	  P.precision = P.sd = function (z) {
	    var k,
	      x = this;

	    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

	    if (x.d) {
	      k = getPrecision(x.d);
	      if (z && x.e + 1 > k) k = x.e + 1;
	    } else {
	      k = NaN;
	    }

	    return k;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
	   * rounding mode `rounding`.
	   *
	   */
	  P.round = function () {
	    var x = this,
	      Ctor = x.constructor;

	    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
	  };


	  /*
	   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-1, 1]
	   *
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   *
	   * sin(0)         = 0
	   * sin(-0)        = -0
	   * sin(Infinity)  = NaN
	   * sin(-Infinity) = NaN
	   * sin(NaN)       = NaN
	   *
	   */
	  P.sine = P.sin = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	    Ctor.rounding = 1;

	    x = sine(Ctor, toLessThanHalfPi(Ctor, x));

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   *  sqrt(-n) =  N
	   *  sqrt(N)  =  N
	   *  sqrt(-I) =  N
	   *  sqrt(I)  =  I
	   *  sqrt(0)  =  0
	   *  sqrt(-0) = -0
	   *
	   */
	  P.squareRoot = P.sqrt = function () {
	    var m, n, sd, r, rep, t,
	      x = this,
	      d = x.d,
	      e = x.e,
	      s = x.s,
	      Ctor = x.constructor;

	    // Negative/NaN/Infinity/zero?
	    if (s !== 1 || !d || !d[0]) {
	      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
	    }

	    external = false;

	    // Initial estimate.
	    s = Math.sqrt(+x);

	    // Math.sqrt underflow/overflow?
	    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	    if (s == 0 || s == 1 / 0) {
	      n = digitsToString(d);

	      if ((n.length + e) % 2 == 0) n += '0';
	      s = Math.sqrt(n);
	      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

	      if (s == 1 / 0) {
	        n = '1e' + e;
	      } else {
	        n = s.toExponential();
	        n = n.slice(0, n.indexOf('e') + 1) + e;
	      }

	      r = new Ctor(n);
	    } else {
	      r = new Ctor(s.toString());
	    }

	    sd = (e = Ctor.precision) + 3;

	    // Newton-Raphson iteration.
	    for (;;) {
	      t = r;
	      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

	      // TODO? Replace with for-loop and checkRoundingDigits.
	      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	        n = n.slice(sd - 3, sd + 1);

	        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
	        // 4999, i.e. approaching a rounding boundary, continue the iteration.
	        if (n == '9999' || !rep && n == '4999') {

	          // On the first iteration only, check to see if rounding up gives the exact result as the
	          // nines may infinitely repeat.
	          if (!rep) {
	            finalise(t, e + 1, 0);

	            if (t.times(t).eq(x)) {
	              r = t;
	              break;
	            }
	          }

	          sd += 4;
	          rep = 1;
	        } else {

	          // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	          // If not, then there are further digits and m will be truthy.
	          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	            // Truncate to the first rounding digit.
	            finalise(r, e + 1, 1);
	            m = !r.times(r).eq(x);
	          }

	          break;
	        }
	      }
	    }

	    external = true;

	    return finalise(r, e, Ctor.rounding, m);
	  };


	  /*
	   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-Infinity, Infinity]
	   *
	   * tan(0)         = 0
	   * tan(-0)        = -0
	   * tan(Infinity)  = NaN
	   * tan(-Infinity) = NaN
	   * tan(NaN)       = NaN
	   *
	   */
	  P.tangent = P.tan = function () {
	    var pr, rm,
	      x = this,
	      Ctor = x.constructor;

	    if (!x.isFinite()) return new Ctor(NaN);
	    if (x.isZero()) return new Ctor(x);

	    pr = Ctor.precision;
	    rm = Ctor.rounding;
	    Ctor.precision = pr + 10;
	    Ctor.rounding = 1;

	    x = x.sin();
	    x.s = 1;
	    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

	    Ctor.precision = pr;
	    Ctor.rounding = rm;

	    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
	  };


	  /*
	   *  n * 0 = 0
	   *  n * N = N
	   *  n * I = I
	   *  0 * n = 0
	   *  0 * 0 = 0
	   *  0 * N = N
	   *  0 * I = N
	   *  N * n = N
	   *  N * 0 = N
	   *  N * N = N
	   *  N * I = N
	   *  I * n = I
	   *  I * 0 = N
	   *  I * N = N
	   *  I * I = I
	   *
	   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   */
	  P.times = P.mul = function (y) {
	    var carry, e, i, k, r, rL, t, xdL, ydL,
	      x = this,
	      Ctor = x.constructor,
	      xd = x.d,
	      yd = (y = new Ctor(y)).d;

	    y.s *= x.s;

	     // If either is NaN, ±Infinity or ±0...
	    if (!xd || !xd[0] || !yd || !yd[0]) {

	      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

	        // Return NaN if either is NaN.
	        // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
	        ? NaN

	        // Return ±Infinity if either is ±Infinity.
	        // Return ±0 if either is ±0.
	        : !xd || !yd ? y.s / 0 : y.s * 0);
	    }

	    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
	    xdL = xd.length;
	    ydL = yd.length;

	    // Ensure xd points to the longer array.
	    if (xdL < ydL) {
	      r = xd;
	      xd = yd;
	      yd = r;
	      rL = xdL;
	      xdL = ydL;
	      ydL = rL;
	    }

	    // Initialise the result array with zeros.
	    r = [];
	    rL = xdL + ydL;
	    for (i = rL; i--;) r.push(0);

	    // Multiply!
	    for (i = ydL; --i >= 0;) {
	      carry = 0;
	      for (k = xdL + i; k > i;) {
	        t = r[k] + yd[i] * xd[k - i - 1] + carry;
	        r[k--] = t % BASE | 0;
	        carry = t / BASE | 0;
	      }

	      r[k] = (r[k] + carry) % BASE | 0;
	    }

	    // Remove trailing zeros.
	    for (; !r[--rL];) r.pop();

	    if (carry) ++e;
	    else r.shift();

	    // Remove trailing zeros.
	    for (i = r.length; !r[--i];) r.pop();

	    y.d = r;
	    y.e = getBase10Exponent(r, e);

	    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toBinary = function (sd, rm) {
	    return toStringBinary(this, 2, sd, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
	   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
	   *
	   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toDecimalPlaces = P.toDP = function (dp, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    x = new Ctor(x);
	    if (dp === void 0) return x;

	    checkInt32(dp, 0, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);

	    return finalise(x, dp + x.e + 1, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal in exponential notation rounded to
	   * `dp` fixed decimal places using rounding mode `rounding`.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toExponential = function (dp, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;

	    if (dp === void 0) {
	      str = finiteToString(x, true);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      x = finalise(new Ctor(x), dp + 1, rm);
	      str = finiteToString(x, true, dp + 1);
	    }

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
	   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
	   * omitted.
	   *
	   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
	   *
	   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
	   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	   * (-0).toFixed(3) is '0.000'.
	   * (-0.5).toFixed(0) is '-0'.
	   *
	   */
	  P.toFixed = function (dp, rm) {
	    var str, y,
	      x = this,
	      Ctor = x.constructor;

	    if (dp === void 0) {
	      str = finiteToString(x);
	    } else {
	      checkInt32(dp, 0, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      y = finalise(new Ctor(x), dp + x.e + 1, rm);
	      str = finiteToString(y, false, dp + y.e + 1);
	    }

	    // To determine whether to add the minus sign look at the value before it was rounded,
	    // i.e. look at `x` rather than `y`.
	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return an array representing the value of this Decimal as a simple fraction with an integer
	   * numerator and an integer denominator.
	   *
	   * The denominator will be a positive non-zero value less than or equal to the specified maximum
	   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
	   * value necessary to represent the number exactly.
	   *
	   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
	   *
	   */
	  P.toFraction = function (maxD) {
	    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
	      x = this,
	      xd = x.d,
	      Ctor = x.constructor;

	    if (!xd) return new Ctor(x);

	    n1 = d0 = new Ctor(1);
	    d1 = n0 = new Ctor(0);

	    d = new Ctor(d1);
	    e = d.e = getPrecision(xd) - x.e - 1;
	    k = e % LOG_BASE;
	    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

	    if (maxD == null) {

	      // d is 10**e, the minimum max-denominator needed.
	      maxD = e > 0 ? d : n1;
	    } else {
	      n = new Ctor(maxD);
	      if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
	      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
	    }

	    external = false;
	    n = new Ctor(digitsToString(xd));
	    pr = Ctor.precision;
	    Ctor.precision = e = xd.length * LOG_BASE * 2;

	    for (;;)  {
	      q = divide(n, d, 0, 1, 1);
	      d2 = d0.plus(q.times(d1));
	      if (d2.cmp(maxD) == 1) break;
	      d0 = d1;
	      d1 = d2;
	      d2 = n1;
	      n1 = n0.plus(q.times(d2));
	      n0 = d2;
	      d2 = d;
	      d = n.minus(q.times(d2));
	      n = d2;
	    }

	    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
	    n0 = n0.plus(d2.times(n1));
	    d0 = d0.plus(d2.times(d1));
	    n0.s = n1.s = x.s;

	    // Determine which fraction is closer to x, n0/d0 or n1/d1?
	    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
	        ? [n1, d1] : [n0, d0];

	    Ctor.precision = pr;
	    external = true;

	    return r;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toHexadecimal = P.toHex = function (sd, rm) {
	    return toStringBinary(this, 16, sd, rm);
	  };


	  /*
	   * Return a string representing the exact value of this Decimal in a compact base-88 based format.
	   *
	   * The number of characters of the string will always be equal to or less than the number of
	   * characters returned by `toString` or `toExponential` - usually just over half as many.
	   *
	   * The original Decimal value can be recreated by passing the string to `Decimal.fromJSON`.
	   *
	   * Base 88 alphabet:
	   * 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~
	   *
	   * The following 7 printable ASCII characters are not used
	   * (space) \ " & ' < >
	   * so the return value is safe for strings, HTML, JSON, and XML.
	   *
	   *     0   0     g  16    w  32    M  48    $  64    ]  80
	   *     1   1     h  17    x  33    N  49    %  65    ^  81
	   *     2   2     i  18    y  34    O  50    (  66    _  82
	   *     3   3     j  19    z  35    P  51    )  67    `  83
	   *     4   4     k  20    A  36    Q  52    *  68    {  84
	   *     5   5     l  21    B  37    R  53    +  69    |  85
	   *     6   6     m  22    C  38    S  54    ,  70    }  86
	   *     7   7     n  23    D  39    T  55    -  71    ~  87
	   *     8   8     o  24    E  40    U  56    .  72
	   *     9   9     p  25    F  41    V  57    /  73
	   *     a  10     q  26    G  42    W  58    :  74
	   *     b  11     r  27    H  43    X  59    ;  75
	   *     c  12     s  28    I  44    Y  60    =  76
	   *     d  13     t  29    J  45    Z  61    ?  77
	   *     e  14     u  30    K  46    !  62    @  78
	   *     f  15     v  31    L  47    #  63    [  79
	   *
	   * If the return value is just one character, it represents:
	   * 0-81  [[0, 40][-0, -40]]
	   * 82    -Infinity
	   * 83    +Infinity
	   * 84    NaN
	   * 85-87 free
	   *
	   *   64 32 16  8  4  2  1
	   *    1  0  1  0  1  1  1 = 87
	   *
	   */
	   P.toJSON = function () {
	    var arr, e, i, k, len, n, r, str,
	      x = this,
	      isNeg = x.s < 0;

	    // -Infinity/Infinity/NaN.
	    if (!x.d) return NUMERALS.charAt(x.s ? isNeg ? 82 : 83 : 84);
	    e = x.e;

	    // Small integer.
	    if (x.d.length === 1 && e < 4 && e >= 0) {
	      n = x.d[0];

	      if (n < 2857) {

	        // One character.
	        // [[0, 40][-0, -40]]
	        if (n < 41) return NUMERALS.charAt(isNeg ? n + 41 : n);

	        // Two characters. High bit of first character unset.
	        // 0XXXXXX
	        // 63*88 + 87 = 5631 = 5632 values, 5632/2 = 2816
	        // [[0, 2815][2816, 5631]]  (2816 * 2 = 5632 values)
	        // [[0, 2815][-0, -2815]]
	        // [[41, 2856][-41, -2856]]
	        n -= 41;
	        if (isNeg) n += 2816;
	        k = n / 88 | 0;

	        return NUMERALS.charAt(k) + NUMERALS.charAt(n - k * 88);
	      }
	    }

	    str = digitsToString(x.d);
	    r = '';

	    // Values with a small exponent. Set high bit.
	    // Positive value: 100XXXX
	    // 1 0 0 {exponent [0, 15] -> [-7, 8]}
	    if (!isNeg && e <= 8 && e >= -7) {
	      k = 64 + e + 7;

	    // Negative value: 1010XXX
	    // 1 0 1 0 {exponent [0, 7] -> [-3, 4]}
	    } else if (isNeg && e <= 4 && e >= -3) {
	      k = 64 + 16 + e + 3;

	    // Integer without trailing zeros: 0X00000
	    // 0 {is negative} 0 0 0 0 0
	    } else if (str.length === e + 1) {
	      k = 32 * isNeg;

	    // All remaining values: 0XXXXXX
	    // Result will have at least 3 characters.
	    // 0 {is negative} {is exponent negative} {exponent character count [1, 15]}
	    } else {
	      k = 32 * isNeg + 16 * (e < 0);
	      e = Math.abs(e);

	      // One character to represent the exponent.
	      if (e < 88)  {
	        k += 1;
	        r = NUMERALS.charAt(e);

	      // Two characters to represent the exponent.
	      // 87*88 + 87 = 7743
	      } else if (e < 7744) {
	        k += 2;
	        n = e / 88 | 0;
	        r = NUMERALS.charAt(n) + NUMERALS.charAt(e - n * 88);

	      // More than two characters to represent the exponent.
	      } else {
	        arr = convertBase(String(e), 10, 88);
	        len = arr.length;
	        k += len;
	        for (i = 0; i < len; i++) r += NUMERALS.charAt(arr[i]);
	      }
	    }

	    // At this point r contains the characters in base 88 representing the exponent value.
	    // Prepend the first character, which describes the sign, the exponent sign, and the number of
	    // characters that follow which represent the exponent value.
	    r = NUMERALS.charAt(k) + r;
	    arr = convertBase(str, 10, 88);
	    len = arr.length;

	    // Add the base 88 characters that represent the significand.
	    for (i = 0; i < len; i++) r += NUMERALS.charAt(arr[i]);

	    return r;
	  };


	  /*
	   * Returns a new Decimal whose value is the nearest multiple of the magnitude of `y` to the value
	   * of this Decimal.
	   *
	   * If the value of this Decimal is equidistant from two multiples of `y`, the rounding mode `rm`,
	   * or `Decimal.rounding` if `rm` is omitted, determines the direction of the nearest multiple.
	   *
	   * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
	   * (ROUND_UP), and so on.
	   *
	   * The return value will always have the same sign as this Decimal, unless either this Decimal
	   * or `y` is NaN, in which case the return value will be also be NaN.
	   *
	   * The return value is not affected by the value of `precision`.
	   *
	   * y {number|string|Decimal} The magnitude to round to a multiple of.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toNearest() rounding mode not an integer: {rm}'
	   * 'toNearest() rounding mode out of range: {rm}'
	   *
	   */
	  P.toNearest = function (y, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    x = new Ctor(x);

	    if (y == null) {

	      // If x is not finite, return x.
	      if (!x.d) return x;

	      y = new Ctor(1);
	      rm = Ctor.rounding;
	    } else {
	      y = new Ctor(y);
	      if (rm !== void 0) checkInt32(rm, 0, 8);

	      // If x is not finite, return x if y is not NaN, else NaN.
	      if (!x.d) return y.s ? x : y;

	      // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
	      if (!y.d) {
	        if (y.s) y.s = x.s;
	        return y;
	      }
	    }

	    // If y is not zero, calculate the nearest multiple of y to x.
	    if (y.d[0]) {
	      external = false;
	      if (rm < 4) rm = [4, 5, 7, 8][rm];
	      x = divide(x, y, 0, rm, 1).times(y);
	      external = true;
	      finalise(x);

	    // If y is zero, return zero with the sign of x.
	    } else {
	      y.s = x.s;
	      x = y;
	    }

	    return x;
	  };


	  /*
	   * Return the value of this Decimal converted to a number primitive.
	   * Zero keeps its sign.
	   *
	   */
	  P.toNumber = function () {
	    return +this;
	  };


	  /*
	   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
	   * digits using rounding mode `rm`.
	   *
	   * If the optional `sd` argument is present then return binary exponential notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toOctal = function (sd, rm) {
	    return toStringBinary(this, 8, sd, rm);
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
	   * to `precision` significant digits using rounding mode `rounding`.
	   *
	   * ECMAScript compliant.
	   *
	   *   pow(x, NaN)                           = NaN
	   *   pow(x, ±0)                            = 1

	   *   pow(NaN, non-zero)                    = NaN
	   *   pow(abs(x) > 1, +Infinity)            = +Infinity
	   *   pow(abs(x) > 1, -Infinity)            = +0
	   *   pow(abs(x) == 1, ±Infinity)           = NaN
	   *   pow(abs(x) < 1, +Infinity)            = +0
	   *   pow(abs(x) < 1, -Infinity)            = +Infinity
	   *   pow(+Infinity, y > 0)                 = +Infinity
	   *   pow(+Infinity, y < 0)                 = +0
	   *   pow(-Infinity, odd integer > 0)       = -Infinity
	   *   pow(-Infinity, even integer > 0)      = +Infinity
	   *   pow(-Infinity, odd integer < 0)       = -0
	   *   pow(-Infinity, even integer < 0)      = +0
	   *   pow(+0, y > 0)                        = +0
	   *   pow(+0, y < 0)                        = +Infinity
	   *   pow(-0, odd integer > 0)              = -0
	   *   pow(-0, even integer > 0)             = +0
	   *   pow(-0, odd integer < 0)              = -Infinity
	   *   pow(-0, even integer < 0)             = +Infinity
	   *   pow(finite x < 0, finite non-integer) = NaN
	   *
	   * For non-integer or very large exponents pow(x, y) is calculated using
	   *
	   *   x^y = exp(y*ln(x))
	   *
	   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
	   * probability of an incorrectly rounded result
	   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
	   * i.e. 1 in 250,000,000,000,000
	   *
	   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
	   *
	   * y {number|string|Decimal} The power to which to raise this Decimal.
	   *
	   */
	  P.toPower = P.pow = function (y) {
	    var e, k, pr, r, rm, sign, yIsInt,
	      x = this,
	      Ctor = x.constructor,
	      yn = +(y = new Ctor(y));

	    // Either ±Infinity, NaN or ±0?
	    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return  new Ctor(mathpow(+x, yn));

	    x = new Ctor(x);

	    if (x.eq(1)) return x;

	    pr = Ctor.precision;
	    rm = Ctor.rounding;

	    if (y.eq(1)) return finalise(x, pr, rm);

	    e = mathfloor(y.e / LOG_BASE);
	    k = y.d.length - 1;
	    yIsInt = e >= k;
	    sign = x.s;

	    if (!yIsInt) {
	      if (sign < 0) return new Ctor(NaN);

	    // If y is a small integer use the 'exponentiation by squaring' algorithm.
	    } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	      r = intPow(Ctor, x, k, pr);
	      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
	    }

	    // Result is negative if x is negative and the last digit of integer y is odd.
	    sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;

	    // Estimate result exponent.
	    // x^y = 10^e,  where e = y * log10(x)
	    // log10(x) = log10(x_significand) + x_exponent
	    // log10(x_significand) = ln(x_significand) / ln(10)
	    k = mathpow(+x, yn);
	    e = k == 0 || !isFinite(k)
	      ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
	      : new Ctor(k + '').e;

	    // Estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

	    // Overflow/underflow?
	    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? sign / 0 : 0);

	    external = false;
	    Ctor.rounding = x.s = 1;

	    // Estimate the extra guard digits needed to ensure five correct rounding digits from
	    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
	    // new Decimal(2.32456).pow('2087987436534566.46411')
	    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
	    k = Math.min(12, (e + '').length);

	    // r = x^y = exp(y*ln(x))
	    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

	    // Truncate to the required precision plus five rounding digits.
	    r = finalise(r, pr + 5, 1);

	    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
	    // the result.
	    if (checkRoundingDigits(r.d, pr, rm)) {
	      e = pr + 10;

	      // Truncate to the increased precision plus five rounding digits.
	      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

	      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
	      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
	        r = finalise(r, pr + 1, 0);
	      }
	    }

	    r.s = sign;
	    external = true;
	    Ctor.rounding = rm;

	    return finalise(r, pr, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal rounded to `sd` significant digits
	   * using rounding mode `rounding`.
	   *
	   * Return exponential notation if `sd` is less than the number of digits necessary to represent
	   * the integer part of the value in normal notation.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   */
	  P.toPrecision = function (sd, rm) {
	    var str,
	      x = this,
	      Ctor = x.constructor;

	    if (sd === void 0) {
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);

	      x = finalise(new Ctor(x), sd, rm);
	      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
	    }

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
	   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
	   * omitted.
	   *
	   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	   *
	   * 'toSD() digits out of range: {sd}'
	   * 'toSD() digits not an integer: {sd}'
	   * 'toSD() rounding mode not an integer: {rm}'
	   * 'toSD() rounding mode out of range: {rm}'
	   *
	   */
	  P.toSignificantDigits = P.toSD = function (sd, rm) {
	    var x = this,
	      Ctor = x.constructor;

	    if (sd === void 0) {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    } else {
	      checkInt32(sd, 1, MAX_DIGITS);

	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    }

	    return finalise(new Ctor(x), sd, rm);
	  };


	  /*
	   * Return a string representing the value of this Decimal.
	   *
	   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
	   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
	   *
	   */
	  P.toString = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	    return x.isNeg() && !x.isZero() ? '-' + str : str;
	  };


	  /*
	   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
	   *
	   */
	  P.truncated = P.trunc = function () {
	    return finalise(new this.constructor(this), this.e + 1, 1);
	  };


	  /*
	   * Return a string representing the value of this Decimal.
	   * Unlike `toString`, negative zero will include the minus sign.
	   *
	   */
	  P.valueOf = function () {
	    var x = this,
	      Ctor = x.constructor,
	      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	    return x.isNeg() ? '-' + str : str;
	  };


	  /*
	  // Add aliases to match BigDecimal method names.
	  // P.add = P.plus;
	  P.subtract = P.minus;
	  P.multiply = P.times;
	  P.divide = P.div;
	  P.remainder = P.mod;
	  P.compareTo = P.cmp;
	  P.negate = P.neg;
	   */


	  // Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


	  /*
	   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toJSON,
	   *                           P.toPower, finiteToString, naturalExponential, naturalLogarithm
	   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
	   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
	   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
	   *  convertBase              P.toJSON, toStringBinary, fromJSON, parseOther
	   *  cos                      P.cos
	   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
	   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
	   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
	   *                           taylorSeries, atan2, parseOther
	   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
	   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
	   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
	   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
	   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
	   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
	   *                           naturalLogarithm, ceil, floor, round, trunc
	   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
	   *                           toStringBinary
	   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
	   *  getLn10                  P.logarithm, naturalLogarithm
	   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
	   *  getPrecision             P.precision, P.toFraction
	   *  getZeroString            digitsToString, finiteToString
	   *  intPow                   P.toPower, parseOther
	   *  isOdd                    toLessThanHalfPi
	   *  maxOrMin                 max, min
	   *  naturalExponential       P.naturalExponential, P.toPower
	   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
	   *                           P.toPower, naturalExponential
	   *  nonFiniteToString        finiteToString, toStringBinary
	   *  parseDecimal             Decimal
	   *  parseOther               Decimal
	   *  sin                      P.sin
	   *  taylorSeries             P.cosh, P.sinh, cos, sin
	   *  toLessThanHalfPi         P.cos, P.sin
	   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
	   *  truncate                 intPow
	   *
	   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
	   *                           naturalLogarithm, config, fromJSON, parseOther, random, Decimal           *
	   */


	  function digitsToString(d) {
	    var i, k, ws,
	      indexOfLastWord = d.length - 1,
	      str = '',
	      w = d[0];

	    if (indexOfLastWord > 0) {
	      str += w;
	      for (i = 1; i < indexOfLastWord; i++) {
	        ws = d[i] + '';
	        k = LOG_BASE - ws.length;
	        if (k) str += getZeroString(k);
	        str += ws;
	      }

	      w = d[i];
	      ws = w + '';
	      k = LOG_BASE - ws.length;
	      if (k) str += getZeroString(k);
	    } else if (w === 0) {
	      return '0';
	    }

	    // Remove trailing zeros of last w.
	    for (; w % 10 === 0;) w /= 10;

	    return str + w;
	  }


	  function checkInt32(i, min, max) {
	    if (i !== ~~i || i < min || i > max) {
	      throw Error(invalidArgument + i);
	    }
	  }


	  /*
	   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
	   * `repeating == null` if caller is `log` or `pow`,
	   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
	   */
	  function checkRoundingDigits(d, i, rm, repeating) {
	    var di, k, r, rd;

	    // Get the length of the first word of the array d.
	    for (k = d[0]; k >= 10; k /= 10) --i;

	    // Is the rounding digit in the first word of d?
	    if (--i < 0) {
	      i += LOG_BASE;
	      di = 0;
	    } else {
	      di = Math.ceil((i + 1) / LOG_BASE);
	      i %= LOG_BASE;
	    }

	    // i is the index (0 - 6) of the rounding digit.
	    // E.g. if within the word 3487563 the first rounding digit is 5,
	    // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
	    k = mathpow(10, LOG_BASE - i);
	    rd = d[di] % k | 0;

	    if (repeating == null) {
	      if (i < 3) {
	        if (i == 0) rd = rd / 100 | 0;
	        else if (i == 1) rd = rd / 10 | 0;
	        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
	      } else {
	        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
	            (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
	      }
	    } else {
	      if (i < 4) {
	        if (i == 0) rd = rd / 1000 | 0;
	        else if (i == 1) rd = rd / 100 | 0;
	        else if (i == 2) rd = rd / 10 | 0;
	        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
	      } else {
	        r = ((repeating || rm < 4) && rd + 1 == k ||
	        (!repeating && rm > 3) && rd + 1 == k / 2) &&
	          (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
	      }
	    }

	    return r;
	  }


	  // Convert string of `baseIn` to an array of numbers of `baseOut`.
	  // Eg. convertBase('255', 10, 16) returns [15, 15].
	  // Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	  function convertBase(str, baseIn, baseOut) {
	    var j,
	      arr = [0],
	      arrL,
	      i = 0,
	      strL = str.length;

	    for (; i < strL;) {
	      for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
	      arr[0] += NUMERALS.indexOf(str.charAt(i++));
	      for (j = 0; j < arr.length; j++) {
	        if (arr[j] > baseOut - 1) {
	          if (arr[j + 1] === void 0) arr[j + 1] = 0;
	          arr[j + 1] += arr[j] / baseOut | 0;
	          arr[j] %= baseOut;
	        }
	      }
	    }

	    return arr.reverse();
	  }


	  /*
	   * cos(x) = 1 - x^2/2! + x^4/4! - ...
	   * |x| < pi/2
	   *
	   */
	  function cosine(Ctor, x) {
	    var k, y,
	      len = x.d.length;

	    // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
	    // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

	    // Estimate the optimum number of times to use the argument reduction.
	    if (len < 32) {
	      k = Math.ceil(len / 3);
	      y = Math.pow(4, -k).toString();
	    } else {
	      k = 16;
	      y = '2.3283064365386962890625e-10';
	    }

	    Ctor.precision += k;

	    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

	    // Reverse argument reduction
	    for (var i = k; i--;) {
	      var cos2x = x.times(x);
	      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
	    }

	    Ctor.precision -= k;

	    return x;
	  }


	  /*
	   * Perform division in the specified base.
	   */
	  var divide = (function () {

	    // Assumes non-zero x and k, and hence non-zero result.
	    function multiplyInteger(x, k, base) {
	      var temp,
	        carry = 0,
	        i = x.length;

	      for (x = x.slice(); i--;) {
	        temp = x[i] * k + carry;
	        x[i] = temp % base | 0;
	        carry = temp / base | 0;
	      }

	      if (carry) x.unshift(carry);

	      return x;
	    }

	    function compare(a, b, aL, bL) {
	      var i, r;

	      if (aL != bL) {
	        r = aL > bL ? 1 : -1;
	      } else {
	        for (i = r = 0; i < aL; i++) {
	          if (a[i] != b[i]) {
	            r = a[i] > b[i] ? 1 : -1;
	            break;
	          }
	        }
	      }

	      return r;
	    }

	    function subtract(a, b, aL, base) {
	      var i = 0;

	      // Subtract b from a.
	      for (; aL--;) {
	        a[aL] -= i;
	        i = a[aL] < b[aL] ? 1 : 0;
	        a[aL] = i * base + a[aL] - b[aL];
	      }

	      // Remove leading zeros.
	      for (; !a[0] && a.length > 1;) a.shift();
	    }

	    return function (x, y, pr, rm, dp, base) {
	      var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
	        yL, yz,
	        Ctor = x.constructor,
	        sign = x.s == y.s ? 1 : -1,
	        xd = x.d,
	        yd = y.d;

	      // Either NaN, Infinity or 0?
	      if (!xd || !xd[0] || !yd || !yd[0]) {

	        return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
	          !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

	          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
	          xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
	      }

	      if (base) {
	        logBase = 1;
	        e = x.e - y.e;
	      } else {
	        base = BASE;
	        logBase = LOG_BASE;
	        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
	      }

	      yL = yd.length;
	      xL = xd.length;
	      q = new Ctor(sign);
	      qd = q.d = [];

	      // Result exponent may be one less than e.
	      // The digit array of a Decimal from toStringBinary may have trailing zeros.
	      for (i = 0; yd[i] == (xd[i] || 0); i++);

	      if (yd[i] > (xd[i] || 0)) e--;

	      if (pr == null) {
	        sd = pr = Ctor.precision;
	        rm = Ctor.rounding;
	      } else if (dp) {
	        sd = pr + (x.e - y.e) + 1;
	      } else {
	        sd = pr;
	      }

	      if (sd < 0) {
	        qd.push(1);
	        more = true;
	      } else {

	        // Convert precision in number of base 10 digits to base 1e7 digits.
	        sd = sd / logBase + 2 | 0;
	        i = 0;

	        // divisor < 1e7
	        if (yL == 1) {
	          k = 0;
	          yd = yd[0];
	          sd++;

	          // k is the carry.
	          for (; (i < xL || k) && sd--; i++) {
	            t = k * base + (xd[i] || 0);
	            qd[i] = t / yd | 0;
	            k = t % yd | 0;
	          }

	          more = k || i < xL;

	        // divisor >= 1e7
	        } else {

	          // Normalise xd and yd so highest order digit of yd is >= base/2
	          k = base / (yd[0] + 1) | 0;

	          if (k > 1) {
	            yd = multiplyInteger(yd, k, base);
	            xd = multiplyInteger(xd, k, base);
	            yL = yd.length;
	            xL = xd.length;
	          }

	          xi = yL;
	          rem = xd.slice(0, yL);
	          remL = rem.length;

	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL;) rem[remL++] = 0;

	          yz = yd.slice();
	          yz.unshift(0);
	          yd0 = yd[0];

	          if (yd[1] >= base / 2) ++yd0;

	          do {
	            k = 0;

	            // Compare divisor and remainder.
	            cmp = compare(yd, rem, yL, remL);

	            // If divisor < remainder.
	            if (cmp < 0) {

	              // Calculate trial digit, k.
	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	              // k will be how many times the divisor goes into the current remainder.
	              k = rem0 / yd0 | 0;

	              //  Algorithm:
	              //  1. product = divisor * trial digit (k)
	              //  2. if product > remainder: product -= divisor, k--
	              //  3. remainder -= product
	              //  4. if product was < remainder at 2:
	              //    5. compare new remainder and divisor
	              //    6. If remainder > divisor: remainder -= divisor, k++

	              if (k > 1) {
	                if (k >= base) k = base - 1;

	                // product = divisor * trial digit.
	                prod = multiplyInteger(yd, k, base);
	                prodL = prod.length;
	                remL = rem.length;

	                // Compare product and remainder.
	                cmp = compare(prod, rem, prodL, remL);

	                // product > remainder.
	                if (cmp == 1) {
	                  k--;

	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
	                }
	              } else {

	                // cmp is -1.
	                // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
	                // to avoid it. If k is 1 there is a need to compare yd and rem again below.
	                if (k == 0) cmp = k = 1;
	                prod = yd.slice();
	              }

	              prodL = prod.length;
	              if (prodL < remL) prod.unshift(0);

	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);

	              // If product was < previous remainder.
	              if (cmp == -1) {
	                remL = rem.length;

	                // Compare divisor and new remainder.
	                cmp = compare(yd, rem, yL, remL);

	                // If divisor < new remainder, subtract divisor from remainder.
	                if (cmp < 1) {
	                  k++;

	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yd, remL, base);
	                }
	              }

	              remL = rem.length;
	            } else if (cmp === 0) {
	              k++;
	              rem = [0];
	            }    // if cmp === 1, k will be 0

	            // Add the next digit, k, to the result array.
	            qd[i++] = k;

	            // Update the remainder.
	            if (cmp && rem[0]) {
	              rem[remL++] = xd[xi] || 0;
	            } else {
	              rem = [xd[xi]];
	              remL = 1;
	            }

	          } while ((xi++ < xL || rem[0] !== void 0) && sd--);

	          more = rem[0] !== void 0;
	        }

	        // Leading zero?
	        if (!qd[0]) qd.shift();
	      }

	      // logBase is 1 when divide is being used for base conversion.
	      if (logBase == 1) {
	        q.e = e;
	        inexact = more;
	      } else {

	        // To calculate q.e, first get the number of digits of qd[0].
	        for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
	        q.e = i + e * logBase - 1;

	        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
	      }

	      return q;
	    };
	  })();


	  /*
	   * Round `x` to `sd` significant digits using rounding mode `rm`.
	   * Check for over/under-flow.
	   */
	   function finalise(x, sd, rm, isTruncated) {
	    var digits, i, j, k, rd, roundUp, w, xd, xdi,
	      Ctor = x.constructor;

	    // Don't round if sd is null or undefined.
	    out: if (sd != null) {
	      xd = x.d;

	      // Infinity/NaN.
	      if (!xd) return x;

	      // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
	      // w: the word of xd containing rd, a base 1e7 number.
	      // xdi: the index of w within xd.
	      // digits: the number of digits of w.
	      // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	      // they had leading zeros)
	      // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

	      // Get the length of the first word of the digits array xd.
	      for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
	      i = sd - digits;

	      // Is the rounding digit in the first word of xd?
	      if (i < 0) {
	        i += LOG_BASE;
	        j = sd;
	        w = xd[xdi = 0];

	        // Get the rounding digit at index j of w.
	        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
	      } else {
	        xdi = Math.ceil((i + 1) / LOG_BASE);
	        k = xd.length;
	        if (xdi >= k) {
	          if (isTruncated) {

	            // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
	            for (; k++ <= xdi;) xd.push(0);
	            w = rd = 0;
	            digits = 1;
	            i %= LOG_BASE;
	            j = i - LOG_BASE + 1;
	          } else {
	            break out;
	          }
	        } else {
	          w = k = xd[xdi];

	          // Get the number of digits of w.
	          for (digits = 1; k >= 10; k /= 10) digits++;

	          // Get the index of rd within w.
	          i %= LOG_BASE;

	          // Get the index of rd within w, adjusted for leading zeros.
	          // The number of leading zeros of w is given by LOG_BASE - digits.
	          j = i - LOG_BASE + digits;

	          // Get the rounding digit at index j of w.
	          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
	        }
	      }

	      // Are there any non-zero digits after the rounding digit?
	      isTruncated = isTruncated || sd < 0 ||
	        xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

	      // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
	      // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
	      // will give 714.

	      roundUp = rm < 4
	        ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	        : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

	          // Check whether the digit to the left of the rounding digit is odd.
	          ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
	            rm == (x.s < 0 ? 8 : 7));

	      if (sd < 1 || !xd[0]) {
	        xd.length = 0;
	        if (roundUp) {

	          // Convert sd to decimal places.
	          sd -= x.e + 1;

	          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
	          x.e = -sd || 0;
	        } else {

	          // Zero.
	          xd[0] = x.e = 0;
	        }

	        return x;
	      }

	      // Remove excess digits.
	      if (i == 0) {
	        xd.length = xdi;
	        k = 1;
	        xdi--;
	      } else {
	        xd.length = xdi + 1;
	        k = mathpow(10, LOG_BASE - i);

	        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	        // j > 0 means i > number of leading zeros of w.
	        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
	      }

	      if (roundUp) {
	        for (;;) {

	          // Is the digit to be rounded up in the first word of xd?
	          if (xdi == 0) {

	            // i will be the length of xd[0] before k is added.
	            for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
	            j = xd[0] += k;
	            for (k = 1; j >= 10; j /= 10) k++;

	            // if i != k the length has increased.
	            if (i != k) {
	              x.e++;
	              if (xd[0] == BASE) xd[0] = 1;
	            }

	            break;
	          } else {
	            xd[xdi] += k;
	            if (xd[xdi] != BASE) break;
	            xd[xdi--] = 0;
	            k = 1;
	          }
	        }
	      }

	      // Remove trailing zeros.
	      for (i = xd.length; xd[--i] === 0;) xd.pop();
	    }

	    if (external) {

	      // Overflow?
	      if (x.e > Ctor.maxE) {

	        // Infinity.
	        x.d = null;
	        x.e = NaN;

	      // Underflow?
	      } else if (x.e < Ctor.minE) {

	        // Zero.
	        x.e = 0;
	        x.d = [0];
	        // Ctor.underflow = true;
	      } // else Ctor.underflow = false;
	    }

	    return x;
	  }


	  function finiteToString(x, isExp, sd) {
	    if (!x.isFinite()) return nonFiniteToString(x);
	    var k,
	      e = x.e,
	      str = digitsToString(x.d),
	      len = str.length;

	    if (isExp) {
	      if (sd && (k = sd - len) > 0) {
	        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
	      } else if (len > 1) {
	        str = str.charAt(0) + '.' + str.slice(1);
	      }

	      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
	    } else if (e < 0) {
	      str = '0.' + getZeroString(-e - 1) + str;
	      if (sd && (k = sd - len) > 0) str += getZeroString(k);
	    } else if (e >= len) {
	      str += getZeroString(e + 1 - len);
	      if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	    } else {
	      if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	      if (sd && (k = sd - len) > 0) {
	        if (e + 1 === len) str += '.';
	        str += getZeroString(k);
	      }
	    }

	    return str;
	  }


	  // Calculate the base 10 exponent from the base 1e7 exponent.
	  function getBase10Exponent(digits, e) {

	    // First get the number of digits of the first word of the digits array.
	    for (var i = 1, w = digits[0]; w >= 10; w /= 10) i++;
	    return i + e * LOG_BASE - 1;
	  }


	   function getLn10(Ctor, sd, pr) {
	    if (sd > LN10_PRECISION) {

	      // Reset global state in case the exception is caught.
	      external = true;
	      if (pr) Ctor.precision = pr;
	      throw Error(precisionLimitExceeded);
	    }
	    return finalise(new Ctor(LN10), sd, 1, true);
	  }


	  function getPi(Ctor, sd, rm) {
	    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
	    return finalise(new Ctor(PI), sd, rm, true);
	  }


	  function getPrecision(digits) {
	    var w = digits.length - 1,
	      len = w * LOG_BASE + 1;

	    w = digits[w];

	    // If non-zero...
	    if (w) {

	      // Subtract the number of trailing zeros of the last word.
	      for (; w % 10 == 0; w /= 10) len--;

	      // Add the number of digits of the first word.
	      for (w = digits[0]; w >= 10; w /= 10) len++;
	    }

	    return len;
	  }


	  function getZeroString(k) {
	    var zs = '';
	    for (; k--;) zs += '0';
	    return zs;
	  }


	  /*
	   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
	   * integer of type number.
	   *
	   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
	   *
	   */
	  function intPow(Ctor, x, n, pr) {
	    var isTruncated,
	      r = new Ctor(1),

	      // Max n of 9007199254740991 takes 53 loop iterations.
	      // Maximum digits array length; leaves [28, 34] guard digits.
	      k = Math.ceil(pr / LOG_BASE + 4);

	    external = false;

	    for (;;) {
	      if (n % 2) {
	        r = r.times(x);
	        if (truncate(r.d, k)) isTruncated = true;
	      }

	      n = mathfloor(n / 2);
	      if (n === 0) {

	        // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
	        n = r.d.length - 1;
	        if (isTruncated && r.d[n] === 0) ++r.d[n];
	        break;
	      }

	      x = x.times(x);
	      truncate(x.d, k);
	    }

	    external = true;

	    return r;
	  }


	  function isOdd(n) {
	    return n.d[n.d.length - 1] & 1;
	  }


	  /*
	   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
	   */
	  function maxOrMin(Ctor, args, ltgt) {
	    var y,
	      x = new Ctor(args[0]),
	      i = 0;

	    for (; ++i < args.length;) {
	      y = new Ctor(args[i]);
	      if (!y.s) {
	        x = y;
	        break;
	      } else if (x[ltgt](y)) {
	        x = y;
	      }
	    }

	    return x;
	  }


	  /*
	   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
	   * digits.
	   *
	   * Taylor/Maclaurin series.
	   *
	   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
	   *
	   * Argument reduction:
	   *   Repeat x = x / 32, k += 5, until |x| < 0.1
	   *   exp(x) = exp(x / 2^k)^(2^k)
	   *
	   * Previously, the argument was initially reduced by
	   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
	   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
	   * found to be slower than just dividing repeatedly by 32 as above.
	   *
	   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
	   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
	   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
	   *
	   *  exp(Infinity)  = Infinity
	   *  exp(-Infinity) = 0
	   *  exp(NaN)       = NaN
	   *  exp(±0)        = 1
	   *
	   *  exp(x) is non-terminating for any finite, non-zero x.
	   *
	   *  The result will always be correctly rounded.
	   *
	   */
	  function naturalExponential(x, sd) {
	    var denominator, guard, j, pow, sum, t, wpr,
	      rep = 0,
	      i = 0,
	      k = 0,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;

	    // 0/NaN/Infinity?
	    if (!x.d || !x.d[0] || x.e > 17) {

	      return new Ctor(x.d
	        ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
	        : x.s ? x.s < 0 ? 0 : x : 0 / 0);
	    }

	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }

	    t = new Ctor(0.03125);

	    // while abs(x) >= 0.1
	    while (x.e > -2) {

	      // x = x / 2^5
	      x = x.times(t);
	      k += 5;
	    }

	    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
	    // necessary to ensure the first 4 rounding digits are correct.
	    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	    wpr += guard;
	    denominator = pow = sum = new Ctor(1);
	    Ctor.precision = wpr;

	    for (;;) {
	      pow = finalise(pow.times(x), wpr, 1);
	      denominator = denominator.times(++i);
	      t = sum.plus(divide(pow, denominator, wpr, 1));

	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        j = k;
	        while (j--) sum = finalise(sum.times(sum), wpr, 1);

	        // Check to see if the first 4 rounding digits are [49]999.
	        // If so, repeat the summation with a higher precision, otherwise
	        // e.g. with precision: 18, rounding: 1
	        // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {

	          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += 10;
	            denominator = pow = t = new Ctor(1);
	            i = 0;
	            rep++;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }

	      sum = t;
	    }
	  }


	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
	   * digits.
	   *
	   *  ln(-n)        = NaN
	   *  ln(0)         = -Infinity
	   *  ln(-0)        = -Infinity
	   *  ln(1)         = 0
	   *  ln(Infinity)  = Infinity
	   *  ln(-Infinity) = NaN
	   *  ln(NaN)       = NaN
	   *
	   *  ln(n) (n != 1) is non-terminating.
	   *
	   */
	  function naturalLogarithm(y, sd) {
	    var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
	      n = 1,
	      guard = 10,
	      x = y,
	      xd = x.d,
	      Ctor = x.constructor,
	      rm = Ctor.rounding,
	      pr = Ctor.precision;

	    // Is x negative or Infinity, NaN, 0 or 1?
	    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
	      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
	    }

	    if (sd == null) {
	      external = false;
	      wpr = pr;
	    } else {
	      wpr = sd;
	    }

	    Ctor.precision = wpr += guard;
	    c = digitsToString(xd);
	    c0 = c.charAt(0);

	    if (Math.abs(e = x.e) < 1.5e15) {

	      // Argument reduction.
	      // The series converges faster the closer the argument is to 1, so using
	      // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
	      // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
	      // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
	      // later be divided by this number, then separate out the power of 10 using
	      // ln(a*10^b) = ln(a) + b*ln(10).

	      // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
	      //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
	      // max n is 6 (gives 0.7 - 1.3)
	      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
	        x = x.times(y);
	        c = digitsToString(x.d);
	        c0 = c.charAt(0);
	        n++;
	      }

	      e = x.e;

	      if (c0 > 1) {
	        x = new Ctor('0.' + c);
	        e++;
	      } else {
	        x = new Ctor(c0 + '.' + c.slice(1));
	      }
	    } else {

	      // The argument reduction method above may result in overflow if the argument y is a massive
	      // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	      // function using ln(x*10^e) = ln(x) + e*ln(10).
	      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
	      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
	      Ctor.precision = pr;

	      return sd == null ? finalise(x, pr, rm, external = true) : x;
	    }

	    // x1 is x reduced to a value near 1.
	    x1 = x;

	    // Taylor series.
	    // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	    // where x = (y - 1)/(y + 1)    (|x| < 1)
	    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
	    x2 = finalise(x.times(x), wpr, 1);
	    denominator = 3;

	    for (;;) {
	      numerator = finalise(numerator.times(x2), wpr, 1);
	      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

	      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	        sum = sum.times(2);

	        // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
	        // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
	        if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
	        sum = divide(sum, new Ctor(n), wpr, 1);

	        // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
	        // been repeated previously) and the first 4 rounding digits 9999?
	        // If so, restart the summation with a higher precision, otherwise
	        // e.g. with precision: 12, rounding: 1
	        // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
	        // `wpr - guard` is the index of first rounding digit.
	        if (sd == null) {
	          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	            Ctor.precision = wpr += guard;
	            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
	            x2 = finalise(x.times(x), wpr, 1);
	            denominator = rep = 1;
	          } else {
	            return finalise(sum, Ctor.precision = pr, rm, external = true);
	          }
	        } else {
	          Ctor.precision = pr;
	          return sum;
	        }
	      }

	      sum = t;
	      denominator += 2;
	    }
	  }


	  // ±Infinity, NaN.
	  function nonFiniteToString(x) {
	    // Unsigned.
	    return String(x.s * x.s / 0);
	  }


	  /*
	   * Parse the value of a new Decimal `x` from string `str`.
	   */
	  function parseDecimal(x, str) {
	    var e, i, len;

	    // Decimal point?
	    if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	    // Exponential form?
	    if ((i = str.search(/e/i)) > 0) {

	      // Determine exponent.
	      if (e < 0) e = i;
	      e += +str.slice(i + 1);
	      str = str.substring(0, i);
	    } else if (e < 0) {

	      // Integer.
	      e = str.length;
	    }

	    // Determine leading zeros.
	    for (i = 0; str.charCodeAt(i) === 48; i++);

	    // Determine trailing zeros.
	    for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
	    str = str.slice(i, len);

	    if (str) {
	      len -= i;
	      x.e = e = e - i - 1;
	      x.d = [];

	      // Transform base

	      // e is the base 10 exponent.
	      // i is where to slice str to get the first word of the digits array.
	      i = (e + 1) % LOG_BASE;
	      if (e < 0) i += LOG_BASE;

	      if (i < len) {
	        if (i) x.d.push(+str.slice(0, i));
	        for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
	        str = str.slice(i);
	        i = LOG_BASE - str.length;
	      } else {
	        i -= len;
	      }

	      for (; i--;) str += '0';
	      x.d.push(+str);

	      if (external) {

	        // Overflow?
	        if (x.e > x.constructor.maxE) {

	          // Infinity.
	          x.d = null;
	          x.e = NaN;

	        // Underflow?
	        } else if (x.e < x.constructor.minE) {

	          // Zero.
	          x.e = 0;
	          x.d = [0];
	          // x.constructor.underflow = true;
	        } // else x.constructor.underflow = false;
	      }
	    } else {

	      // Zero.
	      x.e = 0;
	      x.d = [0];
	    }

	    return x;
	  }


	  /*
	   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
	   */
	  function parseOther(x, str) {
	    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

	    if (str === 'Infinity' || str === 'NaN') {
	      if (!+str) x.s = NaN;
	      x.e = NaN;
	      x.d = null;
	      return x;
	    }

	    if (isHex.test(str))  {
	      base = 16;
	      str = str.toLowerCase();
	    } else if (isBinary.test(str))  {
	      base = 2;
	    } else if (isOctal.test(str))  {
	      base = 8;
	    } else {
	      throw Error(invalidArgument + str);
	    }

	    // Is there a binary exponent part?
	    i = str.search(/p/i);

	    if (i > 0) {
	      p = +str.slice(i + 1);
	      str = str.substring(2, i);
	    } else {
	      str = str.slice(2);
	    }

	    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
	    // fraction part will be restored.
	    i = str.indexOf('.');
	    isFloat = i >= 0;
	    Ctor = x.constructor;

	    if (isFloat) {
	      str = str.replace('.', '');
	      len = str.length;
	      i = len - i;

	      // log[10](16) = 1.2041... , log[10](88) = 1.9444....
	      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
	    }

	    xd = convertBase(str, base, BASE);
	    xe = xd.length - 1;

	    // Remove trailing zeros.
	    for (i = xe; xd[i] === 0; --i) xd.pop();
	    if (i < 0) return new Ctor(x.s * 0);
	    x.e = getBase10Exponent(xd, xe);
	    x.d = xd;
	    external = false;

	    // At what precision to perform the division to ensure exact conversion?
	    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
	    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
	    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
	    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
	    // Therefore using 4 * the number of digits of str will always be enough.
	    if (isFloat) x = divide(x, divisor, len * 4);

	    // Multiply by the binary exponent part if present.
	    if (p) x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
	    external = true;

	    return x;
	  }


	  /*
	   * sin(x) = x - x^3/3! + x^5/5! - ...
	   * |x| < pi/2
	   *
	   */
	  function sine(Ctor, x) {
	    var k,
	      len = x.d.length;

	    if (len < 3) return taylorSeries(Ctor, 2, x, x);

	    // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
	    // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
	    // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

	    // Estimate the optimum number of times to use the argument reduction.
	    k = 1.4 * Math.sqrt(len);
	    k = k > 16 ? 16 : k | 0;

	    // Max k before Math.pow precision loss is 22
	    x = x.times(Math.pow(5, -k));
	    x = taylorSeries(Ctor, 2, x, x);

	    // Reverse argument reduction
	    var sin2_x,
	      d5 = new Ctor(5),
	      d16 = new Ctor(16),
	      d20 = new Ctor(20);
	    for (; k--;) {
	      sin2_x = x.times(x);
	      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
	    }

	    return x;
	  }


	  // Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
	  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
	    var j, t, u, x2,
	      i = 1,
	      pr = Ctor.precision,
	      k = Math.ceil(pr / LOG_BASE);

	    external = false;
	    x2 = x.times(x);
	    u = new Ctor(y);

	    for (;;) {
	      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
	      u = isHyperbolic ? y.plus(t) : y.minus(t);
	      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
	      t = u.plus(y);

	      if (t.d[k] !== void 0) {
	        for (j = k; t.d[j] === u.d[j] && j--;);
	        if (j == -1) break;
	      }

	      j = u;
	      u = y;
	      y = t;
	      t = j;
	      i++;
	    }

	    external = true;
	    t.d.length = k + 1;

	    return t;
	  }


	  // Return the absolute value of `x` reduced to less than or equal to half pi.
	  function toLessThanHalfPi(Ctor, x) {
	    var t,
	      isNeg = x.s < 0,
	      pi = getPi(Ctor, Ctor.precision, 1),
	      halfPi = pi.times(0.5);

	    x = x.abs();

	    if (x.lte(halfPi)) {
	      quadrant = isNeg ? 4 : 1;
	      return x;
	    }

	    t = x.divToInt(pi);

	    if (t.isZero()) {
	      quadrant = isNeg ? 3 : 2;
	    } else {
	      x = x.minus(t.times(pi));

	      // 0 <= x < pi
	      if (x.lte(halfPi)) {
	        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
	        return x;
	      }

	      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
	    }

	    return x.minus(pi).abs();
	  }


	  /*
	   * Return the value of Decimal `x` as a string in base `baseOut`.
	   *
	   * If the optional `sd` argument is present include a binary exponent suffix.
	   */
	  function toStringBinary(x, baseOut, sd, rm) {
	    var base, e, i, k, len, roundUp, str, xd, y,
	      Ctor = x.constructor,
	      isExp = sd !== void 0;

	    if (isExp) {
	      checkInt32(sd, 1, MAX_DIGITS);
	      if (rm === void 0) rm = Ctor.rounding;
	      else checkInt32(rm, 0, 8);
	    } else {
	      sd = Ctor.precision;
	      rm = Ctor.rounding;
	    }

	    if (!x.isFinite()) {
	      str = nonFiniteToString(x);
	    } else {
	      str = finiteToString(x);
	      i = str.indexOf('.');

	      // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
	      // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
	      // minBinaryExponent = floor(decimalExponent * log[2](10))
	      // log[2](10) = 3.321928094887362347870319429489390175864

	      if (isExp) {
	        base = 2;
	        if (baseOut == 16) {
	          sd = sd * 4 - 3;
	        } else if (baseOut == 8) {
	          sd = sd * 3 - 2;
	        }
	      } else {
	        base = baseOut;
	      }

	      // Convert the number as an integer then divide the result by its base raised to a power such
	      // that the fraction part will be restored.

	      // Non-integer.
	      if (i >= 0) {
	        str = str.replace('.', '');
	        y = new Ctor(1);
	        y.e = str.length - i;
	        y.d = convertBase(finiteToString(y), 10, base);
	        y.e = y.d.length;
	      }

	      xd = convertBase(str, 10, base);
	      e = len = xd.length;

	      // Remove trailing zeros.
	      for (; xd[--len] == 0;) xd.pop();

	      if (!xd[0]) {
	        str = isExp ? '0p+0' : '0';
	      } else {
	        if (i < 0) {
	          e--;
	        } else {
	          x = new Ctor(x);
	          x.d = xd;
	          x.e = e;
	          x = divide(x, y, sd, rm, 0, base);
	          xd = x.d;
	          e = x.e;
	          roundUp = inexact;
	        }

	        // The rounding digit, i.e. the digit after the digit that may be rounded up.
	        i = xd[sd];
	        k = base / 2;
	        roundUp = roundUp || xd[sd + 1] !== void 0;

	        roundUp = rm < 4
	          ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
	          : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
	            rm === (x.s < 0 ? 8 : 7));

	        xd.length = sd;

	        if (roundUp) {

	          // Rounding up may mean the previous digit has to be rounded up and so on.
	          for (; ++xd[--sd] > base - 1;) {
	            xd[sd] = 0;
	            if (!sd) {
	              ++e;
	              xd.unshift(1);
	            }
	          }
	        }

	        // Determine trailing zeros.
	        for (len = xd.length; !xd[len - 1]; --len);

	        // E.g. [4, 11, 15] becomes 4bf.
	        for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

	        // Add binary exponent suffix?
	        if (isExp) {
	          if (len > 1) {
	            if (baseOut == 16 || baseOut == 8) {
	              i = baseOut == 16 ? 4 : 3;
	              for (--len; len % i; len++) str += '0';
	              xd = convertBase(str, base, baseOut);
	              for (len = xd.length; !xd[len - 1]; --len);

	              // xd[0] will always be be 1
	              for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
	            } else {
	              str = str.charAt(0) + '.' + str.slice(1);
	            }
	          }

	          str =  str + (e < 0 ? 'p' : 'p+') + e;
	        } else if (e < 0) {
	          for (; ++e;) str = '0' + str;
	          str = '0.' + str;
	        } else {
	          if (++e > len) for (e -= len; e-- ;) str += '0';
	          else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
	        }
	      }

	      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
	    }

	    return x.s < 0 ? '-' + str : str;
	  }


	  // Does not strip trailing zeros.
	  function truncate(arr, len) {
	    if (arr.length > len) {
	      arr.length = len;
	      return true;
	    }
	  }


	  // Decimal methods


	  /*
	   *  abs
	   *  acos
	   *  acosh
	   *  add
	   *  asin
	   *  asinh
	   *  atan
	   *  atanh
	   *  atan2
	   *  cbrt
	   *  ceil
	   *  clone
	   *  config
	   *  cos
	   *  cosh
	   *  div
	   *  exp
	   *  floor
	   *  fromJSON
	   *  hypot
	   *  ln
	   *  log
	   *  log2
	   *  log10
	   *  max
	   *  min
	   *  mod
	   *  mul
	   *  pow
	   *  random
	   *  round
	   *  sign
	   *  sin
	   *  sinh
	   *  sqrt
	   *  sub
	   *  tan
	   *  tanh
	   *  trunc
	   */


	  /*
	   * Return a new Decimal whose value is the absolute value of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function abs(x) {
	    return new this(x).abs();
	  }


	  /*
	   * Return a new Decimal whose value is the arccosine in radians of `x`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function acos(x) {
	    return new this(x).acos();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function acosh(x) {
	    return new this(x).acosh();
	  }


	  /*
	   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function add(x, y) {
	    return new this(x).plus(y);
	  }


	  /*
	   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function asin(x) {
	    return new this(x).asin();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function asinh(x) {
	    return new this(x).asinh();
	  }


	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function atan(x) {
	    return new this(x).atan();
	  }


	  /*
	   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
	   * `precision` significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function atanh(x) {
	    return new this(x).atanh();
	  }


	  /*
	   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
	   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * Domain: [-Infinity, Infinity]
	   * Range: [-pi, pi]
	   *
	   * y {number|string|Decimal} The y-coordinate.
	   * x {number|string|Decimal} The x-coordinate.
	   *
	   * atan2(±0, -0)               = ±pi
	   * atan2(±0, +0)               = ±0
	   * atan2(±0, -x)               = ±pi for x > 0
	   * atan2(±0, x)                = ±0 for x > 0
	   * atan2(-y, ±0)               = -pi/2 for y > 0
	   * atan2(y, ±0)                = pi/2 for y > 0
	   * atan2(±y, -Infinity)        = ±pi for finite y > 0
	   * atan2(±y, +Infinity)        = ±0 for finite y > 0
	   * atan2(±Infinity, x)         = ±pi/2 for finite x
	   * atan2(±Infinity, -Infinity) = ±3*pi/4
	   * atan2(±Infinity, +Infinity) = ±pi/4
	   * atan2(NaN, x) = NaN
	   * atan2(y, NaN) = NaN
	   *
	   */
	  function atan2(y, x) {
	    y = new this(y);
	    x = new this(x);
	    var r,
	      pr = this.precision,
	      rm = this.rounding,
	      wpr = pr + 4;

	    // Either NaN
	    if (!y.s || !x.s) {
	      r = new this(NaN);

	    // Both ±Infinity
	    } else if (!y.d && !x.d) {
	      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
	      r.s = y.s;

	    // x is ±Infinity or y is ±0
	    } else if (!x.d || y.isZero()) {
	      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
	      r.s = y.s;

	    // y is ±Infinity or x is ±0
	    } else if (!y.d || x.isZero()) {
	      r = getPi(this, wpr, 1).times(0.5);
	      r.s = y.s;

	    // Both non-zero and finite
	    } else if (x.s < 0) {
	      this.precision = wpr;
	      this.rounding = 1;
	      r = this.atan(divide(y, x, wpr, 1));
	      x = getPi(this, wpr, 1);
	      this.precision = pr;
	      this.rounding = rm;
	      r = y.s < 0 ? r.minus(x) : r.plus(x);
	    } else {
	      r = this.atan(divide(y, x, wpr, 1));
	    }

	    return r;
	  }


	  /*
	   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function cbrt(x) {
	    return new this(x).cbrt();
	  }


	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ceil(x) {
	    return finalise(x = new this(x), x.e + 1, 2);
	  }


	  /*
	   * Configure global settings for a Decimal constructor.
	   *
	   * `obj` is an object with one or more of the following properties,
	   *
	   *   precision  {number}
	   *   rounding   {number}
	   *   toExpNeg   {number}
	   *   toExpPos   {number}
	   *   maxE       {number}
	   *   minE       {number}
	   *   modulo     {number}
	   *   crypto     {boolean|number|undefined}
	   *
	   * E.g. Decimal.config({ precision: 20, rounding: 4 })
	   *
	   */
	  function config(obj) {
	    if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
	    var i, p, v,
	      ps = [
	        'precision', 1, MAX_DIGITS,
	        'rounding', 0, 8,
	        'toExpNeg', -EXP_LIMIT, 0,
	        'toExpPos', 0, EXP_LIMIT,
	        'maxE', 0, EXP_LIMIT,
	        'minE', -EXP_LIMIT, 0,
	        'modulo', 0, 9
	      ];

	    for (i = 0; i < ps.length; i += 3) {
	      if ((v = obj[p = ps[i]]) !== void 0) {
	        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
	        else throw Error(invalidArgument + p + ': ' + v);
	      }
	    }

	    if (obj.hasOwnProperty(p = 'crypto')) {
	      if ((v = obj[p]) === void 0) {
	        this[p] = v;
	      } else if (v === true || v === false || v === 0 || v === 1) {
	        this[p] = !!(v && cryptoObject &&
	            (cryptoObject.getRandomValues || cryptoObject.randomBytes));
	      } else {
	        throw Error(invalidArgument + p + ': ' + v);
	      }
	    }

	    return this;
	  }


	  /*
	   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cos(x) {
	    return new this(x).cos();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function cosh(x) {
	    return new this(x).cosh();
	  }


	  /*
	   * Create and return a Decimal constructor with the same configuration properties as this Decimal
	   * constructor.
	   *
	   */
	  function clone(obj) {
	    var i, p, ps;

	    /*
	     * The Decimal constructor and exported function.
	     * Return a new Decimal instance.
	     *
	     * v {number|string|Decimal} A numeric value.
	     *
	     */
	    function Decimal(v) {
	      var e, i, t,
	        x = this;

	      // Decimal called without new.
	      if (!(x instanceof Decimal)) return new Decimal(v);

	      // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	      // which points to Object.
	      x.constructor = Decimal;

	      // Duplicate.
	      if (v instanceof Decimal) {
	        x.s = v.s;
	        x.e = v.e;
	        x.d = (v = v.d) ? v.slice() : v;
	        return;
	      }

	      t = typeof v;

	      if (t === 'number') {
	        if (v === 0) {
	          x.s = 1 / v < 0 ? -1 : 1;
	          x.e = 0;
	          x.d = [0];
	          return;
	        }

	        if (v < 0) {
	          v = -v;
	          x.s = -1;
	        } else {
	          x.s = 1;
	        }

	        // Fast path for small integers.
	        if (v === ~~v && v < 1e7) {
	          for (e = 0, i = v; i >= 10; i /= 10) e++;
	          x.e = e;
	          x.d = [v];
	          return;

	        // Infinity, NaN.
	        } else if (v * 0 !== 0) {
	          if (!v) x.s = NaN;
	          x.e = NaN;
	          x.d = null;
	          return;
	        }

	        return parseDecimal(x, v.toString());

	      } else if (t !== 'string') {
	        throw Error(invalidArgument + v);
	      }

	      // Minus sign?
	      if (v.charCodeAt(0) === 45) {
	        v = v.slice(1);
	        x.s = -1;
	      } else {
	        x.s = 1;
	      }

	      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
	    }

	    Decimal.prototype = P;

	    Decimal.ROUND_UP = 0;
	    Decimal.ROUND_DOWN = 1;
	    Decimal.ROUND_CEIL = 2;
	    Decimal.ROUND_FLOOR = 3;
	    Decimal.ROUND_HALF_UP = 4;
	    Decimal.ROUND_HALF_DOWN = 5;
	    Decimal.ROUND_HALF_EVEN = 6;
	    Decimal.ROUND_HALF_CEIL = 7;
	    Decimal.ROUND_HALF_FLOOR = 8;
	    Decimal.EUCLID = 9;

	    Decimal.config = config;
	    Decimal.clone = clone;

	    Decimal.abs = abs;
	    Decimal.acos = acos;
	    Decimal.acosh = acosh;        // ES6
	    Decimal.add = add;
	    Decimal.asin = asin;
	    Decimal.asinh = asinh;        // ES6
	    Decimal.atan = atan;
	    Decimal.atanh = atanh;        // ES6
	    Decimal.atan2 = atan2;
	    Decimal.cbrt = cbrt;          // ES6
	    Decimal.ceil = ceil;
	    Decimal.cos = cos;
	    Decimal.cosh = cosh;          // ES6
	    Decimal.div = div;
	    Decimal.exp = exp;
	    Decimal.floor = floor;
	    Decimal.fromJSON = fromJSON;
	    Decimal.hypot = hypot;        // ES6
	    Decimal.ln = ln;
	    Decimal.log = log;
	    Decimal.log10 = log10;        // ES6
	    Decimal.log2 = log2;          // ES6
	    Decimal.max = max;
	    Decimal.min = min;
	    Decimal.mod = mod;
	    Decimal.mul = mul;
	    Decimal.pow = pow;
	    Decimal.random = random;
	    Decimal.round = round;
	    Decimal.sign = sign;          // ES6
	    Decimal.sin = sin;
	    Decimal.sinh = sinh;          // ES6
	    Decimal.sqrt = sqrt;
	    Decimal.sub = sub;
	    Decimal.tan = tan;
	    Decimal.tanh = tanh;          // ES6
	    Decimal.trunc = trunc;        // ES6

	    if (obj === void 0) obj = {};
	    if (obj) {
	      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
	      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	    }

	    Decimal.config(obj);

	    return Decimal;
	  }


	  /*
	   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function div(x, y) {
	    return new this(x).div(y);
	  }


	  /*
	   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The power to which to raise the base of the natural log.
	   *
	   */
	  function exp(x) {
	    return new this(x).exp();
	  }


	  /*
	   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function floor(x) {
	    return finalise(x = new this(x), x.e + 1, 3);
	  }


	  /*
	   * Return a new Decimal from `str`, a string value created by `toJSON`.
	   *
	   * Base 88 alphabet:
	   * 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~
	   *
	   * If `str` is just one character:
	   * 0-81  [[0, 40][-0, -40]]
	   * 82    -Infinity
	   * 83    +Infinity
	   * 84    NaN
	   *
	   *   64 32 16  8  4  2  1
	   *    1  0  1  0  1  1  1 = 87
	   *
	   */
	  function fromJSON(str) {
	    var e, isNeg, k, n;

	    if (typeof str !== 'string' || !str) throw Error(invalidArgument + str);
	    k = str.length;
	    n = NUMERALS.indexOf(str.charAt(0));

	    //  [0, 81] -> [[0, 40][-0, -40]]
	    if (k === 1) {
	      return new this(n > 81 ? [-1 / 0, 1 / 0, 0 / 0][n - 82] : n > 40 ? -(n - 41) : n);
	    } else if (n & 64) {
	      isNeg = n & 16;

	      // e = isNeg ? [-3, 4] : [-7, 8]
	      e = isNeg ? (n & 7) - 3 : (n & 15) - 7;
	      k = 1;
	    } else if (k === 2) {
	      n = n * 88 + NUMERALS.indexOf(str.charAt(1));

	      // [0, 5631] -> [[0, 2815][-0, -2815]] -> [[41, 2856][-41, -2856]]
	      return new this(n >= 2816 ? -(n - 2816) - 41 : n + 41);
	    } else {

	      // 0XXXXXX
	      // 0 {is negative} {is exponent negative} {exponent digit count [0, 15]}
	      isNeg = n & 32;

	      // Has an exponent been specified?
	      if (n & 31) {
	        e = n & 15;    // Exponent character count [1, 15]
	        k = e + 1;     // Index of first character of the significand.

	        if (e === 1)  {
	          e = NUMERALS.indexOf(str.charAt(1));
	        } else if (e === 2) {
	          e = NUMERALS.indexOf(str.charAt(1)) * 88 +
	            NUMERALS.indexOf(str.charAt(2));
	        } else {
	          e = +convertBase(str.slice(1, k), 88, 10).join('');
	        }

	        // Negative exponent?
	        if (n & 16) e = -e;
	      } else {

	        // Integer without trailing zeros.
	        // 0X00000
	        // 0 {is negative} 0 0 0 0 0
	        str = convertBase(str.slice(1), 88, 10).join('');
	        return new this(isNeg ? '-' + str : str);
	      }
	    }

	    str = convertBase(str.slice(k), 88, 10).join('');
	    e = e - str.length + 1;
	    str = str + 'e' + e;

	    return new this(isNeg ? '-' + str : str);
	  }


	  /*
	   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
	   * rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
	   *
	   */
	  function hypot() {
	    var i, n,
	      t = new this(0);

	    external = false;

	    for (i = 0; i < arguments.length;) {
	      n = new this(arguments[i++]);
	      if (!n.d) {
	        if (n.s) {
	          external = true;
	          return new this(1 / 0);
	        }
	        t = n;
	      } else if (t.d) {
	        t = t.plus(n.times(n));
	      }
	    }

	    external = true;

	    return t.sqrt();
	  }


	  /*
	   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function ln(x) {
	    return new this(x).ln();
	  }


	  /*
	   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
	   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
	   *
	   * log[y](x)
	   *
	   * x {number|string|Decimal} The argument of the logarithm.
	   * y {number|string|Decimal} The base of the logarithm.
	   *
	   */
	  function log(x, y) {
	    return new this(x).log(y);
	  }


	  /*
	   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log2(x) {
	    return new this(x).log(2);
	  }


	  /*
	   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function log10(x) {
	    return new this(x).log(10);
	  }


	  /*
	   * Return a new Decimal whose value is the maximum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function max() {
	    return maxOrMin(this, arguments, 'lt');
	  }


	  /*
	   * Return a new Decimal whose value is the minimum of the arguments.
	   *
	   * arguments {number|string|Decimal}
	   *
	   */
	  function min() {
	    return maxOrMin(this, arguments, 'gt');
	  }


	  /*
	   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mod(x, y) {
	    return new this(x).mod(y);
	  }


	  /*
	   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function mul(x, y) {
	    return new this(x).mul(y);
	  }


	  /*
	   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} The base.
	   * y {number|string|Decimal} The exponent.
	   *
	   */
	  function pow(x, y) {
	    return new this(x).pow(y);
	  }


	  /*
	   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
	   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
	   * are produced).
	   *
	   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
	   *
	   */
	  function random(sd) {
	    var d, e, k, n,
	      i = 0,
	      r = new this(1),
	      rd = [];

	    if (sd === void 0) sd = this.precision;
	    else checkInt32(sd, 1, MAX_DIGITS);

	    k = Math.ceil(sd / LOG_BASE);

	    if (this.crypto === false) {
	      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

	    // Browsers supporting crypto.getRandomValues.
	    } else if (cryptoObject && cryptoObject.getRandomValues) {
	      d = cryptoObject.getRandomValues(new Uint32Array(k));

	      for (; i < k;) {
	        n = d[i];

	        // 0 <= n < 4294967296
	        // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
	        if (n >= 4.29e9) {
	          d[i] = cryptoObject.getRandomValues(new Uint32Array(1))[0];
	        } else {

	          // 0 <= n <= 4289999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd[i++] = n % 1e7;
	        }
	      }

	    // Node.js supporting crypto.randomBytes.
	    } else if (cryptoObject && cryptoObject.randomBytes) {

	      // buffer
	      d = cryptoObject.randomBytes(k *= 4);

	      for (; i < k;) {

	        // 0 <= n < 2147483648
	        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

	        // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
	        if (n >= 2.14e9) {
	          cryptoObject.randomBytes(4).copy(d, i);
	        } else {

	          // 0 <= n <= 2139999999
	          // 0 <= (n % 1e7) <= 9999999
	          rd.push(n % 1e7);
	          i += 4;
	        }
	      }

	      i = k / 4;
	    } else if (this.crypto) {
	      throw Error(decimalError + 'crypto unavailable');
	    } else {
	      for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;
	    }

	    k = rd[--i];
	    sd %= LOG_BASE;

	    // Convert trailing digits to zeros according to sd.
	    if (k && sd) {
	      n = mathpow(10, LOG_BASE - sd);
	      rd[i] = (k / n | 0) * n;
	    }

	    // Remove trailing words which are zero.
	    for (; rd[i] === 0; i--) rd.pop();

	    // Zero?
	    if (i < 0) {
	      e = 0;
	      rd = [0];
	    } else {
	      e = -1;

	      // Remove leading words which are zero and adjust exponent accordingly.
	      for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

	      // Count the digits of the first word of rd to determine leading zeros.
	      for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

	      // Adjust the exponent for leading zeros of the first word of rd.
	      if (k < LOG_BASE) e -= LOG_BASE - k;
	    }

	    r.e = e;
	    r.d = rd;

	    return r;
	  }


	  /*
	   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
	   *
	   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function round(x) {
	    return finalise(x = new this(x), x.e + 1, this.rounding);
	  }


	  /*
	   * Return
	   *   1    if x > 0,
	   *  -1    if x < 0,
	   *   0    if x is 0,
	   *  -0    if x is -0,
	   *   NaN  otherwise
	   *
	   */
	  function sign(x) {
	    x = new this(x);
	    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
	  }


	  /*
	   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sin(x) {
	    return new this(x).sin();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function sinh(x) {
	    return new this(x).sinh();
	  }


	  /*
	   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function sqrt(x) {
	    return new this(x).sqrt();
	  }


	  /*
	   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
	   * using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal}
	   * y {number|string|Decimal}
	   *
	   */
	  function sub(x, y) {
	    return new this(x).sub(y);
	  }


	  /*
	   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
	   * digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tan(x) {
	    return new this(x).tan();
	  }


	  /*
	   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
	   * significant digits using rounding mode `rounding`.
	   *
	   * x {number|string|Decimal} A value in radians.
	   *
	   */
	  function tanh(x) {
	    return new this(x).tanh();
	  }


	  /*
	   * Return a new Decimal whose value is `x` truncated to an integer.
	   *
	   * x {number|string|Decimal}
	   *
	   */
	  function trunc(x) {
	    return finalise(x = new this(x), x.e + 1, 1);
	  }


	  // Create and configure initial Decimal constructor.
	  Decimal = clone(Decimal);

	  // Create the internal constants from their string values.
	  LN10 = new Decimal(LN10);
	  PI = new Decimal(PI);


	  // Export.


	  // AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return Decimal;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Node and other environments that support module.exports.
	  } else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Decimal;

	    if (!cryptoObject) {
	      try {
	        cryptoObject = require('cry' + 'pto');
	      } catch (e) {
	        // Ignore.
	      }
	    }

	  // Browser.
	  } else {
	    if (!globalScope) {
	      globalScope = typeof self != 'undefined' && self && self.self == self
	        ? self : Function('return this')();
	    }

	    noConflict = globalScope.Decimal;
	    Decimal.noConflict = function () {
	      globalScope.Decimal = noConflict;
	      return Decimal;
	    };

	    globalScope.Decimal = Decimal;
	  }
	})(this);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);

	function factory (type, config, load, typed) {
	  /**
	   * Create a BigNumber, which can store numbers with arbitrary precision.
	   * When a matrix is provided, all elements will be converted to BigNumber.
	   *
	   * Syntax:
	   *
	   *    math.bignumber(x)
	   *
	   * Examples:
	   *
	   *    0.1 + 0.2;                                  // returns number 0.30000000000000004
	   *    math.bignumber(0.1) + math.bignumber(0.2);  // returns BigNumber 0.3
	   *
	   *
	   *    7.2e500;                                    // returns number Infinity
	   *    math.bignumber('7.2e500');                  // returns BigNumber 7.2e500
	   *
	   * See also:
	   *
	   *    boolean, complex, index, matrix, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix | boolean | null} [value]  Value for the big number,
	   *                                                    0 by default.
	   * @returns {BigNumber} The created bignumber
	   */
	  var bignumber = typed('bignumber', {
	    '': function () {
	      return new type.BigNumber(0);
	    },

	    'number': function (x) {
	      // convert to string to prevent errors in case of >15 digits
	      return new type.BigNumber(x + '');
	    },

	    'string': function (x) {
	      return new type.BigNumber(x);
	    },

	    'BigNumber': function (x) {
	      // we assume a BigNumber is immutable
	      return x;
	    },

	    'Fraction': function (x) {
	      return new type.BigNumber(x.n).div(x.d);
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, bignumber);
	    }
	  });

	  bignumber.toTex = {
	    0: '0',
	    1: '\\left(${args[0]}\\right)'
	  };

	  return bignumber;
	}

	exports.name = 'bignumber';
	exports.factory = factory;


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Execute the callback function element wise for each element in array and any
	 * nested array
	 * Returns an array with the results
	 * @param {Array | Matrix} array
	 * @param {Function} callback   The callback is called with two parameters:
	 *                              value1 and value2, which contain the current
	 *                              element of both arrays.
	 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	 *
	 * @return {Array | Matrix} res
	 */
	module.exports = function deepMap(array, callback, skipZeros) {
	  if (array && (typeof array.map === 'function')) {
	    // TODO: replace array.map with a for loop to improve performance
	    return array.map(function (x) {
	      return deepMap(x, callback, skipZeros);
	    });
	  }
	  else {
	    return callback(array);
	  }
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);

	function factory (type, config, load, typed) {
	  /**
	   * Create a boolean or convert a string or number to a boolean.
	   * In case of a number, `true` is returned for non-zero numbers, and `false` in
	   * case of zero.
	   * Strings can be `'true'` or `'false'`, or can contain a number.
	   * When value is a matrix, all elements will be converted to boolean.
	   *
	   * Syntax:
	   *
	   *    math.boolean(x)
	   *
	   * Examples:
	   *
	   *    math.boolean(0);     // returns false
	   *    math.boolean(1);     // returns true
	   *    math.boolean(-3);     // returns true
	   *    math.boolean('true');     // returns true
	   *    math.boolean('false');     // returns false
	   *    math.boolean([1, 0, 1, 1]);     // returns [true, false, true, true]
	   *
	   * See also:
	   *
	   *    bignumber, complex, index, matrix, string, unit
	   *
	   * @param {string | number | boolean | Array | Matrix | null} value  A value of any type
	   * @return {boolean | Array | Matrix} The boolean value
	   */
	  var bool = typed('bool', {
	    '': function () {
	      return false;
	    },

	    'boolean': function (x) {
	      return x;
	    },

	    'number': function (x) {
	      return !!x;
	    },

	    'BigNumber': function (x) {
	      return !x.isZero();
	    },

	    'string': function (x) {
	      // try case insensitive
	      var lcase = x.toLowerCase();
	      if (lcase === 'true') {
	        return true;
	      }
	      else if (lcase === 'false') {
	        return false;
	      }

	      // test whether value is a valid number
	      var num = Number(x);
	      if (x != '' && !isNaN(num)) {
	        return !!num;
	      }

	      throw new Error('Cannot convert "' + x + '" to a boolean');
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, bool);
	    }
	  });

	  return bool;
	}

	exports.name = 'boolean';
	exports.factory = factory;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(22),

	  // construction function
	  __webpack_require__(25)
	];


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var format = __webpack_require__(23).format;
	var lazy = __webpack_require__(3).lazy;

	function factory (type, config, load, typed, math) {
	  /**
	   * @constructor Chain
	   * Wrap any value in a chain, allowing to perform chained operations on
	   * the value.
	   *
	   * All methods available in the math.js library can be called upon the chain,
	   * and then will be evaluated with the value itself as first argument.
	   * The chain can be closed by executing chain.done(), which will return
	   * the final value.
	   *
	   * The Chain has a number of special functions:
	   * - done()             Finalize the chained operation and return the
	   *                      chain's value.
	   * - valueOf()          The same as done()
	   * - toString()         Returns a string representation of the chain's value.
	   *
	   * @param {*} [value]
	   */
	  function Chain (value) {
	    if (!(this instanceof Chain)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    if (value && value.isChain) {
	      this.value = value.value;
	    }
	    else {
	      this.value = value;
	    }
	  }

	  /**
	   * Attach type information
	   */
	  Chain.prototype.type = 'Chain';
	  Chain.prototype.isChain = true;

	  /**
	   * Close the chain. Returns the final value.
	   * Does the same as method valueOf()
	   * @returns {*} value
	   */
	  Chain.prototype.done = function () {
	    return this.value;
	  };

	  /**
	   * Close the chain. Returns the final value.
	   * Does the same as method done()
	   * @returns {*} value
	   */
	  Chain.prototype.valueOf = function () {
	    return this.value;
	  };

	  /**
	   * Get a string representation of the value in the chain
	   * @returns {string}
	   */
	  Chain.prototype.toString = function () {
	    return format(this.value);
	  };

	  /**
	   * Create a proxy method for the chain
	   * @param {string} name
	   * @param {Function} fn      The function to be proxied
	   *                           If fn is no function, it is silently ignored.
	   * @private
	   */
	  function createProxy(name, fn) {
	    if (typeof fn === 'function') {
	      Chain.prototype[name] = chainify(fn);
	    }
	  }

	  /**
	   * Create a proxy method for the chain
	   * @param {string} name
	   * @param {function} resolver   The function resolving with the
	   *                              function to be proxied
	   * @private
	   */
	  function createLazyProxy(name, resolver) {
	    lazy(Chain.prototype, name, function outerResolver() {
	      var fn = resolver();
	      if (typeof fn === 'function') {
	        return chainify(fn);
	      }

	      return undefined; // if not a function, ignore
	    });
	  }

	  /**
	   * Make a function chainable
	   * @param {function} fn
	   * @return {Function} chain function
	   * @private
	   */
	  function chainify (fn) {
	    return function () {
	      var args = [this.value];  // `this` will be the context of a Chain instance
	      for (var i = 0; i < arguments.length; i++) {
	        args[i + 1] = arguments[i];
	      }

	      return new Chain(fn.apply(fn, args));
	    }
	  }

	  /**
	   * Create a proxy for a single method, or an object with multiple methods.
	   * Example usage:
	   *
	   *   Chain.createProxy('add', function add (x, y) {...});
	   *   Chain.createProxy({
	   *     add:      function add (x, y) {...},
	   *     subtract: function subtract (x, y) {...}
	   *   }
	   *
	   * @param {string | Object} arg0   A name (string), or an object with
	   *                                 functions
	   * @param {*} [arg1]               A function, when arg0 is a name
	   */
	  Chain.createProxy = function (arg0, arg1) {
	    if (typeof arg0 === 'string') {
	      // createProxy(name, value)
	      createProxy(arg0, arg1);
	    }
	    else {
	      // createProxy(values)
	      for (var prop in arg0) {
	        if (arg0.hasOwnProperty(prop)) {
	          createProxy(prop, arg0[prop]);
	        }
	      }
	    }
	  };

	  // create proxy for everything that is in math.js
	  Chain.createProxy(math);

	  // register on the import event, automatically add a proxy for every imported function.
	  math.on('import', function (name, resolver, path) {
	    if (path === undefined) {
	      // an imported function (not a data type or something special)
	      createLazyProxy(name, resolver);
	    }
	  });

	  return Chain;
	}

	exports.name = 'Chain';
	exports.path = 'type';
	exports.factory = factory;
	exports.math = true;  // require providing the math namespace as 5th argument
	exports.lazy = false; // we need to register a listener on the import events, so no lazy loading


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var formatNumber = __webpack_require__(6).format;
	var formatBigNumber = __webpack_require__(24).format;

	/**
	 * Test whether value is a string
	 * @param {*} value
	 * @return {boolean} isString
	 */
	exports.isString = function(value) {
	  return typeof value === 'string';
	};

	/**
	 * Check if a text ends with a certain string.
	 * @param {string} text
	 * @param {string} search
	 */
	exports.endsWith = function(text, search) {
	  var start = text.length - search.length;
	  var end = text.length;
	  return (text.substring(start, end) === search);
	};

	/**
	 * Format a value of any type into a string.
	 *
	 * Usage:
	 *     math.format(value)
	 *     math.format(value, precision)
	 *
	 * When value is a function:
	 *
	 * - When the function has a property `syntax`, it returns this
	 *   syntax description.
	 * - In other cases, a string `'function'` is returned.
	 *
	 * When `value` is an Object:
	 *
	 * - When the object contains a property `format` being a function, this
	 *   function is invoked as `value.format(options)` and the result is returned.
	 * - When the object has its own `toString` method, this method is invoked
	 *   and the result is returned.
	 * - In other cases the function will loop over all object properties and
	 *   return JSON object notation like '{"a": 2, "b": 3}'.
	 *
	 * Example usage:
	 *     math.format(2/7);                // '0.2857142857142857'
	 *     math.format(math.pi, 3);         // '3.14'
	 *     math.format(new Complex(2, 3));  // '2 + 3i'
	 *     math.format('hello');            // '"hello"'
	 *
	 * @param {*} value             Value to be stringified
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {string} str
	 */
	exports.format = function(value, options) {
	  if (typeof value === 'number') {
	    return formatNumber(value, options);
	  }

	  if (value && value.isBigNumber === true) {
	    return formatBigNumber(value, options);
	  }

	  if (value && value.isFraction === true) {
	    if (!options || options.fraction !== 'decimal') {
	      // output as ratio, like '1/3'
	      return (value.s * value.n) + '/' + value.d;
	    }
	    else {
	      // output as decimal, like '0.(3)'
	      return value.toString();
	    }
	  }

	  if (Array.isArray(value)) {
	    return formatArray(value, options);
	  }

	  if (exports.isString(value)) {
	    return '"' + value + '"';
	  }

	  if (typeof value === 'function') {
	    return value.syntax ? String(value.syntax) : 'function';
	  }

	  if (value && typeof value === 'object') {
	    if (typeof value.format === 'function') {
	      return value.format(options);
	    }
	    else if (value && value.toString() !== {}.toString()) {
	      // this object has a non-native toString method, use that one
	      return value.toString();
	    }
	    else {
	      var entries = [];

	      for (var key in value) {
	        if (value.hasOwnProperty(key)) {
	          entries.push('"' + key + '": ' + exports.format(value[key], options));
	        }
	      }

	      return '{' + entries.join(', ') + '}';
	    }
	  }

	  return String(value);
	};

	/**
	 * Recursively format an n-dimensional matrix
	 * Example output: "[[1, 2], [3, 4]]"
	 * @param {Array} array
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {string} str
	 */
	function formatArray (array, options) {
	  if (Array.isArray(array)) {
	    var str = '[';
	    var len = array.length;
	    for (var i = 0; i < len; i++) {
	      if (i != 0) {
	        str += ', ';
	      }
	      str += formatArray(array[i], options);
	    }
	    str += ']';
	    return str;
	  }
	  else {
	    return exports.format(array, options);
	  }
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Convert a BigNumber to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lower` and `upper` bounds, and uses
	 *                                          exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential' and
	 *                                          'auto', `precision` defines the total
	 *                                          number of significant digits returned
	 *                                          and is undefined by default.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point, and is 0 by default.
	 *                     {Object} exponential An object containing two parameters,
	 *                                          {number} lower and {number} upper,
	 *                                          used by notation 'auto' to determine
	 *                                          when to return exponential notation.
	 *                                          Default values are `lower=1e-3` and
	 *                                          `upper=1e5`.
	 *                                          Only applicable for notation `auto`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4);                                        // '6.4'
	 *    format(1240000);                                    // '1.24e6'
	 *    format(1/3);                                        // '0.3333333333333333'
	 *    format(1/3, 3);                                     // '0.333'
	 *    format(21385, 2);                                   // '21000'
	 *    format(12.071, {notation: 'fixed'});                // '12'
	 *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
	 *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
	 *
	 * @param {BigNumber} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */
	exports.format = function (value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  }

	  // handle special cases
	  if (!value.isFinite()) {
	    return value.isNaN() ? 'NaN' : (value.gt(0) ? 'Infinity' : '-Infinity');
	  }

	  // default values for options
	  var notation = 'auto';
	  var precision = undefined;

	  if (options !== undefined) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    }

	    // determine precision from options
	    if (typeof options === 'number') {
	      precision = options;
	    }
	    else if (options.precision) {
	      precision = options.precision;
	    }
	  }

	  // handle the various notations
	  switch (notation) {
	    case 'fixed':
	      return exports.toFixed(value, precision);

	    case 'exponential':
	      return exports.toExponential(value, precision);

	    case 'auto':
	      // determine lower and upper bound for exponential notation.
	      // TODO: implement support for upper and lower to be BigNumbers themselves
	      var lower = 1e-3;
	      var upper = 1e5;
	      if (options && options.exponential) {
	        if (options.exponential.lower !== undefined) {
	          lower = options.exponential.lower;
	        }
	        if (options.exponential.upper !== undefined) {
	          upper = options.exponential.upper;
	        }
	      }

	      // adjust the configuration of the BigNumber constructor (yeah, this is quite tricky...)
	      var oldConfig = {
	        toExpNeg: value.constructor.toExpNeg,
	        toExpPos: value.constructor.toExpPos
	      };

	      value.constructor.config({
	        toExpNeg: Math.round(Math.log(lower) / Math.LN10),
	        toExpPos: Math.round(Math.log(upper) / Math.LN10)
	      });

	      // handle special case zero
	      if (value.isZero()) return '0';

	      // determine whether or not to output exponential notation
	      var str;
	      var abs = value.abs();
	      if (abs.gte(lower) && abs.lt(upper)) {
	        // normal number notation
	        str = value.toSignificantDigits(precision).toFixed();
	      }
	      else {
	        // exponential notation
	        str = exports.toExponential(value, precision);
	      }

	      // remove trailing zeros after the decimal point
	      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
	        var digits = arguments[2];
	        var e = arguments[4];
	        return (digits !== '.') ? digits + e : e;
	      });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' +
	          'Choose "auto", "exponential", or "fixed".');
	  }
	};

	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {BigNumber} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */
	exports.toExponential = function (value, precision) {
	  if (precision !== undefined) {
	    return value.toExponential(precision - 1); // Note the offset of one
	  }
	  else {
	    return value.toExponential();
	  }
	};

	/**
	 * Format a number with fixed notation.
	 * @param {BigNumber} value
	 * @param {number} [precision=0]        Optional number of decimals after the
	 *                                      decimal point. Zero by default.
	 */
	exports.toFixed = function (value, precision) {
	  return value.toFixed(precision || 0);
	  // Note: the (precision || 0) is needed as the toFixed of BigNumber has an
	  // undefined default precision instead of 0.
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {
	  /**
	   * Wrap any value in a chain, allowing to perform chained operations on
	   * the value.
	   *
	   * All methods available in the math.js library can be called upon the chain,
	   * and then will be evaluated with the value itself as first argument.
	   * The chain can be closed by executing `chain.done()`, which returns
	   * the final value.
	   *
	   * The chain has a number of special functions:
	   *
	   * - `done()`     Finalize the chain and return the chain's value.
	   * - `valueOf()`  The same as `done()`
	   * - `toString()` Executes `math.format()` onto the chain's value, returning
	   *                a string representation of the value.
	   *
	   * Syntax:
	   *
	   *    math.chain(value)
	   *
	   * Examples:
	   *
	   *     math.chain(3)
	   *         .add(4)
	   *         .subtract(2)
	   *         .done();     // 5
	   *
	   *     math.chain( [[1, 2], [3, 4]] )
	   *         .subset(math.index(0, 0), 8)
	   *         .multiply(3)
	   *         .done();     // [[24, 6], [9, 12]]
	   *
	   * @param {*} [value]   A value of any type on which to start a chained operation.
	   * @return {math.type.Chain} The created chain
	   */
	  return typed('chain', {
	    '': function() {
	      return new type.Chain();
	    },

	    'any': function(value) {
	      return new type.Chain(value);
	    }
	  });
	}

	exports.name = 'chain';
	exports.factory = factory;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(27),

	  // construction function
	  __webpack_require__(31)
	];


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Complex = __webpack_require__(28);
	var format = __webpack_require__(6).format;
	var isNumber = __webpack_require__(6).isNumber;

	function factory (type, config, load, typed, math) {

	  /**
	   * Attach type information
	   */
	  Complex.prototype.type = 'Complex';
	  Complex.prototype.isComplex = true;


	  /**
	   * Get a JSON representation of the complex number
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Complex", "re": 2, "im": 3}`
	   */
	  Complex.prototype.toJSON = function () {
	    return {
	      mathjs: 'Complex',
	      re: this.re,
	      im: this.im
	    };
	  };

	  /*
	   * Return the value of the complex number in polar notation
	   * The angle phi will be set in the interval of [-pi, pi].
	   * @return {{r: number, phi: number}} Returns and object with properties r and phi.
	   */
	  Complex.prototype.toPolar = function () {
	    return {
	      r: this.abs(),
	      phi: this.arg()
	    };
	  };

	  /**
	   * Get a string representation of the complex number,
	   * with optional formatting options.
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @return {string} str
	   */
	  Complex.prototype.format = function (options) {
	    var str = '';
	    var im = this.im;
	    var re = this.re;
	    var strRe = format(this.re, options);
	    var strIm = format(this.im, options);

	    // round either re or im when smaller than the configured precision
	    var precision = isNumber(options) ? options : options ? options.precision : null;
	    if (precision !== null) {
	      var epsilon = Math.pow(10, -precision);
	      if (Math.abs(re / im) < epsilon) {
	        re = 0;
	      }
	      if (Math.abs(im / re) < epsilon) {
	        im = 0;
	      }
	    }

	    if (im == 0) {
	      // real value
	      str = strRe;
	    } else if (re == 0) {
	      // purely complex value
	      if (im == 1) {
	        str = 'i';
	      } else if (im == -1) {
	        str = '-i';
	      } else {
	        str = strIm + 'i';
	      }
	    } else {
	      // complex value
	      if (im > 0) {
	        if (im == 1) {
	          str = strRe + ' + i';
	        } else {
	          str = strRe + ' + ' + strIm + 'i';
	        }
	      } else {
	        if (im == -1) {
	          str = strRe + ' - i';
	        } else {
	          str = strRe + ' - ' + strIm.substring(1) + 'i';
	        }
	      }
	    }
	    return str;
	  };

	  /**
	   * Create a complex number from polar coordinates
	   *
	   * Usage:
	   *
	   *     Complex.fromPolar(r: number, phi: number) : Complex
	   *     Complex.fromPolar({r: number, phi: number}) : Complex
	   *
	   * @param {*} args...
	   * @return {Complex}
	   */
	  Complex.fromPolar = function (args) {
	    switch (arguments.length) {
	      case 1:
	        var arg = arguments[0];
	        if (typeof arg === 'object') {
	          return Complex(arg);
	        }
	        throw new TypeError('Input has to be an object with r and phi keys.');

	      case 2:
	        var r = arguments[0],
	            phi = arguments[1];
	        if (isNumber(r)) {
	          if (phi && phi.isUnit && phi.hasBase('ANGLE')) {
	            // convert unit to a number in radians
	            phi = phi.toNumber('rad');
	          }

	          if (isNumber(phi)) {
	            return new Complex({r: r, phi: phi});
	          }

	          throw new TypeError('Phi is not a number nor an angle unit.');
	        } else {
	          throw new TypeError('Radius r is not a number.');
	        }

	      default:
	        throw new SyntaxError('Wrong number of arguments in function fromPolar');
	    }
	  };


	  Complex.prototype.valueOf = Complex.prototype.toString;

	  /**
	   * Create a Complex number from a JSON object
	   * @param {Object} json  A JSON Object structured as
	   *                       {"mathjs": "Complex", "re": 2, "im": 3}
	   *                       All properties are optional, default values
	   *                       for `re` and `im` are 0.
	   * @return {Complex} Returns a new Complex number
	   */
	  Complex.fromJSON = function (json) {
	    return new Complex(json);
	  };

	  // apply the current epsilon
	  Complex.EPSILON = config.epsilon;

	  // listen for changed in the configuration, automatically apply changed epsilon
	  math.on('config', function (curr, prev) {
	    if (curr.epsilon !== prev.epsilon) {
	      Complex.EPSILON = curr.epsilon;
	    }
	  });

	  return Complex;
	}

	exports.name = 'Complex';
	exports.path = 'type';
	exports.factory = factory;
	exports.math = true; // request access to the math namespace


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * @license Complex.js v2.0.1 11/02/2016
	 *
	 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/

	/**
	 *
	 * This class allows the manipilation of complex numbers.
	 * You can pass a complex number in different formats. Either as object, double, string or two integer parameters.
	 *
	 * Object form
	 * { re: <real>, im: <imaginary> }
	 * { arg: <angle>, abs: <radius> }
	 * { phi: <angle>, r: <radius> }
	 *
	 * Double form
	 * 99.3 - Single double value
	 *
	 * String form
	 * "23.1337" - Simple real number
	 * "15+3i" - a simple complex number
	 * "3-i" - a simple complex number
	 *
	 * Example:
	 *
	 * var c = new Complex("99.3+8i");
	 * c.mul({r: 3, i: 9}).div(4.9).sub(3, 2);
	 *
	 */

	(function(root) {

	  "use strict";

	  var P = {'re': 0, 'im': 0};

	  Math.cosh = Math.cosh || function(x) {
	    return (Math.exp(x) + Math.exp(-x)) * 0.5;
	  };

	  Math.sinh = Math.sinh || function(x) {
	    return (Math.exp(x) - Math.exp(-x)) * 0.5;
	  };

	  var parser_exit = function() {
	    throw SyntaxError("Invalid Param");
	  };

	  /**
	   * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
	   *
	   * @param {number} a
	   * @param {number} b
	   * @returns {number}
	   */
	  function logHypot(a, b) {

	    var _a = Math.abs(a);
	    var _b = Math.abs(b);

	    if (a === 0) {
	      return Math.log(_b);
	    }

	    if (b === 0) {
	      return Math.log(_a);
	    }

	    if (_a < 3000 && _b < 3000) {
	      return Math.log(a * a + b * b) * 0.5;
	    }

	    /* I got 4 ideas to compute this property without overflow:
	     *
	     * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
	     *
	     * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

	     Math.log(a * a + b * b) / 2

	     *
	     *
	     * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

	     var fn = function(a, b) {
	     a = Math.abs(a);
	     b = Math.abs(b);
	     var t = Math.min(a, b);
	     a = Math.max(a, b);
	     t = t / a;

	     return Math.log(a) + Math.log(1 + t * t) / 2;
	     };

	     * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

	     Math.log(a / Math.cos(Math.atan2(b, a)))

	     * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

	     Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

	     */

	    return Math.log(a / Math.cos(Math.atan2(b, a)));
	  }

	  var parse = function(a, b) {

	    if (a === undefined || a === null) {
	      P["re"] =
	      P["im"] = 0;
	    } else if (b !== undefined) {
	      P["re"] = a;
	      P["im"] = b;
	    } else switch (typeof a) {

	      case "object":

	        if ("im" in a && "re" in a) {
	          P["re"] = a["re"];
	          P["im"] = a["im"];
	        } else if ("abs" in a && "arg" in a) {
	          P["re"] = a["abs"] * Math.cos(a["arg"]);
	          P["im"] = a["abs"] * Math.sin(a["arg"]);
	        } else if ("r" in a && "phi" in a) {
	          P["re"] = a["r"] * Math.cos(a["phi"]);
	          P["im"] = a["r"] * Math.sin(a["phi"]);
	        } else {
	          parser_exit();
	        }
	        break;

	      case "string":

	        P["im"] = /* void */
	        P["re"] = 0;

	        var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
	        var plus = 1;
	        var minus = 0;

	        if (tokens === null) {
	          parser_exit();
	        }

	        for (var i = 0; i < tokens.length; i++) {

	          var c = tokens[i];

	          if (c === ' ' || c === '\t' || c === '\n') {
	            /* void */
	          } else if (c === '+') {
	            plus++;
	          } else if (c === '-') {
	            minus++;
	          } else if (c === 'i' || c === 'I') {

	            if (plus + minus === 0) {
	              parser_exit();
	            }

	            if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
	              P["im"]+= parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
	              i++;
	            } else {
	              P["im"]+= parseFloat((minus % 2 ? "-" : "") + "1");
	            }
	            plus = minus = 0;

	          } else {

	            if (plus + minus === 0 || isNaN(c)) {
	              parser_exit();
	            }

	            if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
	              P["im"]+= parseFloat((minus % 2 ? "-" : "") + c);
	              i++;
	            } else {
	              P["re"]+= parseFloat((minus % 2 ? "-" : "") + c);
	            }
	            plus = minus = 0;
	          }
	        }

	        // Still something on the stack
	        if (plus + minus > 0) {
	          parser_exit();
	        }
	        break;

	      case "number":
	        P["im"] = 0;
	        P["re"] = a;
	        break;

	      default:
	        parser_exit();
	    }

	    if (isNaN(P["re"]) || isNaN(P["im"])) {
	      // If a calculation is NaN, we treat it as NaN and don't throw
	      //parser_exit();
	    }
	  };

	  /**
	   * @constructor
	   * @returns {Complex}
	   */
	  function Complex(a, b) {

	    if (!(this instanceof Complex)) {
	      return new Complex(a, b);
	    }

	    parse(a, b); // mutates P

	    this["re"] = P["re"];
	    this["im"] = P["im"];
	  }

	  Complex.prototype = {

	    "re": 0,
	    "im": 0,

	    /**
	     * Calculates the sign of a complex number
	     *
	     * @returns {Complex}
	     */
	    "sign": function() {

	      var abs = this["abs"]();

	      return new Complex(
	              this["re"] / abs,
	              this["im"] / abs);
	    },

	    /**
	     * Adds two complex numbers
	     *
	     * @returns {Complex}
	     */
	    "add": function(a, b) {

	      parse(a, b); // mutates P

	      return new Complex(
	              this["re"] + P["re"],
	              this["im"] + P["im"]);
	    },

	    /**
	     * Subtracts two complex numbers
	     *
	     * @returns {Complex}
	     */
	    "sub": function(a, b) {

	      parse(a, b); // mutates P

	      return new Complex(
	              this["re"] - P["re"],
	              this["im"] - P["im"]);
	    },

	    /**
	     * Multiplies two complex numbers
	     *
	     * @returns {Complex}
	     */
	    "mul": function(a, b) {

	      parse(a, b); // mutates P

	      // Besides the addition/subtraction, this helps having a solution for rational Infinity
	      if (P['im'] === 0 && this['im'] === 0) {
	        return new Complex(this['re'] * P['re'], 0);
	      }

	      return new Complex(
	              this["re"] * P["re"] - this["im"] * P["im"],
	              this["re"] * P["im"] + this["im"] * P["re"]);
	    },

	    /**
	     * Divides two complex numbers
	     *
	     * @returns {Complex}
	     */
	    "div": function(a, b) {

	      parse(a, b); // mutates P

	      a = this["re"];
	      b = this["im"];

	      var c = P["re"];
	      var d = P["im"];
	      var t, x;

	      // Divisor is zero
	      if (0 === c && 0 === d) {
	        return new Complex(
	                (a !== 0) ? (a / 0) : 0,
	                (b !== 0) ? (b / 0) : 0);
	      }

	      // Divisor is rational
	      if (0 === d) {
	        return new Complex(a / c, b / c);
	      }

	      if (Math.abs(c) < Math.abs(d)) {

	        x = c / d;
	        t = c * x + d;

	        return new Complex(
	                (a * x + b) / t,
	                (b * x - a) / t);

	      } else {

	        x = d / c;
	        t = d * x + c;

	        return new Complex(
	                (a + b * x) / t,
	                (b - a * x) / t);
	      }
	    },

	    /**
	     * Calculate the power of two complex numbers
	     *
	     * @returns {Complex}
	     */
	    "pow": function(a, b) {

	      parse(a, b); // mutates P

	      a = this["re"];
	      b = this["im"];

	      if (a === 0 && b === 0) {
	        return new Complex(0, 0);
	      }

	      var arg = Math.atan2(b, a);
	      var loh = logHypot(a, b);

	      if (P["im"] === 0) {

	        if (b === 0 && a >= 0) {

	          return new Complex(Math.pow(a, P["re"]), 0);

	        } else if (a === 0) {

	          switch (P["re"] % 4) {
	            case 0:
	              return new Complex(Math.pow(b, P["re"]), 0);
	            case 1:
	              return new Complex(0, Math.pow(b, P["re"]));
	            case 2:
	              return new Complex(-Math.pow(b, P["re"]), 0);
	            case 3:
	              return new Complex(0, -Math.pow(b, P["re"]));
	          }
	        }
	      }

	      /* I couldn"t find a good formula, so here is a derivation and optimization
	       *
	       * z_1^z_2 = (a + bi)^(c + di)
	       *         = exp((c + di) * log(a + bi)
	       *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
	       * =>...
	       * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
	       * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
	       *
	       * =>...
	       * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
	       * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
	       *
	       * =>
	       * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
	       * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
	       *
	       */

	      a = Math.exp(P["re"] * loh - P["im"] * arg);
	      b = P["im"] * loh + P["re"] * arg;
	      return new Complex(
	              a * Math.cos(b),
	              a * Math.sin(b));
	    },

	    /**
	     * Calculate the complex square root
	     *
	     * @returns {Complex}
	     */
	    "sqrt": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var r = this["abs"]();

	      var re, im;

	      if (a >= 0 && b === 0) {
	        return new Complex(Math.sqrt(a), 0);
	      }

	      if (a >= 0) {
	        re = 0.5 * Math.sqrt(2.0 * (r + a));
	      } else {
	        re = Math.abs(b) / Math.sqrt(2 * (r - a));
	      }

	      if (a <= 0) {
	        im = 0.5 * Math.sqrt(2.0 * (r - a));
	      } else {
	        im = Math.abs(b) / Math.sqrt(2 * (r + a));
	      }

	      return new Complex(re, b >= 0 ? im : -im);
	    },

	    /**
	     * Calculate the complex exponent
	     *
	     * @returns {Complex}
	     */
	    "exp": function() {

	      var tmp = Math.exp(this["re"]);

	      if (this["im"] === 0) {
	        //return new Complex(tmp, 0);
	      }
	      return new Complex(
	              tmp * Math.cos(this["im"]),
	              tmp * Math.sin(this["im"]));
	    },

	    /**
	     * Calculate the natural log
	     *
	     * @returns {Complex}
	     */
	    "log": function() {

	      var a = this["re"];
	      var b = this["im"];
	      
	      if (b === 0 && a > 0) {
	        //return new Complex(Math.log(a), 0);
	      }

	      return new Complex(
	              logHypot(a, b),
	              Math.atan2(b, a));
	    },

	    /**
	     * Calculate the magniture of the complex number
	     *
	     * @returns {number}
	     */
	    "abs": function() {

	      var a = Math.abs(this["re"]);
	      var b = Math.abs(this["im"]);

	      if (a < 3000 && b < 3000) {
	        return Math.sqrt(a * a + b * b);
	      }

	      if (a < b) {
	        a = b;
	        b = this["re"] / this["im"];
	      } else {
	        b = this["im"] / this["re"];
	      }
	      return a * Math.sqrt(1 + b * b);
	    },

	    /**
	     * Calculate the angle of the complex number
	     *
	     * @returns {number}
	     */
	    "arg": function() {

	      return Math.atan2(this["im"], this["re"]);
	    },

	    /**
	     * Calculate the sine of the complex number
	     *
	     * @returns {Complex}
	     */
	    "sin": function() {

	      var a = this["re"];
	      var b = this["im"];

	      return new Complex(
	              Math.sin(a) * Math.cosh(b),
	              Math.cos(a) * Math.sinh(b));
	    },

	    /**
	     * Calculate the cosine
	     *
	     * @returns {Complex}
	     */
	    "cos": function() {

	      var a = this["re"];
	      var b = this["im"];

	      return new Complex(
	              Math.cos(a) * Math.cosh(b),
	             -Math.sin(a) * Math.sinh(b));
	    },

	    /**
	     * Calculate the tangent
	     *
	     * @returns {Complex}
	     */
	    "tan": function() {

	      var a = 2 * this["re"];
	      var b = 2 * this["im"];
	      var d = Math.cos(a) + Math.cosh(b);

	      return new Complex(
	              Math.sin(a) / d,
	              Math.sinh(b) / d);
	    },

	    /**
	     * Calculate the cotangent
	     *
	     * @returns {Complex}
	     */
	    "cot": function() {

	      var a = 2 * this["re"];
	      var b = 2 * this["im"];
	      var d = Math.cos(a) - Math.cosh(b);

	      return new Complex(
	             -Math.sin(a) / d,
	              Math.sinh(b) / d);
	    },

	    /**
	     * Calculate the secant
	     *
	     * @returns {Complex}
	     */
	    "sec": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var d = 0.5 * Math.cosh(2 * b) + 0.5 * Math.cos(2 * a);

	      return new Complex(
	              Math.cos(a) * Math.cosh(b) / d,
	              Math.sin(a) * Math.sinh(b) / d);
	    },

	    /**
	     * Calculate the cosecans
	     *
	     * @returns {Complex}
	     */
	    "csc": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);

	      return new Complex(
	              Math.sin(a) * Math.cosh(b) / d,
	             -Math.cos(a) * Math.sinh(b) / d);
	    },

	    /**
	     * Calculate the complex arcus sinus
	     *
	     * @returns {Complex}
	     */
	    "asin": function() {

	      var a = this["re"];
	      var b = this["im"];

	      var t1 = new Complex(
	               b * b - a * a + 1,
	              -2 * a * b)['sqrt']();

	      var t2 = new Complex(
	              t1['re'] - b,
	              t1['im'] + a)['log']();

	      return new Complex(t2['im'], -t2['re']);
	    },

	    /**
	     * Calculate the complex arcus cosinus
	     *
	     * @returns {Complex}
	     */
	    "acos": function() {

	      var a = this["re"];
	      var b = this["im"];

	      var t1 = new Complex(
	               b * b - a * a + 1,
	              -2 * a * b)['sqrt']();

	      var t2 = new Complex(
	              t1["re"] - b,
	              t1["im"] + a)['log']();

	      return new Complex(Math.PI / 2 - t2["im"], t2["re"]);
	    },

	    /**
	     * Calculate the complex arcus tangent
	     *
	     * @returns {Complex}
	     */
	    "atan": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (a === 0) {

	        if (b === 1) {
	          return new Complex(0, Infinity);
	        }

	        if (b === -1) {
	          return new Complex(0, -Infinity);
	        }
	      }

	      var d = a * a + (1.0 - b) * (1.0 - b);

	      var t1 = new Complex(
	              (1 - b * b - a * a) / d,
	              -2 * a / d).log();

	      return new Complex(-0.5 * t1["im"], 0.5 * t1["re"]);
	    },

	    /**
	     * Calculate the complex arcus cotangent
	     *
	     * @returns {Complex}
	     */
	    "acot": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (b === 0) {
	        return new Complex(Math.atan2(1, a), 0);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                     -b / d).atan()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).atan();
	    },

	    /**
	     * Calculate the complex arcus secant
	     *
	     * @returns {Complex}
	     */
	    "asec": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (a === 0 && b === 0) {
	        return new Complex(0, Infinity);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).acos()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).acos();
	    },

	    /**
	     * Calculate the complex arcus cosecans
	     *
	     * @returns {Complex}
	     */
	    "acsc": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (a === 0 && b === 0) {
	        return new Complex(Math.PI / 2, Infinity);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                     -b / d).asin()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).asin();
	    },

	    /**
	     * Calculate the complex sinh
	     *
	     * @returns {Complex}
	     */
	    "sinh": function() {

	      var a = this["re"];
	      var b = this["im"];

	      return new Complex(
	              Math.sinh(a) * Math.cos(b),
	              Math.cosh(a) * Math.sin(b));
	    },

	    /**
	     * Calculate the complex cosh
	     *
	     * @returns {Complex}
	     */
	    "cosh": function() {

	      var a = this["re"];
	      var b = this["im"];

	      return new Complex(
	              Math.cosh(a) * Math.cos(b),
	              Math.sinh(a) * Math.sin(b));
	    },

	    /**
	     * Calculate the complex tanh
	     *
	     * @returns {Complex}
	     */
	    "tanh": function() {

	      var a = 2 * this["re"];
	      var b = 2 * this["im"];
	      var d = Math.cosh(a) + Math.cos(b);

	      return new Complex(
	              Math.sinh(a) / d,
	              Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex coth
	     *
	     * @returns {Complex}
	     */
	    "coth": function() {

	      var a = 2 * this["re"];
	      var b = 2 * this["im"];
	      var d = Math.cosh(a) - Math.cos(b);

	      return new Complex(
	              Math.sinh(a) / d,
	             -Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex coth
	     *
	     * @returns {Complex}
	     */
	    "csch": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var d = Math.cos(2 * b) - Math.cosh(2 * a);

	      return new Complex(
	           -2 * Math.sinh(a) * Math.cos(b) / d, 
	            2 * Math.cosh(a) * Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex sech
	     *
	     * @returns {Complex}
	     */
	    "sech": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var d = Math.cos(2 * b) + Math.cosh(2 * a);

	      return new Complex(
	              2 * Math.cosh(a) * Math.cos(b) / d, 
	             -2 * Math.sinh(a) * Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex asinh
	     *
	     * @returns {Complex}
	     */
	    "asinh": function() {

	      var tmp = this["im"];
	      this["im"] = -this["re"];
	      this["re"] = tmp;
	      var res = this["asin"]();

	      this["re"] = -this["im"];
	      this["im"] = tmp;
	      tmp = res["re"];

	      res["re"] = -res["im"];
	      res["im"] = tmp;
	      return res;
	    },

	    /**
	     * Calculate the complex asinh
	     *
	     * @returns {Complex}
	     */
	    "acosh": function() {

	      var tmp;
	      var res = this["acos"]();
	      if (res["im"] <= 0) {
	        tmp = res["re"];
	        res["re"] = -res["im"];
	        res["im"] = tmp;
	      } else {
	        tmp = res["im"];
	        res["im"] = -res["re"];
	        res["re"] = tmp;
	      }
	      return res;
	    },

	    /**
	     * Calculate the complex atanh
	     *
	     * @returns {Complex}
	     */
	    "atanh": function() {

	      var a = this["re"];
	      var b = this["im"];

	      var noIM = a > 1 && b === 0;
	      var oneMinus = 1 - a;
	      var onePlus = 1 + a;
	      var d = oneMinus * oneMinus + b * b;

	      var x = (d !== 0)
	              ? new Complex(
	                      (onePlus * oneMinus - b * b) / d,
	                      (b * oneMinus + onePlus * b) / d)
	              : new Complex(
	                      (a !== -1) ? (a / 0) : 0,
	                      (b !== 0) ? (b / 0) : 0);

	      var temp = x["re"];
	      x["re"] = logHypot(x["re"], x["im"]) / 2;
	      x["im"] = Math.atan2(x["im"], temp) / 2;
	      if (noIM) {
	        x["im"] = -x["im"];
	      }
	      return x;
	    },

	    /**
	     * Calculate the complex acoth
	     *
	     * @returns {Complex}
	     */
	    "acoth": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (a === 0 && b === 0) {

	        return new Complex(0, Math.PI / 2);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                     -b / d).atanh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).atanh();
	    },

	    /**
	     * Calculate the complex acsch
	     *
	     * @returns {Complex}
	     */
	    "acsch": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (b === 0) {

	        return new Complex(
	                (a !== 0)
	                ? Math.log(a + Math.sqrt(a * a + 1))
	                : Infinity, 0);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).asinh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).asinh();
	    },

	    /**
	     * Calculate the complex asech
	     *
	     * @returns {Complex}
	     */
	    "asech": function() {

	      var a = this["re"];
	      var b = this["im"];

	      if (a === 0 && b === 0) {
	        return new Complex(Infinity, 0);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                     -b / d).acosh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ?-b / 0 : 0).acosh();
	    },

	    /**
	     * Calculate the complex inverse 1/z
	     *
	     * @returns {Complex}
	     */
	    "inverse": function() {

	      var a = this["re"];
	      var b = this["im"];

	      var d = a * a + b * b;

	      return new Complex(
	              a !== 0 ? a / d : 0,
	              b !== 0 ?-b / d : 0);
	    },

	    /**
	     * Returns the complex conjugate
	     *
	     * @returns {Complex}
	     */
	    "conjugate": function() {

	      return new Complex(this["re"], -this["im"]);
	    },

	    /**
	     * Gets the negated complex number
	     *
	     * @returns {Complex}
	     */
	    "neg": function() {

	      return new Complex(-this["re"], -this["im"]);
	    },

	    /**
	     * Ceils the actual complex number
	     *
	     * @returns {Complex}
	     */
	    "ceil": function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.ceil(this["re"] * places) / places,
	              Math.ceil(this["im"] * places) / places);
	    },

	    /**
	     * Floors the actual complex number
	     *
	     * @returns {Complex}
	     */
	    "floor": function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.floor(this["re"] * places) / places,
	              Math.floor(this["im"] * places) / places);
	    },

	    /**
	     * Ceils the actual complex number
	     *
	     * @returns {Complex}
	     */
	    "round": function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.round(this["re"] * places) / places,
	              Math.round(this["im"] * places) / places);
	    },

	    /**
	     * Compares two complex numbers
	     *
	     * @returns {boolean}
	     */
	    "equals": function(a, b) {

	      parse(a, b); // mutates P

	      return Math.abs(P["re"] - this["re"]) <= Complex["EPSILON"] &&
	             Math.abs(P["im"] - this["im"]) <= Complex["EPSILON"];
	    },

	    /**
	     * Clones the actual object
	     *
	     * @returns {Complex}
	     */
	    "clone": function() {

	      return new Complex(this["re"], this["im"]);
	    },

	    /**
	     * Gets a string of the actual complex number
	     *
	     * @returns {string}
	     */
	    "toString": function() {

	      var a = this["re"];
	      var b = this["im"];
	      var ret = "";

	      if (isNaN(a) || isNaN(b)) {
	        return "NaN";
	      }

	      if (a !== 0) {
	        ret+= a;
	      }

	      if (b !== 0) {

	        if (a !== 0) {
	          ret+= b < 0 ? " - " : " + ";
	        } else if (b < 0) {
	          ret+= "-";
	        }

	        b = Math.abs(b);

	        if (1 !== b) {
	          ret+= b;
	        }
	        ret+= "i";
	      }

	      if (!ret)
	        return "0";

	      return ret;
	    },

	    /**
	     * Returns the actual number as a vector
	     *
	     * @returns {Array}
	     */
	    "toVector": function() {

	      return [this["re"], this["im"]];
	    },

	    /**
	     * Returns the actual real value of the current object
	     *
	     * @returns {number|null}
	     */
	    "valueOf": function() {

	      if (this["im"] === 0) {
	        return this["re"];
	      }
	      return null;
	    },

	    /**
	     * Checks if the given complex number is not a number
	     *
	     * @returns {boolean}
	     */
	    isNaN: function() {
	      return isNaN(this['re']) || isNaN(this['im']);
	    }
	  };

	  Complex["ZERO"] = new Complex(0, 0);
	  Complex["ONE"] = new Complex(1, 0);
	  Complex["I"] = new Complex(0, 1);
	  Complex["PI"] = new Complex(Math.PI, 0);
	  Complex["E"] = new Complex(Math.E, 0);
	  Complex['EPSILON'] = 1e-16;

	  if ("function" === "function" && __webpack_require__(30)["amd"]) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Complex;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (true) {
	    module["exports"] = Complex;
	  } else {
	    root["Complex"] = Complex;
	  }
	  
	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);

	function factory (type, config, load, typed) {
	  var latex = __webpack_require__(32);

	  /**
	   * Create a complex value or convert a value to a complex value.
	   *
	   * Syntax:
	   *
	   *     math.complex()                           // creates a complex value with zero
	   *                                              // as real and imaginary part.
	   *     math.complex(re : number, im : string)   // creates a complex value with provided
	   *                                              // values for real and imaginary part.
	   *     math.complex(re : number)                // creates a complex value with provided
	   *                                              // real value and zero imaginary part.
	   *     math.complex(complex : Complex)          // clones the provided complex value.
	   *     math.complex(arg : string)               // parses a string into a complex value.
	   *     math.complex(array : Array)              // converts the elements of the array
	   *                                              // or matrix element wise into a
	   *                                              // complex value.
	   *     math.complex({re: number, im: number})   // creates a complex value with provided
	   *                                              // values for real an imaginary part.
	   *     math.complex({r: number, phi: number})   // creates a complex value with provided
	   *                                              // polar coordinates
	   *
	   * Examples:
	   *
	   *    var a = math.complex(3, -4);     // a = Complex 3 - 4i
	   *    a.re = 5;                        // a = Complex 5 - 4i
	   *    var i = a.im;                    // Number -4;
	   *    var b = math.complex('2 + 6i');  // Complex 2 + 6i
	   *    var c = math.complex();          // Complex 0 + 0i
	   *    var d = math.add(a, b);          // Complex 5 + 2i
	   *
	   * See also:
	   *
	   *    bignumber, boolean, index, matrix, number, string, unit
	   *
	   * @param {* | Array | Matrix} [args]
	   *            Arguments specifying the real and imaginary part of the complex number
	   * @return {Complex | Array | Matrix} Returns a complex value
	   */
	  var complex = typed('complex', {
	    '': function () {
	      return type.Complex.ZERO;
	    },

	    'number': function (x) {
	      return new type.Complex(x, 0);
	    },

	    'number, number': function (re, im) {
	      return new type.Complex(re, im);
	    },

	    // TODO: this signature should be redundant
	    'BigNumber, BigNumber': function (re, im) {
	      return new type.Complex(re.toNumber(), im.toNumber());
	    },

	    'Complex': function (x) {
	      return x.clone();
	    },

	    'string': function (x) {
	      return type.Complex(x); // for example '2 + 3i'
	    },

	    'Object': function (x) {
	      if('re' in x && 'im' in x) {
	        return new type.Complex(x.re, x.im);
	      }

	      if ('r' in x && 'phi' in x) {
	        return new type.Complex(x);
	      }

	      throw new Error('Expected object with either properties re and im, or properties r and phi.');
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, complex);
	    }
	  });

	  complex.toTex = {
	    0: '0',
	    1: '\\left(${args[0]}\\right)',
	    2: '\\left(\\left(${args[0]}\\right)+'
	      + latex.symbols['i'] + '\\cdot\\left(${args[1]}\\right)\\right)'
	  };

	  return complex;
	}

	exports.name = 'complex';
	exports.factory = factory;


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	exports.symbols = {
	  // GREEK LETTERS
	  Alpha: 'A',     alpha: '\\alpha',
	  Beta: 'B',      beta: '\\beta',
	  Gamma: '\\Gamma',    gamma: '\\gamma',
	  Delta: '\\Delta',    delta: '\\delta',
	  Epsilon: 'E',   epsilon: '\\epsilon',  varepsilon: '\\varepsilon',
	  Zeta: 'Z',      zeta: '\\zeta',
	  Eta: 'H',       eta: '\\eta',
	  Theta: '\\Theta',    theta: '\\theta',    vartheta: '\\vartheta',
	  Iota: 'I',      iota: '\\iota',
	  Kappa: 'K',     kappa: '\\kappa',    varkappa: '\\varkappa',
	  Lambda: '\\Lambda',   lambda: '\\lambda',
	  Mu: 'M',        mu: '\\mu',
	  Nu: 'N',        nu: '\\nu',
	  Xi: '\\Xi',       xi: '\\xi',
	  Omicron: 'O',   omicron: 'o',
	  Pi: '\\Pi',       pi: '\\pi',       varpi: '\\varpi',
	  Rho: 'P',       rho: '\\rho',      varrho: '\\varrho',
	  Sigma: '\\Sigma',    sigma: '\\sigma',    varsigma: '\\varsigma',
	  Tau: 'T',       tau: '\\tau',
	  Upsilon: '\\Upsilon',  upsilon: '\\upsilon',
	  Phi: '\\Phi',      phi: '\\phi',      varphi: '\\varphi',
	  Chi: 'X',       chi: '\\chi',
	  Psi: '\\Psi',      psi: '\\psi',
	  Omega: '\\Omega',    omega: '\\omega',
	  //logic
	  'true': '\\mathrm{True}',
	  'false': '\\mathrm{False}',
	  //other
	  i: 'i', //TODO use \i ??
	  inf: '\\infty',
	  Inf: '\\infty',
	  infinity: '\\infty',
	  Infinity: '\\infty',
	  oo: '\\infty',
	  lim: '\\lim',
	  'undefined': '\\mathbf{?}'
	};

	exports.operators = {
	  'transpose': '^\\top',
	  'factorial': '!',
	  'pow': '^',
	  'dotPow': '.^\\wedge', //TODO find ideal solution
	  'unaryPlus': '+',
	  'unaryMinus': '-',
	  'bitNot': '~', //TODO find ideal solution
	  'not': '\\neg',
	  'multiply': '\\cdot',
	  'divide': '\\frac', //TODO how to handle that properly?
	  'dotMultiply': '.\\cdot', //TODO find ideal solution
	  'dotDivide': '.:', //TODO find ideal solution
	  'mod': '\\mod',
	  'add': '+',
	  'subtract': '-',
	  'to': '\\rightarrow',
	  'leftShift': '<<',
	  'rightArithShift': '>>',
	  'rightLogShift': '>>>',
	  'equal': '=',
	  'unequal': '\\neq',
	  'smaller': '<',
	  'larger': '>',
	  'smallerEq': '\\leq',
	  'largerEq': '\\geq',
	  'bitAnd': '\\&',
	  'bitXor': '\\underline{|}',
	  'bitOr': '|',
	  'and': '\\wedge',
	  'xor': '\\veebar',
	  'or': '\\vee'
	};

	exports.defaultTemplate = '\\mathrm{${name}}\\left(${args}\\right)';

	var units = {
	  deg: '^\\circ'
	};

	//@param {string} name
	//@param {boolean} isUnit
	exports.toSymbol = function (name, isUnit) {
	  isUnit = typeof isUnit === 'undefined' ? false : isUnit;
	  if (isUnit) {
	    if (units.hasOwnProperty(name)) {
	      return units[name];
	    }
	    return '\\mathrm{' + name + '}';
	  }

	  if (exports.symbols.hasOwnProperty(name)) {
	    return exports.symbols[name];
	  }
	  else if (name.indexOf('_') !== -1) {
	    //symbol with index (eg. alpha_1)
	    var index = name.indexOf('_');
	    return exports.toSymbol(name.substring(0, index)) + '_{'
	      + exports.toSymbol(name.substring(index + 1)) + '}';
	  }
	  return name;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(34),

	  // construction function
	  __webpack_require__(36)
	];


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Fraction = __webpack_require__(35);

	/**
	 * Attach type information
	 */
	Fraction.prototype.type = 'Fraction';
	Fraction.prototype.isFraction = true;

	/**
	 * Get a JSON representation of a Fraction containing type information
	 * @returns {Object} Returns a JSON object structured as:
	 *                   `{"mathjs": "Fraction", "n": 3, "d": 8}`
	 */
	Fraction.prototype.toJSON = function () {
	  return {
	    mathjs: 'Fraction',
	    n: this.s * this.n,
	    d: this.d
	  };
	};

	/**
	 * Instantiate a Fraction from a JSON object
	 * @param {Object} json  a JSON object structured as:
	 *                       `{"mathjs": "Fraction", "n": 3, "d": 8}`
	 * @return {BigNumber}
	 */
	Fraction.fromJSON = function (json) {
	  return new Fraction(json);
	};


	function factory (type, config, load, typed) {
	  return Fraction;
	}

	exports.name = 'Fraction';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * @license Fraction.js v3.3.1 09/09/2015
	 * http://www.xarg.org/2014/03/precise-calculations-in-javascript/
	 *
	 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/


	/**
	 *
	 * This class offers the possibility to calculate fractions.
	 * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
	 *
	 * Array/Object form
	 * [ 0 => <nominator>, 1 => <denominator> ]
	 * [ n => <nominator>, d => <denominator> ]
	 *
	 * Integer form
	 * - Single integer value
	 *
	 * Double form
	 * - Single double value
	 *
	 * String form
	 * 123.456 - a simple double
	 * 123/456 - a string fraction
	 * 123.'456' - a double with repeating decimal places
	 * 123.(456) - synonym
	 * 123.45'6' - a double with repeating last place
	 * 123.45(6) - synonym
	 *
	 * Example:
	 *
	 * var f = new Fraction("9.4'31'");
	 * f.mul([-4, 3]).div(4.9);
	 *
	 */

	(function(root) {

	  "use strict";

	  // Maximum search depth for cyclic rational numbers. 2000 should be more than enough. 
	  // Example: 1/7 = 0.(142857) has 6 repeating decimal places.
	  // If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits
	  var MAX_CYCLE_LEN = 2000;

	  // Parsed data to avoid calling "new" all the time
	  var P = {
	    "s": 1,
	    "n": 0,
	    "d": 1
	  };

	  function assign(n, s) {

	    if (isNaN(n = parseInt(n, 10))) {
	      throwInvalidParam();
	    }
	    return n * s;
	  }

	  function throwInvalidParam() {
	    throw "Invalid Param";
	  }

	  var parse = function(p1, p2) {

	    var n = 0, d = 1, s = 1;
	    var v = 0, w = 0, x = 0, y = 1, z = 1;

	    var A = 0, B = 1;
	    var C = 1, D = 1;

	    var N = 10000000;
	    var M;

	    if (p1 === undefined || p1 === null) {
	      /* void */
	    } else if (p2 !== undefined) {
	      n = p1;
	      d = p2;
	      s = n * d;
	    } else
	      switch (typeof p1) {

	        case "object":
	        {
	          if ("d" in p1 && "n" in p1) {
	            n = p1["n"];
	            d = p1["d"];
	            if ("s" in p1)
	              n*= p1["s"];
	          } else if (0 in p1) {
	            n = p1[0];
	            if (1 in p1)
	              d = p1[1];
	          } else {
	            throwInvalidParam();
	          }
	          s = n * d;
	          break;
	        }
	        case "number":
	        {
	          if (p1 < 0) {
	            s = p1;
	            p1 = -p1;
	          }

	          if (p1 % 1 === 0) {
	            n = p1;
	          } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow

	            if (p1 >= 1) {
	              z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
	              p1/= z;
	            }

	            // Using Farey Sequences
	            // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

	            while (B <= N && D <= N) {
	              M = (A + C) / (B + D);

	              if (p1 === M) {
	                if (B + D <= N) {
	                  n = A + C;
	                  d = B + D;
	                } else if (D > B) {
	                  n = C;
	                  d = D;
	                } else {
	                  n = A;
	                  d = B;
	                }
	                break;

	              } else {

	                if (p1 > M) {
	                  A+= C;
	                  B+= D;
	                } else {
	                  C+= A;
	                  D+= B;
	                }

	                if (B > N) {
	                  n = C;
	                  d = D;
	                } else {
	                  n = A;
	                  d = B;
	                }
	              }
	            }
	            n*= z;
	          } else if (isNaN(p1) || isNaN(p2)) {
	            d = n = NaN;
	          }
	          break;
	        }
	        case "string":
	        {
	          B = p1.match(/\d+|./g);

	          if (B[A] === '-') {// Check for minus sign at the beginning
	            s = -1;
	            A++;
	          } else if (B[A] === '+') {// Check for plus sign at the beginning
	            A++;
	          }

	          if (B.length === A + 1) { // Check if it's just a simple number "1234"
	            w = assign(B[A++], s);
	          } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number

	            if (B[A] !== '.') { // Handle 0.5 and .5
	              v = assign(B[A++], s);
	            }
	            A++;

	            // Check for decimal places
	            if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
	              w = assign(B[A], s);
	              y = Math.pow(10, B[A].length);
	              A++;
	            }

	            // Check for repeating places
	            if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
	              x = assign(B[A + 1], s);
	              z = Math.pow(10, B[A + 1].length) - 1;
	              A+= 3;
	            }

	          } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
	            w = assign(B[A], s);
	            y = assign(B[A + 2], 1);
	            A+= 3;
	          } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"
	            v = assign(B[A], s);
	            w = assign(B[A + 2], s);
	            y = assign(B[A + 4], 1);
	            A+= 5;
	          }

	          if (B.length <= A) { // Check for more tokens on the stack
	            d = y * z;
	            s = /* void */
	                    n = x + d * v + z * w;
	            break;
	          }

	          /* Fall through on error */
	        }
	        default:
	          throwInvalidParam();
	      }

	    if (d === 0) {
	      throw "DIV/0";
	    }

	    P["s"] = s < 0 ? -1 : 1;
	    P["n"] = Math.abs(n);
	    P["d"] = Math.abs(d);
	  };

	  var modpow = function(b, e, m) {

	    for (var r = 1; e > 0; b = (b * b) % m, e >>= 1) {

	      if (e & 1) {
	        r = (r * b) % m;
	      }
	    }
	    return r;
	  };

	  var cycleLen = function(n, d) {

	    for (; d % 2 === 0;
	            d/= 2) {}

	    for (; d % 5 === 0;
	            d/= 5) {}

	    if (d === 1) // Catch non-cyclic numbers
	      return 0;

	    // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
	    // 10^(d-1) % d == 1
	    // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone, 
	    // as we want to translate the numbers to strings.

	    var rem = 10 % d;

	    for (var t = 1; rem !== 1; t++) {
	      rem = rem * 10 % d;

	      if (t > MAX_CYCLE_LEN)
	        return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
	    }
	    return t;
	  };

	  var cycleStart = function(n, d, len) {

	    var rem1 = 1;
	    var rem2 = modpow(10, len, d);

	    for (var t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)
	      // Solve 10^s == 10^(s+t) (mod d)

	      if (rem1 === rem2)
	        return t;

	      rem1 = rem1 * 10 % d;
	      rem2 = rem2 * 10 % d;
	    }
	    return 0;
	  };

	  var gcd = function(a, b) {

	    if (!a) return b;
	    if (!b) return a;

	    while (1) {
	      a%= b;
	      if (!a) return b;
	      b%= a;
	      if (!b) return a;
	    }
	  };

	  /**
	   * Module constructor
	   *
	   * @constructor
	   * @param {number|Fraction} a
	   * @param {number=} b
	   */
	  function Fraction(a, b) {

	    if (!(this instanceof Fraction)) {
	      return new Fraction(a, b);
	    }

	    parse(a, b);

	    if (Fraction['REDUCE']) {
	      a = gcd(P["d"], P["n"]); // Abuse a
	    } else {
	      a = 1;
	    }

	    this["s"] = P["s"];
	    this["n"] = P["n"] / a;
	    this["d"] = P["d"] / a;
	  }

	  /**
	   * Boolean global variable to be able to disable automatic reduction of the fraction
	   *
	   */
	  Fraction['REDUCE'] = 1;

	  Fraction.prototype = {

	    "s": 1,
	    "n": 0,
	    "d": 1,

	    /**
	     * Calculates the absolute value
	     *
	     * Ex: new Fraction(-4).abs() => 4
	     **/
	    "abs": function() {

	      return new Fraction(this["n"], this["d"]);
	    },

	    /**
	     * Inverts the sign of the current fraction
	     *
	     * Ex: new Fraction(-4).neg() => 4
	     **/
	    "neg": function() {

	      return new Fraction(-this["s"] * this["n"], this["d"]);
	    },

	    /**
	     * Adds two rational numbers
	     *
	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
	     **/
	    "add": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Subtracts two rational numbers
	     *
	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
	     **/
	    "sub": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Multiplies two rational numbers
	     *
	     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
	     **/
	    "mul": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * P["s"] * this["n"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Divides two rational numbers
	     *
	     * Ex: new Fraction("-17.(345)").inverse().div(3)
	     **/
	    "div": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * P["s"] * this["n"] * P["d"],
	              this["d"] * P["n"]
	              );
	    },

	    /**
	     * Clones the actual object
	     *
	     * Ex: new Fraction("-17.(345)").clone()
	     **/
	    "clone": function() {
	      return new Fraction(this);
	    },

	    /**
	     * Calculates the modulo of two rational numbers - a more precise fmod
	     *
	     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
	     **/
	    "mod": function(a, b) {

	      if (isNaN(this['n']) || isNaN(this['d'])) {
	        return new Fraction(NaN);
	      }

	      if (a === undefined) {
	        return new Fraction(this["s"] * this["n"] % this["d"], 1);
	      }

	      parse(a, b);
	      if (0 === P["n"] && 0 === this["d"]) {
	        Fraction(0, 0); // Throw div/0
	      }

	      /*
	       * First silly attempt, kinda slow
	       *
	       return that["sub"]({
	       "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
	       "d": num["d"],
	       "s": this["s"]
	       });*/

	      /*
	       * New attempt: a1 / b1 = a2 / b2 * q + r
	       * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
	       * => (b2 * a1 % a2 * b1) / (b1 * b2)
	       */
	      return new Fraction(
	              (this["s"] * P["d"] * this["n"]) % (P["n"] * this["d"]),
	              P["d"] * this["d"]
	              );
	    },

	    /**
	     * Calculates the fractional gcd of two rational numbers
	     *
	     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
	     */
	    "gcd": function(a, b) {

	      parse(a, b);

	      // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

	      return new Fraction(gcd(P["n"], this["n"]), P["d"] * this["d"] / gcd(P["d"], this["d"]));
	    },

	    /**
	     * Calculates the fractional lcm of two rational numbers
	     *
	     * Ex: new Fraction(5,8).lcm(3,7) => 15
	     */
	    "lcm": function(a, b) {

	      parse(a, b);

	      // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

	      if (P["n"] === 0 && this["n"] === 0) {
	        return new Fraction;
	      }
	      return new Fraction(P["n"] * this["n"] / gcd(P["n"], this["n"]), gcd(P["d"], this["d"]));
	    },

	    /**
	     * Calculates the ceil of a rational number
	     *
	     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
	     **/
	    "ceil": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Calculates the floor of a rational number
	     *
	     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
	     **/
	    "floor": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Rounds a rational numbers
	     *
	     * Ex: new Fraction('4.(3)').round() => (4 / 1)
	     **/
	    "round": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Gets the inverse of the fraction, means numerator and denumerator are exchanged
	     *
	     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
	     **/
	    "inverse": function() {

	      return new Fraction(this["s"] * this["d"], this["n"]);
	    },

	    /**
	     * Calculates the fraction to some integer exponent
	     *
	     * Ex: new Fraction(-1,2).pow(-3) => -8
	     */
	    "pow": function(m) {

	      if (m < 0) {
	        return new Fraction(Math.pow(this['s'] * this["d"],-m), Math.pow(this["n"],-m));
	      } else {
	        return new Fraction(Math.pow(this['s'] * this["n"], m), Math.pow(this["d"], m));
	      }
	    },

	    /**
	     * Check if two rational numbers are the same
	     *
	     * Ex: new Fraction(19.6).equals([98, 5]);
	     **/
	    "equals": function(a, b) {

	      parse(a, b);
	      return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0
	    },

	    /**
	     * Check if two rational numbers are the same
	     *
	     * Ex: new Fraction(19.6).equals([98, 5]);
	     **/
	    "compare": function(a, b) {

	      parse(a, b);
	      var t = (this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"]);
	      return (0 < t) - (t < 0);
	    },

	    /**
	     * Check if two rational numbers are divisible
	     *
	     * Ex: new Fraction(19.6).divisible(1.5);
	     */
	    "divisible": function(a, b) {

	      parse(a, b);
	      return !(!(P["n"] * this["d"]) || ((this["n"] * P["d"]) % (P["n"] * this["d"])));
	    },

	    /**
	     * Returns a decimal representation of the fraction
	     *
	     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
	     **/
	    'valueOf': function() {

	      return this["s"] * this["n"] / this["d"];
	    },

	    /**
	     * Returns a string-fraction representation of a Fraction object
	     *
	     * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
	     **/
	    'toFraction': function(excludeWhole) {

	      var whole, str = "";
	      var n = this["n"];
	      var d = this["d"];
	      if (this["s"] < 0) {
	        str+= '-';
	      }

	      if (d === 1) {
	        str+= n;
	      } else {

	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
	          str+= whole;
	          str+= " ";
	          n%= d;
	        }

	        str+= n;
	        str+= '/';
	        str+= d;
	      }
	      return str;
	    },

	    /**
	     * Returns a latex representation of a Fraction object
	     *
	     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
	     **/
	    'toLatex': function(excludeWhole) {

	      var whole, str = "";
	      var n = this["n"];
	      var d = this["d"];
	      if (this["s"] < 0) {
	        str+= '-';
	      }

	      if (d === 1) {
	        str+= n;
	      } else {

	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
	          str+= whole;
	          n%= d;
	        }

	        str+= "\\frac{";
	        str+= n;
	        str+= '}{';
	        str+= d;
	        str+= '}';
	      }
	      return str;
	    },

	    /**
	     * Returns an array of continued fraction elements
	     * 
	     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
	     */
	    'toContinued': function() {

	      var t;
	      var a = this['n'];
	      var b = this['d'];
	      var res = [];

	      do {
	        res.push(Math.floor(a / b));
	        t = a % b;
	        a = b;
	        b = t;
	      } while (a !== 1);

	      return res;
	    },

	    /**
	     * Creates a string representation of a fraction with all digits
	     *
	     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
	     **/
	    'toString': function() {

	      var g;
	      var N = this["n"];
	      var D = this["d"];

	      if (isNaN(N) || isNaN(D)) {
	        return "NaN";
	      }

	      if (!Fraction['REDUCE']) {
	        g = gcd(N, D);
	        N/= g;
	        D/= g;
	      }

	      var p = String(N).split(""); // Numerator chars
	      var t = 0; // Tmp var

	      var ret = [~this["s"] ? "" : "-", "", ""]; // Return array, [0] is zero sign, [1] before comma, [2] after
	      var zeros = ""; // Collection variable for zeros

	      var cycLen = cycleLen(N, D); // Cycle length
	      var cycOff = cycleStart(N, D, cycLen); // Cycle start

	      var j = -1;
	      var n = 1; // str index

	      // rough estimate to fill zeros
	      var length = 15 + cycLen + cycOff + p.length; // 15 = decimal places when no repitation

	      for (var i = 0; i < length; i++, t*= 10) {

	        if (i < p.length) {
	          t+= Number(p[i]);
	        } else {
	          n = 2;
	          j++; // Start now => after comma
	        }

	        if (cycLen > 0) { // If we have a repeating part
	          if (j === cycOff) {
	            ret[n]+= zeros + "(";
	            zeros = "";
	          } else if (j === cycLen + cycOff) {
	            ret[n]+= zeros + ")";
	            break;
	          }
	        }

	        if (t >= D) {
	          ret[n]+= zeros + ((t / D) | 0); // Flush zeros, Add current digit
	          zeros = "";
	          t = t % D;
	        } else if (n > 1) { // Add zeros to the zero buffer
	          zeros+= "0";
	        } else if (ret[n]) { // If before comma, add zero only if already something was added
	          ret[n]+= "0";
	        }
	      }

	      // If it's empty, it's a leading zero only
	      ret[0]+= ret[1] || "0";

	      // If there is something after the comma, add the comma sign
	      if (ret[2]) {
	        return ret[0] + "." + ret[2];
	      }
	      return ret[0];
	    }
	  };

	  if ("function" === "function" && __webpack_require__(30)["amd"]) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Fraction;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (true) {
	    module["exports"] = Fraction;
	  } else {
	    root['Fraction'] = Fraction;
	  }

	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)(module)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);

	function factory (type, config, load, typed) {
	  /**
	   * Create a fraction convert a value to a fraction.
	   *
	   * Syntax:
	   *     math.fraction(numerator, denominator)
	   *     math.fraction({n: numerator, d: denominator})
	   *     math.fraction(matrix: Array | Matrix)         Turn all matrix entries
	   *                                                   into fractions
	   *
	   * Examples:
	   *
	   *     math.fraction(1, 3);
	   *     math.fraction('2/3');
	   *     math.fraction({n: 2, d: 3});
	   *     math.fraction([0.2, 0.25, 1.25]);
	   *
	   * See also:
	   *
	   *    bignumber, number, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
	   *            Arguments specifying the numerator and denominator of
	   *            the fraction
	   * @return {Fraction | Array | Matrix} Returns a fraction
	   */
	  var fraction = typed('fraction', {
	    'number': function (x) {
	      if (!isFinite(x) || isNaN(x)) {
	        throw new Error(x + ' cannot be represented as a fraction');
	      }

	      return new type.Fraction(x);
	    },

	    'string': function (x) {
	      return new type.Fraction(x);
	    },

	    'number, number': function (numerator, denominator) {
	      return new type.Fraction(numerator, denominator);
	    },

	    'BigNumber': function (x) {
	      return new type.Fraction(x.toString());
	    },

	    'Fraction': function (x) {
	      return x; // fractions are immutable
	    },

	    'Object': function (x) {
	      return new type.Fraction(x);
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, fraction);
	    }
	  });

	  return fraction;
	}

	exports.name = 'fraction';
	exports.factory = factory;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // types
	  __webpack_require__(38),
	  __webpack_require__(46),
	  __webpack_require__(47),
	  __webpack_require__(50),
	  __webpack_require__(59),
	  __webpack_require__(65),
	  __webpack_require__(66),
	  __webpack_require__(67),

	  // construction functions
	  __webpack_require__(68),
	  __webpack_require__(52),
	  __webpack_require__(69)
	];


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(39);

	var string = util.string;

	var isString = string.isString;

	function factory (type, config, load, typed) {
	  /**
	   * @constructor Matrix
	   *
	   * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
	   * array. A matrix can be constructed as:
	   *     var matrix = math.matrix(data)
	   *
	   * Matrix contains the functions to resize, get and set values, get the size,
	   * clone the matrix and to convert the matrix to a vector, array, or scalar.
	   * Furthermore, one can iterate over the matrix using map and forEach.
	   * The internal Array of the Matrix can be accessed using the function valueOf.
	   *
	   * Example usage:
	   *     var matrix = math.matrix([[1, 2], [3, 4]]);
	   *     matix.size();              // [2, 2]
	   *     matrix.resize([3, 2], 5);
	   *     matrix.valueOf();          // [[1, 2], [3, 4], [5, 5]]
	   *     matrix.subset([1,2])       // 3 (indexes are zero-based)
	   *
	   */
	  function Matrix() {
	    if (!(this instanceof Matrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }
	  }

	  /**
	   * Attach type information
	   */
	  Matrix.prototype.type = 'Matrix';
	  Matrix.prototype.isMatrix = true;

	  /**
	   * Get the Matrix storage constructor for the given format.
	   *
	   * @param {string} format       The Matrix storage format.
	   *
	   * @return {Function}           The Matrix storage constructor.
	   */
	  Matrix.storage = function (format) {
	    // check storage format is a string
	    if (!isString(format)) {
	      throw new TypeError('format must be a string value');
	    }

	    // get storage format constructor
	    var constructor = Matrix._storage[format];
	    if (!constructor) {
	      throw new SyntaxError('Unsupported matrix storage format: ' + format);
	    }

	    // return storage constructor
	    return constructor;
	  };

	  // a map with all constructors for all storage types
	  Matrix._storage = {};

	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     var format = matrix.storage()                   // retrieve storage format
	   *
	   * @return {string}           The storage format.
	   */
	  Matrix.prototype.storage = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke storage on a Matrix interface');
	  };
	  
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     var format = matrix.datatype()                   // retrieve matrix datatype
	   *
	   * @return {string}           The datatype.
	   */
	  Matrix.prototype.datatype = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke datatype on a Matrix interface');
	  };

	  /**
	   * Create a new Matrix With the type of the current matrix instance
	   * @param {Array | Object} data
	   * @param {string} [datatype]
	   */
	  Matrix.prototype.create = function (data, datatype) {
	    throw new Error('Cannot invoke create on a Matrix interface');
	  };

	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     var subset = matrix.subset(index)               // retrieve subset
	   *     var value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */
	  Matrix.prototype.subset = function (index, replacement, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke subset on a Matrix interface');
	  };

	  /**
	   * Get a single element from the matrix.
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */
	  Matrix.prototype.get = function (index) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke get on a Matrix interface');
	  };

	  /**
	   * Replace a single element in the matrix.
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {Matrix} self
	   */
	  Matrix.prototype.set = function (index, value, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke set on a Matrix interface');
	  };

	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when 
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */
	  Matrix.prototype.resize = function (size, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke resize on a Matrix interface');
	  };

	  /**
	   * Create a clone of the matrix
	   * @return {Matrix} clone
	   */
	  Matrix.prototype.clone = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke clone on a Matrix interface');
	  };

	  /**
	   * Retrieve the size of the matrix.
	   * @returns {number[]} size
	   */
	  Matrix.prototype.size = function() {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke size on a Matrix interface');
	  };

	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   *
	   * @return {Matrix} matrix
	   */
	  Matrix.prototype.map = function (callback, skipZeros) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke map on a Matrix interface');
	  };

	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */
	  Matrix.prototype.forEach = function (callback) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke forEach on a Matrix interface');
	  };

	  /**
	   * Create an Array with a copy of the data of the Matrix
	   * @returns {Array} array
	   */
	  Matrix.prototype.toArray = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toArray on a Matrix interface');
	  };

	  /**
	   * Get the primitive value of the Matrix: a multidimensional array
	   * @returns {Array} array
	   */
	  Matrix.prototype.valueOf = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke valueOf on a Matrix interface');
	  };

	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */
	  Matrix.prototype.format = function (options) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke format on a Matrix interface');
	  };

	  /**
	   * Get a string representation of the matrix
	   * @returns {string} str
	   */
	  Matrix.prototype.toString = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toString on a Matrix interface');
	  };
	   
	  // exports
	  return Matrix;
	}

	exports.name = 'Matrix';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.array = __webpack_require__(40);
	exports['boolean'] = __webpack_require__(44);
	exports['function'] = __webpack_require__(45);
	exports.number = __webpack_require__(6);
	exports.object = __webpack_require__(3);
	exports.string = __webpack_require__(23);
	exports.types = __webpack_require__(41);
	exports.emitter = __webpack_require__(8);


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var number = __webpack_require__(6);
	var string = __webpack_require__(23);
	var object = __webpack_require__(3);
	var types = __webpack_require__(41);

	var DimensionError = __webpack_require__(42);
	var IndexError = __webpack_require__(43);

	/**
	 * Calculate the size of a multi dimensional array.
	 * This function checks the size of the first entry, it does not validate
	 * whether all dimensions match. (use function `validate` for that)
	 * @param {Array} x
	 * @Return {Number[]} size
	 */
	exports.size = function (x) {
	  var s = [];

	  while (Array.isArray(x)) {
	    s.push(x.length);
	    x = x[0];
	  }

	  return s;
	};

	/**
	 * Recursively validate whether each element in a multi dimensional array
	 * has a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @param {number} dim   Current dimension
	 * @throws DimensionError
	 * @private
	 */
	function _validate(array, size, dim) {
	  var i;
	  var len = array.length;

	  if (len != size[dim]) {
	    throw new DimensionError(len, size[dim]);
	  }

	  if (dim < size.length - 1) {
	    // recursively validate each child array
	    var dimNext = dim + 1;
	    for (i = 0; i < len; i++) {
	      var child = array[i];
	      if (!Array.isArray(child)) {
	        throw new DimensionError(size.length - 1, size.length, '<');
	      }
	      _validate(array[i], size, dimNext);
	    }
	  }
	  else {
	    // last dimension. none of the childs may be an array
	    for (i = 0; i < len; i++) {
	      if (Array.isArray(array[i])) {
	        throw new DimensionError(size.length + 1, size.length, '>');
	      }
	    }
	  }
	}

	/**
	 * Validate whether each element in a multi dimensional array has
	 * a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @throws DimensionError
	 */
	exports.validate = function(array, size) {
	  var isScalar = (size.length == 0);
	  if (isScalar) {
	    // scalar
	    if (Array.isArray(array)) {
	      throw new DimensionError(array.length, 0);
	    }
	  }
	  else {
	    // array
	    _validate(array, size, 0);
	  }
	};

	/**
	 * Test whether index is an integer number with index >= 0 and index < length
	 * when length is provided
	 * @param {number} index    Zero-based index
	 * @param {number} [length] Length of the array
	 */
	exports.validateIndex = function(index, length) {
	  if (!number.isNumber(index) || !number.isInteger(index)) {
	    throw new TypeError('Index must be an integer (value: ' + index + ')');
	  }
	  if (index < 0 || (typeof length === 'number' && index >= length)) {
	    throw new IndexError(index, length);
	  }
	};

	// a constant used to specify an undefined defaultValue
	exports.UNINITIALIZED = {};

	/**
	 * Resize a multi dimensional array. The resized array is returned.
	 * @param {Array} array         Array to be resized
	 * @param {Array.<number>} size Array with the size of each dimension
	 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
	 *                              zero by default. To leave new entries undefined,
	 *                              specify array.UNINITIALIZED as defaultValue
	 * @return {Array} array         The resized array
	 */
	exports.resize = function(array, size, defaultValue) {
	  // TODO: add support for scalars, having size=[] ?

	  // check the type of the arguments
	  if (!Array.isArray(array) || !Array.isArray(size)) {
	    throw new TypeError('Array expected');
	  }
	  if (size.length === 0) {
	    throw new Error('Resizing to scalar is not supported');
	  }

	  // check whether size contains positive integers
	  size.forEach(function (value) {
	    if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
	      throw new TypeError('Invalid size, must contain positive integers ' +
	          '(size: ' + string.format(size) + ')');
	    }
	  });

	  // recursively resize the array
	  var _defaultValue = (defaultValue !== undefined) ? defaultValue : 0;
	  _resize(array, size, 0, _defaultValue);

	  return array;
	};

	/**
	 * Recursively resize a multi dimensional array
	 * @param {Array} array         Array to be resized
	 * @param {number[]} size       Array with the size of each dimension
	 * @param {number} dim          Current dimension
	 * @param {*} [defaultValue]    Value to be filled in in new entries,
	 *                              undefined by default.
	 * @private
	 */
	function _resize (array, size, dim, defaultValue) {
	  var i;
	  var elem;
	  var oldLen = array.length;
	  var newLen = size[dim];
	  var minLen = Math.min(oldLen, newLen);

	  // apply new length
	  array.length = newLen;

	  if (dim < size.length - 1) {
	    // non-last dimension
	    var dimNext = dim + 1;

	    // resize existing child arrays
	    for (i = 0; i < minLen; i++) {
	      // resize child array
	      elem = array[i];
	      if (!Array.isArray(elem)) {
	        elem = [elem]; // add a dimension
	        array[i] = elem;
	      }
	      _resize(elem, size, dimNext, defaultValue);
	    }

	    // create new child arrays
	    for (i = minLen; i < newLen; i++) {
	      // get child array
	      elem = [];
	      array[i] = elem;

	      // resize new child array
	      _resize(elem, size, dimNext, defaultValue);
	    }
	  }
	  else {
	    // last dimension

	    // remove dimensions of existing values
	    for (i = 0; i < minLen; i++) {
	      while (Array.isArray(array[i])) {
	        array[i] = array[i][0];
	      }
	    }

	    if(defaultValue !== exports.UNINITIALIZED) {
	      // fill new elements with the default value
	      for (i = minLen; i < newLen; i++) {
	        array[i] = defaultValue;
	      }
	    }
	  }
	}

	/**
	 * Squeeze a multi dimensional array
	 * @param {Array} array
	 * @param {Array} [size]
	 * @returns {Array} returns the array itself
	 */
	exports.squeeze = function(array, size) {
	  var s = size || exports.size(array);

	  // squeeze outer dimensions
	  while (Array.isArray(array) && array.length === 1) {
	    array = array[0];
	    s.shift();
	  }

	  // find the first dimension to be squeezed
	  var dims = s.length;
	  while (s[dims - 1] === 1) {
	    dims--;
	  }

	  // squeeze inner dimensions
	  if (dims < s.length) {
	    array = _squeeze(array, dims, 0);
	    s.length = dims;
	  }

	  return array;
	};

	/**
	 * Recursively squeeze a multi dimensional array
	 * @param {Array} array
	 * @param {number} dims Required number of dimensions
	 * @param {number} dim  Current dimension
	 * @returns {Array | *} Returns the squeezed array
	 * @private
	 */
	function _squeeze (array, dims, dim) {
	  var i, ii;

	  if (dim < dims) {
	    var next = dim + 1;
	    for (i = 0, ii = array.length; i < ii; i++) {
	      array[i] = _squeeze(array[i], dims, next);
	    }
	  }
	  else {
	    while (Array.isArray(array)) {
	      array = array[0];
	    }
	  }

	  return array;
	}

	/**
	 * Unsqueeze a multi dimensional array: add dimensions when missing
	 * 
	 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
	 * 
	 * @param {Array} array
	 * @param {number} dims     Desired number of dimensions of the array
	 * @param {number} [outer]  Number of outer dimensions to be added
	 * @param {Array} [size]    Current size of array.
	 * @returns {Array} returns the array itself
	 * @private
	 */
	exports.unsqueeze = function(array, dims, outer, size) {
	  var s = size || exports.size(array);

	  // unsqueeze outer dimensions
	  if (outer) {
	    for (var i = 0; i < outer; i++) {
	      array = [array];
	      s.unshift(1);
	    }
	  }

	  // unsqueeze inner dimensions
	  array = _unsqueeze(array, dims, 0);
	  while (s.length < dims) {
	    s.push(1);
	  }

	  return array;
	};

	/**
	 * Recursively unsqueeze a multi dimensional array
	 * @param {Array} array
	 * @param {number} dims Required number of dimensions
	 * @param {number} dim  Current dimension
	 * @returns {Array | *} Returns the squeezed array
	 * @private
	 */
	function _unsqueeze (array, dims, dim) {
	  var i, ii;

	  if (Array.isArray(array)) {
	    var next = dim + 1;
	    for (i = 0, ii = array.length; i < ii; i++) {
	      array[i] = _unsqueeze(array[i], dims, next);
	    }
	  }
	  else {
	    for (var d = dim; d < dims; d++) {
	      array = [array];
	    }
	  }

	  return array;
	}
	/**
	 * Flatten a multi dimensional array, put all elements in a one dimensional
	 * array
	 * @param {Array} array   A multi dimensional array
	 * @return {Array}        The flattened array (1 dimensional)
	 */
	exports.flatten = function(array) {
	  if (!Array.isArray(array)) {
	    //if not an array, return as is
	    return array;
	  }
	  var flat = [];

	  array.forEach(function callback(value) {
	    if (Array.isArray(value)) {
	      value.forEach(callback);  //traverse through sub-arrays recursively
	    }
	    else {
	      flat.push(value);
	    }
	  });

	  return flat;
	};

	/**
	 * Test whether an object is an array
	 * @param {*} value
	 * @return {boolean} isArray
	 */
	exports.isArray = Array.isArray;


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determine the type of a variable
	 *
	 *     type(x)
	 *
	 * The following types are recognized:
	 *
	 *     'undefined'
	 *     'null'
	 *     'boolean'
	 *     'number'
	 *     'string'
	 *     'Array'
	 *     'Function'
	 *     'Date'
	 *     'RegExp'
	 *     'Object'
	 *
	 * @param {*} x
	 * @return {string} Returns the name of the type. Primitive types are lower case,
	 *                  non-primitive types are upper-camel-case.
	 *                  For example 'number', 'string', 'Array', 'Date'.
	 */
	exports.type = function(x) {
	  var type = typeof x;

	  if (type === 'object') {
	    if (x === null)           return 'null';
	    if (x instanceof Boolean) return 'boolean';
	    if (x instanceof Number)  return 'number';
	    if (x instanceof String)  return 'string';
	    if (Array.isArray(x))     return 'Array';
	    if (x instanceof Date)    return 'Date';
	    if (x instanceof RegExp)  return 'RegExp';

	    return 'Object';
	  }

	  if (type === 'function')    return 'Function';

	  return type;
	};

	/**
	 * Test whether a value is a scalar
	 * @param x
	 * @return {boolean} Returns true when x is a scalar, returns false when
	 *                   x is a Matrix or Array.
	 */
	exports.isScalar = function (x) {
	  return !((x && x.isMatrix) || Array.isArray(x));
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Create a range error with the message:
	 *     'Dimension mismatch (<actual size> != <expected size>)'
	 * @param {number | number[]} actual        The actual size
	 * @param {number | number[]} expected      The expected size
	 * @param {string} [relation='!=']          Optional relation between actual
	 *                                          and expected size: '!=', '<', etc.
	 * @extends RangeError
	 */
	function DimensionError(actual, expected, relation) {
	  if (!(this instanceof DimensionError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.actual   = actual;
	  this.expected = expected;
	  this.relation = relation;

	  this.message = 'Dimension mismatch (' +
	      (Array.isArray(actual) ? ('[' + actual.join(', ') + ']') : actual) +
	      ' ' + (this.relation || '!=') + ' ' +
	      (Array.isArray(expected) ? ('[' + expected.join(', ') + ']') : expected) +
	      ')';

	  this.stack = (new Error()).stack;
	}

	DimensionError.prototype = new RangeError();
	DimensionError.prototype.constructor = RangeError;
	DimensionError.prototype.name = 'DimensionError';
	DimensionError.prototype.isDimensionError = true;

	module.exports = DimensionError;


/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Create a range error with the message:
	 *     'Index out of range (index < min)'
	 *     'Index out of range (index < max)'
	 *
	 * @param {number} index     The actual index
	 * @param {number} [min=0]   Minimum index (included)
	 * @param {number} [max]     Maximum index (excluded)
	 * @extends RangeError
	 */
	function IndexError(index, min, max) {
	  if (!(this instanceof IndexError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.index = index;
	  if (arguments.length < 3) {
	    this.min = 0;
	    this.max = min;
	  }
	  else {
	    this.min = min;
	    this.max = max;
	  }

	  if (this.min !== undefined && this.index < this.min) {
	    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
	  }
	  else if (this.max !== undefined && this.index >= this.max) {
	    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
	  }
	  else {
	    this.message = 'Index out of range (' + this.index + ')';
	  }

	  this.stack = (new Error()).stack;
	}

	IndexError.prototype = new RangeError();
	IndexError.prototype.constructor = RangeError;
	IndexError.prototype.name = 'IndexError';
	IndexError.prototype.isIndexError = true;

	module.exports = IndexError;


/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Test whether value is a boolean
	 * @param {*} value
	 * @return {boolean} isBoolean
	 */
	exports.isBoolean = function(value) {
	  return typeof value == 'boolean';
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	// function utils

	/*
	 * Memoize a given function by caching the computed result.
	 * The cache of a memoized function can be cleared by deleting the `cache`
	 * property of the function.
	 *
	 * @param {function} fn                     The function to be memoized.
	 *                                          Must be a pure function.
	 * @param {function(args: Array)} [hasher]  A custom hash builder.
	 *                                          Is JSON.stringify by default.
	 * @return {function}                       Returns the memoized function
	 */
	exports.memoize = function(fn, hasher) {
	  return function memoize() {
	    if (typeof memoize.cache !== 'object') {
	      memoize.cache = {};
	    }

	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args[i] = arguments[i];
	    }

	    var hash = hasher ? hasher(args) : JSON.stringify(args);
	    if (!(hash in memoize.cache)) {
	      return memoize.cache[hash] = fn.apply(fn, args);
	    }
	    return memoize.cache[hash];
	  };
	};

	/**
	 * Find the maximum number of arguments expected by a typed function.
	 * @param {function} fn   A typed function
	 * @return {number} Returns the maximum number of expected arguments.
	 *                  Returns -1 when no signatures where found on the function.
	 */
	exports.maxArgumentCount = function (fn) {
	  return Object.keys(fn.signatures || {})
	      .reduce(function (args, signature) {
	        var count = (signature.match(/,/g) || []).length + 1;
	        return Math.max(args, count);
	      }, -1);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(39);
	var DimensionError = __webpack_require__(42);

	var string = util.string;
	var array = util.array;
	var object = util.object;
	var number = util.number;

	var isArray = Array.isArray;
	var isNumber = number.isNumber;
	var isInteger = number.isInteger;
	var isString = string.isString;

	var validateIndex = array.validateIndex;

	function factory (type, config, load, typed) {
	  var Matrix = load(__webpack_require__(38)); // force loading Matrix (do not use via type.Matrix)

	  /**
	   * Dense Matrix implementation. A regular, dense matrix, supporting multi-dimensional matrices. This is the default matrix type.
	   * @class DenseMatrix
	   */
	  function DenseMatrix(data, datatype) {
	    if (!(this instanceof DenseMatrix))
	      throw new SyntaxError('Constructor must be called with the new operator');
	    if (datatype && !isString(datatype))
	      throw new Error('Invalid datatype: ' + datatype);

	    if (data && data.isMatrix === true) {
	      // check data is a DenseMatrix
	      if (data.type === 'DenseMatrix') {
	        // clone data & size
	        this._data = object.clone(data._data);
	        this._size = object.clone(data._size);
	        this._datatype = datatype || data._datatype;
	      }
	      else {
	        // build data from existing matrix
	        this._data = data.toArray();
	        this._size = data.size();
	        this._datatype = datatype || data._datatype;
	      }
	    }
	    else if (data && isArray(data.data) && isArray(data.size)) {
	      // initialize fields from JSON representation
	      this._data = data.data;
	      this._size = data.size;
	      this._datatype = datatype || data.datatype;
	    }
	    else if (isArray(data)) {
	      // replace nested Matrices with Arrays
	      this._data = preprocess(data);
	      // get the dimensions of the array
	      this._size = array.size(this._data);
	      // verify the dimensions of the array, TODO: compute size while processing array
	      array.validate(this._data, this._size);
	      // data type unknown
	      this._datatype = datatype;
	    }
	    else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
	    }
	    else {
	      // nothing provided
	      this._data = [];
	      this._size = [0];
	      this._datatype = datatype;
	    }
	  }
	  
	  DenseMatrix.prototype = new Matrix();

	  /**
	   * Attach type information
	   */
	  DenseMatrix.prototype.type = 'DenseMatrix';
	  DenseMatrix.prototype.isDenseMatrix = true;

	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     var format = matrix.storage()                   // retrieve storage format
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The storage format.
	   */
	  DenseMatrix.prototype.storage = function () {
	    return 'dense';
	  };

	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     var format = matrix.datatype()                   // retrieve matrix datatype
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The datatype.
	   */
	  DenseMatrix.prototype.datatype = function () {
	    return this._datatype;
	  };

	  /**
	   * Create a new DenseMatrix
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {string} [datatype]
	   */
	  DenseMatrix.prototype.create = function (data, datatype) {
	    return new DenseMatrix(data, datatype);
	  };

	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     var subset = matrix.subset(index)               // retrieve subset
	   *     var value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @memberof DenseMatrix
	   * @param {Index} index
	   * @param {Array | DenseMatrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */
	  DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
	    switch (arguments.length) {
	      case 1:
	        return _get(this, index);

	        // intentional fall through
	      case 2:
	      case 3:
	        return _set(this, index, replacement, defaultValue);

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };
	  
	  /**
	   * Get a single element from the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */
	  DenseMatrix.prototype.get = function (index) {
	    if (!isArray(index))
	      throw new TypeError('Array expected');
	    if (index.length != this._size.length)
	      throw new DimensionError(index.length, this._size.length);

	    // check index
	    for (var x = 0; x < index.length; x++)
	      validateIndex(index[x], this._size[x]);

	    var data = this._data;
	    for (var i = 0, ii = index.length; i < ii; i++) {
	      var index_i = index[i];
	      validateIndex(index_i, data.length);
	      data = data[index_i];
	    }

	    return data;
	  };
	  
	  /**
	   * Replace a single element in the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {DenseMatrix} self
	   */
	  DenseMatrix.prototype.set = function (index, value, defaultValue) {
	    if (!isArray(index))
	      throw new TypeError('Array expected');
	    if (index.length < this._size.length)
	      throw new DimensionError(index.length, this._size.length, '<');

	    var i, ii, index_i;

	    // enlarge matrix when needed
	    var size = index.map(function (i) {
	      return i + 1;
	    });
	    _fit(this, size, defaultValue);

	    // traverse over the dimensions
	    var data = this._data;
	    for (i = 0, ii = index.length - 1; i < ii; i++) {
	      index_i = index[i];
	      validateIndex(index_i, data.length);
	      data = data[index_i];
	    }

	    // set new value
	    index_i = index[index.length - 1];
	    validateIndex(index_i, data.length);
	    data[index_i] = value;

	    return this;
	  };
	  
	  /**
	   * Get a submatrix of this matrix
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index   Zero-based index
	   * @private
	   */
	  function _get (matrix, index) {
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    }

	    var isScalar = index.isScalar();
	    if (isScalar) {
	      // return a scalar
	      return matrix.get(index.min());
	    }
	    else {
	      // validate dimensions
	      var size = index.size();
	      if (size.length != matrix._size.length) {
	        throw new DimensionError(size.length, matrix._size.length);
	      }

	      // validate if any of the ranges in the index is out of range
	      var min = index.min();
	      var max = index.max();
	      for (var i = 0, ii = matrix._size.length; i < ii; i++) {
	        validateIndex(min[i], matrix._size[i]);
	        validateIndex(max[i], matrix._size[i]);
	      }

	      // retrieve submatrix
	      // TODO: more efficient when creating an empty matrix and setting _data and _size manually
	      return new DenseMatrix(_getSubmatrix(matrix._data, index, size.length, 0), matrix._datatype);
	    }
	  }
	  
	  /**
	   * Recursively get a submatrix of a multi dimensional matrix.
	   * Index is not checked for correct number or length of dimensions.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim    Current dimension
	   * @return {Array} submatrix
	   * @private
	   */
	  function _getSubmatrix (data, index, dims, dim) {
	    var last = (dim == dims - 1);
	    var range = index.dimension(dim);

	    if (last) {
	      return range.map(function (i) {
	        return data[i];
	      }).valueOf();
	    }
	    else {
	      return range.map(function (i) {
	        var child = data[i];
	        return _getSubmatrix(child, index, dims, dim + 1);
	      }).valueOf();
	    }
	  }
	  
	  /**
	   * Replace a submatrix in this matrix
	   * Indexes are zero-based.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index
	   * @param {DenseMatrix | Array | *} submatrix
	   * @param {*} defaultValue          Default value, filled in on new entries when
	   *                                  the matrix is resized.
	   * @return {DenseMatrix} matrix
	   * @private
	   */
	  function _set (matrix, index, submatrix, defaultValue) {
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    }

	    // get index size and check whether the index contains a single value
	    var iSize = index.size(),
	        isScalar = index.isScalar();

	    // calculate the size of the submatrix, and convert it into an Array if needed
	    var sSize;
	    if (submatrix && submatrix.isMatrix === true) {
	      sSize = submatrix.size();
	      submatrix = submatrix.valueOf();
	    }
	    else {
	      sSize = array.size(submatrix);
	    }

	    if (isScalar) {
	      // set a scalar

	      // check whether submatrix is a scalar
	      if (sSize.length !== 0) {
	        throw new TypeError('Scalar expected');
	      }

	      matrix.set(index.min(), submatrix, defaultValue);
	    }
	    else {
	      // set a submatrix

	      // validate dimensions
	      if (iSize.length < matrix._size.length) {
	        throw new DimensionError(iSize.length, matrix._size.length, '<');
	      }

	      if (sSize.length < iSize.length) {
	        // calculate number of missing outer dimensions
	        var i = 0;
	        var outer = 0;
	        while (iSize[i] === 1 && sSize[i] === 1) {
	          i++;
	        }
	        while (iSize[i] === 1) {
	          outer++;
	          i++;
	        }

	        // unsqueeze both outer and inner dimensions
	        submatrix = array.unsqueeze(submatrix, iSize.length, outer, sSize);
	      }

	      // check whether the size of the submatrix matches the index size
	      if (!object.deepEqual(iSize, sSize)) {
	        throw new DimensionError(iSize, sSize, '>');
	      }

	      // enlarge matrix when needed
	      var size = index.max().map(function (i) {
	        return i + 1;
	      });
	      _fit(matrix, size, defaultValue);

	      // insert the sub matrix
	      var dims = iSize.length,
	          dim = 0;
	      _setSubmatrix (matrix._data, index, submatrix, dims, dim);
	    }

	    return matrix;
	  }
	  
	  /**
	   * Replace a submatrix of a multi dimensional matrix.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {Array} submatrix
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim
	   * @private
	   */
	  function _setSubmatrix (data, index, submatrix, dims, dim) {
	    var last = (dim == dims - 1),
	        range = index.dimension(dim);

	    if (last) {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);
	        data[dataIndex] = submatrix[subIndex[0]];
	      });
	    }
	    else {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);
	        _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
	      });
	    }
	  }
	  
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @memberof DenseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */
	  DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
	    // validate arguments
	    if (!isArray(size))
	      throw new TypeError('Array expected');

	    // matrix to resize
	    var m = copy ? this.clone() : this;
	    // resize matrix
	    return _resize(m, size, defaultValue);
	  };
	  
	  var _resize = function (matrix, size, defaultValue) {
	    // check size
	    if (size.length === 0) {
	      // first value in matrix
	      var v = matrix._data;
	      // go deep
	      while (isArray(v)) {
	        v = v[0];
	      }
	      return v;
	    }
	    // resize matrix
	    matrix._size = size.slice(0); // copy the array
	    matrix._data = array.resize(matrix._data, matrix._size, defaultValue);
	    // return matrix
	    return matrix;
	  };
	  
	  /**
	   * Enlarge the matrix when it is smaller than given size.
	   * If the matrix is larger or equal sized, nothing is done.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix           The matrix to be resized
	   * @param {number[]} size
	   * @param {*} defaultValue          Default value, filled in on new entries.
	   * @private
	   */
	  function _fit(matrix, size, defaultValue) {
	    var newSize = matrix._size.slice(0), // copy the array
	        changed = false;

	    // add dimensions when needed
	    while (newSize.length < size.length) {
	      newSize.push(0);
	      changed = true;
	    }

	    // enlarge size when needed
	    for (var i = 0, ii = size.length; i < ii; i++) {
	      if (size[i] > newSize[i]) {
	        newSize[i] = size[i];
	        changed = true;
	      }
	    }

	    if (changed) {
	      // resize only when size is changed
	      _resize(matrix, newSize, defaultValue);
	    }
	  }
	  
	  /**
	   * Create a clone of the matrix
	   * @memberof DenseMatrix
	   * @return {DenseMatrix} clone
	   */
	  DenseMatrix.prototype.clone = function () {
	    var m = new DenseMatrix({
	      data: object.clone(this._data),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };
	  
	  /**
	   * Retrieve the size of the matrix.
	   * @memberof DenseMatrix
	   * @returns {number[]} size
	   */
	  DenseMatrix.prototype.size = function() {
	    return this._size.slice(0); // return a clone of _size
	  };
	  
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   *
	   * @return {DenseMatrix} matrix
	   */
	  DenseMatrix.prototype.map = function (callback) {
	    // matrix instance
	    var me = this;
	    var recurse = function (value, index) {
	      if (isArray(value)) {
	        return value.map(function (child, i) {
	          return recurse(child, index.concat(i));
	        });
	      }
	      else {
	        return callback(value, index, me);
	      }
	    };
	    // return dense format
	    return new DenseMatrix({
	      data: recurse(this._data, []),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	  };
	  
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */
	  DenseMatrix.prototype.forEach = function (callback) {
	    // matrix instance
	    var me = this;
	    var recurse = function (value, index) {
	      if (isArray(value)) {
	        value.forEach(function (child, i) {
	          recurse(child, index.concat(i));
	        });
	      }
	      else {
	        callback(value, index, me);
	      }
	    };
	    recurse(this._data, []);
	  };
	  
	  /**
	   * Create an Array with a copy of the data of the DenseMatrix
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */
	  DenseMatrix.prototype.toArray = function () {
	    return object.clone(this._data);
	  };
	  
	  /**
	   * Get the primitive value of the DenseMatrix: a multidimensional array
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */
	  DenseMatrix.prototype.valueOf = function () {
	    return this._data;
	  };
	  
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @memberof DenseMatrix
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */
	  DenseMatrix.prototype.format = function (options) {
	    return string.format(this._data, options);
	  };
	  
	  /**
	   * Get a string representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {string} str
	   */
	  DenseMatrix.prototype.toString = function () {
	    return string.format(this._data);
	  };
	  
	  /**
	   * Get a JSON representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {Object}
	   */
	  DenseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'DenseMatrix',
	      data: this._data,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };
	  
	  /**
	   * Get the kth Matrix diagonal.
	   *
	   * @memberof DenseMatrix
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
	   *
	   * @returns {Array}                      The array vector with the diagonal values.
	   */
	  DenseMatrix.prototype.diagonal = function(k) {
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (k.isBigNumber === true)
	        k = k.toNumber();
	      // is must be an integer
	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError ('The parameter k must be an integer number');
	      }
	    }
	    else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0;

	    // rows & columns
	    var rows = this._size[0];
	    var columns = this._size[1];

	    // number diagonal values
	    var n = Math.min(rows - kSub, columns -  kSuper);
	    
	    // x is a matrix get diagonal from matrix
	    var data = [];
	    
	    // loop rows
	    for (var i = 0; i < n; i++) {
	      data[i] = this._data[i + kSub][i + kSuper];
	    }

	    // create DenseMatrix
	    return new DenseMatrix({
	      data: data,
	      size: [n],
	      datatype: this._datatype
	    });
	  };
	  
	  /**
	   * Create a diagonal matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {Array} size                   The matrix size.
	   * @param {number | Array} value          The values for the diagonal.
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will be filled in.
	   * @param {number} [defaultValue]        The default value for non-diagonal
	   *
	   * @returns {DenseMatrix}
	   */
	  DenseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
	    if (!isArray(size))
	      throw new TypeError('Array expected, size parameter');
	    if (size.length !== 2)
	      throw new Error('Only two dimensions matrix are supported');

	    // map size & validate
	    size = size.map(function (s) {
	      // check it is a big number
	      if (s && s.isBigNumber === true) {
	        // convert it
	        s = s.toNumber();
	      }
	      // validate arguments
	      if (!isNumber(s) || !isInteger(s) || s < 1) {
	        throw new Error('Size values must be positive integers');
	      } 
	      return s;
	    });

	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (k && k.isBigNumber === true)
	        k = k.toNumber();
	      // is must be an integer
	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError ('The parameter k must be an integer number');
	      }
	    }
	    else {
	      // default value
	      k = 0;
	    }
	    
	    if (defaultValue && isString(datatype)) {
	      // convert defaultValue to the same datatype
	      defaultValue = typed.convert(defaultValue, datatype);
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0;
	    
	    // rows and columns
	    var rows = size[0];
	    var columns = size[1];

	    // number of non-zero items
	    var n = Math.min(rows - kSub, columns -  kSuper);

	    // value extraction function
	    var _value;

	    // check value
	    if (isArray(value)) {
	      // validate array
	      if (value.length !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid value array length');
	      }
	      // define function
	      _value = function (i) {
	        // return value @ i
	        return value[i];
	      };      
	    }
	    else if (value && value.isMatrix === true) {
	      // matrix size
	      var ms = value.size();
	      // validate matrix
	      if (ms.length !== 1 || ms[0] !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid matrix length');
	      }
	      // define function
	      _value = function (i) {
	        // return value @ i
	        return value.get([i]);
	      };
	    }
	    else {
	      // define function
	      _value = function () {
	        // return value
	        return value;
	      };
	    }
	    
	    // discover default value if needed
	    if (!defaultValue) {
	      // check first value in array
	      defaultValue = (_value(0) && _value(0).isBigNumber === true) ? new type.BigNumber(0) : 0;
	    }

	    // empty array
	    var data = [];

	    // check we need to resize array
	    if (size.length > 0) {
	      // resize array
	      data = array.resize(data, size, defaultValue);
	      // fill diagonal
	      for (var d = 0; d < n; d++) {
	        data[d + kSub][d + kSuper] = _value(d);
	      }
	    }
	    
	    // create DenseMatrix
	    return new DenseMatrix({
	      data: data,
	      size: [rows, columns]
	    });
	  };

	  /**
	   * Generate a matrix from a JSON object
	   * @memberof DenseMatrix
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "DenseMatrix", data: [], size: []}`,
	   *                       where mathjs is optional
	   * @returns {DenseMatrix}
	   */
	  DenseMatrix.fromJSON = function (json) {
	    return new DenseMatrix(json);
	  };
	  
	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */
	  DenseMatrix.prototype.swapRows = function (i, j) {
	    // check index
	    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
	      throw new Error('Row index must be positive integers');
	    }
	    // check dimensions
	    if (this._size.length !== 2) {
	      throw new Error('Only two dimensional matrix is supported');
	    }
	    // validate index
	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[0]);

	    // swap rows
	    DenseMatrix._swapRows(i, j, this._data);
	    // return current instance
	    return this;
	  };

	  /**
	   * Swap rows i and j in Dense Matrix data structure.
	   *
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   */
	  DenseMatrix._swapRows = function (i, j, data) {
	    // swap values i <-> j
	    var vi = data[i];
	    data[i] = data[j];
	    data[j] = vi;
	  };
	   
	  /**
	   * Preprocess data, which can be an Array or DenseMatrix with nested Arrays and
	   * Matrices. Replaces all nested Matrices with Arrays
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @return {Array} data
	   */
	  function preprocess(data) {
	    for (var i = 0, ii = data.length; i < ii; i++) {
	      var elem = data[i];
	      if (isArray(elem)) {
	        data[i] = preprocess(elem);
	      }
	      else if (elem && elem.isMatrix === true) {
	        data[i] = preprocess(elem.valueOf());
	      }
	    }

	    return data;
	  }

	  // register this type in the base class Matrix
	  type.Matrix._storage.dense = DenseMatrix;
	  type.Matrix._storage['default'] = DenseMatrix;

	  // exports
	  return DenseMatrix;
	}

	exports.name = 'DenseMatrix';
	exports.path = 'type';
	exports.factory = factory;
	exports.lazy = false;  // no lazy loading, as we alter type.Matrix._storage

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(39);
	var DimensionError = __webpack_require__(42);

	var array = util.array;
	var object = util.object;
	var string = util.string;
	var number = util.number;

	var isArray = Array.isArray;
	var isNumber = number.isNumber;
	var isInteger = number.isInteger;
	var isString = string.isString;

	var validateIndex = array.validateIndex;

	function factory (type, config, load, typed) {
	  var Matrix = load(__webpack_require__(38)); // force loading Matrix (do not use via type.Matrix)
	  var equalScalar = load(__webpack_require__(48));

	  /**
	   * Sparse Matrix implementation. This type implements a Compressed Column Storage format
	   * for sparse matrices.
	   * @class SparseMatrix
	   */
	  function SparseMatrix(data, datatype) {
	    if (!(this instanceof SparseMatrix))
	      throw new SyntaxError('Constructor must be called with the new operator');
	    if (datatype && !isString(datatype))
	      throw new Error('Invalid datatype: ' + datatype);
	    
	    if (data && data.isMatrix === true) {
	      // create from matrix
	      _createFromMatrix(this, data, datatype);
	    }
	    else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
	      // initialize fields
	      this._values = data.values;
	      this._index = data.index;
	      this._ptr = data.ptr;
	      this._size = data.size;
	      this._datatype = datatype || data.datatype;
	    }
	    else if (isArray(data)) {
	      // create from array
	      _createFromArray(this, data, datatype);
	    }
	    else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
	    }
	    else {
	      // nothing provided
	      this._values = [];
	      this._index = [];
	      this._ptr = [0];
	      this._size = [0, 0];
	      this._datatype = datatype;
	    }
	  }
	  
	  var _createFromMatrix = function (matrix, source, datatype) {
	    // check matrix type
	    if (source.type === 'SparseMatrix') {
	      // clone arrays
	      matrix._values = source._values ? object.clone(source._values) : undefined;
	      matrix._index = object.clone(source._index);
	      matrix._ptr = object.clone(source._ptr);
	      matrix._size = object.clone(source._size);
	      matrix._datatype = datatype || source._datatype;
	    }
	    else {
	      // build from matrix data
	      _createFromArray(matrix, source.valueOf(), datatype || source._datatype);
	    }
	  };
	  
	  var _createFromArray = function (matrix, data, datatype) {
	    // initialize fields
	    matrix._values = [];
	    matrix._index = [];
	    matrix._ptr = [];
	    matrix._datatype = datatype;
	    // discover rows & columns, do not use math.size() to avoid looping array twice
	    var rows = data.length;
	    var columns = 0;
	    
	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;
	    
	    if (isString(datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, datatype);
	    }

	    // check we have rows (empty array)
	    if (rows > 0) {
	      // column index
	      var j = 0;
	      do {
	        // store pointer to values index
	        matrix._ptr.push(matrix._index.length);
	        // loop rows
	        for (var i = 0; i < rows; i++) {
	          // current row
	          var row = data[i];
	          // check row is an array
	          if (isArray(row)) {
	            // update columns if needed (only on first column)
	            if (j === 0 && columns < row.length)
	              columns = row.length;
	            // check row has column
	            if (j < row.length) {
	              // value
	              var v = row[j];
	              // check value != 0
	              if (!eq(v, zero)) {
	                // store value
	                matrix._values.push(v);
	                // index
	                matrix._index.push(i);
	              }
	            }
	          }
	          else {
	            // update columns if needed (only on first column)
	            if (j === 0 && columns < 1)
	              columns = 1;
	            // check value != 0 (row is a scalar)
	            if (!eq(row, zero)) {
	              // store value
	              matrix._values.push(row);
	              // index
	              matrix._index.push(i);
	            }
	          }
	        }
	        // increment index
	        j++;      
	      }
	      while (j < columns);
	    }
	    // store number of values in ptr
	    matrix._ptr.push(matrix._index.length);
	    // size
	    matrix._size = [rows, columns];
	  };
	  
	  SparseMatrix.prototype = new Matrix();

	  /**
	   * Attach type information
	   */
	  SparseMatrix.prototype.type = 'SparseMatrix';
	  SparseMatrix.prototype.isSparseMatrix = true;

	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     var format = matrix.storage()                   // retrieve storage format
	   *
	   * @memberof SparseMatrix
	   * @return {string}           The storage format.
	   */
	  SparseMatrix.prototype.storage = function () {
	    return 'sparse';
	  };

	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     var format = matrix.datatype()                   // retrieve matrix datatype
	   *
	   * @memberof SparseMatrix
	   * @return {string}           The datatype.
	   */
	  SparseMatrix.prototype.datatype = function () {
	    return this._datatype;
	  };

	  /**
	   * Create a new SparseMatrix
	   * @memberof SparseMatrix
	   * @param {Array} data
	   * @param {string} [datatype]
	   */
	  SparseMatrix.prototype.create = function (data, datatype) {
	    return new SparseMatrix(data, datatype);
	  };

	  /**
	   * Get the matrix density.
	   *
	   * Usage:
	   *     var density = matrix.density()                   // retrieve matrix density
	   *
	   * @memberof SparseMatrix
	   * @return {number}           The matrix density.
	   */
	  SparseMatrix.prototype.density = function () {
	    // rows & columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    // calculate density
	    return rows !== 0 && columns !== 0 ? (this._index.length / (rows * columns)) : 0;
	  };
	  
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     var subset = matrix.subset(index)               // retrieve subset
	   *     var value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @memberof SparseMatrix
	   * @param {Index} index
	   * @param {Array | Maytrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */
	  SparseMatrix.prototype.subset = function (index, replacement, defaultValue) { // check it is a pattern matrix
	    if (!this._values)
	      throw new Error('Cannot invoke subset on a Pattern only matrix');

	    // check arguments
	    switch (arguments.length) {
	      case 1:
	        return _getsubset(this, index);

	        // intentional fall through
	      case 2:
	      case 3:
	        return _setsubset(this, index, replacement, defaultValue);

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };
	  
	  var _getsubset = function (matrix, idx) {
	    // check idx
	    if (!idx || idx.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    }

	    var isScalar = idx.isScalar();
	    if (isScalar) {
	      // return a scalar
	      return matrix.get(idx.min());
	    }
	    // validate dimensions
	    var size = idx.size();
	    if (size.length != matrix._size.length) {
	      throw new DimensionError(size.length, matrix._size.length);
	    }

	    // vars
	    var i, ii, k, kk;
	    
	    // validate if any of the ranges in the index is out of range
	    var min = idx.min();
	    var max = idx.max();
	    for (i = 0, ii = matrix._size.length; i < ii; i++) {
	      validateIndex(min[i], matrix._size[i]);
	      validateIndex(max[i], matrix._size[i]);
	    }
	    
	    // matrix arrays
	    var mvalues = matrix._values;
	    var mindex = matrix._index;
	    var mptr = matrix._ptr;
	        
	    // rows & columns dimensions for result matrix
	    var rows = idx.dimension(0);
	    var columns = idx.dimension(1);
	    
	    // workspace & permutation vector
	    var w = [];
	    var pv = [];
	    
	    // loop rows in resulting matrix
	    rows.forEach(function (i, r) {
	      // update permutation vector
	      pv[i] = r[0];  
	      // mark i in workspace
	      w[i] = true;
	    });

	    // result matrix arrays
	    var values = mvalues ? [] : undefined;
	    var index = [];
	    var ptr = [];
	        
	    // loop columns in result matrix
	    columns.forEach(function (j) {
	      // update ptr
	      ptr.push(index.length);
	      // loop values in column j
	      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
	        // row
	        i = mindex[k];
	        // check row is in result matrix
	        if (w[i] === true) {
	          // push index
	          index.push(pv[i]);
	          // check we need to process values
	          if (values)
	            values.push(mvalues[k]);
	        }
	      }
	    });
	    // update ptr
	    ptr.push(index.length);
	    
	    // return matrix
	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: size,
	      datatype: matrix._datatype
	    });
	  };
	  
	  var _setsubset = function (matrix, index, submatrix, defaultValue) {
	    // check index
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    }
	    
	    // get index size and check whether the index contains a single value
	    var iSize = index.size(),
	        isScalar = index.isScalar();
	    
	    // calculate the size of the submatrix, and convert it into an Array if needed
	    var sSize;
	    if (submatrix && submatrix.isMatrix === true) {
	      // submatrix size
	      sSize = submatrix.size();
	      // use array representation
	      submatrix = submatrix.toArray();
	    }
	    else {
	      // get submatrix size (array, scalar)
	      sSize = array.size(submatrix);
	    }
	    
	    // check index is a scalar
	    if (isScalar) {
	      // verify submatrix is a scalar
	      if (sSize.length !== 0) {
	        throw new TypeError('Scalar expected');
	      }
	      // set value
	      matrix.set(index.min(), submatrix, defaultValue);
	    }
	    else {
	      // validate dimensions, index size must be one or two dimensions
	      if (iSize.length !== 1 && iSize.length !== 2) {
	        throw new DimensionError(iSize.length, matrix._size.length, '<');
	      }
	      
	      // check submatrix and index have the same dimensions
	      if (sSize.length < iSize.length) {
	        // calculate number of missing outer dimensions
	        var i = 0;
	        var outer = 0;
	        while (iSize[i] === 1 && sSize[i] === 1) {
	          i++;
	        }
	        while (iSize[i] === 1) {
	          outer++;
	          i++;
	        }
	        // unsqueeze both outer and inner dimensions
	        submatrix = array.unsqueeze(submatrix, iSize.length, outer, sSize);
	      }
	      
	      // check whether the size of the submatrix matches the index size
	      if (!object.deepEqual(iSize, sSize)) {
	        throw new DimensionError(iSize, sSize, '>');
	      }
	      
	      // offsets
	      var x0 = index.min()[0];
	      var y0 = index.min()[1];      
	      
	      // submatrix rows and columns
	      var m = sSize[0];
	      var n = sSize[1];

	      // loop submatrix
	      for (var x = 0; x < m; x++) {
	        // loop columns
	        for (var y = 0; y < n; y++) {
	          // value at i, j
	          var v = submatrix[x][y];
	          // invoke set (zero value will remove entry from matrix)
	          matrix.set([x + x0, y + y0], v, defaultValue);
	        }
	      }
	    }
	    return matrix;
	  };

	  /**
	   * Get a single element from the matrix.
	   * @memberof SparseMatrix
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */
	  SparseMatrix.prototype.get = function (index) {
	    if (!isArray(index))
	      throw new TypeError('Array expected');
	    if (index.length != this._size.length)
	      throw new DimensionError(index.length, this._size.length);

	    // check it is a pattern matrix
	    if (!this._values)
	      throw new Error('Cannot invoke get on a Pattern only matrix');

	    // row and column
	    var i = index[0];
	    var j = index[1];

	    // check i, j are valid
	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[1]);

	    // find value index
	    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
	    // check k is prior to next column k and it is in the correct row
	    if (k < this._ptr[j + 1] && this._index[k] === i)
	      return this._values[k];

	    return 0;
	  };
	  
	  /**
	   * Replace a single element in the matrix.
	   * @memberof SparseMatrix
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be set to zero.
	   * @return {SparseMatrix} self
	   */
	  SparseMatrix.prototype.set = function (index, v, defaultValue) {
	    if (!isArray(index))
	      throw new TypeError('Array expected');
	    if (index.length != this._size.length)
	      throw new DimensionError(index.length, this._size.length);

	    // check it is a pattern matrix
	    if (!this._values)
	      throw new Error('Cannot invoke set on a Pattern only matrix');
	      
	    // row and column
	    var i = index[0];
	    var j = index[1];

	    // rows & columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    
	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;

	    if (isString(this._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [this._datatype, this._datatype]) || equalScalar;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, this._datatype);
	    }

	    // check we need to resize matrix
	    if (i > rows - 1 || j > columns - 1) {
	      // resize matrix
	      _resize(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
	      // update rows & columns
	      rows = this._size[0];
	      columns = this._size[1];
	    }

	    // check i, j are valid
	    validateIndex(i, rows);
	    validateIndex(j, columns);

	    // find value index
	    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
	    // check k is prior to next column k and it is in the correct row
	    if (k < this._ptr[j + 1] && this._index[k] === i) {
	      // check value != 0
	      if (!eq(v, zero)) {
	        // update value
	        this._values[k] = v;
	      }
	      else {
	        // remove value from matrix
	        _remove(k, j, this._values, this._index, this._ptr);
	      }
	    }
	    else {
	      // insert value @ (i, j)
	      _insert(k, i, j, v, this._values, this._index, this._ptr);
	    }

	    return this;
	  };
	  
	  var _getValueIndex = function(i, top, bottom, index) {
	    // check row is on the bottom side
	    if (bottom - top === 0)
	      return bottom;
	    // loop rows [top, bottom[
	    for (var r = top; r < bottom; r++) {
	      // check we found value index
	      if (index[r] === i)
	        return r;
	    }
	    // we did not find row
	    return top;
	  };

	  var _remove = function (k, j, values, index, ptr) {
	    // remove value @ k
	    values.splice(k, 1);
	    index.splice(k, 1);
	    // update pointers
	    for (var x = j + 1; x < ptr.length; x++)
	      ptr[x]--;
	  };

	  var _insert = function (k, i, j, v, values, index, ptr) {
	    // insert value
	    values.splice(k, 0, v);
	    // update row for k
	    index.splice(k, 0, i);
	    // update column pointers
	    for (var x = j + 1; x < ptr.length; x++)
	      ptr[x]++;
	  };
	  
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when 
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @memberof SparseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */
	  SparseMatrix.prototype.resize = function (size, defaultValue, copy) {    
	    // validate arguments
	    if (!isArray(size))
	      throw new TypeError('Array expected');
	    if (size.length !== 2)
	      throw new Error('Only two dimensions matrix are supported');

	    // check sizes
	    size.forEach(function (value) {
	      if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
	        throw new TypeError('Invalid size, must contain positive integers ' +
	                            '(size: ' + string.format(size) + ')');
	      }
	    });
	    
	    // matrix to resize
	    var m = copy ? this.clone() : this;
	    // resize matrix
	    return _resize(m, size[0], size[1], defaultValue);
	  };
	  
	  var _resize = function (matrix, rows, columns, defaultValue) {
	    // value to insert at the time of growing matrix
	    var value = defaultValue || 0;
	    
	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;

	    if (isString(matrix._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, matrix._datatype);
	      // convert value to the same datatype
	      value = typed.convert(value, matrix._datatype);
	    }
	    
	    // should we insert the value?
	    var ins = !eq(value, zero);

	    // old columns and rows
	    var r = matrix._size[0];
	    var c = matrix._size[1];

	    var i, j, k;

	    // check we need to increase columns
	    if (columns > c) {
	      // loop new columns
	      for (j = c; j < columns; j++) {
	        // update matrix._ptr for current column
	        matrix._ptr[j] = matrix._values.length;
	        // check we need to insert matrix._values
	        if (ins) {
	          // loop rows
	          for (i = 0; i < r; i++) {
	            // add new matrix._values
	            matrix._values.push(value);
	            // update matrix._index
	            matrix._index.push(i);
	          }
	        }        
	      }
	      // store number of matrix._values in matrix._ptr
	      matrix._ptr[columns] = matrix._values.length;
	    }
	    else if (columns < c) {
	      // truncate matrix._ptr
	      matrix._ptr.splice(columns + 1, c - columns);
	      // truncate matrix._values and matrix._index
	      matrix._values.splice(matrix._ptr[columns], matrix._values.length);
	      matrix._index.splice(matrix._ptr[columns], matrix._index.length);
	    }
	    // update columns
	    c = columns;

	    // check we need to increase rows
	    if (rows > r) {
	      // check we have to insert values
	      if (ins) {
	        // inserts
	        var n = 0;
	        // loop columns
	        for (j = 0; j < c; j++) {
	          // update matrix._ptr for current column
	          matrix._ptr[j] = matrix._ptr[j] + n;
	          // where to insert matrix._values
	          k = matrix._ptr[j + 1] + n;
	          // pointer
	          var p = 0;
	          // loop new rows, initialize pointer
	          for (i = r; i < rows; i++, p++) {
	            // add value
	            matrix._values.splice(k + p, 0, value);
	            // update matrix._index
	            matrix._index.splice(k + p, 0, i);
	            // increment inserts
	            n++;
	          }
	        }
	        // store number of matrix._values in matrix._ptr
	        matrix._ptr[c] = matrix._values.length;
	      }
	    }
	    else if (rows < r) {
	      // deletes
	      var d = 0;
	      // loop columns
	      for (j = 0; j < c; j++) {
	        // update matrix._ptr for current column
	        matrix._ptr[j] = matrix._ptr[j] - d;
	        // where matrix._values start for next column
	        var k0 = matrix._ptr[j];
	        var k1 = matrix._ptr[j + 1] - d;
	        // loop matrix._index
	        for (k = k0; k < k1; k++) {
	          // row
	          i = matrix._index[k];
	          // check we need to delete value and matrix._index
	          if (i > rows - 1) {
	            // remove value
	            matrix._values.splice(k, 1);
	            // remove item from matrix._index
	            matrix._index.splice(k, 1);
	            // increase deletes
	            d++;
	          }
	        }
	      }
	      // update matrix._ptr for current column
	      matrix._ptr[j] = matrix._values.length;
	    }
	    // update matrix._size
	    matrix._size[0] = rows;
	    matrix._size[1] = columns;
	    // return matrix
	    return matrix;
	  };
	  
	  /**
	   * Create a clone of the matrix
	   * @memberof SparseMatrix
	   * @return {SparseMatrix} clone
	   */
	  SparseMatrix.prototype.clone = function () {
	    var m = new SparseMatrix({
	      values: this._values ? object.clone(this._values) : undefined,
	      index: object.clone(this._index),
	      ptr: object.clone(this._ptr),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };
	  
	  /**
	   * Retrieve the size of the matrix.
	   * @memberof SparseMatrix
	   * @returns {number[]} size
	   */
	  SparseMatrix.prototype.size = function() {
	    return this._size.slice(0); // copy the Array
	  };
	  
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @memberof SparseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   *
	   * @return {SparseMatrix} matrix
	   */
	  SparseMatrix.prototype.map = function (callback, skipZeros) {
	    // check it is a pattern matrix
	    if (!this._values)
	      throw new Error('Cannot invoke map on a Pattern only matrix');
	    // matrix instance
	    var me = this;
	    // rows and columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    // invoke callback
	    var invoke = function (v, i, j) {
	      // invoke callback
	      return callback(v, [i, j], me);
	    };
	    // invoke _map
	    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
	  };

	  /**
	   * Create a new matrix with the results of the callback function executed on the interval
	   * [minRow..maxRow, minColumn..maxColumn].
	   */
	  var _map = function (matrix, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
	    // result arrays
	    var values = [];
	    var index = [];
	    var ptr = [];
	    
	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;

	    if (isString(matrix._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, matrix._datatype);
	    }
	    
	    // invoke callback
	    var invoke = function (v, x, y) {
	      // invoke callback
	      v = callback(v, x, y);
	      // check value != 0
	      if (!eq(v, zero)) {
	        // store value
	        values.push(v);
	        // index
	        index.push(x);
	      }
	    };
	    // loop columns
	    for (var j = minColumn; j <= maxColumn; j++) {
	      // store pointer to values index
	      ptr.push(values.length);
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = matrix._ptr[j];
	      var k1 = matrix._ptr[j + 1];
	      // row pointer
	      var p = minRow;
	      // loop k within [k0, k1[
	      for (var k = k0; k < k1; k++) {
	        // row index
	        var i = matrix._index[k];
	        // check i is in range
	        if (i >= minRow && i <= maxRow) {
	          // zero values
	          if (!skipZeros) {
	           for (var x = p; x < i; x++)
	             invoke(0, x - minRow, j - minColumn);
	          }
	          // value @ k
	          invoke(matrix._values[k], i - minRow, j - minColumn);
	        }
	        // update pointer
	        p = i + 1;
	      }
	      // zero values
	      if (!skipZeros) {
	        for (var y = p; y <= maxRow; y++)
	          invoke(0, y - minRow, j - minColumn);
	      }
	    }
	    // store number of values in ptr
	    ptr.push(values.length);
	    // return sparse matrix
	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
	    });
	  };
	  
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @memberof SparseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   */
	  SparseMatrix.prototype.forEach = function (callback, skipZeros) {
	    // check it is a pattern matrix
	    if (!this._values)
	      throw new Error('Cannot invoke forEach on a Pattern only matrix');
	    // matrix instance
	    var me = this;
	    // rows and columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1];
	      // column pointer
	      var p = 0;
	      // loop k within [k0, k1[
	      for (var k = k0; k < k1; k++) {
	        // row index
	        var i = this._index[k];
	        // check we need to process zeros
	        if (!skipZeros) {
	          // zero values
	          for (var x = p; x < i; x++)
	            callback(0, [x, j], me);
	        }
	        // value @ k
	        callback(this._values[k], [i, j], me);
	        // update pointer
	        p = i + 1;
	      }
	      // check we need to process zeros
	      if (!skipZeros) {
	        // zero values
	        for (var y = p; y < rows; y++)
	          callback(0, [y, j], me);
	      }
	    }
	  };
	  
	  /**
	   * Create an Array with a copy of the data of the SparseMatrix
	   * @memberof SparseMatrix
	   * @returns {Array} array
	   */
	  SparseMatrix.prototype.toArray = function () {
	    return _toArray(this._values, this._index, this._ptr, this._size, true);
	  };

	  /**
	   * Get the primitive value of the SparseMatrix: a two dimensions array
	   * @memberof SparseMatrix
	   * @returns {Array} array
	   */
	  SparseMatrix.prototype.valueOf = function () {
	    return _toArray(this._values, this._index, this._ptr, this._size, false);
	  };
	  
	  var _toArray = function (values, index, ptr, size, copy) {    
	    // rows and columns
	    var rows = size[0];
	    var columns = size[1];
	    // result
	    var a = [];
	    // vars
	    var i, j;
	    // initialize array
	    for (i = 0; i < rows; i++) {
	      a[i] = [];
	      for (j = 0; j < columns; j++)
	        a[i][j] = 0;
	    }

	    // loop columns
	    for (j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = ptr[j];
	      var k1 = ptr[j + 1];
	      // loop k within [k0, k1[
	      for (var k = k0; k < k1; k++) {
	        // row index
	        i = index[k];
	        // set value (use one for pattern matrix)
	        a[i][j] = values ? (copy ? object.clone(values[k]) : values[k]) : 1;
	      }
	    }
	    return a;
	  };
	  
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @memberof SparseMatrix
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */
	  SparseMatrix.prototype.format = function (options) {
	    // rows and columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    // density
	    var density = this.density();
	    // rows & columns
	    var str = 'Sparse Matrix [' + string.format(rows, options) + ' x ' + string.format(columns, options) + '] density: ' + string.format(density, options) + '\n';
	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1];
	      // loop k within [k0, k1[
	      for (var k = k0; k < k1; k++) {
	        // row index
	        var i = this._index[k];
	        // append value
	        str += '\n    (' + string.format(i, options) + ', ' + string.format(j, options) + ') ==> ' + (this._values ? string.format(this._values[k], options) : 'X');
	      }
	    }
	    return str;
	  };
	  
	  /**
	   * Get a string representation of the matrix
	   * @memberof SparseMatrix
	   * @returns {string} str
	   */
	  SparseMatrix.prototype.toString = function () {
	    return string.format(this.toArray());
	  };
	  
	  /**
	   * Get a JSON representation of the matrix
	   * @memberof SparseMatrix
	   * @returns {Object}
	   */
	  SparseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'SparseMatrix',
	      values: this._values,
	      index: this._index,
	      ptr: this._ptr,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };

	  /**
	   * Get the kth Matrix diagonal.
	   *
	   * @memberof SparseMatrix
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
	   *
	   * @returns {Matrix}                     The matrix vector with the diagonal values.
	   */
	  SparseMatrix.prototype.diagonal = function(k) {
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (k.isBigNumber === true)
	        k = k.toNumber();
	      // is must be an integer
	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError ('The parameter k must be an integer number');
	      }
	    }
	    else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0;
	    
	    // rows & columns
	    var rows = this._size[0];
	    var columns = this._size[1];
	    
	    // number diagonal values
	    var n = Math.min(rows - kSub, columns -  kSuper);
	    
	    // diagonal arrays
	    var values = [];
	    var index = [];
	    var ptr = [];
	    // initial ptr value
	    ptr[0] = 0;
	    // loop columns
	    for (var j = kSuper; j < columns && values.length < n; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1];
	      // loop x within [k0, k1[
	      for (var x = k0; x < k1; x++) {
	        // row index
	        var i = this._index[x];
	        // check row
	        if (i === j - kSuper + kSub) {
	          // value on this column
	          values.push(this._values[x]);
	          // store row
	          index[values.length - 1] = i - kSub;
	          // exit loop
	          break;
	        }
	      }
	    }
	    // close ptr
	    ptr.push(values.length);
	    // return matrix
	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [n, 1]
	    });
	  };
	  
	  /**
	   * Generate a matrix from a JSON object
	   * @memberof SparseMatrix
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "SparseMatrix", "values": [], "index": [], "ptr": [], "size": []}`,
	   *                       where mathjs is optional
	   * @returns {SparseMatrix}
	   */
	  SparseMatrix.fromJSON = function (json) {
	    return new SparseMatrix(json);
	  };

	  /**
	   * Create a diagonal matrix.
	   *
	   * @memberof SparseMatrix
	   * @param {Array} size                       The matrix size.
	   * @param {number | Array | Matrix } value   The values for the diagonal.
	   * @param {number | BigNumber} [k=0]         The kth diagonal where the vector will be filled in.
	   * @param {string} [datatype]                The Matrix datatype, values must be of this datatype.
	   *
	   * @returns {SparseMatrix}
	   */
	  SparseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
	    if (!isArray(size))
	      throw new TypeError('Array expected, size parameter');
	    if (size.length !== 2)
	      throw new Error('Only two dimensions matrix are supported');
	    
	    // map size & validate
	    size = size.map(function (s) {
	      // check it is a big number
	      if (s && s.isBigNumber === true) {
	        // convert it
	        s = s.toNumber();
	      }
	      // validate arguments
	      if (!isNumber(s) || !isInteger(s) || s < 1) {
	        throw new Error('Size values must be positive integers');
	      } 
	      return s;
	    });
	    
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (k.isBigNumber === true)
	        k = k.toNumber();
	      // is must be an integer
	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError ('The parameter k must be an integer number');
	      }
	    }
	    else {
	      // default value
	      k = 0;
	    }

	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;

	    if (isString(datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, datatype);
	    }
	    
	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0;
	    
	    // rows and columns
	    var rows = size[0];
	    var columns = size[1];
	    
	    // number of non-zero items
	    var n = Math.min(rows - kSub, columns -  kSuper);
	    
	    // value extraction function
	    var _value;
	      
	    // check value
	    if (isArray(value)) {
	      // validate array
	      if (value.length !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid value array length');
	      }
	      // define function
	      _value = function (i) {
	        // return value @ i
	        return value[i];
	      };
	    }
	    else if (value && value.isMatrix === true) {
	      // matrix size
	      var ms = value.size();
	      // validate matrix
	      if (ms.length !== 1 || ms[0] !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid matrix length');
	      }
	      // define function
	      _value = function (i) {
	        // return value @ i
	        return value.get([i]);
	      };
	    }
	    else {
	      // define function
	      _value = function () {
	        // return value
	        return value;
	      };
	    }
	    
	    // create arrays
	    var values = [];
	    var index = [];
	    var ptr = [];
	    
	    // loop items
	    for (var j = 0; j < columns; j++) {
	      // number of rows with value
	      ptr.push(values.length);
	      // diagonal index
	      var i = j - kSuper;      
	      // check we need to set diagonal value
	      if (i >= 0 && i < n) {
	        // get value @ i
	        var v = _value(i);
	        // check for zero
	        if (!eq(v, zero)) {
	          // column
	          index.push(i + kSub);
	          // add value
	          values.push(v);
	        }
	      }
	    }
	    // last value should be number of values
	    ptr.push(values.length);
	    // create SparseMatrix
	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [rows, columns]
	    });
	  };
	  
	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @memberof SparseMatrix
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */
	  SparseMatrix.prototype.swapRows = function (i, j) {
	    // check index
	    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
	      throw new Error('Row index must be positive integers');
	    }
	    // check dimensions
	    if (this._size.length !== 2) {
	      throw new Error('Only two dimensional matrix is supported');
	    }
	    // validate index
	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[0]);
	    
	    // swap rows
	    SparseMatrix._swapRows(i, j, this._size[1], this._values, this._index, this._ptr);
	    // return current instance
	    return this;
	  };
	  
	  /**
	   * Loop rows with data in column j.
	   *
	   * @param {number} j            Column
	   * @param {Array} values        Matrix values
	   * @param {Array} index         Matrix row indeces
	   * @param {Array} ptr           Matrix column pointers
	   * @param {Function} callback   Callback function invoked for every row in column j
	   */
	  SparseMatrix._forEachRow = function (j, values, index, ptr, callback) {
	    // indeces for column j
	    var k0 = ptr[j];
	    var k1 = ptr[j + 1];
	    // loop
	    for (var k = k0; k < k1; k++) {
	      // invoke callback
	      callback(index[k], values[k]);
	    }
	  };
	  
	  /**
	   * Swap rows x and y in Sparse Matrix data structures.
	   *
	   * @param {number} x         Matrix row index 1
	   * @param {number} y         Matrix row index 2
	   * @param {number} columns   Number of columns in matrix
	   * @param {Array} values     Matrix values
	   * @param {Array} index      Matrix row indeces
	   * @param {Array} ptr        Matrix column pointers
	   */
	  SparseMatrix._swapRows = function (x, y, columns, values, index, ptr) {
	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = ptr[j];
	      var k1 = ptr[j + 1];
	      // find value index @ x
	      var kx = _getValueIndex(x, k0, k1, index);
	      // find value index @ x
	      var ky = _getValueIndex(y, k0, k1, index);
	      // check both rows exist in matrix
	      if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
	        // swap values (check for pattern matrix)
	        if (values) {
	          var v = values[kx];
	          values[kx] = values[ky];
	          values[ky] = v;
	        }
	        // next column
	        continue;
	      }
	      // check x row exist & no y row
	      if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
	        // value @ x (check for pattern matrix)
	        var vx = values ? values[kx] : undefined;
	        // insert value @ y
	        index.splice(ky, 0, y);
	        if (values)
	          values.splice(ky, 0, vx);        
	        // remove value @ x (adjust array index if needed)
	        index.splice(ky <= kx ? kx + 1 : kx, 1);
	        if (values)
	          values.splice(ky <= kx ? kx + 1 : kx, 1);
	        // next column
	        continue;
	      }
	      // check y row exist & no x row
	      if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
	        // value @ y (check for pattern matrix)
	        var vy = values ? values[ky] : undefined;
	        // insert value @ x
	        index.splice(kx, 0, x);
	        if (values)
	          values.splice(kx, 0, vy);
	        // remove value @ y (adjust array index if needed)
	        index.splice(kx <= ky ? ky + 1 : ky, 1);
	        if (values)
	          values.splice(kx <= ky ? ky + 1 : ky, 1);
	      }
	    }
	  };

	  // register this type in the base class Matrix
	  type.Matrix._storage.sparse = SparseMatrix;

	  return SparseMatrix;
	}

	exports.name = 'SparseMatrix';
	exports.path = 'type';
	exports.factory = factory;
	exports.lazy = false;  // no lazy loading, as we alter type.Matrix._storage


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(6).nearlyEqual;
	var bigNearlyEqual = __webpack_require__(49);

	function factory (type, config, load, typed) {
	  
	  /**
	   * Test whether two values are equal.
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
	   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
	   * @private
	   */
	  var equalScalar = typed('equalScalar', {

	    'boolean, boolean': function (x, y) {
	      return x === y;
	    },

	    'number, number': function (x, y) {
	      return x === y || nearlyEqual(x, y, config.epsilon);
	    },

	    'BigNumber, BigNumber': function (x, y) {
	      return x.eq(y) || bigNearlyEqual(x, y, config.epsilon);
	    },

	    'Fraction, Fraction': function (x, y) {
	      return x.equals(y);
	    },

	    'Complex, Complex': function (x, y) {
	      return x.equals(y);
	    },

	    'Unit, Unit': function (x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return equalScalar(x.value, y.value);
	    },

	    'string, string': function (x, y) {
	      return x === y;
	    }
	  });
	  
	  return equalScalar;
	}

	exports.factory = factory;


/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Compares two BigNumbers.
	 * @param {BigNumber} x       First value to compare
	 * @param {BigNumber} y       Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	 */
	module.exports = function nearlyEqual(x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon == null) {
	    return x.eq(y);
	  }


	  // use "==" operator, handles infinities
	  if (x.eq(y)) {
	    return true;
	  }

	  // NaN
	  if (x.isNaN() || y.isNaN()) {
	    return false;
	  }

	  // at this point x and y should be finite
	  if(x.isFinite() && y.isFinite()) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = x.minus(y).abs();
	    if (diff.isZero()) {
	      return true;
	    }
	    else {
	      // use relative error
	      var max = x.constructor.max(x.abs(), y.abs());
	      return diff.lte(max.times(epsilon));
	    }
	  }

	  // Infinite and Number or negative Infinite and positive Infinite cases
	  return false;
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function factory (type, config, load) {
	  
	  var add = load(__webpack_require__(51));
	  var equalScalar = load(__webpack_require__(48));
	  
	  /**
	   * An ordered Sparse Accumulator is a representation for a sparse vector that includes a dense array 
	   * of the vector elements and an ordered list of non-zero elements.
	   */
	  function Spa() {
	    if (!(this instanceof Spa))
	      throw new SyntaxError('Constructor must be called with the new operator');
	    
	    // allocate vector, TODO use typed arrays
	    this._values = [];
	    this._heap = new type.FibonacciHeap();
	  }

	  /**
	   * Attach type information
	   */
	  Spa.prototype.type = 'Spa';
	  Spa.prototype.isSpa = true;

	  /**
	   * Set the value for index i.
	   *
	   * @param {number} i                       The index
	   * @param {number | BigNumber | Complex}   The value at index i
	   */
	  Spa.prototype.set = function (i, v) {
	    // check we have a value @ i
	    if (!this._values[i]) {
	      // insert in heap
	      var node = this._heap.insert(i, v);
	      // set the value @ i
	      this._values[i] = node;
	    }
	    else {
	      // update the value @ i
	      this._values[i].value = v;
	    }
	  };
	  
	  Spa.prototype.get = function (i) {
	    var node = this._values[i];
	    if (node)
	      return node.value;
	    return 0;
	  };
	  
	  Spa.prototype.accumulate = function (i, v) {
	    // node @ i
	    var node = this._values[i];
	    if (!node) {
	      // insert in heap
	      node = this._heap.insert(i, v);
	      // initialize value
	      this._values[i] = node;
	    }
	    else {
	      // accumulate value
	      node.value = add(node.value, v);
	    }
	  };
	  
	  Spa.prototype.forEach = function (from, to, callback) {
	    // references
	    var heap = this._heap;
	    var values = this._values;
	    // nodes
	    var nodes = [];
	    // node with minimum key, save it
	    var node = heap.extractMinimum();
	    if (node)
	      nodes.push(node);
	    // extract nodes from heap (ordered)
	    while (node && node.key <= to) {
	      // check it is in range
	      if (node.key >= from) {
	        // check value is not zero
	        if (!equalScalar(node.value, 0)) {
	          // invoke callback
	          callback(node.key, node.value, this);
	        }
	      }
	      // extract next node, save it
	      node = heap.extractMinimum();
	      if (node)
	        nodes.push(node);
	    }
	    // reinsert all nodes in heap
	    for (var i = 0; i < nodes.length; i++) {
	      // current node
	      var n = nodes[i];
	      // insert node in heap
	      node = heap.insert(n.key, n.value);
	      // update values
	      values[node.key] = node;
	    }
	  };
	  
	  Spa.prototype.swap = function (i, j) {
	    // node @ i and j
	    var nodei = this._values[i];
	    var nodej = this._values[j];
	    // check we need to insert indeces
	    if (!nodei && nodej) {
	      // insert in heap
	      nodei = this._heap.insert(i, nodej.value);
	      // remove from heap
	      this._heap.remove(nodej);
	      // set values
	      this._values[i] = nodei;
	      this._values[j] = undefined;
	    }
	    else if (nodei && !nodej) {
	      // insert in heap
	      nodej = this._heap.insert(j, nodei.value);
	      // remove from heap
	      this._heap.remove(nodei);
	      // set values
	      this._values[j] = nodej;
	      this._values[i] = undefined;
	    }
	    else if (nodei && nodej) {
	      // swap values
	      var v = nodei.value;
	      nodei.value = nodej.value;
	      nodej.value = v;
	    }
	  };
	  
	  return Spa;
	}

	exports.name = 'Spa';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(3).extend;

	function factory (type, config, load, typed) {

	  var matrix = load(__webpack_require__(52));
	  var addScalar = load(__webpack_require__(53));
	  var latex = __webpack_require__(32);
	  
	  var algorithm01 = load(__webpack_require__(54));
	  var algorithm04 = load(__webpack_require__(55));
	  var algorithm10 = load(__webpack_require__(56));
	  var algorithm13 = load(__webpack_require__(57));
	  var algorithm14 = load(__webpack_require__(58));

	  /**
	   * Add two or more values, `x + y`.
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.add(x, y)
	   *    math.add(x, y, z, ...)
	   *
	   * Examples:
	   *
	   *    math.add(2, 3);               // returns number 5
	   *    math.add(2, 3, 4);            // returns number 9
	   *
	   *    var a = math.complex(2, 3);
	   *    var b = math.complex(-4, 1);
	   *    math.add(a, b);               // returns Complex -2 + 4i
	   *
	   *    math.add([1, 2, 3], 4);       // returns Array [5, 6, 7]
	   *
	   *    var c = math.unit('5 cm');
	   *    var d = math.unit('2.1 mm');
	   *    math.add(c, d);               // returns Unit 52.1 mm
	   *
	   *    math.add("2.3", "4");         // returns number 6.3
	   *
	   * See also:
	   *
	   *    subtract, sum
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to add
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Sum of `x` and `y`
	   */
	  var add = typed('add', extend({
	    // we extend the signatures of addScalar with signatures dealing with matrices

	    'Matrix, Matrix': function (x, y) {
	      // result
	      var c;
	      
	      // process matrix storage
	      switch (x.storage()) {
	        case 'sparse':
	          switch (y.storage()) {
	            case 'sparse':
	              // sparse + sparse
	              c = algorithm04(x, y, addScalar);
	              break;
	            default:
	              // sparse + dense
	              c = algorithm01(y, x, addScalar, true);
	              break;
	          }
	          break;
	        default:
	          switch (y.storage()) {
	            case 'sparse':
	              // dense + sparse
	              c = algorithm01(x, y, addScalar, false);
	              break;
	            default:
	              // dense + dense
	              c = algorithm13(x, y, addScalar);
	              break;
	          }
	          break;
	      }
	      return c;
	    },
	    
	    'Array, Array': function (x, y) {
	      // use matrix implementation
	      return add(matrix(x), matrix(y)).valueOf();
	    },
	    
	    'Array, Matrix': function (x, y) {
	      // use matrix implementation
	      return add(matrix(x), y);
	    },
	    
	    'Matrix, Array': function (x, y) {
	      // use matrix implementation
	      return add(x, matrix(y));
	    },
	    
	    'Matrix, any': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (x.storage()) {
	        case 'sparse':
	          c = algorithm10(x, y, addScalar, false);
	          break;
	        default:
	          c = algorithm14(x, y, addScalar, false);
	          break;
	      }
	      return c;
	    },
	    
	    'any, Matrix': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (y.storage()) {
	        case 'sparse':
	          c = algorithm10(y, x, addScalar, true);
	          break;
	        default:
	          c = algorithm14(y, x, addScalar, true);
	          break;
	      }
	      return c;
	    },
	    
	    'Array, any': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, addScalar, false).valueOf();
	    },

	    'any, Array': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, addScalar, true).valueOf();
	    },

	    'any, any': addScalar,

	    'any, any, ...any': function (x, y, rest) {
	      var result = add(x, y);

	      for (var i = 0; i < rest.length; i++) {
	        result = add(result, rest[i]);
	      }

	      return result;
	    }
	  }, addScalar.signatures));

	  add.toTex = {
	    2: '\\left(${args[0]}' + latex.operators['add'] + '${args[1]}\\right)'
	  };
	  
	  return add;
	}

	exports.name = 'add';
	exports.factory = factory;


/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {
	  /**
	   * Create a Matrix. The function creates a new `math.type.Matrix` object from
	   * an `Array`. A Matrix has utility functions to manipulate the data in the
	   * matrix, like getting the size and getting or setting values in the matrix.
	   * Supported storage formats are 'dense' and 'sparse'.
	   *
	   * Syntax:
	   *
	   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
	   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
	   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
	   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
	   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
	   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
	   *
	   * Examples:
	   *
	   *    var m = math.matrix([[1, 2], [3, 4]]);
	   *    m.size();                        // Array [2, 2]
	   *    m.resize([3, 2], 5);
	   *    m.valueOf();                     // Array [[1, 2], [3, 4], [5, 5]]
	   *    m.get([1, 0])                    // number 3
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, number, string, unit, sparse
	   *
	   * @param {Array | Matrix} [data]    A multi dimensional array
	   * @param {string} [format]          The Matrix storage format
	   *
	   * @return {Matrix} The created matrix
	   */
	  var matrix = typed('matrix', {
	    '': function () {
	      return _create([]);
	    },

	    'string': function (format) {
	      return _create([], format);
	    },
	    
	    'string, string': function (format, datatype) {
	      return _create([], format, datatype);
	    },

	    'Array': function (data) {
	      return _create(data);
	    },
	      
	    'Matrix': function (data) {
	      return _create(data, data.storage());
	    },
	    
	    'Array | Matrix, string': _create,
	    
	    'Array | Matrix, string, string': _create
	  });

	  matrix.toTex = {
	    0: '\\begin{bmatrix}\\end{bmatrix}',
	    1: '\\left(${args[0]}\\right)',
	    2: '\\left(${args[0]}\\right)'
	  };

	  return matrix;

	  /**
	   * Create a new Matrix with given storage format
	   * @param {Array} data
	   * @param {string} [format]
	   * @param {string} [datatype]
	   * @returns {Matrix} Returns a new Matrix
	   * @private
	   */
	  function _create(data, format, datatype) {
	    // get storage format constructor
	    var M = type.Matrix.storage(format || 'default');

	    // create instance
	    return new M(data, datatype);
	  }
	}

	exports.name = 'matrix';
	exports.factory = factory;


/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	function factory(type, config, load, typed) {

	  /**
	   * Add two scalar values, `x + y`.
	   * This function is meant for internal use: it is used by the public function
	   * `add`
	   *
	   * This function does not support collections (Array or Matrix), and does
	   * not validate the number of of inputs.
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to add
	   * @param  {number | BigNumber | Fraction | Complex} y          Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit}                      Sum of `x` and `y`
	   * @private
	   */
	  var add = typed('add', {

	    'number, number': function (x, y) {
	      return x + y;
	    },

	    'Complex, Complex': function (x, y) {
	      return x.add(y);
	    },

	    'BigNumber, BigNumber': function (x, y) {
	      return x.plus(y);
	    },

	    'Fraction, Fraction': function (x, y) {
	      return x.add(y);
	    },

	    'Unit, Unit': function (x, y) {
	      if (x.value == null) throw new Error('Parameter x contains a unit with undefined value');
	      if (y.value == null) throw new Error('Parameter y contains a unit with undefined value');
	      if (!x.equalBase(y)) throw new Error('Units do not match');

	      var res = x.clone();
	      res.value = add(res.value, y.value);
	      res.fixPrefix = false;
	      return res;
	    }
	  });

	  return add;
	}

	exports.factory = factory;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(42);

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix nonzero items and invokes the callback function f(Dij, Sij). 
	   * Callback function invoked NNZ times (number of nonzero items in SparseMatrix).
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  Dij          ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (S)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */
	  var algorithm01 = function (denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype;
	    // sparse matrix arrays
	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype;

	    // validate dimensions
	    if (asize.length !== bsize.length)
	      throw new DimensionError(asize.length, bsize.length);

	    // check rows & columns
	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');

	    // sparse matrix cannot be a Pattern matrix
	    if (!bvalues)
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // process data types
	    var dt = typeof adt === 'string' && adt === bdt ? adt : undefined;
	    // callback function
	    var cf = dt ? typed.find(callback, [dt, dt]) : callback;

	    // vars
	    var i, j;
	    
	    // result (DenseMatrix)
	    var cdata = [];
	    // initialize c
	    for (i = 0; i < rows; i++)
	      cdata[i] = [];      
	    
	    // workspace
	    var x = [];
	    // marks indicating we have a value in x for a given column
	    var w = [];

	    // loop columns in b
	    for (j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1;
	      // values in column j
	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k];
	        // update workspace
	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
	        // mark i as updated
	        w[i] = mark;
	      }
	      // loop rows
	      for (i = 0; i < rows; i++) {
	        // check row is in workspace
	        if (w[i] === mark) {
	          // c[i][j] was already calculated
	          cdata[i][j] = x[i];
	        }
	        else {
	          // item does not exist in S
	          cdata[i][j] = adata[i][j];
	        }
	      }
	    }

	    // return dense matrix
	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	  
	  return algorithm01;
	}

	exports.name = 'algorithm01';
	exports.factory = factory;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(42);

	function factory (type, config, load, typed) {

	  var equalScalar = load(__webpack_require__(48));

	  var SparseMatrix = type.SparseMatrix;

	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij). 
	   * Callback function invoked MAX(NNZA, NNZB) times
	   *
	   *
	   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 && B(i,j) !== 0
	   * C(i,j) = ┤  A(i,j)       ; A(i,j) !== 0
	   *          └  B(i,j)       ; B(i,j) !== 0
	   *
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */
	  var algorithm04 = function (a, b, callback) {
	    // sparse matrix arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype;
	    // sparse matrix arrays
	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype;

	    // validate dimensions
	    if (asize.length !== bsize.length)
	      throw new DimensionError(asize.length, bsize.length);

	    // check rows & columns
	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // datatype
	    var dt;
	    // equal signature to use
	    var eq = equalScalar;
	    // zero value
	    var zero = 0;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt;
	      // find signature that matches (dt, dt)
	      eq = typed.find(equalScalar, [dt, dt]);
	      // convert 0 to the same datatype
	      zero = typed.convert(0, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }

	    // result arrays
	    var cvalues = avalues && bvalues ? [] : undefined;
	    var cindex = [];
	    var cptr = [];
	    // matrix
	    var c = new SparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    });

	    // workspace
	    var xa = avalues && bvalues ? [] : undefined;
	    var xb = avalues && bvalues ? [] : undefined;
	    // marks indicating we have a value in x for a given column
	    var wa = [];
	    var wb = [];

	    // vars 
	    var i, j, k, k0, k1;
	    
	    // loop columns
	    for (j = 0; j < columns; j++) {
	      // update cptr
	      cptr[j] = cindex.length;
	      // columns mark
	      var mark = j + 1;
	      // loop A(:,j)
	      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = aindex[k];
	        // update c
	        cindex.push(i);
	        // update workspace
	        wa[i] = mark;
	        // check we need to process values
	        if (xa)
	          xa[i] = avalues[k];
	      }
	      // loop B(:,j)
	      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k];
	        // check row exists in A
	        if (wa[i] === mark) {
	          // update record in xa @ i
	          if (xa) {
	            // invoke callback
	            var v = cf(xa[i], bvalues[k]);
	            // check for zero
	            if (!eq(v, zero)) {
	              // update workspace
	              xa[i] = v;              
	            }
	            else {
	              // remove mark (index will be removed later)
	              wa[i] = null;
	            }
	          }
	        }
	        else {
	          // update c
	          cindex.push(i);
	          // update workspace
	          wb[i] = mark;
	          // check we need to process values
	          if (xb)
	            xb[i] = bvalues[k];
	        }
	      }
	      // check we need to process values (non pattern matrix)
	      if (xa && xb) {
	        // initialize first index in j
	        k = cptr[j];
	        // loop index in j
	        while (k < cindex.length) {
	          // row
	          i = cindex[k];
	          // check workspace has value @ i
	          if (wa[i] === mark) {
	            // push value (Aij != 0 || (Aij != 0 && Bij != 0))
	            cvalues[k] = xa[i];
	            // increment pointer
	            k++;
	          }
	          else if (wb[i] === mark) {
	            // push value (bij != 0)
	            cvalues[k] = xb[i];
	            // increment pointer
	            k++;
	          }
	          else {
	            // remove index @ k
	            cindex.splice(k, 1);
	          }
	        }
	      }
	    }
	    // update cptr
	    cptr[columns] = cindex.length;

	    // return sparse matrix
	    return c;
	  };
	  
	  return algorithm04;
	}

	exports.name = 'algorithm04';
	exports.factory = factory;


/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b). 
	   * Callback function invoked NZ times (number of nonzero items in S).
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤  
	   *          └  b          ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */
	  var algorithm10 = function (s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype;

	    // sparse matrix cannot be a Pattern matrix
	    if (!avalues)
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // datatype
	    var dt;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt;
	      // convert b to the same datatype
	      b = typed.convert(b, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }

	    // result arrays
	    var cdata = [];
	    // matrix
	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });

	    // workspaces
	    var x = [];
	    // marks indicating we have a value in x for a given column
	    var w = [];

	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1;
	      // values in j
	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k];
	        // update workspace
	        x[r] = avalues[k];
	        w[r] = mark;
	      }
	      // loop rows
	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        }
	        // check sparse matrix has a value @ i,j
	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        }
	        else {
	          // dense matrix value @ i, j
	          cdata[i][j] = b;
	        }
	      }
	    }

	    // return sparse matrix
	    return c;
	  };

	  return algorithm10;
	}

	exports.name = 'algorithm10';
	exports.factory = factory;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(39);
	var DimensionError = __webpack_require__(42);

	var string = util.string,
	    isString = string.isString;

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, Bij..z). 
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, Bij..z)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Matrix}   b                 The DenseMatrix instance (B)
	   * @param {Function} callback          The f(Aij..z,Bij..z) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97658658
	   */
	  var algorithm13 = function (a, b, callback) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype;
	    // b arrays
	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype;
	    // c arrays
	    var csize = [];

	    // validate dimensions
	    if (asize.length !== bsize.length)
	      throw new DimensionError(asize.length, bsize.length);

	    // validate each one of the dimension sizes
	    for (var s = 0; s < asize.length; s++) {
	      // must match
	      if (asize[s] !== bsize[s])
	        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	      // update dimension in c
	      csize[s] = asize[s];
	    }

	    // datatype
	    var dt;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt;
	      // convert b to the same datatype
	      b = typed.convert(b, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }

	    // populate cdata, iterate through dimensions
	    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : [];
	    
	    // c matrix
	    return new DenseMatrix({
	      data: cdata,
	      size: csize,
	      datatype: dt
	    });
	  };
	  
	  // recursive function
	  var _iterate = function (f, level, s, n, av, bv) {
	    // initialize array for this level
	    var cv = [];
	    // check we reach the last level
	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = f(av[i], bv[i]);
	      }
	    }
	    else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
	      }
	    }
	    return cv;
	  };
	  
	  return algorithm13;
	}

	exports.name = 'algorithm13';
	exports.factory = factory;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clone = __webpack_require__(3).clone;

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, b). 
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, b)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij..z,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Aij..z)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97659042
	   */
	  var algorithm14 = function (a, b, callback, inverse) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype;
	    
	    // datatype
	    var dt;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt;
	      // convert b to the same datatype
	      b = typed.convert(b, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }
	    
	    // populate cdata, iterate through dimensions
	    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];

	    // c matrix
	    return new DenseMatrix({
	      data: cdata,
	      size: clone(asize),
	      datatype: dt
	    });
	  };
	  
	  // recursive function
	  var _iterate = function (f, level, s, n, av, bv, inverse) {
	    // initialize array for this level
	    var cv = [];
	    // check we reach the last level
	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
	      }
	    }
	    else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
	      }
	    }
	    return cv;
	  };

	  return algorithm14;
	}

	exports.name = 'algorithm14';
	exports.factory = factory;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function factory (type, config, load, typed) {
	  
	  var smaller = load(__webpack_require__(60));
	  var larger = load(__webpack_require__(64));
	  
	  var oneOverLogPhi = 1.0 / Math.log((1.0 + Math.sqrt(5.0)) / 2.0);
	  
	  /**
	   * Fibonacci Heap implementation, used interally for Matrix math.
	   * @class FibonacciHeap
	   * @constructor FibonacciHeap
	   */
	  function FibonacciHeap() {
	    if (!(this instanceof FibonacciHeap))
	      throw new SyntaxError('Constructor must be called with the new operator');

	    // initialize fields
	    this._minimum = null;
	    this._size = 0;
	  }

	  /**
	   * Attach type information
	   */
	  FibonacciHeap.prototype.type = 'FibonacciHeap';
	  FibonacciHeap.prototype.isFibonacciHeap = true;

	  /**
	   * Inserts a new data element into the heap. No heap consolidation is
	   * performed at this time, the new node is simply inserted into the root
	   * list of this heap. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.insert = function (key, value) {
	    // create node
	    var node = {
	      key: key,
	      value: value,
	      degree: 0
	    };
	    // check we have a node in the minimum
	    if (this._minimum) {
	      // minimum node
	      var minimum = this._minimum;
	      // update left & right of node
	      node.left = minimum;
	      node.right = minimum.right;
	      minimum.right = node;
	      node.right.left = node;
	      // update minimum node in heap if needed
	      if (smaller(key, minimum.key)) {
	        // node has a smaller key, use it as minimum
	        this._minimum = node;
	      }
	    }
	    else {
	      // set left & right
	      node.left = node;
	      node.right = node;
	      // this is the first node
	      this._minimum = node;
	    }
	    // increment number of nodes in heap
	    this._size++;
	    // return node
	    return node;
	  };

	  /**
	   * Returns the number of nodes in heap. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.size = function () {
	    return this._size;
	  };

	  /**
	   * Removes all elements from this heap.
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.clear = function () {
	    this._minimum = null;
	    this._size = 0;
	  };

	  /**
	   * Returns true if the heap is empty, otherwise false.
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.isEmpty = function () {
	    return !!this._minimum;
	  };
	  
	  /**
	   * Extracts the node with minimum key from heap. Amortized running 
	   * time: O(log n).
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.extractMinimum = function () {
	    // node to remove
	    var node = this._minimum;
	    // check we have a minimum
	    if (node === null)
	      return node;
	    // current minimum
	    var minimum = this._minimum;
	    // get number of children
	    var numberOfChildren = node.degree;
	    // pointer to the first child
	    var x = node.child;
	    // for each child of node do...
	    while (numberOfChildren > 0) {
	      // store node in right side
	      var tempRight = x.right;
	      // remove x from child list
	      x.left.right = x.right;
	      x.right.left = x.left;
	      // add x to root list of heap
	      x.left = minimum;
	      x.right = minimum.right;
	      minimum.right = x;
	      x.right.left = x;
	      // set Parent[x] to null
	      x.parent = null;
	      x = tempRight;
	      numberOfChildren--;
	    }
	    // remove node from root list of heap
	    node.left.right = node.right;
	    node.right.left = node.left;
	    // update minimum
	    if (node == node.right) {
	      // empty
	      minimum = null;
	    }
	    else {
	      // update minimum
	      minimum = node.right;
	      // we need to update the pointer to the root with minimum key
	      minimum = _findMinimumNode(minimum, this._size);
	    }
	    // decrement size of heap
	    this._size--;
	    // update minimum
	    this._minimum = minimum;
	    // return node
	    return node;
	  };
	  
	  /**
	   * Removes a node from the heap given the reference to the node. The trees
	   * in the heap will be consolidated, if necessary. This operation may fail
	   * to remove the correct element if there are nodes with key value -Infinity.
	   * Running time: O(log n) amortized.
	   * @memberof FibonacciHeap
	   */
	  FibonacciHeap.prototype.remove = function (node) {
	    // decrease key value
	    this._minimum = _decreaseKey(this._minimum, node, -1);
	    // remove the smallest
	    this.extractMinimum();
	  };
	  
	  /**
	   * Decreases the key value for a heap node, given the new value to take on.
	   * The structure of the heap may be changed and will not be consolidated. 
	   * Running time: O(1) amortized.
	   * @memberof FibonacciHeap
	   */
	  var _decreaseKey = function (minimum, node, key) {
	    // set node key
	    node.key = key;
	    // get parent node
	    var parent = node.parent;
	    if (parent && smaller(node.key, parent.key)) {
	      // remove node from parent
	      _cut(minimum, node, parent);
	      // remove all nodes from parent to the root parent
	      _cascadingCut(minimum, parent);
	    }
	    // update minimum node if needed
	    if (smaller(node.key, minimum.key))
	      minimum = node;
	    // return minimum
	    return minimum;
	  };
	  
	  /**
	   * The reverse of the link operation: removes node from the child list of parent.
	   * This method assumes that min is non-null. Running time: O(1).
	   * @memberof FibonacciHeap
	   */
	  var _cut = function (minimum, node, parent) {
	    // remove node from parent children and decrement Degree[parent]
	    node.left.right = node.right;
	    node.right.left = node.left;
	    parent.degree--;
	    // reset y.child if necessary
	    if (parent.child == node)
	      parent.child = node.right;
	    // remove child if degree is 0
	    if (parent.degree === 0)
	      parent.child = null;
	    // add node to root list of heap
	    node.left = minimum;
	    node.right = minimum.right;
	    minimum.right = node;
	    node.right.left = node;
	    // set parent[node] to null
	    node.parent = null;
	    // set mark[node] to false
	    node.mark = false;
	  };
	  
	  /**
	   * Performs a cascading cut operation. This cuts node from its parent and then
	   * does the same for its parent, and so on up the tree.
	   * Running time: O(log n); O(1) excluding the recursion.
	   * @memberof FibonacciHeap
	   */
	  var _cascadingCut= function (minimum, node) {
	    // store parent node
	    var parent = node.parent;
	    // if there's a parent...
	    if (!parent)
	      return;
	    // if node is unmarked, set it marked
	    if (!node.mark) {
	      node.mark = true;
	    }
	    else {
	      // it's marked, cut it from parent
	      _cut(minimum, node, parent);
	      // cut its parent as well
	      _cascadingCut(parent);
	    }
	  };
	  
	  /**
	   * Make the first node a child of the second one. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */
	  var _linkNodes = function (node, parent) {
	    // remove node from root list of heap
	    node.left.right = node.right;
	    node.right.left = node.left;
	    // make node a Child of parent
	    node.parent = parent;
	    if (!parent.child) {
	      parent.child = node;
	      node.right = node;
	      node.left = node;
	    }
	    else {
	      node.left = parent.child;
	      node.right = parent.child.right;
	      parent.child.right = node;
	      node.right.left = node;
	    }
	    // increase degree[parent]
	    parent.degree++;
	    // set mark[node] false
	    node.mark = false;
	  };
	  
	  var _findMinimumNode = function (minimum, size) {
	    // to find trees of the same degree efficiently we use an array of length O(log n) in which we keep a pointer to one root of each degree
	    var arraySize = Math.floor(Math.log(size) * oneOverLogPhi) + 1;
	    // create list with initial capacity
	    var array = new Array(arraySize);
	    // find the number of root nodes.
	    var numRoots = 0;
	    var x = minimum;
	    if (x) {
	      numRoots++;
	      x = x.right;
	      while (x !== minimum) {
	        numRoots++;
	        x = x.right;
	      }
	    }
	    // vars
	    var y;
	    // For each node in root list do...
	    while (numRoots > 0) {
	      // access this node's degree..
	      var d = x.degree;
	      // get next node
	      var next = x.right;
	      // check if there is a node already in array with the same degree
	      while (true) {
	        // get node with the same degree is any
	        y = array[d];
	        if (!y)
	          break;
	        // make one node with the same degree a child of the other, do this based on the key value.
	        if (larger(x.key, y.key)) {
	          var temp = y;
	          y = x;
	          x = temp;
	        }
	        // make y a child of x
	        _linkNodes(y, x);
	        // we have handled this degree, go to next one.
	        array[d] = null;
	        d++;
	      }
	      // save this node for later when we might encounter another of the same degree.
	      array[d] = x;
	      // move forward through list.
	      x = next;
	      numRoots--;
	    }
	    // Set min to null (effectively losing the root list) and reconstruct the root list from the array entries in array[].
	    minimum = null;
	    // loop nodes in array
	    for (var i = 0; i < arraySize; i++) {
	      // get current node
	      y = array[i];
	      if (!y)
	        continue;
	      // check if we have a linked list
	      if (minimum) {
	        // First remove node from root list.
	        y.left.right = y.right;
	        y.right.left = y.left;
	        // now add to root list, again.
	        y.left = minimum;
	        y.right = minimum.right;
	        minimum.right = y;
	        y.right.left = y;
	        // check if this is a new min.
	        if (smaller(y.key, minimum.key))
	          minimum = y;
	      }
	      else
	        minimum = y;
	    }
	    return minimum;
	  };
	  
	  return FibonacciHeap;
	}

	exports.name = 'FibonacciHeap';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(6).nearlyEqual;
	var bigNearlyEqual = __webpack_require__(49);

	function factory (type, config, load, typed) {

	  var matrix = load(__webpack_require__(52));

	  var algorithm03 = load(__webpack_require__(61));
	  var algorithm07 = load(__webpack_require__(62));
	  var algorithm12 = load(__webpack_require__(63));
	  var algorithm13 = load(__webpack_require__(57));
	  var algorithm14 = load(__webpack_require__(58));

	  var latex = __webpack_require__(32);

	  /**
	   * Test whether value x is smaller than y.
	   *
	   * The function returns true when x is smaller than y and the relative
	   * difference between x and y is smaller than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.smaller(x, y)
	   *
	   * Examples:
	   *
	   *    math.smaller(2, 3);            // returns true
	   *    math.smaller(5, 2 * 2);        // returns false
	   *
	   *    var a = math.unit('5 cm');
	   *    var b = math.unit('2 inch');
	   *    math.smaller(a, b);            // returns true
	   *
	   * See also:
	   *
	   *    equal, unequal, smallerEq, smaller, smallerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
	   */
	  var smaller = typed('smaller', {

	    'boolean, boolean': function (x, y) {
	      return x < y;
	    },

	    'number, number': function (x, y) {
	      return x < y && !nearlyEqual(x, y, config.epsilon);
	    },

	    'BigNumber, BigNumber': function (x, y) {
	      return x.lt(y) && !bigNearlyEqual(x, y, config.epsilon);
	    },

	    'Fraction, Fraction': function (x, y) {
	      return x.compare(y) === -1;
	    },

	    'Complex, Complex': function (x, y) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },

	    'Unit, Unit': function (x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return smaller(x.value, y.value);
	    },

	    'string, string': function (x, y) {
	      return x < y;
	    },

	    'Matrix, Matrix': function (x, y) {
	      // result
	      var c;

	      // process matrix storage
	      switch (x.storage()) {
	        case 'sparse':
	          switch (y.storage()) {
	            case 'sparse':
	              // sparse + sparse
	              c = algorithm07(x, y, smaller);
	              break;
	            default:
	              // sparse + dense
	              c = algorithm03(y, x, smaller, true);
	              break;
	          }
	          break;
	        default:
	          switch (y.storage()) {
	            case 'sparse':
	              // dense + sparse
	              c = algorithm03(x, y, smaller, false);
	              break;
	            default:
	              // dense + dense
	              c = algorithm13(x, y, smaller);
	              break;
	          }
	          break;
	      }
	      return c;
	    },

	    'Array, Array': function (x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), matrix(y)).valueOf();
	    },

	    'Array, Matrix': function (x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), y);
	    },

	    'Matrix, Array': function (x, y) {
	      // use matrix implementation
	      return smaller(x, matrix(y));
	    },

	    'Matrix, any': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (x.storage()) {
	        case 'sparse':
	          c = algorithm12(x, y, smaller, false);
	          break;
	        default:
	          c = algorithm14(x, y, smaller, false);
	          break;
	      }
	      return c;
	    },

	    'any, Matrix': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (y.storage()) {
	        case 'sparse':
	          c = algorithm12(y, x, smaller, true);
	          break;
	        default:
	          c = algorithm14(y, x, smaller, true);
	          break;
	      }
	      return c;
	    },

	    'Array, any': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, smaller, false).valueOf();
	    },

	    'any, Array': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, smaller, true).valueOf();
	    }
	  });

	  smaller.toTex = {
	    2: '\\left(${args[0]}' + latex.operators['smaller'] + '${args[1]}\\right)'
	  };

	  return smaller;
	}

	exports.name = 'smaller';
	exports.factory = factory;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(42);

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix items and invokes the callback function f(Dij, Sij).
	   * Callback function invoked M*N times.
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  f(Dij, 0)    ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (C)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */
	  var algorithm03 = function (denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype;
	    // sparse matrix arrays
	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype;

	    // validate dimensions
	    if (asize.length !== bsize.length)
	      throw new DimensionError(asize.length, bsize.length);

	    // check rows & columns
	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');

	    // sparse matrix cannot be a Pattern matrix
	    if (!bvalues)
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // datatype
	    var dt;
	    // zero value
	    var zero = 0;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }

	    // result (DenseMatrix)
	    var cdata = [];

	    // initialize dense matrix
	    for (var z = 0; z < rows; z++) {
	      // initialize row
	      cdata[z] = [];
	    }

	    // workspace
	    var x = [];
	    // marks indicating we have a value in x for a given column
	    var w = [];

	    // loop columns in b
	    for (var j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1;
	      // values in column j
	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var i = bindex[k];
	        // update workspace
	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
	        w[i] = mark;
	      }
	      // process workspace
	      for (var y = 0; y < rows; y++) {
	        // check we have a calculated value for current row
	        if (w[y] === mark) {
	          // use calculated value
	          cdata[y][j] = x[y];
	        }
	        else {
	          // calculate value
	          cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
	        }
	      }
	    }

	    // return dense matrix
	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	  
	  return algorithm03;
	}

	exports.name = 'algorithm03';
	exports.factory = factory;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DimensionError = __webpack_require__(42);

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B items (zero and nonzero) and invokes the callback function f(Aij, Bij). 
	   * Callback function invoked MxN times.
	   *
	   * C(i,j) = f(Aij, Bij)
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */
	  var algorithm07 = function (a, b, callback) {
	    // sparse matrix arrays
	    var asize = a._size;
	    var adt = a._datatype;
	    // sparse matrix arrays
	    var bsize = b._size;
	    var bdt = b._datatype;

	    // validate dimensions
	    if (asize.length !== bsize.length)
	      throw new DimensionError(asize.length, bsize.length);

	    // check rows & columns
	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // datatype
	    var dt;
	    // zero value
	    var zero = 0;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt;
	      // convert 0 to the same datatype
	      zero = typed.convert(0, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }

	    // vars
	    var i, j;
	    
	    // result arrays
	    var cdata = [];
	    // initialize c
	    for (i = 0; i < rows; i++)
	      cdata[i] = [];

	    // matrix
	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });

	    // workspaces
	    var xa = [];
	    var xb = [];
	    // marks indicating we have a value in x for a given column
	    var wa = [];
	    var wb = [];

	    // loop columns
	    for (j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1;
	      // scatter the values of A(:,j) into workspace
	      _scatter(a, j, wa, xa, mark);
	      // scatter the values of B(:,j) into workspace
	      _scatter(b, j, wb, xb, mark);
	      // loop rows
	      for (i = 0; i < rows; i++) {
	        // matrix values @ i,j
	        var va = wa[i] === mark ? xa[i] : zero;
	        var vb = wb[i] === mark ? xb[i] : zero;
	        // invoke callback
	        cdata[i][j] = cf(va, vb);
	      }          
	    }

	    // return sparse matrix
	    return c;
	  };
	  
	  var _scatter = function (m, j, w, x, mark) {
	    // a arrays
	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr;
	    // loop values in column j
	    for (var k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
	      // row
	      var i = index[k];
	      // update workspace
	      w[i] = mark;
	      x[i] = values[k];
	    }
	  };
	  
	  return algorithm07;
	}

	exports.name = 'algorithm07';
	exports.factory = factory;


/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {

	  var DenseMatrix = type.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b). 
	   * Callback function invoked MxN times.
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤  
	   *          └  f(0, b)    ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */
	  var algorithm12 = function (s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype;

	    // sparse matrix cannot be a Pattern matrix
	    if (!avalues)
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');

	    // rows & columns
	    var rows = asize[0];
	    var columns = asize[1];

	    // datatype
	    var dt;
	    // callback signature to use
	    var cf = callback;

	    // process data types
	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt;
	      // convert b to the same datatype
	      b = typed.convert(b, dt);
	      // callback
	      cf = typed.find(callback, [dt, dt]);
	    }
	    
	    // result arrays
	    var cdata = [];
	    // matrix
	    var c = new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });

	    // workspaces
	    var x = [];
	    // marks indicating we have a value in x for a given column
	    var w = [];

	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1;
	      // values in j
	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k];
	        // update workspace
	        x[r] = avalues[k];
	        w[r] = mark;
	      }
	      // loop rows
	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        }
	        // check sparse matrix has a value @ i,j
	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        }
	        else {
	          // dense matrix value @ i, j
	          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
	        }
	      }
	    }

	    // return sparse matrix
	    return c;
	  };
	  
	  return algorithm12;
	}

	exports.name = 'algorithm12';
	exports.factory = factory;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nearlyEqual = __webpack_require__(6).nearlyEqual;
	var bigNearlyEqual = __webpack_require__(49);

	function factory (type, config, load, typed) {
	  
	  var matrix = load(__webpack_require__(52));

	  var algorithm03 = load(__webpack_require__(61));
	  var algorithm07 = load(__webpack_require__(62));
	  var algorithm12 = load(__webpack_require__(63));
	  var algorithm13 = load(__webpack_require__(57));
	  var algorithm14 = load(__webpack_require__(58));

	  var latex = __webpack_require__(32);

	  /**
	   * Test whether value x is larger than y.
	   *
	   * The function returns true when x is larger than y and the relative
	   * difference between x and y is larger than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.larger(x, y)
	   *
	   * Examples:
	   *
	   *    math.larger(2, 3);             // returns false
	   *    math.larger(5, 2 + 2);         // returns true
	   *
	   *    var a = math.unit('5 cm');
	   *    var b = math.unit('2 inch');
	   *    math.larger(a, b);             // returns false
	   *
	   * See also:
	   *
	   *    equal, unequal, smaller, smallerEq, largerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is larger than y, else returns false
	   */
	  var larger = typed('larger', {

	    'boolean, boolean': function (x, y) {
	      return x > y;
	    },

	    'number, number': function (x, y) {
	      return x > y && !nearlyEqual(x, y, config.epsilon);
	    },

	    'BigNumber, BigNumber': function (x, y) {
	      return x.gt(y) && !bigNearlyEqual(x, y, config.epsilon);
	    },

	    'Fraction, Fraction': function (x, y) {
	      return x.compare(y) === 1;
	    },

	    'Complex, Complex': function () {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },

	    'Unit, Unit': function (x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }
	      return larger(x.value, y.value);
	    },

	    'string, string': function (x, y) {
	      return x > y;
	    },

	    'Matrix, Matrix': function (x, y) {
	      // result
	      var c;

	      // process matrix storage
	      switch (x.storage()) {
	        case 'sparse':
	          switch (y.storage()) {
	            case 'sparse':
	              // sparse + sparse
	              c = algorithm07(x, y, larger);
	              break;
	            default:
	              // sparse + dense
	              c = algorithm03(y, x, larger, true);
	              break;
	          }
	          break;
	        default:
	          switch (y.storage()) {
	            case 'sparse':
	              // dense + sparse
	              c = algorithm03(x, y, larger, false);
	              break;
	            default:
	              // dense + dense
	              c = algorithm13(x, y, larger);
	              break;
	          }
	          break;
	      }
	      return c;
	    },

	    'Array, Array': function (x, y) {
	      // use matrix implementation
	      return larger(matrix(x), matrix(y)).valueOf();
	    },

	    'Array, Matrix': function (x, y) {
	      // use matrix implementation
	      return larger(matrix(x), y);
	    },

	    'Matrix, Array': function (x, y) {
	      // use matrix implementation
	      return larger(x, matrix(y));
	    },

	    'Matrix, any': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (x.storage()) {
	        case 'sparse':
	          c = algorithm12(x, y, larger, false);
	          break;
	        default:
	          c = algorithm14(x, y, larger, false);
	          break;
	      }
	      return c;
	    },

	    'any, Matrix': function (x, y) {
	      // result
	      var c;
	      // check storage format
	      switch (y.storage()) {
	        case 'sparse':
	          c = algorithm12(y, x, larger, true);
	          break;
	        default:
	          c = algorithm14(y, x, larger, true);
	          break;
	      }
	      return c;
	    },

	    'Array, any': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, larger, false).valueOf();
	    },

	    'any, Array': function (x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, larger, true).valueOf();
	    }
	  });

	  larger.toTex = {
	    2: '\\left(${args[0]}' + latex.operators['larger'] + '${args[1]}\\right)'
	  };

	  return larger;
	}

	exports.name = 'larger';
	exports.factory = factory;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(39);

	var string = util.string;
	var object = util.object;

	var isArray = Array.isArray;
	var isString = string.isString;

	function factory (type, config, load) {

	  var DenseMatrix = load(__webpack_require__(46));

	  var smaller = load(__webpack_require__(60));

	  function ImmutableDenseMatrix(data, datatype) {
	    if (!(this instanceof ImmutableDenseMatrix))
	      throw new SyntaxError('Constructor must be called with the new operator');
	    if (datatype && !isString(datatype))
	      throw new Error('Invalid datatype: ' + datatype);

	    if ((data && data.isMatrix === true) || isArray(data)) {
	      // use DenseMatrix implementation
	      var matrix = new DenseMatrix(data, datatype);
	      // internal structures
	      this._data = matrix._data;
	      this._size = matrix._size;
	      this._datatype = matrix._datatype;
	      this._min = null;
	      this._max = null;
	    }
	    else if (data && isArray(data.data) && isArray(data.size)) {
	      // initialize fields from JSON representation
	      this._data = data.data;
	      this._size = data.size;
	      this._datatype = data.datatype;
	      this._min = typeof data.min !== 'undefined' ? data.min : null;
	      this._max = typeof data.max !== 'undefined' ? data.max : null;
	    }
	    else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
	    }
	    else {
	      // nothing provided
	      this._data = [];
	      this._size = [0];
	      this._datatype = datatype;
	      this._min = null;
	      this._max = null;
	    }
	  }

	  ImmutableDenseMatrix.prototype = new DenseMatrix();

	  /**
	   * Attach type information
	   */
	  ImmutableDenseMatrix.prototype.type = 'ImmutableDenseMatrix';
	  ImmutableDenseMatrix.prototype.isImmutableDenseMatrix = true;

	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     var subset = matrix.subset(index)               // retrieve subset
	   *     var value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @param {Index} index
	   * @param {Array | ImmutableDenseMatrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */
	  ImmutableDenseMatrix.prototype.subset = function (index) {
	    switch (arguments.length) {
	      case 1:
	        // use base implementation
	        var m = DenseMatrix.prototype.subset.call(this, index);
	        // check result is a matrix
	        if (m.isMatrix) {
	          // return immutable matrix
	          return new ImmutableDenseMatrix({
	            data: m._data,
	            size: m._size,
	            datatype: m._datatype
	          });
	        }
	        return m;
	        
	        // intentional fall through
	      case 2:
	      case 3:
	        throw new Error('Cannot invoke set subset on an Immutable Matrix instance');

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };

	  /**
	   * Replace a single element in the matrix.
	   * @param {Number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {ImmutableDenseMatrix} self
	   */
	  ImmutableDenseMatrix.prototype.set = function () {
	    throw new Error('Cannot invoke set on an Immutable Matrix instance');
	  };

	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @param {Number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */
	  ImmutableDenseMatrix.prototype.resize = function () {
	    throw new Error('Cannot invoke resize on an Immutable Matrix instance');
	  };

	  /**
	   * Create a clone of the matrix
	   * @return {ImmutableDenseMatrix} clone
	   */
	  ImmutableDenseMatrix.prototype.clone = function () {
	    var m = new ImmutableDenseMatrix({
	      data: object.clone(this._data),
	      size: object.clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };

	  /**
	   * Get a JSON representation of the matrix
	   * @returns {Object}
	   */
	  ImmutableDenseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'ImmutableDenseMatrix',
	      data: this._data,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };

	  /**
	   * Generate a matrix from a JSON object
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "ImmutableDenseMatrix", data: [], size: []}`,
	   *                       where mathjs is optional
	   * @returns {ImmutableDenseMatrix}
	   */
	  ImmutableDenseMatrix.fromJSON = function (json) {
	    return new ImmutableDenseMatrix(json);
	  };

	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @param {Number} i       Matrix row index 1
	   * @param {Number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */
	  ImmutableDenseMatrix.prototype.swapRows = function () {
	    throw new Error('Cannot invoke swapRows on an Immutable Matrix instance');
	  };

	  /**
	   * Calculate the minimum value in the set
	   * @return {Number | undefined} min
	   */
	  ImmutableDenseMatrix.prototype.min = function () {
	    // check min has been calculated before
	    if (this._min === null) {
	      // minimum
	      var m = null;
	      // compute min
	      this.forEach(function (v) {
	        if (m === null || smaller(v, m))
	          m = v;
	      });
	      this._min = m !== null ? m : undefined;
	    }
	    return this._min;
	  };

	  /**
	   * Calculate the maximum value in the set
	   * @return {Number | undefined} max
	   */
	  ImmutableDenseMatrix.prototype.max = function () {
	    // check max has been calculated before
	    if (this._max === null) {
	      // maximum
	      var m = null;
	      // compute max
	      this.forEach(function (v) {
	        if (m === null || smaller(m, v))
	          m = v;
	      });
	      this._max = m !== null ? m : undefined;
	    }
	    return this._max;
	  };

	  // exports
	  return ImmutableDenseMatrix;
	}

	exports.name = 'ImmutableDenseMatrix';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clone = __webpack_require__(3).clone;
	var isInteger = __webpack_require__(6).isInteger;

	function factory (type) {
	  
	  /**
	   * Create an index. An Index can store ranges and sets for multiple dimensions.
	   * Matrix.get, Matrix.set, and math.subset accept an Index as input.
	   *
	   * Usage:
	   *     var index = new Index(range1, range2, matrix1, array1, ...);
	   *
	   * Where each parameter can be any of:
	   *     A number
	   *     A string (containing a name of an object property)
	   *     An instance of Range
	   *     An Array with the Set values
	   *     A Matrix with the Set values
	   *
	   * The parameters start, end, and step must be integer numbers.
	   *
	   * @class Index
	   * @Constructor Index
	   * @param {...*} ranges
	   */
	  function Index(ranges) {
	    if (!(this instanceof Index)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    this._dimensions = [];
	    this._isScalar = true;

	    for (var i = 0, ii = arguments.length; i < ii; i++) {
	      var arg = arguments[i];

	      if (arg && (arg.isRange === true)) {
	        this._dimensions.push(arg);
	        this._isScalar = false;
	      }
	      else if (arg && (Array.isArray(arg) || arg.isMatrix === true)) {
	        // create matrix
	        var m = _createImmutableMatrix(arg.valueOf());
	        this._dimensions.push(m);
	        // size
	        var size = m.size();
	        // scalar
	        if (size.length !== 1 || size[0] !== 1) {
	          this._isScalar = false;
	        }
	      }
	      else if (typeof arg === 'number') {
	        this._dimensions.push(_createImmutableMatrix([arg]));
	      }
	      else if (typeof arg === 'string') {
	        // object property (arguments.count should be 1)
	        this._dimensions.push(arg);
	      }
	      // TODO: implement support for wildcard '*'
	      else {
	        throw new TypeError('Dimension must be an Array, Matrix, number, string, or Range');
	      }
	    }
	  }

	  /**
	   * Attach type information
	   */
	  Index.prototype.type = 'Index';
	  Index.prototype.isIndex = true;

	  function _createImmutableMatrix(arg) {
	    // loop array elements
	    for (var i = 0, l = arg.length; i < l; i++) {
	      if (typeof arg[i] !== 'number' || !isInteger(arg[i])) {
	        throw new TypeError('Index parameters must be positive integer numbers');
	      }
	    }
	    // create matrix
	    return new type.ImmutableDenseMatrix(arg);
	  }

	  /**
	   * Create a clone of the index
	   * @memberof Index
	   * @return {Index} clone
	   */
	  Index.prototype.clone = function () {
	    var index = new Index();
	    index._dimensions = clone(this._dimensions);
	    index._isScalar = this._isScalar;
	    return index;
	  };

	  /**
	   * Create an index from an array with ranges/numbers
	   * @memberof Index
	   * @param {Array.<Array | number>} ranges
	   * @return {Index} index
	   * @private
	   */
	  Index.create = function (ranges) {
	    var index = new Index();
	    Index.apply(index, ranges);
	    return index;
	  };

	  /**
	   * Retrieve the size of the index, the number of elements for each dimension.
	   * @memberof Index
	   * @returns {number[]} size
	   */
	  Index.prototype.size = function () {
	    var size = [];

	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      var d = this._dimensions[i];
	      size[i] = (typeof d === 'string') ? 1 : d.size()[0];
	    }

	    return size;
	  };

	  /**
	   * Get the maximum value for each of the indexes ranges.
	   * @memberof Index
	   * @returns {number[]} max
	   */
	  Index.prototype.max = function () {
	    var values = [];

	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      var range = this._dimensions[i];
	      values[i] = (typeof range === 'string') ? range : range.max();
	    }

	    return values;
	  };

	  /**
	   * Get the minimum value for each of the indexes ranges.
	   * @memberof Index
	   * @returns {number[]} min
	   */
	  Index.prototype.min = function () {
	    var values = [];

	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      var range = this._dimensions[i];
	      values[i] = (typeof range === 'string') ? range : range.min();
	    }

	    return values;
	  };

	  /**
	   * Loop over each of the ranges of the index
	   * @memberof Index
	   * @param {Function} callback   Called for each range with a Range as first
	   *                              argument, the dimension as second, and the
	   *                              index object as third.
	   */
	  Index.prototype.forEach = function (callback) {
	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      callback(this._dimensions[i], i, this);
	    }
	  };

	  /**
	   * Retrieve the dimension for the given index
	   * @memberof Index
	   * @param {Number} dim                  Number of the dimension
	   * @returns {Range | null} range
	   */
	  Index.prototype.dimension = function (dim) {
	    return this._dimensions[dim] || null;
	  };

	  /**
	   * Test whether this index contains an object property
	   * @returns {boolean} Returns true if the index is an object property
	   */
	  Index.prototype.isObjectProperty = function () {
	    return this._dimensions.length === 1 && typeof this._dimensions[0] === 'string';
	  };

	  /**
	   * Returns the object property name when the Index holds a single object property,
	   * else returns null
	   * @returns {string | null}
	   */
	  Index.prototype.getObjectProperty = function () {
	    return this.isObjectProperty() ? this._dimensions[0] : null;
	  };

	  /**
	   * Test whether this index contains only a single value.
	   *
	   * This is the case when the index is created with only scalar values as ranges,
	   * not for ranges resolving into a single value.
	   * @memberof Index
	   * @return {boolean} isScalar
	   */
	  Index.prototype.isScalar = function () {
	    return this._isScalar;
	  };

	  /**
	   * Expand the Index into an array.
	   * For example new Index([0,3], [2,7]) returns [[0,1,2], [2,3,4,5,6]]
	   * @memberof Index
	   * @returns {Array} array
	   */
	  Index.prototype.toArray = function () {
	    var array = [];
	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      var dimension = this._dimensions[i];
	      array.push((typeof dimension === 'string') ? dimension : dimension.toArray());
	    }
	    return array;
	  };

	  /**
	   * Get the primitive value of the Index, a two dimensional array.
	   * Equivalent to Index.toArray().
	   * @memberof Index
	   * @returns {Array} array
	   */
	  Index.prototype.valueOf = Index.prototype.toArray;

	  /**
	   * Get the string representation of the index, for example '[2:6]' or '[0:2:10, 4:7, [1,2,3]]'
	   * @memberof Index
	   * @returns {String} str
	   */
	  Index.prototype.toString = function () {
	    var strings = [];

	    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
	      var dimension = this._dimensions[i];
	      if (typeof dimension === 'string') {
	        strings.push(JSON.stringify(dimension));
	      }
	      else {
	        strings.push(dimension.toString());
	      }
	    }

	    return '[' + strings.join(', ') + ']';
	  };

	  /**
	   * Get a JSON representation of the Index
	   * @memberof Index
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Index", "ranges": [{"mathjs": "Range", start: 0, end: 10, step:1}, ...]}`
	   */
	  Index.prototype.toJSON = function () {
	    return {
	      mathjs: 'Index',
	      dimensions: this._dimensions
	    };
	  };

	  /**
	   * Instantiate an Index from a JSON object
	   * @memberof Index
	   * @param {Object} json A JSON object structured as:
	   *                     `{"mathjs": "Index", "dimensions": [{"mathjs": "Range", start: 0, end: 10, step:1}, ...]}`
	   * @return {Index}
	   */
	  Index.fromJSON = function (json) {
	    return Index.create(json.dimensions);
	  };

	  return Index;
	}

	exports.name = 'Index';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var number = __webpack_require__(6);

	function factory (type, config, load, typed) {
	  /**
	   * Create a range. A range has a start, step, and end, and contains functions
	   * to iterate over the range.
	   *
	   * A range can be constructed as:
	   *     var range = new Range(start, end);
	   *     var range = new Range(start, end, step);
	   *
	   * To get the result of the range:
	   *     range.forEach(function (x) {
	   *         console.log(x);
	   *     });
	   *     range.map(function (x) {
	   *         return math.sin(x);
	   *     });
	   *     range.toArray();
	   *
	   * Example usage:
	   *     var c = new Range(2, 6);         // 2:1:5
	   *     c.toArray();                     // [2, 3, 4, 5]
	   *     var d = new Range(2, -3, -1);    // 2:-1:-2
	   *     d.toArray();                     // [2, 1, 0, -1, -2]
	   *
	   * @class Range
	   * @constructor Range
	   * @param {number} start  included lower bound
	   * @param {number} end    excluded upper bound
	   * @param {number} [step] step size, default value is 1
	   */
	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    if (start != null) {
	      if (start.isBigNumber === true)
	        start = start.toNumber();
	      else if (typeof start !== 'number')
	        throw new TypeError('Parameter start must be a number');
	    }
	    if (end != null) {
	      if (end.isBigNumber === true)
	        end = end.toNumber();
	      else if (typeof end !== 'number')
	        throw new TypeError('Parameter end must be a number');
	    }
	    if (step != null) {
	      if (step.isBigNumber === true)
	        step = step.toNumber();
	      else if (typeof step !== 'number')
	        throw new TypeError('Parameter step must be a number');
	    }

	    this.start = (start != null) ? parseFloat(start) : 0;
	    this.end   = (end != null)   ? parseFloat(end)   : 0;
	    this.step  = (step != null)  ? parseFloat(step)  : 1;
	  }

	  /**
	   * Attach type information
	   */
	  Range.prototype.type = 'Range';
	  Range.prototype.isRange = true;

	  /**
	   * Parse a string into a range,
	   * The string contains the start, optional step, and end, separated by a colon.
	   * If the string does not contain a valid range, null is returned.
	   * For example str='0:2:11'.
	   * @memberof Range
	   * @param {string} str
	   * @return {Range | null} range
	   */
	  Range.parse = function (str) {
	    if (typeof str !== 'string') {
	      return null;
	    }

	    var args = str.split(':');
	    var nums = args.map(function (arg) {
	      return parseFloat(arg);
	    });

	    var invalid = nums.some(function (num) {
	      return isNaN(num);
	    });
	    if (invalid) {
	      return null;
	    }

	    switch (nums.length) {
	      case 2:
	        return new Range(nums[0], nums[1]);
	      case 3:
	        return new Range(nums[0], nums[2], nums[1]);
	      default:
	        return null;
	    }
	  };

	  /**
	   * Create a clone of the range
	   * @return {Range} clone
	   */
	  Range.prototype.clone = function () {
	    return new Range(this.start, this.end, this.step);
	  };

	  /**
	   * Retrieve the size of the range.
	   * Returns an array containing one number, the number of elements in the range.
	   * @memberof Range
	   * @returns {number[]} size
	   */
	  Range.prototype.size = function () {
	    var len = 0,
	        start = this.start,
	        step = this.step,
	        end = this.end,
	        diff = end - start;

	    if (number.sign(step) == number.sign(diff)) {
	      len = Math.ceil((diff) / step);
	    }
	    else if (diff == 0) {
	      len = 0;
	    }

	    if (isNaN(len)) {
	      len = 0;
	    }
	    return [len];
	  };

	  /**
	   * Calculate the minimum value in the range
	   * @memberof Range
	   * @return {number | undefined} min
	   */
	  Range.prototype.min = function () {
	    var size = this.size()[0];

	    if (size > 0) {
	      if (this.step > 0) {
	        // positive step
	        return this.start;
	      }
	      else {
	        // negative step
	        return this.start + (size - 1) * this.step;
	      }
	    }
	    else {
	      return undefined;
	    }
	  };

	  /**
	   * Calculate the maximum value in the range
	   * @memberof Range
	   * @return {number | undefined} max
	   */
	  Range.prototype.max = function () {
	    var size = this.size()[0];

	    if (size > 0) {
	      if (this.step > 0) {
	        // positive step
	        return this.start + (size - 1) * this.step;
	      }
	      else {
	        // negative step
	        return this.start;
	      }
	    }
	    else {
	      return undefined;
	    }
	  };


	  /**
	   * Execute a callback function for each value in the range.
	   * @memberof Range
	   * @param {function} callback   The callback method is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Range being traversed.
	   */
	  Range.prototype.forEach = function (callback) {
	    var x = this.start;
	    var step = this.step;
	    var end = this.end;
	    var i = 0;

	    if (step > 0) {
	      while (x < end) {
	        callback(x, [i], this);
	        x += step;
	        i++;
	      }
	    }
	    else if (step < 0) {
	      while (x > end) {
	        callback(x, [i], this);
	        x += step;
	        i++;
	      }
	    }
	  };

	  /**
	   * Execute a callback function for each value in the Range, and return the
	   * results as an array
	   * @memberof Range
	   * @param {function} callback   The callback method is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @returns {Array} array
	   */
	  Range.prototype.map = function (callback) {
	    var array = [];
	    this.forEach(function (value, index, obj) {
	      array[index[0]] = callback(value, index, obj);
	    });
	    return array;
	  };

	  /**
	   * Create an Array with a copy of the Ranges data
	   * @memberof Range
	   * @returns {Array} array
	   */
	  Range.prototype.toArray = function () {
	    var array = [];
	    this.forEach(function (value, index) {
	      array[index[0]] = value;
	    });
	    return array;
	  };

	  /**
	   * Get the primitive value of the Range, a one dimensional array
	   * @memberof Range
	   * @returns {Array} array
	   */
	  Range.prototype.valueOf = function () {
	    // TODO: implement a caching mechanism for range.valueOf()
	    return this.toArray();
	  };

	  /**
	   * Get a string representation of the range, with optional formatting options.
	   * Output is formatted as 'start:step:end', for example '2:6' or '0:0.2:11'
	   * @memberof Range
	   * @param {Object | number | function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */
	  Range.prototype.format = function (options) {
	    var str = number.format(this.start, options);

	    if (this.step != 1) {
	      str += ':' + number.format(this.step, options);
	    }
	    str += ':' + number.format(this.end, options);
	    return str;
	  };

	  /**
	   * Get a string representation of the range.
	   * @memberof Range
	   * @returns {string}
	   */
	  Range.prototype.toString = function () {
	    return this.format();
	  };

	  /**
	   * Get a JSON representation of the range
	   * @memberof Range
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
	   */
	  Range.prototype.toJSON = function () {
	    return {
	      mathjs: 'Range',
	      start: this.start,
	      end: this.end,
	      step: this.step
	    };
	  };

	  /**
	   * Instantiate a Range from a JSON object
	   * @memberof Range
	   * @param {Object} json A JSON object structured as:
	   *                      `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
	   * @return {Range}
	   */
	  Range.fromJSON = function (json) {
	    return new Range(json.start, json.end, json.step);
	  };

	  return Range;
	}

	exports.name = 'Range';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {
	  /**
	   * Create an index. An Index can store ranges having start, step, and end
	   * for multiple dimensions.
	   * Matrix.get, Matrix.set, and math.subset accept an Index as input.
	   *
	   * Syntax:
	   *
	   *     math.index(range1, range2, ...)
	   *
	   * Where each range can be any of:
	   *
	   * - A number
	   * - A string for getting/setting an object property
	   * - An instance of `Range`
	   * - A one-dimensional Array or a Matrix with numbers
	   *
	   * Indexes must be zero-based, integer numbers.
	   *
	   * Examples:
	   *
	   *    var math = math.js
	   *
	   *    var b = [1, 2, 3, 4, 5];
	   *    math.subset(b, math.index([1, 2, 3]));     // returns [2, 3, 4]
	   *
	   *    var a = math.matrix([[1, 2], [3, 4]]);
	   *    a.subset(math.index(0, 1));             // returns 2
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, matrix, number, string, unit
	   *
	   * @param {...*} ranges   Zero or more ranges or numbers.
	   * @return {Index}        Returns the created index
	   */
	  return typed('index', {
	    '...number | string | BigNumber | Range | Array | Matrix': function (args) {
	      var ranges = args.map(function (arg) {
	        if (arg && arg.isBigNumber === true) {
	          return arg.toNumber(); // convert BigNumber to Number
	        }
	        else if (arg && (Array.isArray(arg) || arg.isMatrix === true)) {
	          return arg.map(function (elem) {
	            // convert BigNumber to Number
	            return (elem && elem.isBigNumber === true) ? elem.toNumber() : elem;
	          });
	        }
	        else {
	          return arg;
	        }
	      });

	      var res = new type.Index();
	      type.Index.apply(res, ranges);
	      return res;
	    }
	  });
	}

	exports.name = 'index';
	exports.factory = factory;


/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {

	  var SparseMatrix = type.SparseMatrix;

	  /**
	   * Create a Sparse Matrix. The function creates a new `math.type.Matrix` object from
	   * an `Array`. A Matrix has utility functions to manipulate the data in the
	   * matrix, like getting the size and getting or setting values in the matrix.
	   *
	   * Syntax:
	   *
	   *    math.sparse()               // creates an empty sparse matrix.
	   *    math.sparse(data)           // creates a sparse matrix with initial data.
	   *    math.sparse(data, 'number') // creates a sparse matrix with initial data, number datatype.
	   *
	   * Examples:
	   *
	   *    var m = math.sparse([[1, 2], [3, 4]]);
	   *    m.size();                        // Array [2, 2]
	   *    m.resize([3, 2], 5);
	   *    m.valueOf();                     // Array [[1, 2], [3, 4], [5, 5]]
	   *    m.get([1, 0])                    // number 3
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, number, string, unit, matrix
	   *
	   * @param {Array | Matrix} [data]    A two dimensional array
	   *
	   * @return {Matrix} The created matrix
	   */
	  var sparse = typed('sparse', {
	    '': function () {
	      return new SparseMatrix([]);
	    },
	    
	    'string': function (datatype) {
	      return new SparseMatrix([], datatype);
	    },

	    'Array | Matrix': function (data) {
	      return new SparseMatrix(data);
	    },
	    
	    'Array | Matrix, string': function (data, datatype) {
	      return new SparseMatrix(data, datatype);
	    }
	  });

	  sparse.toTex = {
	    0: '\\begin{bsparse}\\end{bsparse}',
	    1: '\\left(${args[0]}\\right)'
	  };

	  return sparse;
	}

	exports.name = 'sparse';
	exports.factory = factory;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);

	function factory (type, config, load, typed) {
	  /**
	   * Create a number or convert a string, boolean, or unit to a number.
	   * When value is a matrix, all elements will be converted to number.
	   *
	   * Syntax:
	   *
	   *    math.number(value)
	   *    math.number(unit, valuelessUnit)
	   *
	   * Examples:
	   *
	   *    math.number(2);                         // returns number 2
	   *    math.number('7.2');                     // returns number 7.2
	   *    math.number(true);                      // returns number 1
	   *    math.number([true, false, true, true]); // returns [1, 0, 1, 1]
	   *    math.number(math.unit('52cm'), 'm');    // returns 0.52
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, matrix, string, unit
	   *
	   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
	   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
	   * @return {number | Array | Matrix} The created number
	   */
	  var number = typed('number', {
	    '': function () {
	      return 0;
	    },

	    'number': function (x) {
	      return x;
	    },

	    'string': function (x) {
	      var num = Number(x);
	      if (isNaN(num)) {
	        throw new SyntaxError('String "' + x + '" is no valid number');
	      }
	      return num;
	    },

	    'BigNumber': function (x) {
	      return x.toNumber();
	    },

	    'Fraction': function (x) {
	      return x.valueOf();
	    },

	    'Unit': function (x) {
	      throw new Error('Second argument with valueless unit expected');
	    },

	    'Unit, string | Unit': function (unit, valuelessUnit) {
	      return unit.toNumber(valuelessUnit);
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, number);
	    }
	  });

	  number.toTex = {
	    0: '0',
	    1: '\\left(${args[0]}\\right)',
	    2: '\\left(\\left(${args[0]}\\right)${args[1]}\\right)'
	  };

	  return number;
	}

	exports.name = 'number';
	exports.factory = factory;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(72)
	];


/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	function factory (type, config, load, typed) {
	  /**
	   * A ResultSet contains a list or results
	   * @class ResultSet
	   * @param {Array} entries
	   * @constructor ResultSet
	   */
	  function ResultSet(entries) {
	    if (!(this instanceof ResultSet)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    this.entries = entries || [];
	  }

	  /**
	   * Attach type information
	   */
	  ResultSet.prototype.type = 'ResultSet';
	  ResultSet.prototype.isResultSet = true;

	  /**
	   * Returns the array with results hold by this ResultSet
	   * @memberof ResultSet
	   * @returns {Array} entries
	   */
	  ResultSet.prototype.valueOf = function () {
	    return this.entries;
	  };

	  /**
	   * Returns the stringified results of the ResultSet
	   * @memberof ResultSet
	   * @returns {string} string
	   */
	  ResultSet.prototype.toString = function () {
	    return '[' + this.entries.join(', ') + ']';
	  };

	  /**
	   * Get a JSON representation of the ResultSet
	   * @memberof ResultSet
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "ResultSet", "entries": [...]}`
	   */
	  ResultSet.prototype.toJSON = function () {
	    return {
	      mathjs: 'ResultSet',
	      entries: this.entries
	    };
	  };

	  /**
	   * Instantiate a ResultSet from a JSON object
	   * @memberof ResultSet
	   * @param {Object} json  A JSON object structured as:
	   *                       `{"mathjs": "ResultSet", "entries": [...]}`
	   * @return {ResultSet}
	   */
	  ResultSet.fromJSON = function (json) {
	    return new ResultSet(json.entries);
	  };

	  return ResultSet;
	}

	exports.name = 'ResultSet';
	exports.path = 'type';
	exports.factory = factory;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepMap = __webpack_require__(19);
	var number = __webpack_require__(6);

	function factory (type, config, load, typed) {
	  /**
	   * Create a string or convert any object into a string.
	   * Elements of Arrays and Matrices are processed element wise.
	   *
	   * Syntax:
	   *
	   *    math.string(value)
	   *
	   * Examples:
	   *
	   *    math.string(4.2);               // returns string '4.2'
	   *    math.string(math.complex(3, 2); // returns string '3 + 2i'
	   *
	   *    var u = math.unit(5, 'km');
	   *    math.string(u.to('m'));         // returns string '5000 m'
	   *
	   *    math.string([true, false]);     // returns ['true', 'false']
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, matrix, number, unit
	   *
	   * @param {* | Array | Matrix | null} [value]  A value to convert to a string
	   * @return {string | Array | Matrix} The created string
	   */
	  var string = typed('string', {
	    '': function () {
	      return '';
	    },

	    'number': number.format,

	    'null': function (x) {
	      return 'null';
	    },

	    'boolean': function (x) {
	      return x + '';
	    },

	    'string': function (x) {
	      return x;
	    },

	    'Array | Matrix': function (x) {
	      return deepMap(x, string);
	    },

	    'any': function (x) {
	      return String(x);
	    }
	  });

	  string.toTex = {
	    0: '\\mathtt{""}',
	    1: '\\mathrm{string}\\left(${args[0]}\\right)'
	  };

	  return string;
	}

	exports.name = 'string';
	exports.factory = factory;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	  // type
	  __webpack_require__(75),

	  // construction function
	  __webpack_require__(96),

	  // create new units
	  __webpack_require__(97),

	  // split units
	  __webpack_require__(98),

	  // physical constants
	  __webpack_require__(99)
	];


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var endsWith = __webpack_require__(23).endsWith;
	var clone = __webpack_require__(3).clone;
	var constants = __webpack_require__(76);

	function factory (type, config, load, typed, math) {
	  var add       = load(__webpack_require__(53));
	  var subtract  = load(__webpack_require__(77));
	  var multiply  = load(__webpack_require__(80));
	  var divide    = load(__webpack_require__(81));
	  var pow       = load(__webpack_require__(82));
	  var abs       = load(__webpack_require__(86));
	  var fix       = load(__webpack_require__(87));
	  var equal     = load(__webpack_require__(88));
	  var isNumeric = load(__webpack_require__(89));
	  var format    = load(__webpack_require__(90));
	  var getTypeOf = load(__webpack_require__(91));
	  var toNumber  = load(__webpack_require__(70));
	  var Complex   = load(__webpack_require__(27));

	  /**
	   * A unit can be constructed in the following ways:
	   *     var a = new Unit(value, name);
	   *     var b = new Unit(null, name);
	   *     var c = Unit.parse(str);
	   *
	   * Example usage:
	   *     var a = new Unit(5, 'cm');               // 50 mm
	   *     var b = Unit.parse('23 kg');             // 23 kg
	   *     var c = math.in(a, new Unit(null, 'm');  // 0.05 m
	   *     var d = new Unit(9.81, "m/s^2");         // 9.81 m/s^2
	   *
	   * @class Unit
	   * @constructor Unit
	   * @param {number | BigNumber | Fraction | Complex | boolean} [value]  A value like 5.2
	   * @param {string} [name]   A unit name like "cm" or "inch", or a derived unit of the form: "u1[^ex1] [u2[^ex2] ...] [/ u3[^ex3] [u4[^ex4]]]", such as "kg m^2/s^2", where each unit appearing after the forward slash is taken to be in the denominator. "kg m^2 s^-2" is a synonym and is also acceptable. Any of the units can include a prefix.
	   */
	  function Unit(value, name) {
	    if (!(this instanceof Unit)) {
	      throw new Error('Constructor must be called with the new operator');
	    }

	    if (!(value === undefined || isNumeric(value) || value.isComplex)) {
	      throw new TypeError('First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined');
	    }
	    if (name != undefined && (typeof name !== 'string' || name == '')) {
	      throw new TypeError('Second parameter in Unit constructor must be a string');
	    }

	    if (name != undefined) {
	      var u = Unit.parse(name);
	      this.units = u.units;
	      this.dimensions = u.dimensions;
	    }
	    else {
	      this.units = [
	        {
	          unit: UNIT_NONE,
	          prefix: PREFIXES.NONE,  // link to a list with supported prefixes
	          power: 0
	        }
	      ];
	      this.dimensions = []; 
	      for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	        this.dimensions[i] = 0;
	      }
	    }

	    this.value = (value != undefined) ? this._normalize(value) : null;

	    this.fixPrefix = false; // if true, function format will not search for the
	                            // best prefix but leave it as initially provided.
	                            // fixPrefix is set true by the method Unit.to

	    // The justification behind this is that if the constructor is explicitly called,
	    // the caller wishes the units to be returned exactly as he supplied.
	    this.isUnitListSimplified = true;

	  }

	  /**
	   * Attach type information
	   */
	  Unit.prototype.type = 'Unit';
	  Unit.prototype.isUnit = true;

	  // private variables and functions for the Unit parser
	  var text, index, c;

	  function skipWhitespace() {
	    while (c == ' ' || c == '\t') {
	      next();
	    }
	  }

	  function isDigitDot(c) {
	    return ((c >= '0' && c <= '9') || c == '.');
	  }

	  function isDigit(c) {
	    return ((c >= '0' && c <= '9'));
	  }

	  function next() {
	    index++;
	    c = text.charAt(index);
	  }

	  function revert(oldIndex) {
	    index = oldIndex;
	    c = text.charAt(index);
	  }

	  function parseNumber() {
	    var number = '';
	    var oldIndex;
	    oldIndex = index;

	    if (c == '+') {
	      next();
	    }
	    else if (c == '-') {
	      number += c;
	      next();
	    }

	    if (!isDigitDot(c)) {
	      // a + or - must be followed by a digit
	      revert(oldIndex);
	      return null;
	    }

	    // get number, can have a single dot
	    if (c == '.') {
	      number += c;
	      next();
	      if (!isDigit(c)) {
	        // this is no legal number, it is just a dot
	        revert(oldIndex);
	        return null;
	      }
	    }
	    else {
	      while (isDigit(c)) {
	        number += c;
	        next();
	      }
	      if (c == '.') {
	        number += c;
	        next();
	      }
	    }
	    while (isDigit(c)) {
	      number += c;
	      next();
	    }

	    // check for exponential notation like "2.3e-4" or "1.23e50"
	    if (c == 'E' || c == 'e') {
	      // The grammar branches here. This could either be part of an exponent or the start of a unit that begins with the letter e, such as "4exabytes"

	      var tentativeNumber = '';
	      var tentativeIndex = index;

	      tentativeNumber += c;
	      next();

	      if (c == '+' || c == '-') {
	        tentativeNumber += c;
	        next();
	      }

	      // Scientific notation MUST be followed by an exponent (otherwise we assume it is not scientific notation)
	      if (!isDigit(c)) {
	        // The e or E must belong to something else, so return the number without the e or E.
	        revert(tentativeIndex);
	        return number;
	      }
	      
	      // We can now safely say that this is scientific notation.
	      number = number + tentativeNumber;
	      while (isDigit(c)) {
	        number += c;
	        next();
	      }
	    }

	    return number;
	  }

	  function parseUnit() {
	    var unitName = '';

	    // Alphanumeric characters only; matches [a-zA-Z0-9]
	    var code = text.charCodeAt(index);
	    while ( (code >= 48 && code <= 57) ||
	            (code >= 65 && code <= 90) ||
	            (code >= 97 && code <= 122)) {
	      unitName += c;
	      next();
	      code = text.charCodeAt(index);
	    }

	    // Must begin with [a-zA-Z]
	    code = unitName.charCodeAt(0);
	    if ((code >= 65 && code <= 90) ||
	        (code >= 97 && code <= 122)) {
	        return unitName || null;
	    } 
	    else {
	      return null;
	    }
	  }

	  function parseCharacter(toFind) {
	    if (c === toFind) {
	      next();
	      return toFind;
	    }
	    else {
	      return null;
	    }
	  }

	  /**
	   * Parse a string into a unit. The value of the unit is parsed as number,
	   * BigNumber, or Fraction depending on the math.js config setting `number`.
	   *
	   * Throws an exception if the provided string does not contain a valid unit or
	   * cannot be parsed.
	   * @memberof Unit
	   * @param {string} str        A string like "5.2 inch", "4e2 cm/s^2"
	   * @return {Unit} unit
	   */
	  Unit.parse = function (str, options) {
	    options = options || {};
	    text = str;
	    index = -1;
	    c = '';

	    if (typeof text !== 'string') {
	      throw new TypeError('Invalid argument in Unit.parse, string expected');
	    }

	    var unit = new Unit();
	    unit.units = [];

	    // A unit should follow this pattern:
	    // [number]unit[^number] [unit[^number]]...[/unit[^number] [unit[^number]]]

	    // Rules:
	    // number is any floating point number.
	    // unit is any alphanumeric string beginning with an alpha. Units with names like e3 should be avoided because they look like the exponent of a floating point number!
	    // The string may optionally begin with a number.
	    // Each unit may optionally be followed by ^number.
	    // Whitespace or a forward slash is recommended between consecutive units, although the following technically is parseable:
	    //   2m^2kg/s^2
	    // it is not good form. If a unit starts with e, then it could be confused as a floating point number:
	    //   4erg

	    next();
	    skipWhitespace();
	    // Optional number at the start of the string
	    var valueStr = parseNumber();
	    var value = null;
	    if(valueStr) {
	      if (config.number === 'BigNumber') {
	        value = new type.BigNumber(valueStr);
	      }
	      else if (config.number === 'Fraction') {
	        value = new type.Fraction(valueStr);
	      }
	      else { // number
	        value = parseFloat(valueStr);
	      }
	    }
	    skipWhitespace();    // Whitespace is not required here

	    // Next, we read any number of unit[^number]
	    var powerMultiplierCurrent = 1;
	    var expectingUnit = false;

	    // Stack to keep track of powerMultipliers applied to each parentheses group
	    var powerMultiplierStack = [];

	    // Running product of all elements in powerMultiplierStack
	    var powerMultiplierStackProduct = 1;

	    while (true) {
	      skipWhitespace();

	      // Check for and consume opening parentheses, pushing powerMultiplierCurrent to the stack
	      // A '(' will always appear directly before a unit.
	      while (c === '(') {
	        powerMultiplierStack.push(powerMultiplierCurrent);
	        powerMultiplierStackProduct *= powerMultiplierCurrent;
	        powerMultiplierCurrent = 1;
	        next();
	        skipWhitespace();
	      }

	      // Is there something here?
	      if(c) {
	        var oldC = c;
	        var uStr = parseUnit();
	        if(uStr == null) {
	          throw new SyntaxError('Unexpected "' + oldC + '" in "' + text + '" at index ' + index.toString());
	        }
	      }
	      else {
	        // End of input.
	        break;
	      }

	      // Verify the unit exists and get the prefix (if any)
	      var res = _findUnit(uStr);
	      if(res == null) {
	        // Unit not found.
	        throw new SyntaxError('Unit "' + uStr + '" not found.');
	      }

	      var power = powerMultiplierCurrent * powerMultiplierStackProduct;
	      // Is there a "^ number"?
	      skipWhitespace();
	      if (parseCharacter('^')) {
	        skipWhitespace();
	        var p = parseNumber();
	        if(p == null) {
	          // No valid number found for the power!
	          throw new SyntaxError('In "' + str + '", "^" must be followed by a floating-point number');
	        }
	        power *= p;
	      }

	      // Add the unit to the list
	      unit.units.push( {
	        unit: res.unit,
	        prefix: res.prefix,
	        power: power
	      });
	      for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	        unit.dimensions[i] += (res.unit.dimensions[i] || 0) * power;
	      }

	      // Check for and consume closing parentheses, popping from the stack.
	      // A ')' will always follow a unit.
	      skipWhitespace();
	      while (c === ')') {
	        if(powerMultiplierStack.length === 0) {
	          throw new SyntaxError('Unmatched ")" in "' + text + '" at index ' + index.toString());
	        }
	        powerMultiplierStackProduct /= powerMultiplierStack.pop();
	        next();
	        skipWhitespace();
	      }

	      // "*" and "/" should mean we are expecting something to come next.
	      // Is there a forward slash? If so, negate powerMultiplierCurrent. The next unit or paren group is in the denominator.
	      expectingUnit = false;

	      if (parseCharacter('*')) {
	        // explicit multiplication
	        powerMultiplierCurrent = 1;
	        expectingUnit = true;
	      }
	      else if (parseCharacter('/')) {
	        // division
	        powerMultiplierCurrent = -1;
	        expectingUnit = true;
	      }
	      else {
	        // implicit multiplication
	        powerMultiplierCurrent = 1;
	      }

	      // Replace the unit into the auto unit system
	      if(res.unit.base) {
	        var baseDim = res.unit.base.key;
	        UNIT_SYSTEMS.auto[baseDim] = {
	          unit: res.unit,
	          prefix: res.prefix
	        };
	      }
	    }
	    
	    // Has the string been entirely consumed?
	    skipWhitespace();
	    if(c) {
	      throw new SyntaxError('Could not parse: "' + str + '"');
	    }

	    // Is there a trailing slash?
	    if(expectingUnit) {
	      throw new SyntaxError('Trailing characters: "' + str + '"');
	    }

	    // Is the parentheses stack empty?
	    if(powerMultiplierStack.length !== 0) {
	      throw new SyntaxError('Unmatched "(" in "' + text + '"');
	    }

	    // Are there any units at all?
	    if(unit.units.length == 0 && !options.allowNoUnits) {
	      throw new SyntaxError('"' + str + '" contains no units');
	    }

	    unit.value = (value != undefined) ? unit._normalize(value) : null;
	    return unit;
	  };

	  /**
	   * create a copy of this unit
	   * @memberof Unit
	   * @return {Unit} Returns a cloned version of the unit
	   */
	  Unit.prototype.clone = function () {
	    var unit = new Unit();

	    unit.fixPrefix = this.fixPrefix;
	    unit.isUnitListSimplified = this.isUnitListSimplified;

	    unit.value = clone(this.value);
	    unit.dimensions = this.dimensions.slice(0);
	    unit.units = [];
	    for(var i = 0; i < this.units.length; i++) {
	      unit.units[i] = { };
	      for (var p in this.units[i]) {
	        if (this.units[i].hasOwnProperty(p)) {
	          unit.units[i][p] = this.units[i][p];
	        }
	      }
	    }

	    return unit;
	  };

	  /**
	   * Return whether the unit is derived (such as m/s, or cm^2, but not N)
	   * @memberof Unit
	   * @return {boolean} True if the unit is derived
	   */
	  Unit.prototype._isDerived = function() {
	    if(this.units.length === 0) {
	      return false;
	    }
	    return this.units.length > 1 || Math.abs(this.units[0].power - 1.0) > 1e-15;
	  };

	  /**
	   * Normalize a value, based on its currently set unit(s)
	   * @memberof Unit
	   * @param {number | BigNumber | Fraction | boolean} value
	   * @return {number | BigNumber | Fraction | boolean} normalized value
	   * @private
	   */
	  Unit.prototype._normalize = function (value) {
	    var unitValue, unitOffset, unitPower, unitPrefixValue;
	    var convert;

	    if (value == null || this.units.length === 0) {
	      return value;
	    }
	    else if (this._isDerived()) {
	      // This is a derived unit, so do not apply offsets.
	      // For example, with J kg^-1 degC^-1 you would NOT want to apply the offset.
	      var res = value;
	      convert = Unit._getNumberConverter(getTypeOf(value)); // convert to Fraction or BigNumber if needed

	      for(var i=0; i < this.units.length; i++) {
	        unitValue       = convert(this.units[i].unit.value);
	        unitPrefixValue = convert(this.units[i].prefix.value);
	        unitPower       = convert(this.units[i].power);
	        res = multiply(res, pow(multiply(unitValue, unitPrefixValue), unitPower));
	      }

	      return res;
	    }
	    else {
	      // This is a single unit of power 1, like kg or degC
	      convert = Unit._getNumberConverter(getTypeOf(value)); // convert to Fraction or BigNumber if needed

	      unitValue       = convert(this.units[0].unit.value);
	      unitOffset      = convert(this.units[0].unit.offset);
	      unitPrefixValue = convert(this.units[0].prefix.value);

	      return multiply(add(value, unitOffset), multiply(unitValue, unitPrefixValue));
	    }
	  };

	  /**
	   * Denormalize a value, based on its currently set unit(s)
	   * @memberof Unit
	   * @param {number} value
	   * @param {number} [prefixValue]    Optional prefix value to be used (ignored if this is a derived unit)
	   * @return {number} denormalized value
	   * @private
	   */
	  Unit.prototype._denormalize = function (value, prefixValue) {
	    var unitValue, unitOffset, unitPower, unitPrefixValue;
	    var convert;

	    if (value == null || this.units.length === 0) {
	      return value;
	    }
	    else if (this._isDerived()) {
	      // This is a derived unit, so do not apply offsets.
	      // For example, with J kg^-1 degC^-1 you would NOT want to apply the offset.
	      // Also, prefixValue is ignored--but we will still use the prefix value stored in each unit, since kg is usually preferable to g unless the user decides otherwise.
	      var res = value;
	      convert = Unit._getNumberConverter(getTypeOf(value)); // convert to Fraction or BigNumber if needed

	      for (var i = 0; i < this.units.length; i++) {
	        unitValue       = convert(this.units[i].unit.value);
	        unitPrefixValue = convert(this.units[i].prefix.value);
	        unitPower       = convert(this.units[i].power);
	        res = divide(res, pow(multiply(unitValue, unitPrefixValue), unitPower));
	      }

	      return res;
	    }
	    else {
	      // This is a single unit of power 1, like kg or degC
	      convert = Unit._getNumberConverter(getTypeOf(value)); // convert to Fraction or BigNumber if needed

	      unitValue       = convert(this.units[0].unit.value);
	      unitPrefixValue = convert(this.units[0].prefix.value);
	      unitOffset      = convert(this.units[0].unit.offset);

	      if (prefixValue == undefined) {
	        return subtract(divide(divide(value, unitValue), unitPrefixValue), unitOffset);
	      }
	      else {
	        return subtract(divide(divide(value, unitValue), prefixValue), unitOffset);
	      }
	    }
	  };

	  /**
	   * Find a unit from a string
	   * @memberof Unit
	   * @param {string} str              A string like 'cm' or 'inch'
	   * @returns {Object | null} result  When found, an object with fields unit and
	   *                                  prefix is returned. Else, null is returned.
	   * @private
	   */
	  function _findUnit(str) {
	  
	    // First, match units names exactly. For example, a user could define 'mm' as 10^-4 m, which is silly, but then we would want 'mm' to match the user-defined unit.
	    if(UNITS.hasOwnProperty(str)) {
	      var unit = UNITS[str];
	      var prefix = unit.prefixes[''];
	      return {
	        unit: unit,
	        prefix: prefix
	      }
	    }

	    for (var name in UNITS) {
	      if (UNITS.hasOwnProperty(name)) {
	        if (endsWith(str, name)) {
	          var unit = UNITS[name];
	          var prefixLen = (str.length - name.length);
	          var prefixName = str.substring(0, prefixLen);
	          var prefix = unit.prefixes[prefixName];
	          if (prefix !== undefined) {
	            // store unit, prefix, and value
	            return {
	              unit: unit,
	              prefix: prefix
	            };
	          }
	        }
	      }
	    }

	    return null;
	  }

	  /**
	   * Test if the given expression is a unit.
	   * The unit can have a prefix but cannot have a value.
	   * @memberof Unit
	   * @param {string} name   A string to be tested whether it is a value less unit.
	   *                        The unit can have prefix, like "cm"
	   * @return {boolean}      true if the given string is a unit
	   */
	  Unit.isValuelessUnit = function (name) {
	    return (_findUnit(name) != null);
	  };

	  /**
	   * check if this unit has given base unit
	   * If this unit is a derived unit, this will ALWAYS return false, since by definition base units are not derived.
	   * @memberof Unit
	   * @param {BASE_UNITS | string | undefined} base
	   */
	  Unit.prototype.hasBase = function (base) {

	    if(typeof(base) === "string") {
	      base = BASE_UNITS[base];
	    }

	    if(!base)
	      return false;


	    // All dimensions must be the same
	    for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	      if (Math.abs((this.dimensions[i] || 0) - (base.dimensions[i] || 0)) > 1e-12) {
	        return false;
	      }
	    }
	    return true;

	  };

	  /**
	   * Check if this unit has a base or bases equal to another base or bases
	   * For derived units, the exponent on each base also must match
	   * @memberof Unit
	   * @param {Unit} other
	   * @return {boolean} true if equal base
	   */
	  Unit.prototype.equalBase = function (other) {
	    // All dimensions must be the same
	    for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	      if (Math.abs((this.dimensions[i] || 0) - (other.dimensions[i] || 0)) > 1e-12) {
	        return false;
	      }
	    }
	    return true;
	  };

	  /**
	   * Check if this unit equals another unit
	   * @memberof Unit
	   * @param {Unit} other
	   * @return {boolean} true if both units are equal
	   */
	  Unit.prototype.equals = function (other) {
	    return (this.equalBase(other) && equal(this.value, other.value));
	  };

	  /**
	   * Multiply this unit with another one
	   * @memberof Unit
	   * @param {Unit} other
	   * @return {Unit} product of this unit and the other unit
	   */
	  Unit.prototype.multiply = function (other) {
	    var res = this.clone();
	    
	    for(var i = 0; i<BASE_DIMENSIONS.length; i++) {
	      // Dimensions arrays may be of different lengths. Default to 0.
	      res.dimensions[i] = (this.dimensions[i] || 0) + (other.dimensions[i] || 0);
	    }

	    // Append other's units list onto res (simplify later in Unit.prototype.format)
	    for(var i=0; i<other.units.length; i++) {
	      // Make a deep copy
	      var inverted = {};
	      for(var key in other.units[i]) {
	        inverted[key] = other.units[i][key];
	      }
	      res.units.push(inverted);
	    }

	    // If at least one operand has a value, then the result should also have a value
	    if(this.value != null || other.value != null) {
	      var valThis = this.value == null ? this._normalize(1) : this.value;
	      var valOther = other.value == null ? other._normalize(1) : other.value;
	      res.value = multiply(valThis, valOther);
	    }
	    else {
	      res.value = null;
	    }

	    // Trigger simplification of the unit list at some future time
	    res.isUnitListSimplified = false;

	    return getNumericIfUnitless(res);
	  };

	  /**
	   * Divide this unit by another one
	   * @memberof Unit
	   * @param {Unit} other
	   * @return {Unit} result of dividing this unit by the other unit
	   */
	  Unit.prototype.divide = function (other) {
	    var res = this.clone();
	    
	    for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	      // Dimensions arrays may be of different lengths. Default to 0.
	      res.dimensions[i] = (this.dimensions[i] || 0) - (other.dimensions[i] || 0);
	    }

	    // Invert and append other's units list onto res (simplify later in Unit.prototype.format)
	    for(var i=0; i<other.units.length; i++) {
	      // Make a deep copy
	      var inverted = {};
	      for(var key in other.units[i]) {
	        inverted[key] = other.units[i][key];
	      }
	      inverted.power = -inverted.power;
	      res.units.push(inverted);
	    }

	    // If at least one operand has a value, the result should have a value
	    if (this.value != null || other.value != null) {
	      var valThis = this.value == null ? this._normalize(1) : this.value;
	      var valOther = other.value == null ? other._normalize(1) : other.value;
	      res.value = divide(valThis, valOther);
	    }
	    else {
	      res.value = null;
	    }

	    // Trigger simplification of the unit list at some future time
	    res.isUnitListSimplified = false;

	    return getNumericIfUnitless(res);
	  };

	  /**
	   * Calculate the power of a unit
	   * @memberof Unit
	   * @param {number | Fraction | BigNumber} p
	   * @returns {Unit}      The result: this^p
	   */
	  Unit.prototype.pow = function (p) {
	    var res = this.clone();
	    
	    for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	      // Dimensions arrays may be of different lengths. Default to 0.
	      res.dimensions[i] = (this.dimensions[i] || 0) * p;
	    }

	    // Adjust the power of each unit in the list
	    for(var i=0; i<res.units.length; i++) {
	      res.units[i].power *= p;
	    }

	    if(res.value != null) {
	      res.value = pow(res.value, p);

	      // only allow numeric output, we don't want to return a Complex number
	      //if (!isNumeric(res.value)) {
	      //  res.value = NaN;
	      //}
	      // Update: Complex supported now
	    }
	    else {
	      res.value = null;
	    }

	    // Trigger lazy evaluation of the unit list
	    res.isUnitListSimplified = false;

	    return getNumericIfUnitless(res);
	  };

	  /**
	   * Return the numeric value of this unit if it is dimensionless, has a value, and config.predictable == false; or the original unit otherwise
	   * @param {Unit} unit
	   * @returns {number | Fraction | BigNumber | Unit}  The numeric value of the unit if conditions are met, or the original unit otherwise
	   */
	  var getNumericIfUnitless = function(unit) {
	    if(unit.equalBase(BASE_UNITS.NONE) && unit.value !== null && !config.predictable) {
	      return unit.value;
	    }
	    else {
	      return unit;
	    }
	  }
	    

	  /**
	   * Calculate the absolute value of a unit
	   * @memberof Unit
	   * @param {number | Fraction | BigNumber} x
	   * @returns {Unit}      The result: |x|, absolute value of x
	   */
	  Unit.prototype.abs = function () {
	    // This gives correct, but unexpected, results for units with an offset.
	    // For example, abs(-283.15 degC) = -263.15 degC !!!
	    var ret = this.clone();
	    ret.value = abs(ret.value);

	    for(var i in ret.units) {
	      if(ret.units[i].unit.name === 'VA' || ret.units[i].unit.name === 'VAR') {
	        ret.units[i].unit = UNITS["W"];
	      }
	    }

	    return ret;
	  };

	  /**
	   * Convert the unit to a specific unit name.
	   * @memberof Unit
	   * @param {string | Unit} valuelessUnit   A unit without value. Can have prefix, like "cm"
	   * @returns {Unit} Returns a clone of the unit with a fixed prefix and unit.
	   */
	  Unit.prototype.to = function (valuelessUnit) {
	    var other;
	    var value = this.value == null ? this._normalize(1) : this.value;
	    if (typeof valuelessUnit === 'string') {
	      //other = new Unit(null, valuelessUnit);
	      other = Unit.parse(valuelessUnit);
	      if (!this.equalBase(other)) {
	        throw new Error('Units do not match');
	      }
	      if (other.value !== null) {
	        throw new Error('Cannot convert to a unit with a value');
	      }

	      other.value = clone(value);
	      other.fixPrefix = true;
	      other.isUnitListSimplified = true;
	      return other;
	    }
	    else if (valuelessUnit && valuelessUnit.isUnit) {
	      if (!this.equalBase(valuelessUnit)) {
	        throw new Error('Units do not match');
	      }
	      if (valuelessUnit.value !== null) {
	        throw new Error('Cannot convert to a unit with a value');
	      }
	      other = valuelessUnit.clone();
	      other.value = clone(value);
	      other.fixPrefix = true;
	      other.isUnitListSimplified = true;
	      return other;
	    }
	    else {
	      throw new Error('String or Unit expected as parameter');
	    }
	  };

	  /**
	   * Return the value of the unit when represented with given valueless unit
	   * @memberof Unit
	   * @param {string | Unit} valuelessUnit    For example 'cm' or 'inch'
	   * @return {number} Returns the unit value as number.
	   */
	  // TODO: deprecate Unit.toNumber? It's always better to use toNumeric
	  Unit.prototype.toNumber = function (valuelessUnit) {
	    return toNumber(this.toNumeric(valuelessUnit));
	  };

	  /**
	   * Return the value of the unit in the original numeric type
	   * @memberof Unit
	   * @param {string | Unit} valuelessUnit    For example 'cm' or 'inch'
	   * @return {number | BigNumber | Fraction} Returns the unit value
	   */
	  Unit.prototype.toNumeric = function (valuelessUnit) {
	    var other = this;
	    if(valuelessUnit) {
	      // Allow getting the numeric value without converting to a different unit
	      other = this.to(valuelessUnit);
	    }

	    if(other._isDerived()) {
	      return other._denormalize(other.value);
	    }
	    else {
	      return other._denormalize(other.value, other.units[0].prefix.value);
	    }
	  };

	  /**
	   * Get a string representation of the unit.
	   * @memberof Unit
	   * @return {string}
	   */
	  Unit.prototype.toString = function () {
	    return this.format();
	  };

	  /**
	   * Get a JSON representation of the unit
	   * @memberof Unit
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Unit", "value": 2, "unit": "cm", "fixPrefix": false}`
	   */
	  Unit.prototype.toJSON = function () {
	    return {
	      mathjs: 'Unit',
	      value: this._denormalize(this.value),
	      unit: this.formatUnits(),
	      fixPrefix: this.fixPrefix
	    };
	  };

	  /**
	   * Instantiate a Unit from a JSON object
	   * @memberof Unit
	   * @param {Object} json  A JSON object structured as:
	   *                       `{"mathjs": "Unit", "value": 2, "unit": "cm", "fixPrefix": false}`
	   * @return {Unit}
	   */
	  Unit.fromJSON = function (json) {
	    var unit = new Unit(json.value, json.unit);
	    unit.fixPrefix = json.fixPrefix || false;
	    return unit;
	  };

	  /**
	   * Returns the string representation of the unit.
	   * @memberof Unit
	   * @return {string}
	   */
	  Unit.prototype.valueOf = Unit.prototype.toString;

	  /**
	   * Attempt to simplify the list of units for this unit according to the dimensions array and the current unit system. After the call, this Unit will contain a list of the "best" units for formatting.
	   * Intended to be evaluated lazily. You must set isUnitListSimplified = false before the call! After the call, isUnitListSimplified will be set to true.
	   */
	  Unit.prototype.simplifyUnitListLazy = function() {

	    if (this.isUnitListSimplified || this.value == null) {
	      return;
	    }

	    var proposedUnitList = [];

	    // Search for a matching base
	    var matchingBase;
	    for(var key in currentUnitSystem) {
	      if(this.hasBase(BASE_UNITS[key])) {
	        matchingBase = key;
	        break;
	      }
	    }

	    if(matchingBase === 'NONE')
	    {
	      this.units = [];
	    }
	    else {
	      var matchingUnit;
	      if(matchingBase) {
	        // Does the unit system have a matching unit?
	        if(currentUnitSystem.hasOwnProperty(matchingBase)) {
	          matchingUnit = currentUnitSystem[matchingBase];
	        }
	      }
	      var value;
	      var str;
	      if(matchingUnit) {
	        this.units = [{
	          unit: matchingUnit.unit,
	          prefix: matchingUnit.prefix,
	          power: 1.0
	        }];
	      }
	      else {
	        // Multiple units or units with powers are formatted like this:
	        // 5 (kg m^2) / (s^3 mol)
	        // Build an representation from the base units of the current unit system
	        var missingBaseDim = false;
	        for(var i=0; i<BASE_DIMENSIONS.length; i++) {
	          var baseDim = BASE_DIMENSIONS[i];
	          if(Math.abs(this.dimensions[i] || 0) > 1e-12) {
	            if(currentUnitSystem.hasOwnProperty(baseDim)) {
	              proposedUnitList.push({
	                unit: currentUnitSystem[baseDim].unit,
	                prefix: currentUnitSystem[baseDim].prefix,
	                power: this.dimensions[i] || 0
	              });
	            }
	            else {
	              missingBaseDim = true;
	            }
	          }
	        }
	        var util = __webpack_require__(92);

	        // Is the proposed unit list "simpler" than the existing one?
	        if(proposedUnitList.length < this.units.length && !missingBaseDim) {
	          // Replace this unit list with the proposed list
	          this.units = proposedUnitList;
	        }
	      }
	    }

	    this.isUnitListSimplified = true;
	  };

	  /**
	   * Get a string representation of the units of this Unit, without the value.
	   * @memberof Unit
	   * @return {string}
	   */
	  Unit.prototype.formatUnits = function () {

	    // Lazy evaluation of the unit list
	    this.simplifyUnitListLazy();

	    var strNum = "";
	    var strDen = "";
	    var nNum = 0;
	    var nDen = 0;

	    for(var i=0; i<this.units.length; i++) {
	      if(this.units[i].power > 0) {
	        nNum++;
	        strNum += " " + this.units[i].prefix.name + this.units[i].unit.name;
	        if(Math.abs(this.units[i].power - 1.0) > 1e-15) {
	          strNum += "^" + this.units[i].power;
	        }
	      }
	      else if(this.units[i].power < 0) {
	        nDen++;
	      }
	    }

	    if(nDen > 0) {
	      for(var i=0; i<this.units.length; i++) {
	        if(this.units[i].power < 0) {
	          if(nNum > 0) {
	            strDen += " " + this.units[i].prefix.name + this.units[i].unit.name;
	            if(Math.abs(this.units[i].power + 1.0) > 1e-15) {
	              strDen += "^" + (-this.units[i].power);
	            }
	          }
	          else {
	            strDen += " " + this.units[i].prefix.name + this.units[i].unit.name;
	            strDen += "^" + (this.units[i].power);
	          }
	        }
	      }
	    }
	    // Remove leading " "
	    strNum = strNum.substr(1);
	    strDen = strDen.substr(1);

	    // Add parans for better copy/paste back into the eval, for example, or for better pretty print formatting
	    if(nNum > 1 && nDen > 0) {
	      strNum = "(" + strNum + ")";
	    }
	    if(nDen > 1 && nNum > 0) {
	      strDen = "(" + strDen + ")";
	    }

	    var str = strNum;
	    if(nNum > 0 && nDen > 0) {
	      str += " / ";
	    }
	    str += strDen;

	    return str;
	  };

	  /**
	   * Get a string representation of the Unit, with optional formatting options.
	   * @memberof Unit
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @return {string}
	   */
	  Unit.prototype.format = function (options) {

	    // Simplfy the unit list, if necessary
	    this.simplifyUnitListLazy();

	    // Apply some custom logic for handling VA and VAR. The goal is to express the value of the unit as a real value, if possible. Otherwise, use a real-valued unit instead of a complex-valued one.
	    var isImaginary = false;
	    var isReal = true;
	    if(typeof(this.value) !== 'undefined' && this.value !== null && this.value.isComplex) {
	      // TODO: Make this better, for example, use relative