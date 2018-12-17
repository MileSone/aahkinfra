define(['ojs/ojcore', 'jquery'], 
    function (oj, $) {
    /**
     * The view model for the main content view template
     */
    function appVariablesModel() {
        var self = this;
        self.mcsLoginUser = "mile";
        self.mcsLoginPassword = "Mcs@1234";
        self.isLoggedIn= false;

        self.appId = "com.oraclecorp.internal.ent3.apac.scc.aahkinfra";
        self.appVersion = "1.0.0";
        self.androidSenderID = "794617537610";
        self.deviceToken = ""; // for notificaton
        self.errMsg = "";
        
        self.response;
    }
    
    return new appVariablesModel();
});