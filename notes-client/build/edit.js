/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dom-lib/dom-utils.js":
/*!*******************************************!*\
  !*** ./node_modules/dom-lib/dom-utils.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setAttribute = exports.setTextContent = exports.detectMobileOrientation = exports.logScreenInfo = exports.setTouch = exports.setClick = exports.unhide = exports.setCanvasColor = exports.get2D = exports.getById = void 0;
function getById(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`No element with id ${id}!`);
    return el;
}
exports.getById = getById;
function get2D(canvasId = 'canvas') {
    const canvas = getById(canvasId);
    const context = canvas.getContext('2d');
    return { canvas, context };
}
exports.get2D = get2D;
function setCanvasColor(canvas, context, color = 'green') {
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
exports.setCanvasColor = setCanvasColor;
function unhide(el, hiddenClassName = 'hidden') {
    el.classList.toggle(hiddenClassName);
}
exports.unhide = unhide;
function setClick(el, fn) {
    el.addEventListener('click', fn);
}
exports.setClick = setClick;
function setTouch(el, fn) {
    el.addEventListener('touchstart', fn);
}
exports.setTouch = setTouch;
function logScreenInfo() {
    const screenWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const screenHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const aspectRatio = screenWidth / screenHeight;
    console.log('screenWidth', screenWidth);
    console.log('screenHeight', screenHeight);
    console.log('aspectRatio', aspectRatio);
}
exports.logScreenInfo = logScreenInfo;
function detectMobileOrientation() {
    const screenWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const screenHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const aspectRatio = screenWidth / screenHeight;
    const portraitThreshold = 0.75;
    const landscapeThreshold = 1.5;
    if (screenWidth > 1024) {
        return 'desktop';
    }
    else if (aspectRatio < portraitThreshold) {
        return 'portrait';
    }
    else if (aspectRatio > landscapeThreshold) {
        return 'landscape';
    }
    else {
        return 'unknown';
    }
}
exports.detectMobileOrientation = detectMobileOrientation;
function setTextContent(element, text) {
    element.textContent = text;
}
exports.setTextContent = setTextContent;
function setAttribute(element, name, value) {
    element.setAttribute(name, value);
}
exports.setAttribute = setAttribute;


/***/ }),

/***/ "./node_modules/dom-lib/index.js":
/*!***************************************!*\
  !*** ./node_modules/dom-lib/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setAttribute = exports.setTextContent = exports.detectMobileOrientation = exports.logScreenInfo = exports.setTouch = exports.setClick = exports.unhide = exports.setCanvasColor = exports.get2D = exports.getById = void 0;
var dom_utils_1 = __webpack_require__(/*! ./dom-utils */ "./node_modules/dom-lib/dom-utils.js");
Object.defineProperty(exports, "getById", ({ enumerable: true, get: function () { return dom_utils_1.getById; } }));
Object.defineProperty(exports, "get2D", ({ enumerable: true, get: function () { return dom_utils_1.get2D; } }));
Object.defineProperty(exports, "setCanvasColor", ({ enumerable: true, get: function () { return dom_utils_1.setCanvasColor; } }));
Object.defineProperty(exports, "unhide", ({ enumerable: true, get: function () { return dom_utils_1.unhide; } }));
Object.defineProperty(exports, "setClick", ({ enumerable: true, get: function () { return dom_utils_1.setClick; } }));
Object.defineProperty(exports, "setTouch", ({ enumerable: true, get: function () { return dom_utils_1.setTouch; } }));
Object.defineProperty(exports, "logScreenInfo", ({ enumerable: true, get: function () { return dom_utils_1.logScreenInfo; } }));
Object.defineProperty(exports, "detectMobileOrientation", ({ enumerable: true, get: function () { return dom_utils_1.detectMobileOrientation; } }));
Object.defineProperty(exports, "setTextContent", ({ enumerable: true, get: function () { return dom_utils_1.setTextContent; } }));
Object.defineProperty(exports, "setAttribute", ({ enumerable: true, get: function () { return dom_utils_1.setAttribute; } }));


/***/ }),

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/DarkModeToggler.ts":
/*!********************************!*\
  !*** ./src/DarkModeToggler.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DarkModeToggler = void 0;
// TypeScript class for toggling dark mode
class DarkModeToggler {
    constructor() {
        this.isDarkMode = true;
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.body = document.body;
        // Set dark mode as default
        this.body.classList.add('dark-mode');
        this.darkModeToggle.addEventListener('click', this.toggleDarkMode.bind(this));
    }
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.body.classList.toggle('dark-mode', this.isDarkMode);
    }
}
exports.DarkModeToggler = DarkModeToggler;


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
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/edit.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dom_lib_1 = __webpack_require__(/*! dom-lib */ "./node_modules/dom-lib/index.js");
const DarkModeToggler_1 = __webpack_require__(/*! ./DarkModeToggler */ "./src/DarkModeToggler.ts");
__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
new DarkModeToggler_1.DarkModeToggler();
const load = (0, dom_lib_1.getById)('loadButton');
async function handleLoad(event) {
    event.preventDefault();
    const fileTitleInput = (0, dom_lib_1.getById)('fileTitle');
    const sectionNumber = (0, dom_lib_1.getById)('sectionNumber');
    const questionNumber = (0, dom_lib_1.getById)('questionNumber');
    const fileTitle = fileTitleInput.value;
    const section = sectionNumber.value;
    const question = questionNumber.value;
    // Prepare the data to send to the server
    const data = {
        section,
        question,
    };
    const actionUrl = `http://localhost:3000/notes/getQuestion/${fileTitle}.json`;
    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const questionData = await response.json();
            console.log(questionData);
        }
        else {
            console.error('Failed to fetch question from the server');
        }
    }
    catch (error) {
        console.error('An error occurred while fetching the question:', error);
    }
}
load.addEventListener('click', handleLoad);

})();

/******/ })()
;