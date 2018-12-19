/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
    {
        baseUrl: 'js',

        // Path mappings for the logical module names
        // Update the main-release-paths.json for release mode when updating the mappings
        paths:
        //injector:mainReleasePaths
            {
                'knockout': 'libs/knockout/knockout-3.4.0.debug',
                'jquery': 'libs/jquery/jquery-3.1.1',
                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
                'promise': 'libs/es6-promise/es6-promise',
                'hammerjs': 'libs/hammer/hammer-2.0.8',
                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
                'ojs': 'libs/oj/v4.1.0/debug',
                'ojL10n': 'libs/oj/v4.1.0/ojL10n',
                'ojtranslations': 'libs/oj/v4.1.0/resources',
                'text': 'libs/require/text',
                'signals': 'libs/js-signals/signals',
                'customElements': 'libs/webcomponents/custom-elements.min',
                'proj4': 'libs/proj4js/dist/proj4-src',
                'css': 'libs/require-css/css',
            }
        //endinjector
        ,
        // Shim configurations for modules that do not expose AMD
        shim:
            {
                'jquery':
                    {
                        exports: ['jQuery', '$']
                    }
            }
    }
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'data/appVariables', 'viewModels/dashboard'  ,'ojs/ojknockout', 'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist'],
    function (oj, ko, app,appVar, dash) { // this callback gets executed when all required modules are loaded

        // self.isLoading = ko.observable(false);
        $(function () {

            function init() {

                self.logout = function () {
                    if (confirm("logout ?")) {
                        var logoutBrowser = cordova.InAppBrowser.open('https://idcs-0bc004ec4ded45978582d9fe03e10190.identity.oraclecloud.com/sso/v1/user/logout', '_blank', 'location=false', {
                            clearsessioncache: false,
                            clearcache: false
                        });
                        logoutBrowser.addEventListener("loadstop", function (url) {
                            console.log('url is' + JSON.stringify(url));
                            if (url.url.startsWith('https://aaoacintd-aahkinfra.analytics.ocp.oraclecloud.com/dv/ui')) {
                                logoutBrowser.close();
                                logoutBrowser = null;

                                setTimeout(function () {
                                    oj.Router.rootInstance.go('dashboard');
                                }, 3000);
                            }
                        });
                    }
                };


                self.goSettings = function () {
                    oj.Router.rootInstance.go('settings');
                };


                oj.Router.sync().then(
                    function () {

                        // Bind your ViewModel for the content of the whole page body.
                        ko.applyBindings(app, document.getElementById('globalBody'));

                        var loginBrowser = cordova.InAppBrowser.open('https://aaoacintd-aahkinfra.analytics.ocp.oraclecloud.com/dv/ui', '_blank', 'location=false', {
                            clearsessioncache: false,
                            clearcache: false
                        });

                        loginBrowser.addEventListener("loadstop", function (url) {
                            console.log('url is' + JSON.stringify(url));
                            if (url.url.startsWith('https://aaoacintd-aahkinfra.analytics.ocp.oraclecloud.com/dv/ui')) {

                                $.ajax({
                                    url: 'https://aaoacintd-aahkinfra.analytics.ocp.oraclecloud.com/dv/ui/api/v1/plugins/embedding/jet/embedding.js',
                                    dataType: "script",
                                    success: function () {
                                        loginBrowser.close();
                                        loginBrowser = null;

                                        setTimeout(function () {
                                            oj.Router.rootInstance.go('dashboard');
                                        }, 3000);
                                    },
                                    function(error) {
                                        oj.Logger.error('Error in root start: ' + error.message);
                                    }
                                });
                            }
                        });

                    },
                    function (error) {
                        app.isLoading(false);
                        oj.Logger.error('Error in root start: ' + error.message);
                    }
                );

            }

            // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
            // event before executing any code that might interact with Cordova APIs or plugins.
            if ($(document.body).hasClass('oj-hybrid')) {
                document.addEventListener("deviceready", init);
            } else {
                init();
            }

        });
    }
);
