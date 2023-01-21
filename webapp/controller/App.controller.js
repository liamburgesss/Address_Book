sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
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
      onAfterRendering: function (oEvent) {
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

            console.log(jsonAddress);

            jsonProvince = {"provinces": jsonProvince};
            var oModel = new JSONModel(jsonProvince);
            this.getView().setModel(oModel);
            
            jsonAddress = {"addresses": jsonAddress};
            var oModel1 = new JSONModel(jsonAddress);
            this.getView().setModel(oModel1);

            console.log(jsonAddress);

          }.bind(this),
          500
        );
      },
    });
  }
);
