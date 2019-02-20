/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'services/mbe','ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel'],
    function (oj, ko, $, app, mbe) {

        function AboutViewModel() {
            var self = this;

            // Header Config
            self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
            self.pageTitle = ko.observable("Configure");
            self.username = ko.observable("xxxx@email.com");
            self.password = ko.observable("XXXX");
            self.serverURL = ko.observable();
            self.mcsbackend = ko.observable();

            self.pchartValue1 = ko.observable("");
            self.pchartValue2 = ko.observable("");
            self.puserID = ko.observable("stephen.pun@oracle.com");

            self.loadPage = function () {
                var localS = window.localStorage.getItem('serverURL');
                var loUserID = window.localStorage.getItem('ADWuserID');

                if (loUserID !== null) {
                    self.puserID(loUserID);
                } else {
                    window.localStorage.setItem("ADWuserID", 'stephen.pun@oracle.com');
                    self.puserID('stephen.pun@oracle.com');
                }

                if (localS !== null) {
                    self.serverURL(localS);
                } else {
                    window.localStorage.setItem("serverURL", 'https://aaoac2-aahkinfra.analytics.ocp.oraclecloud.com');
                    self.serverURL('https://aaoac2-aahkinfra.analytics.ocp.oraclecloud.com');
                }

                mbe.invokeCustomAPI('notification/userThreshold/' + self.puserID(), 'GET', null, function (resp,data) {
                    console.log(data);
                    self.pchartValue1(data.firstPercent);
                    self.pchartValue2(data.lastPercent);
                }, function (e) {
                    console.log(e);
                });
            }


            self.saveSettings = function () {
                window.localStorage.setItem("serverURL",  self.serverURL());
                var jsonData = {
                    "userId":self.puserID(),
                    "firstPercent":parseInt(self.pchartValue1()),
                    "lastPercent":parseInt(self.pchartValue2())
                }

                mbe.invokeCustomAPI('notification/userThreshold', 'PUT', JSON.stringify(jsonData), function (state,data) {
                    if(data.status == "success"){
                       alert("Saving success");
                        window.localStorage.setItem("ADWuserID", self.puserID());
                        oj.Router.rootInstance.go('dashboard');
                    }
                }, function (e) {
                    console.log('error', e);
                });
            }

            self.goBack = function () {

                oj.Router.rootInstance.go('dashboard');
            }
            // Below are a subse
            // t of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additional available methods.

            /**
             * Optional ViewModel method invoked when this ViewModel is about to be
             * used for the View transition.  The application can put data fetch logic
             * here that can return a Promise which will delay the handleAttached function
             * call below until the Promise is resolved.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
             * the promise is resolved
             */
            self.handleActivated = function (info) {
                // Implement if needed
                self.loadPage();
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
                // Implement if needed
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View.
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function (info) {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new AboutViewModel();
    }
);
