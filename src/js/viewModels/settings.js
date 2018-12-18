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
                oj.Router.rootInstance.go('dashboard');
            }

            self.navlistValues = [
                {id: 'Baggage', label: 'Baggage'},
                {id: 'Apron', label: 'Apron'},
                {id: 'Flight', label: 'Flight'},
                {id: 'Land Transport', label: 'Land Transport'},
                {id: 'Ferry', label: 'Ferry'}
            ];

            self.isOpenAddItemWindow = ko.observable(false);
            self.navvalue = ko.observable("Baggage");
            self.addPath = ko.observable("");
            self.addHeight = ko.observable("");
            self.ourData = appVar.infraData;

            self.saveAllItem = function () {
                window.localStorage.setItem("infraData", JSON.stringify(self.ourData));
                window.location.reload();
                oj.Router.rootInstance.go('dashboard');
            };

            self.addFuncBindingHtml = function (sTab) {
                // console.log(sTab);
                self.isOpenAddItemWindow(false);
                var newData = new Array();
                switch (sTab) {
                    case 1:
                        newData = self.ourData.baggage;
                        var counter = newData.length + 1;
                        var aObject = {
                            "id": "project" + counter,
                            "path": self.addPath(),
                            "height": self.addHeight()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.baggage = newData;
                        return false;
                    case 2:
                        newData = self.ourData.apron;
                        var counter = newData.length + 1;
                        var aObject = {
                            "id": "project" + counter,
                            "path": self.addPath(),
                            "height": self.addHeight()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.apron = newData;
                        return false;
                    case 3:
                        newData = self.ourData.flight;
                        var counter = newData.length + 1;
                        var aObject = {
                            "id": "project" + counter,
                            "path": self.addPath(),
                            "height": self.addHeight()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.flight = newData;
                        return false;
                    case 4:
                        newData = self.ourData.lt;
                        var counter = newData.length + 1;
                        var aObject = {
                            "id": "project" + counter,
                            "path": self.addPath(),
                            "height": self.addHeight()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.lt = newData;
                        return false;
                    case 5:
                        newData = self.ourData.ferry;
                        var counter = newData.length + 1;
                        var aObject = {
                            "id": "project" + counter,
                            "path": self.addPath(),
                            "height": self.addHeight()
                        }
                        newData.push(aObject);
                        self.allItems(newData);
                        self.ourData.ferry = newData;
                        return false;
                }
            };

            self.addComfirm = function () {
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
            };

            self.allItems = ko.observableArray([]);
            self.currentTab = ko.observable("Baggage");
            var singleClick = true;


            self.singClickFunc = function(){
                setTimeout(function () {
                    singleClick = true;
                },500);
            }
            self.valuechangehandler = function (e) {

                if (singleClick == true) {
                    singleClick = false;
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
                                "id": "project1",
                                "path": "/shared/EAP/Baggage",
                                "height": "100%",
                            },
                            {
                                "id": "project2",
                                "path": "/shared/EAP/Baggage",
                                "height": "100%",
                            }
                        ])
                    }

                }

            }


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
                            "id": "project1",
                            "path": "/shared/EAP/Baggage",
                            "height": "100%",
                        },
                        {
                            "id": "project2",
                            "path": "/shared/EAP/Baggage",
                            "height": "100%",
                        }
                    ])
                }
            };

            self.allItemsFunc();

            self.addItem = function () {
                self.isOpenAddItemWindow(true);
                self.addPath();
                self.addHeight();
            };

            self.editItem = function () {
                self.isOpenAddItemWindow(true);
                self.addPath();
                self.addHeight();
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

            this.handleMenuBeforeOpen = function (event) {
                var target = event.detail.originalEvent.target;
                var context = document.getElementById("listview").getContextByNode(target);
                if (context != null) {
                    self.currentItem = $("#" + context['key']);
                }
                else {
                    self.currentItem = null;
                }
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
                self.handleAction("second", "edit", event);
                self.addPath(self.currentItem.prop("path"));
                self.addHeight(self.currentItem.prop("height"));
            };

            this.handleTrash = function (data, event) {
                self.handleAction("second", "trash", event);
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
