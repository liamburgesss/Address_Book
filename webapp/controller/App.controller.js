sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("pb.controller.App", {
      goToDetailed: function (oEvent, JSONModel) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detailed", {
          contact: window.encodeURIComponent(
            oItem.getBindingContext("contacts").getPath().substr(1)
          ),
        });
      },
      onBeforeRendering: function (oEvent) {
        setTimeout(
          function () {
            var provinces = [];
            var address = [];

            var oList = Object.values(
              this.getView().getModel("contacts").getProperty("/")
            );

            for (var i = 0; i < oList.length; i++) {
              provinces.push(oList[i].region);
              address.push(oList[i].address);
            }
            provinces = provinces.filter(
              (item, index) => provinces.indexOf(item) === index
            );
            address = address.filter(
              (item, index) => address.indexOf(item) === index
            );

            var jsonAddress = [];
            for (var i = 0; i < address.length; i++) {
              jsonAddress.push({ address: address[i] });
            }

            var jsonProvince = [];
            for (var i = 0; i < provinces.length; i++) {
              jsonProvince.push({ province: provinces[i] });
            }

            jsonProvince = { provinces: jsonProvince };
            var oModel2 = new JSONModel(jsonProvince);
            this.getView().setModel(oModel2, "provinces");

            jsonAddress = { addresses: jsonAddress };
            var oModel1 = new JSONModel(jsonAddress);
            this.getView().setModel(oModel1, "addresses");
          }.bind(this),
          100
        );
      },
      onFilterProvince: function (oEvent) {
        console.log(oEvent)

        var aFilter = [];
        var sQuery = oEvent.getParameters().item.getText();
        aFilter.push(new Filter("region", FilterOperator.Contains, sQuery));

        // filter binding
        var oList = this.byId("contactsList");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },
      onFilterAddress: function (oEvent) {
        var aFilter = [];
        var sQuery = oEvent.getParameters().item.getText();
        aFilter.push(new Filter("address", FilterOperator.Contains, sQuery));

        // filter binding
        var oList = this.byId("contactsList");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },
    });
  }
);
