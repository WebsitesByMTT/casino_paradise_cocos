
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ServerCom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd275iqnndLToBuUOYxMq3n', 'ServerCom');
// Scripts/ServerCom.js

"use strict";

var Cookies = require('js-cookies'); // const axios = require('./axios/dist/axios');
// const axios = require('axios');


var root = window;
cc.Class({
  "extends": cc.Component,
  properties: {
    loading: {
      "default": null,
      type: cc.Node
    },
    reconnecting: {
      "default": null,
      type: cc.Node
    },
    tracker: {
      "default": {}
    },
    errorLable: {
      "default": null,
      type: cc.Label
    },
    loginErrorNode: {
      "default": null,
      type: cc.Node
    },
    trackerCount: 0,
    timer: 0
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    // Created ServerCom Gloabaly so that we can access it anywhere we want
    root.ServerCom = this;
    this.checkOrientation(); // Add event listener for canvas resize to handle orientation change

    cc.view.on('canvas-resize', this.checkOrientation, this);
  },
  // following function is to check the width and change the orientation(Landscape/Potrait) for mobile or dekstop
  checkOrientation: function checkOrientation() {
    try {
      var winSize = cc.winSize; // Check if the width is greater than the height to determine orientation

      if (winSize.width > winSize.height) {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
      } else {
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      }
    } catch (error) {
      console.error("Error checking orientation:", error);
    }
  },
  clearTracker: function clearTracker() {
    this.trackerCount = 0;
    this.tracker = {};
  },

  /**
   * @method httpPostRequest
   * @description HTTP request - POST data 
   * @param {String} address -address of Server 
   * @param {Object} data -Data/PayLoad to be sent
   * @param {method} callback -Callback to be executed if response.succss is true!
   * @param {method} error -Callback to be executed if response.success is false!
   * @param {Number} timeout -value in milli seconds, Specify request timeout time! 
   * @memberof Utilities.ServerCom#
   */
  httpRequest: function httpRequest(method, address, data, callback, error, timeout) {
    var inst = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout || 1000; // if(!ServerCom.loading.active){
    //     ServerCom.loading.active = true;
    // }

    xhr.onreadystatechange = function () {
      K.internetAvailable = true;

      if (xhr.readyState == 4) {
        ServerCom.loading.active = false;
        var response = xhr.responseText;

        if (xhr.status >= 200 && xhr.status < 400) {
          if (callback !== null && callback !== undefined) {
            var data = JSON.parse(response);
            callback(data);
          }
        } else {
          var errorMsg = "Unknown error";

          try {
            var errorData = JSON.parse(response);

            if (errorData.error) {
              errorMsg = errorData.error;
            }

            console.log("errorDataerrorData", errorData, xhr);
            inst.errorLable.string = errorData.error;
            inst.loginErrorNode.active = true;
            setTimeout(function () {
              inst.loginErrorNode.active = false;
            }, 2000); // callback(errorData);
          } catch (e) {
            console.error("Error parsing error response:", e);
          }
        }
      }
    };

    xhr.onerror = function (err) {
      ServerCom.loading.active = false;
      K.internetAvailable = false;
      var errorMsg = "Unknown error";

      try {
        var errorData = JSON.parse(xhr.responseText);

        if (errorData.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }
    };

    xhr.ontimeout = function () {
      ServerCom.loading.active = false;
      K.disconnectRequestedByPlayer = false;
      K.internetAvailable = false; // 

      inst.errorLable.string = "Timeout " + address, inst.loginErrorNode.active = true;
      setTimeout(function () {
        inst.loginErrorNode.active = false;
      }, 2000); // inst.emit('error', {
      //     code: K.Error.TimeOutError,
      //     response: "Timeout " + address,
      // });
    }; // 
    // xhr.withCredentials = true;


    xhr.open(method, address, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var token = null;

    if (!token && cc.sys.isBrowser) {
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith('token=')) {
          token = cookie.substring('token='.length, cookie.length);
          break;
        }
      }
    } // If token exists, add it to a custom header


    if (token) {
      xhr.setRequestHeader("Cookie", "userToken=" + token);
    }

    if (method === "POST" || method === "PUT") {
      // console.log(data, " befor psot method");
      // let newdata = JSON.stringify(data);
      // console.log(newdata);
      xhr.send(JSON.stringify(data));
    } else if (method === "GET") {
      xhr.send();
    }
  } // WILL use the following code later to check if the same api is request untill we gets its response
  // /**
  // updateTracker: function (val, key, showLoading) {
  //     var incr = val ? +1 : -1;
  //     this.trackerCount = this.trackerCount + incr;
  //     var isActive = val && showLoading;
  //     if(!this.loading.active && showLoading){
  //         this.loading.active = true; 
  //     }else if(this.loading.active && !showLoading) {
  //         this.loading.active = false;
  //     }
  //     //this.loading.active = val && showLoading;
  //     this.tracker[key] = val;
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJDb29raWVzIiwicmVxdWlyZSIsInJvb3QiLCJ3aW5kb3ciLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxvYWRpbmciLCJ0eXBlIiwiTm9kZSIsInJlY29ubmVjdGluZyIsInRyYWNrZXIiLCJlcnJvckxhYmxlIiwiTGFiZWwiLCJsb2dpbkVycm9yTm9kZSIsInRyYWNrZXJDb3VudCIsInRpbWVyIiwib25Mb2FkIiwiU2VydmVyQ29tIiwiY2hlY2tPcmllbnRhdGlvbiIsInZpZXciLCJvbiIsIndpblNpemUiLCJ3aWR0aCIsImhlaWdodCIsInNldE9yaWVudGF0aW9uIiwibWFjcm8iLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJPUklFTlRBVElPTl9QT1JUUkFJVCIsImVycm9yIiwiY29uc29sZSIsImNsZWFyVHJhY2tlciIsImh0dHBSZXF1ZXN0IiwibWV0aG9kIiwiYWRkcmVzcyIsImRhdGEiLCJjYWxsYmFjayIsInRpbWVvdXQiLCJpbnN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJLIiwiaW50ZXJuZXRBdmFpbGFibGUiLCJyZWFkeVN0YXRlIiwiYWN0aXZlIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJzdGF0dXMiLCJ1bmRlZmluZWQiLCJKU09OIiwicGFyc2UiLCJlcnJvck1zZyIsImVycm9yRGF0YSIsImxvZyIsInN0cmluZyIsInNldFRpbWVvdXQiLCJlIiwib25lcnJvciIsImVyciIsIm9udGltZW91dCIsImRpc2Nvbm5lY3RSZXF1ZXN0ZWRCeVBsYXllciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwidG9rZW4iLCJzeXMiLCJpc0Jyb3dzZXIiLCJjb29raWVzIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJ0cmltIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIs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QWYsRUFBc0I7QUFDekJNLE1BQUFBLEdBQUcsQ0FBQ3FDLElBQUo7QUFDSDtBQUNKLEdBaEtJLENBcUtMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBbExLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENvb2tpZXMgPSByZXF1aXJlKCdqcy1jb29raWVzJyk7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoJy4vYXhpb3MvZGlzdC9heGlvcycpO1xuLy8gY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuXG52YXIgcm9vdCA9IHdpbmRvdztcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVjb25uZWN0aW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2tlcjoge1xuICAgICAgICAgICAgZGVmYXVsdDoge30sXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTGFibGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbG9naW5FcnJvck5vZGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2tlckNvdW50OiAwLFxuICAgICAgICB0aW1lciA6IDAsXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIENyZWF0ZWQgU2VydmVyQ29tIEdsb2FiYWx5IHNvIHRoYXQgd2UgY2FuIGFjY2VzcyBpdCBhbnl3aGVyZSB3ZSB3YW50XG4gICAgICAgIHJvb3QuU2VydmVyQ29tID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgY2FudmFzIHJlc2l6ZSB0byBoYW5kbGUgb3JpZW50YXRpb24gY2hhbmdlXG4gICAgICAgIGNjLnZpZXcub24oJ2NhbnZhcy1yZXNpemUnLCB0aGlzLmNoZWNrT3JpZW50YXRpb24sIHRoaXMpO1xuICAgIH0sXG4gICAgLy8gZm9sbG93aW5nIGZ1bmN0aW9uIGlzIHRvIGNoZWNrIHRoZSB3aWR0aCBhbmQgY2hhbmdlIHRoZSBvcmllbnRhdGlvbihMYW5kc2NhcGUvUG90cmFpdCkgZm9yIG1vYmlsZSBvciBkZWtzdG9wXG4gICAgY2hlY2tPcmllbnRhdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB3aW5TaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB3aWR0aCBpcyBncmVhdGVyIHRoYW4gdGhlIGhlaWdodCB0byBkZXRlcm1pbmUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGlmICh3aW5TaXplLndpZHRoID4gd2luU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNoZWNraW5nIG9yaWVudGF0aW9uOlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyVHJhY2tlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy50cmFja2VyQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnRyYWNrZXIgPSB7fTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBodHRwUG9zdFJlcXVlc3RcbiAgICAgKiBAZGVzY3JpcHRpb24gSFRUUCByZXF1ZXN0IC0gUE9TVCBkYXRhIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIC1hZGRyZXNzIG9mIFNlcnZlciBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtRGF0YS9QYXlMb2FkIHRvIGJlIHNlbnRcbiAgICAgKiBAcGFyYW0ge21ldGhvZH0gY2FsbGJhY2sgLUNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIGlmIHJlc3BvbnNlLnN1Y2NzcyBpcyB0cnVlIVxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBlcnJvciAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY2VzcyBpcyBmYWxzZSFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtdmFsdWUgaW4gbWlsbGkgc2Vjb25kcywgU3BlY2lmeSByZXF1ZXN0IHRpbWVvdXQgdGltZSEgXG4gICAgICogQG1lbWJlcm9mIFV0aWxpdGllcy5TZXJ2ZXJDb20jXG4gICAgICovXG5cbiBcbiAgICBodHRwUmVxdWVzdDogZnVuY3Rpb24gKG1ldGhvZCwgYWRkcmVzcywgZGF0YSwgY2FsbGJhY2ssIGVycm9yLCB0aW1lb3V0KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW5zdCA9IHRoaXM7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLnRpbWVvdXQgPSB0aW1lb3V0IHx8IDEwMDA7XG4gICAgICAgIC8vIGlmKCFTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUpe1xuICAgICAgICAvLyAgICAgU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gfVxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgSy5pbnRlcm5ldEF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsICYmIGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGVycm9yRGF0YS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JEYXRhZXJyb3JEYXRhXCIsIGVycm9yRGF0YSwgeGhyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuZXJyb3JMYWJsZS5zdHJpbmcgPSBlcnJvckRhdGEuZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3QubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKGVycm9yRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGVycm9yIHJlc3BvbnNlOlwiLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSBmYWxzZTtcbiAgICBcbiAgICAgICAgICAgIHZhciBlcnJvck1zZyA9IFwiVW5rbm93biBlcnJvclwiO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gZXJyb3JEYXRhLmVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBlcnJvciByZXNwb25zZTpcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIEsuZGlzY29ubmVjdFJlcXVlc3RlZEJ5UGxheWVyID0gZmFsc2U7XG4gICAgICAgICAgICBLLmludGVybmV0QXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBcbiAgICAgICAgICAgIGluc3QuZXJyb3JMYWJsZS5zdHJpbmcgPSBcIlRpbWVvdXQgXCIgKyBhZGRyZXNzLFxuICAgICAgICAgICAgaW5zdC5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5zdC5sb2dpbkVycm9yTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgLy8gaW5zdC5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICAgIC8vICAgICBjb2RlOiBLLkVycm9yLlRpbWVPdXRFcnJvcixcbiAgICAgICAgICAgIC8vICAgICByZXNwb25zZTogXCJUaW1lb3V0IFwiICsgYWRkcmVzcyxcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBcbiAgICAgICAgLy8geGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCwgYWRkcmVzcywgdHJ1ZSk7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcbiAgICAgICAgaWYgKCF0b2tlbiAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZiAoY29va2llLnN0YXJ0c1dpdGgoJ3Rva2VuPScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gY29va2llLnN1YnN0cmluZygndG9rZW49Jy5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdG9rZW4gZXhpc3RzLCBhZGQgaXQgdG8gYSBjdXN0b20gaGVhZGVyXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb29raWVcIiwgYHVzZXJUb2tlbj0ke3Rva2VufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiIHx8IG1ldGhvZCA9PT0gXCJQVVRcIikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSwgXCIgYmVmb3IgcHNvdCBtZXRob2RcIik7XG4gICAgICAgICAgICAvLyBsZXQgbmV3ZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3ZGF0YSk7XG4gICAgICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG5cbiAgICBcbiAgICAvLyBXSUxMIHVzZSB0aGUgZm9sbG93aW5nIGNvZGUgbGF0ZXIgdG8gY2hlY2sgaWYgdGhlIHNhbWUgYXBpIGlzIHJlcXVlc3QgdW50aWxsIHdlIGdldHMgaXRzIHJlc3BvbnNlXG4gICAgLy8gLyoqXG4gICAgLy8gdXBkYXRlVHJhY2tlcjogZnVuY3Rpb24gKHZhbCwga2V5LCBzaG93TG9hZGluZykge1xuICAgIC8vICAgICB2YXIgaW5jciA9IHZhbCA/ICsxIDogLTE7XG4gICAgLy8gICAgIHRoaXMudHJhY2tlckNvdW50ID0gdGhpcy50cmFja2VyQ291bnQgKyBpbmNyO1xuICAgIC8vICAgICB2YXIgaXNBY3RpdmUgPSB2YWwgJiYgc2hvd0xvYWRpbmc7XG4gICAgLy8gICAgIGlmKCF0aGlzLmxvYWRpbmcuYWN0aXZlICYmIHNob3dMb2FkaW5nKXtcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSB0cnVlOyBcbiAgICAvLyAgICAgfWVsc2UgaWYodGhpcy5sb2FkaW5nLmFjdGl2ZSAmJiAhc2hvd0xvYWRpbmcpIHtcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvL3RoaXMubG9hZGluZy5hY3RpdmUgPSB2YWwgJiYgc2hvd0xvYWRpbmc7XG4gICAgLy8gICAgIHRoaXMudHJhY2tlcltrZXldID0gdmFsO1xuICAgIC8vIH0sXG5cbn0pOyJdfQ==