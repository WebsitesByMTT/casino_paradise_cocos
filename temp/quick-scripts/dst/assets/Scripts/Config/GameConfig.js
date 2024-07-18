
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
  userDetails: "/api/users",
  getGameById: "/api/games"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL0NvbmZpZy9HYW1lQ29uZmlnLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJ3aW5kb3ciLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJFcnJvciIsImNjIiwiRW51bSIsIkNyZWRlbnRpYWxzRXJyb3IiLCJTdWNjZXNzRmFsc2VFcnJvciIsIldTIiwiRGV2ZWxvcGVyTW9kZSIsIlNlcnZlckFkZHJlc3MiLCJpcEFkZHJlc3MiLCJTZXJ2ZXJBUEkiLCJsb2dpbiIsImdhbWUiLCJhZGR0b0ZhdiIsInBhc3N3b3JkIiwidXNlckRldGFpbHMiLCJnZXRHYW1lQnlJZCIsIlNvdW5kcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxJQUFJLEdBQUdDLE1BQVg7QUFFQUQsSUFBSSxDQUFDRSxDQUFMLEdBQVMsRUFBVDtBQUVBRixJQUFJLENBQUNFLENBQUwsQ0FBT0MsaUJBQVAsR0FBMkIsSUFBM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBSCxJQUFJLENBQUNFLENBQUwsQ0FBT0UsS0FBUCxHQUFlQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNuQkMsRUFBQUEsZ0JBQWdCLEVBQUUsR0FEQztBQUVuQkMsRUFBQUEsaUJBQWlCLEVBQUU7QUFGQSxDQUFSLENBQWY7QUFNQVIsSUFBSSxDQUFDRSxDQUFMLENBQU9PLEVBQVAsR0FBWSxLQUFaO0FBRUFULElBQUksQ0FBQ0UsQ0FBTCxDQUFPUSxhQUFQLEdBQXVCLElBQXZCO0FBRUFWLElBQUksQ0FBQ0UsQ0FBTCxDQUFPUyxhQUFQLEdBQXVCO0FBQ25CO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxnQ0FGUSxDQUUwQjs7QUFGMUIsQ0FBdkI7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBWixJQUFJLENBQUNFLENBQUwsQ0FBT1csU0FBUCxHQUFtQjtBQUNmQyxFQUFBQSxLQUFLLEVBQUUsa0JBRFE7QUFFZkMsRUFBQUEsSUFBSSxFQUFFLDZDQUZTO0FBR2ZDLEVBQUFBLFFBQVEsRUFBRSxzQkFISztBQUlmQyxFQUFBQSxRQUFRLEVBQUUsWUFKSztBQUtmQyxFQUFBQSxXQUFXLEVBQUUsWUFMRTtBQU1mQyxFQUFBQSxXQUFXLEVBQUU7QUFORSxDQUFuQjtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FuQixJQUFJLENBQUNFLENBQUwsQ0FBT2tCLE1BQVAsR0FBZ0IsRUFBaEIsRUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JwQixFQUFBQSxDQUFDLEVBQUVBO0FBRFUsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG5hbWVzcGFjZSBDb25maWdzXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgR2FtZUNvbmZpZ1xuICogQG1lbWJlcm9mIENvbmZpZ3NcbiAqL1xuXG4vKiogXG4gKiBAYWxpYXMgd2luZG93XG4gKiBAbmFtZSByb290XG4gKiBAbWVtYmVyb2YgQ29uZmlncy5HYW1lQ29uZmlnI1xuICovXG52YXIgcm9vdCA9IHdpbmRvdztcblxucm9vdC5LID0ge307XG5cbnJvb3QuSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XG4vKipcbiAqIEBlbnVtIHtOdW1iZXJ9IFJlcHJlc2VudHMgcG9zc2libGUgZXJyb3JzIGluIHRoZSBnYW1lXG4gKiBAbmFtZSBFcnJvclxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xucm9vdC5LLkVycm9yID0gY2MuRW51bSh7XG4gICAgQ3JlZGVudGlhbHNFcnJvcjogNDAxLFxuICAgIFN1Y2Nlc3NGYWxzZUVycm9yOiA0MDQsXG59KTtcblxuXG5yb290LksuV1MgPSBmYWxzZTtcblxucm9vdC5LLkRldmVsb3Blck1vZGUgPSB0cnVlO1xuXG5yb290LksuU2VydmVyQWRkcmVzcyA9IHtcbiAgICAvLy8vLy8gSVAgYW5kIFVSTFMgdXBkYXRlIGFzIHBlciByZXF1aXJlbWVudHNcbiAgICBpcEFkZHJlc3M6IFwiaHR0cHM6Ly9kZXYuY2FzaW5vcGFyYWRpemUuY29tXCIsIC8vIE9UTFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gU2VydmVyIEFQSXNcbiAqIEBuYW1lIFNlcnZlckFQSVxuICogQG1lbWJlcm9mIENvbmZpZ3MuR2FtZUNvbmZpZyNcbiAqL1xucm9vdC5LLlNlcnZlckFQSSA9IHtcbiAgICBsb2dpbjogXCIvYXBpL3VzZXJzL2xvZ2luXCIsXG4gICAgZ2FtZTogXCIvYXBpL2dhbWVzP3BsYXRmb3JtPWNhc2lub1BhcmFkaXNlJmNhdGVnb3J5XCIsXG4gICAgYWRkdG9GYXY6IFwiL2FwaS9nYW1lcy9mYXZvdXJpdGVcIixcbiAgICBwYXNzd29yZDogXCIvYXBpL3VzZXJzXCIsXG4gICAgdXNlckRldGFpbHM6IFwiL2FwaS91c2Vyc1wiLFxuICAgIGdldEdhbWVCeUlkOiBcIi9hcGkvZ2FtZXNcIlxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gUmVwcmVzZW50cyBzb3VuZCBlZmZlY3RzIHBsYXllZCBvbiB1c2VyIHJlbGF0ZWQgZXZlbnRzXG4gKiBAbmFtZSBTb3VuZHNcbiAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4gKi9cbnJvb3QuSy5Tb3VuZHMgPSB7XG59O1xuXG5cblxuLy8gLyoqXG4vLyAgKiBAZGVzY3JpcHRpb24gRGF0YSB0aGF0IG1heWJlIHN0b3JlZCBvbiBhIHN5c3RlbVxuLy8gICogQG5hbWUgU3lzdGVtU3RvcmFnZUtleXNcbi8vICAqIEBtZW1iZXJvZiBDb25maWdzLkdhbWVDb25maWcjXG4vLyAgKi9cbi8vIHJvb3QuSy5TeXN0ZW1TdG9yYWdlS2V5cyA9IHtcbi8vICAgICB1c2VySWQ6IFwidXNlcklkXCIsXG4vLyAgICAgcGFzc3dvcmQ6IFwicGFzc3dvcmRcIixcbi8vICAgICByZW1lbWJlck1lUHJlZmVyZW5jZTogXCJyZW1lbWJlck1lUHJlZmVyZW5jZVwiLFxuLy8gfTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEs6IEssXG59Il19