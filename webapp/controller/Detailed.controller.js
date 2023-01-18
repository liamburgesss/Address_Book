sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("pb.controller.Detailed", {
    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter
        .getRoute("detailed")
        .attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      this.getView().bindElement({
        path:
          "/" +
          window.decodeURIComponent(
            oEvent.getParameter("arguments").contact
          ),
        model: "contacts",
      });
    },
  });
});
