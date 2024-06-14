sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("student00.com.sap.training.ux402.mockdata.ux402mockdata.controller.Customer", {
            getRouter: function () {

                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            onPress: function(oEvent) {

                var oItem = oEvent.getSource();
                var oCtx = oItem.getBindingContext();
                var sCustomerid = oCtx.getProperty("BusinessPartnerID");

                this.getRouter().navTo("salesorders", {
                    customerid: sCustomerid
                }, false);

            }
        });
    });
