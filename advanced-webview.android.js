"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
var color_1 = require("tns-core-modules/color");
var app = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var REQUEST_CODE = 1868;
function init() {
    co.fitcom.fancywebview.AdvancedWebView.init(utils.ad.getApplicationContext(), true);
}
exports.init = init;
function openAdvancedUrl(options) {
    if (!options.url) {
        throw new Error("No url set in the Advanced WebView Options object.");
    }
    app.android.on(app.AndroidApplication.activityResultEvent, function (args) {
        var requestCode = args.requestCode;
        var resultCode = args.resultCode;
        if (requestCode === REQUEST_CODE) {
            if (resultCode === android.app.Activity.RESULT_CANCELED) {
                if (options.isClosed && typeof options.isClosed === "function") {
                    options.isClosed(true);
                }
                app.android.off(app.AndroidApplication.activityResultEvent);
            }
        }
    });
    var activity = app.android.startActivity || app.android.foregroundActivity;
    var client;
    var i = new co.fitcom.fancywebview.AdvancedWebViewListener({
        onCustomTabsServiceConnected: function (componentName, client) { },
        onServiceDisconnected: function (componentName) { },
        onNavigationEvent: function (navigationEvent, extras) {
            switch (navigationEvent) {
                case 6:
                    if (options.isClosed && typeof options.isClosed === "function") {
                        options.isClosed(true);
                    }
                    break;
            }
        }
    });
    var wv = new co.fitcom.fancywebview.AdvancedWebView(activity, i);
    var intentBuilder = wv.getBuilder();
    if (intentBuilder) {
        if (options.toolbarColor) {
            intentBuilder.setToolbarColor(new color_1.Color(options.toolbarColor).android);
        }
        if (options.showTitle) {
            intentBuilder.setShowTitle(options.showTitle);
        }
        intentBuilder.addDefaultShareMenuItem();
        intentBuilder.enableUrlBarHiding();
    }
    wv.loadUrl(options.url);
}
exports.openAdvancedUrl = openAdvancedUrl;
