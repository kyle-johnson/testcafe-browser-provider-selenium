'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
    heartbeatHandler: {},
    heartbeatInterval: Number(process.env.SELENIUM_HEARTBEAT) || 10e3,

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
                            _this.startHeartbeat(id, browser);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    sleep: function sleep(time) {
        return new _promise2.default(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    },
    startHeartbeat: function startHeartbeat(id, browser) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _this2.heartbeatHandler[id] = true;

                        case 1:
                            if (!_this2.heartbeatHandler[id]) {
                                _context2.next = 13;
                                break;
                            }

                            _context2.prev = 2;
                            _context2.next = 5;
                            return browser.getTitle();

                        case 5:
                            _context2.next = 9;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](2);

                        case 9:
                            _context2.next = 11;
                            return _this2.sleep(_this2.heartbeatInterval);

                        case 11:
                            _context2.next = 1;
                            break;

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[2, 7]]);
        }))();
    },
    stopHeartbeat: function stopHeartbeat(id) {
        this.heartbeatHandler[id] = false;
    },
    closeBrowser: function closeBrowser(id) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this3.stopHeartbeat(id);
                            _context3.next = 3;
                            return _this3.openedBrowsers[id].quit();

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    init: function init() {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _this4.seleniumServer = process.env.SELENIUM_SERVER ? process.env.SELENIUM_SERVER : 'http://localhost:4444/wd/hub';

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    dispose: function dispose() {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var id;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.t0 = _regenerator2.default.keys(_this5.openedBrowsers);

                        case 1:
                            if ((_context5.t1 = _context5.t0()).done) {
                                _context5.next = 13;
                                break;
                            }

                            id = _context5.t1.value;

                            _this5.stopHeartbeat(id);
                            _context5.prev = 4;
                            _context5.next = 7;
                            return _this5.openedBrowsers[id].quit();

                        case 7:
                            _context5.next = 11;
                            break;

                        case 9:
                            _context5.prev = 9;
                            _context5.t2 = _context5['catch'](4);

                        case 11:
                            _context5.next = 1;
                            break;

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[4, 9]]);
        }))();
    },


    // Optional methods for multi-browser support
    getBrowserList: function getBrowserList() {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            throw new Error('Not implemented!');

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },
    isValidBrowserName: function isValidBrowserName() /* browserName */{
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


    // Extra methods
    canResizeWindowToDimensions: function canResizeWindowToDimensions() /* browserId, width, height */{
        var _this8 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            return _context8.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }))();
    },
    resizeWindow: function resizeWindow(id, width, height /*, currentWidth, currentHeight*/) {
        var _this9 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _this9.openedBrowsers[id].manage().window().setRect({ width: width, height: height });

                        case 2:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9);
        }))();
    },
    maximizeWindow: function maximizeWindow(id) {
        var _this10 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return _this10.openedBrowsers[id].manage().window().maximize();

                        case 2:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath /*, pageWidth, pageHeight*/) {
        var _this11 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
            var screenshot;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return _this11.openedBrowsers[id].takeScreenshot(screenshotPath);

                        case 2:
                            screenshot = _context11.sent;
                            _context11.next = 5;
                            return (0, _fs.writeFileSync)(screenshotPath, screenshot, 'base64');

                        case 5:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this11);
        }))();
    }
};
module.exports = exports['default'];