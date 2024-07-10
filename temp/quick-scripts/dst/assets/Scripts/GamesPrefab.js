
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
    addToFavouirteButton: cc.Button
  },
  onload: function onload() {
    this.imageClick.node.on('click', this.onClickItem, this);
    this.addToFavouirteButton.node.on('click', this.addToFavouirte, this);
  },
  updateItem: function updateItem(data) {
    var _this = this;

    console.log("generating Items");
    cc.assetManager.loadRemote(data.gameThumbnailUrl, function (err, texture) {
      if (err) {
        console.error(err);
        return;
      }

      _this.imageView.spriteFrame = new cc.SpriteFrame(texture);
    });
    this.imageClick.node.off('click');
    this.addToFavouirteButton.node.off('click');
    this.imageClick.node.on('click', function () {
      _this.onClickItem(data);
    });
    this.addToFavouirteButton.node.on('click', function () {
      _this.addToFavouirte(data);
    });
  },
  onClickItem: function onClickItem(data) {// console.log('Item clicked:', data);
    // console.log("GameId", data._id);
  },
  addToFavouirte: function addToFavouirte(data) {
    // console.log("check click on add to Fav");
    var userData = {
      gameId: data._id,
      type: data.type
    };
    var address = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav;
    ServerCom.httpRequest("POST", address, userData, function (response) {
      console.log("responseresponse", response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0dhbWVzUHJlZmFiLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaW1hZ2VWaWV3IiwiU3ByaXRlIiwiaW1hZ2VDbGljayIsIkJ1dHRvbiIsImFkZFRvRmF2b3VpcnRlQnV0dG9uIiwib25sb2FkIiwibm9kZSIsIm9uIiwib25DbGlja0l0ZW0iLCJhZGRUb0Zhdm91aXJ0ZSIsInVwZGF0ZUl0ZW0iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImFzc2V0TWFuYWdlciIsImxvYWRSZW1vdGUiLCJnYW1lVGh1bWJuYWlsVXJsIiwiZXJyIiwidGV4dHVyZSIsImVycm9yIiwic3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsIm9mZiIsInVzZXJEYXRhIiwiZ2FtZUlkIiwiX2lkIiwidHlwZSIsImFkZHJlc3MiLCJLIiwiU2VydmVyQWRkcmVzcyIsImlwQWRkcmVzcyIsIlNlcnZlckFQSSIsImFkZHRvRmF2IiwiU2VydmVyQ29tIiwiaHR0cFJlcXVlc3QiLCJyZXNwb25zZSIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssTUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFGUDtBQUdSQyxJQUFBQSxvQkFBb0IsRUFBRVIsRUFBRSxDQUFDTztBQUhqQixHQUhQO0FBU0xFLEVBQUFBLE1BVEssb0JBU0c7QUFDSixTQUFLSCxVQUFMLENBQWdCSSxJQUFoQixDQUFxQkMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBS0MsV0FBdEMsRUFBbUQsSUFBbkQ7QUFDQSxTQUFLSixvQkFBTCxDQUEwQkUsSUFBMUIsQ0FBK0JDLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLEtBQUtFLGNBQWhELEVBQWdFLElBQWhFO0FBQ0gsR0FaSTtBQWNMQyxFQUFBQSxVQWRLLHNCQWNNQyxJQWROLEVBY1k7QUFBQTs7QUFDYkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDQWpCLElBQUFBLEVBQUUsQ0FBQ2tCLFlBQUgsQ0FBZ0JDLFVBQWhCLENBQTJCSixJQUFJLENBQUNLLGdCQUFoQyxFQUFrRCxVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDaEUsVUFBSUQsR0FBSixFQUFTO0FBQ0xMLFFBQUFBLE9BQU8sQ0FBQ08sS0FBUixDQUFjRixHQUFkO0FBQ0E7QUFDSDs7QUFDRCxNQUFBLEtBQUksQ0FBQ2pCLFNBQUwsQ0FBZW9CLFdBQWYsR0FBNkIsSUFBSXhCLEVBQUUsQ0FBQ3lCLFdBQVAsQ0FBbUJILE9BQW5CLENBQTdCO0FBQ0gsS0FORDtBQVFBLFNBQUtoQixVQUFMLENBQWdCSSxJQUFoQixDQUFxQmdCLEdBQXJCLENBQXlCLE9BQXpCO0FBQ0EsU0FBS2xCLG9CQUFMLENBQTBCRSxJQUExQixDQUErQmdCLEdBQS9CLENBQW1DLE9BQW5DO0FBQ0EsU0FBS3BCLFVBQUwsQ0FBZ0JJLElBQWhCLENBQXFCQyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFNO0FBQ25DLE1BQUEsS0FBSSxDQUFDQyxXQUFMLENBQWlCRyxJQUFqQjtBQUNILEtBRkQ7QUFHQSxTQUFLUCxvQkFBTCxDQUEwQkUsSUFBMUIsQ0FBK0JDLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFlBQU07QUFDN0MsTUFBQSxLQUFJLENBQUNFLGNBQUwsQ0FBb0JFLElBQXBCO0FBQ0gsS0FGRDtBQUdILEdBaENJO0FBa0NMSCxFQUFBQSxXQWxDSyx1QkFrQ09HLElBbENQLEVBa0NhLENBQ2Q7QUFDQTtBQUNILEdBckNJO0FBc0NMRixFQUFBQSxjQUFjLEVBQUUsd0JBQVNFLElBQVQsRUFBYztBQUMxQjtBQUNBLFFBQUlZLFFBQVEsR0FBRztBQUNYQyxNQUFBQSxNQUFNLEVBQUViLElBQUksQ0FBQ2MsR0FERjtBQUVYQyxNQUFBQSxJQUFJLEVBQUVmLElBQUksQ0FBQ2U7QUFGQSxLQUFmO0FBSUEsUUFBSUMsT0FBTyxHQUFHQyxDQUFDLENBQUNDLGFBQUYsQ0FBZ0JDLFNBQWhCLEdBQTRCRixDQUFDLENBQUNHLFNBQUYsQ0FBWUMsUUFBdEQ7QUFDQUMsSUFBQUEsU0FBUyxDQUFDQyxXQUFWLENBQXNCLE1BQXRCLEVBQThCUCxPQUE5QixFQUF1Q0osUUFBdkMsRUFBaUQsVUFBU1ksUUFBVCxFQUFtQjtBQUNoRXZCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaLEVBQWdDc0IsUUFBaEM7QUFFRCxLQUg4QyxDQUc3Q0MsSUFINkMsQ0FHeEMsSUFId0MsQ0FBakQ7QUFJSDtBQWpESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpbWFnZVZpZXc6IGNjLlNwcml0ZSxcbiAgICAgICAgaW1hZ2VDbGljazogY2MuQnV0dG9uLFxuICAgICAgICBhZGRUb0Zhdm91aXJ0ZUJ1dHRvbjogY2MuQnV0dG9uLFxuICAgIH0sXG5cbiAgICBvbmxvYWQoKXtcbiAgICAgICAgdGhpcy5pbWFnZUNsaWNrLm5vZGUub24oJ2NsaWNrJywgdGhpcy5vbkNsaWNrSXRlbSwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRkVG9GYXZvdWlydGVCdXR0b24ubm9kZS5vbignY2xpY2snLCB0aGlzLmFkZFRvRmF2b3VpcnRlLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSXRlbShkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2VuZXJhdGluZyBJdGVtc1wiKTtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoZGF0YS5nYW1lVGh1bWJuYWlsVXJsLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VWaWV3LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmltYWdlQ2xpY2subm9kZS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHRoaXMuYWRkVG9GYXZvdWlydGVCdXR0b24ubm9kZS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHRoaXMuaW1hZ2VDbGljay5ub2RlLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja0l0ZW0oZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZFRvRmF2b3VpcnRlQnV0dG9uLm5vZGUub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb0Zhdm91aXJ0ZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tJdGVtKGRhdGEpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0l0ZW0gY2xpY2tlZDonLCBkYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJHYW1lSWRcIiwgZGF0YS5faWQpO1xuICAgIH0sXG4gICAgYWRkVG9GYXZvdWlydGU6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrIGNsaWNrIG9uIGFkZCB0byBGYXZcIik7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICAgIGdhbWVJZDogZGF0YS5faWQsXG4gICAgICAgICAgICB0eXBlOiBkYXRhLnR5cGVcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWRkcmVzcyA9IEsuU2VydmVyQWRkcmVzcy5pcEFkZHJlc3MgKyBLLlNlcnZlckFQSS5hZGR0b0ZhdjtcbiAgICAgICAgU2VydmVyQ29tLmh0dHBSZXF1ZXN0KFwiUE9TVFwiLCBhZGRyZXNzLCB1c2VyRGF0YSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VyZXNwb25zZVwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG59KTtcbiJdfQ==