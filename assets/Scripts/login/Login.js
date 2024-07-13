
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
    onLoad () {
        if(this.rememberMe){
            this.rememberMe.isChecked = false;
        }   
        this.activeInputField = null; 
        this.setupInputFocusListeners();
        this.setupKeyboardButtonListeners();
        this.disableDefaultKeyboard();
    },

    disableDefaultKeyboard() {
        if (cc.sys.isMobile && cc.sys.isBrowser) {
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.pointerEvents = 'none'; // Disable interactions
            });
        }
    },

    setupInputFocusListeners() {
        if (cc.sys.isMobile && cc.sys.isBrowser) {
            // Attach focus event listeners to username and password input fields
            if (this.userName) {
                this.userName.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
            }
            if (this.password) {
                this.password.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
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

    setupKeyboardButtonListeners() {
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
    
    //logoutButton Clicked
    logutClick(){
        if(this.lobbyNode.active){
            this.lobbyNode.active = false;
        }
    },

    removeFromActiveInput() {
        if (this.activeInputField && this.activeInputField.string.length > 0) {
            this.activeInputField.string = this.activeInputField.string.slice(0, -1); // Remove last character
        }
    },

    onLoginClick (){
        this.userName.string = "ritik";
        this.password.string = "password";
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
               
            }
            
        }.bind(this));

    },

    smallAlphabetBUttonClicked: function(){
        if(this.capitalAlphabet.active ){
            this.capitalAlphabet.active = false;
            this.smallAlphabet.active = true;
            if(this.symbolsAlphabet.active){
                this.symbolsAlphabet.active = false;
            }
            this.smallButton.active = false;
            this.capsButton.active = true;
        }else{
            if(this.symbolsAlphabet.active){
                this.symbolsAlphabet.active = false;
            }
            this.capitalAlphabet.active = true;
            this.smallAlphabet.active = false;
            this.smallButton.active = true;
            this.capsButton.active = false;
        }
    },
    
    specialSymbolClicked: function(){
        if(this.capitalAlphabet.active || this.smallAlphabet.active){
            this.smallAlphabet.active = false;
            this.capitalAlphabet.active = false;
            this.symbolsAlphabet.active = true;
        }
        else{
            this.symbolsAlphabet.active = false;
            if(!this.smallAlphabet.active){
                this.smallAlphabet.active = true;
                this.capitalAlphabet.active = false;
            }
        }
    },

    closeKeyBoard: function(){
        this.customKeyboard.active = false;
    }
   
});