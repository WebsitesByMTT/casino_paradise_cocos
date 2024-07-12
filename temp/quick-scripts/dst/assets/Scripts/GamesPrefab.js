
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
    lobbyNode: null
  },
  onLoad: function onLoad() {
    // console.log("onLoad called");
    this.setupEventListeners();
    var myScene = cc.find("Canvas");
    console.log(myScene, "finidng");
    var lobbyNode = cc.find("Canvas/LobbyNode");

    if (lobbyNode) {
      this.lobbyNode = lobbyNode.getComponent("Lobby");

      if (!this.lobbyNode) {// console.error("Lobby component not found on LobbyNode");
      }
    } else {// console.error("LobbyNode not found in the scene");
    }
  },
  setupEventListeners: function setupEventListeners() {
    // Remove existing listeners to prevent duplicate event calls
    this.imageClick.node.off('click', this.onClickItem, this);
    this.addToFavouirteButton.node.off('click', this.addToFavouirte, this); // Add new listeners

    this.imageClick.node.on('click', this.onClickItem, this);
    this.addToFavouirteButton.node.on('click', this.addToFavouirte, this);
  },
  updateItem: function updateItem(data) {
    var _this = this;

    cc.assetManager.loadRemote(data.thumbnail, function (err, texture) {
      if (err) {
        console.error(err);
        return;
      }

      _this.imageView.spriteFrame = new cc.SpriteFrame(texture);
    }); // Update click listeners with new data
    // console.log("Updating click listeners for new data");

    this.imageClick.node.off('click', this.onClickItem, this);
    this.addToFavouirteButton.node.off('click', this.addToFavouirte, this);
    this.imageClick.node.on('click', function () {
      // console.log("imageClick button clicked");
      _this.onClickItem(data);

      _this.imageClick.node.interactable = false;
    });
    this.addToFavouirteButton.node.on('click', function () {
      _this.addToFavouirte(data);
    });
  },
  onClickItem: function onClickItem(data) {
    console.log(data);

    if (data.url == undefined) {
      return;
    }

    var webviewUrl = data.url; // console.error("lobby webview", this.lobbyNode);
    // console.log("URL to open:", data.url);

    console.log(this.lobbyNode);

    if (this.lobbyNode) {
      this.lobbyNode.openWebView(webviewUrl);
    }
  },
  addToFavouirte: function addToFavouirte(data) {
    var userData = {
      gameId: data._id,
      type: data.type
    };
    var address = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav;
    ServerCom.httpRequest("POST", address, userData, function (response) {// console.log("responseresponse", response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0dhbWVzUHJlZmFiLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaW1hZ2VWaWV3IiwiU3ByaXRlIiwiaW1hZ2VDbGljayIsIkJ1dHRvbiIsImFkZFRvRmF2b3VpcnRlQnV0dG9uIiwibXl3ZWJWaWV3IiwiV2ViVmlldyIsIndlYnZpZXdVcmwiLCJsb2JieU5vZGUiLCJvbkxvYWQiLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwibXlTY2VuZSIsImZpbmQiLCJjb25zb2xlIiwibG9nIiwiZ2V0Q29tcG9uZW50Iiwibm9kZSIsIm9mZiIsIm9uQ2xpY2tJdGVtIiwiYWRkVG9GYXZvdWlydGUiLCJvbiIsInVwZGF0ZUl0ZW0iLCJkYXRhIiwiYXNzZXRNYW5hZ2VyIiwibG9hZFJlbW90ZSIsInRodW1ibmFpbCIsImVyciIsInRleHR1cmUiLCJlcnJvciIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJpbnRlcmFjdGFibGUiLCJ1cmwiLCJ1bmRlZmluZWQiLCJvcGVuV2ViVmlldyIsInVzZXJEYXRhIiwiZ2FtZUlkIiwiX2lkIiwidHlwZSIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImFkZHRvRmF2IiwiU2VydmVyQ29tIiwiaHR0cFJlcXVlc3QiLCJyZXNwb25zZSIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssTUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFGUDtBQUdSQyxJQUFBQSxvQkFBb0IsRUFBRVIsRUFBRSxDQUFDTyxNQUhqQjtBQUlSRSxJQUFBQSxTQUFTLEVBQUVULEVBQUUs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VSxHQUFHZSxJQUFJLENBQUNVLEdBQXRCLENBTGMsQ0FNZDtBQUNBOztBQUdBbkIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS04sU0FBakI7O0FBQ0EsUUFBRyxLQUFLQSxTQUFSLEVBQWtCO0FBQ2QsV0FBS0EsU0FBTCxDQUFlMEIsV0FBZixDQUEyQjNCLFVBQTNCO0FBQ0g7QUFDSixHQTdFSTtBQStFTFksRUFBQUEsY0FBYyxFQUFFLHdCQUFTRyxJQUFULEVBQWU7QUFDM0IsUUFBSWEsUUFBUSxHQUFHO0FBQ1hDLE1BQUFBLE1BQU0sRUFBRWQsSUFBSSxDQUFDZSxHQURGO0FBRVhDLE1BQUFBLElBQUksRUFBRWhCLElBQUksQ0FBQ2dCO0FBRkEsS0FBZjtBQUlBLFFBQUlDLE9BQU8sR0FBR0MsQ0FBQyxDQUFDQyxhQUFGLENBQWdCQyxTQUFoQixHQUE0QkYsQ0FBQyxDQUFDRyxTQUFGLENBQVlDLFFBQXREO0FBQ0FDLElBQUFBLFNBQVMsQ0FBQ0MsV0FBVixDQUFzQixNQUF0QixFQUE4QlAsT0FBOUIsRUFBdUNKLFFBQXZDLEVBQWlELFVBQVNZLFFBQVQsRUFBbUIsQ0FDaEU7QUFDSCxLQUZnRCxDQUUvQ0MsSUFGK0MsQ0FFMUMsSUFGMEMsQ0FBakQ7QUFHSDtBQXhGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpbWFnZVZpZXc6IGNjLlNwcml0ZSxcbiAgICAgICAgaW1hZ2VDbGljazogY2MuQnV0dG9uLFxuICAgICAgICBhZGRUb0Zhdm91aXJ0ZUJ1dHRvbjogY2MuQnV0dG9uLFxuICAgICAgICBteXdlYlZpZXc6IGNjLldlYlZpZXcsXG4gICAgICAgIHdlYnZpZXdVcmw6IG51bGwsXG4gICAgICAgIGxvYmJ5Tm9kZTogbnVsbFxuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Mb2FkIGNhbGxlZFwiKTtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGNvbnN0IG15U2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpXG4gICAgICAgIGNvbnNvbGUubG9nKG15U2NlbmUsIFwiZmluaWRuZ1wiKTtcbiAgICAgICAgY29uc3QgbG9iYnlOb2RlID0gY2MuZmluZChcIkNhbnZhcy9Mb2JieU5vZGVcIik7XG4gICAgICAgIGlmIChsb2JieU5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9iYnlOb2RlID0gbG9iYnlOb2RlLmdldENvbXBvbmVudChcIkxvYmJ5XCIpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvYmJ5Tm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJMb2JieSBjb21wb25lbnQgbm90IGZvdW5kIG9uIExvYmJ5Tm9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJMb2JieU5vZGUgbm90IGZvdW5kIGluIHRoZSBzY2VuZVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBcblxuICAgIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIC8vIFJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgdG8gcHJldmVudCBkdXBsaWNhdGUgZXZlbnQgY2FsbHNcbiAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub2ZmKCdjbGljaycsIHRoaXMub25DbGlja0l0ZW0sIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub2ZmKCdjbGljaycsIHRoaXMuYWRkVG9GYXZvdWlydGUsIHRoaXMpO1xuXG4gICAgICAgIC8vIEFkZCBuZXcgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuaW1hZ2VDbGljay5ub2RlLm9uKCdjbGljaycsIHRoaXMub25DbGlja0l0ZW0sIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub24oJ2NsaWNrJywgdGhpcy5hZGRUb0Zhdm91aXJ0ZSwgdGhpcyk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUl0ZW0oZGF0YSkge1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShkYXRhLnRodW1ibmFpbCwgKGVyciwgdGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltYWdlVmlldy5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGNsaWNrIGxpc3RlbmVycyB3aXRoIG5ldyBkYXRhXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBkYXRpbmcgY2xpY2sgbGlzdGVuZXJzIGZvciBuZXcgZGF0YVwiKTtcbiAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub2ZmKCdjbGljaycsIHRoaXMub25DbGlja0l0ZW0sIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub2ZmKCdjbGljaycsIHRoaXMuYWRkVG9GYXZvdWlydGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmltYWdlQ2xpY2subm9kZS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlQ2xpY2sgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tJdGVtKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0Zhdm91aXJ0ZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tJdGVtKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGlmKGRhdGEudXJsID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdlYnZpZXdVcmwgPSBkYXRhLnVybFxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwibG9iYnkgd2Vidmlld1wiLCB0aGlzLmxvYmJ5Tm9kZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVVJMIHRvIG9wZW46XCIsIGRhdGEudXJsKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvYmJ5Tm9kZSk7XG4gICAgICAgIGlmKHRoaXMubG9iYnlOb2RlKXtcbiAgICAgICAgICAgIHRoaXMubG9iYnlOb2RlLm9wZW5XZWJWaWV3KHdlYnZpZXdVcmwpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkZFRvRmF2b3VpcnRlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgIGdhbWVJZDogZGF0YS5faWQsXG4gICAgICAgICAgICB0eXBlOiBkYXRhLnR5cGVcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5hZGR0b0ZhdjtcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiUE9TVFwiLCBhZGRyZXNzLCB1c2VyRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZVwiLCByZXNwb25zZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbn0pO1xuIl19