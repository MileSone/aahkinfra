/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout','data/appVariables', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojarraytabledatasource', 'ojs/ojoffcanvas', 'ojs/ojbutton', 'ojs/ojmoduleanimations'],
  function(oj, ko,appVar) {
     function ControllerViewModel() {
      var self = this;
               self.isLoading = ko.observable(false);
      // Save the theme so we can perform platform specific navigational animations
      var platform = oj.ThemeUtils.getThemeTargetPlatform();

      self.isLoggedIn = ko.observable(true);
      // Router setup
      self.router = oj.Router.rootInstance;

      self.router.configure({
          'about': {label: 'about'},
          'profile': {label: 'profile'},
          'login': {label: 'Login'},
        'dashboard': {label: 'Baggage', isDefault: true},
        'incidents': {label: 'Apron'},
        'customers': {label: 'Customers'}
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
      {name: 'Baggage', id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash1-icon'},
      {name: 'Apron', id: 'incidents',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash2-icon'},
      {name: 'Flight', id: 'customers',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash3-icon'},
          // {name: 'Flight', id: 'about',
          //     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash3-icon'},
      {name: 'Land Trans', id: 'profile',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-dash4-icon'}];

      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});




      // Drawer setup
      // self.toggleDrawer = function() {
      //   return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
      // }
      // // Add a close listener so we can move focus back to the toggle button when the drawer closes
      // $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header Setup
      self.getHeaderModel = function() {
        var headerFactory = {
          createViewModel: function(params, valueAccessor) {
            var model =  {
              pageTitle: self.router.currentState().label,
              handleBindingsApplied: function(info) {
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
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
    }

    return new ControllerViewModel();
  }
);
