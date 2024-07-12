
cc.Class({
    extends: cc.Component,

    properties: {

        userName: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        rememberMe: {
            default: null,
            type: cc.Toggle
        },
        lobbyNode:{
            default: null,
            type: cc.Node,
        },
        errorLable:{
            default: null,
            type:cc.Label
        },
        loginErrorNode:{
            default: null,
            type: cc.Node
        },
        
    
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        if(this.rememberMe){
            this.rememberMe.isChecked = false;
        }
       
    },
    logutClick(){
        if(this.lobbyNode.active){
            this.lobbyNode.active = false;
        }
    },

    onLoginClick (){
        var address = K.ServerAddress.ipAddress + K.ServerAPI.login;
        var data = {
            username: this.userName.string,
            password: this.password.string
        };
        if(this.userName.string == "" || this.password.string == ""){
            this.errorLable.string = "Username or Password fields are empty"
            this.loginErrorNode.active = true;
            setTimeout(() => {
                this.loginErrorNode.active = false;
            }, 2000);
            
            return
        }
        ServerCom.httpRequest("POST", address, data, function (response) {
            if (response.token) {
                console.log("token on login", response.token);
                const randomNumber = Math.floor(Math.random() * 10) + 1;
                if (cc.sys.isBrowser) {
                    document.cookie = `userToken=${response.token}; path=/;`;
                    document.cookie = `index = ${randomNumber}`
                } else {
                    cc.sys.localStorage.setItem('userToken', response.token);
                    cc.sys.localStorage.setItem("index", randomNumber); 
                }
                // Cookies.set("index", randomNumber);
                setTimeout(function () {
                    this.lobbyNode.active = true;
                }.bind(this), 1000);
            }
            else{
                console.log("response of user not found on login page", response);
            }
            
        }.bind(this));

    },
});