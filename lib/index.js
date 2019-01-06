'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _seleniumWebdriver = require('selenium-webdriver');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // Multiple browsers support
    isMultiBrowser: false,
    openedBrowsers: {},
    seleniumServer: null,

    /**
     * Open the browser with the given parameters
     * @param {number} id id of the opened browser
     * @param {string} pageUrl url to navigate to after creating browser
     * @param {string} browserName browser string in format 'browserName[@version][:platform]'
     */
    openBrowser: function openBrowser(id, pageUrl, browserName) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var browserNameString, version, platform, browser;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (browserName) {
                                _context.next = 2;
                                break;
                            }

                            throw new Error('Unsupported browser!');

                        case 2:
                            browserNameString = browserName.match(/([^@:]+)/);
                            version = browserName.match(/@([^:]+)/);
                            platform = browserName.match(/:(.+)/);


                            version = version ? version[1] : undefined; // eslint-disable-line no-undefined
                            platform = platform ? platform[1] : undefined; // eslint-disable-line no-undefined
                            _context.next = 9;
                            return new _seleniumWebdriver.Builder().forBrowser(browserNameString[1], version, platform).usingServer(_this.seleniumServer).build();

                        case 9:
                            browser = _context.sent;


                            browser.get(pageUrl);
                            _this.openedBrowsers[id] = browser;

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this2.openedBrowsers[id].quit();

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    init: function init() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this3.seleniumServer = process.env.SELENIUM_SERVER ? process.env.SELENIUM_SERVER : 'http://localhost:4444/wd/hub';

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    dispose: function dispose() {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            return _context4.abrupt('return');

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },


    // Optional methods for multi-browser support
    getBrowserList: function getBrowserList() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            throw new Error('Not implemented!');

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },
    isValidBrowserName: function isValidBrowserName() /* browserName */{
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            return _context6.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },


    // Extra methods
    canResizeWindowToDimensions: function canResizeWindowToDimensions() /* browserId, width, height */{
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }))();
    },
    resizeWindow: function resizeWindow(id, width, height /*, currentWidth, currentHeight*/) {
        var _this8 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return _this8.openedBrowsers[id].manage().window().setRect({ width: width, height: height });

                        case 2:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }))();
    },
    maximizeWindow: function maximizeWindow(id) {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _this9.openedBrowsers[id].manage().window().maximize();

                        case 2:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath /*, pageWidth, pageHeight*/) {
        var _this10 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            var screenshot;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return _this10.openedBrowsers[id].takeScreenshot(screenshotPath);

                        case 2:
                            screenshot = _context10.sent;
                            _context10.next = 5;
                            return (0, _fs.writeFileSync)(screenshotPath, screenshot, 'base64');

                        case 5:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10);
        }))();
    }
};
module.exports = exports['default'];