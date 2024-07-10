cc.Class({
    extends: cc.Component,

    properties: {
        imageView: cc.Sprite,
        imageClick: cc.Button,
        addToFavouirteButton: cc.Button,
    },

    onload(){
        this.imageClick.node.on('click', this.onClickItem, this);
        this.addToFavouirteButton.node.on('click', this.addToFavouirte, this);
    },

    updateItem(data) {
        console.log("generating Items");
        cc.assetManager.loadRemote(data.gameThumbnailUrl, (err, texture) => {
            if (err) {
                console.error(err);
                return;
            }
            this.imageView.spriteFrame = new cc.SpriteFrame(texture);
        });

        this.imageClick.node.off('click');
        this.addToFavouirteButton.node.off('click');
        this.imageClick.node.on('click', () => {
            this.onClickItem(data);
        });
        this.addToFavouirteButton.node.on('click', () => {
            this.addToFavouirte(data);
        });
    },

    onClickItem(data) {
        // console.log('Item clicked:', data);
        // console.log("GameId", data._id);
    },
    addToFavouirte: function(data){
        // console.log("check click on add to Fav");
        let userData = {
            gameId: data._id,
            type: data.type
        }
        let address = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav;
        ServerCom.httpRequest("POST", address, userData, function(response) {
            console.log("responseresponse", response);
            
          }.bind(this));
    },
});
