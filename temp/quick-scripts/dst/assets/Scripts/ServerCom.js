
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

// const axios = require('axios')
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
    errorHeading: {
      "default": null,
      type: cc.Label
    },
    loaderAnimNode: {
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

    if (cc.sys.isMobile && cc.sys.isBrowser) {
      console.log = function () {};
    }
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
    } catch (error) {// console.error("Error checking orientation:", error);
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
    xhr.timeout = timeout || 8000;

    if (!ServerCom.loading.active) {
      ServerCom.loading.active = true;
      inst.startLoaderAnimation();
    }

    xhr.onreadystatechange = function () {
      K.internetAvailable = true;

      if (xhr.readyState == 4) {
        ServerCom.loading.active = false;
        inst.stopLoaderAnimation();
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
            } // console.log("errorDataerrorData", errorData, xhr);


            inst.errorLable.string = errorData.error ? errorData.error : errorData.message;
            inst.loginErrorNode.active = true;
            setTimeout(function () {
              inst.loginErrorNode.active = false;
            }, 2000); // callback(errorData);
          } catch (e) {// console.log("Error parsing error response:", e);
          }
        }
      }
    };

    xhr.onerror = function (err) {
      ServerCom.loading.active = false;
      inst.stopLoaderAnimation();
      K.internetAvailable = false;
      var errorMsg = "Unknown error";

      try {
        // console.log("xhr on error", xhr);
        var errorData = JSON.parse(xhr.responseText);

        if (errorData.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {// console.error("Error parsing error response:", e);
      }
    };

    xhr.ontimeout = function () {
      ServerCom.loading.active = false;
      inst.stopLoaderAnimation();
      K.disconnectRequestedByPlayer = false;
      K.internetAvailable = false; // 

      inst.errorLable.string = "Something went wrong", inst.loginErrorNode.active = true;
      setTimeout(function () {
        inst.loginErrorNode.active = false;
      }, 2000);
    }; // 
    // xhr.withCredentials = true;


    xhr.open(method, address, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var token = null;

    if (!token && cc.sys.isBrowser) {
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.startsWith('userToken=')) {
          token = cookie.substring('userToken='.length, cookie.length);
          break;
        }
      }
    } else {
      if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os == cc.sys.Os_IOS) {
        // This is an Android device
        console.error("Running on Android and IOS");
        token = cc.sys.localStorage.getItem('userToken');
      }
    } // If token exists, add it to a custom header


    if (token) {
      // console.log(token, "token");
      xhr.setRequestHeader("Authorization", "Bearer " + token); // xhr.setRequestHeader("Cookie", `userToken=${token}`);
    }

    if (method === "POST" || method === "PUT") {
      xhr.send(JSON.stringify(data));
    } else if (method === "GET") {
      xhr.send();
    }
  },
  startLoaderAnimation: function startLoaderAnimation() {
    if (this.loaderAnimNode._tween) {
      this.loaderAnimNode._tween.stop();
    }

    this.loaderAnimNode._tween = cc.tween(this.loaderAnimNode).repeatForever(cc.tween().to(1, {
      angle: -360
    })).start();
  },
  stopLoaderAnimation: function stopLoaderAnimation() {
    if (this.loaderAnimNode._tween) {
      this.loaderAnimNode._tween.stop();

      this.loaderAnimNode.angle = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1NlcnZlckNvbS5qcyJdLCJuYW1lcyI6WyJyb290Iiwid2luZG93IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwidHlwZSIsIk5vZGUiLCJyZWNvbm5lY3RpbmciLCJ0cmFja2VyIiwiZXJyb3JMYWJsZSIsIkxhYmVsIiwibG9naW5FcnJvck5vZGUiLCJlcnJvckhlYWRpbmciLCJsb2FkZXJBbmltTm9kZSIsInRyYWNrZXJDb3VudCIsInRpbWVyIiwib25Mb2FkIiwiU2VydmVyQ29tIiwiY2hlY2tPcmllbnRhdGlvbiIsInZpZXciLCJvbiIsInN5cyIsImlzTW9iaWxlIiwiaXNCcm93c2VyIiwiY29uc29sZSIsImxvZyIsIndpblNpemUiLCJ3aWR0aCIsImhlaWdodCIsInNldE9yaWVudGF0aW9uIiwibWFjcm8iLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJPUklFTlRBVElPTl9QT1JUUkFJVCIsImVycm9yIiwiY2xlYXJUcmFja2VyIiwiaHR0cFJlcXVlc3QiLCJtZXRob2QiLCJhZGRyZXNzIiwiZGF0YSIsImNhbGxiYWNrIiwidGltZW91dCIsImluc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImFjdGl2ZSIsInN0YXJ0TG9hZGVyQW5pbWF0aW9uIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiSyIsImludGVybmV0QXZhaWxhYmxlIiwicmVhZHlTdGF0ZSIsInN0b3BMb2FkZXJBbmltYXRpb24iLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1cyIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImVycm9yTXNnIiwiZXJyb3JEYXRhIiwic3RyaW5nIiwibWVzc2FnZSIsInNldFRpbWVvdXQiLCJlIiwib25lcnJvciIsImVyciIsIm9udGltZW91dCIsImRpc2Nvbm5lY3RSZXF1ZXN0ZWRCeVBsYXllciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwidG9rZW4iLCJjb29raWVzIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJ0cmltIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsIm9zIiwiT1NfQU5EUk9JRCIsIk9zX0lPUyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZW5kIiwic3RyaW5naWZ5IiwiX3R3ZWVuIiwic3RvcCIsInR3ZWVuIiwicmVwZWF0Rm9yZXZlciIsInRvIiwiYW5nbGUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLElBQUksR0FBR0MsTUFBWDtBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSixLQUREO0FBS1JDLElBQUFBLFlBQVksRUFBRTtBQUNWLGlCQUFTLElBREM7QUFFVkYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkMsS0FMTjtBQVNSRSxJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUztBQURKLEtBVEQ7QUFZUkMsSUFBQUEsVUFBVSxFQUFDO0FBQ1AsaUJBQVMsSUFERjtBQUVQSixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1U7QUFGRCxLQVpIO0FBZ0JSQyxJQUFBQSxjQUFjLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhOLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBaEJQO0FBb0JSTSxJQUFBQSxZQUFZLEVBQUM7QUFDVCxpQkFBUyxJQURBO0FBRVRQLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDVTtBQUZBLEtBcEJMO0FBd0JSRyxJQUFBQSxjQUFjLEVBQUM7QUFDWCxpQkFBUyxJQURFO0FBRVhSLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZFLEtBeEJQO0FBNEJSUSxJQUFB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QyxjQUFMLENBQW9CeUUsTUFBeEIsRUFBZ0M7QUFDNUIsV0FBS3pFLGNBQUwsQ0FBb0J5RSxNQUFwQixDQUEyQkMsSUFBM0I7QUFDSDs7QUFDRCxTQUFLMUUsY0FBTCxDQUFvQnlFLE1BQXBCLEdBQTZCdEYsRUFBRSxDQUFDd0YsS0FBSCxDQUFTLEtBQUszRSxjQUFkLEVBQ3hCNEUsYUFEd0IsQ0FDVnpGLEVBQUUsQ0FBQ3dGLEtBQUgsR0FBV0UsRUFBWCxDQUFjLENBQWQsRUFBaUI7QUFBRUMsTUFBQUEsS0FBSyxFQUFFLENBQUM7QUFBVixLQUFqQixDQURVLEVBRXhCQyxLQUZ3QixFQUE3QjtBQUdILEdBeExJO0FBMExMMUMsRUFBQUEsbUJBMUxLLGlDQTBMaUI7QUFDbEIsUUFBSSxLQUFLckMsY0FBTCxDQUFvQnlFLE1BQXhCLEVBQWdDO0FBQzVCLFdBQUt6RSxjQUFMLENBQW9CeUUsTUFBcEIsQ0FBMkJDLElBQTNCOztBQUNBLFdBQUsxRSxjQUFMLENBQW9COEUsS0FBcEIsR0FBNEIsQ0FBNUI7QUFDSDtBQUNKLEdBL0xJLENBb01MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBak5LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxudmFyIHJvb3QgPSB3aW5kb3c7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlY29ubmVjdGluZzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgIH0sXG4gICAgICAgIHRyYWNrZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9LFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckxhYmxlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2luRXJyb3JOb2RlOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9ySGVhZGluZzp7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZGVyQW5pbU5vZGU6e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2tlckNvdW50OiAwLFxuICAgICAgICB0aW1lciA6IDAsXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIENyZWF0ZWQgU2VydmVyQ29tIEdsb2FiYWx5IHNvIHRoYXQgd2UgY2FuIGFjY2VzcyBpdCBhbnl3aGVyZSB3ZSB3YW50XG4gICAgICAgIHJvb3QuU2VydmVyQ29tID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGVja09yaWVudGF0aW9uKCk7XG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgY2FudmFzIHJlc2l6ZSB0byBoYW5kbGUgb3JpZW50YXRpb24gY2hhbmdlXG4gICAgICAgIGNjLnZpZXcub24oJ2NhbnZhcy1yZXNpemUnLCB0aGlzLmNoZWNrT3JpZW50YXRpb24sIHRoaXMpO1xuXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUgJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2cgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBmb2xsb3dpbmcgZnVuY3Rpb24gaXMgdG8gY2hlY2sgdGhlIHdpZHRoIGFuZCBjaGFuZ2UgdGhlIG9yaWVudGF0aW9uKExhbmRzY2FwZS9Qb3RyYWl0KSBmb3IgbW9iaWxlIG9yIGRla3N0b3BcbiAgICBjaGVja09yaWVudGF0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHdpblNpemUgPSBjYy53aW5TaXplO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiB0aGUgaGVpZ2h0IHRvIGRldGVybWluZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgaWYgKHdpblNpemUud2lkdGggPiB3aW5TaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcuc2V0T3JpZW50YXRpb24oY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9QT1JUUkFJVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2hlY2tpbmcgb3JpZW50YXRpb246XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJUcmFja2VyOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnRyYWNrZXJDb3VudCA9IDA7XG4gICAgICAgIHRoaXMudHJhY2tlciA9IHt9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGh0dHBQb3N0UmVxdWVzdFxuICAgICAqIEBkZXNjcmlwdGlvbiBIVFRQIHJlcXVlc3QgLSBQT1NUIGRhdGEgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgLWFkZHJlc3Mgb2YgU2VydmVyIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC1EYXRhL1BheUxvYWQgdG8gYmUgc2VudFxuICAgICAqIEBwYXJhbSB7bWV0aG9kfSBjYWxsYmFjayAtQ2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgaWYgcmVzcG9uc2Uuc3VjY3NzIGlzIHRydWUhXG4gICAgICogQHBhcmFtIHttZXRob2R9IGVycm9yIC1DYWxsYmFjayB0byBiZSBleGVjdXRlZCBpZiByZXNwb25zZS5zdWNjZXNzIGlzIGZhbHNlIVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0IC12YWx1ZSBpbiBtaWxsaSBzZWNvbmRzLCBTcGVjaWZ5IHJlcXVlc3QgdGltZW91dCB0aW1lISBcbiAgICAgKiBAbWVtYmVyb2YgVXRpbGl0aWVzLlNlcnZlckNvbSNcbiAgICAgKi9cblxuICAgIGh0dHBSZXF1ZXN0OiBmdW5jdGlvbiAobWV0aG9kLCBhZGRyZXNzLCBkYXRhLCBjYWxsYmFjaywgZXJyb3IsIHRpbWVvdXQpIHtcbiAgICAgICAgdmFyIGluc3QgPSB0aGlzO1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gdGltZW91dCB8fCA4MDAwO1xuICAgICAgICBpZighU2VydmVyQ29tLmxvYWRpbmcuYWN0aXZlKXtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpbnN0LnN0YXJ0TG9hZGVyQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbnN0LnN0b3BMb2FkZXJBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yTXNnID0gXCJVbmtub3duIGVycm9yXCI7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvckRhdGEuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImVycm9yRGF0YWVycm9yRGF0YVwiLCBlcnJvckRhdGEsIHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmVycm9yTGFibGUuc3RyaW5nID0gZXJyb3JEYXRhLmVycm9yID8gZXJyb3JEYXRhLmVycm9yIDogZXJyb3JEYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0LmxvZ2luRXJyb3JOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayhlcnJvckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVycm9yIHBhcnNpbmcgZXJyb3IgcmVzcG9uc2U6XCIsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIFNlcnZlckNvbS5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdC5zdG9wTG9hZGVyQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBLLmludGVybmV0QXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZXJyb3JNc2cgPSBcIlVua25vd24gZXJyb3JcIjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ4aHIgb24gZXJyb3JcIiwgeGhyKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JEYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JEYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yTXNnID0gZXJyb3JEYXRhLmVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBlcnJvciByZXNwb25zZTpcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTZXJ2ZXJDb20ubG9hZGluZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGluc3Quc3RvcExvYWRlckFuaW1hdGlvbigpO1xuICAgICAgICAgICAgSy5kaXNjb25uZWN0UmVxdWVzdGVkQnlQbGF5ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIEsuaW50ZXJuZXRBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFxuICAgICAgICAgICAgaW5zdC5lcnJvckxhYmxlLnN0cmluZyA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIixcbiAgICAgICAgICAgIGluc3QubG9naW5FcnJvck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGluc3QubG9naW5FcnJvck5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gXG4gICAgICAgIC8vIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICB4aHIub3BlbihtZXRob2QsIGFkZHJlc3MsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIGxldCB0b2tlbiA9IG51bGw7XG4gICAgICAgIGlmICghdG9rZW4gJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvb2tpZS5zdGFydHNXaXRoKCd1c2VyVG9rZW49JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBjb29raWUuc3Vic3RyaW5nKCd1c2VyVG9rZW49Jy5sZW5ndGgsIGNvb2tpZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5Pc19JT1MpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIEFuZHJvaWQgZGV2aWNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJ1bm5pbmcgb24gQW5kcm9pZCBhbmQgSU9TXCIpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVG9rZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0b2tlbiBleGlzdHMsIGFkZCBpdCB0byBhIGN1c3RvbSBoZWFkZXJcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0b2tlbiwgXCJ0b2tlblwiKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcbiAgICAgICAgICAgIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29va2llXCIsIGB1c2VyVG9rZW49JHt0b2tlbn1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0aG9kID09PSBcIlBPU1RcIiB8fCBtZXRob2QgPT09IFwiUFVUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnRMb2FkZXJBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlckFuaW1Ob2RlLl90d2Vlbikge1xuICAgICAgICAgICAgdGhpcy5sb2FkZXJBbmltTm9kZS5fdHdlZW4uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGVyQW5pbU5vZGUuX3R3ZWVuID0gY2MudHdlZW4odGhpcy5sb2FkZXJBbmltTm9kZSlcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkudG8oMSwgeyBhbmdsZTogLTM2MCB9KSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG5cbiAgICBzdG9wTG9hZGVyQW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZXJBbmltTm9kZS5fdHdlZW4pIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyQW5pbU5vZGUuX3R3ZWVuLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyQW5pbU5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIFxuICAgIC8vIFdJTEwgdXNlIHRoZSBmb2xsb3dpbmcgY29kZSBsYXRlciB0byBjaGVjayBpZiB0aGUgc2FtZSBhcGkgaXMgcmVxdWVzdCB1bnRpbGwgd2UgZ2V0cyBpdHMgcmVzcG9uc2VcbiAgICAvLyAvKipcbiAgICAvLyB1cGRhdGVUcmFja2VyOiBmdW5jdGlvbiAodmFsLCBrZXksIHNob3dMb2FkaW5nKSB7XG4gICAgLy8gICAgIHZhciBpbmNyID0gdmFsID8gKzEgOiAtMTtcbiAgICAvLyAgICAgdGhpcy50cmFja2VyQ291bnQgPSB0aGlzLnRyYWNrZXJDb3VudCArIGluY3I7XG4gICAgLy8gICAgIHZhciBpc0FjdGl2ZSA9IHZhbCAmJiBzaG93TG9hZGluZztcbiAgICAvLyAgICAgaWYoIXRoaXMubG9hZGluZy5hY3RpdmUgJiYgc2hvd0xvYWRpbmcpe1xuICAgIC8vICAgICAgICAgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IHRydWU7IFxuICAgIC8vICAgICB9ZWxzZSBpZih0aGlzLmxvYWRpbmcuYWN0aXZlICYmICFzaG93TG9hZGluZykge1xuICAgIC8vICAgICAgICAgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IHZhbCAmJiBzaG93TG9hZGluZztcbiAgICAvLyAgICAgdGhpcy50cmFja2VyW2tleV0gPSB2YWw7XG4gICAgLy8gfSxcblxufSk7Il19