sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("student00.com.sap.training.ux402.smartfield.ux402smartfield.controller.Main", {
            onInit: function () {
                let sPath= "/FlightSet(Carrid='AA',Connid='0017',Fldate=datetime'2023-04-28T00%3A00%3A00')";
                this.getView().bindElement(sPath);
            }
        });
    });
