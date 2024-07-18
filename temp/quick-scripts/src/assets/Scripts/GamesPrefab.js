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