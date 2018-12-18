/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'data/appVariables'],
 function(oj, ko, $, app, appVar) {
  
    function IncidentsViewModel() {
      var self = this;

      // Header Config
      self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

        self.dvhtml = ko.observable();
        var newHtmlString = "";
        if (appVar.infraData.apron) {
            var dataSource = appVar.infraData.apron;
            dataSource.forEach(function (item) {
                console.log(item);
                var tempArray = new Array();
                tempArray[0] = '<div style="position:absolute;width:100%;height:' + item.height + '"><oracle-dv project-path="' + item.path + '"';
                tempArray[1] = "project-options='{";
                tempArray[2] = '"bDisableMobileLayout":true, "bShowFilterBar"';
                tempArray[3] = ":false}'></oracle-dv></div>";
                newHtmlString += tempArray.join("");
            });
            console.log(newHtmlString);
            self.dvhtml(newHtmlString);
        }

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
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
      self.handleBindingsApplied = function(info) {
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
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
