/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'jquery', 'utils/localStorage', 'services/mbe', 'data/appVariables', 'utils/dateUtil'],
    function (oj, $, localStorage, mbe, appVar) {
        function wsCallModule() {
            var self = this;
            var getTranslation = oj.Translations.getResource;
            var testID = "01707397";

            // get visits
            self.mcsAuth = function (username, pass) {
                console.log(username, pass);
                var deferred = $.Deferred();
                var loginSuccess = function (response, data) {
                    //    console.log(response);
                    console.log("Login Successfully!");
                    mbe.isLoggedIn(true);
                    deferred.resolve(response, data);
                };

                var loginFailure = function (statusCode, data) {
                    mbe.isLoggedIn(true);
                    // alert("Login failed! statusCode:" + statusCode + " Message: " + JSON.stringify(data));
                    deferred.reject(statusCode, data);
                    // alert("error! Using dummy data instead!");
                };
                mbe.authenticate(username, pass).then(loginSuccess, loginFailure);
                return deferred.promise();
            };

            // get visits
            self.facebookAuth = function () {
                var deferred = $.Deferred();
                var loginSuccess = function (response, data) {
                    //    console.log(response);
                    console.log("Login Successfully!");
                    mbe.isLoggedIn(true);
                    deferred.resolve(response, data);
                };

                var loginFailure = function (statusCode, data) {
                    mbe.isLoggedIn(true);
                    // alert("Login failed! statusCode:" + statusCode + " Message: " + JSON.stringify(data));
                    deferred.reject(statusCode, data);
                    // alert("error! Using dummy data instead!");
                };

                mbe.facebookAuthorization().then(loginSuccess, loginFailure);

                return deferred.promise();
            };


        }

        return new wsCallModule();
    }
);
