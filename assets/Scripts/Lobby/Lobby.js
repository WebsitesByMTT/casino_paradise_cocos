const Cookies = require("js-cookies");
const login = require("Login");
const jwt = require('jsonwebtoken'); 
cc.Class({
  extends: cc.Component,

  properties: {
    userId: {
      default: null,
      type: cc.Label,
    },
    coinsLabel: {
      default: null,
      type: cc.Label,
    },
    cloudAnimNode: {
      default: null,
      type: cc.Node,
    },
    sprite: {
      default: null,
      type: cc.SpriteFrame,
    },
    smallItemNode: {
      default: null,
      type: cc.Node,
    },
    rightTiltNode: {
      default: null,
      type: cc.Node,
    },
    leftTiltNode: {
      default: null,
      type: cc.Node,
    },
    spinWheelNode: {
      default: null,
      type: cc.Node,
    },
    OuterAnimation: {
      default: null,
      type: cc.Node,
    },
    passwordNode: {
      default: null,
      type: cc.Node,
    },
    passwordChangeButton: {
      default: null,
      type: cc.Node,
    },
    popupNode: {
      default: null,
      type: cc.Node,
    },
    oldPassword: {
      default: null,
      type: cc.Label,
    },
    newPassword: {
      default: null,
      type: cc.Label,
    },
    confirmPassword: {
      default: null,
      type: cc.Label,
    },
    profileNode: {
      default: null,
      type: cc.Node,
    },
    saveProfileBtn: {
      default: null,
      type: cc.Node,
    },
    allTab: {
      default: null,
      type: cc.Node,
    },
    fishTab: {
      default: null,
      type: cc.Node,
    },
    favTab: {
      default: null,
      type: cc.Node,
    },
    slotTab: {
      default: null,
      type: cc.Node,
    },
    kenoTab: {
      default: null,
      type: cc.Node,
    },
    otherTab: {
      default: null,
      type: cc.Node,
    },
    loginNode: {
      default: null,
      type: login,
    },
    scrollView: cc.ScrollView,
    itemPrefab: cc.Prefab,
    smallItemPrefab: cc.Prefab,
    category: null,
    lefttiltAngle: -7, // Angle to tilt the node (in degrees)
    tiltDuration: 0.2, // Duration of the tilt animation
    originalRotation: 0,
    righttiltAngle: 7,
    targetX: 0,
    moveDuration: 2.0,
    scaleUp: 0.9, // Scale factor when mouse enters
    scaleNormal: 0.9,
    itemsPerLoad: 10,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    if (!this.category) {
      this.category = "all";
    }
    this.itemsToLoad = []; // Array to store all items to be loaded
    this.currentIndex = 0; // Current index in the items array
    this.scrollView.node.on("scroll-to-right", this.loadMoreItems, this); // Event listener for horizontal scrolling
    let currentPos = this.cloudAnimNode.getPosition();
    let moveAction = cc.moveTo(
      this.moveDuration,
      cc.v2(this.targetX, currentPos.y)
    );
    // Run the move action on the sprite node
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
  fetchGames: function (gameCategory) {
    let content = this.scrollView.content;
    content.removeAllChildren();

    var address =
      K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + gameCategory;
    ServerCom.httpRequest("GET", address, "", function (response) {
        if (response.featured.length === 0 &&  response.otherGames.length === 0) {
          ServerCom.errorLable.string = "No Games Found For This Category";
          ServerCom.loginErrorNode.active = true;
          setTimeout(() => {
            ServerCom.loginErrorNode.active = false;
          }, 2000);
          return;
        }

        let otherGames = response.otherGames || [];
        let featured = response.featured || [];

        this.itemsToLoad = [];

        // Insert the featured item at the third position
        for (let i = 0; i < otherGames.length; i++) {
          if (i === 2 && featured.length > 0) {
            this.itemsToLoad.push({data: featured[0],prefab: this.smallItemPrefab,});
          }
          this.itemsToLoad.push({data: otherGames[i],prefab: this.itemPrefab,});
        }

        // If there are less than 3 otherGames, add the featured item at the end if it hasn't been added yet
        if (otherGames.length < 3 && featured.length > 0) {
          this.itemsToLoad.push({ data: featured[0], prefab: this.smallItemPrefab, });
        }
        this.currentIndex = 0;
        this.loadMoreItems(); // Load the first batch of items
      }.bind(this)
    );
  },

  loadMoreItems: function () {
    if (this.currentIndex >= this.itemsToLoad.length) return; // No more items to load
    let endIndex = Math.min(
      this.currentIndex + this.itemsPerLoad,
      this.itemsToLoad.length
    );
    for (let i = this.currentIndex; i < endIndex; i++) {
      let itemData = this.itemsToLoad[i];
      this.populateItems(itemData.data, itemData.prefab);
    }
    this.currentIndex = endIndex;
  },

    // Draw Game Items in Lobby
  populateItems(itemData, prefab) {
      let item = cc.instantiate(prefab);
      let itemScript = item.getComponent("GamesPrefab");
      itemScript.updateItem(itemData);
      this.scrollView.content.addChild(item);
    },

  getGamesByCategoryAll: function () {
    this.category = "all";
    const gameTabs = [
      this.fishTab.getChildByName("bg"),
      this.favTab.getChildByName("bg"),
      this.slotTab.getChildByName("bg"),
      this.kenoTab.getChildByName("bg"),
      this.otherTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.allTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },

  getGamesByCategoryfish: function () {
    this.category = "fish";
    const gameTabs = [
      this.allTab.getChildByName("bg"),
      this.favTab.getChildByName("bg"),
      this.slotTab.getChildByName("bg"),
      this.kenoTab.getChildByName("bg"),
      this.otherTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.fishTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryfav: function () {
    this.category = "fav";
    const gameTabs = [
      this.fishTab.getChildByName("bg"),
      this.allTab.getChildByName("bg"),
      this.slotTab.getChildByName("bg"),
      this.kenoTab.getChildByName("bg"),
      this.otherTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.favTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategorySlot: function (event) {
    this.category = "slot";
    const gameTabs = [
      this.fishTab.getChildByName("bg"),
      this.allTab.getChildByName("bg"),
      this.favTab.getChildByName("bg"),
      this.kenoTab.getChildByName("bg"),
      this.otherTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.slotTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryKeno: function (event) {
    this.category = "keno";
    const gameTabs = [
      this.fishTab.getChildByName("bg"),
      this.allTab.getChildByName("bg"),
      this.favTab.getChildByName("bg"),
      this.slotTab.getChildByName("bg"),
      this.otherTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.kenoTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },
  getGamesByCategoryOther: function (event) {
    this.category = "others";
    const gameTabs = [
      this.fishTab.getChildByName("bg"),
      this.allTab.getChildByName("bg"),
      this.favTab.getChildByName("bg"),
      this.slotTab.getChildByName("bg"),
      this.kenoTab.getChildByName("bg"),
    ];
    gameTabs.forEach((tab) => (tab.active = false));
    this.otherTab.getChildByName("bg").active = true;
    this.fetchGames(this.category);
  },



  // for full Screen
  zoomFullScreenClick: function () {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
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
  closeSpinNode: function () {
    if (this.spinWheelNode.active) {
      this.spinWheelNode.active = false;
    }
  },

  // Open Spin the Wheel popup and run outer animation
  openSpinWheelNode: function () {
    var rotateAction = cc.rotateBy(5, 360);
    var continueRotate = cc.repeatForever(rotateAction);
    this.OuterAnimation.runAction(continueRotate);
    if (!this.spinWheelNode.active) {
      this.spinWheelNode.active = true;
    }
  },

  // open Profile popup
  openProflePopup: function () {
    this.popupNode.active = true;
    this.profileNode.active = true;
  },
  // Logout Button Clicked
  logOutClick: function () {
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
  passwordChangeBtn: function () {
    if (
      this.oldPassword.string == "" ||
      this.newPassword.string == "" ||
      this.confirmPassword.string == ""
    ) {
      ServerCom.errorLable.string = "All fields are mandatory";
      ServerCom.loginErrorNode.active = true;
      setTimeout(() => {
        ServerCom.loginErrorNode.active = false;
      }, 2000);
    } else {
      if (this.newPassword.string != this.confirmPassword.string) {
        ServerCom.errorLable.string =
          "New Password and confirm password did not match";
        ServerCom.loginErrorNode.active = true;
        setTimeout(() => {
          ServerCom.loginErrorNode.active = false;
        }, 2000);
      }
      let token = null
      if (!token && cc.sys.isBrowser) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('token=')) {
                token = cookie.substring('token='.length, cookie.length);
                break;
            }
        }
      }
      const user = jwt.decode(token);
      let address = K.ServerAddress.ipAddress + K.ServerAPI.password + `/${user.username}`;
      let changeData = {
        changedPassword : this.newPassword.string
      }
      ServerCom.httpRequest("PUT", address, changeData, function(resposen){
        console.log("response", response);
      }.bind(this))
      this.passwordNode.active = false;
      this.popupNode.active = false;
    }
  },
  // to open the password popup
  changePassword: function () {
    this.passwordNode.active = true;
    this.popupNode.active = true;
  },
  // close all popup
  closePopupBtn: function () {
    if (this.passwordNode.active || this.profileNode.active) {
      this.passwordNode.active = false;
      this.profileNode.active = false;
    }
    this.popupNode.active = false;
  },

  // Save profile button Clicked
  saveProfile: function () {
    this.profileNode.active = false;
    this.popupNode.active = false;
  },
});
