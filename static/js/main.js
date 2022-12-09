/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/websocket.js":
/*!*************************************!*\
  !*** ./src/components/websocket.js ***!
  \*************************************/
/***/ (() => {

eval("function getWebSocketServer() {\n    if (window.location.host === \"memory-in-pairs.herokuapp.com\") {\n        return \"wss://memory-in-pairs-ws.herokuapp.com/\";\n    } else if (window.location.host === \"localhost:5000\") {\n        return \"ws://localhost:5678/\";\n    } else {\n        throw new Error(`Unsupported host: ${window.location.host}`);\n    }\n}\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    console.log(getWebSocketServer())\n    const socket = new WebSocket(getWebSocketServer());\n    const userId = document.querySelector(\"#userId\").value\n    const userName = document.querySelector(\"#userName\").value\n    const userEmail = document.querySelector(\"#userEmail\").value\n    socket.onmessage = ({ data }) => {\n        console.log(data)\n        const event = JSON.parse(data);\n        switch (event.type) {\n            case \"conected\":\n                socket.send(JSON.stringify({ action: \"loadData\", userId: userId, name: userName, email: userEmail }));\n                break;\n            case \"responseData\":\n                const playerList = document.querySelector(\"#playerList\")\n                playerList.innerHTML = \"\"\n                for (var i = 0; i < event.users.length; i++) {\n                    var li = document.createElement('li');\n                    li.innerHTML = `${event.users[i].name} - <span class=\"text-gray-500\">${event.users[i].email}</span>`\n                    playerList.appendChild(li);\n                }\n                break;\n            default:\n                console.error(\"unsupported event\", event);\n        }\n    }\n})\n\n//# sourceURL=webpack://codespaces-flask/./src/components/websocket.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_websocket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/websocket.js */ \"./src/components/websocket.js\");\n/* harmony import */ var _components_websocket_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_websocket_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack://codespaces-flask/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;