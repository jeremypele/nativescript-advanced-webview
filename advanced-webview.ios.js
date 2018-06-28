"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
var color_1 = require("tns-core-modules/color");
var utils = require("tns-core-modules/utils/utils");
var SFSafariViewControllerDelegateImpl = (function (_super) {
    __extends(SFSafariViewControllerDelegateImpl, _super);
    function SFSafariViewControllerDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SFSafariViewControllerDelegateImpl.initWithOwnerCallback = function (owner, callback) {
        var delegate = SFSafariViewControllerDelegateImpl.new();
        delegate._owner = owner;
        delegate._callback = callback;
        return delegate;
    };
    SFSafariViewControllerDelegateImpl.prototype.safariViewControllerDidCompleteInitialLoad = function (controller, didLoadSuccessfully) {
        console.log("Delegate, safariViewControllerDidCompleteInitialLoad: " +
            didLoadSuccessfully);
    };
    SFSafariViewControllerDelegateImpl.prototype.safariViewControllerDidFinish = function (controller) {
        if (this._callback && typeof this._callback === "function") {
            this._callback(true);
        }
    };
    return SFSafariViewControllerDelegateImpl;
}(NSObject));
SFSafariViewControllerDelegateImpl.ObjCProtocols = [SFSafariViewControllerDelegate];
function init() { }
exports.init = init;
function openAdvancedUrl(options) {
    if (!options.url) {
        throw new Error("No url set in the Advanced WebView Options object.");
    }
    var sfc = SFSafariViewController.alloc().initWithURL(NSURL.URLWithString(options.url));
    if (options.toolbarColor) {
        sfc.preferredBarTintColor = new color_1.Color(options.toolbarColor).ios;
    }
    if (options.toolbarControlsColor) {
        sfc.preferredControlTintColor = new color_1.Color(options.toolbarControlsColor).ios;
    }
    sfc.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(new WeakRef({}), options.isClosed);
    var app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
    var animated = true;
    var completionHandler = null;
    app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(sfc, animated, completionHandler);
}
exports.openAdvancedUrl = openAdvancedUrl;
