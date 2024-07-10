
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
  ipAddress: "https://7p68wzhv-5000.inc1.devtunnels.ms" // OTL

};
/**
 * @description Server APIs
 * @name ServerAPI
 * @memberof Configs.GameConfig#
 */

root.K.ServerAPI = {
  login: "/api/users/login",
  game: "/api/games/getGames?category",
  addtoFav: "//api/games/favourite",
  password: "/api/users/updateClientPassword/"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJhZGR0b0ZhdiIsInBhc3N3b3JkIiwiU291bmRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLElBQUksR0FBR0MsTUFBWDtBQUVBRCxJQUFJLENBQUNFLENBQUwsR0FBUyxFQUFUO0FBRUFGLElBQUksQ0FBQ0UsQ0FBTCxDQUFPQyxpQkFBUCxHQUEyQixJQUEzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FILElBQUksQ0FBQ0UsQ0FBTCxDQUFPRSxLQUFQLEdBQWVDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ25CQyxFQUFBQSxnQkFBZ0IsRUFBRSxHQURDO0FBRW5CQyxFQUFBQSxpQkFBaUIsRUFBRTtBQUZBLENBQVIsQ0FBZjtBQU1BUixJQUFJLENBQUNFLENBQUwsQ0FBT08sRUFBUCxHQUFZLEtBQVo7QUFFQVQsSUFBSSxDQUFDRSxDQUFMLENBQU9RLGFBQVAsR0FBdUIsSUFBdkI7QUFFQVYsSUFBSSxDQUFDRSxDQUFMLENBQU9TLGFBQVAsR0FBdUI7QUFDbkI7QUFDQUMsRUFBQUEsU0FBUyxFQUFFLDBDQUZRLENBRW9DOztBQUZwQyxDQUF2QjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FaLElBQUksQ0FBQ0UsQ0FBTCxDQUFPVyxTQUFQLEdBQW1CO0FBQ2ZDLEVBQUFBLEtBQUssRUFBRSxrQkFEUTtBQUVmQyxFQUFBQSxJQUFJLEVBQUUsOEJBRlM7QUFHZkMsRUFBQUEsUUFBUSxFQUFFLHVCQUhLO0FBSWZDLEVBQUFBLFFBQVEsRUFBRTtBQUpLLENBQW5CO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWpCLElBQUksQ0FBQ0UsQ0FBTCxDQUFPZ0IsTUFBUCxHQUFnQixFQUFoQixFQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYmxCLEVBQUFBLENBQUMsRUFBRUE7QUFEVSxDQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbmFtZXNwYWNlIENvbmZpZ3NcbiAqL1xuXG4vKipcbiAqIEBjbGFzcyBHYW1lQ29uZmlnXG4gKiBAbWVtYmVyb2YgQ29uZmlnc1xuICovXG5cbi8qKiBcbiAqIEBhbGlhcyB3aW5kb3dcbiAqIEBuYW1lIHJvb3RcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnZhciByb290ID0gd2luZG93O1xuXG5yb290LksgPSB7fTtcblxucm9vdC5LLmludGVybmV0QXZhaWxhYmxlID0gdHJ1ZTtcbi8qKlxuICogQGVudW0ge051bWJlcn0gUmVwcmVzZW50cyBwb3NzaWJsZSBlcnJvcnMgaW4gdGhlIGdhbWVcbiAqIEBuYW1lIEVycm9yXG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG5yb290LksuRXJyb3IgPSBjYy5FbnVtKHtcbiAgICBDcmVkZW50aWFsc0Vycm9yOiA0MDEsXG4gICAgU3VjY2Vzc0ZhbHNlRXJyb3I6IDQwNCxcbn0pO1xuXG5cbnJvb3QuSy5XUyA9IGZhbHNlO1xuXG5yb290LksuRGV2ZWxvcGVyTW9kZSA9IHRydWU7XG5cbnJvb3QuSy5TZXJ2ZXJBZGRyZXNzID0ge1xuICAgIC8vLy8vLyBJUCBhbmQgVVJMUyB1cGRhdGUgYXMgcGVyIHJlcXVpcmVtZW50c1xuICAgIGlwQWRkcmVzczogXCJodHRwczovLzdwNjh3emh2LTUwMDAuaW5jMS5kZXZ0dW5uZWxzLm1zXCIsIC8vIE9UTFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gU2VydmVyIEFQSXNcbiAqIEBuYW1lIFNlcnZlckFQSVxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xucm9vdC5LLlNlcnZlckFQSSA9IHtcbiAgICBsb2dpbjogXCIvYXBpL3VzZXJzL2xvZ2luXCIsXG4gICAgZ2FtZTogXCIvYXBpL2dhbWVzL2dldEdhbWVzP2NhdGVnb3J5XCIsXG4gICAgYWRkdG9GYXY6IFwiLy9hcGkvZ2FtZXMvZmF2b3VyaXRlXCIsXG4gICAgcGFzc3dvcmQ6IFwiL2FwaS91c2Vycy91cGRhdGVDbGllbnRQYXNzd29yZC9cIlxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gUmVwcmVzZW50cyBzb3VuZCBlZmZlY3RzIHBsYXllZCBvbiB1c2VyIHJlbGF0ZWQgZXZlbnRzXG4gKiBAbmFtZSBTb3VuZHNcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnJvb3QuSy5Tb3VuZHMgPSB7XG59O1xuXG5cblxuLy8gLyoqXG4vLyAgKiBAZGVzY3JpcHRpb24gRGF0YSB0aGF0IG1heWJlIHN0b3JlZCBvbiBhIHN5c3RlbVxuLy8gICogQG5hbWUgU3lzdGVtU3RvcmFnZUtleXNcbi8vICAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4vLyAgKi9cbi8vIHJvb3QuSy5TeXN0ZW1TdG9yYWdlS2V5cyA9IHtcbi8vICAgICB1c2VySWQ6IFwidXNlcklkXCIsXG4vLyAgICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbi8vICAgICByZW1lbWJlck1lUHJlZmVyZW5jZTogXCJyZW1lbWJlck1lUHJlZmVyZW5jZVwiLFxuLy8gfTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEs6IEssXG59Il19