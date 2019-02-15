var mcs_config = {
  "logLevel": "",
  "logHTTP": true,
  "mobileBackends": {
    "aahkinfra": {
      "authType": "basicAuth",
      "default": true,
      "baseUrl": "https://6BB990B7A9C44F2CADF86A635CCED5F1.mobile.ocp.oraclecloud.com:443",
      "applicationKey": "",
        "authorization": {
            "basicAuth": {
              "backendId": "ebd0dc08-b1ee-4e5c-ab63-3094149f8ead",
              "anonymousToken": "NkJCOTkwQjdBOUM0NEYyQ0FERjg2QTYzNUNDRUQ1RjFfTW9iaWxlQW5vbnltb3VzX0FQUElEOmE5ZjM2MDJmLWJjNDgtNGY3My05NWNlLTkxYzI2NDdjZThmMg=="
            },
            "oAuth": {
              "clientId": "YOUR_CLIENT_ID",
              "clientSecret": "YOUR_ClIENT_SECRET",
              "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
            },
            "facebookAuth":{
              "facebookAppId": "687129091682153",
              "backendId": "17d2c42d-69eb-43ec-8b69-69e01b722663",
              "anonymousToken": "NERFMjNEMzA3Q0Y5NDU4N0ExNzI2MUMyNzA2QjdEMTBfTW9iaWxlQW5vbnltb3VzX0FQUElEOmRhODliN2M2LTVmMTAtNGEzMS04NWFkLWM3YzYxMTcxMzliMg=="
            },
            "ssoAuth":{
              "clientId": "YOUR_CLIENT_ID",
              "clientSecret": "YOUR_ClIENT_SECRET",
              "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
            },
            "tokenAuth":{
              "backendId": "YOUR_BACKEND_ID"
            }
        }
    }
  }
  // "sync": {
  //   "periodicRefreshPolicy": "PERIODIC_REFRESH_POLICY_REFRESH_NONE",
  //   "policies": [
  //     {
  //       "path": '/mobile/custom/firstApi/tasks',
  //       "fetchPolicy": 'FETCH_FROM_SERVICE_ON_CACHE_MISS'
  //     },
  //     {
  //       "path": '/mobile/custom/secondApi/tasks',
  //     }
  //   ]
  // },
//  "syncExpress": {
//    "handler": "OracleRestHandler",
//    "policies": [
//      {
//        "path": '/mobile/custom/OSCAPIs/activity/:activityNumber(\\d+)?',
//      },
//      {
//        "path": '/mobile/platform/users/',
//      }
//    ]
//  }

};
