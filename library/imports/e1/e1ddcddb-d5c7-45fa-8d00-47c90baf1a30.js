"use strict";
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