/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'data/appVariables', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojswipetoreveal', 'ojs/ojlistview', 'ojs/ojdatacollection-common', 'ojs/ojbutton', 'ojs/ojmenu', 'ojs/ojlabel',
        'ojs/ojinputtext'],
    function (oj, ko, $, app, appVar) {

        function SettingsViewModel() {
            var self = this;

            // Header Config
            self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
            self.pageTitle = ko.observable("Settings");
            self.goBack = function () {
                setTimeout(function () {
                    oj.Router.rootInstance.go('dashboard');
                }, 2000)
            }

            self.editData = "";

            self.navlistValues = [
                {id: 'Baggage', label: 'Baggage'},
                {id: 'Apron', label: 'Apron'},
                {id: 'Flight', label: 'Flight'},
                {id: 'Land Transport', label: 'Land Transport'},
                {id: 'Ferry', label: 'Ferry'}
            ];

            self.isOpenAddItemWindow = ko.observable(false);
            self.isOpenEditItemWindow = ko.observable(false);
            self.navvalue = ko.observable("Baggage");
            self.addPath = ko.observable("");
            self.addHeight = ko.observable("");
            self.ourData = appVar.infraData;

            var singleClick = true;

            self.logout = function () {
                if (singleClick) {
                    singleClick = false;

                    if (confirm("logout ?")) {

                        oj.Router.rootInstance.go('browserLogin');
                        var logoutBrowser = cordova.InAppBrowser.open('https://idcs-0bc004ec4ded45978582d9fe03e10190.identity.oraclecloud.com/sso/v1/user/logout', '_blank', 'location=false', {
                            clearsessioncache: false,
                            clearcache: false
                        });
                        logoutBrowser.addEventListener("loadstop", function (url) {
                            console.log('url is' + JSON.stringify(url));
                            if (url.url.startsWith('https://idcs-0bc004ec4ded45978582d9fe03e10190.identity.oraclecloud.com/ui/v1/signin')) {
                                window.location.reload();
                            }
                        });
                    }

                    setTimeout(function () {
                        singleClick = true;
                    },100);
                }
            };


            self.saveAllItem = function () {
                window.localStorage.setItem("infraData", JSON.stringify(self.ourData));
                // window.location.reload();
                oj.Router.rootInstance.go('dashboard');
            };

            self.editFuncBindingHTML = function (sTab) {
                var newData = new Array();
                switch (sTab) {
                    case 1:
                        newData = self.ourData.baggage;
                        var tempID = self.currentItem[0].id;
                        for (var m = 0; m < newData.length; m++) {
                            if (tempID == newData[m].id) {
                                var aObject = {
                                    "id": tempID,
                                    "path": self.addPath().trim(),
                                    "height": self.addHeight().trim()
                                }
                                newData.splice(m, 1, aObject);
                            }
                        }
                        self.allItems(newData);
                        self.ourData.baggage = newData;
                        return false;
                    case 2:
                        newData = self.ourData.apron;
                        var tempID = self.currentItem[0].id;
                        for (var m = 0; m < newData.length; m++) {
                            if (tempID == newData[m].id) {
                                var aObject = {
                                    "id": tempID,
                                    "path": self.addPath().trim(),
                                    "height": self.addHeight().trim()
                                }
                                newData.splice(m, 1, aObject);
                            }
                        }
                        self.allItems(newData);
                        self.ourData.apron = newData;
                        return false;
                    case 3:
                        newData = self.ourData.flight;
                        var tempID = self.currentItem[0].id;
                        for (var m = 0; m < newData.length; m++) {
                            if (tempID == newData[m].id) {
                                var aObject = {
                                    "id": tempID,
                                    "path": self.addPath().trim(),
                                    "height": self.addHeight().trim()
                                }
                                newData.splice(m, 1, aObject);
                            }
                        }
                        self.allItems(newData);
                        self.ourData.flight = newData;
                        return false;
                    case 4:
                        newData = self.ourData.lt;
                        var tempID = self.currentItem[0].id;
                        for (var m = 0; m < newData.length; m++) {
                            if (tempID == newData[m].id) {
                                var aObject = {
                                    "id": tempID,
                                    "path": self.addPath().trim(),
                                    "height": self.addHeight().trim()
                                }
                                newData.splice(m, 1, aObject);
                            }
                        }
                        self.allItems(newData);
                        self.ourData.lt = newData;
                        return false;
                    case 5:
                        newData = self.ourData.ferry;
                        var tempID = self.currentItem[0].id;
                        for (var m = 0; m < newData.length; m++) {
                            if (tempID == newData[m].id) {
                                var aObject = {
                                    "id": tempID,
                                    "path": self.addPath().trim(),
                                    "height": self.addHeight().trim()
                                }
                                newData.splice(m, 1, aObject);
                            }
                        }
                        self.allItems(newData);
                        self.ourData.ferry = newData;
                        return false;
                }
            }

            self.addFuncBindingHtml = function (sTab) {
                // console.log(self.addHeight());
                self.isOpenAddItemWindow(false);

                var newData = new Array();
                switch (sTab) {
                    case 1:
                        newData = self.ourData.baggage;
                        if (newData.length != 0) {
                            counter = parseInt(newData[newData.length - 1].id.substr(7)) + 1;
                        } else {
                            counter = 0;
                        }
                        var aObject = {
                            "id": "baggage" + counter,
                            "path": self.addPath().trim(),
                            "height": self.addHeight().trim()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.baggage = newData;
                        return false;
                    case 2:
                        newData = self.ourData.apron;
                        console.log(newData.length);
                        var counter;
                        if (newData.length != 0) {
                            counter = parseInt(newData[newData.length - 1].id.substr(5)) + 1;
                        } else {
                            counter = 0;
                        }
                        var aObject = {
                            "id": "apron" + counter,
                            "path": self.addPath().trim(),
                            "height": self.addHeight().trim()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.apron = newData;
                        return false;
                    case 3:
                        newData = self.ourData.flight;
                        if (newData.length != 0) {
                            counter = parseInt(newData[newData.length - 1].id.substr(6)) + 1;
                        } else {
                            counter = 0;
                        }
                        var aObject = {
                            "id": "flight" + counter,
                            "path": self.addPath().trim(),
                            "height": self.addHeight().trim()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.flight = newData;
                        return false;
                    case 4:
                        newData = self.ourData.lt;
                        if (newData.length != 0) {
                            counter = parseInt(newData[newData.length - 1].id.substr(2)) + 1;
                        } else {
                            counter = 0;
                        }
                        var aObject = {
                            "id": "lt" + counter,
                            "path": self.addPath().trim(),
                            "height": self.addHeight().trim()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.lt = newData;
                        return false;
                    case 5:
                        newData = self.ourData.ferry;
                        if (newData.length != 0) {
                            counter = parseInt(newData[newData.length - 1].id.substr(5)) + 1;
                        } else {
                            counter = 0;
                        }
                        var aObject = {
                            "id": "ferry" + counter,
                            "path": self.addPath().trim(),
                            "height": self.addHeight().trim()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.ferry = newData;
                        return false;
                }
            };

            self.editComfirm = function () {
                // console.log("edting");
                // $("#input8")[0].blur();
                // $("#input9")[0].blur();
                // setTimeout(function () {
                    if (self.addHeight()) {
                        self.isOpenEditItemWindow(false);
                        switch (self.currentTab()) {
                            case "Baggage":
                                self.editFuncBindingHTML(1);
                                return false;
                            case "Apron":
                                self.editFuncBindingHTML(2);
                                return false;
                            case "Flight":
                                self.editFuncBindingHTML(3);
                                return false;
                            case "Land Transport":
                                self.editFuncBindingHTML(4);
                                return false;
                            case "Ferry":
                                self.editFuncBindingHTML(5);
                                return false;
                        }
                    } else {
                        console.log("need enter a Height for porject");
                    }
                // }, 800);
            };

            self.addComfirm = function () {
                // console.log("edting");
                // $("#input1")[0].blur();
                // $("#input2")[0].blur();
                // setTimeout(function () {
                    if (self.addHeight()) {
                        switch (self.currentTab()) {
                            case "Baggage":
                                self.addFuncBindingHtml(1);
                                return false;
                            case "Apron":
                                self.addFuncBindingHtml(2);
                                return false;
                            case "Flight":
                                self.addFuncBindingHtml(3);
                                return false;
                            case "Land Transport":
                                self.addFuncBindingHtml(4);
                                return false;
                            case "Ferry":
                                self.addFuncBindingHtml(5);
                                return false;
                        }

                    } else {
                        console.log("need enter a Height for porject");
                    }

            };

            self.allItems = ko.observableArray([]);
            self.currentTab = ko.observable("Baggage");
            var singleClick = true;


            self.singClickFunc = function () {
                setTimeout(function () {
                    singleClick = true;
                    $('#navlistset')[0].disabled = false;
                }, 1000);
            }

            self.valuechangehandler = function (e) {
                if (singleClick == true) {
                    singleClick = false;
                    $('#navlistset')[0].disabled = true;
                    // console.log(e);
                    if (self.ourData) {
                        console.log(self.ourData);
                        self.allItems([]);
                        // var selectedPage = self.navvalue();
                        switch (e.detail.value) {
                            case "Baggage":
                                self.currentTab("Baggage");
                                self.allItems(self.ourData.baggage);
                                self.singClickFunc();
                                return false;
                            case "Apron":
                                self.currentTab("Apron");
                                self.allItems(self.ourData.apron);
                                self.singClickFunc();
                                return false;
                            case "Flight":
                                self.currentTab("Flight");
                                self.allItems(self.ourData.flight);
                                self.singClickFunc();
                                return false;
                            case "Land Transport":
                                self.currentTab("Land Transport");
                                self.allItems(self.ourData.lt);
                                self.singClickFunc();
                                return false;
                            case "Ferry":
                                self.currentTab("Ferry");
                                self.allItems(self.ourData.ferry);
                                self.singClickFunc();
                                return false;
                        }
                    } else {
                        return self.allItems([
                            {
                                "id": "Baggage1",
                                "path": "/shared/EAP/Baggage",
                                "height": "100%",
                            },
                            {
                                "id": "Baggage2",
                                "path": "/shared/EAP/Baggage",
                                "height": "100%",
                            }
                        ])
                    }
                }
            }


            self.textvaluechangehandler = function (handle) {
                console.log(handle);
                console.log(self.addHeight());
            };


            self.allItemsFunc = function () {
                if (self.ourData) {
                    console.log(self.ourData);
                    self.allItems([]);
                    var selectedPage = self.navvalue();
                    switch (selectedPage) {
                        case "Baggage":
                            self.currentTab("Baggage");
                            return self.allItems(self.ourData.baggage);
                        case "Apron":
                            self.currentTab("Apron");
                            return self.allItems(self.ourData.apron);
                        case "Flight":
                            self.currentTab("Flight");
                            return self.allItems(self.ourData.flight);
                        case "Land Transport":
                            self.currentTab("Land Transport");
                            return self.allItems(self.ourData.lt);
                        case "Ferry":
                            self.currentTab("Ferry");
                            return self.allItems(self.ourData.ferry);
                    }
                } else {
                    return self.allItems([
                        {
                            "id": "Baggage1",
                            "path": "/shared/EAP/Baggage",
                            "height": "100%",
                        },
                        {
                            "id": "Baggage2",
                            "path": "/shared/EAP/Baggage",
                            "height": "100%",
                        }
                    ])
                }
            };

            self.allItemsFunc();

            self.addItem = function () {
                self.isOpenEditItemWindow(false);
                if (!self.isOpenAddItemWindow()) {
                    self.isOpenAddItemWindow(true);
                    self.addPath("");
                    self.addHeight("");
                } else {
                    self.isOpenAddItemWindow(false);
                    self.addPath("");
                    self.addHeight("");
                }

            };

            this.dataSource = new oj.ArrayTableDataSource(this.allItems, {idAttribute: "id"});
            this.action = ko.observable("No action taken yet");

            // viewModel ojModule convention method
            this.handleTransitionCompleted = function () {
                var busyContext = oj.Context.getPageContext().getBusyContext();
                busyContext.whenReady(5000).then(function () {
                    // register swipe to reveal for all new list items
                    $("#listview").find(".item-marker").each(function (index) {
                        var item = $(this);
                        var id = item.prop("id");
                        var startOffcanvas = item.find(".oj-offcanvas-start").first();
                        var endOffcanvas = item.find(".oj-offcanvas-end").first();

                        // setup swipe actions
                        oj.SwipeToRevealUtils.setupSwipeActions(startOffcanvas);
                        oj.SwipeToRevealUtils.setupSwipeActions(endOffcanvas);

                        // make sure listener only registered once
                        endOffcanvas.off("ojdefaultaction");
                        endOffcanvas.on("ojdefaultaction", function () {
                            self.handleDefaultAction(item);
                        });
                    });
                });
            };

            // viewModel ojModule convention method
            this.handleDeactivated = function () {
                // register swipe to reveal for all new list items
                $("#listview").find(".item-marker").each(function (index) {
                    var startOffcanvas = $(this).find(".oj-offcanvas-start").first();
                    var endOffcanvas = $(this).find(".oj-offcanvas-end").first();

                    oj.SwipeToRevealUtils.tearDownSwipeActions(startOffcanvas);
                    oj.SwipeToRevealUtils.tearDownSwipeActions(endOffcanvas);
                });
            };
// self.currentData;
            this.handleMenuBeforeOpen = function (event) {
                var target = event.detail.originalEvent.target;
                var context = document.getElementById("listview").getContextByNode(target);
                if (context != null) {
                    self.currentItem = $("#" + context['key']);
                }
                else {
                    self.currentItem = null;
                }

                // self.currentData =
            };

            this.handleMenuItemAction = function (event) {
                var id = event.target.id;
                if (id == "edit")
                    self.handleFlag();
                else if (id == "delete")
                    self.handleTrash();
            };

            this.closeToolbar = function (which, item) {
                var toolbarId = "#" + which + "_toolbar_" + item.prop("id");
                var drawer = {"displayMode": "push", "selector": toolbarId};
                oj.OffcanvasUtils.close(drawer);
            };

            this.handleAction = function (which, action, event) {
                if (event != null) {
                    self.currentItem = $(event.target).closest(".item-marker");

                    // offcanvas won't be open for default action case
                    if (action != "default")
                        self.closeToolbar(which, self.currentItem);
                }

                if (self.currentItem != null) {
                    self.action("Handle " + action + " action on: " + self.currentItem.prop("id"));
                }
            };

            this.handleFlag = function (data, event) {
                self.editData = self.currentItem[0].id;
                self.isOpenEditItemWindow(true);
                self.handleAction("second", "edit", event);
                console.log(self.currentItem[0].innerText);
                var tempVar = self.currentItem[0].innerText;
                var t1 = "Height: ";
                var t2 = "Project: ";
                var n1 = tempVar.indexOf(t1);
                var n0 = tempVar.indexOf(t2);
                console.log(n1);
                var newPro = tempVar.substring(n0 + 8, n1);
                var newHeight = tempVar.substring(n1 + 7);
                self.addPath(newPro);
                self.addHeight(newHeight);
            };

            this.handleTrash = function (data, event) {
                self.handleAction("second", "trash", event);
                console.log(self.currentItem);
                self.remove(self.currentItem);
            };

            this.handleDefaultAction = function (item) {
                // self.currentItem = item;
                // self.handleAction("second", "default");
                // self.remove(item);
            };

            this.remove = function (item) {
                // unregister swipe to reveal for removed item
                var startOffcanvas = item.find(".oj-offcanvas-start").first();
                var endOffcanvas = item.find(".oj-offcanvas-end").first();

                oj.SwipeToRevealUtils.tearDownSwipeActions(startOffcanvas);
                oj.SwipeToRevealUtils.tearDownSwipeActions(endOffcanvas);


                self.allItems.remove(function (current) {
                    console.log(current.id);
                    console.log(item);
                    return (current.id == item.prop("id"));
                });
            };

            self.edit = function () {
                self.allItems.splice(function (current) {
                    console.log(current.id);
                    console.log(current);
                    return true;
                });
            }


            self.handleActivated = function (info) {
                // Implement if needed
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
        return new SettingsViewModel();
    }
);
