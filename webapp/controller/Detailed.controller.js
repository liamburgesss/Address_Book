sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
  "sap/ui/core/routing/History"],
  function (Controller, History) {
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
            window.decodeURIComponent(oEvent.getParameter("arguments").contact),
          model: "contacts",
        });
      },
      goHome: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("phonebook", {}, true);
        }
      },
    });
  }
);
