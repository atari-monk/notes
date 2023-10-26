/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!***********************!*\
  !*** ./src/submit.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const DarkModeToggler_1 = __webpack_require__(/*! ./DarkModeToggler */ "./src/DarkModeToggler.ts");
__webpack_require__(/*! ./css/styles.css */ "./src/css/styles.css");
new DarkModeToggler_1.DarkModeToggler();
// Async function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    const fileTitleInput = document.getElementById('fileTitle');
    const sectionInput = document.getElementById('section');
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const fileTitle = fileTitleInput.value;
    const section = sectionInput.value;
    const question = questionInput.value;
    const answer = answerInput.value;
    console.log('Data to be sent:', {
        fileTitle,
        section,
        question,
        answer,
    });
    const actionUrl = `http://localhost:3000/notes/append/${fileTitle}.json`;
    // Create a note object with section included
    const note = {
        fileTitle,
        section,
        question,
        answer,
    };
    console.log('Note object:', note);
    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (response.status === 200) {
            alert('Note submitted successfully!');
            event.target.reset();
        }
        else {
            alert('Error submitting note.');
        }
    }
    catch (error) {
        alert('Error submitting note: ' + error.message);
    }
}
// Get the form element
const form = document.getElementById('noteForm');
// Add a submit event listener to the form
form.addEventListener('submit', handleSubmit);

})();

/******/ })()
;