
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
    //    console.log("URL", data, "this", this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1ByZWZhYlNjcmlwdC9JZnJhbWVTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ3ZWJWaWV3IiwiV2ViVmlldyIsIm9ubG9hZCIsInVwZGF0ZVZpZXciLCJkYXRhIiwidXJsIiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFSixFQUFFLENBQUNLO0FBREosR0FIUDtBQU9MQyxFQUFBQSxNQVBLLG9CQU9HLENBRVAsQ0FUSTtBQVdMQyxFQUFBQSxVQVhLLHNCQVdNQyxJQVhOLEVBV1k7QUFDakI7QUFDRyxTQUFLSixPQUFMLENBQWFLLEdBQWIsR0FBbUJELElBQUksQ0FBQ0MsR0FBeEI7QUFDQSxTQUFLTCxPQUFMLENBQWFNLE1BQWIsR0FBc0IsSUFBdEI7QUFDRjtBQWZJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHdlYlZpZXc6IGNjLldlYlZpZXcsIFxuICAgIH0sXG5cbiAgICBvbmxvYWQoKXtcbiAgICAgICBcbiAgICB9LFxuXG4gICAgdXBkYXRlVmlldyhkYXRhKSB7XG4gICAgLy8gICAgY29uc29sZS5sb2coXCJVUkxcIiwgZGF0YSwgXCJ0aGlzXCIsIHRoaXMpO1xuICAgICAgIHRoaXMud2ViVmlldy51cmwgPSBkYXRhLnVybFxuICAgICAgIHRoaXMud2ViVmlldy5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbn0pO1xuIl19