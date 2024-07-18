"use strict";
cc._RF.push(module, 'ac1ac5oJ6VEUL3rD+Zja0yl', 'Login');
// Scripts/login/Login.js

"use strict";

// var responseTypes = require('ResponseTypes');
cc.Class({
  "extends": cc.Component,
  properties: {
    userName: {
      "default": null,
      type: cc.EditBox
    },
    password: {
      "default": null,
      type: cc.EditBox
    },
    rememberMe: {
      "default": null,
      type: cc.Toggle
    },
    lobbyNode: {
      "default": null,
      type: cc.Node
    },
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
      "default": null,
      type: cc.Node
    },
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
    // if(this.rememberMe){
    //     this.rememberMe.isChecked = false;
    // }   
    this.activeInputField = null;
    this.setupInputFocusListeners();
    this.setupKeyboardButtonListeners();
    this.disableDefaultKeyboard();
    this.loadSavedLoginInfo();

    if (cc.sys.isMobile && cc.sys.isBrowser) {
      console.log = function () {};
    }
  },
  disableDefaultKeyboard: function disableDefaultKeyboard() {
    if (cc.sys.isMobile && cc.sys.isBrowser) {
      var inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(function (input) {
        input.style.pointerEvents = 'none'; // Disable interactions
      });
    }
  },
  setupInputFocusListeners: function setupInputFocusListeners() {
    if (cc.sys.isMobile && cc.sys.isBrowser) {
      // Attach focus event listeners to username and password input fields
      if (this.userName) {
        this.userName.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
      }

      if (this.password) {
        this.password.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
      }
    }
  },
  onInputFieldClicked: function onInputFieldClicked(event) {
    var _this = this;

    // Focus the corresponding input field to trigger the keyboard
    // console.log(event);
    var inputNode = event.currentTarget.getComponent(cc.EditBox);

    if (inputNode) {
      // inputNode.focus()
      this.activeInputField = inputNode;

      if (this.customKeyboard) {
        this.customKeyboard.active = true; // Show the custom keyboard if needed

        event.preventDefault();
        this.scheduleOnce(function () {
          _this.activeInputField.blur(); // Blur the input field after showing the custom keyboard

        }, 0.1);
      }
    }
  },
  setupKeyboardButtonListeners: function setupKeyboardButtonListeners() {
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
  //logoutButton Clicked
  logutClick: function logutClick() {
    if (this.lobbyNode.active) {
      this.lobbyNode.active = false;
    }

    var rememberMeChecked;

    if (cc.sys.isBrowser) {
      rememberMeChecked = localStorage.getItem('rememberMeChecked');
    } else {
      rememberMeChecked = cc.sys.localStorage.getItem('rememberMeChecked');
    }

    if (!rememberMeChecked) {
      this.clearSavedLoginInfo();
    }
  },
  removeFromActiveInput: function removeFromActiveInput() {
    if (this.activeInputField && this.activeInputField.string.length > 0) {
      this.activeInputField.string = this.activeInputField.string.slice(0, -1); // Remove last character
    }
  },
  onLoginClick: function onLoginClick() {
    var _this3 = this;

    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };

    if (this.userName.string == "" || this.password.string == "") {
      this.errorLable.string = "Username or Password fields are empty";
      this.loginErrorNode.active = true;
      setTimeout(function () {
        _this3.loginErrorNode.active = false;
      }, 2000);
      return;
    }

    if (this.rememberMe.isChecked) {
      this.saveLoginInfo(this.userName.string, this.password.string);
    } else {
      this.clearSavedLoginInfo();
    }

    ServerCom.httpRequest("POST", address, data, function (response) {
      // console.error("reponse on login", response.token);
      if (response.token) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;

        if (cc.sys.isBrowser) {
          document.cookie = "userToken=" + response.token + "; path=/;";
          document.cookie = "index = " + randomNumber;
        } else {
          cc.sys.localStorage.setItem('userToken', response.token);
          cc.sys.localStorage.setItem("index", randomNumber);
        } // Cookies.set("index", randomNumber);


        setTimeout(function () {
          this.lobbyNode.active = true;
        }.bind(this), 1000);
      } else {}
    }.bind(this));
  },
  smallAlphabetBUttonClicked: function smallAlphabetBUttonClicked() {
    if (this.capitalAlphabet.active) {
      this.capitalAlphabet.active = false;
      this.smallAlphabet.active = true;

      if (this.symbolsAlphabet.active) {
        this.symbolsAlphabet.active = false;
      }

      this.smallButton.active = false;
      this.capsButton.active = true;
    } else {
      if (this.symbolsAlphabet.active) {
        this.symbolsAlphabet.active = false;
      }

      this.capitalAlphabet.active = true;
      this.smallAlphabet.active = false;
      this.smallButton.active = true;
      this.capsButton.active = false;
    }
  },
  specialSymbolClicked: function specialSymbolClicked() {
    if (this.capitalAlphabet.active || this.smallAlphabet.active) {
      this.smallAlphabet.active = false;
      this.capitalAlphabet.active = false;
      this.symbolsAlphabet.active = true;
    } else {
      this.symbolsAlphabet.active = false;

      if (!this.smallAlphabet.active) {
        this.smallAlphabet.active = true;
        this.capitalAlphabet.active = false;
      }
    }
  },
  closeKeyBoard: function closeKeyBoard() {
    this.customKeyboard.active = false;
  },
  saveLoginInfo: function saveLoginInfo(username, password) {
    if (cc.sys.isBrowser) {
      localStorage.setItem('rememberedUsername', username);
      localStorage.setItem('rememberedPassword', password);
      localStorage.setItem('rememberMeChecked', 'true');
    } else {
      cc.sys.localStorage.setItem('rememberedUsername', username);
      cc.sys.localStorage.setItem('rememberedPassword', password);
      cc.sys.localStorage.setItem('rememberMeChecked', 'true');
    }
  },
  clearSavedLoginInfo: function clearSavedLoginInfo() {
    if (cc.sys.isBrowser) {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
      localStorage.removeItem('rememberMeChecked');
    } else {
      cc.sys.localStorage.removeItem('rememberedUsername');
      cc.sys.localStorage.removeItem('rememberedPassword');
      cc.sys.localStorage.removeItem('rememberMeChecked');
    }
  },
  loadSavedLoginInfo: function loadSavedLoginInfo() {
    var username, password, rememberMeChecked;

    if (cc.sys.isBrowser) {
      username = localStorage.getItem('rememberedUsername');
      password = localStorage.getItem('rememberedPassword');
      rememberMeChecked = localStorage.getItem('rememberMeChecked');
    } else {
      username = cc.sys.localStorage.getItem('rememberedUsername');
      password = cc.sys.localStorage.getItem('rememberedPassword');
      rememberMeChecked = cc.sys.localStorage.getItem('rememberMeChecked');
    }

    if (username && password) {
      this.userName.string = username;
      this.password.string = password;
    }

    if (rememberMeChecked === 'true') {
      this.rememberMe.isChecked = true; // this.rememberMe.getChildByName("checkmark").active = true
    }
  }
});

cc._RF.pop();