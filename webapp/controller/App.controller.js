sap.ui.define([
    "sap/ui/core/mvc/Controller",
 ], function (Controller) {
    "use strict";
    return Controller.extend("pb.controller.App", {
        goToDetailed : function (oEvent) {
            var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detailed", {
				contact: window.encodeURIComponent(oItem.getBindingContext("contacts").getPath().substr(1))
			});
        }
    });
 });