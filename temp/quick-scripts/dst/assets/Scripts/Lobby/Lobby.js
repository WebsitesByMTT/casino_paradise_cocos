
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

var Cookies = require("js-cookies");

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
    itemsPerLoad: 10
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
    var moveAction = cc.moveTo(this.moveDuration, cc.v2(this.targetX, currentPos.y)); // Run the move action on the sprite node

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
    ServerCom.httpRequest("GET", address, "", function (response) {
      if (response.featured.length === 0 && response.otherGames.length === 0) {
        ServerCom.errorLable.string = "No Games Found For This Category";
        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
        return;
      }

      var otherGames = response.otherGames || [];
      var featured = response.featured || [];
      this.itemsToLoad = []; // Insert the featured item at the third position

      for (var i = 0; i < otherGames.length; i++) {
        if (i === 2 && featured.length > 0) {
          this.itemsToLoad.push({
            data: featured[0],
            prefab: this.smallItemPrefab
          });
        }

        this.itemsToLoad.push({
          data: otherGames[i],
          prefab: this.itemPrefab
        });
      } // If there are less than 3 otherGames, add the featured item at the end if it hasn't been added yet


      if (otherGames.length < 3 && featured.length > 0) {
        this.itemsToLoad.push({
          data: featured[0],
          prefab: this.smallItemPrefab
        });
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
      var address = K.ServerAddress.ipAddress + K.ServerAPI.password + ("/" + user.username);
      var changeData = {
        changedPassword: this.newPassword.string
      };
      ServerCom.httpRequest("PUT", address, changeData, function (resposen) {
        console.log("response", response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0xvYmJ5L0xvYmJ5LmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJyZXF1aXJlIiwibG9naW4iLCJqd3QiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInVzZXJJZCIsInR5cGUiLCJMYWJlbCIsImNvaW5zTGFiZWwiLCJjbG91ZEFuaW1Ob2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic21hbGxJdGVtTm9kZSIsInJpZ2h0VGlsdE5vZGUiLCJsZWZ0VGlsdE5vZGUiLCJzcGluV2hlZWxOb2RlIiwiT3V0ZXJBbmltYXRpb24iLCJwYXNzd29yZE5vZGUiLCJwYXNzd29yZENoYW5nZUJ1dHRvbiIsInBvcHVwTm9kZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJwcm9maWxlTm9kZSIsInNhdmVQcm9maWxlQnRuIiwiYWxsVGFiIiwiZmlzaFRhYiIsImZhdlRhYiIsInNsb3RUYWIiLCJrZW5vVGFiIiwib3RoZXJUYWIiLCJsb2dpbk5vZGUiLCJzY3JvbGxWaWV3IiwiU2Nyb2xsVmlldyIsIml0ZW1QcmVmYWIiLCJQcmVmYWIiLCJzbWFsbEl0ZW1QcmVmYWIiLCJjYXRlZ29yeSIsImxlZnR0aWx0QW5nbGUiLCJ0aWx0RHVyYXRpb24iLCJvcmlnaW5hbFJvdGF0aW9uIiwicmlnaHR0aWx0QW5nbGUiLCJ0YXJnZXRYIiwibW92ZUR1cmF0aW9uIiwic2NhbGVVcCIsInNjYWxlTm9ybWFsIiwiaXRlbXNQZXJMb2FkIiwib25Mb2FkIiwiaXRlbXNUb0xvYWQiLCJjdXJyZW50SW5kZXgiLCJub2RlIiwib24iLCJsb2FkTW9yZUl0ZW1zIiwiY3VycmVudFBvcyIsImdldFBvc2l0aW9uIiwibW92ZUFjdGlvbiIsIm1vdmVUbyIsInYyIiwieSIsInJ1bkFjdGlvbiIsImZldGNoR2FtZXMiLCJnYW1lQ2F0ZWdvcnkiLCJjb250ZW50IiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJhZGRyZXNzIiwiSyIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJnYW1lIiwiU2VydmVyQ29tIiwiaHR0cFJlcXVlc3QiLCJyZXNwb25zZSIsImZlYXR1cmVkIiwibGVuZ3RoIiwib3RoZXJHYW1lcyIsImVycm9yTGFibGUiLCJzdHJpbmciLCJsb2dpbkVycm9yTm9kZSIsImFjdGl2ZSIsInNldFRpbWVvdXQiLCJpIiwicHVzaCIsImRhdGEiLCJwcmVmYWIiLCJiaW5kIiwiZW5kSW5kZXgiLCJNYXRoIiwibWluIiwiaXRlbURhdGEiLCJwb3B1bGF0ZUl0ZW1zIiwiaXRlbSIsImluc3RhbnRpYXRlIiwiaXRlbVNjcmlwdCIsImdldENvbXBvbmVudCIsInVwZGF0ZUl0ZW0iLCJhZGRDaGlsZCIsImdldEdhbWVzQnlDYXRlZ29yeUFsbCIsImdhbWVUYWJzIiwiZ2V0Q2hpbGRCeU5hbWUiLCJmb3JFYWNoIiwidGFiIiwiZ2V0R2FtZXNCeUNhdGVnb3J5ZmlzaCIsImdldEdhbWVzQnlDYXRlZ29yeWZhdiIsImdldEdhbWVzQnlDYXRlZ29yeVNsb3QiLCJldmVudCIsImdldEdhbWVzQnlDYXRlZ29yeUtlbm8iLCJnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlciIsInpvb21GdWxsU2NyZWVuQ2xpY2siLCJkb2N1bWVudCIsImZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsImRvY3VtZW50RWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIkVsZW1lbnQiLCJBTExPV19LRVlCT0FSRF9JTlBVVCIsImNhbmNlbEZ1bGxTY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImNsb3NlU3Bpbk5vZGUiLCJvcGVuU3BpbldoZWVsTm9kZSIsInJvdGF0ZUFjdGlvbiIsInJvdGF0ZUJ5IiwiY29udGludWVSb3RhdGUiLCJyZXBlYXRGb3JldmVyIiwib3BlblByb2ZsZVBvcHVwIiwibG9nT3V0Q2xpY2siLCJsb2d1dENsaWNrIiwicGFzc3dvcmRDaGFuZ2VCdG4iLCJ0b2tlbiIsInN5cyIsImlzQnJvd3NlciIsImNvb2tpZXMiLCJjb29raWUiLCJzcGxpdCIsInRyaW0iLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIiwidXNlciIsImRlY29kZSIsInBhc3N3b3JkIiwidXNlcm5hbWUiLCJjaGFuZ2VEYXRhIiwiY2hhbmdlZFBhc3N3b3JkIiwicmVzcG9zZW4iLCJjb25zb2xlIiwibG9nIiwiY2hhbmdlUGFzc3dvcmQiLCJjbG9zZVBvcHVwQnRuIiwic2F2ZVByb2ZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF2Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxPQUFELENBQXJCOztBQUNBLElBQU1FLEdBQUcsR0FBR0YsT0FBTyxDQUFDLGNBQUQsQ0FBbkI7O0FBQ0FHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBREU7QUFLVkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1YsaUJBQVMsSUFEQztBQUVWRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGQyxLQUxGO0FBU1ZFLElBQUFBLGFBQWEsRUFBRTtBQUNiLGlCQUFTLElBREk7QUFFYkgsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNTO0FBRkksS0FUTDtBQWFWQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5MLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVztBQUZILEtBYkU7QUFpQlZD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LENBQWlCd0QsTUFBakIsR0FBMEIsS0FBMUI7QUFDRDs7QUFDRCxTQUFLNUQsU0FBTCxDQUFlNEQsTUFBZixHQUF3QixLQUF4QjtBQUNELEdBbFpNO0FBb1pQO0FBQ0F5RSxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDdkIsU0FBS2pJLFdBQUwsQ0FBaUJ3RCxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUs1RCxTQUFMLENBQWU0RCxNQUFmLEdBQXdCLEtBQXhCO0FBQ0Q7QUF4Wk0sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29va2llcyA9IHJlcXVpcmUoXCJqcy1jb29raWVzXCIpO1xuY29uc3QgbG9naW4gPSByZXF1aXJlKFwiTG9naW5cIik7XG5jb25zdCBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKTsgXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgdXNlcklkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBjb2luc0xhYmVsOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBjbG91ZEFuaW1Ob2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIHNwcml0ZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgIH0sXG4gICAgc21hbGxJdGVtTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICByaWdodFRpbHROb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGxlZnRUaWx0Tm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzcGluV2hlZWxOb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIE91dGVyQW5pbWF0aW9uOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIHBhc3N3b3JkTm9kZToge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBwYXNzd29yZENoYW5nZUJ1dHRvbjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBwb3B1cE5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgb2xkUGFzc3dvcmQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICB9LFxuICAgIG5ld1Bhc3N3b3JkOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTGFiZWwsXG4gICAgfSxcbiAgICBjb25maXJtUGFzc3dvcmQ6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICB9LFxuICAgIHByb2ZpbGVOb2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIHNhdmVQcm9maWxlQnRuOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGFsbFRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBmaXNoVGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGZhdlRhYjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICBzbG90VGFiOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIGtlbm9UYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgb3RoZXJUYWI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgbG9naW5Ob2RlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogbG9naW4sXG4gICAgfSxcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3LFxuICAgIGl0ZW1QcmVmYWI6IGNjLlByZWZhYixcbiAgICBzbWFsbEl0ZW1QcmVmYWI6IGNjLlByZWZhYixcbiAgICBjYXRlZ29yeTogbnVsbCxcbiAgICBsZWZ0dGlsdEFuZ2xlOiAtNywgLy8gQW5nbGUgdG8gdGlsdCB0aGUgbm9kZSAoaW4gZGVncmVlcylcbiAgICB0aWx0RHVyYXRpb246IDAuMiwgLy8gRHVyYXRpb24gb2YgdGhlIHRpbHQgYW5pbWF0aW9uXG4gICAgb3JpZ2luYWxSb3RhdGlvbjogMCxcbiAgICByaWdodHRpbHRBbmdsZTogNyxcbiAgICB0YXJnZXRYOiAwLFxuICAgIG1vdmVEdXJhdGlvbjogMi4wLFxuICAgIHNjYWxlVXA6IDAuOSwgLy8gU2NhbGUgZmFjdG9yIHdoZW4gbW91c2UgZW50ZXJzXG4gICAgc2NhbGVOb3JtYWw6IDAuOSxcbiAgICBpdGVtc1BlckxvYWQ6IDEwLFxuICB9LFxuXG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuY2F0ZWdvcnkgPSBcImFsbFwiO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zVG9Mb2FkID0gW107IC8vIEFycmF5IHRvIHN0b3JlIGFsbCBpdGVtcyB0byBiZSBsb2FkZWRcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7IC8vIEN1cnJlbnQgaW5kZXggaW4gdGhlIGl0ZW1zIGFycmF5XG4gICAgdGhpcy5zY3JvbGxWaWV3Lm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5sb2FkTW9yZUl0ZW1zLCB0aGlzKTsgLy8gRXZlbnQgbGlzdGVuZXIgZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nXG4gICAgbGV0IGN1cnJlbnRQb3MgPSB0aGlzLmNsb3VkQW5pbU5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICBsZXQgbW92ZUFjdGlvbiA9IGNjLm1vdmVUbyhcbiAgICAgIHRoaXMubW92ZUR1cmF0aW9uLFxuICAgICAgY2MudjIodGhpcy50YXJnZXRYLCBjdXJyZW50UG9zLnkpXG4gICAgKTtcbiAgICAvLyBSdW4gdGhlIG1vdmUgYWN0aW9uIG9uIHRoZSBzcHJpdGUgbm9kZVxuICAgIHRoaXMuY2xvdWRBbmltTm9kZS5ydW5BY3Rpb24obW92ZUFjdGlvbik7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIEZldGFjaCBHYW1lcyBieSBjYXRlZ29yeVxuICAgKiBAZGVzY3JpcHRpb24gSFRUUCByZXF1ZXN0IC0gUE9TVCBkYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIC1hZGRyZXNzIG9mIFNlcnZlclxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcbiAgICogQHBhcmFtIHttZXRob2R9IGNhbGxiYWNrIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjc3MgaXMgdHJ1ZSFcbiAgICogQHBhcmFtIHttZXRob2R9IGVycm9yIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjZXNzIGlzIGZhbHNlIVxuICAgKi9cbiAgZmV0Y2hHYW1lczogZnVuY3Rpb24gKGdhbWVDYXRlZ29yeSkge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XG4gICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgdmFyIGFkZHJlc3MgPVxuICAgICAgSy5TZXJ2ZXJBZGRyZXNzLmlwQWRkcmVzcyArIEsuU2VydmVyQVBJLmdhbWUgKyBcIj1cIiArIGdhbWVDYXRlZ29yeTtcbiAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJHRVRcIiwgYWRkcmVzcywgXCJcIiwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5mZWF0dXJlZC5sZW5ndGggPT09IDAgJiYgIHJlc3BvbnNlLm90aGVyR2FtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID0gXCJObyBHYW1lcyBGb3VuZCBGb3IgVGhpcyBDYXRlZ29yeVwiO1xuICAgICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdGhlckdhbWVzID0gcmVzcG9uc2Uub3RoZXJHYW1lcyB8fCBbXTtcbiAgICAgICAgbGV0IGZlYXR1cmVkID0gcmVzcG9uc2UuZmVhdHVyZWQgfHwgW107XG5cbiAgICAgICAgdGhpcy5pdGVtc1RvTG9hZCA9IFtdO1xuXG4gICAgICAgIC8vIEluc2VydCB0aGUgZmVhdHVyZWQgaXRlbSBhdCB0aGUgdGhpcmQgcG9zaXRpb25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdGhlckdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgPT09IDIgJiYgZmVhdHVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc1RvTG9hZC5wdXNoKHtkYXRhOiBmZWF0dXJlZFswXSxwcmVmYWI6IHRoaXMuc21hbGxJdGVtUHJlZmFiLH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLml0ZW1zVG9Mb2FkLnB1c2goe2RhdGE6IG90aGVyR2FtZXNbaV0scHJlZmFiOiB0aGlzLml0ZW1QcmVmYWIsfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbGVzcyB0aGFuIDMgb3RoZXJHYW1lcywgYWRkIHRoZSBmZWF0dXJlZCBpdGVtIGF0IHRoZSBlbmQgaWYgaXQgaGFzbid0IGJlZW4gYWRkZWQgeWV0XG4gICAgICAgIGlmIChvdGhlckdhbWVzLmxlbmd0aCA8IDMgJiYgZmVhdHVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuaXRlbXNUb0xvYWQucHVzaCh7IGRhdGE6IGZlYXR1cmVkWzBdLCBwcmVmYWI6IHRoaXMuc21hbGxJdGVtUHJlZmFiLCB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubG9hZE1vcmVJdGVtcygpOyAvLyBMb2FkIHRoZSBmaXJzdCBiYXRjaCBvZiBpdGVtc1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfSxcblxuICBsb2FkTW9yZUl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMuaXRlbXNUb0xvYWQubGVuZ3RoKSByZXR1cm47IC8vIE5vIG1vcmUgaXRlbXMgdG8gbG9hZFxuICAgIGxldCBlbmRJbmRleCA9IE1hdGgubWluKFxuICAgICAgdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLml0ZW1zUGVyTG9hZCxcbiAgICAgIHRoaXMuaXRlbXNUb0xvYWQubGVuZ3RoXG4gICAgKTtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5jdXJyZW50SW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLml0ZW1zVG9Mb2FkW2ldO1xuICAgICAgdGhpcy5wb3B1bGF0ZUl0ZW1zKGl0ZW1EYXRhLmRhdGEsIGl0ZW1EYXRhLnByZWZhYik7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gZW5kSW5kZXg7XG4gIH0sXG5cbiAgICAvLyBEcmF3IEdhbWUgSXRlbXMgaW4gTG9iYnlcbiAgcG9wdWxhdGVJdGVtcyhpdGVtRGF0YSwgcHJlZmFiKSB7XG4gICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICBsZXQgaXRlbVNjcmlwdCA9IGl0ZW0uZ2V0Q29tcG9uZW50KFwiR2FtZXNQcmVmYWJcIik7XG4gICAgICBpdGVtU2NyaXB0LnVwZGF0ZUl0ZW0oaXRlbURhdGEpO1xuICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG4gICAgfSxcblxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJhbGxcIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuXG4gIGdldEdhbWVzQnlDYXRlZ29yeWZpc2g6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJmaXNoXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuc2xvdFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5rZW5vVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLm90aGVyVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgXTtcbiAgICBnYW1lVGFicy5mb3JFYWNoKCh0YWIpID0+ICh0YWIuYWN0aXZlID0gZmFsc2UpKTtcbiAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5ZmF2OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwiZmF2XCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcbiAgZ2V0R2FtZXNCeUNhdGVnb3J5U2xvdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwic2xvdFwiO1xuICAgIGNvbnN0IGdhbWVUYWJzID0gW1xuICAgICAgdGhpcy5maXNoVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmFsbFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5mYXZUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5vdGhlclRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgIF07XG4gICAgZ2FtZVRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IGZhbHNlKSk7XG4gICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZldGNoR2FtZXModGhpcy5jYXRlZ29yeSk7XG4gIH0sXG4gIGdldEdhbWVzQnlDYXRlZ29yeUtlbm86IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBcImtlbm9cIjtcbiAgICBjb25zdCBnYW1lVGFicyA9IFtcbiAgICAgIHRoaXMuZmlzaFRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5hbGxUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuZmF2VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLnNsb3RUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMua2Vub1RhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5mZXRjaEdhbWVzKHRoaXMuY2F0ZWdvcnkpO1xuICB9LFxuICBnZXRHYW1lc0J5Q2F0ZWdvcnlPdGhlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwib3RoZXJzXCI7XG4gICAgY29uc3QgZ2FtZVRhYnMgPSBbXG4gICAgICB0aGlzLmZpc2hUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICAgIHRoaXMuYWxsVGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmZhdlRhYi5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLFxuICAgICAgdGhpcy5zbG90VGFiLmdldENoaWxkQnlOYW1lKFwiYmdcIiksXG4gICAgICB0aGlzLmtlbm9UYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKSxcbiAgICBdO1xuICAgIGdhbWVUYWJzLmZvckVhY2goKHRhYikgPT4gKHRhYi5hY3RpdmUgPSBmYWxzZSkpO1xuICAgIHRoaXMub3RoZXJUYWIuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZmV0Y2hHYW1lcyh0aGlzLmNhdGVnb3J5KTtcbiAgfSxcblxuXG5cbiAgLy8gZm9yIGZ1bGwgU2NyZWVuXG4gIHpvb21GdWxsU2NyZWVuQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXG4gICAgICAhZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50XG4gICAgKSB7XG4gICAgICAvLyBjdXJyZW50IHdvcmtpbmcgbWV0aG9kc1xuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKFxuICAgICAgICAgIEVsZW1lbnQuQUxMT1dfS0VZQk9BUkRfSU5QVVRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBDbG9zZSBTcGluIFBvcHVwIE5vZGVcbiAgY2xvc2VTcGluTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNwaW5XaGVlbE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIC8vIE9wZW4gU3BpbiB0aGUgV2hlZWwgcG9wdXAgYW5kIHJ1biBvdXRlciBhbmltYXRpb25cbiAgb3BlblNwaW5XaGVlbE5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcm90YXRlQWN0aW9uID0gY2Mucm90YXRlQnkoNSwgMzYwKTtcbiAgICB2YXIgY29udGludWVSb3RhdGUgPSBjYy5yZXBlYXRGb3JldmVyKHJvdGF0ZUFjdGlvbik7XG4gICAgdGhpcy5PdXRlckFuaW1hdGlvbi5ydW5BY3Rpb24oY29udGludWVSb3RhdGUpO1xuICAgIGlmICghdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zcGluV2hlZWxOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIC8vIG9wZW4gUHJvZmlsZSBwb3B1cFxuICBvcGVuUHJvZmxlUG9wdXA6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBvcHVwTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgfSxcbiAgLy8gTG9nb3V0IEJ1dHRvbiBDbGlja2VkXG4gIGxvZ091dENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubG9naW5Ob2RlLmxvZ3V0Q2xpY2soKTtcbiAgfSxcblxuICAvKipcbiAgICogQG1ldGhvZCBQYXNzd29yZENoYW5nZSBQb3B1cCByZXF1ZXN0XG4gICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgKiBAcGFyYW0ge21ldGhvZH0gZXJyb3IgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2Nlc3MgaXMgZmFsc2UhXG4gICAqL1xuICBwYXNzd29yZENoYW5nZUJ0bjogZnVuY3Rpb24gKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMub2xkUGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nID09IFwiXCIgfHxcbiAgICAgIHRoaXMuY29uZmlybVBhc3N3b3JkLnN0cmluZyA9PSBcIlwiXG4gICAgKSB7XG4gICAgICBTZXJ2ZXJDb20uZXJyb3JMYWJsZS5zdHJpbmcgPSBcIkFsbCBmaWVsZHMgYXJlIG1hbmRhdG9yeVwiO1xuICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm5ld1Bhc3N3b3JkLnN0cmluZyAhPSB0aGlzLmNvbmZpcm1QYXNzd29yZC5zdHJpbmcpIHtcbiAgICAgICAgU2VydmVyQ29tLmVycm9yTGFibGUuc3RyaW5nID1cbiAgICAgICAgICBcIk5ldyBQYXNzd29yZCBhbmQgY29uZmlybSBwYXNzd29yZCBkaWQgbm90IG1hdGNoXCI7XG4gICAgICAgIFNlcnZlckNvbS5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgICAgbGV0IHRva2VuID0gbnVsbFxuICAgICAgaWYgKCF0b2tlbiAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChjb29raWUuc3RhcnRzV2l0aCgndG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGNvb2tpZS5zdWJzdHJpbmcoJ3Rva2VuPScubGVuZ3RoLCBjb29raWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgdXNlciA9IGp3dC5kZWNvZGUodG9rZW4pO1xuICAgICAgbGV0IGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkucGFzc3dvcmQgKyBgLyR7dXNlci51c2VybmFtZX1gO1xuICAgICAgbGV0IGNoYW5nZURhdGEgPSB7XG4gICAgICAgIGNoYW5nZWRQYXNzd29yZCA6IHRoaXMubmV3UGFzc3dvcmQuc3RyaW5nXG4gICAgICB9XG4gICAgICBTZXJ2ZXJDb20uaHR0cFJlcXVlc3QoXCJQVVRcIiwgYWRkcmVzcywgY2hhbmdlRGF0YSwgZnVuY3Rpb24ocmVzcG9zZW4pe1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvLyB0byBvcGVuIHRoZSBwYXNzd29yZCBwb3B1cFxuICBjaGFuZ2VQYXNzd29yZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGFzc3dvcmROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgfSxcbiAgLy8gY2xvc2UgYWxsIHBvcHVwXG4gIGNsb3NlUG9wdXBCdG46IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wYXNzd29yZE5vZGUuYWN0aXZlIHx8IHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMucG9wdXBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICB9LFxuXG4gIC8vIFNhdmUgcHJvZmlsZSBidXR0b24gQ2xpY2tlZFxuICBzYXZlUHJvZmlsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJvZmlsZU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5wb3B1cE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gIH0sXG59KTtcbiJdfQ==