(function (global) {
  var DemoViewModel,
      app = global.app = global.app || {};

  DemoViewModel = kendo.data.ObservableObject.extend({
    
    getLoginStatus: function () {
      if (!this.checkSimulator()) {
        facebookConnectPlugin.getLoginStatus(function(response) {
          if (response.status === "connected") {
            alert("You are logged in, details:\n\n" + JSON.stringify(response.authResponse));
          } else {
            alert("You are not logged in");
          }
        });
      }
    },

    login: function () {
      if (!this.checkSimulator()) {
        facebookConnectPlugin.login(["email"], function(response) { // do not retrieve the 'user_likes' permissions from FB as it will break the app
          if (response) {
            // contains the 'status' - bool, 'authResponse' - object with 'session_key', 'accessToken', 'expiresIn', 'userID'
            alert("You are: " + response.status + ", details:\n\n" + JSON.stringify(response));
          } else {
            alert("You are not logged in");
          }
        });
      }
    },

    getUserData: function () {
      if (!this.checkSimulator()) {
            var graphPath = "me/?fields=id,email";
            facebookConnectPlugin.api(graphPath, [],
                function(response) {
                    alert(JSON.stringify(response));
                    if (response.error) {
                        alert(JSON.stringify(response.error));
                        return;
                    }
                });
      }
    },

    getNrOfFriends: function () {
      if (!this.checkSimulator()) {
            var graphPath = "/me/friends";
            var permissions = ["user_friends"];
            facebookConnectPlugin.api(graphPath, permissions,
                function(response) {
                    if (response.error) {
                        alert(JSON.stringify(response.error));
                    } else {
                        alert(JSON.stringify(response.summary.total_count + " friends"));
                    }
                });
      }
    },

    logout: function () {
      if (!this.checkSimulator()) {
        facebookConnectPlugin.logout(function(response) {
          alert("You were logged out");
        });
      }
    },

    checkSimulator: function() {
      if (window.navigator.simulator === true) {
        alert('This plugin is not available in the simulator.');
        return true;
      } else if (window.facebookConnectPlugin === undefined) {
        alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
      } else {
        return false;
      }
    }
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);