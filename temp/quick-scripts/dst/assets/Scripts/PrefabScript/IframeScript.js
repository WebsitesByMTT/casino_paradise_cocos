
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/PrefabScript/IframeScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    console.log("URL", data, "this", this);
    this.webView.url = data.url;
    this.webView.active = true;
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1ByZWZhYlNjcmlwdC9JZnJhbWVTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3ZWJWaWV3IiwiV2ViVmlldyIsIm9ubG9hZCIsInVwZGF0ZVZpZXciLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInVybCIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDSztBQURKLEdBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPRyxDQUVQLENBVEk7QUFXTEMsRUFBQUEsVUFYSyxzQkFXTUMsSUFYTixFQVdZO0FBQ2RDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVosRUFBbUJGLElBQW5CLEVBQXlCLE1BQXpCLEVBQWlDLElBQWpDO0FBQ0EsU0FBS0osT0FBTCxDQUFhTyxHQUFiLEdBQW1CSCxJQUFJLENBQUNHLEdBQXhCO0FBQ0EsU0FBS1AsT0FBTCxDQUFhUSxNQUFiLEdBQXNCLElBQXRCO0FBQ0Y7QUFmSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB3ZWJWaWV3OiBjYy5XZWJWaWV3LCBcbiAgICB9LFxuXG4gICAgb25sb2FkKCl7XG4gICAgICAgXG4gICAgfSxcblxuICAgIHVwZGF0ZVZpZXcoZGF0YSkge1xuICAgICAgIGNvbnNvbGUubG9nKFwiVVJMXCIsIGRhdGEsIFwidGhpc1wiLCB0aGlzKTtcbiAgICAgICB0aGlzLndlYlZpZXcudXJsID0gZGF0YS51cmxcbiAgICAgICB0aGlzLndlYlZpZXcuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG59KTtcbiJdfQ==