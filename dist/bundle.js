/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: Arial, Helvetica, sans-serif;\n  background-color: #f2f2f2;\n  margin: 0;\n}\n\n.hidden{\n  display: none;\n}\n.view{\n  display: contents;\n}\n\n/* header */\nnav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: lightcoral;\n  color: whitesmoke;\n  padding: 20px;\n}\n\nnav button{\n  background-color: aliceblue;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: solid 1px black;\n  color: #0077c0;\n  cursor: pointer;\n  font-size: 16px;\n  font-weight: bold;\n  margin-right: 10px;\n}\n\nnav button:hover {\n  background-color: plum;\n  color: whitesmoke;\n}\n.section{\n  margin: 20px auto;\n  max-width: 800px;\n  background-color: lavender;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px #888888;\n}\n\nform label{\n  font-size: 16px;\n  font-weight: bold;\n  margin-bottom: 5px;\n  display: block;\n}\n\nform input[type=\"date\"],\nform input[type=\"number\"],\nform select {\n  font-size: 16px;\n  padding: 5px;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  margin-bottom: 10px;\n}\n\nform input[type=\"submit\"],\nform button {\n  background-color: #0077c0;\n  color: whitesmoke;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: none;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n}\n\nform input[type=\"submit\"]:hover,\nform button:hover {\n  background-color: green;\n}\n\naside{\n  margin: 20px auto;\n  max-width: 300px;\n  background-color: sandybrown;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px #888888;\n}\n\n.greeting {\n  margin: 55px;\n}\n\naside h2 {\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n\naside p {\n  font-size: 16px;\n  line-height: 1.5;\n}\n\n\n#form1{\n  border: solid 1px black;\n  justify-content: center;\n  align-items: center;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,yBAAyB;EACzB,SAAS;AACX;;AAEA;EACE,aAAa;AACf;AACA;EACE,iBAAiB;AACnB;;AAEA,WAAW;AACX;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,4BAA4B;EAC5B,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,2BAA2B;EAC3B,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;EACvB,cAAc;EACd,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,0BAA0B;EAC1B,aAAa;EACb,mBAAmB;EACnB,gCAAgC;AAClC;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;AAChB;;AAEA;;;EAGE,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;;EAEE,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,eAAe;AACjB;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,4BAA4B;EAC5B,aAAa;EACb,mBAAmB;EACnB,gCAAgC;AAClC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;;;AAGA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,mBAAmB;AACrB","sourcesContent":["body {\n  font-family: Arial, Helvetica, sans-serif;\n  background-color: #f2f2f2;\n  margin: 0;\n}\n\n.hidden{\n  display: none;\n}\n.view{\n  display: contents;\n}\n\n/* header */\nnav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: lightcoral;\n  color: whitesmoke;\n  padding: 20px;\n}\n\nnav button{\n  background-color: aliceblue;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: solid 1px black;\n  color: #0077c0;\n  cursor: pointer;\n  font-size: 16px;\n  font-weight: bold;\n  margin-right: 10px;\n}\n\nnav button:hover {\n  background-color: plum;\n  color: whitesmoke;\n}\n.section{\n  margin: 20px auto;\n  max-width: 800px;\n  background-color: lavender;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px #888888;\n}\n\nform label{\n  font-size: 16px;\n  font-weight: bold;\n  margin-bottom: 5px;\n  display: block;\n}\n\nform input[type=\"date\"],\nform input[type=\"number\"],\nform select {\n  font-size: 16px;\n  padding: 5px;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  margin-bottom: 10px;\n}\n\nform input[type=\"submit\"],\nform button {\n  background-color: #0077c0;\n  color: whitesmoke;\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: none;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n}\n\nform input[type=\"submit\"]:hover,\nform button:hover {\n  background-color: green;\n}\n\naside{\n  margin: 20px auto;\n  max-width: 300px;\n  background-color: sandybrown;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 5px 5px 10px #888888;\n}\n\n.greeting {\n  margin: 55px;\n}\n\naside h2 {\n  font-size: 24px;\n  margin-bottom: 10px;\n}\n\naside p {\n  font-size: 16px;\n  line-height: 1.5;\n}\n\n\n#form1{\n  border: solid 1px black;\n  justify-content: center;\n  align-items: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAll": () => (/* binding */ fetchAll),
/* harmony export */   "fetchData": () => (/* binding */ fetchData)
/* harmony export */ });
const fetchData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  }).catch(error => console.log(error))
  };
  
  const fetchAll = (id) => Promise.all([
    fetchData('travelers'),
    fetchData(`travelers/${id}`),
    fetchData('trips'),
    fetchData('destinations'),
    ]);


  

  

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_js_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);



class Traveler {
  constructor (travelerObj){
    this.id = travelerObj.id, 
    this.name = travelerObj.name, 
    this.travelType = travelerObj.travelerType
    this.trips = []
  }

  logIn(){
    
  }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_js_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _destination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);




class Trip {
  constructor(tripObj, numTravelers, numDuration){
    this.date = tripObj.date
    this.destinationID = tripObj.destinationID
    this.destination = undefined
    this.duration = numDuration
    this.id = tripObj.id
    this.status = tripObj.status
    this.suggestedActivities = tripObj.suggestedActivities
    this.travelers = numTravelers
    this.userID = tripObj.userID
    this.totalCost = undefined
  }

  findDestination(destinations){
    const match = destinations.find((destination) => destination.id === this.destinationID)
    const destination = new _destination__WEBPACK_IMPORTED_MODULE_1__.default(match)
    this.destination = destination
    this.findCost(this.destination)
  }

  findCost(destination){
    const totalLodgingCost = destination.estimatedLodgingCostPerDay * this.duration
    const totalFlightCost = destination.estimatedFlightCostPerPerson * this.travelers
    const totalTripCost = totalLodgingCost + totalFlightCost
    const totalTripCostPlusFee = totalTripCost + (totalTripCost * .1)
    this.totalCost = totalTripCostPlusFee
    console.log(totalTripCostPlusFee)
  }
  
  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class Destination {
  constructor(destinationObj){
    this.destination = destinationObj.destination
    this.estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson
    this.estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay
    this.id = destinationObj.id
    this.image = destinationObj.image
    this.totalCost = this.estimatedFlightCostPerPerson
  }



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function postTrip(userID, destinationID, travelers, date, duration, status, suggestedActivities) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(),
      userID: userID,
      destinationID: destinationID,
      travelers: travelers,
      date: date,
      duration: duration,
      status: status,
      suggestedActivities: suggestedActivities
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // create new Trip object and add it to currentTravelerTrips array
      console.log(data);
    })
    .catch((error) => console.log(error));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postTrip);

// id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings></array>


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _data_js_getData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _traveler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _trip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _destination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _data_js_postData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)







let currentTraveler;
let currentTravelerTrips;
const logInInput = document.querySelector(".log-in");
const displayInBody = document.querySelector(".body");
const planTripButton = document.querySelector(".plan-trip-button");
const homeButton = document.querySelector(".home-button");
const travelCalendarValue = document.querySelector(".travel-calendar");
const submitTravelButton = document.querySelector(".submit-travel-data");
const datePickerValue = document.querySelector(".choose-travel-date");
const numTravelers = document.querySelector(".num-travelers");
const durationNum = document.querySelector(".duration-num");
const selectDestination = document.querySelector(".select-destination");
const makeTripForm = document.querySelector(".make-trip-form");
const travelerSection = document.querySelector(".traveler-data-section");
const tripsDisplay = document.querySelector(".table");
const displayPhoto =document.querySelector(".image-section")
window.addEventListener("load", travelerLogin);
submitTravelButton.addEventListener("click", makeTrip);
planTripButton.addEventListener("click", viewForm);
homeButton.addEventListener('click', getInspired)

function getData(e) {
  e.preventDefault();
  homeButton.classList.remove("hidden");
  planTripButton.classList.remove("hidden");
  const nameInput = document.querySelector(".name-input");
  const passwordInput = document.querySelector(".password-input");
  const travelersId = nameInput.value.split("traveler")[1];
  (0,_data_js_getData__WEBPACK_IMPORTED_MODULE_2__.fetchAll)(travelersId).then((travelerData) => {
    travelerData[0].travelers.map((traveler) => new _traveler__WEBPACK_IMPORTED_MODULE_3__.default(traveler));
    travelerData[2].trips
      .filter((trip) => trip.userID === 1)
      .map((trip) => new _trip__WEBPACK_IMPORTED_MODULE_4__.default(trip));
    currentTraveler = new _traveler__WEBPACK_IMPORTED_MODULE_3__.default(travelerData[1]);
    currentTravelerTrips = travelerData[2].trips
      .filter((trip) => trip.userID === currentTraveler.id)
      .map((trip) => {
        const newTrip = new _trip__WEBPACK_IMPORTED_MODULE_4__.default(trip, trip.travelers, trip.duration);
        console.log("scripLog", trip.duration);
        newTrip.findDestination(travelerData[3].destinations);
        return newTrip;
      });
    displayTravelerData();
    console.log(currentTraveler);
  });
}

function travelerLogin(e) {
  e.preventDefault();
  logInInput.innerHTML = `
  <legend>Information:</legend>
       Full Name:<br>
       <input class="name-input" type="text" name="fullname" value="" placeholder="Full Name"><br>
       Password:<br>
       <input class="password-input" type="text" name="password" value="" placeholder="Password"><br>
       <button class="view-traveler-data">Log-In</button>
  `;
  const logInButton = document.querySelector(".view-traveler-data");
  logInButton.addEventListener("click", getData);
}

function displayTravelerData() {
  homeButton.classList.remove("hidden");
  planTripButton.classList.remove("hidden");
  travelerSection.innerHTML = `
  <table class="table" view>
      <colgroup>
        <col span="4" style="background-color: bisque;">
        <col span="3" style="background-color: aliceblue;">
      <tr>
        <th>${currentTraveler.name}</th>
        <th>Trips Status</th>
        <th>Destinations</th>
        <th>Travelers</th>
        <th>Flight Cost</th>
        <th>Lodging Cost</th>
        <th>Total Cost Of Trip</th>
      </tr>
      </colgroup>
    </table> 
  `;
  displayTrips();
}

function displayTrips() {
  const table = document.querySelector(".table");
  logInInput.classList.add("hidden");
  currentTravelerTrips.forEach((trip) => {
    table.innerHTML += ` 
    <tr>
        <td>${trip.date}</td>
        <td>${trip.status}</td>
        <td>${trip.destination.destination}</td>
        <td>${trip.travelers}</td>
        <td>${trip.destination.estimatedFlightCostPerPerson}</td>
        <td>${trip.destination.estimatedLodgingCostPerDay}</td>
        <td>${trip.totalCost}</td>
    </tr>
  `;
  });
}

function viewForm() {
  makeTripForm.classList.remove("hidden");
  logInInput.classList.add("hidden");
}

function makeTrip(e) {
  e.preventDefault();
  const [year, month, day] = datePickerValue.value.split("-");
  makeTripForm.classList.remove("hidden");
  const userId = currentTraveler.id;
  const destinationId = Number(selectDestination.value);
  const travelers = numTravelers.value;
  const date = `${year}/${month}/${day}`;
  console.log("date", date);
  const duration = durationNum.value;
  const status = "pending";
  const suggestedActivities = [];
  console.log("makeTripCurT", currentTraveler.id);
  (0,_data_js_postData__WEBPACK_IMPORTED_MODULE_6__.default)(
    userId,
    destinationId,
    travelers,
    date,
    duration,
    status,
    suggestedActivities
  );
}

function getInspired(){
 displayPhoto.classList.remove('hidden')
 travelerSection.classList.add('hidden')
}

function getRandomIndex(array){
  return Math.floor(Math.random() * array.length)
};
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map