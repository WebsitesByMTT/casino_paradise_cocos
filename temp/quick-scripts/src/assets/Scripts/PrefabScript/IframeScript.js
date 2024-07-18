"use strict";
cc._RF.push(module, '45dadaxrkFEtqCXIL45wNwz', 'IframeScript');
// Scripts/PrefabScript/IframeScript.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    webView: cc.WebView
  },
  onload: function onload() {},
  updateView: function updateView(data) {
    //    console.log("URL", data, "this", this);
    this.webView.url = data.url;
    this.webView.active = true;
  }
});

cc._RF.pop();