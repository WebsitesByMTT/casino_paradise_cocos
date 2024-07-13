
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Config/GameConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8da19Kpt7FCnoycSPF3SsWw', 'GameConfig');
// Scripts/Config/GameConfig.js

"use strict";

/**
 * @namespace Configs
 */

/**
 * @class GameConfig
 * @memberof Configs
 */

/** 
 * @alias window
 * @name root
 * @memberof Configs.GameConfig#
 */
var root = window;
root.K = {};
root.K.internetAvailable = true;
/**
 * @enum {Number} Represents possible errors in the game
 * @name Error
 * @memberof Configs.GameConfig#
 */

root.K.Error = cc.Enum({
  CredentialsError: 401,
  SuccessFalseError: 404
});
root.K.WS = false;
root.K.DeveloperMode = true;
root.K.ServerAddress = {
  ////// IP and URLS update as per requirements
  ipAddress: "https://dev.casinoparadize.com" // OTL

};
/**
 * @description Server APIs
 * @name ServerAPI
 * @memberof Configs.GameConfig#
 */

root.K.ServerAPI = {
  login: "/api/users/login",
  game: "/api/games?platform=casinoParadise&category",
  addtoFav: "/api/games/favourite",
  password: "/api/users",
  userDetails: "/api/users"
};
/**
 * @description Represents sound effects played on user related events
 * @name Sounds
 * @memberof Configs.GameConfig#
 */

root.K.Sounds = {}; // /**
//  * @description Data that maybe stored on a system
//  * @name SystemStorageKeys
//  * @memberof Configs.GameConfig#
//  */
// root.K.SystemStorageKeys = {
//     userId: "userId",
//     password: "password",
//     rememberMePreference: "rememberMePreference",
// };

module.exports = {
  K: K
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJhZGR0b0ZhdiIsInBhc3N3b3JkIiwidXNlckRldGFpbHMiLCJTb3VuZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsSUFBSSxHQUFHQyxNQUFYO0FBRUFELElBQUksQ0FBQ0UsQ0FBTCxHQUFTLEVBQVQ7QUFFQUYsSUFBSSxDQUFDRSxDQUFMLENBQU9DLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDRSxDQUFMLENBQU9FLEtBQVAsR0FBZUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBREM7QUFFbkJDLEVBQUFBLGlCQUFpQixFQUFFO0FBRkEsQ0FBUixDQUFmO0FBTUFSLElBQUksQ0FBQ0UsQ0FBTCxDQUFPTyxFQUFQLEdBQVksS0FBWjtBQUVBVCxJQUFJLENBQUNFLENBQUwsQ0FBT1EsYUFBUCxHQUF1QixJQUF2QjtBQUVBVixJQUFJLENBQUNFLENBQUwsQ0FBT1MsYUFBUCxHQUF1QjtBQUNuQjtBQUNBQyxFQUFBQSxTQUFTLEVBQUUsZ0NBRlEsQ0FFMEI7O0FBRjFCLENBQXZCO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVosSUFBSSxDQUFDRSxDQUFMLENBQU9XLFNBQVAsR0FBbUI7QUFDZkMsRUFBQUEsS0FBSyxFQUFFLGtCQURRO0FBRWZDLEVBQUFBLElBQUksRUFBRSw2Q0FGUztBQUdmQyxFQUFBQSxRQUFRLEVBQUUsc0JBSEs7QUFJZkMsRUFBQUEsUUFBUSxFQUFFLFlBSks7QUFLZkMsRUFBQUEsV0FBVyxFQUFFO0FBTEUsQ0FBbkI7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbEIsSUFBSSxDQUFDRSxDQUFMLENBQU9pQixNQUFQLEdBQWdCLEVBQWhCLEVBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNibkIsRUFBQUEsQ0FBQyxFQUFFQTtBQURVLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBuYW1lc3BhY2UgQ29uZmlnc1xuICovXG5cbi8qKlxuICogQGNsYXNzIEdhbWVDb25maWdcbiAqIEBtZW1iZXJvZiBDb25maWdzXG4gKi9cblxuLyoqIFxuICogQGFsaWFzIHdpbmRvd1xuICogQG5hbWUgcm9vdFxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xudmFyIHJvb3QgPSB3aW5kb3c7XG5cbnJvb3QuSyA9IHt9O1xuXG5yb290LksuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xuLyoqXG4gKiBAZW51bSB7TnVtYmVyfSBSZXByZXNlbnRzIHBvc3NpYmxlIGVycm9ycyBpbiB0aGUgZ2FtZVxuICogQG5hbWUgRXJyb3JcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnJvb3QuSy5FcnJvciA9IGNjLkVudW0oe1xuICAgIENyZWRlbnRpYWxzRXJyb3I6IDQwMSxcbiAgICBTdWNjZXNzRmFsc2VFcnJvcjogNDA0LFxufSk7XG5cblxucm9vdC5LLldTID0gZmFsc2U7XG5cbnJvb3QuSy5EZXZlbG9wZXJNb2RlID0gdHJ1ZTtcblxucm9vdC5LLlNlcnZlckFkZHJlc3MgPSB7XG4gICAgLy8vLy8vIElQIGFuZCBVUkxTIHVwZGF0ZSBhcyBwZXIgcmVxdWlyZW1lbnRzXG4gICAgaXBBZGRyZXNzOiBcImh0dHBzOi8vZGV2LmNhc2lub3BhcmFkaXplLmNvbVwiLCAvLyBPVExcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFNlcnZlciBBUElzXG4gKiBAbmFtZSBTZXJ2ZXJBUElcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnJvb3QuSy5TZXJ2ZXJBUEkgPSB7XG4gICAgbG9naW46IFwiL2FwaS91c2Vycy9sb2dpblwiLFxuICAgIGdhbWU6IFwiL2FwaS9nYW1lcz9wbGF0Zm9ybT1jYXNpbm9QYXJhZGlzZSZjYXRlZ29yeVwiLFxuICAgIGFkZHRvRmF2OiBcIi9hcGkvZ2FtZXMvZmF2b3VyaXRlXCIsXG4gICAgcGFzc3dvcmQ6IFwiL2FwaS91c2Vyc1wiLFxuICAgIHVzZXJEZXRhaWxzOiBcIi9hcGkvdXNlcnNcIlxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gUmVwcmVzZW50cyBzb3VuZCBlZmZlY3RzIHBsYXllZCBvbiB1c2VyIHJlbGF0ZWQgZXZlbnRzXG4gKiBAbmFtZSBTb3VuZHNcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnJvb3QuSy5Tb3VuZHMgPSB7XG59O1xuXG5cblxuLy8gLyoqXG4vLyAgKiBAZGVzY3JpcHRpb24gRGF0YSB0aGF0IG1heWJlIHN0b3JlZCBvbiBhIHN5c3RlbVxuLy8gICogQG5hbWUgU3lzdGVtU3RvcmFnZUtleXNcbi8vICAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4vLyAgKi9cbi8vIHJvb3QuSy5TeXN0ZW1TdG9yYWdlS2V5cyA9IHtcbi8vICAgICB1c2VySWQ6IFwidXNlcklkXCIsXG4vLyAgICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbi8vICAgICByZW1lbWJlck1lUHJlZmVyZW5jZTogXCJyZW1lbWJlck1lUHJlZmVyZW5jZVwiLFxuLy8gfTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEs6IEssXG59Il19