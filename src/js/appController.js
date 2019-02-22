/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'data/appVariables','services/wsCall','services/mbe', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojarraytabledatasource', 'ojs/ojoffcanvas', 'ojs/ojbutton', 'ojs/ojmoduleanimations'],
    function (oj, ko , appVar, ws, mbe) {
        function ControllerViewModel() {
            var self = this;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


            self.appId = ko.observable("com.oraclecorp.aahkinfraNew");
            // if (isAndroid) {
            // } else if (isiOS) {
                self.appId("com.oraclecorp.emea.scc.campus.demo")
            // }
            self.appVersion = ko.observable("1.0.0");
            self.androidSenderId = ko.observable("412589378698");
            self.deviceToken = ko.observable("");


            self.Mcsusername = "raymond.y.leung@oracle.com";
            self.Mcspassword = "comeWel1!";


            self.isLoading = ko.observable(false);
            // Save the theme so we can perform platform specific navigational animations
            var platform = oj.ThemeUtils.getThemeTargetPlatform();

            self.isLoggedIn = ko.observable(true);
            // Router setup
            self.router = oj.Router.rootInstance;
            self.router.configure({
                'browserLogin': {label: 'Login', isDefault: true},
                'about': {label: 'about'},
                'profile': {label: 'Land Transport'},
                'login': {label: 'Login'},
                'dashboard': {label: 'Baggage'},
                'incidents': {label: 'Apron'},
                'settings': {label: 'Settings'},
                'ferry': {label: 'Ferry'},
                'customers': {label: 'Flight'},
                'about': {label: 'config'}
            });

            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

            // Callback function that can return different animations based on application logic.
            function switcherCallback(context) {
                if (platform === 'android')
                    return 'fade';
                return null;
            };

            function mergeConfig(original) {
                return $.extend(true, {}, original, {
                    'animation': oj.ModuleAnimations.switcher(switcherCallback)
                });
            }

            self.moduleConfig = mergeConfig(self.router.moduleConfig);

            // Navigation setup
            var navData = [
                {
                    name: 'Baggage', id: 'dashboard',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash1-icon'
                },
                {
                    name: 'Apron', id: 'incidents',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash2-icon'
                },
                {
                    name: 'Flight', id: 'customers',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash3-icon'
                },
                {
                    name: 'Land Trans', id: 'profile',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash4-icon'
                },
                {
                    name: 'Ferry', id: 'ferry',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash5-icon'
                },
                {
                    name: 'Config', id: 'about',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-setting-n'
                }];

            self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});


            // Drawer setup
            // self.toggleDrawer = function() {
            //   return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
            // }
            // // Add a close listener so we can move focus back to the toggle button when the drawer closes
            // $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

            // Header Setup
            self.getHeaderModel = function () {
                var headerFactory = {
                    createViewModel: function (params, valueAccessor) {
                        var model = {
                            pageTitle: self.router.currentState().label,
                            handleBindingsApplied: function (info) {
                                // Adjust content padding after header bindings have been applied
                                self.adjustContentPadding();
                            }
                        };
                        return Promise.resolve(model);
                    }
                }
                // this.toggleDrawer = self.toggleDrawer;
                return headerFactory;
            }


            // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions.
            // This method should be called whenever your fixed region height may change.  The application
            // can also adjust content paddings with css classes if the fixed region height is not changing between
            // views.
            self.adjustContentPadding = function () {
                var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
                var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
                var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

                if (topElem) {
                    contentElem.style.paddingTop = topElem.offsetHeight + 'px';
                }
                if (bottomElem) {
                    contentElem.style.paddingBottom = bottomElem.offsetHeight + 'px';
                }
                // Add oj-complete marker class to signal that the content area can be unhidden.
                // See the override.css file to see when the content area is hidden.
                contentElem.classList.add('oj-complete');
            }



            self.loginSuccess = function (response) {
                self.registerNotification();
            };

            self.loginFailure = function (statusCode, data) {
                alert("Login failed! statusCode:" + statusCode + " Message: " + JSON.stringify(data));
            };

            ws.mcsAuth(self.Mcsusername,self.Mcspassword).then(self.loginSuccess, self.loginFailure);

            self.registerNotification = function () {
                console.log("Notification register...");

                try {
                    var push = PushNotification.init({
                        android: {
                            senderID: self.androidSenderId()
                        },
                        browser: {
                            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                        },
                        ios: {
                            alert: "true",
                            badge: "true",
                            sound: "true"
                        },
                        windows: {}
                    });

                    push.on('registration', function (data) {
                        console.log(data.registrationId);
                        self.deviceToken(data.registrationId);
                        // self.registrationId(data.registrationId);
                        alert(data.registrationId);
                        try {
                            mbe.registerForNotifications(data.registrationId, self.appId(), self.appVersion(),
                                function (statusCode, headers, data) {
                                    alert("Register device successfully!");
                                }, function (statusCode, data) {
                                    alert("Register device fail!");
                                });
                        } catch (e) {
                            alert("Register device encounter an exceptionL " + e.message
                            );
                        }
                    });

                    push.on('notification', function (data) {
//                        alert(data.message);
                        var tempData = data.message;
                        try {
                            var num = tempData.indexOf('---');
                            var tabName = tempData.substring(0,num);
                            var newM = tempData.substr(num+3);
                            alert(newM);
                            
                            if(tabName.trim().toUpperCase() == "BAGGAGE"){
                            oj.Router.rootInstance.go('dashboard');
                            }else if(tabName.trim().toUpperCase() == "APRON"){
                              oj.Router.rootInstance.go('incidents');
                            }else if(tabName.trim().toUpperCase() == "FLIGHT"){
                              oj.Router.rootInstance.go('customers');
                            }else if(tabName.trim().toUpperCase() == "LANDTRANS"){
                              oj.Router.rootInstance.go('profile');
                            }else if(tabName.trim().toUpperCase() == "FERRY"){
                              oj.Router.rootInstance.go('ferry');
                            }
                            
                        } catch (e) {
                            
                            alert(data.message);
                            console.log("no ID in notification");
                        }
                            

                    });

                    push.on('error', function (e) {
                        alert(e.message, "Error");
                    });
                } catch (e) {
                    alert(e.message, "Error");
                }
            };

            self.deregisterForNotifications = function () {
                if (self.deviceToken()) {
                    try {
                        mbe.deregisterForNotifications(self.deviceToken(), self.appId(), self.appVersion(),
                            function (statusCode, data) {
                                self.deviceToken("");
                                alert("Deregister device successfully!");
                            }, function (statusCode, data) {
                                alert("Deregister device fail!");
                            });
                    } catch (e) {
                        alert(e.message, "Error");
                    }
                }
            };

        }

        return new ControllerViewModel();
    }
);
