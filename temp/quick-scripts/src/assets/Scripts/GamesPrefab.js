"use strict";
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