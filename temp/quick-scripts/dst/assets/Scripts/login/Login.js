
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/login/Login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac1ac5oJ6VEUL3rD+Zja0yl', 'Login');
// Scripts/login/Login.js

"use strict";

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
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (this.rememberMe) {
      this.rememberMe.isChecked = false;
    }
  },
  logutClick: function logutClick() {
    if (this.lobbyNode.active) {
      this.lobbyNode.active = false;
    }
  },
  onLoginClick: function onLoginClick() {
    var _this = this;

    var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
    var data = {
      username: this.userName.string,
      password: this.password.string
    };

    if (this.userName.string == "" || this.password.string == "") {
      this.errorLable.string = "Username or Password fields are empty";
      this.loginErrorNode.active = true;
      setTimeout(function () {
        _this.loginErrorNode.active = false;
      }, 2000);
      return;
    }

    ServerCom.httpRequest("POST", address, data, function (response) {
      if (response.token) {
        console.log("token on login", response.token);
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
      } else {
        console.log("response of user not found on login page", response);
      }
    }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL2xvZ2luL0xvZ2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlck5hbWUiLCJ0eXBlIiwiRWRpdEJveCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsIlRvZ2dsZSIsImxvYmJ5Tm9kZSIsIk5vZGUiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsIm9uTG9hZCIsImlzQ2hlY2tlZCIsImxvZ3V0Q2xpY2siLCJhY3RpdmUiLCJvbkxvZ2luQ2xpY2siLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImRhdGEiLCJ1c2VybmFtZSIsInN0cmluZyIsInNldFRpbWVvdXQiLCJTZXJ2ZXJDb20iLCJodHRwUmVxdWVzdCIsInJlc3BvbnNlIiwidG9rZW4iLCJjb25zb2xlIiwibG9nIiwicmFuZG9tTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic3lzIiwiaXNCcm93c2VyIiwiZG9jdW1lbnQiLCJjb29raWUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLElBREg7QUFFTkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkgsS0FGRjtBQU1SQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5GLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBTkY7QUFVUkUsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSSCxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ1M7QUFGRCxL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QyxHQUFSLENBQVksMENBQVosRUFBd0RILFFBQXhEO0FBQ0g7QUFFSixLQXBCNEMsQ0FvQjNDYyxJQXBCMkMsQ0FvQnRDLElBcEJzQyxDQUE3QztBQXNCSDtBQWxGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94LFxuICAgICAgICB9LFxuICAgICAgICBwYXNzd29yZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3gsXG4gICAgICAgIH0sXG4gICAgICAgIHJlbWVtYmVyTWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ub2dnbGVcbiAgICAgICAgfSxcbiAgICAgICAgbG9iYnlOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckxhYmxlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2luRXJyb3JOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgIFxuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgaWYodGhpcy5yZW1lbWJlck1lKXtcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJNZS5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgIFxuICAgIH0sXG4gICAgbG9ndXRDbGljaygpe1xuICAgICAgICBpZih0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUpe1xuICAgICAgICAgICAgdGhpcy5sb2JieU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2dpbkNsaWNrICgpe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5sb2dpbjtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy51c2VyTmFtZS5zdHJpbmcsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZC5zdHJpbmdcbiAgICAgICAgfTtcbiAgICAgICAgaWYodGhpcy51c2VyTmFtZS5zdHJpbmcgPT0gXCJcIiB8fCB0aGlzLnBhc3N3b3JkLnN0cmluZyA9PSBcIlwiKXtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMYWJsZS5zdHJpbmcgPSBcIlVzZXJuYW1lIG9yIFBhc3N3b3JkIGZpZWxkcyBhcmUgZW1wdHlcIlxuICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQT1NUXCIsIGFkZHJlc3MsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b2tlbiBvbiBsb2dpblwiLCByZXNwb25zZS50b2tlbik7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgdXNlclRva2VuPSR7cmVzcG9uc2UudG9rZW59OyBwYXRoPS87YDtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGluZGV4ID0gJHtyYW5kb21OdW1iZXJ9YFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclRva2VuJywgcmVzcG9uc2UudG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmRleFwiLCByYW5kb21OdW1iZXIpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ29va2llcy5zZXQoXCJpbmRleFwiLCByYW5kb21OdW1iZXIpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2Ugb2YgdXNlciBub3QgZm91bmQgb24gbG9naW4gcGFnZVwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIH0sXG59KTsiXX0=