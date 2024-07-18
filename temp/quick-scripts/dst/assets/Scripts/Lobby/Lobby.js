
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Lobby/Lobby.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44269NOlMVGd7tbn16fpN+w', 'Lobby');
// Scripts/Lobby/Lobby.js

"use strict";

var login = require("Login");

var jwt = require('jsonwebtoken'); // var setUserDetails = require('ResponseTypes');


cc.Class({
  "extends": cc.Component,
  properties: {
    userId: {
      "default": null,
      type: cc.Label
    },
    coinsLabel: {
      "default": null,
      type: cc.Label
    },
    cloudAnimNode: {
      "default": null,
      type: cc.Node
    },
    sprite: {
      "default": null,
      type: cc.SpriteFrame
    },
    smallItemNode: {
      "default": null,
      type: cc.Node
    },
    rightTiltNode: {
      "default": null,
      type: cc.Node
    },
    leftTiltNode: {
      "default": null,
      type: cc.Node
    },
    spinWheelNode: {
      "default": null,
      type: cc.Node
    },
    OuterAnimation: {
      "default": null,
      type: cc.Node
    },
    passwordNode: {
      "default": null,
      type: cc.Node
    },
    passwordChangeButton: {
      "default": null,
      type: cc.Node
    },
    popupNode: {
      "default": null,
      type: cc.Node
    },
    oldPassword: {
      "default": null,
      type: cc.EditBox
    },
    newPassword: {
      "default": null,
      type: cc.EditBox
    },
    confirmPassword: {
      "default": null,
      type: cc.EditBox
    },
    profileNode: {
      "default": null,
      type: cc.Node
    },
    saveProfileBtn: {
      "default": null,
      type: cc.Node
    },
    allTab: {
      "default": null,
      type: cc.Node
    },
    fishTab: {
      "default": null,
      type: cc.Node
    },
    favTab: {
      "default": null,
      type: cc.Node
    },
    slotTab: {
      "default": null,
      type: cc.Node
    },
    kenoTab: {
      "default": null,
      type: cc.Node
    },
    otherTab: {
      "default": null,
      type: cc.Node
    },
    loginNode: {
      "default": null,
      type: login
    },
    id: null,
    scrollView: cc.ScrollView,
    itemPrefab: cc.Prefab,
    smallItemPrefab: cc.Prefab,
    category: null,
    lefttiltAngle: -7,
    // Angle to tilt the node (in degrees)
    tiltDuration: 0.2,
    // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7,
    targetX: 0,
    moveDuration: 2.0,
    scaleUp: 0.9,
    // Scale factor when mouse enters
    scaleNormal: 0.9,
    itemsPerLoad: 10,
    myWebViewParent: {
      "default": null,
      type: cc.Node
    },
    myWebView: cc.WebView,
    customKeyboard: {
      "default": null,
      type: cc.Node
    },
    smallAlphabet: {
      "default": null,
      type: cc.Node
    },
    capitalAlphabet: {
      "default": null,
      type: cc.Node
    },
    symbolsAlphabet: {
      "default": null,
      type: cc.Node
    },
    capsButton: {
      "default": null,
      type: cc.Node
    },
    smallButton: {
      "default": null,
      type: cc.Node
    },
    deleteButton: {
      "default": null,
      type: cc.Node
    },
    spaceButton: {
      "default": null,
      type: cc.Node
    },
    commaButton: {
      "default": null,
      type: cc.Node
    },
    dotButton: {
      "default": null,
      type: cc.Node
    },
    pageViewParent: {
      "default": null,
      type: cc.Node
    },
    pageView: cc.ScrollView,
    itemsPerPage: 1,
    scrollInterval: 3
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var _this = this;

    if (!this.category) {
      this.category = "all";
    }

    this.activeInputField = null;
    this.setupLobbyInputFocusListeners();
    this.setupLobbyKeyboardButtonListeners();
    this.disableDefaultKeyboard();
    this.initialPosition = this.scrollView.node.position.clone();
    this.itemsToLoad = []; // Array to store all items to be loaded

    this.currentIndex = 0; // Current index in the items array

    this.setFullScreenWidth();
    cc.view.setResizeCallback(this.setFullScreenWidth.bind(this)); // Update width on screen resize
    // this.scrollView.node.on("scroll-to-right", this.loadMoreItems, this); // Event listener for horizontal scrolling

    var startX = cc.v2(415, 0);
    var endY = cc.v2(-415, 0);
    var resetPos = cc.v2(415, 0);
    this.cloudAnimNode.setPosition(startX);
    var moveItem = cc.tween().to(4, {
      position: endY
    }).call(function () {
      _this.cloudAnimNode.setPosition(resetPos);
    });
    cc.tween(this.cloudAnimNode).repeatForever(moveItem).start();
    this.getUserDetails();
    this.fetchGames(this.category);
    this.currentPage = 0;
    this.schedule(this.autoScrollPageView, this.scrollInterval); // const isAndroid = cc.sys.os === cc.sys.OS_ANDROID;
    // const isIOS = cc.sys.os === cc.sys.OS_IOS;
    // if (isAndroid || isIOS) {
    //     this.myWebView.node.on('loaded', this.onWebViewLoaded, this);
    // }

    if (cc.sys.isMobile && cc.sys.isBrowser) {
      console.log = function () {};
    }
  },

  /**
   * @method Fetach Games by category
   * @description HTTP request - POST data
   * @param {String} address -address of Server
   * @param {Object} data -Data/PayLoad to be sent
   * @param {method} callback -Callback to be executed if response.succss is true!
   * @param {method} error -Callback to be executed if response.success is false!
   */
  fetchGames: function fetchGames(gameCategory) {
    var content = this.scrollView.content;
    var pageViewContent = this.pageView.content;
    pageViewContent.removeAllChildren();
    content.removeAllChildren();
    this.pageViewParent.active = false;
    this.scrollView.node.setPosition(this.initialPosition);
    this.scrollView.node.getChildByName("view").width = 1600;
    this.scrollView.node.width = 1500;
    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + gameCategory;
    ServerCom.httpRequest("GET", address, " ", function (response) {
      if (!response.featured && !response.others) {
        return;
      }

      if (response.featured.length === 0 && response.others.length === 0) {
        ServerCom.errorLable.string = "No Games Found For This Category";
        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
        return;
      }

      var otherGames = response.others || [];
      var featured = response.featured || [];
      this.itemsToLoad = [];
      this.currentIndex = 0;

      if (featured.length > 0) {
        this.pageViewParent.active = true;
        this.scollItemCount = featured.length;
        this.populatePageView(featured, gameCategory);
      } else {
        this.pageViewParent.active = false;
      } // this is done for testing


      if (gameCategory == "fav") {
        this.populateScrollView(otherGames, gameCategory);
      } else {
        this.populateScrollView(featured, gameCategory);
      } // if (otherGames.length > 0) {
      //   this.populateScrollView(otherGames, gameCategory);
      // }


      this.setFullScreenWidth();
    }.bind(this));
  },
  populatePageView: function populatePageView(featuredItems, gameCategory) {
    var pageViewContent = this.pageView.content;

    for (var i = 0; i < featuredItems.length; i++) {
      this.populateItems(featuredItems[i], this.smallItemPrefab, pageViewContent, gameCategory);
    }
  },
  populateScrollView: function populateScrollView(otherGames, gameCategory) {
    var scrollViewContent = this.scrollView.content;

    for (var i = 0; i < otherGames.length; i++) {
      this.populateItems(otherGames[i], this.itemPrefab, scrollViewContent, gameCategory);
    }
  },
  populateItems: function populateItems(itemData, prefab, parent, gameCategory) {
    var item = cc.instantiate(prefab);
    var itemScript = item.getComponent('GamesPrefab');
    itemScript.updateItem(itemData, gameCategory);
    parent.addChild(item);
  },
  getGamesByCategoryAll: function getGamesByCategoryAll() {
    this.category = "all";
    var gameTabs = [this.fishTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.allTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryfish: function getGamesByCategoryfish() {
    this.category = "fish";
    var gameTabs = [this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.fishTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryfav: function getGamesByCategoryfav() {
    this.category = "fav";
    var gameTabs = [this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.favTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategorySlot: function getGamesByCategorySlot(event) {
    this.category = "slot";
    var gameTabs = [this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.slotTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryKeno: function getGamesByCategoryKeno(event) {
    this.category = "keno";
    var gameTabs = [this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.otherTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.kenoTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryOther: function getGamesByCategoryOther(event) {
    this.category = "others";
    var gameTabs = [this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg")];
    gameTabs.forEach(function (tab) {
      return tab.active = false;
    });
    this.otherTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  // for full Screen
  zoomFullScreenClick: function zoomFullScreenClick() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } // console.log("fullout");

    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen(); // console.log("fullout1");
      } else if (document.mozCancelFullScreen) {
        // console.log("fullou2");
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        // console.log("fullout3");
        document.webkitCancelFullScreen();
      }
    } // this.setFullScreenWidth();

  },
  // Close Spin Popup Node
  closeSpinNode: function closeSpinNode() {
    if (this.spinWheelNode.active) {
      this.spinWheelNode.active = false;
    }
  },
  // Open Spin the Wheel popup and run outer animation
  openSpinWheelNode: function openSpinWheelNode() {
    var rotateAction = cc.rotateBy(5, 360);
    var continueRotate = cc.repeatForever(rotateAction);
    this.OuterAnimation.runAction(continueRotate);

    if (!this.spinWheelNode.active) {
      this.spinWheelNode.active = true;
    }
  },
  openWebView: function openWebView(url) {
    var _this2 = this;

    var inst = this;
    var token = null;

    if (cc.sys.isBrowser) {
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith('userToken=')) {
          token = cookie.substring('userToken='.length, cookie.length);
          break;
        }
      }
    } else {
      if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os == cc.sys.Os_IOS) {
        // This is an Android device
        token = cc.sys.localStorage.getItem('userToken');
      }
    } // Set the WebView URL


    this.myWebView.url = url;
    this.myWebViewParent.active = true;

    if (cc.sys.isBrowser) {
      this.myWebView.node.on('loaded', function () {
        if (token) {
          _this2.myWebView.evaluateJS("\n                  inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({ type: 'authToken', token: '" + token + "' }, '" + url + "');\n                ");
        }
      });
    }

    if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os == cc.sys.Os_IOS) {
      this.myWebView.node.on('loaded', function () {
        if (token) {
          console.log("================================================ iam inside loaded function in for Mobilewebviewsss");
          var script = "\n            if (window && window.postMessage) {\n                window.postMessage({ type: 'authToken', token: '" + token + "' }, '" + url + "');\n            }\n           ";

          _this2.myWebView.evaluateJS(script); // this.myWebView.evaluateJS(`this.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({ type: 'authToken', token: '${token}' }, '${url}');
          // `);

        }
      });
    } //     window.addEventListener('message', function(event) {
    //     const message = event.data;
    //     if (message === 'authToken') {
    //         console.log("this window check", this, "and inst also", inst)
    //         inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({ type: 'authToken', cookie: token }, `${url}`);
    //     }
    //     if (message === "onExit") {
    //       inst.myWebView.url = "";
    //       inst.myWebViewParent.active = false;
    //     }
    // });


    window.addEventListener('message', function (event) {
      console.log("event check for mobile application is it worlking or not", event);
      var message = event.data;

      if (message === 'authToken') {
        console.log("Received authToken message here for cocos game"); // For browser, we need to use the iframe

        if (cc.sys.isBrowser) {
          inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({
            type: 'authToken',
            cookie: token
          }, url);
        } else {
          // For mobile, we can use the same method as before
          inst.myWebView.evaluateJS("\n                  window.postMessage({ type: 'authToken', cookie: '" + token + "' }, '" + url + "');\n              ");
        }
      }

      if (message === "onExit") {
        inst.myWebView.url = "";
        inst.myWebViewParent.active = false;
        inst.getUserDetails();
      }
    });

    if (!document.fullscreenElement) {
      if (cc.sys.isMobile && cc.sys.isBrowser) {
        this.myWebView.node.width = 1200;
      } else {
        this.myWebView.node.width = 2250;
      }
    } else {
      if (cc.sys.isMobile && cc.sys.isBrowser) {
        this.myWebView.node.width = 2250;
      }
    }
  },
  getUserDetails: function getUserDetails() {
    var inst = this;
    var address = K.ServerAddress.ipAddress + K.ServerAPI.userDetails;
    ServerCom.httpRequest("GET", address, "", function (response) {
      // let username = response.username; // Assuming response.username is 'ins'
      // let capitalizedUsername = inst.capitalizeFirstLetter(username);
      inst.id = response._id;
      inst.userId.string = response.username;
      inst.coinsLabel.string = response.credits;
    });
  },
  capitalizeFirstLetter: function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  // open Profile popup
  openProflePopup: function openProflePopup() {
    this.popupNode.active = true;
    this.profileNode.active = true;
  },
  // Logout Button Clicked
  logOutClick: function logOutClick() {
    this.node.active = false;
    this.loginNode.logutClick();
  },

  /**
   * @method PasswordChange Popup request
   * @description HTTP request - POST data
   * @param {String} address -address of Server
   * @param {Object} data -Data/PayLoad to be sent
   * @param {method} callback -Callback to be executed if response.succss is true!
   * @param {method} error -Callback to be executed if response.success is false!
   */
  passwordChangeBtn: function passwordChangeBtn() {
    if (this.oldPassword.string == "" || this.newPassword.string == "" || this.confirmPassword.string == "") {
      ServerCom.errorLable.string = "All fields are mandatory";
      ServerCom.loginErrorNode.active = true;
      setTimeout(function () {
        ServerCom.loginErrorNode.active = false;
      }, 2000);
    } else {
      if (this.newPassword.string != this.confirmPassword.string) {
        ServerCom.errorLable.string = "New Password and confirm password did not match";
        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
        return;
      }

      var token = null;

      if (!token && cc.sys.isBrowser) {
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();

          if (cookie.startsWith('token=')) {
            token = cookie.substring('token='.length, cookie.length);
            break;
          }
        }
      }

      var user = jwt.decode(token);
      var address = K.ServerAddress.ipAddress + K.ServerAPI.password + "/" + this.id;
      var changeData = {
        existingPassword: this.oldPassword.string,
        password: this.newPassword.string
      };
      ServerCom.httpRequest("PUT", address, changeData, function (response) {
        if (response.message) {
          ServerCom.errorHeading.string = "Password Changed Successfully";
          ServerCom.errorLable.string = response.message;
          ServerCom.loginErrorNode.active = true;
          setTimeout(function () {
            ServerCom.loginErrorNode.active = false;
          }, 2000);
        }
      }.bind(this));
      this.passwordNode.active = false;
      this.popupNode.active = false;
    }
  },
  // to open the password popup
  changePassword: function changePassword() {
    this.passwordNode.active = true;
    this.popupNode.active = true;
  },
  // close all popup
  closePopupBtn: function closePopupBtn() {
    if (this.passwordNode.active || this.profileNode.active) {
      this.passwordNode.active = false;
      this.profileNode.active = false;
    }

    this.popupNode.active = false;
  },
  // Save profile button Clicked
  saveProfile: function saveProfile() {
    this.profileNode.active = false;
    this.popupNode.active = false;
  },
  setFullScreenWidth: function setFullScreenWidth() {
    if (!document.fullscreenElement) {
      if (!this.pageViewParent.active) {
        this.scrollView.node.setPosition(cc.v2(-950, 0));
        this.scrollView.node.width = 2100;
        this.scrollView.node.getChildByName("view").width = 2200;
      } else {
        this.scrollView.node.width = 1200;
        this.scrollView.node.getChildByName("view").width = 1600;
      }

      this.pageView.node.width = 335;
      this.pageView.node.getChildByName("view").width = 335;
    } else {
      if (cc.sys.isMobile && cc.sys.isBrowser) {
        this.scrollView.node.width = 1500;
        this.scrollView.node.getChildByName("view").width = 1600; // this.pageView.node.width.width = 340;
        // this.pageView.node.getChildByName("view").width = 340;
      } else {
        if (!this.pageViewParent.active) {
          // console.log("mai  full screen mei hun");
          this.scrollView.node.setPosition(cc.v2(-900, 0));
          this.scrollView.node.width = 2000;
          this.scrollView.node.getChildByName("view").width = 2200;
        } else {
          var screenWidth = cc.winSize.width - 380;
          this.scrollView.node.width = screenWidth;
          this.scrollView.node.getChildByName("view").width = screenWidth;
        }

        this.pageView.node.width = 335;
        this.pageView.node.getChildByName("view").width = 335;
      }
    }
  },
  // Auto Scroll 
  autoScrollPageView: function autoScrollPageView() {
    var content = this.pageView.content;
    var totalPageCount = content.childrenCount;
    this.currentPage = (this.currentPage + 1) % totalPageCount;
    var targetPos = cc.v2(this.currentPage * this.pageView.node.width, 0);
    this.pageView.scrollToOffset(targetPos, 1); // Scroll to the target position in 1 second
  },
  setupLobbyInputFocusListeners: function setupLobbyInputFocusListeners() {
    if (cc.sys.isMobile && cc.sys.isBrowser) {
      // Attach focus event listeners to username and password input fields
      if (this.oldPassword) {
        this.oldPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
      }

      if (this.newPassword) {
        this.newPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
      }

      if (this.confirmPassword) {
        this.confirmPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this); // this.confirmPassword.node.on('editing-did-began', this.onInputFieldFocused, this);
        // this.confirmPassword.node.on('editing-did-ended', this.onInputFieldBlurred, this);
      }
    }
  },
  onInputFieldClicked: function onInputFieldClicked(event) {
    var _this3 = this;

    // Focus the corresponding input field to trigger the keyboard
    var inputNode = event.currentTarget.getComponent(cc.EditBox);

    if (inputNode) {
      // inputNode.focus()
      this.activeInputField = inputNode;

      if (this.customKeyboard) {
        this.customKeyboard.active = true; // Show the custom keyboard if needed

        event.preventDefault();
        this.scheduleOnce(function () {
          _this3.activeInputField.blur(); // Blur the input field after showing the custom keyboard

        }, 0.1);
      }
    }
  },
  onInputFieldFocused: function onInputFieldFocused(event) {
    // console.log("eventFocused", event);
    var inputNode = event.node.getComponent(cc.EditBox);

    if (inputNode) {
      inputNode.placeholder = ""; // Remove the placeholder text when focused
    }
  },
  onInputFieldBlurred: function onInputFieldBlurred(event) {
    var inputNode = event.node.getComponent(cc.EditBox);

    if (inputNode) {// inputNode.placeholder = inputNode._placeholderLabel.string; // Restore the placeholder text when blurred
    }
  },
  setupLobbyKeyboardButtonListeners: function setupLobbyKeyboardButtonListeners() {
    var _this4 = this;

    var allKeyboardButtons = this.getAllKeyboardButtons();
    allKeyboardButtons.forEach(function (button) {
      button.on(cc.Node.EventType.TOUCH_END, _this4.onKeyboardButtonClicked, _this4);
    });

    if (this.deleteButton) {
      // Add listener for the delete button
      this.deleteButton.on(cc.Node.EventType.TOUCH_END, this.onDeleteButtonClicked, this);
    }
  },
  getAllKeyboardButtons: function getAllKeyboardButtons() {
    var buttons = [];
    buttons = buttons.concat(this.smallAlphabet.children);
    buttons = buttons.concat(this.capitalAlphabet.children);
    buttons = buttons.concat(this.symbolsAlphabet.children);
    buttons = buttons.concat(this.spaceButton);
    buttons = buttons.concat(this.commaButton);
    buttons = buttons.concat(this.dotButton);
    return buttons;
  },
  onKeyboardButtonClicked: function onKeyboardButtonClicked(event) {
    var button = event.target;
    var customEventValue = button._components[1].clickEvents[0].customEventData;
    this.appendToActiveInput(customEventValue);
  },
  appendToActiveInput: function appendToActiveInput(value) {
    if (this.activeInputField) {
      this.activeInputField.string += value; // Append value to the active input field
    }
  },
  onDeleteButtonClicked: function onDeleteButtonClicked() {
    this.removeFromActiveInput();
  },
  removeFromActiveInput: function removeFromActiveInput() {
    if (this.activeInputField && this.activeInputField.string.length > 0) {
      this.activeInputField.string = this.activeInputField.string.slice(0, -1); // Remove last character
    }
  },
  disableDefaultKeyboard: function disableDefaultKeyboard() {
    if (cc.sys.isMobile && cc.sys.isBrowser) {
      var inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(function (input) {
        input.style.pointerEvents = 'none'; // Disable interactions
      });
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbImxvZ2luIiwicmVxdWlyZSIsImp3dCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlcklkIiwidHlwZSIsIkxhYmVsIiwiY29pbnNMYWJlbCIsImNsb3VkQW5pbU5vZGUiLCJOb2RlIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJzbWFsbEl0ZW1Ob2RlIiwicmlnaHRUaWx0Tm9kZSIsImxlZnRUaWx0Tm9kZSIsInNwaW5XaGVlbE5vZGUiLCJPdXRlckFuaW1hdGlvbiIsInBhc3N3b3JkTm9kZSIsInBhc3N3b3JkQ2hhbmdlQnV0dG9uIiwicG9wdXBOb2RlIiwib2xkUGFzc3dvcmQiLCJFZGl0Qm94IiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJpZCIsInNjcm9sbFZpZXciLCJTY3JvbGxWaWV3IiwiaXRlbVByZWZhYiIsIlByZWZhYiIsInNtYWxsSXRlbVByZWZhYiIsImNhdGVnb3J5IiwibGVmdHRpbHRBbmdsZSIsInRpbHREdXJhdGlvbiIsIm9yaWdpbmFsUm90YXRpb24iLCJyaWdodHRpbHRBbmdsZSIsInRhcmdldFgiLCJtb3ZlRHVyYXRpb24iLCJzY2FsZVVwIiwic2NhbGVOb3JtYWwiLCJpdGVtc1BlckxvYWQiLCJteVdlYlZpZXdQYXJlbnQiLCJteVdlYlZpZXciLCJXZWJWaWV3IiwiY3VzdG9tS2V5Ym9hcmQiLCJzbWFsbEFscGhhYmV0IiwiY2FwaXRhbEFscGhhYmV0Iiwic3ltYm9sc0FscGhhYmV0IiwiY2Fwc0J1dHRvbiIsInNtYWxsQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwic3BhY2VCdXR0b24iLCJjb21tYUJ1dHRvbiIsImRvdEJ1dHRvbiIsInBhZ2VWaWV3UGFyZW50IiwicGFnZVZpZXciLCJpdGVtc1BlclBhZ2UiLCJzY3JvbGxJbnRlcnZhbCIsIm9uTG9hZCIsImFjdGl2ZUlucHV0RmllbGQiLCJzZXR1cExvYmJ5SW5wdXRGb2N1c0xpc3RlbmVycyIsInNldHVwTG9iYnlLZXlib2FyZEJ1dHRvbkxpc3RlbmVycyIsImRpc2FibGVEZWZhdWx0S2V5Ym9hcmQiLCJpbml0aWFsUG9zaXRpb24iLCJub2RlIiwicG9zaXRpb24iLCJjbG9uZSIsIml0ZW1zVG9Mb2FkIiwiY3VycmVudEluZGV4Iiwic2V0RnVsbFNjcmVlbldpZHRoIiwidmlldyIsInNldFJlc2l6ZUNhbGxiYWNrIiwiYmluZCIsInN0YXJ0WCIsInYyIiwiZW5kWSIsInJlc2V0UG9zIiwic2V0UG9zaXRpb24iLCJtb3ZlSXRlbSIsInR3ZWVuIiwidG8iLCJjYWxsIiwicmVwZWF0Rm9yZXZlciIsInN0YXJ0IiwiZ2V0VXNlckRldGFpbHMiLCJmZXRjaEdhbWVzIiwiY3VycmVudFBhZ2UiLCJzY2hlZHVsZSIsImF1dG9TY3JvbGxQYWdlVmlldyIsInN5cyIsImlzTW9iaWxlIiwiaXNCcm93c2VyIiwiY29uc29sZSIsImxvZyIsImdhbWVDYXRlZ29yeSIsImNvbnRlbnQiLCJwYWdlVmlld0NvbnRlbnQiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwid2lkdGgiLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJnYW1lIiwiU2VydmVyQ29tIiwiaHR0cFJlcXVlc3QiLCJyZXNwb25zZSIsImZlYXR1cmVkIiwib3RoZXJzIiwibGVuZ3RoIiwiZXJyb3JMYWJsZSIsInN0cmluZyIsImxvZ2luRXJyb3JOb2RlIiwic2V0VGltZW91dCIsIm90aGVyR2FtZXMiLCJzY29sbEl0ZW1Db3VudCIsInBvcHVsYXRlUGFnZVZpZXciLCJwb3B1bGF0ZVNjcm9sbFZpZXciLCJmZWF0dXJlZEl0ZW1zIiwiaSIsInBvcHVsYXRlSXRlbXMiLCJzY3JvbGxWaWV3Q29udGVudCIsIml0ZW1EYXRhIiwicHJlZmFiIiwicGFyZW50IiwiaXRlbSIsImluc3RhbnRpYXRlIiwiaXRlbVNjcmlwdCIsImdldENvbXBvbmVudCIsInVwZGF0ZUl0ZW0iLCJhZGRDaGlsZCIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZm9yRWFjaCIsInRhYiIsImdldEdhbWVzQnlDYXRlZ29yeWZpc2giLCJnZXRHYW1lc0J5Q2F0ZWdvcnlmYXYiLCJnZXRHYW1lc0J5Q2F0ZWdvcnlTbG90IiwiZXZlbnQiLCJnZXRHYW1lc0J5Q2F0ZWdvcnlLZW5vIiwiZ2V0R2FtZXNCeUNhdGVnb3J5T3RoZXIiLCJ6b29tRnVsbFNjcmVlbkNsaWNrIiwiZG9jdW1lbnQiLCJmdWxsc2NyZWVuRWxlbWVudCIsIm1vekZ1bGxTY3JlZW5FbGVtZW50Iiwid2Via2l0RnVsbHNjcmVlbkVsZW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIm1velJlcXVlc3RGdWxsU2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJFbGVtZW50IiwiQUxMT1dfS0VZQk9BUkRfSU5QVVQiLCJjYW5jZWxGdWxsU2NyZWVuIiwibW96Q2FuY2VsRnVsbFNjcmVlbiIsIndlYmtpdENhbmNlbEZ1bGxTY3JlZW4iLCJjbG9zZVNwaW5Ob2RlIiwib3BlblNwaW5XaGVlbE5vZGUiLCJyb3RhdGVBY3Rpb24iLCJyb3RhdGVCeSIsImNvbnRpbnVlUm90YXRlIiwicnVuQWN0aW9uIiwib3BlbldlYlZpZXciLCJ1cmwiLCJpbnN0IiwidG9rZW4iLCJjb29raWVzIiwiY29va2llIiwic3BsaXQiLCJ0cmltIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsIm9zIiwiT1NfQU5EUk9JRCIsIk9zX0lPUyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJvbiIsImV2YWx1YXRlSlMiLCJzY3JpcHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibWVzc2FnZSIsImRhdGEiLCJfY29tcG9uZW50cyIsIl9pbXBsIiwiX2lmcmFtZSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInVzZXJEZXRhaWxzIiwiX2lkIiwidXNlcm5hbWUiLCJjcmVkaXRzIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIm9wZW5Qcm9mbGVQb3B1cCIsImxvZ091dENsaWNrIiwibG9ndXRDbGljayIsInBhc3N3b3JkQ2hhbmdlQnRuIiwidXNlciIsImRlY29kZSIsInBhc3N3b3JkIiwiY2hhbmdlRGF0YSIsImV4aXN0aW5nUGFzc3dvcmQiLCJlcnJvckhlYWRpbmciLCJjaGFuZ2VQYXNzd29yZCIsImNsb3NlUG9wdXBCdG4iLCJzYXZlUHJvZmlsZSIsInNjcmVlbldpZHRoIiwid2luU2l6ZSIsInRvdGFsUGFnZUNvdW50IiwiY2hpbGRyZW5Db3VudCIsInRhcmdldFBvcyIsInNjcm9sbFRvT2Zmc2V0IiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwib25JbnB1dEZpZWxkQ2xpY2tlZCIsImlucHV0Tm9kZSIsImN1cnJlbnRUYXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsInNjaGVkdWxlT25jZSIsImJsdXIiLCJvbklucHV0RmllbGRGb2N1c2VkIiwicGxhY2Vob2xkZXIiLCJvbklucHV0RmllbGRCbHVycmVkIiwiYWxsS2V5Ym9hcmRCdXR0b25zIiwiZ2V0QWxsS2V5Ym9hcmRCdXR0b25zIiwiYnV0dG9uIiwib25LZXlib2FyZEJ1dHRvbkNsaWNrZWQiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQiLCJidXR0b25zIiwiY29uY2F0IiwiY2hpbGRyZW4iLCJ0YXJnZXQiLCJjdXN0b21FdmVudFZhbHVlIiwiY2xpY2tFdmVudHMiLCJjdXN0b21FdmVudERhdGEiLCJhcHBlbmRUb0FjdGl2ZUlucHV0IiwidmFsdWUiLCJyZW1vdmVGcm9tQWN0aXZlSW5wdXQiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxs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c3VCcUI7QUFDcEIsU0FBS1UscUJBQUw7QUFDSCxHQXh1QkU7QUEwdUJIQSxFQUFBQSxxQkExdUJHLG1DQTB1QnFCO0FBQ2xCLFFBQUksS0FBS3pMLGdCQUFMLElBQXlCLEtBQUtBLGdCQUFMLENBQXNCdUQsTUFBdEIsQ0FBNkJGLE1BQTdCLEdBQXNDLENBQW5FLEVBQXNFO0FBQ2xFLFdBQUtyRCxnQkFBTCxDQUFzQnVELE1BQXRCLEdBQStCLEtBQUt2RCxnQkFBTCxDQUFzQnVELE1BQXRCLENBQTZCcUYsS0FBN0IsQ0FBbUMsQ0FBbkMsRUFBc0MsQ0FBQyxDQUF2QyxDQUEvQixDQURrRSxDQUNRO0FBQzdFO0FBQ0osR0E5dUJBO0FBZ3ZCRHpJLEVBQUFBLHNCQUFzQixFQUFDLGtDQUFXO0FBQzlCLFFBQUl0RSxFQUFFLENBQUNpRyxHQUFILENBQU9DLFFBQVAsSUFBbUJsRyxFQUFFLENBQUNpRyxHQUFILENBQU9FLFNBQTlCLEVBQXlDO0FBQ3JDLFVBQU0wSixNQUFNLEdBQUdwRyxRQUFRLENBQUNxRyxnQkFBVCxDQUEwQixpQkFBMUIsQ0FBZjtBQUNBRCxNQUFBQSxNQUFNLENBQUM3RyxPQUFQLENBQWUsVUFBQStHLEtBQUssRUFBSTtBQUNwQkEsUUFBQUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGFBQVosR0FBNEIsTUFBNUIsQ0FEb0IsQ0FDZ0I7QUFDdkMsT0FGRDtBQUdIO0FBQ0o7QUF2dkJBLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvZ2luID0gcmVxdWlyZShcIkxvZ2luXCIpO1xuY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7IFxuLy8gdmFyIHNldFVzZXJEZXRhaWxzID0gcmVxdWlyZSgnUmVzcG9uc2VUeXBlcycpO1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIHVzZXJJZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY29pbnNMYWJlbDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY2xvdWRBbmltTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzcHJpdGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICB9LFxuICAgIHNtYWxsSXRlbU5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcmlnaHRUaWx0Tm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBsZWZ0VGlsdE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBPdXRlckFuaW1hdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBwYXNzd29yZE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmRDaGFuZ2VCdXR0b246IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcG9wdXBOb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG9sZFBhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICB9LFxuICAgIG5ld1Bhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICB9LFxuICAgIGNvbmZpcm1QYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXG4gICAgfSxcbiAgICBwcm9maWxlTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzYXZlUHJvZmlsZUJ0bjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBhbGxUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgZmlzaFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmYXZUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2xvdFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBrZW5vVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG90aGVyVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxvZ2luTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGxvZ2luLFxuICAgIH0sXG4gICAgaWQ6IG51bGwsXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyxcbiAgICBpdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgc21hbGxJdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgbGVmdHRpbHRBbmdsZTogLTcsIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgdGlsdER1cmF0aW9uOiAwLjIsIC8vIER1cmF0aW9uIG9mIHRoZSB0aWx0IGFuaW1hdGlvblxuICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgcmlnaHR0aWx0QW5nbGU6IDcsXG4gICAgdGFyZ2V0WDogMCxcbiAgICBtb3ZlRHVyYXRpb246IDIuMCxcbiAgICBzY2FsZVVwOiAwLjksIC8vIFNjYWxlIGZhY3RvciB3aGVuIG1vdXNlIGVudGVyc1xuICAgIHNjYWxlTm9ybWFsOiAwLjksXG4gICAgaXRlbXNQZXJMb2FkOiAxMCxcbiAgICBteVdlYlZpZXdQYXJlbnQ6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIG15V2ViVmlldzogY2MuV2ViVmlldyxcbiAgICBjdXN0b21LZXlib2FyZDp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgfSxcbiAgc21hbGxBbHBoYWJldDp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICB9LFxuICBjYXBpdGFsQWxwaGFiZXQ6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgc3ltYm9sc0FscGhhYmV0OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTpjYy5Ob2RlXG4gIH0sXG4gIGNhcHNCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgc21hbGxCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgZGVsZXRlQnV0dG9uOiB7XG4gICAgICBkZWZhdWx0Om51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIHNwYWNlQnV0dG9uOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIGNvbW1hQnV0dG9uOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIGRvdEJ1dHRvbjp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICB9LFxuICBwYWdlVmlld1BhcmVudDp7XG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICB0eXBlOmNjLk5vZGVcbiAgfSxcbiAgcGFnZVZpZXc6IGNjLlNjcm9sbFZpZXcsXG4gIGl0ZW1zUGVyUGFnZTogMSxcbiAgc2Nyb2xsSW50ZXJ2YWw6IDMsIFxuICB9LFxuXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnkgPSBcImFsbFwiO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZCA9IG51bGw7IFxuICAgIHRoaXMuc2V0dXBMb2JieUlucHV0Rm9jdXNMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnNldHVwTG9iYnlLZXlib2FyZEJ1dHRvbkxpc3RlbmVycygpO1xuICAgIHRoaXMuZGlzYWJsZURlZmF1bHRLZXlib2FyZCgpO1xuICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUucG9zaXRpb24uY2xvbmUoKTtcblxuICAgIHRoaXMuaXRlbXNUb0xvYWQgPSBbXTsgLy8gQXJyYXkgdG8gc3RvcmUgYWxsIGl0ZW1zIHRvIGJlIGxvYWRlZFxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDsgLy8gQ3VycmVudCBpbmRleCBpbiB0aGUgaXRlbXMgYXJyYXlcbiAgICB0aGlzLnNldEZ1bGxTY3JlZW5XaWR0aCgpO1xuICAgIGNjLnZpZXcuc2V0UmVzaXplQ2FsbGJhY2sodGhpcy5zZXRGdWxsU2NyZWVuV2lkdGguYmluZCh0aGlzKSk7IC8vIFVwZGF0ZSB3aWR0aCBvbiBzY3JlZW4gcmVzaXplXG4gICAgLy8gdGhpcy5zY3JvbGxWaWV3Lm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5sb2FkTW9yZUl0ZW1zLCB0aGlzKTsgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nXG4gICAgbGV0IHN0YXJ0WCA9IGNjLnYyKDQxNSwgMClcbiAgICBsZXQgZW5kWSA9IGNjLnYyKC00MTUsIDApO1xuICAgIGxldCByZXNldFBvcyA9IGNjLnYyKDQxNSwgMClcbiAgICB0aGlzLmNsb3VkQW5pbU5vZGUuc2V0UG9zaXRpb24oc3RhcnRYKTtcbiAgICBsZXQgbW92ZUl0ZW0gPSBjYy50d2VlbigpLnRvKDQsIHtwb3NpdGlvbjogZW5kWX0pLmNhbGwoKCk9PntcbiAgICAgIHRoaXMuY2xvdWRBbmltTm9kZS5zZXRQb3NpdGlvbihyZXNldFBvcyk7XG4gICAgfSk7XG4gICAgY2MudHdlZW4odGhpcy5jbG91ZEFuaW1Ob2RlKS5yZXBlYXRGb3JldmVyKG1vdmVJdGVtKS5zdGFydCgpO1xuICAgIHRoaXMuZ2V0VXNlckRldGFpbHMoKTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XG4gICAgdGhpcy5zY2hlZHVsZSh0aGlzLmF1dG9TY3JvbGxQYWdlVmlldywgdGhpcy5zY3JvbGxJbnRlcnZhbCk7XG4gICAgLy8gY29uc3QgaXNBbmRyb2lkID0gY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRDtcbiAgICAvLyBjb25zdCBpc0lPUyA9IGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUztcbiAgICAvLyBpZiAoaXNBbmRyb2lkIHx8IGlzSU9TKSB7XG4gICAgLy8gICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUub24oJ2xvYWRlZCcsIHRoaXMub25XZWJWaWV3TG9hZGVkLCB0aGlzKTtcbiAgICAvLyB9XG4gICAgaWYgKGNjLnN5cy5pc01vYmlsZSAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICBjb25zb2xlLmxvZyA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9LFxuICBcbiAgLyoqXG4gICAqIEBtZXRob2QgRmV0YWNoIEdhbWVzIGJ5IGNhdGVnb3J5XG4gICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAqL1xuICBmZXRjaEdhbWVzOiBmdW5jdGlvbiAoZ2FtZUNhdGVnb3J5KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcbiAgICBsZXQgcGFnZVZpZXdDb250ZW50ID0gdGhpcy5wYWdlVmlldy5jb250ZW50O1xuICAgIHBhZ2VWaWV3Q29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgIGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB0aGlzLnBhZ2VWaWV3UGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcbiAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikud2lkdGggPSAxNjAwO1xuICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLndpZHRoID0gMTUwMDtcbiAgICB2YXIgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5nYW1lICsgXCI9XCIgKyBnYW1lQ2F0ZWdvcnk7XG4gICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiR0VUXCIsIGFkZHJlc3MsIFwiIFwiLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGlmKCFyZXNwb25zZS5mZWF0dXJlZCAmJiAhcmVzcG9uc2Uub3RoZXJzKXtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZS5mZWF0dXJlZC5sZW5ndGggPT09IDAgJiYgcmVzcG9uc2Uub3RoZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJObyBHYW1lcyBGb3VuZCBGb3IgVGhpcyBDYXRlZ29yeVwiO1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3RoZXJHYW1lcyA9IHJlc3BvbnNlLm90aGVycyB8fCBbXTtcbiAgICAgICAgbGV0IGZlYXR1cmVkID0gcmVzcG9uc2UuZmVhdHVyZWQgfHwgW107XG5cbiAgICAgICAgdGhpcy5pdGVtc1RvTG9hZCA9IFtdO1xuICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICBpZiAoZmVhdHVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMucGFnZVZpZXdQYXJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNjb2xsSXRlbUNvdW50ID0gZmVhdHVyZWQubGVuZ3RoO1xuICAgICAgICAgIHRoaXMucG9wdWxhdGVQYWdlVmlldyhmZWF0dXJlZCwgZ2FtZUNhdGVnb3J5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgIHRoaXMucGFnZVZpZXdQYXJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAvLyB0aGlzIGlzIGRvbmUgZm9yIHRlc3RpbmdcbiAgICAgICAgaWYoZ2FtZUNhdGVnb3J5ID09IFwiZmF2XCIpe1xuICAgICAgICAgIHRoaXMucG9wdWxhdGVTY3JvbGxWaWV3KG90aGVyR2FtZXMsIGdhbWVDYXRlZ29yeSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMucG9wdWxhdGVTY3JvbGxWaWV3KGZlYXR1cmVkLCBnYW1lQ2F0ZWdvcnkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIChvdGhlckdhbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICB0aGlzLnBvcHVsYXRlU2Nyb2xsVmlldyhvdGhlckdhbWVzLCBnYW1lQ2F0ZWdvcnkpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuc2V0RnVsbFNjcmVlbldpZHRoKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn0sXG5cbnBvcHVsYXRlUGFnZVZpZXc6IGZ1bmN0aW9uKGZlYXR1cmVkSXRlbXMsIGdhbWVDYXRlZ29yeSkge1xuICBsZXQgcGFnZVZpZXdDb250ZW50ID0gdGhpcy5wYWdlVmlldy5jb250ZW50O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZlYXR1cmVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucG9wdWxhdGVJdGVtcyhmZWF0dXJlZEl0ZW1zW2ldLCB0aGlzLnNtYWxsSXRlbVByZWZhYiwgcGFnZVZpZXdDb250ZW50LCBnYW1lQ2F0ZWdvcnkpO1xuICB9XG59LFxuXG5wb3B1bGF0ZVNjcm9sbFZpZXc6IGZ1bmN0aW9uKG90aGVyR2FtZXMsIGdhbWVDYXRlZ29yeSkge1xuICBsZXQgc2Nyb2xsVmlld0NvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdGhlckdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBvcHVsYXRlSXRlbXMob3RoZXJHYW1lc1tpXSwgdGhpcy5pdGVtUHJlZmFiLCBzY3JvbGxWaWV3Q29udGVudCwgZ2FtZUNhdGVnb3J5KTtcbiAgfVxufSxcblxucG9wdWxhdGVJdGVtczogZnVuY3Rpb24oaXRlbURhdGEsIHByZWZhYiwgcGFyZW50LCBnYW1lQ2F0ZWdvcnkpIHtcbiAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuICBsZXQgaXRlbVNjcmlwdCA9IGl0ZW0uZ2V0Q29tcG9uZW50KCdHYW1lc1ByZWZhYicpO1xuICBpdGVtU2NyaXB0LnVwZGF0ZUl0ZW0oaXRlbURhdGEsIGdhbWVDYXRlZ29yeSk7XG4gIHBhcmVudC5hZGRDaGlsZChpdGVtKTtcbn0sXG5cbmdldEdhbWVzQnlDYXRlZ29yeUFsbDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcImFsbFwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG59LFxuXG4gIGdldEdhbWVzQnlDYXRlZ29yeWZpc2g6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJmaXNoXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwiZmF2XCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5U2xvdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwic2xvdFwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG4gIGdldEdhbWVzQnlDYXRlZ29yeUtlbm86IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcImtlbm9cIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwib3RoZXJzXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcblxuICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24gKCkge1xuICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgLy8gY3VycmVudCB3b3JraW5nIG1ldGhvZHNcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbihcbiAgICAgICAgICBFbGVtZW50LkFMTE9XX0tFWUJPQVJEX0lOUFVUXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiZnVsbG91dFwiKTtcbiAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZnVsbG91dDFcIik7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJmdWxsb3UyXCIpO1xuICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJmdWxsb3V0M1wiKTtcbiAgICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vIHRoaXMuc2V0RnVsbFNjcmVlbldpZHRoKCk7XG4gIH0sXG4gIC8vIENsb3NlIFNwaW4gUG9wdXAgTm9kZVxuICBjbG9zZVNwaW5Ob2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gT3BlbiBTcGluIHRoZSBXaGVlbCBwb3B1cCBhbmQgcnVuIG91dGVyIGFuaW1hdGlvblxuICBvcGVuU3BpbldoZWVsTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciByb3RhdGVBY3Rpb24gPSBjYy5yb3RhdGVCeSg1LCAzNjApO1xuICAgIHZhciBjb250aW51ZVJvdGF0ZSA9IGNjLnJlcGVhdEZvcmV2ZXIocm90YXRlQWN0aW9uKTtcbiAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgaWYgKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgb3BlbldlYlZpZXc6IGZ1bmN0aW9uKHVybCkge1xuICAgIGxldCBpbnN0ID0gdGhpc1xuICAgIGxldCB0b2tlbiA9IG51bGw7XG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd1c2VyVG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGNvb2tpZS5zdWJzdHJpbmcoJ3VzZXJUb2tlbj0nLmxlbmd0aCwgY29va2llLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5Pc19JT1MpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBBbmRyb2lkIGRldmljZVxuICAgICAgICB0b2tlbiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNldCB0aGUgV2ViVmlldyBVUkxcbiAgICB0aGlzLm15V2ViVmlldy51cmwgPSB1cmw7XG4gICAgXG4gICAgXG4gICAgdGhpcy5teVdlYlZpZXdQYXJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICBpZihjYy5zeXMuaXNCcm93c2VyKXtcbiAgICAgICAgICB0aGlzLm15V2ViVmlldy5ub2RlLm9uKCdsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm15V2ViVmlldy5ldmFsdWF0ZUpTKGBcbiAgICAgICAgICAgICAgICAgIGluc3QubXlXZWJWaWV3Lm5vZGUuX2NvbXBvbmVudHNbMF0uX2ltcGwuX2lmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2F1dGhUb2tlbicsIHRva2VuOiAnJHt0b2tlbn0nIH0sICcke3VybH0nKTtcbiAgICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEIHx8IGNjLnN5cy5vcyA9PSBjYy5zeXMuT3NfSU9TKSB7XG4gICAgICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUub24oJ2xvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IGlhbSBpbnNpZGUgbG9hZGVkIGZ1bmN0aW9uIGluIGZvciBNb2JpbGV3ZWJ2aWV3c3NzXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gYFxuICAgICAgICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cucG9zdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoeyB0eXBlOiAnYXV0aFRva2VuJywgdG9rZW46ICcke3Rva2VufScgfSwgJyR7dXJsfScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBgO1xuICAgICAgICAgICAgdGhpcy5teVdlYlZpZXcuZXZhbHVhdGVKUyhzY3JpcHQpO1xuICAgICAgICAgICAgICAvLyB0aGlzLm15V2ViVmlldy5ldmFsdWF0ZUpTKGB0aGlzLm15V2ViVmlldy5ub2RlLl9jb21wb25lbnRzWzBdLl9pbXBsLl9pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdhdXRoVG9rZW4nLCB0b2tlbjogJyR7dG9rZW59JyB9LCAnJHt1cmx9Jyk7XG4gICAgICAgICAgICAgIC8vIGApO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gXG4vLyAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuLy8gICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhO1xuLy8gICAgIGlmIChtZXNzYWdlID09PSAnYXV0aFRva2VuJykge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgd2luZG93IGNoZWNrXCIsIHRoaXMsIFwiYW5kIGluc3QgYWxzb1wiLCBpbnN0KVxuLy8gICAgICAgICBpbnN0Lm15V2ViVmlldy5ub2RlLl9jb21wb25lbnRzWzBdLl9pbXBsLl9pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdhdXRoVG9rZW4nLCBjb29raWU6IHRva2VuIH0sIGAke3VybH1gKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG1lc3NhZ2UgPT09IFwib25FeGl0XCIpIHtcbi8vICAgICAgIGluc3QubXlXZWJWaWV3LnVybCA9IFwiXCI7XG4vLyAgICAgICBpbnN0Lm15V2ViVmlld1BhcmVudC5hY3RpdmUgPSBmYWxzZTtcbi8vICAgICB9XG4vLyB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJldmVudCBjaGVjayBmb3IgbW9iaWxlIGFwcGxpY2F0aW9uIGlzIGl0IHdvcmxraW5nIG9yIG5vdFwiLCBldmVudCk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICAgIFxuICAgICAgaWYgKG1lc3NhZ2UgPT09ICdhdXRoVG9rZW4nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCBhdXRoVG9rZW4gbWVzc2FnZSBoZXJlIGZvciBjb2NvcyBnYW1lXCIpO1xuICAgICAgICAgIC8vIEZvciBicm93c2VyLCB3ZSBuZWVkIHRvIHVzZSB0aGUgaWZyYW1lXG4gICAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIGluc3QubXlXZWJWaWV3Lm5vZGUuX2NvbXBvbmVudHNbMF0uX2ltcGwuX2lmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2F1dGhUb2tlbicsIGNvb2tpZTogdG9rZW4gfSwgdXJsKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gRm9yIG1vYmlsZSwgd2UgY2FuIHVzZSB0aGUgc2FtZSBtZXRob2QgYXMgYmVmb3JlXG4gICAgICAgICAgICAgIGluc3QubXlXZWJWaWV3LmV2YWx1YXRlSlMoYFxuICAgICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2F1dGhUb2tlbicsIGNvb2tpZTogJyR7dG9rZW59JyB9LCAnJHt1cmx9Jyk7XG4gICAgICAgICAgICAgIGApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKG1lc3NhZ2UgPT09IFwib25FeGl0XCIpIHtcbiAgICAgICAgICBpbnN0Lm15V2ViVmlldy51cmwgPSBcIlwiO1xuICAgICAgICAgIGluc3QubXlXZWJWaWV3UGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGluc3QuZ2V0VXNlckRldGFpbHMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCl7XG4gICAgICBpZihjYy5zeXMuaXNNb2JpbGUgJiYgY2Muc3lzLmlzQnJvd3Nlcil7XG4gICAgICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUud2lkdGggPSAxMjAwO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUud2lkdGggPSAyMjUwXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBpZihjYy5zeXMuaXNNb2JpbGUgJiYgY2Muc3lzLmlzQnJvd3Nlcil7XG4gICAgICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUud2lkdGggPSAyMjUwXG4gICAgICB9XG4gICAgfVxufSxcbiBnZXRVc2VyRGV0YWlsczogZnVuY3Rpb24oKXsgIFxuICBsZXQgaW5zdD0gdGhpc1xuICBsZXQgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS51c2VyRGV0YWlsc1xuICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIkdFVFwiLCBhZGRyZXNzLCBcIlwiLCBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAvLyBsZXQgdXNlcm5hbWUgPSByZXNwb25zZS51c2VybmFtZTsgLy8gQXNzdW1pbmcgcmVzcG9uc2UudXNlcm5hbWUgaXMgJ2lucydcbiAgICAgIC8vIGxldCBjYXBpdGFsaXplZFVzZXJuYW1lID0gaW5zdC5jYXBpdGFsaXplRmlyc3RMZXR0ZXIodXNlcm5hbWUpO1xuICAgICAgaW5zdC5pZCA9IHJlc3BvbnNlLl9pZDtcbiAgICAgIGluc3QudXNlcklkLnN0cmluZyA9IHJlc3BvbnNlLnVzZXJuYW1lXG4gICAgICBpbnN0LmNvaW5zTGFiZWwuc3RyaW5nID0gcmVzcG9uc2UuY3JlZGl0cztcbiAgICB9KVxuIH0sXG5cbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXI6IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gfSxcbiAgLy8gb3BlbiBQcm9maWxlIHBvcHVwXG4gIG9wZW5Qcm9mbGVQb3B1cDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5wcm9maWxlTm9kZS5hY3RpdmUgPSB0cnVlO1xuICB9LFxuICAvLyBMb2dvdXQgQnV0dG9uIENsaWNrZWRcbiAgbG9nT3V0Q2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5sb2dpbk5vZGUubG9ndXRDbGljaygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIFBhc3N3b3JkQ2hhbmdlIFBvcHVwIHJlcXVlc3RcbiAgICogQGRlc2NyaXB0aW9uIEhUVFAgcmVxdWVzdCAtIFBPU1QgZGF0YVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyAtYWRkcmVzcyBvZiBTZXJ2ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLURhdGEvUGF5TG9hZCB0byBiZSBzZW50XG4gICAqIEBwYXJhbSB7bWV0aG9kfSBjYWxsYmFjayAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY3NzIGlzIHRydWUhXG4gICAqIEBwYXJhbSB7bWV0aG9kfSBlcnJvciAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY2VzcyBpcyBmYWxzZSFcbiAgICovXG4gIHBhc3N3b3JkQ2hhbmdlQnRuOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5vbGRQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fFxuICAgICAgdGhpcy5uZXdQYXNzd29yZC5zdHJpbmcgPT0gXCJcIiB8fFxuICAgICAgdGhpcy5jb25maXJtUGFzc3dvcmQuc3RyaW5nID09IFwiXCJcbiAgICApIHtcbiAgICAgIFNlcnZlckNvbS5lcnJvckxhYmxlLnN0cmluZyA9IFwiQWxsIGZpZWxkcyBhcmUgbWFuZGF0b3J5XCI7XG4gICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nICE9IHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZykge1xuICAgICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPVxuICAgICAgICAgIFwiTmV3IFBhc3N3b3JkIGFuZCBjb25maXJtIHBhc3N3b3JkIGRpZCBub3QgbWF0Y2hcIjtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IHRva2VuID0gbnVsbFxuICAgICAgaWYgKCF0b2tlbiAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjb29raWUuc3RhcnRzV2l0aCgndG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGNvb2tpZS5zdWJzdHJpbmcoJ3Rva2VuPScubGVuZ3RoLCBjb29raWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdXNlciA9IGp3dC5kZWNvZGUodG9rZW4pO1xuICAgICAgbGV0IGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkucGFzc3dvcmQgKyBgL2AgKyB0aGlzLmlkO1xuICAgICAgbGV0IGNoYW5nZURhdGEgPSB7XG4gICAgICAgIGV4aXN0aW5nUGFzc3dvcmQ6IHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nLFxuICAgICAgICBwYXNzd29yZCA6IHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nXG4gICAgICB9XG4gICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQVVRcIiwgYWRkcmVzcywgY2hhbmdlRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBpZihyZXNwb25zZS5tZXNzYWdlKXtcbiAgICAgICAgICBTZXJ2ZXJDb20uZXJyb3JIZWFkaW5nLnN0cmluZyA9IFwiUGFzc3dvcmQgQ2hhbmdlZCBTdWNjZXNzZnVsbHlcIlxuICAgICAgICAgIFNlcnZlckNvbS5lcnJvckxhYmxlLnN0cmluZyA9IHJlc3BvbnNlLm1lc3NhZ2U7XG4gICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvLyB0byBvcGVuIHRoZSBwYXNzd29yZCBwb3B1cFxuICBjaGFuZ2VQYXNzd29yZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgfSxcbiAgLy8gY2xvc2UgYWxsIHBvcHVwXG4gIGNsb3NlUG9wdXBCdG46IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlIHx8IHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxuXG4gIC8vIFNhdmUgcHJvZmlsZSBidXR0b24gQ2xpY2tlZFxuICBzYXZlUHJvZmlsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gIH0sXG5cbiAgc2V0RnVsbFNjcmVlbldpZHRoKCkge1xuICAgIGlmKCFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCl7XG4gICAgICBpZighdGhpcy5wYWdlVmlld1BhcmVudC5hY3RpdmUpe1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKC05NTAsIDApKTtcbiAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aCA9IDIxMDA7XG4gICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoID0gMjIwMDtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aCA9IDEyMDA7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS53aWR0aCA9IDE2MDA7XG4gICAgICAgIFxuICAgICAgfVxuICAgICAgdGhpcy5wYWdlVmlldy5ub2RlLndpZHRoID0gMzM1O1xuICAgICAgdGhpcy5wYWdlVmlldy5ub2RlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS53aWR0aCA9IDMzNTtcbiAgICB9IGVsc2V7XG4gICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUud2lkdGggPSAxNTAwO1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikud2lkdGggPSAxNjAwO1xuICAgICAgICAvLyB0aGlzLnBhZ2VWaWV3Lm5vZGUud2lkdGgud2lkdGggPSAzNDA7XG4gICAgICAgIC8vIHRoaXMucGFnZVZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZShcInZpZXdcIikud2lkdGggPSAzNDA7XG4gICAgICB9ZWxzZXsgIFxuICAgICAgICBpZighdGhpcy5wYWdlVmlld1BhcmVudC5hY3RpdmUpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibWFpICBmdWxsIHNjcmVlbiBtZWkgaHVuXCIpO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKC05MDAsIDApKTtcbiAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aCA9IDIwMDA7XG4gICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoID0gMjIwMDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSBjYy53aW5TaXplLndpZHRoIC0gMzgwO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLndpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3Lm5vZGUud2lkdGggPSAzMzU7XG4gICAgICAgICAgdGhpcy5wYWdlVmlldy5ub2RlLmdldENoaWxkQnlOYW1lKFwidmlld1wiKS53aWR0aCA9IDMzNTtcbiAgICAgIH1cbiAgICB9XG4gICB9LFxuICAgLy8gQXV0byBTY3JvbGwgXG4gICBhdXRvU2Nyb2xsUGFnZVZpZXcoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLnBhZ2VWaWV3LmNvbnRlbnQ7XG4gICAgbGV0IHRvdGFsUGFnZUNvdW50ID0gY29udGVudC5jaGlsZHJlbkNvdW50O1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSAodGhpcy5jdXJyZW50UGFnZSArIDEpICUgdG90YWxQYWdlQ291bnQ7XG4gICAgbGV0IHRhcmdldFBvcyA9IGNjLnYyKHRoaXMuY3VycmVudFBhZ2UgKiB0aGlzLnBhZ2VWaWV3Lm5vZGUud2lkdGgsIDApO1xuICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9PZmZzZXQodGFyZ2V0UG9zLCAxKTsgLy8gU2Nyb2xsIHRvIHRoZSB0YXJnZXQgcG9zaXRpb24gaW4gMSBzZWNvbmRcbiAgfSxcblxuICAgc2V0dXBMb2JieUlucHV0Rm9jdXNMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKGNjLnN5cy5pc01vYmlsZSAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICAvLyBBdHRhY2ggZm9jdXMgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBpbnB1dCBmaWVsZHNcbiAgICAgICAgICAgIGlmICh0aGlzLm9sZFBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRQYXNzd29yZC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbklucHV0RmllbGRDbGlja2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdQYXNzd29yZC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbklucHV0RmllbGRDbGlja2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuY29uZmlybVBhc3N3b3JkKXtcbiAgICAgICAgICAgICAgdGhpcy5jb25maXJtUGFzc3dvcmQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25JbnB1dEZpZWxkQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgICAgICAgIC8vIHRoaXMuY29uZmlybVBhc3N3b3JkLm5vZGUub24oJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcy5vbklucHV0RmllbGRGb2N1c2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgLy8gdGhpcy5jb25maXJtUGFzc3dvcmQubm9kZS5vbignZWRpdGluZy1kaWQtZW5kZWQnLCB0aGlzLm9uSW5wdXRGaWVsZEJsdXJyZWQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uSW5wdXRGaWVsZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgIC8vIEZvY3VzIHRoZSBjb3JyZXNwb25kaW5nIGlucHV0IGZpZWxkIHRvIHRyaWdnZXIgdGhlIGtleWJvYXJkXG4gICAgICBjb25zdCBpbnB1dE5vZGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcbiAgICAgIGlmIChpbnB1dE5vZGUpIHtcbiAgICAgICAgICAvLyBpbnB1dE5vZGUuZm9jdXMoKVxuICAgICAgICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZCA9IGlucHV0Tm9kZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUtleWJvYXJkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21LZXlib2FyZC5hY3RpdmUgPSB0cnVlOyAvLyBTaG93IHRoZSBjdXN0b20ga2V5Ym9hcmQgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZC5ibHVyKCk7IC8vIEJsdXIgdGhlIGlucHV0IGZpZWxkIGFmdGVyIHNob3dpbmcgdGhlIGN1c3RvbSBrZXlib2FyZFxuICAgICAgICAgICAgICAgIH0sIDAuMSk7XG4gICAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG9uSW5wdXRGaWVsZEZvY3VzZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnRGb2N1c2VkXCIsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGlucHV0Tm9kZSA9IGV2ZW50Lm5vZGUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xuICAgICAgICBpZiAoaW5wdXROb2RlKSB7XG4gICAgICAgICAgICBpbnB1dE5vZGUucGxhY2Vob2xkZXIgPSBcIlwiOyAvLyBSZW1vdmUgdGhlIHBsYWNlaG9sZGVyIHRleHQgd2hlbiBmb2N1c2VkXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25JbnB1dEZpZWxkQmx1cnJlZDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgY29uc3QgaW5wdXROb2RlID0gZXZlbnQubm9kZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIGlmIChpbnB1dE5vZGUpIHtcbiAgICAgICAgICAgIC8vIGlucHV0Tm9kZS5wbGFjZWhvbGRlciA9IGlucHV0Tm9kZS5fcGxhY2Vob2xkZXJMYWJlbC5zdHJpbmc7IC8vIFJlc3RvcmUgdGhlIHBsYWNlaG9sZGVyIHRleHQgd2hlbiBibHVycmVkXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgc2V0dXBMb2JieUtleWJvYXJkQnV0dG9uTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBhbGxLZXlib2FyZEJ1dHRvbnMgPSB0aGlzLmdldEFsbEtleWJvYXJkQnV0dG9ucygpO1xuICAgICAgICBhbGxLZXlib2FyZEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbktleWJvYXJkQnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5kZWxldGVCdXR0b24pIHsgLy8gQWRkIGxpc3RlbmVyIGZvciB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy5kZWxldGVCdXR0b24ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0QWxsS2V5Ym9hcmRCdXR0b25zKCkge1xuICAgICAgbGV0IGJ1dHRvbnMgPSBbXTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5zbWFsbEFscGhhYmV0LmNoaWxkcmVuKTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5jYXBpdGFsQWxwaGFiZXQuY2hpbGRyZW4pO1xuICAgICAgICAgIGJ1dHRvbnMgPSBidXR0b25zLmNvbmNhdCh0aGlzLnN5bWJvbHNBbHBoYWJldC5jaGlsZHJlbik7XG4gICAgICAgICAgYnV0dG9ucyA9IGJ1dHRvbnMuY29uY2F0KHRoaXMuc3BhY2VCdXR0b24pO1xuICAgICAgICAgIGJ1dHRvbnMgPSBidXR0b25zLmNvbmNhdCh0aGlzLmNvbW1hQnV0dG9uKTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5kb3RCdXR0b24pO1xuICAgICAgICAgIHJldHVybiBidXR0b25zO1xuICAgICAgfSxcblxuICAgICAgb25LZXlib2FyZEJ1dHRvbkNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgY3VzdG9tRXZlbnRWYWx1ZSA9IGJ1dHRvbi5fY29tcG9uZW50c1sxXS5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGE7XG4gICAgICAgICAgdGhpcy5hcHBlbmRUb0FjdGl2ZUlucHV0KGN1c3RvbUV2ZW50VmFsdWUpO1xuICAgICAgfSxcblxuICAgICAgYXBwZW5kVG9BY3RpdmVJbnB1dCh2YWx1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUlucHV0RmllbGQpIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJbnB1dEZpZWxkLnN0cmluZyArPSB2YWx1ZTsgLy8gQXBwZW5kIHZhbHVlIHRvIHRoZSBhY3RpdmUgaW5wdXQgZmllbGRcbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25EZWxldGVCdXR0b25DbGlja2VkKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUFjdGl2ZUlucHV0KCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmVGcm9tQWN0aXZlSW5wdXQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbnB1dEZpZWxkICYmIHRoaXMuYWN0aXZlSW5wdXRGaWVsZC5zdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZC5zdHJpbmcgPSB0aGlzLmFjdGl2ZUlucHV0RmllbGQuc3RyaW5nLnNsaWNlKDAsIC0xKTsgLy8gUmVtb3ZlIGxhc3QgY2hhcmFjdGVyXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBcbiAgICAgICAgZGlzYWJsZURlZmF1bHRLZXlib2FyZDpmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUgJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJzsgLy8gRGlzYWJsZSBpbnRlcmFjdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbn0pO1xuXG4iXX0=