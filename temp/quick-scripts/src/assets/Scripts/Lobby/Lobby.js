"use strict";
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