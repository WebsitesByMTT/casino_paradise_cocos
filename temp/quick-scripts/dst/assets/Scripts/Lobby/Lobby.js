
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

var jwt = require('jsonwebtoken');

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
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    this.activeInputField = null;
    this.setupLobbyInputFocusListeners();
    this.setupLobbyKeyboardButtonListeners();
    this.disableDefaultKeyboard();
    this.itemsToLoad = []; // Array to store all items to be loaded

    this.currentIndex = 0; // Current index in the items array

    this.setFullScreenWidth();
    cc.view.setResizeCallback(this.setFullScreenWidth.bind(this)); // Update width on screen resize

    this.scrollView.node.on("scroll-to-right", this.loadMoreItems, this); // Event listener for horizontal scrolling

    var currentPos = this.cloudAnimNode.getPosition();
    var moveAction = cc.moveTo(this.moveDuration, cc.v2(this.targetX, currentPos.y));
    this.getUserDetails(); // Run the move action on the sprite node

    this.cloudAnimNode.runAction(moveAction);
    this.fetchGames(this.category);
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
    content.removeAllChildren();
    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + gameCategory;
    ServerCom.httpRequest("GET", address, " ", function (response) {
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
      var featuredIndex = 0; // Insert a featured item after every 2 other items

      for (var i = 0; i < otherGames.length; i++) {
        if (i > 0 && i % 2 === 0 && featuredIndex < featured.length) {
          this.itemsToLoad.push({
            data: featured[featuredIndex],
            prefab: this.smallItemPrefab
          });
          featuredIndex++;
        }

        this.itemsToLoad.push({
          data: otherGames[i],
          prefab: this.itemPrefab
        });
      } // If there are remaining featured items and less than 3 otherGames, add the featured items at the end


      while (featuredIndex < featured.length) {
        this.itemsToLoad.push({
          data: featured[featuredIndex],
          prefab: this.smallItemPrefab
        });
        featuredIndex++;
      } // If there are no otherGames, add all featured items


      if (otherGames.length === 0 && featured.length > 0) {
        for (var _i = 0; _i < featured.length; _i++) {
          this.itemsToLoad.push({
            data: featured[_i],
            prefab: this.smallItemPrefab
          });
        }
      }

      this.currentIndex = 0;
      this.loadMoreItems(); // Load the first batch of items
    }.bind(this));
  },
  loadMoreItems: function loadMoreItems() {
    if (this.currentIndex >= this.itemsToLoad.length) return; // No more items to load

    var endIndex = Math.min(this.currentIndex + this.itemsPerLoad, this.itemsToLoad.length);

    for (var i = this.currentIndex; i < endIndex; i++) {
      var itemData = this.itemsToLoad[i];
      this.populateItems(itemData.data, itemData.prefab);
    }

    this.currentIndex = endIndex;
  },
  // Draw Game Items in Lobby
  populateItems: function populateItems(itemData, prefab) {
    var item = cc.instantiate(prefab);
    var itemScript = item.getComponent("GamesPrefab");
    itemScript.updateItem(itemData);
    this.scrollView.content.addChild(item);
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
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

    this.setFullScreenWidth();
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
    var _this = this;

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
      token = cc.sys.localStorage.getItem('userToken');
    } // Set the WebView URL


    this.myWebView.url = url;
    this.myWebViewParent.active = true;
    this.myWebView.node.on('loaded', function () {
      if (token) {
        _this.myWebView.evaluateJS("\n               window.postMessage({ type: 'authToken', token: '" + token + "' }, '" + url + "');\n            ");
      }
    });
    window.addEventListener('message', function (event) {
      console.log("message", event);
      var message = event.data;

      if (message === 'authToken') {
        inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({
          type: 'authToken',
          cookie: token
        }, "" + url);
      }

      if (message === "onExit") {
        inst.myWebView.url = "";
        inst.myWebViewParent.active = false;
      }
    });
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
      console.log(changeData, "pas");
      ServerCom.httpRequest("PUT", address, changeData, function (response) {
        console.log("response", response);

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
      this.scrollView.node.width = 2050;
      this.scrollView.node.getChildByName("view").width = 2050;
    } else {
      var screenWidth = cc.winSize.width; // Set the width of the ScrollView node

      this.scrollView.node.width = screenWidth; // Set the width of the View node within the ScrollView

      this.scrollView.node.getChildByName("view").width = screenWidth;
    }
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
        this.confirmPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
        this.confirmPassword.node.on('editing-did-began', this.onInputFieldFocused, this);
        this.confirmPassword.node.on('editing-did-ended', this.onInputFieldBlurred, this);
      }
    }
  },
  onInputFieldClicked: function onInputFieldClicked(event) {
    // Focus the corresponding input field to trigger the keyboard
    var inputNode = event.currentTarget.getComponent(cc.EditBox);

    if (inputNode) {
      // inputNode.focus()
      this.activeInputField = inputNode;

      if (this.customKeyboard) {
        this.customKeyboard.active = true; // Show the custom keyboard if needed
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
    var _this2 = this;

    var allKeyboardButtons = this.getAllKeyboardButtons();
    allKeyboardButtons.forEach(function (button) {
      button.on(cc.Node.EventType.TOUCH_END, _this2.onKeyboardButtonClicked, _this2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbImxvZ2luIiwicmVxdWlyZSIsImp3dCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlcklkIiwidHlwZSIsIkxhYmVsIiwiY29pbnNMYWJlbCIsImNsb3VkQW5pbU5vZGUiLCJOb2RlIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJzbWFsbEl0ZW1Ob2RlIiwicmlnaHRUaWx0Tm9kZSIsImxlZnRUaWx0Tm9kZSIsInNwaW5XaGVlbE5vZGUiLCJPdXRlckFuaW1hdGlvbiIsInBhc3N3b3JkTm9kZSIsInBhc3N3b3JkQ2hhbmdlQnV0dG9uIiwicG9wdXBOb2RlIiwib2xkUGFzc3dvcmQiLCJFZGl0Qm94IiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJpZCIsInNjcm9sbFZpZXciLCJTY3JvbGxWaWV3IiwiaXRlbVByZWZhYiIsIlByZWZhYiIsInNtYWxsSXRlbVByZWZhYiIsImNhdGVnb3J5IiwibGVmdHRpbHRBbmdsZSIsInRpbHREdXJhdGlvbiIsIm9yaWdpbmFsUm90YXRpb24iLCJyaWdodHRpbHRBbmdsZSIsInRhcmdldFgiLCJtb3ZlRHVyYXRpb24iLCJzY2FsZVVwIiwic2NhbGVOb3JtYWwiLCJpdGVtc1BlckxvYWQiLCJteVdlYlZpZXdQYXJlbnQiLCJteVdlYlZpZXciLCJXZWJWaWV3IiwiY3VzdG9tS2V5Ym9hcmQiLCJzbWFsbEFscGhhYmV0IiwiY2FwaXRhbEFscGhhYmV0Iiwic3ltYm9sc0FscGhhYmV0IiwiY2Fwc0J1dHRvbiIsInNtYWxsQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwic3BhY2VCdXR0b24iLCJjb21tYUJ1dHRvbiIsImRvdEJ1dHRvbiIsIm9uTG9hZCIsImFjdGl2ZUlucHV0RmllbGQiLCJzZXR1cExvYmJ5SW5wdXRGb2N1c0xpc3RlbmVycyIsInNldHVwTG9iYnlLZXlib2FyZEJ1dHRvbkxpc3RlbmVycyIsImRpc2FibGVEZWZhdWx0S2V5Ym9hcmQiLCJpdGVtc1RvTG9hZCIsImN1cnJlbnRJbmRleCIsInNldEZ1bGxTY3JlZW5XaWR0aCIsInZpZXciLCJzZXRSZXNpemVDYWxsYmFjayIsImJpbmQiLCJub2RlIiwib24iLCJsb2FkTW9yZUl0ZW1zIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsImdldFVzZXJEZXRhaWxzIiwicnVuQWN0aW9uIiwiZmV0Y2hHYW1lcyIsImdhbWVDYXRlZ29yeSIsImNvbnRlbnQiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdhbWUiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwiZmVhdHVyZWQiLCJsZW5ndGgiLCJvdGhlcnMiLCJlcnJvckxhYmxlIiwic3RyaW5nIiwibG9naW5FcnJvck5vZGUiLCJhY3RpdmUiLCJzZXRUaW1lb3V0Iiwib3RoZXJHYW1lcyIsImZlYXR1cmVkSW5kZXgiLCJpIiwicHVzaCIsImRhdGEiLCJwcmVmYWIiLCJlbmRJbmRleCIsIk1hdGgiLCJtaW4iLCJpdGVtRGF0YSIsInBvcHVsYXRlSXRlbXMiLCJpdGVtIiwiaW5zdGFudGlhdGUiLCJpdGVtU2NyaXB0IiwiZ2V0Q29tcG9uZW50IiwidXBkYXRlSXRlbSIsImFkZENoaWxkIiwiZ2V0R2FtZXNCeUNhdGVnb3J5QWxsIiwiZ2FtZVRhYnMiLCJnZXRDaGlsZEJ5TmFtZSIsImZvckVhY2giLCJ0YWIiLCJnZXRHYW1lc0J5Q2F0ZWdvcnlmaXNoIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2IiwiZ2V0R2FtZXNCeUNhdGVnb3J5U2xvdCIsImV2ZW50IiwiZ2V0R2FtZXNCeUNhdGVnb3J5S2VubyIsImdldEdhbWVzQnlDYXRlZ29yeU90aGVyIiwiem9vbUZ1bGxTY3JlZW5DbGljayIsImRvY3VtZW50IiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwiRWxlbWVudCIsIkFMTE9XX0tFWUJPQVJEX0lOUFVUIiwiY2FuY2VsRnVsbFNjcmVlbiIsIm1vekNhbmNlbEZ1bGxTY3JlZW4iLCJ3ZWJraXRDYW5jZWxGdWxsU2NyZWVuIiwiY2xvc2VTcGluTm9kZSIsIm9wZW5TcGluV2hlZWxOb2RlIiwicm90YXRlQWN0aW9uIiwicm90YXRlQnkiLCJjb250aW51ZVJvdGF0ZSIsInJlcGVhdEZvcmV2ZXIiLCJvcGVuV2ViVmlldyIsInVybCIsImluc3QiLCJ0b2tlbiIsInN5cyIsImlzQnJvd3NlciIsImNvb2tpZXMiLCJjb29raWUiLCJzcGxpdCIsInRyaW0iLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImV2YWx1YXRlSlMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJfY29tcG9uZW50cyIsIl9pbXBsIiwiX2lmcmFtZSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInVzZXJEZXRhaWxzIiwiX2lkIiwidXNlcm5hbWUiLCJjcmVkaXRzIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIm9wZW5Qcm9mbGVQb3B1cCIsImxvZ091dENsaWNrIiwibG9ndXRDbGljayIsInBhc3N3b3JkQ2hhbmdlQnRuIiwidXNlciIsImRlY29kZSIsInBhc3N3b3JkIiwiY2hhbmdlRGF0YSIsImV4aXN0aW5nUGFzc3dvcmQiLCJlcnJvckhlYWRpbmciLCJjaGFuZ2VQYXNzd29yZCIsImNsb3NlUG9wdXBCdG4iLCJzYXZlUHJvZmlsZSIsIndpZHRoIiwic2NyZWVuV2lkdGgiLCJ3aW5TaXplIiwiaXNNb2JpbGUiLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJvbklucHV0RmllbGRDbGlja2VkIiwib25JbnB1dEZpZWxkRm9jdXNlZCIsIm9uSW5wdXRGaWVsZEJsdXJyZWQiLCJpbnB1dE5vZGUiLCJjdXJyZW50VGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJhbGxLZXlib2FyZEJ1dHRvbnMiLCJnZXRBbGxLZXlib2FyZEJ1dHRvbnMiLCJidXR0b24iLCJvbktleWJvYXJkQnV0dG9uQ2xpY2tlZCIsIm9uRGVsZXRlQnV0dG9uQ2xpY2tlZCIsImJ1dHRvbnMiLCJjb25jYXQiLCJjaGlsZHJlbiIsInRhcmdldCIsImN1c3RvbUV2ZW50VmFsdWUiLCJjbGlja0V2ZW50cyIsImN1c3RvbUV2ZW50RGF0YSIsImFwcGVuZFRvQWN0aXZlSW5wdXQiLCJ2YWx1ZSIsInJlbW92ZUZyb21BY3RpdmVJbnB1dCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBLElBQU1DLEdBQUcsR0FBR0QsT0FBTyxDQUFDLGNBQUQsQ0FBbkI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBREU7QUFLVkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWRixNQUFBQSxJQUFJ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QUE3QixDQUFtQyxDQUFuQyxFQUFzQyxDQUFDLENBQXZDLENBQS9CLENBRGtFLENBQ1E7QUFDN0U7QUFDSixHQW5vQkE7QUFxb0JEeEgsRUFBQUEsc0JBQXNCLEVBQUMsa0NBQVc7QUFDOUIsUUFBSWxFLEVBQUUsQ0FBQzZKLEdBQUgsQ0FBTzhDLFFBQVAsSUFBbUIzTSxFQUFFLENBQUM2SixHQUFILENBQU9DLFNBQTlCLEVBQXlDO0FBQ3JDLFVBQU1xRSxNQUFNLEdBQUc3RixRQUFRLENBQUM4RixnQkFBVCxDQUEwQixpQkFBMUIsQ0FBZjtBQUNBRCxNQUFBQSxNQUFNLENBQUN0RyxPQUFQLENBQWUsVUFBQXdHLEtBQUssRUFBSTtBQUNwQkEsUUFBQUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGFBQVosR0FBNEIsTUFBNUIsQ0FEb0IsQ0FDZ0I7QUFDdkMsT0FGRDtBQUdIO0FBQ0o7QUE1b0JBLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvZ2luID0gcmVxdWlyZShcIkxvZ2luXCIpO1xuY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7IFxuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIHVzZXJJZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY29pbnNMYWJlbDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY2xvdWRBbmltTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzcHJpdGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICB9LFxuICAgIHNtYWxsSXRlbU5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcmlnaHRUaWx0Tm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBsZWZ0VGlsdE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBPdXRlckFuaW1hdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBwYXNzd29yZE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmRDaGFuZ2VCdXR0b246IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcG9wdXBOb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG9sZFBhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICB9LFxuICAgIG5ld1Bhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuRWRpdEJveCxcbiAgICB9LFxuICAgIGNvbmZpcm1QYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXG4gICAgfSxcbiAgICBwcm9maWxlTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzYXZlUHJvZmlsZUJ0bjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBhbGxUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgZmlzaFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmYXZUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2xvdFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBrZW5vVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG90aGVyVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxvZ2luTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGxvZ2luLFxuICAgIH0sXG4gICAgaWQ6IG51bGwsXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyxcbiAgICBpdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgc21hbGxJdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgbGVmdHRpbHRBbmdsZTogLTcsIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgdGlsdER1cmF0aW9uOiAwLjIsIC8vIER1cmF0aW9uIG9mIHRoZSB0aWx0IGFuaW1hdGlvblxuICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgcmlnaHR0aWx0QW5nbGU6IDcsXG4gICAgdGFyZ2V0WDogMCxcbiAgICBtb3ZlRHVyYXRpb246IDIuMCxcbiAgICBzY2FsZVVwOiAwLjksIC8vIFNjYWxlIGZhY3RvciB3aGVuIG1vdXNlIGVudGVyc1xuICAgIHNjYWxlTm9ybWFsOiAwLjksXG4gICAgaXRlbXNQZXJMb2FkOiAxMCxcbiAgICBteVdlYlZpZXdQYXJlbnQ6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICB9LFxuICAgIG15V2ViVmlldzogY2MuV2ViVmlldyxcbiAgICBjdXN0b21LZXlib2FyZDp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgfSxcbiAgc21hbGxBbHBoYWJldDp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICB9LFxuICBjYXBpdGFsQWxwaGFiZXQ6e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgc3ltYm9sc0FscGhhYmV0OiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTpjYy5Ob2RlXG4gIH0sXG4gIGNhcHNCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgc21hbGxCdXR0b246e1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGVcbiAgfSxcbiAgZGVsZXRlQnV0dG9uOiB7XG4gICAgICBkZWZhdWx0Om51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIHNwYWNlQnV0dG9uOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIGNvbW1hQnV0dG9uOntcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlXG4gIH0sXG4gIGRvdEJ1dHRvbjp7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZVxuICB9XG4gIH0sXG5cbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgb25Mb2FkKCkge1xuICAgIGlmICghdGhpcy5jYXRlZ29yeSkge1xuICAgICAgdGhpcy5jYXRlZ29yeSA9IFwiYWxsXCI7XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVJbnB1dEZpZWxkID0gbnVsbDsgXG4gICAgdGhpcy5zZXR1cExvYmJ5SW5wdXRGb2N1c0xpc3RlbmVycygpO1xuICAgIHRoaXMuc2V0dXBMb2JieUtleWJvYXJkQnV0dG9uTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5kaXNhYmxlRGVmYXVsdEtleWJvYXJkKCk7XG5cbiAgICB0aGlzLml0ZW1zVG9Mb2FkID0gW107IC8vIEFycmF5IHRvIHN0b3JlIGFsbCBpdGVtcyB0byBiZSBsb2FkZWRcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7IC8vIEN1cnJlbnQgaW5kZXggaW4gdGhlIGl0ZW1zIGFycmF5XG4gICAgdGhpcy5zZXRGdWxsU2NyZWVuV2lkdGgoKTtcbiAgICBjYy52aWV3LnNldFJlc2l6ZUNhbGxiYWNrKHRoaXMuc2V0RnVsbFNjcmVlbldpZHRoLmJpbmQodGhpcykpOyAvLyBVcGRhdGUgd2lkdGggb24gc2NyZWVuIHJlc2l6ZVxuICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLm9uKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMubG9hZE1vcmVJdGVtcywgdGhpcyk7IC8vIEV2ZW50IGxpc3RlbmVyIGZvciBob3Jpem9udGFsIHNjcm9sbGluZ1xuICAgIGxldCBjdXJyZW50UG9zID0gdGhpcy5jbG91ZEFuaW1Ob2RlLmdldFBvc2l0aW9uKCk7XG4gICAgbGV0IG1vdmVBY3Rpb24gPSBjYy5tb3ZlVG8oXG4gICAgICB0aGlzLm1vdmVEdXJhdGlvbixcbiAgICAgIGNjLnYyKHRoaXMudGFyZ2V0WCwgY3VycmVudFBvcy55KVxuICAgICk7XG4gICAgdGhpcy5nZXRVc2VyRGV0YWlscygpO1xuICAgIC8vIFJ1biB0aGUgbW92ZSBhY3Rpb24gb24gdGhlIHNwcml0ZSBub2RlXG4gICAgdGhpcy5jbG91ZEFuaW1Ob2RlLnJ1bkFjdGlvbihtb3ZlQWN0aW9uKTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgRmV0YWNoIEdhbWVzIGJ5IGNhdGVnb3J5XG4gICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAqL1xuICBmZXRjaEdhbWVzOiBmdW5jdGlvbiAoZ2FtZUNhdGVnb3J5KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudDtcbiAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG5cbiAgICB2YXIgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5nYW1lICsgXCI9XCIgKyBnYW1lQ2F0ZWdvcnk7XG4gICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiR0VUXCIsIGFkZHJlc3MsIFwiIFwiLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmZlYXR1cmVkLmxlbmd0aCA9PT0gMCAmJiByZXNwb25zZS5vdGhlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSBcIk5vIEdhbWVzIEZvdW5kIEZvciBUaGlzIENhdGVnb3J5XCI7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG90aGVyR2FtZXMgPSByZXNwb25zZS5vdGhlcnMgfHwgW107XG4gICAgICAgIGxldCBmZWF0dXJlZCA9IHJlc3BvbnNlLmZlYXR1cmVkIHx8IFtdO1xuXG4gICAgICAgIHRoaXMuaXRlbXNUb0xvYWQgPSBbXTtcbiAgICAgICAgbGV0IGZlYXR1cmVkSW5kZXggPSAwO1xuICAgICAgICAvLyBJbnNlcnQgYSBmZWF0dXJlZCBpdGVtIGFmdGVyIGV2ZXJ5IDIgb3RoZXIgaXRlbXNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdGhlckdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDAgJiYgZmVhdHVyZWRJbmRleCA8IGZlYXR1cmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNUb0xvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGZlYXR1cmVkW2ZlYXR1cmVkSW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBwcmVmYWI6IHRoaXMuc21hbGxJdGVtUHJlZmFiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZlYXR1cmVkSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXRlbXNUb0xvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0YTogb3RoZXJHYW1lc1tpXSxcbiAgICAgICAgICAgICAgICBwcmVmYWI6IHRoaXMuaXRlbVByZWZhYixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHJlbWFpbmluZyBmZWF0dXJlZCBpdGVtcyBhbmQgbGVzcyB0aGFuIDMgb3RoZXJHYW1lcywgYWRkIHRoZSBmZWF0dXJlZCBpdGVtcyBhdCB0aGUgZW5kXG4gICAgICAgIHdoaWxlIChmZWF0dXJlZEluZGV4IDwgZmVhdHVyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zVG9Mb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGE6IGZlYXR1cmVkW2ZlYXR1cmVkSW5kZXhdLFxuICAgICAgICAgICAgICAgIHByZWZhYjogdGhpcy5zbWFsbEl0ZW1QcmVmYWIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZlYXR1cmVkSW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBvdGhlckdhbWVzLCBhZGQgYWxsIGZlYXR1cmVkIGl0ZW1zXG4gICAgICAgIGlmIChvdGhlckdhbWVzLmxlbmd0aCA9PT0gMCAmJiBmZWF0dXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlYXR1cmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1RvTG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZmVhdHVyZWRbaV0sXG4gICAgICAgICAgICAgICAgICAgIHByZWZhYjogdGhpcy5zbWFsbEl0ZW1QcmVmYWIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubG9hZE1vcmVJdGVtcygpOyAvLyBMb2FkIHRoZSBmaXJzdCBiYXRjaCBvZiBpdGVtc1xuICAgIH0uYmluZCh0aGlzKSk7XG59LFxuXG5sb2FkTW9yZUl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMuaXRlbXNUb0xvYWQubGVuZ3RoKSByZXR1cm47IC8vIE5vIG1vcmUgaXRlbXMgdG8gbG9hZFxuICAgIGxldCBlbmRJbmRleCA9IE1hdGgubWluKFxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuaXRlbXNQZXJMb2FkLFxuICAgICAgICB0aGlzLml0ZW1zVG9Mb2FkLmxlbmd0aFxuICAgICk7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY3VycmVudEluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKykge1xuICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLml0ZW1zVG9Mb2FkW2ldO1xuICAgICAgICB0aGlzLnBvcHVsYXRlSXRlbXMoaXRlbURhdGEuZGF0YSwgaXRlbURhdGEucHJlZmFiKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBlbmRJbmRleDtcbn0sXG5cbi8vIERyYXcgR2FtZSBJdGVtcyBpbiBMb2JieVxucG9wdWxhdGVJdGVtczogZnVuY3Rpb24gKGl0ZW1EYXRhLCBwcmVmYWIpIHtcbiAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgbGV0IGl0ZW1TY3JpcHQgPSBpdGVtLmdldENvbXBvbmVudChcIkdhbWVzUHJlZmFiXCIpO1xuICAgIGl0ZW1TY3JpcHQudXBkYXRlSXRlbShpdGVtRGF0YSk7XG4gICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG59LFxuXG5cbiAgZ2V0R2FtZXNCeUNhdGVnb3J5QWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwiYWxsXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcblxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlmaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwiZmlzaFwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG4gIGdldEdhbWVzQnlDYXRlZ29yeWZhdjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcImZhdlwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG4gIGdldEdhbWVzQnlDYXRlZ29yeVNsb3Q6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcInNsb3RcIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlLZW5vOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJrZW5vXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5T3RoZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcIm90aGVyc1wiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG5cbiAgLy8gZm9yIGZ1bGwgU2NyZWVuXG4gIHpvb21GdWxsU2NyZWVuQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oXG4gICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldEZ1bGxTY3JlZW5XaWR0aCgpO1xuICB9LFxuICAvLyBDbG9zZSBTcGluIFBvcHVwIE5vZGVcbiAgY2xvc2VTcGluTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIC8vIE9wZW4gU3BpbiB0aGUgV2hlZWwgcG9wdXAgYW5kIHJ1biBvdXRlciBhbmltYXRpb25cbiAgb3BlblNwaW5XaGVlbE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICB2YXIgY29udGludWVSb3RhdGUgPSBjYy5yZXBlYXRGb3JldmVyKHJvdGF0ZUFjdGlvbik7XG4gICAgdGhpcy5PdXRlckFuaW1hdGlvbi5ydW5BY3Rpb24oY29udGludWVSb3RhdGUpO1xuICAgIGlmICghdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIG9wZW5XZWJWaWV3OiBmdW5jdGlvbih1cmwpIHtcbiAgICBsZXQgaW5zdCA9IHRoaXNcbiAgICBsZXQgdG9rZW4gPSBudWxsO1xuICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjb29raWUuc3RhcnRzV2l0aCgndXNlclRva2VuPScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBjb29raWUuc3Vic3RyaW5nKCd1c2VyVG9rZW49Jy5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW4gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpO1xuICAgIH1cbiAgICAvLyBTZXQgdGhlIFdlYlZpZXcgVVJMXG4gICAgdGhpcy5teVdlYlZpZXcudXJsID0gdXJsO1xuICAgIHRoaXMubXlXZWJWaWV3UGFyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5teVdlYlZpZXcubm9kZS5vbignbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMubXlXZWJWaWV3LmV2YWx1YXRlSlMoYFxuICAgICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2F1dGhUb2tlbicsIHRva2VuOiAnJHt0b2tlbn0nIH0sICcke3VybH0nKTtcbiAgICAgICAgICAgIGApO1xuICAgICAgICB9XG4gICAgfSk7ICAgXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm1lc3NhZ2VcIiwgZXZlbnQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhO1xuICAgIGlmIChtZXNzYWdlID09PSAnYXV0aFRva2VuJykge1xuICAgICAgICBpbnN0Lm15V2ViVmlldy5ub2RlLl9jb21wb25lbnRzWzBdLl9pbXBsLl9pZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdhdXRoVG9rZW4nLCBjb29raWU6IHRva2VuIH0sIGAke3VybH1gKTtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UgPT09IFwib25FeGl0XCIpIHtcbiAgICAgIGluc3QubXlXZWJWaWV3LnVybCA9IFwiXCI7XG4gICAgICBpbnN0Lm15V2ViVmlld1BhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59KTtcbn0sXG4gZ2V0VXNlckRldGFpbHM6IGZ1bmN0aW9uKCl7ICBcbiAgbGV0IGluc3Q9IHRoaXNcbiAgbGV0IGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkudXNlckRldGFpbHNcbiAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgXCJcIiwgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgLy8gbGV0IHVzZXJuYW1lID0gcmVzcG9uc2UudXNlcm5hbWU7IC8vIEFzc3VtaW5nIHJlc3BvbnNlLnVzZXJuYW1lIGlzICdpbnMnXG4gICAgICAvLyBsZXQgY2FwaXRhbGl6ZWRVc2VybmFtZSA9IGluc3QuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHVzZXJuYW1lKTtcbiAgICAgIGluc3QuaWQgPSByZXNwb25zZS5faWQ7XG4gICAgICBpbnN0LnVzZXJJZC5zdHJpbmcgPSByZXNwb25zZS51c2VybmFtZVxuICAgICAgaW5zdC5jb2luc0xhYmVsLnN0cmluZyA9IHJlc3BvbnNlLmNyZWRpdHM7XG4gICAgfSlcbiB9LFxuXG4gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyOiBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuIH0sXG4gIC8vIG9wZW4gUHJvZmlsZSBwb3B1cFxuICBvcGVuUHJvZmxlUG9wdXA6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgfSxcbiAgLy8gTG9nb3V0IEJ1dHRvbiBDbGlja2VkXG4gIGxvZ091dENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubG9naW5Ob2RlLmxvZ3V0Q2xpY2soKTtcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBQYXNzd29yZENoYW5nZSBQb3B1cCByZXF1ZXN0XG4gICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAqL1xuICBwYXNzd29yZENoYW5nZUJ0bjogZnVuY3Rpb24gKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZyA9PSBcIlwiXG4gICAgKSB7XG4gICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSBcIkFsbCBmaWVsZHMgYXJlIG1hbmRhdG9yeVwiO1xuICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpIHtcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID1cbiAgICAgICAgICBcIk5ldyBQYXNzd29yZCBhbmQgY29uZmlybSBwYXNzd29yZCBkaWQgbm90IG1hdGNoXCI7XG4gICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCB0b2tlbiA9IG51bGxcbiAgICAgIGlmICghdG9rZW4gJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS50cmltKCk7XG4gICAgICAgICAgICBpZiAoY29va2llLnN0YXJ0c1dpdGgoJ3Rva2VuPScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBjb29raWUuc3Vic3RyaW5nKCd0b2tlbj0nLmxlbmd0aCwgY29va2llLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXIgPSBqd3QuZGVjb2RlKHRva2VuKTtcbiAgICAgIGxldCBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLnBhc3N3b3JkICsgYC9gICsgdGhpcy5pZDtcbiAgICAgIGxldCBjaGFuZ2VEYXRhID0ge1xuICAgICAgICBleGlzdGluZ1Bhc3N3b3JkOiB0aGlzLm9sZFBhc3N3b3JkLnN0cmluZyxcbiAgICAgICAgcGFzc3dvcmQgOiB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZ1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coY2hhbmdlRGF0YSwgXCJwYXNcIik7XG4gICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQVVRcIiwgYWRkcmVzcywgY2hhbmdlRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgaWYocmVzcG9uc2UubWVzc2FnZSl7XG4gICAgICAgICAgU2VydmVyQ29tLmVycm9ySGVhZGluZy5zdHJpbmcgPSBcIlBhc3N3b3JkIENoYW5nZWQgU3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSByZXNwb25zZS5tZXNzYWdlO1xuICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgLy8gdG8gb3BlbiB0aGUgcGFzc3dvcmQgcG9wdXBcbiAgY2hhbmdlUGFzc3dvcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gIH0sXG4gIC8vIGNsb3NlIGFsbCBwb3B1cFxuICBjbG9zZVBvcHVwQnRuOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSB8fCB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSkge1xuICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgfSxcblxuICAvLyBTYXZlIHByb2ZpbGUgYnV0dG9uIENsaWNrZWRcbiAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxuXG4gIHNldEZ1bGxTY3JlZW5XaWR0aCgpIHtcbiAgICBpZighZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQpe1xuICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUud2lkdGggPSAyMDUwO1xuICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoID0gMjA1MDtcbiAgICB9IGVsc2V7XG4gICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IGNjLndpblNpemUud2lkdGg7XG4gICAgICAvLyBTZXQgdGhlIHdpZHRoIG9mIHRoZSBTY3JvbGxWaWV3IG5vZGVcbiAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLndpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgLy8gU2V0IHRoZSB3aWR0aCBvZiB0aGUgVmlldyBub2RlIHdpdGhpbiB0aGUgU2Nyb2xsVmlld1xuICAgICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ2aWV3XCIpLndpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgfVxuICAgfSxcblxuICAgc2V0dXBMb2JieUlucHV0Rm9jdXNMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKGNjLnN5cy5pc01vYmlsZSAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICAvLyBBdHRhY2ggZm9jdXMgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBpbnB1dCBmaWVsZHNcbiAgICAgICAgICAgIGlmICh0aGlzLm9sZFBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbGRQYXNzd29yZC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbklucHV0RmllbGRDbGlja2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5ld1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdQYXNzd29yZC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbklucHV0RmllbGRDbGlja2VkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuY29uZmlybVBhc3N3b3JkKXtcbiAgICAgICAgICAgICAgdGhpcy5jb25maXJtUGFzc3dvcmQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25JbnB1dEZpZWxkQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlybVBhc3N3b3JkLm5vZGUub24oJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcy5vbklucHV0RmllbGRGb2N1c2VkLCB0aGlzKTtcbiAgICAgICAgICAgICAgdGhpcy5jb25maXJtUGFzc3dvcmQubm9kZS5vbignZWRpdGluZy1kaWQtZW5kZWQnLCB0aGlzLm9uSW5wdXRGaWVsZEJsdXJyZWQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uSW5wdXRGaWVsZENsaWNrZWQoZXZlbnQpIHtcbiAgICAgIC8vIEZvY3VzIHRoZSBjb3JyZXNwb25kaW5nIGlucHV0IGZpZWxkIHRvIHRyaWdnZXIgdGhlIGtleWJvYXJkXG4gICAgICBjb25zdCBpbnB1dE5vZGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcbiAgICAgIGlmIChpbnB1dE5vZGUpIHtcbiAgICAgICAgICAvLyBpbnB1dE5vZGUuZm9jdXMoKVxuICAgICAgICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZCA9IGlucHV0Tm9kZTtcbiAgICAgICAgICBpZiAodGhpcy5jdXN0b21LZXlib2FyZCkge1xuICAgICAgICAgICAgICB0aGlzLmN1c3RvbUtleWJvYXJkLmFjdGl2ZSA9IHRydWU7IC8vIFNob3cgdGhlIGN1c3RvbSBrZXlib2FyZCBpZiBuZWVkZWRcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG9uSW5wdXRGaWVsZEZvY3VzZWQ6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnRGb2N1c2VkXCIsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGlucHV0Tm9kZSA9IGV2ZW50Lm5vZGUuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xuICAgICAgICBpZiAoaW5wdXROb2RlKSB7XG4gICAgICAgICAgICBpbnB1dE5vZGUucGxhY2Vob2xkZXIgPSBcIlwiOyAvLyBSZW1vdmUgdGhlIHBsYWNlaG9sZGVyIHRleHQgd2hlbiBmb2N1c2VkXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25JbnB1dEZpZWxkQmx1cnJlZDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgY29uc3QgaW5wdXROb2RlID0gZXZlbnQubm9kZS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIGlmIChpbnB1dE5vZGUpIHtcbiAgICAgICAgICAgIC8vIGlucHV0Tm9kZS5wbGFjZWhvbGRlciA9IGlucHV0Tm9kZS5fcGxhY2Vob2xkZXJMYWJlbC5zdHJpbmc7IC8vIFJlc3RvcmUgdGhlIHBsYWNlaG9sZGVyIHRleHQgd2hlbiBibHVycmVkXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgc2V0dXBMb2JieUtleWJvYXJkQnV0dG9uTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBhbGxLZXlib2FyZEJ1dHRvbnMgPSB0aGlzLmdldEFsbEtleWJvYXJkQnV0dG9ucygpO1xuICAgICAgICBhbGxLZXlib2FyZEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbktleWJvYXJkQnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5kZWxldGVCdXR0b24pIHsgLy8gQWRkIGxpc3RlbmVyIGZvciB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy5kZWxldGVCdXR0b24ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uRGVsZXRlQnV0dG9uQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0QWxsS2V5Ym9hcmRCdXR0b25zKCkge1xuICAgICAgbGV0IGJ1dHRvbnMgPSBbXTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5zbWFsbEFscGhhYmV0LmNoaWxkcmVuKTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5jYXBpdGFsQWxwaGFiZXQuY2hpbGRyZW4pO1xuICAgICAgICAgIGJ1dHRvbnMgPSBidXR0b25zLmNvbmNhdCh0aGlzLnN5bWJvbHNBbHBoYWJldC5jaGlsZHJlbik7XG4gICAgICAgICAgYnV0dG9ucyA9IGJ1dHRvbnMuY29uY2F0KHRoaXMuc3BhY2VCdXR0b24pO1xuICAgICAgICAgIGJ1dHRvbnMgPSBidXR0b25zLmNvbmNhdCh0aGlzLmNvbW1hQnV0dG9uKTtcbiAgICAgICAgICBidXR0b25zID0gYnV0dG9ucy5jb25jYXQodGhpcy5kb3RCdXR0b24pO1xuICAgICAgICAgIHJldHVybiBidXR0b25zO1xuICAgICAgfSxcblxuICAgICAgb25LZXlib2FyZEJ1dHRvbkNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgY3VzdG9tRXZlbnRWYWx1ZSA9IGJ1dHRvbi5fY29tcG9uZW50c1sxXS5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGE7XG4gICAgICAgICAgdGhpcy5hcHBlbmRUb0FjdGl2ZUlucHV0KGN1c3RvbUV2ZW50VmFsdWUpO1xuICAgICAgfSxcblxuICAgICAgYXBwZW5kVG9BY3RpdmVJbnB1dCh2YWx1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUlucHV0RmllbGQpIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJbnB1dEZpZWxkLnN0cmluZyArPSB2YWx1ZTsgLy8gQXBwZW5kIHZhbHVlIHRvIHRoZSBhY3RpdmUgaW5wdXQgZmllbGRcbiAgICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25EZWxldGVCdXR0b25DbGlja2VkKCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUFjdGl2ZUlucHV0KCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmVGcm9tQWN0aXZlSW5wdXQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbnB1dEZpZWxkICYmIHRoaXMuYWN0aXZlSW5wdXRGaWVsZC5zdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5wdXRGaWVsZC5zdHJpbmcgPSB0aGlzLmFjdGl2ZUlucHV0RmllbGQuc3RyaW5nLnNsaWNlKDAsIC0xKTsgLy8gUmVtb3ZlIGxhc3QgY2hhcmFjdGVyXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBcbiAgICAgICAgZGlzYWJsZURlZmF1bHRLZXlib2FyZDpmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUgJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJzsgLy8gRGlzYWJsZSBpbnRlcmFjdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbn0pO1xuXG4iXX0=