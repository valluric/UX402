sap.ui.define([
	'sap/m/Dialog',
	'sap/m/MessageToast'
], function(Dialog, MessageToast) {
	"use strict";
	return {
		messages: {},
		showErrorMessage: function(oParameter) {
			var oErrorDetails = com.sap.training.ux402.deepinsert.ux402_deepinsert.util.messages._parseError(oParameter);
			var oMsgBox = sap.ca.ui.message.showMessageBox({
				type: sap.ca.ui.message.Type.ERROR,
				message: oErrorDetails.sMessage,
				details: oErrorDetails.sDetails
			});
			if (!sap.ui.Device.support.touch) {
				oMsgBox.addStyleClass("sapUiSizeCompact");
			}
		},

		getErrorContent: function(oParameter) {
			return this._parseError(oParameter).sMessage;
		},

		_parseError: function(oParameter) {
			var sMessage = "",
				sDetails = "",
				oEvent = null,
				oResponse = null,
				oError = {};

			if (oParameter.mParameters) {
				oEvent = oParameter;
				sMessage = oEvent.getParameter("message");
				sDetails = oEvent.getParameter("responseText");
			} else {
				oResponse = oParameter;
				sMessage = oResponse.message;
				sDetails = oResponse.response.body;
			}

			if (jQuery.sap.startsWith(sDetails, "{\"error\":")) {
				var oErrModel = new sap.ui.model.json.JSONModel();
				oErrModel.setJSON(sDetails);
				sMessage = oErrModel.getProperty("/error/message/value");
			}

			oError.sDetails = sDetails;
			oError.sMessage = sMessage;
			return oError;
		}
	};
});