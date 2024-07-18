
cc.Class({
    extends: cc.Component,

    properties: {
        imageView: cc.Sprite,
        imageClick: cc.Button,
        addToFavouirteButton: cc.Button,
        mywebView: cc.WebView,
        webviewUrl: null,
        lobbyNode: null,
        redHeart:{
            default: null,
            type: cc.Node
        },
        blueHeart:{
            default: null,
            type: cc.Node
        },
        loader:{
            default: null,
            type: cc.Node
        },
        aniMation: {
            default: null,
            type: cc.Node
        },
        delayDuration: {
            default: 2,
            type: cc.Float
        }
    },

    onLoad() {
        this.setupEventListeners();
        const lobbyNode = cc.find("Canvas/LobbyNode");
        if (lobbyNode) {
            this.lobbyNode = lobbyNode.getComponent("Lobby");
            if (!this.lobbyNode) {
                // console.error("Lobby component not found on LobbyNode");
            }
        } else {
            // console.error("LobbyNode not found in the scene");
        }
        this.startLoaderAnimation();
    },

    startLoaderAnimation() {
        if (this.aniMation._tween) {
            this.aniMation._tween.stop();
        }
        this.aniMation._tween = cc.tween(this.aniMation).repeatForever(cc.tween().to(1, { angle: -360 })).start();
    },

    stopLoaderAnimation() {
        if (this.aniMation._tween) {
            this.aniMation._tween.stop();
            this.aniMation.angle = 0;
        }
    },

    setupEventListeners() {
        // // Add new listeners
        // this.imageClick.node.on('click', this.onClickItem, this);
        // this.addToFavouirteButton.node.on('click', this.addToFavouirte, this);
            // Remove existing listeners to prevent duplicate event calls
            this.imageClick.node.off('touchstart', this.onTouchStart, this);
            this.imageClick.node.off('touchend', this.onTouchEnd, this);
            this.imageClick.node.off('touchcancel', this.onTouchCancel, this);
    
            // Add new listeners
            this.imageClick.node.on('touchstart', this.onTouchStart, this);
            this.imageClick.node.on('touchend', this.onTouchEnd, this);
            this.imageClick.node.on('touchcancel', this.onTouchCancel, this);
    },

    updateItem(data, gameCategory) {
        let inst = this
        let myData = data;

        if (!inst.loader.active) {
            inst.loader.active = true;
        }
        cc.assetManager.loadRemote(data.thumbnail, (err, texture) => {
                if (err) {
                    console.error(err);
                    if (this.loader) {
                        this.loader.active = false;
                    }
                    return;
                }
                this.imageView.spriteFrame = new cc.SpriteFrame(texture);
                // Hide the loader
                if (this.loader) {
                    this.loader.active = false;
                }
        });
    
        if(gameCategory == "fav"){
            this.blueHeart.active = false;
            this.redHeart.active = true;
        }
        if(this.loader){
            this.loader.active = false;
        }

        // Update click listeners with new data
        this.imageClick.node.off('click');
        this.addToFavouirteButton.node.off('click');

        this.imageClick.node.on('touchend', (event) => {
            let touchEndPos = event.getLocation();
            let distance = touchEndPos.sub(this.touchStartPos).mag();
            if (distance < 10) { // Adjust this threshold as needed
                this.onClickItem(data);
            }
            this.imageClick.node.interactable = false;
        });
        this.addToFavouirteButton.node.on('click', () => {
            if(myData.slug == undefined){
                return
            }
            else{
                this.addToFavouirte(myData);
                this.addToFavouirteButton.node.interactable = false;
            }
        });
    },

    onTouchStart(event) {
        this.touchStartPos = event.getLocation();
    },

    onTouchEnd(event) {
        let touchEndPos = event.getLocation();
        let distance = touchEndPos.sub(this.touchStartPos).mag();
        if (distance < 10) { // Adjust this threshold as needed
            // this.onClickItem(this.data);
        }
    },

    onTouchCancel(event) {
        this.touchStartPos = null;
    },

    //Prefab Clicke to open the game
    onClickItem(data) {
        let inst = this;
        if (data.slug == undefined) {
            return;
        }
        let address = K.ServerAddress.ipAddress + K.ServerAPI.getGameById + `/${data.slug}`;
        ServerCom.httpRequest("GET", address, "", function(response) {
            if (response.url == undefined) {
                return;
            }
            let webviewUrl = response.url;
            if (inst.lobbyNode) {
                inst.lobbyNode.openWebView(webviewUrl);
            }
        }.bind(this));
    },

    addToFavouirte(myData) {
        let inst = this
        if (myData.slug == undefined) {
            return;
        } else {
            let userData = {
                gameId: myData._id,
                type: inst.blueHeart.active ? "add" : "remove"
            };
            let address = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav + `/${this.lobbyNode.id}`;
            // console.log(this.lobbyNode.id, "check user Id");
            ServerCom.httpRequest("PUT", address, userData, function(response) {
                // console.log("response", response);
                ServerCom.errorHeading.string = "Success";
                ServerCom.errorLable.string = response.message
                if(response.message == "Game added to favourites"){
                    inst.redHeart.active = true;
                    inst.blueHeart.active = false;
                }else{
                    inst.blueHeart.active = true;
                    inst.redHeart.active = false;
                }
                ServerCom.loginErrorNode.active = true;
                setTimeout(() => {
                    ServerCom.loginErrorNode.active = false;
                }, 2000);
                if (inst.lobbyNode && inst.lobbyNode.category == "fav") {
                    inst.lobbyNode.fetchGames("fav");
                }
                   
            }.bind(this));
        }
    },
});