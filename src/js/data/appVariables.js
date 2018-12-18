define(['ojs/ojcore', 'jquery'], 
    function (oj, $) {
        /**
         * The view model for the main content view template
         */
        function appVariablesModel() {
            var self = this;
            self.mcsLoginUser = "mile";
            self.mcsLoginPassword = "Mcs@1234";
            self.isLoggedIn = false;

            self.appId = "com.oraclecorp.internal.ent3.apac.scc.aahkinfra";
            self.appVersion = "1.0.0";
            self.androidSenderID = "794617537610";
            self.deviceToken = ""; // for notificaton
            self.errMsg = "";
            self.response;

            var defaultData = {
                "baggage": [
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
                ],
                "apron": [
                    {
                        "id": "project1",
                        "path": "/shared/EAP/Baggage1",
                        "height": "100%",
                    },
                    {
                        "id": "project2",
                        "path": "/shared/EAP/Baggage",
                        "height": "100%",
                    }
                ],
                "flight": [
                    {
                        "id": "project1",
                        "path": "/shared/EAP/Baggage2",
                        "height": "100%",
                    },
                    {
                        "id": "project2",
                        "path": "/shared/EAP/Baggage",
                        "height": "100%",
                    }
                ],
                "lt": [
                    {
                        "id": "project1",
                        "path": "/shared/EAP/Baggage3",
                        "height": "100%",
                    },
                    {
                        "id": "project2",
                        "path": "/shared/EAP/Baggage",
                        "height": "100%",
                    }
                ],
                "ferry": [
                    {
                        "id": "project1",
                        "path": "/shared/EAP/Baggage4",
                        "height": "100%",
                    },
                    {
                        "id": "project2",
                        "path": "/shared/EAP/Baggage",
                        "height": "100%",
                    }
                ],
            }

            self.infraData = window.localStorage.getItem("infraData") ? JSON.parse(window.localStorage.getItem("infraData")) : defaultData;
        }



        return new appVariablesModel();
    });