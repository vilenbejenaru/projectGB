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

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst express = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'express'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst { random } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'lodash'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst bodyParser = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'body-parser'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst { v4 } = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'uuid'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst app = express();\n// Add headers\napp.use(function (req, res, next) {\n\n    // Website you wish to allow to connect\n    res.setHeader('Access-Control-Allow-Origin', '*');\n\n    // Request methods you wish to allow\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');\n\n    // Request headers you wish to allow\n    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');\n\n    // Set to true if you need the website to include cookies in the requests sent\n    // to the API (e.g. in case you use sessions)\n    res.setHeader('Access-Control-Allow-Credentials', true);\n\n    // Pass to next layer of middleware\n    next();\n});\n\n// parse application/x-www-form-urlencoded\napp.use(bodyParser.urlencoded({ extended: false }));\n\n// parse application/json\napp.use(bodyParser.json());\n\n// обработка запроса по адресу http://localhost:3000/\napp.get('/product-list', (reqest, res) => {\n    const data = JSON.parse(fs.readFileSync('./product.json'));\n    res.json(data);\n});\napp.get('/product-cart', (reqest, res) => {\n    const data = JSON.parse(fs.readFileSync('./product-cart.json'));\n    res.json(data);\n});\n\napp.post('/product-cart', (req, res) => {\n    const data = JSON.parse(fs.readFileSync('./product-cart.json'));\n    data.push({ productName: req.body.productName, price: req.body.price, id: v4() });\n    fs.writeFileSync('product-cart.json', JSON.stringify(data));\n    res.json({\n        success: true,\n    });\n});\napp.delete('/product-delete', (req, res) => {\n    let data = JSON.parse(fs.readFileSync('./product-cart.json'));\n    id = req.body.id;\n    if (id == undefined) {\n        res.json({\n            err: '404 product ',\n        });\n    } else {\n        console.log(id);\n    }\n\n    indexElement = data\n        .map(function (o) {\n            return o.id;\n        })\n        .indexOf(id);\n\n    if (indexElement == '-1') {\n        res.json({ err: '404 product' });\n    } else {\n        data.splice(indexElement, 1);\n    }\n    fs.writeFileSync('product-cart.json', JSON.stringify(data));\n    res.json({\n        success: 'delete',\n    });\n});\n\napp.listen(3000, () => {\n    console.log('App is running on port 3000');\n});\n\n\n//# sourceURL=webpack://Homework/./src/api/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/api/index.js");
/******/ 	
/******/ })()
;