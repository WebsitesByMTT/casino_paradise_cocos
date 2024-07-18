"use strict";
cc._RF.push(module, '53322cCKMhM5q2Q5w/kuQHj', 'EditBox');
// Scripts/EditBox.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    editBox: cc.EditBox
  },
  onLoad: function onLoad() {
    if (this.isMobile()) {
      this.editBox.node.on('editing-did-began', this.onEditBoxFocus, this);
      this.editBox.node.on('touchstart', this.onEditBoxFocus, this);
    }
  },
  isMobile: function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  },
  onEditBoxFocus: function onEditBoxFocus(event) {
    // Prevent the default action (showing the virtual keyboard)
    event.preventDefault(); // Blur the edit box to hide the virtual keyboard

    this.editBox.blur();
  }
});

cc._RF.pop();