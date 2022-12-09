/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/util.js":
/*!********************************!*\
  !*** ./src/components/util.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getParameters\": () => (/* binding */ getParameters),\n/* harmony export */   \"getURL\": () => (/* binding */ getURL)\n/* harmony export */ });\nconst getURL = () => {\n    if (window.location.host === \"memory-in-pairs.herokuapp.com\") {\n        return \"wss://memory-in-pairs-ws.herokuapp.com/\";\n    } else if (window.location.host === \"localhost:5000\") {\n        return \"ws://localhost:5678/\";\n    } else {\n        throw new Error(`Unsupported host: ${window.location.host}`);\n    }\n}\n\nconst getParameters = () => {\n    const userId = document.querySelector(\"#userId\").value\n    const userName = document.querySelector(\"#userName\").value\n    const userEmail = document.querySelector(\"#userEmail\").value\n    return {userId, userName, userEmail}\n}\n\n\n\n//# sourceURL=webpack://codespaces-flask/./src/components/util.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/util.js */ \"./src/components/util.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    const { userId, userName, userEmail } = (0,_components_util_js__WEBPACK_IMPORTED_MODULE_0__.getParameters)()\n    window.URL = (0,_components_util_js__WEBPACK_IMPORTED_MODULE_0__.getURL)()\n    window.userId = userId\n    window.userName = userName\n    window.userEmail = userEmail\n\n    const socket = new WebSocket(URL);\n    socket.onmessage = ({ data }) => {\n        const event = JSON.parse(data);\n        switch (event.type) {\n            case \"conected\":\n                socket.send(JSON.stringify({ action: \"registerPlayer\", userId: userId, name: userName, email: userEmail }));\n                console.log(\"Player registered\");\n                break;\n            default:\n                console.error(\"unsupported event\", event);\n        }\n    }\n    window.socket = socket\n})\n\n//# sourceURL=webpack://codespaces-flask/./src/index.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;