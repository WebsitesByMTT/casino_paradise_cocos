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
      type: cc.EditBox,
    },
    newPassword: {
      default: null,
      type: cc.EditBox,
    },
    confirmPassword: {
      default: null,
      type: cc.EditBox,
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
    id: null,
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
    myWebViewParent:{
      default: null,
      type: cc.Node
    },
    myWebView: cc.WebView,
    customKeyboard:{
      default: null,
      type: cc.Node,
  },
  smallAlphabet:{
      default: null,
      type: cc.Node
  },
  capitalAlphabet:{
      default: null,
      type: cc.Node
  },
  symbolsAlphabet: {
      default: null,
      type:cc.Node
  },
  capsButton:{
      default: null,
      type: cc.Node
  },
  smallButton:{
      default: null,
      type: cc.Node
  },
  deleteButton: {
      default:null,
      type: cc.Node
  },
  spaceButton:{
      default: null,
      type: cc.Node
  },
  commaButton:{
      default: null,
      type: cc.Node
  },
  dotButton:{
      default: null,
      type: cc.Node
  }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    if (!this.category) {
      this.category = "all";
    }

    this.activeInputField = null; 
    this.setupLobbyInputFocusListeners();
    this.setupLobbyKeyboardButtonListeners();
    this.disableDefaultKeyboard();

    this.itemsToLoad = []; // Array to store all items to be loaded
    this.currentIndex = 0; // Current index in the items array
    this.setFullScreenWidth();
    cc.view.setResizeCallback(this.setFullScreenWidth.bind(this)); // Update width on screen resize
    this.scrollView.node.on("scroll-to-right", this.loadMoreItems, this); // Event listener for horizontal scrolling
    let currentPos = this.cloudAnimNode.getPosition();
    let moveAction = cc.moveTo(
      this.moveDuration,
      cc.v2(this.targetX, currentPos.y)
    );
    this.getUserDetails();
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

    var address = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + gameCategory;
    ServerCom.httpRequest("GET", address, " ", function (response) {
        if (response.featured.length === 0 && response.others.length === 0) {
            ServerCom.errorLable.string = "No Games Found For This Category";
            ServerCom.loginErrorNode.active = true;
            setTimeout(() => {
                ServerCom.loginErrorNode.active = false;
            }, 2000);
            return;
        }

        let otherGames = response.others || [];
        let featured = response.featured || [];

        this.itemsToLoad = [];
        let featuredIndex = 0;
        // Insert a featured item after every 2 other items
        for (let i = 0; i < otherGames.length; i++) {
            if (i > 0 && i % 2 === 0 && featuredIndex < featured.length) {
                this.itemsToLoad.push({
                    data: featured[featuredIndex],
                    prefab: this.smallItemPrefab,
                });
                featuredIndex++;
            }
            this.itemsToLoad.push({
                data: otherGames[i],
                prefab: this.itemPrefab,
            });
        }

        // If there are remaining featured items and less than 3 otherGames, add the featured items at the end
        while (featuredIndex < featured.length) {
            this.itemsToLoad.push({
                data: featured[featuredIndex],
                prefab: this.smallItemPrefab,
            });
            featuredIndex++;
        }

        // If there are no otherGames, add all featured items
        if (otherGames.length === 0 && featured.length > 0) {
            for (let i = 0; i < featured.length; i++) {
                this.itemsToLoad.push({
                    data: featured[i],
                    prefab: this.smallItemPrefab,
                });
            }
        }

        this.currentIndex = 0;
        this.loadMoreItems(); // Load the first batch of items
    }.bind(this));
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
populateItems: function (itemData, prefab) {
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
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
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
    this.setFullScreenWidth();
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

  openWebView: function(url) {
    let inst = this
    let token = null;
    if (cc.sys.isBrowser) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('userToken=')) {
                token = cookie.substring('userToken='.length, cookie.length);
                break;
            }
        }
    } else {
        token = cc.sys.localStorage.getItem('userToken');
    }
    // Set the WebView URL
    this.myWebView.url = url;
    this.myWebViewParent.active = true;
    this.myWebView.node.on('loaded', () => {
        if (token) {
            this.myWebView.evaluateJS(`
               window.postMessage({ type: 'authToken', token: '${token}' }, '${url}');
            `);
        }
    });   
  window.addEventListener('message', function(event) {
    console.log("message", event);
    const message = event.data;
    if (message === 'authToken') {
        inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({ type: 'authToken', cookie: token }, `${url}`);
    }
    if (message === "onExit") {
      inst.myWebView.url = "";
      inst.myWebViewParent.active = false;
    }
});
},
 getUserDetails: function(){  
  let inst= this
  let address = K.ServerAddress.ipAddress + K.ServerAPI.userDetails
    ServerCom.httpRequest("GET", address, "", function(response){
      // let username = response.username; // Assuming response.username is 'ins'
      // let capitalizedUsername = inst.capitalizeFirstLetter(username);
      inst.id = response._id;
      inst.userId.string = response.username
      inst.coinsLabel.string = response.credits;
    })
 },

 capitalizeFirstLetter: function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
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
        return
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
      let address = K.ServerAddress.ipAddress + K.ServerAPI.password + `/` + this.id;
      let changeData = {
        existingPassword: this.oldPassword.string,
        password : this.newPassword.string
      }
      console.log(changeData, "pas");
      ServerCom.httpRequest("PUT", address, changeData, function(response){
        console.log("response", response);
        if(response.message){
          ServerCom.errorHeading.string = "Password Changed Successfully"
          ServerCom.errorLable.string = response.message;
          ServerCom.loginErrorNode.active = true;
          setTimeout(() => {
            ServerCom.loginErrorNode.active = false;
          }, 2000);
        }
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

  setFullScreenWidth() {
    if(!document.fullscreenElement){
      this.scrollView.node.width = 2050;
      this.scrollView.node.getChildByName("view").width = 2050;
    } else{
      const screenWidth = cc.winSize.width;
      // Set the width of the ScrollView node
      this.scrollView.node.width = screenWidth;
       // Set the width of the View node within the ScrollView
      this.scrollView.node.getChildByName("view").width = screenWidth;
    }
   },

   setupLobbyInputFocusListeners() {
    if (cc.sys.isMobile && cc.sys.isBrowser) {
            // Attach focus event listeners to username and password input fields
            if (this.oldPassword) {
                this.oldPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
            }
            if (this.newPassword) {
                this.newPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
            }
            if(this.confirmPassword){
              this.confirmPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
              this.confirmPassword.node.on('editing-did-began', this.onInputFieldFocused, this);
              this.confirmPassword.node.on('editing-did-ended', this.onInputFieldBlurred, this);
            }
        }
    },

    onInputFieldClicked(event) {
      // Focus the corresponding input field to trigger the keyboard
      const inputNode = event.currentTarget.getComponent(cc.EditBox);
      if (inputNode) {
          // inputNode.focus()
          this.activeInputField = inputNode;
          if (this.customKeyboard) {
              this.customKeyboard.active = true; // Show the custom keyboard if needed
          }
      }
    },

    onInputFieldFocused: function(event){
      // console.log("eventFocused", event);
      const inputNode = event.node.getComponent(cc.EditBox);
        if (inputNode) {
            inputNode.placeholder = ""; // Remove the placeholder text when focused
        }
    },

    onInputFieldBlurred: function(event){
      const inputNode = event.node.getComponent(cc.EditBox);
        if (inputNode) {
            // inputNode.placeholder = inputNode._placeholderLabel.string; // Restore the placeholder text when blurred
        }
    },


  setupLobbyKeyboardButtonListeners: function() {
    const allKeyboardButtons = this.getAllKeyboardButtons();
        allKeyboardButtons.forEach(button => {
            button.on(cc.Node.EventType.TOUCH_END, this.onKeyboardButtonClicked, this);
        });
        if (this.deleteButton) { // Add listener for the delete button
            this.deleteButton.on(cc.Node.EventType.TOUCH_END, this.onDeleteButtonClicked, this);
        }
    },

    getAllKeyboardButtons() {
      let buttons = [];
          buttons = buttons.concat(this.smallAlphabet.children);
          buttons = buttons.concat(this.capitalAlphabet.children);
          buttons = buttons.concat(this.symbolsAlphabet.children);
          buttons = buttons.concat(this.spaceButton);
          buttons = buttons.concat(this.commaButton);
          buttons = buttons.concat(this.dotButton);
          return buttons;
      },

      onKeyboardButtonClicked(event) {
          const button = event.target;
          const customEventValue = button._components[1].clickEvents[0].customEventData;
          this.appendToActiveInput(customEventValue);
      },

      appendToActiveInput(value) {
          if (this.activeInputField) {
              this.activeInputField.string += value; // Append value to the active input field
          }
      },
      onDeleteButtonClicked() {
          this.removeFromActiveInput();
      },

      removeFromActiveInput() {
            if (this.activeInputField && this.activeInputField.string.length > 0) {
                this.activeInputField.string = this.activeInputField.string.slice(0, -1); // Remove last character
            }
        },
      
        disableDefaultKeyboard:function() {
            if (cc.sys.isMobile && cc.sys.isBrowser) {
                const inputs = document.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.style.pointerEvents = 'none'; // Disable interactions
                });
            }
        },
});

