
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/EditBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0VkaXRCb3guanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJlZGl0Qm94IiwiRWRpdEJveCIsIm9uTG9hZCIsImlzTW9iaWxlIiwibm9kZSIsIm9uIiwib25FZGl0Qm94Rm9jdXMiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImJsdXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVKLEVBQUUsQ0FBQ0s7QUFESixHQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0k7QUFDTCxRQUFJLEtBQUtDLFFBQUwsRUFBSixFQUFxQjtBQUNqQixXQUFLSCxPQUFMLENBQWFJLElBQWIsQ0FBa0JDLEVBQWxCLENBQXFCLG1CQUFyQixFQUEwQyxLQUFLQyxjQUEvQyxFQUErRCxJQUEvRDtBQUNBLFdBQUtOLE9BQUwsQ0FBYUksSUFBYixDQUFrQkMsRUFBbEIsQ0FBcUIsWUFBckIsRUFBbUMsS0FBS0MsY0FBeEMsRUFBd0QsSUFBeEQ7QUFDSDtBQUNKLEdBWkk7QUFjTEgsRUFBQUEsUUFkSyxzQkFjTTtBQUNQLFdBQU8sNEJBQTRCSSxJQUE1QixDQUFpQ0MsU0FBUyxDQUFDQyxTQUEzQyxDQUFQO0FBQ0gsR0FoQkk7QUFrQkxILEVBQUFBLGNBbEJLLDBCQWtCVUksS0FsQlYsRUFrQmlCO0FBQ2xCO0FBQ0FBLElBQUFBLEtBQUssQ0FBQ0MsY0FBTixHQUZrQixDQUdsQjs7QUFDQSxTQUFLWCxPQUFMLENBQWFZLElBQWI7QUFDSDtBQXZCSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBlZGl0Qm94OiBjYy5FZGl0Qm94XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUoKSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0Qm94Lm5vZGUub24oJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcy5vbkVkaXRCb3hGb2N1cywgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVkaXRCb3gubm9kZS5vbigndG91Y2hzdGFydCcsIHRoaXMub25FZGl0Qm94Rm9jdXMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzTW9iaWxlKCkge1xuICAgICAgICByZXR1cm4gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgfSxcblxuICAgIG9uRWRpdEJveEZvY3VzKGV2ZW50KSB7XG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIChzaG93aW5nIHRoZSB2aXJ0dWFsIGtleWJvYXJkKVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBCbHVyIHRoZSBlZGl0IGJveCB0byBoaWRlIHRoZSB2aXJ0dWFsIGtleWJvYXJkXG4gICAgICAgIHRoaXMuZWRpdEJveC5ibHVyKCk7XG4gICAgfVxufSk7XG4iXX0=