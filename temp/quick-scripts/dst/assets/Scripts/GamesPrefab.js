
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GamesPrefab.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1ddc3b1cdF+o0AR8kLrxow', 'GamesPrefab');
// Scripts/GamesPrefab.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    imageView: cc.Sprite,
    imageClick: cc.Button,
    addToFavouirteButton: cc.Button,
    mywebView: cc.WebView,
    webviewUrl: null,
    lobbyNode: null,
    redHeart: {
      "default": null,
      type: cc.Node
    },
    blueHeart: {
      "default": null,
      type: cc.Node
    },
    loader: {
      "default": null,
      type: cc.Node
    },
    aniMation: {
      "default": null,
      type: cc.Node
    },
    delayDuration: {
      "default": 2,
      type: cc.Float
    }
  },
  onLoad: function onLoad() {
    this.setupEventListeners();
    var lobbyNode = cc.find("Canvas/LobbyNode");

    if (lobbyNode) {
      this.lobbyNode = lobbyNode.getComponent("Lobby");

      if (!this.lobbyNode) {// console.error("Lobby component not found on LobbyNode");
      }
    } else {// console.error("LobbyNode not found in the scene");
    }

    this.startLoaderAnimation();
  },
  startLoaderAnimation: function startLoaderAnimation() {
    if (this.aniMation._tween) {
      this.aniMation._tween.stop();
    }

    this.aniMation._tween = cc.tween(this.aniMation).repeatForever(cc.tween().to(1, {
      angle: -360
    })).start();
  },
  stopLoaderAnimation: function stopLoaderAnimation() {
    if (this.aniMation._tween) {
      this.aniMation._tween.stop();

      this.aniMation.angle = 0;
    }
  },
  setupEventListeners: function setupEventListeners() {
    // // Add new listeners
    // this.imageClick.node.on('click', this.onClickItem, this);
    // this.addToFavouirteButton.node.on('click', this.addToFavouirte, this);
    // Remove existing listeners to prevent duplicate event calls
    this.imageClick.node.off('touchstart', this.onTouchStart, this);
    this.imageClick.node.off('touchend', this.onTouchEnd, this);
    this.imageClick.node.off('touchcancel', this.onTouchCancel, this); // Add new listeners

    this.imageClick.node.on('touchstart', this.onTouchStart, this);
    this.imageClick.node.on('touchend', this.onTouchEnd, this);
    this.imageClick.node.on('touchcancel', this.onTouchCancel, this);
  },
  updateItem: function updateItem(data, gameCategory) {
    var _this = this;

    var inst = this;
    var myData = data;

    if (!inst.loader.active) {
      inst.loader.active = true;
    }

    cc.assetManager.loadRemote(data.thumbnail, function (err, texture) {
      if (err) {
        console.error(err);

        if (_this.loader) {
          _this.loader.active = false;
        }

        return;
      }

      _this.imageView.spriteFrame = new cc.SpriteFrame(texture); // Hide the loader

      if (_this.loader) {
        _this.loader.active = false;
      }
    });

    if (gameCategory == "fav") {
      this.blueHeart.active = false;
      this.redHeart.active = true;
    }

    if (this.loader) {
      this.loader.active = false;
    } // Update click listeners with new data


    this.imageClick.node.off('click');
    this.addToFavouirteButton.node.off('click');
    this.imageClick.node.on('touchend', function (event) {
      var touchEndPos = event.getLocation();
      var distance = touchEndPos.sub(_this.touchStartPos).mag();

      if (distance < 10) {
        // Adjust this threshold as needed
        _this.onClickItem(data);
      }

      _this.imageClick.node.interactable = false;
    });
    this.addToFavouirteButton.node.on('click', function () {
      if (myData.slug == undefined) {
        return;
      } else {
        _this.addToFavouirte(myData);

        _this.addToFavouirteButton.node.interactable = false;
      }
    });
  },
  onTouchStart: function onTouchStart(event) {
    this.touchStartPos = event.getLocation();
  },
  onTouchEnd: function onTouchEnd(event) {
    var touchEndPos = event.getLocation();
    var distance = touchEndPos.sub(this.touchStartPos).mag();

    if (distance < 10) {// Adjust this threshold as needed
      // this.onClickItem(this.data);
    }
  },
  onTouchCancel: function onTouchCancel(event) {
    this.touchStartPos = null;
  },
  //Prefab Clicke to open the game
  onClickItem: function onClickItem(data) {
    var inst = this;

    if (data.slug == undefined) {
      return;
    }

    var address = K.ServerAddress.ipAddress + K.ServerAPI.getGameById + ("/" + data.slug);
    ServerCom.httpRequest("GET", address, "", function (response) {
      if (response.url == undefined) {
        return;
      }

      var webviewUrl = response.url;

      if (inst.lobbyNode) {
        inst.lobbyNode.openWebView(webviewUrl);
      }
    }.bind(this));
  },
  addToFavouirte: function addToFavouirte(myData) {
    var inst = this;

    if (myData.slug == undefined) {
      return;
    } else {
      var userData = {
        gameId: myData._id,
        type: inst.blueHeart.active ? "add" : "remove"
      };
      var address = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav + ("/" + this.lobbyNode.id); // console.log(this.lobbyNode.id, "check user Id");

      ServerCom.httpRequest("PUT", address, userData, function (response) {
        // console.log("response", response);
        ServerCom.errorHeading.string = "Success";
        ServerCom.errorLable.string = response.message;

        if (response.message == "Game added to favourites") {
          inst.redHeart.active = true;
          inst.blueHeart.active = false;
        } else {
          inst.blueHeart.active = true;
          inst.redHeart.active = false;
        }

        ServerCom.loginErrorNode.active = true;
        setTimeout(function () {
          ServerCom.loginErrorNode.active = false;
        }, 2000);

        if (inst.lobbyNode && inst.lobbyNode.category == "fav") {
          inst.lobbyNode.fetchGames("fav");
        }
      }.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0dhbWVzUHJlZmFiLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaW1hZ2VWaWV3IiwiU3ByaXRlIiwiaW1hZ2VDbGljayIsIkJ1dHRvbiIsImFkZFRvRmF2b3VpcnRlQnV0dG9uIiwibXl3ZWJWaWV3IiwiV2ViVmlldyIsIndlYnZpZXdVcmwiLCJsb2JieU5vZGUiLCJyZWRIZWFydCIsInR5cGUiLCJOb2RlIiwiYmx1ZUhlYXJ0IiwibG9hZGVyIiwiYW5pTWF0aW9uIiwiZGVsYXlEdXJhdGlvbiIsIkZsb2F0Iiwib25Mb2FkIiwic2V0dXBFdmVudExpc3RlbmVycyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJzdGFydExvYWRlckFuaW1hdGlvbiIsIl90d2VlbiIsInN0b3AiLCJ0d2VlbiIsInJlcGVhdEZvcmV2ZXIiLCJ0byIsImFuZ2xlIiwic3RhcnQiLCJzdG9wTG9hZGVyQW5pbWF0aW9uIiwibm9kZSIsIm9mZiIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJvblRvdWNoQ2FuY2VsIiwib24iLCJ1cGRhdGVJdGVtIiwiZGF0YSIsImdhbWVDYXRlZ29yeSIsImluc3QiLCJteURhdGEiLCJhY3RpdmUiLCJhc3NldE1hbmFnZXIiLCJsb2FkUmVtb3RlIiwidGh1bWJuYWlsIiwiZXJyIiwidGV4dHVyZSIsImNvbnNvbGUiLCJlcnJvciIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJldmVudCIsInRvdWNoRW5kUG9zIiwiZ2V0TG9jYXRpb24iLCJkaXN0YW5jZSIsInN1YiIsInRvdWNoU3RhcnRQb3MiLCJtYWciLCJvbkNsaWNrSXRlbSIsImludGVyYWN0YWJsZSIsInNsdWciLCJ1bmRlZmluZWQiLCJhZGRUb0Zhdm91aXJ0ZSIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImdldEdhbWVCeUlkIiwiU2VydmVyQ29tIiwiaHR0cFJlcXVlc3QiLCJyZXNwb25zZSIsInVybCIsIm9wZW5XZWJWaWV3IiwiYmluZCIsInVzZXJEYXRhIiwiZ2FtZUlkIiwiX2lkIiwiYWRkdG9GYXYiLCJpZCIsImVycm9ySGVhZGluZyIsInN0cmluZyIsImVycm9yTGFibGUiLCJtZXNzYWdlIiwibG9naW5FcnJvck5vZGUiLCJzZXRUaW1lb3V0IiwiY2F0ZWdvcnkiLCJmZXRjaEdhbWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLLE1BRE47QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLE1BRlA7QUFHUkMsSUFBQUEsb0JBQW9CLEVBQUVSLEVBQUUsQ0FBQ08sTUFIakI7QUFJUkUsSUFBQUEsU0FBUyxFQUFFVCxFQUFFLENBQUNVLE9BSk47QUFLUkMsSUFBQUEsVUFBVSxFQUFFLElBTEo7QUFNUkMsSUFBQUEsU0FBUyxFQUFFLElBTkg7QUFPUkMsSUFBQUEsUUFBUSxFQUFDO0FBQ0wsaUJBQVMsSUFESjtBQUVMQyxNQUFBQSxJQUFJLEVBQUVkLEVBQUUsQ0FBQ2U7QUFGSixLQVBEO0FBV1JDLElBQUFBLFNBQVMsRUFBQztBQUNOLGlCQUFTLElBREg7QUFFTkYsTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUNlO0FBRkgsS0FYRjtBQWVSRSxJQUFBQSxNQUFNLEVBQUM7QUFDSCxpQkFBUyxJQUROO0FBRUhILE1BQUFBLElBQUksRUFBRWQsRUFBRSxDQUFDZTtBQUZOLEtBZkM7QUFtQlJHLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEosTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUNlO0FBRkYsS0FuQkg7QUF1QlJJLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTLENBREU7QUFFWEwsTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUNvQjtBQUZFO0FBdkJQLEdBSFA7QUFnQ0xDLEVBQUFBLE1BaENLLG9CQWdDSTtBQUNMLFNBQUtDLG1CQUFMO0FBQ0EsUUFBTVYsU0FBUyxHQUFHWixFQUFFLENBQUN1QixJQUFILENBQVEsa0JBQVIsQ0FBbEI7O0FBQ0EsUUFBSVgsU0FBSixFQUFlO0FBQ1gsV0FBS0EsU0FBTCxHQUFpQkEsU0FBUyxDQUFDWSxZQUFWLENBQXVCLE9BQXZCLENBQWpCOztBQUNBLFVBQUksQ0FBQyxLQUFLWixTQUFWLEVBQXFCLENBQ2pCO0FBQ0g7QUFDSixLQUxELE1BS08sQ0FDSDtBQUNIOztBQUNELFNBQUthLG9CQUFMO0FBQ0gsR0E1Q0k7QUE4Q0xBLEVBQUFBLG9CQTlDSyxrQ0E4Q2tCO0FBQ25CLFFBQUksS0FBS1AsU0FBTCxDQUFlUSxNQUFuQixFQUEyQjtBQUN2QixXQUFLUixTQUFMLENBQWVRLE1BQWYsQ0FBc0JDLElBQXRCO0FBQ0g7O0FBQ0QsU0FBS1QsU0FBTCxDQUFlUSxNQUFmLEdBQXdCMUIsRUFBRSxDQUFDNEIsS0FBSCxDQUFTLEtBQUtWLFNBQWQsRUFBeUJXLGFBQXpCLENBQXVDN0IsRUFBRSxDQUFDNEIsS0FBSCxHQUFXRSxFQUFYLENBQWMsQ0FBZCxFQUFpQjtBQUFFQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQztBQUFWLEtBQWpCLENBQXZDLEVBQTBFQyxLQUExRSxFQUF4QjtBQUNILEdBbkRJO0FBcURMQyxFQUFBQSxtQkFyREssaUNBcURpQjtBQUNsQixRQUFJLEtBQUtmLFNBQUwsQ0FBZVEsTUFBbkIsRUFBMkI7QUFDdkIsV0FBS1IsU0FBTCxDQUFlUSxNQUFmLENBQXNCQyxJQUF0Qjs7QUFDQSxXQUFLVCxTQUFMLENBQWVhLEtBQWYsR0FBdUIsQ0FBdkI7QUFDSDtBQUNKLEdBMURJO0FBNERMVCxFQUFBQSxtQkE1REssaUNBNERpQjtBQUNsQjtBQUNBO0FBQ0E7QUFDSTtBQUNBLFNBQUtoQixVQUFMLENBQWdCNEIsSUFBaEIsQ0FBcUJDLEdBQXJCLENBQXlCLFlBQXpCLEVBQXVDLEtBQUtDLFlBQTVDLEVBQTBELElBQTFEO0FBQ0EsU0FBSzlCLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQkMsR0FBckIsQ0FBeUIsVUFBekIsRUFBcUMsS0FBS0UsVUFBMUMsRUFBc0QsSUFBdEQ7QUFDQSxTQUFLL0IsVUFBTCxDQUFnQjRCLElBQWhCLENBQXFCQyxHQUFyQixDQUF5QixhQUF6QixFQUF3QyxLQUFLRyxhQUE3QyxFQUE0RCxJQUE1RCxFQVBjLENBU2Q7O0FBQ0EsU0FBS2hDLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQkssRUFBckIsQ0FBd0IsWUFBeEIsRUFBc0MsS0FBS0gsWUFBM0MsRUFBeUQsSUFBekQ7QUFDQSxTQUFLOUIsVUFBTCxDQUFnQjRCLElBQWhCLENBQXFCSyxFQUFyQixDQUF3QixVQUF4QixFQUFvQyxLQUFLRixVQUF6QyxFQUFxRCxJQUFyRDtBQUNBLFNBQUsvQixVQUFMLENBQWdCNEIsSUFBaEIsQ0FBcUJLLEVBQXJCLENBQXdCLGFBQXhCLEVBQXVDLEtBQUtELGFBQTVDLEVBQTJELElBQTNEO0FBQ1AsR0F6RUk7QUEyRUxFLEVBQUFBLFVBM0VLLHNCQTJFTUMsSUEzRU4sRUEyRVlDLFlBM0VaLEVBMkUwQjtBQUFBOztBQUMzQixRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFFBQUlDLE1BQU0sR0FBR0gsSUFBYjs7QUFFQSxRQUFJLENBQUNFLElBQUksQ0FBQzFCLE1BQUwsQ0FBWTRCLE1BQWpCLEVBQXlCO0FBQ3JCRixNQUFBQSxJQUFJLENBQUMxQixNQUFMLENBQVk0QixNQUFaLEdBQXFCLElBQXJCO0FBQ0g7O0FBQ0Q3QyxJQUFBQSxFQUFFLENBQUM4QyxZQUFILENBQWdCQyxVQUFoQixDQUEyQk4sSUFBSSxDQUFDTyxTQUFoQyxFQUEyQyxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDckQsVUFBSUQsR0FBSixFQUFTO0FBQ0xFLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjSCxHQUFkOztBQUNBLFlBQUksS0FBSSxDQUFDaEMsTUFBVCxFQUFpQjtBQUNiLFVBQUEsS0FBSSxDQUFDQSxNQUFMLENBQVk0QixNQUFaLEdBQXFCLEtBQXJCO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFDRCxNQUFBLEtBQUksQ0FBQ3pDLFNBQUwsQ0FBZWlELFdBQWYsR0FBNkIsSUFBSXJELEVBQUUsQ0FBQ3NELFdBQVAsQ0FBbUJKLE9BQW5CLENBQTdCLENBUnFELENBU3JEOztBQUNBLFVBQUksS0FBSSxDQUFDakMsTUFBVCxFQUFpQjtBQUNiLFFBQUEsS0FBSSxDQUFDQSxNQUFMLENBQVk0QixNQUFaLEdBQXFCLEtBQXJCO0FBQ0g7QUFDUixLQWJEOztBQWVBLFFBQUdILFlBQVksSUFBSSxLQUFuQixFQUF5QjtBQUNyQixXQUFLMUIsU0FBTCxDQUFlNkIsTUFBZixHQUF3QixLQUF4QjtBQUNBLFdBQUtoQyxRQUFMLENBQWNnQyxNQUFkLEdBQXVCLElBQXZCO0FBQ0g7O0FBQ0QsUUFBRyxLQUFLNUIsTUFBUixFQUFlO0FBQ1gsV0FBS0EsTUFBTCxDQUFZNEIsTUFBWixHQUFxQixLQUFyQjtBQUNILEtBNUIwQixDQThCM0I7OztBQUNBLFNBQUt2QyxVQUFMLENBQWdCNEIsSUFBaEIsQ0FBcUJDLEdBQXJCLENBQXlCLE9BQXpCO0FBQ0EsU0FBSzNCLG9CQUFMLENBQTBCMEIsSUFBMUIsQ0FBK0JDLEdBQS9CLENBQW1DLE9BQW5DO0FBRUEsU0FBSzdCLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQkssRUFBckIsQ0FBd0IsVUFBeEIsRUFBb0MsVUFBQ2dCLEtBQUQsRUFBVztBQUMzQyxVQUFJQyxXQUFXLEdBQUdELEtBQUssQ0FBQ0UsV0FBTixFQUFsQjtBQUNBLFVBQUlDLFFBQVEsR0FBR0YsV0FBVyxDQUFDRyxHQUFaLENBQWdCLEtBQUksQ0FBQ0MsYUFBckIsRUFBb0NDLEdBQXBDLEVBQWY7O0FBQ0EsVUFBSUgsUUFBUSxHQUFHLEVBQWYsRUFBbUI7QUFBRTtBQUNqQixRQUFBLEtBQUksQ0FBQ0ksV0FBTCxDQUFpQnJCLElBQWpCO0FBQ0g7O0FBQ0QsTUFBQSxLQUFJLENBQUNuQyxVQUFMLENBQWdCNEIsSUFBaEIsQ0FBcUI2QixZQUFyQixHQUFvQyxLQUFwQztBQUNILEtBUEQ7QUFRQSxTQUFLdkQsb0JBQUwsQ0FBMEIwQixJQUExQixDQUErQkssRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBTTtBQUM3QyxVQUFHSyxNQUFNLENBQUNvQixJQUFQLElBQWVDLFNBQWxCLEVBQTRCO0FBQ3hCO0FBQ0gsT0FGRCxNQUdJO0FBQ0EsUUFBQSxLQUFJLENBQUNDLGNBQUwsQ0FBb0J0QixNQUFwQjs7QUFDQSxRQUFBLEtBQUksQ0FBQ3BDLG9CQUFMLENBQTBCMEIsSUFBMUIsQ0FBK0I2QixZQUEvQixHQUE4QyxLQUE5QztBQUNIO0FBQ0osS0FSRDtBQVNILEdBOUhJO0FBZ0lMM0IsRUFBQUEsWUFoSUssd0JBZ0lRbUIsS0FoSVIsRUFnSWU7QUFDaEIsU0FBS0ssYUFBTCxHQUFxQkwsS0FBSyxDQUFDRSxXQUFOLEVBQXJCO0FBQ0gsR0FsSUk7QUFvSUxwQixFQUFBQSxVQXBJSyxzQkFvSU1rQixLQXBJTixFQW9JYTtBQUNkLFFBQUlDLFdBQVcsR0FBR0QsS0FBSyxDQUFDRSxXQUFOLEVBQWxCO0FBQ0EsUUFBSUMsUUFBUSxHQUFHRixXQUFXLENBQUNHLEdBQVosQ0FBZ0IsS0FBS0MsYUFBckIsRUFBb0NDLEdBQXBDLEVBQWY7O0FBQ0EsUUFBSUgsUUFBUSxHQUFHLEVBQWYsRUFBbUIsQ0FBRTtBQUNqQjtBQUNIO0FBQ0osR0ExSUk7QUE0SUxwQixFQUFBQSxhQTVJSyx5QkE0SVNpQixLQTVJVCxFQTRJZ0I7QUFDakIsU0FBS0ssYUFBTCxHQUFxQixJQUFyQjtBQUNILEdBOUlJO0FBZ0pMO0FBQ0FFLEVBQUFBLFdBakpLLHVCQWlKT3JCLElBakpQLEVBaUphO0FBQ2QsUUFBSUUsSUFBSSxHQUFHLElBQVg7O0FBQ0EsUUFBSUYsSUFBSSxDQUFDdUIsSUFBTCxJQUFhQyxTQUFqQixFQUE0QjtBQUN4QjtBQUNIOztBQUNELFFBQUlFLE9BQU8sR0FBR0MsQ0FBQyxDQUFDQyxhQUFGLENBQWdCQyxTQUFoQixHQUE0QkYsQ0FBQyxDQUFDRyxTQUFGLENBQVlDLFdBQXhDLFVBQTBEL0IsSUFBSSxDQUFDdUIsSUFBL0QsQ0FBZDtBQUNBUyxJQUFBQSxTQUFTLENBQUNDLFdBQVYsQ0FBc0IsS0FBdEIsRUFBNkJQLE9BQTdCLEVBQXNDLEVBQXRDLEVBQTBDLFVBQVNRLFFBQVQsRUFBbUI7QUFDekQsVUFBSUEsUUFBUSxDQUFDQyxHQUFULElBQWdCWCxTQUFwQixFQUErQjtBQUMzQjtBQUNIOztBQUNELFVBQUl0RCxVQUFVLEdBQUdnRSxRQUFRLENBQUNDLEdBQTFCOztBQUNBLFVBQUlqQyxJQUFJLENBQUMvQixTQUFULEVBQW9CO0FBQ2hCK0IsUUFBQUEsSUFBSSxDQUFDL0IsU0FBTCxDQUFlaUUsV0FBZixDQUEyQmxFLFVBQTNCO0FBQ0g7QUFDSixLQVJ5QyxDQVF4Q21FLElBUndDLENBUW5DLElBUm1DLENBQTFDO0FBU0gsR0FoS0k7QUFrS0xaLEVBQUFBLGNBbEtLLDBCQWtLVXRCLE1BbEtWLEVBa0trQjtBQUNuQixRQUFJRCxJQUFJLEdBQUcsSUFBWDs7QUFDQSxRQUFJQyxNQUFNLENBQUNvQixJQUFQLElBQWVDLFNBQW5CLEVBQThCO0FBQzFCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsVUFBSWMsUUFBUSxHQUFHO0FBQ1hDLFFBQUFBLE1BQU0sRUFBRXBDLE1BQU0sQ0FBQ3FDLEdBREo7QUFFWG5FLFFBQUFBLElBQUksRUFBRTZCLElBQUksQ0FBQzNCLFNBQUwsQ0FBZTZCLE1BQWYsR0FBd0IsS0FBeEIsR0FBZ0M7QUFGM0IsT0FBZjtBQUlBLFVBQUlzQixPQUFPLEdBQUdDLENBQUMsQ0FBQ0MsYUFBRixDQUFnQkMsU0FBaEIsR0FBNEJGLENBQUMsQ0FBQ0csU0FBRixDQUFZVyxRQUF4QyxVQUF1RCxLQUFLdEUsU0FBTCxDQUFldUUsRUFBdEUsQ0FBZCxDQUxHLENBTUg7O0FBQ0FWLE1BQUFBLFNBQVMsQ0FBQ0MsV0FBVixDQUFzQixLQUF0QixFQUE2QlAsT0FBN0IsRUFBc0NZLFFBQXRDLEVBQWdELFVBQVNKLFFBQVQsRUFBbUI7QUFDL0Q7QUFDQUYsUUFBQUEsU0FBUyxDQUFDVyxZQUFWLENBQXVCQyxNQUF2QixHQUFnQyxTQUFoQztBQUNBWixRQUFBQSxTQUFTLENBQUNhLFVBQVYsQ0FBcUJELE1BQXJCLEdBQThCVixRQUFRLENBQUNZLE9BQXZDOztBQUNBLFlBQUdaLFFBQVEsQ0FBQ1ksT0FBVCxJQUFvQiwwQkFBdkIsRUFBa0Q7QUFDOUM1QyxVQUFBQSxJQUFJLENBQUM5QixRQUFMLENBQWNnQyxNQUFkLEdBQXVCLElBQXZCO0FBQ0FGLFVBQUFBLElBQUksQ0FBQzNCLFNBQUwsQ0FBZTZCLE1BQWYsR0FBd0IsS0FBeEI7QUFDSCxTQUhELE1BR0s7QUFDREYsVUFBQUEsSUFBSSxDQUFDM0IsU0FBTCxDQUFlNkIsTUFBZixHQUF3QixJQUF4QjtBQUNBRixVQUFBQSxJQUFJLENBQUM5QixRQUFMLENBQWNnQyxNQUFkLEdBQXVCLEtBQXZCO0FBQ0g7O0FBQ0Q0QixRQUFBQSxTQUFTLENBQUNlLGNBQVYsQ0FBeUIzQyxNQUF6QixHQUFrQyxJQUFsQztBQUNBNEMsUUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYmhCLFVBQUFBLFNBQVMsQ0FBQ2UsY0FBVixDQUF5QjNDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0gsU0FGUyxFQUVQLElBRk8sQ0FBVjs7QUFHQSxZQUFJRixJQUFJLENBQUMvQixTQUFMLElBQWtCK0IsSUFBSSxDQUFDL0IsU0FBTCxDQUFlOEUsUUFBZixJQUEyQixLQUFqRCxFQUF3RDtBQUNwRC9DLFVBQUFBLElBQUksQ0FBQy9CLFNBQUwsQ0FBZStFLFVBQWYsQ0FBMEIsS0FBMUI7QUFDSDtBQUVKLE9BbkIrQyxDQW1COUNiLElBbkI4QyxDQW1CekMsSUFuQnlDLENBQWhEO0FBb0JIO0FBQ0o7QUFsTUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpbWFnZVZpZXc6IGNjLlNwcml0ZSxcbiAgICAgICAgaW1hZ2VDbGljazogY2MuQnV0dG9uLFxuICAgICAgICBhZGRUb0Zhdm91aXJ0ZUJ1dHRvbjogY2MuQnV0dG9uLFxuICAgICAgICBteXdlYlZpZXc6IGNjLldlYlZpZXcsXG4gICAgICAgIHdlYnZpZXdVcmw6IG51bGwsXG4gICAgICAgIGxvYmJ5Tm9kZTogbnVsbCxcbiAgICAgICAgcmVkSGVhcnQ6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmx1ZUhlYXJ0OntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRlcjp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBhbmlNYXRpb246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGF5RHVyYXRpb246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDIsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IGxvYmJ5Tm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvTG9iYnlOb2RlXCIpO1xuICAgICAgICBpZiAobG9iYnlOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmxvYmJ5Tm9kZSA9IGxvYmJ5Tm9kZS5nZXRDb21wb25lbnQoXCJMb2JieVwiKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2JieU5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiTG9iYnkgY29tcG9uZW50IG5vdCBmb3VuZCBvbiBMb2JieU5vZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiTG9iYnlOb2RlIG5vdCBmb3VuZCBpbiB0aGUgc2NlbmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydExvYWRlckFuaW1hdGlvbigpO1xuICAgIH0sXG5cbiAgICBzdGFydExvYWRlckFuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pTWF0aW9uLl90d2Vlbikge1xuICAgICAgICAgICAgdGhpcy5hbmlNYXRpb24uX3R3ZWVuLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaU1hdGlvbi5fdHdlZW4gPSBjYy50d2Vlbih0aGlzLmFuaU1hdGlvbikucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLnRvKDEsIHsgYW5nbGU6IC0zNjAgfSkpLnN0YXJ0KCk7XG4gICAgfSxcblxuICAgIHN0b3BMb2FkZXJBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaU1hdGlvbi5fdHdlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pTWF0aW9uLl90d2Vlbi5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLmFuaU1hdGlvbi5hbmdsZSA9IDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgLy8gLy8gQWRkIG5ldyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdGhpcy5pbWFnZUNsaWNrLm5vZGUub24oJ2NsaWNrJywgdGhpcy5vbkNsaWNrSXRlbSwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMuYWRkVG9GYXZvdWlydGVCdXR0b24ubm9kZS5vbignY2xpY2snLCB0aGlzLmFkZFRvRmF2b3VpcnRlLCB0aGlzKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgdG8gcHJldmVudCBkdXBsaWNhdGUgZXZlbnQgY2FsbHNcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VDbGljay5ub2RlLm9mZigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VDbGljay5ub2RlLm9mZigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub2ZmKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgdGhpcyk7XG4gICAgXG4gICAgICAgICAgICAvLyBBZGQgbmV3IGxpc3RlbmVyc1xuICAgICAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub24oJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlQ2xpY2subm9kZS5vbigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSXRlbShkYXRhLCBnYW1lQ2F0ZWdvcnkpIHtcbiAgICAgICAgbGV0IGluc3QgPSB0aGlzXG4gICAgICAgIGxldCBteURhdGEgPSBkYXRhO1xuXG4gICAgICAgIGlmICghaW5zdC5sb2FkZXIuYWN0aXZlKSB7XG4gICAgICAgICAgICBpbnN0LmxvYWRlci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKGRhdGEudGh1bWJuYWlsLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlVmlldy5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSBsb2FkZXJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgaWYoZ2FtZUNhdGVnb3J5ID09IFwiZmF2XCIpe1xuICAgICAgICAgICAgdGhpcy5ibHVlSGVhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlZEhlYXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5sb2FkZXIpe1xuICAgICAgICAgICAgdGhpcy5sb2FkZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgY2xpY2sgbGlzdGVuZXJzIHdpdGggbmV3IGRhdGFcbiAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub2ZmKCdjbGljaycpO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub2ZmKCdjbGljaycpO1xuXG4gICAgICAgIHRoaXMuaW1hZ2VDbGljay5ub2RlLm9uKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRvdWNoRW5kUG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRvdWNoRW5kUG9zLnN1Yih0aGlzLnRvdWNoU3RhcnRQb3MpLm1hZygpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMTApIHsgLy8gQWRqdXN0IHRoaXMgdGhyZXNob2xkIGFzIG5lZWRlZFxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0l0ZW0oZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltYWdlQ2xpY2subm9kZS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkVG9GYXZvdWlydGVCdXR0b24ubm9kZS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZihteURhdGEuc2x1ZyA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlKG15RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0Zhdm91aXJ0ZUJ1dHRvbi5ub2RlLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydFBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XG4gICAgfSxcblxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoRW5kUG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdG91Y2hFbmRQb3Muc3ViKHRoaXMudG91Y2hTdGFydFBvcykubWFnKCk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IDEwKSB7IC8vIEFkanVzdCB0aGlzIHRocmVzaG9sZCBhcyBuZWVkZWRcbiAgICAgICAgICAgIC8vIHRoaXMub25DbGlja0l0ZW0odGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblRvdWNoQ2FuY2VsKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydFBvcyA9IG51bGw7XG4gICAgfSxcblxuICAgIC8vUHJlZmFiIENsaWNrZSB0byBvcGVuIHRoZSBnYW1lXG4gICAgb25DbGlja0l0ZW0oZGF0YSkge1xuICAgICAgICBsZXQgaW5zdCA9IHRoaXM7XG4gICAgICAgIGlmIChkYXRhLnNsdWcgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFkZHJlc3MgPSBLLlNlcnZlckFkZHJlc3MuaXBBZGRyZXNzICsgSy5TZXJ2ZXJBUEkuZ2V0R2FtZUJ5SWQgKyBgLyR7ZGF0YS5zbHVnfWA7XG4gICAgICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIkdFVFwiLCBhZGRyZXNzLCBcIlwiLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnVybCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd2Vidmlld1VybCA9IHJlc3BvbnNlLnVybDtcbiAgICAgICAgICAgIGlmIChpbnN0LmxvYmJ5Tm9kZSkge1xuICAgICAgICAgICAgICAgIGluc3QubG9iYnlOb2RlLm9wZW5XZWJWaWV3KHdlYnZpZXdVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBhZGRUb0Zhdm91aXJ0ZShteURhdGEpIHtcbiAgICAgICAgbGV0IGluc3QgPSB0aGlzXG4gICAgICAgIGlmIChteURhdGEuc2x1ZyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBnYW1lSWQ6IG15RGF0YS5faWQsXG4gICAgICAgICAgICAgICAgdHlwZTogaW5zdC5ibHVlSGVhcnQuYWN0aXZlID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5hZGR0b0ZhdiArIGAvJHt0aGlzLmxvYmJ5Tm9kZS5pZH1gO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5sb2JieU5vZGUuaWQsIFwiY2hlY2sgdXNlciBJZFwiKTtcbiAgICAgICAgICAgIFNlcnZlckNvbS5odHRwUmVxdWVzdChcIlBVVFwiLCBhZGRyZXNzLCB1c2VyRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20uZXJyb3JIZWFkaW5nLnN0cmluZyA9IFwiU3VjY2Vzc1wiO1xuICAgICAgICAgICAgICAgIFNlcnZlckNvbS5lcnJvckxhYmxlLnN0cmluZyA9IHJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5tZXNzYWdlID09IFwiR2FtZSBhZGRlZCB0byBmYXZvdXJpdGVzXCIpe1xuICAgICAgICAgICAgICAgICAgICBpbnN0LnJlZEhlYXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGluc3QuYmx1ZUhlYXJ0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpbnN0LmJsdWVIZWFydC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpbnN0LnJlZEhlYXJ0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgU2VydmVyQ29tLmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIGlmIChpbnN0LmxvYmJ5Tm9kZSAmJiBpbnN0LmxvYmJ5Tm9kZS5jYXRlZ29yeSA9PSBcImZhdlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3QubG9iYnlOb2RlLmZldGNoR2FtZXMoXCJmYXZcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sXG59KTsiXX0=