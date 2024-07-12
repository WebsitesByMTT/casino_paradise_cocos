
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
      type: cc.Label
    },
    newPassword: {
      "default": null,
      type: cc.Label
    },
    confirmPassword: {
      "default": null,
      type: cc.Label
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
    myWebView: cc.WebView
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    this.itemsToLoad = []; // Array to store all items to be loaded

    this.currentIndex = 0; // Current index in the items array

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
      var featuredIndex = 0;
      console.log("otherGames", otherGames);
      console.log("featured", featured); // Insert a featured item after every 2 other items

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
    this.myWebView.node.active = true;
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
        inst.myWebView.node.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbImxvZ2luIiwicmVxdWlyZSIsImp3dCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidXNlcklkIiwidHlwZSIsIkxhYmVsIiwiY29pbnNMYWJlbCIsImNsb3VkQW5pbU5vZGUiLCJOb2RlIiwic3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJzbWFsbEl0ZW1Ob2RlIiwicmlnaHRUaWx0Tm9kZSIsImxlZnRUaWx0Tm9kZSIsInNwaW5XaGVlbE5vZGUiLCJPdXRlckFuaW1hdGlvbiIsInBhc3N3b3JkTm9kZSIsInBhc3N3b3JkQ2hhbmdlQnV0dG9uIiwicG9wdXBOb2RlIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInByb2ZpbGVOb2RlIiwic2F2ZVByb2ZpbGVCdG4iLCJhbGxUYWIiLCJmaXNoVGFiIiwiZmF2VGFiIiwic2xvdFRhYiIsImtlbm9UYWIiLCJvdGhlclRhYiIsImxvZ2luTm9kZSIsImlkIiwic2Nyb2xsVmlldyIsIlNjcm9sbFZpZXciLCJpdGVtUHJlZmFiIiwiUHJlZmFiIiwic21hbGxJdGVtUHJlZmFiIiwiY2F0ZWdvcnkiLCJsZWZ0dGlsdEFuZ2xlIiwidGlsdER1cmF0aW9uIiwib3JpZ2luYWxSb3RhdGlvbiIsInJpZ2h0dGlsdEFuZ2xlIiwidGFyZ2V0WCIsIm1vdmVEdXJhdGlvbiIsInNjYWxlVXAiLCJzY2FsZU5vcm1hbCIsIml0ZW1zUGVyTG9hZCIsIm15V2ViVmlldyIsIldlYlZpZXciLCJvbkxvYWQiLCJpdGVtc1RvTG9hZCIsImN1cnJlbnRJbmRleCIsIm5vZGUiLCJvbiIsImxvYWRNb3JlSXRlbXMiLCJjdXJyZW50UG9zIiwiZ2V0UG9zaXRpb24iLCJtb3ZlQWN0aW9uIiwibW92ZVRvIiwidjIiLCJ5IiwiZ2V0VXNlckRldGFpbHMiLCJydW5BY3Rpb24iLCJmZXRjaEdhbWVzIiwiZ2FtZUNhdGVnb3J5IiwiY29udGVudCIsInJlbW92ZUFsbENoaWxkcmVuIiwiYWRkcmVzcyIsIksiLCJTZXJ2ZXJBZGRyZXNzIiwiaXBBZGRyZXNzIiwiU2VydmVyQVBJIiwiZ2FtZSIsIlNlcnZlckNvbSIsImh0dHBSZXF1ZXN0IiwicmVzcG9uc2UiLCJmZWF0dXJlZCIsImxlbmd0aCIsIm90aGVycyIsImVycm9yTGFibGUiLCJzdHJpbmciLCJsb2dpbkVycm9yTm9kZSIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJvdGhlckdhbWVzIiwiZmVhdHVyZWRJbmRleCIsImNvbnNvbGUiLCJsb2ciLCJpIiwicHVzaCIsImRhdGEiLCJwcmVmYWIiLCJiaW5kIiwiZW5kSW5kZXgiLCJNYXRoIiwibWluIiwiaXRlbURhdGEiLCJwb3B1bGF0ZUl0ZW1zIiwiaXRlbSIsImluc3RhbnRpYXRlIiwiaXRlbVNjcmlwdCIsImdldENvbXBvbmVudCIsInVwZGF0ZUl0ZW0iLCJhZGRDaGlsZCIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJyZXBlYXRGb3JldmVyIiwib3BlbldlYlZpZXciLCJ1cmwiLCJpbnN0IiwidG9rZW4iLCJzeXMiLCJpc0Jyb3dzZXIiLCJjb29raWVzIiwiY29va2llIiwic3BsaXQiLCJ0cmltIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJldmFsdWF0ZUpTIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJfY29tcG9uZW50cyIsIl9pbXBsIiwiX2lmcmFtZSIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsInVzZXJEZXRhaWxzIiwiX2lkIiwidXNlcm5hbWUiLCJjcmVkaXRzIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIm9wZW5Qcm9mbGVQb3B1cCIsImxvZ091dENsaWNrIiwibG9ndXRDbGljayIsInBhc3N3b3JkQ2hhbmdlQnRuIiwidXNlciIsImRlY29kZSIsInBhc3N3b3JkIiwiY2hhbmdlRGF0YSIsImV4aXN0aW5nUGFzc3dvcmQiLCJlcnJvckhlYWRpbmciLCJjaGFuZ2VQYXNzd29yZCIsImNsb3NlUG9wdXBCdG4iLCJzYXZlUHJvZmlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBLElBQU1DLEdBQUcsR0FBR0QsT0FBTyxDQUFDLGNBQUQsQ0FBbkI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFB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Y2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvZ2luID0gcmVxdWlyZShcIkxvZ2luXCIpO1xuY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7IFxuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIHVzZXJJZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY29pbnNMYWJlbDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY2xvdWRBbmltTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzcHJpdGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICB9LFxuICAgIHNtYWxsSXRlbU5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcmlnaHRUaWx0Tm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBsZWZ0VGlsdE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc3BpbldoZWVsTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBPdXRlckFuaW1hdGlvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBwYXNzd29yZE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcGFzc3dvcmRDaGFuZ2VCdXR0b246IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgcG9wdXBOb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG9sZFBhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBuZXdQYXNzd29yZDoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgY29uZmlybVBhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBwcm9maWxlTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzYXZlUHJvZmlsZUJ0bjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBhbGxUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgZmlzaFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmYXZUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgc2xvdFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBrZW5vVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIG90aGVyVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxvZ2luTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGxvZ2luLFxuICAgIH0sXG4gICAgaWQ6IG51bGwsXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyxcbiAgICBpdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgc21hbGxJdGVtUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgbGVmdHRpbHRBbmdsZTogLTcsIC8vIEFuZ2xlIHRvIHRpbHQgdGhlIG5vZGUgKGluIGRlZ3JlZXMpXG4gICAgdGlsdER1cmF0aW9uOiAwLjIsIC8vIER1cmF0aW9uIG9mIHRoZSB0aWx0IGFuaW1hdGlvblxuICAgIG9yaWdpbmFsUm90YXRpb246IDAsXG4gICAgcmlnaHR0aWx0QW5nbGU6IDcsXG4gICAgdGFyZ2V0WDogMCxcbiAgICBtb3ZlRHVyYXRpb246IDIuMCxcbiAgICBzY2FsZVVwOiAwLjksIC8vIFNjYWxlIGZhY3RvciB3aGVuIG1vdXNlIGVudGVyc1xuICAgIHNjYWxlTm9ybWFsOiAwLjksXG4gICAgaXRlbXNQZXJMb2FkOiAxMCxcbiAgICBteVdlYlZpZXc6IGNjLldlYlZpZXcsXG4gIH0sXG5cbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgb25Mb2FkKCkge1xuICAgIGlmICghdGhpcy5jYXRlZ29yeSkge1xuICAgICAgdGhpcy5jYXRlZ29yeSA9IFwiYWxsXCI7XG4gICAgfVxuICAgIHRoaXMuaXRlbXNUb0xvYWQgPSBbXTsgLy8gQXJyYXkgdG8gc3RvcmUgYWxsIGl0ZW1zIHRvIGJlIGxvYWRlZFxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDsgLy8gQ3VycmVudCBpbmRleCBpbiB0aGUgaXRlbXMgYXJyYXlcbiAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLmxvYWRNb3JlSXRlbXMsIHRoaXMpOyAvLyBFdmVudCBsaXN0ZW5lciBmb3IgaG9yaXpvbnRhbCBzY3JvbGxpbmdcbiAgICBsZXQgY3VycmVudFBvcyA9IHRoaXMuY2xvdWRBbmltTm9kZS5nZXRQb3NpdGlvbigpO1xuICAgIGxldCBtb3ZlQWN0aW9uID0gY2MubW92ZVRvKFxuICAgICAgdGhpcy5tb3ZlRHVyYXRpb24sXG4gICAgICBjYy52Mih0aGlzLnRhcmdldFgsIGN1cnJlbnRQb3MueSlcbiAgICApO1xuICAgIHRoaXMuZ2V0VXNlckRldGFpbHMoKTtcbiAgICAvLyBSdW4gdGhlIG1vdmUgYWN0aW9uIG9uIHRoZSBzcHJpdGUgbm9kZVxuICAgIHRoaXMuY2xvdWRBbmltTm9kZS5ydW5BY3Rpb24obW92ZUFjdGlvbik7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIEZldGFjaCBHYW1lcyBieSBjYXRlZ29yeVxuICAgKiBAZGVzY3JpcHRpb24gSFRUUCByZXF1ZXN0IC0gUE9TVCBkYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIC1hZGRyZXNzIG9mIFNlcnZlclxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcbiAgICogQHBhcmFtIHttZXRob2R9IGNhbGxiYWNrIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjc3MgaXMgdHJ1ZSFcbiAgICogQHBhcmFtIHttZXRob2R9IGVycm9yIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjZXNzIGlzIGZhbHNlIVxuICAgKi9cbiAgZmV0Y2hHYW1lczogZnVuY3Rpb24gKGdhbWVDYXRlZ29yeSkge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XG4gICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgdmFyIGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2FtZSArIFwiPVwiICsgZ2FtZUNhdGVnb3J5O1xuICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIkdFVFwiLCBhZGRyZXNzLCBcIiBcIiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5mZWF0dXJlZC5sZW5ndGggPT09IDAgJiYgcmVzcG9uc2Uub3RoZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJObyBHYW1lcyBGb3VuZCBGb3IgVGhpcyBDYXRlZ29yeVwiO1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdGhlckdhbWVzID0gcmVzcG9uc2Uub3RoZXJzIHx8IFtdO1xuICAgICAgICBsZXQgZmVhdHVyZWQgPSByZXNwb25zZS5mZWF0dXJlZCB8fCBbXTtcblxuICAgICAgICB0aGlzLml0ZW1zVG9Mb2FkID0gW107XG4gICAgICAgIGxldCBmZWF0dXJlZEluZGV4ID0gMDtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm90aGVyR2FtZXNcIiwgb3RoZXJHYW1lcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmVhdHVyZWRcIiwgZmVhdHVyZWQpO1xuXG4gICAgICAgIC8vIEluc2VydCBhIGZlYXR1cmVkIGl0ZW0gYWZ0ZXIgZXZlcnkgMiBvdGhlciBpdGVtc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG90aGVyR2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBpICUgMiA9PT0gMCAmJiBmZWF0dXJlZEluZGV4IDwgZmVhdHVyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1RvTG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZmVhdHVyZWRbZmVhdHVyZWRJbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIHByZWZhYjogdGhpcy5zbWFsbEl0ZW1QcmVmYWIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmVhdHVyZWRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pdGVtc1RvTG9hZC5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRhOiBvdGhlckdhbWVzW2ldLFxuICAgICAgICAgICAgICAgIHByZWZhYjogdGhpcy5pdGVtUHJlZmFiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgcmVtYWluaW5nIGZlYXR1cmVkIGl0ZW1zIGFuZCBsZXNzIHRoYW4gMyBvdGhlckdhbWVzLCBhZGQgdGhlIGZlYXR1cmVkIGl0ZW1zIGF0IHRoZSBlbmRcbiAgICAgICAgd2hpbGUgKGZlYXR1cmVkSW5kZXggPCBmZWF0dXJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNUb0xvYWQucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0YTogZmVhdHVyZWRbZmVhdHVyZWRJbmRleF0sXG4gICAgICAgICAgICAgICAgcHJlZmFiOiB0aGlzLnNtYWxsSXRlbVByZWZhYixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmVhdHVyZWRJbmRleCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG90aGVyR2FtZXMsIGFkZCBhbGwgZmVhdHVyZWQgaXRlbXNcbiAgICAgICAgaWYgKG90aGVyR2FtZXMubGVuZ3RoID09PSAwICYmIGZlYXR1cmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVhdHVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zVG9Mb2FkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmZWF0dXJlZFtpXSxcbiAgICAgICAgICAgICAgICAgICAgcHJlZmFiOiB0aGlzLnNtYWxsSXRlbVByZWZhYixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5sb2FkTW9yZUl0ZW1zKCk7IC8vIExvYWQgdGhlIGZpcnN0IGJhdGNoIG9mIGl0ZW1zXG4gICAgfS5iaW5kKHRoaXMpKTtcbn0sXG5cbmxvYWRNb3JlSXRlbXM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5pdGVtc1RvTG9hZC5sZW5ndGgpIHJldHVybjsgLy8gTm8gbW9yZSBpdGVtcyB0byBsb2FkXG4gICAgbGV0IGVuZEluZGV4ID0gTWF0aC5taW4oXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5pdGVtc1BlckxvYWQsXG4gICAgICAgIHRoaXMuaXRlbXNUb0xvYWQubGVuZ3RoXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jdXJyZW50SW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuaXRlbXNUb0xvYWRbaV07XG4gICAgICAgIHRoaXMucG9wdWxhdGVJdGVtcyhpdGVtRGF0YS5kYXRhLCBpdGVtRGF0YS5wcmVmYWIpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGVuZEluZGV4O1xufSxcblxuLy8gRHJhdyBHYW1lIEl0ZW1zIGluIExvYmJ5XG5wb3B1bGF0ZUl0ZW1zOiBmdW5jdGlvbiAoaXRlbURhdGEsIHByZWZhYikge1xuICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcbiAgICBsZXQgaXRlbVNjcmlwdCA9IGl0ZW0uZ2V0Q29tcG9uZW50KFwiR2FtZXNQcmVmYWJcIik7XG4gICAgaXRlbVNjcmlwdC51cGRhdGVJdGVtKGl0ZW1EYXRhKTtcbiAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hZGRDaGlsZChpdGVtKTtcbn0sXG5cblxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuXG4gIGdldEdhbWVzQnlDYXRlZ29yeWZpc2g6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJmaXNoXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwiZmF2XCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5U2xvdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwic2xvdFwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG4gIGdldEdhbWVzQnlDYXRlZ29yeUtlbm86IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcImtlbm9cIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwib3RoZXJzXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcblxuICAvLyBmb3IgZnVsbCBTY3JlZW5cbiAgem9vbUZ1bGxTY3JlZW5DbGljazogZnVuY3Rpb24gKCkge1xuICAgIGlmIChcbiAgICAgICFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnRcbiAgICApIHtcbiAgICAgIC8vIGN1cnJlbnQgd29ya2luZyBtZXRob2RzXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oXG4gICAgICAgICAgRWxlbWVudC5BTExPV19LRVlCT0FSRF9JTlBVVFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIENsb3NlIFNwaW4gUG9wdXAgTm9kZVxuICBjbG9zZVNwaW5Ob2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc3BpbldoZWVsTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gT3BlbiBTcGluIHRoZSBXaGVlbCBwb3B1cCBhbmQgcnVuIG91dGVyIGFuaW1hdGlvblxuICBvcGVuU3BpbldoZWVsTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciByb3RhdGVBY3Rpb24gPSBjYy5yb3RhdGVCeSg1LCAzNjApO1xuICAgIHZhciBjb250aW51ZVJvdGF0ZSA9IGNjLnJlcGVhdEZvcmV2ZXIocm90YXRlQWN0aW9uKTtcbiAgICB0aGlzLk91dGVyQW5pbWF0aW9uLnJ1bkFjdGlvbihjb250aW51ZVJvdGF0ZSk7XG4gICAgaWYgKCF0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgb3BlbldlYlZpZXc6IGZ1bmN0aW9uKHVybCkge1xuICAgIGxldCBpbnN0ID0gdGhpc1xuICAgIGxldCB0b2tlbiA9IG51bGw7XG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd1c2VyVG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGNvb2tpZS5zdWJzdHJpbmcoJ3VzZXJUb2tlbj0nLmxlbmd0aCwgY29va2llLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJyk7XG4gICAgfVxuICAgIC8vIFNldCB0aGUgV2ViVmlldyBVUkxcbiAgICB0aGlzLm15V2ViVmlldy51cmwgPSB1cmw7XG4gICAgdGhpcy5teVdlYlZpZXcubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMubXlXZWJWaWV3Lm5vZGUub24oJ2xvYWRlZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLm15V2ViVmlldy5ldmFsdWF0ZUpTKGBcbiAgICAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdhdXRoVG9rZW4nLCB0b2tlbjogJyR7dG9rZW59JyB9LCAnJHt1cmx9Jyk7XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH0pOyAgIFxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJtZXNzYWdlXCIsIGV2ZW50KTtcbiAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuZGF0YTtcbiAgICBpZiAobWVzc2FnZSA9PT0gJ2F1dGhUb2tlbicpIHtcbiAgICAgICAgaW5zdC5teVdlYlZpZXcubm9kZS5fY29tcG9uZW50c1swXS5faW1wbC5faWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoeyB0eXBlOiAnYXV0aFRva2VuJywgY29va2llOiB0b2tlbiB9LCBgJHt1cmx9YCk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlID09PSBcIm9uRXhpdFwiKSB7XG4gICAgICBpbnN0Lm15V2ViVmlldy51cmwgPSBcIlwiO1xuICAgICAgaW5zdC5teVdlYlZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG59KTtcbn0sXG4gZ2V0VXNlckRldGFpbHM6IGZ1bmN0aW9uKCl7ICBcbiAgbGV0IGluc3Q9IHRoaXNcbiAgbGV0IGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkudXNlckRldGFpbHNcbiAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgXCJcIiwgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgLy8gbGV0IHVzZXJuYW1lID0gcmVzcG9uc2UudXNlcm5hbWU7IC8vIEFzc3VtaW5nIHJlc3BvbnNlLnVzZXJuYW1lIGlzICdpbnMnXG4gICAgICAvLyBsZXQgY2FwaXRhbGl6ZWRVc2VybmFtZSA9IGluc3QuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHVzZXJuYW1lKTtcbiAgICAgIGluc3QuaWQgPSByZXNwb25zZS5faWQ7XG4gICAgICBpbnN0LnVzZXJJZC5zdHJpbmcgPSByZXNwb25zZS51c2VybmFtZVxuICAgICAgaW5zdC5jb2luc0xhYmVsLnN0cmluZyA9IHJlc3BvbnNlLmNyZWRpdHM7XG4gICAgfSlcbiB9LFxuXG4gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyOiBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuIH0sXG4gIC8vIG9wZW4gUHJvZmlsZSBwb3B1cFxuICBvcGVuUHJvZmxlUG9wdXA6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgfSxcbiAgLy8gTG9nb3V0IEJ1dHRvbiBDbGlja2VkXG4gIGxvZ091dENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubG9naW5Ob2RlLmxvZ3V0Q2xpY2soKTtcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBQYXNzd29yZENoYW5nZSBQb3B1cCByZXF1ZXN0XG4gICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAqL1xuICBwYXNzd29yZENoYW5nZUJ0bjogZnVuY3Rpb24gKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZyA9PSBcIlwiXG4gICAgKSB7XG4gICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSBcIkFsbCBmaWVsZHMgYXJlIG1hbmRhdG9yeVwiO1xuICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpIHtcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID1cbiAgICAgICAgICBcIk5ldyBQYXNzd29yZCBhbmQgY29uZmlybSBwYXNzd29yZCBkaWQgbm90IG1hdGNoXCI7XG4gICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCB0b2tlbiA9IG51bGxcbiAgICAgIGlmICghdG9rZW4gJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS50cmltKCk7XG4gICAgICAgICAgICBpZiAoY29va2llLnN0YXJ0c1dpdGgoJ3Rva2VuPScpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBjb29raWUuc3Vic3RyaW5nKCd0b2tlbj0nLmxlbmd0aCwgY29va2llLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHVzZXIgPSBqd3QuZGVjb2RlKHRva2VuKTtcbiAgICAgIGxldCBhZGRyZXNzID0gSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLnBhc3N3b3JkICsgYC9gICsgdGhpcy5pZDtcbiAgICAgIGxldCBjaGFuZ2VEYXRhID0ge1xuICAgICAgICBleGlzdGluZ1Bhc3N3b3JkOiB0aGlzLm9sZFBhc3N3b3JkLnN0cmluZyxcbiAgICAgICAgcGFzc3dvcmQgOiB0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZ1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coY2hhbmdlRGF0YSwgXCJwYXNcIik7XG4gICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQVVRcIiwgYWRkcmVzcywgY2hhbmdlRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgaWYocmVzcG9uc2UubWVzc2FnZSl7XG4gICAgICAgICAgU2VydmVyQ29tLmVycm9ySGVhZGluZy5zdHJpbmcgPSBcIlBhc3N3b3JkIENoYW5nZWQgU3VjY2Vzc2Z1bGx5XCJcbiAgICAgICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSByZXNwb25zZS5tZXNzYWdlO1xuICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgLy8gdG8gb3BlbiB0aGUgcGFzc3dvcmQgcG9wdXBcbiAgY2hhbmdlUGFzc3dvcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gIH0sXG4gIC8vIGNsb3NlIGFsbCBwb3B1cFxuICBjbG9zZVBvcHVwQnRuOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSB8fCB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSkge1xuICAgICAgdGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgfSxcblxuICAvLyBTYXZlIHByb2ZpbGUgYnV0dG9uIENsaWNrZWRcbiAgc2F2ZVByb2ZpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb2ZpbGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxufSk7XG5cbiJdfQ==