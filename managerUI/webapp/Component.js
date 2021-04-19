sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/ns/ui5/manager/managerUI/model/models"
// @ts-ignore
// @ts-ignore
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.ns.ui5.manager.managerUI.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
        // @ts-ignore
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            
            
            // 1. Get the Task Properties
            var startupParameters = this.getComponentData().startupParameters;
            var taskModel = startupParameters.taskModel;
            var taskData = taskModel.getData();
            var taskId = taskData.InstanceID;

            // 2. Read the Task Data
            var that = this;
            var contextModel = new sap.ui.model.json.JSONModel("/comnsui5managermanagerUI/bpmworkflowruntime/v1/task-instances/" + taskId + "/context");
            var contextData = contextModel.getData();

            // 3. Update UI Context Model with Task Properties Data
            contextModel.attachRequestCompleted(function () {
                contextData = contextModel.getData();

                var processContext = {};
                processContext.context = contextData;
                // @ts-ignore
                processContext.context.task = {};
                // @ts-ignore
                processContext.context.task.Title = taskData.TaskTitle;
                // @ts-ignore
                processContext.context.task.Priority = taskData.Priority;
                // @ts-ignore
                processContext.context.task.Status = taskData.Status;

                if (taskData.Priority === "HIGH") {
                    // @ts-ignore
                    processContext.context.task.PriorityState = "Warning";
                } else if (taskData.Priority === "VERY HIGH") {
                    // @ts-ignore
                    processContext.context.task.PriorityState = "Error";
                } else {
                    // @ts-ignore
                    processContext.context.task.PriorityState = "Success";
                }

                // @ts-ignore
                processContext.context.task.CreatedOn = taskData.CreatedOn.toDateString();

                // get task description and add it to the model
                startupParameters.inboxAPI.getDescription("NA", taskData.InstanceID).done(function (dataDescr) {
                    // @ts-ignore
                    processContext.context.task.Description = dataDescr.Description;
                    contextModel.setProperty("/task/Description", dataDescr.Description);
                }).
                    // @ts-ignore
                    fail(function (errorText) { });

                // @ts-ignore
                contextModel.setData(processContext.context);
                that.setModel(contextModel);

            });

          /**   $.ajax({
                url: "/sapdemobpmtaskui/NorthWind_Dest/V3/Northwind/Northwind.svc/Suppliers?$format=json",
                method: "GET",
                async: false,
                success: function (result, xhr, data) {
                    var supplierData = data.responseJSON.value;
                   // var existingData = that.getModel();
                    //existingData.Supplier = supplierData;
                    that.setModel(supplierData, "supplier");
                }
            }); */

            // 4. Create Task Completion Buttons 
            var oNegativeAction = {
                sBtnTxt: "Reject",
                // @ts-ignore
                onBtnPressed: function (e) {
                    var viewModel = that.getModel();
                    // @ts-ignore
                    var contxt = viewModel.getData();
                    that._completeTask(that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID, "No")
                }
            };

            var oPositiveAction = {
                sBtnTxt: "Approve",
                // @ts-ignore
                onBtnPressed: function (e) {
                    var viewModel = that.getModel();
                    // @ts-ignore
                    var contxt = viewModel.getData();
                    that._completeTask(that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID, "Yes")
                }
            };

            // 5. Add the task action buttions
            startupParameters.inboxAPI.addAction({
                action: oNegativeAction.sBtnTxt,
                label: oNegativeAction.sBtnTxt,
                type: "Reject"
            }, oNegativeAction.onBtnPressed);

            startupParameters.inboxAPI.addAction({
                action: oPositiveAction.sBtnTxt,
                label: oPositiveAction.sBtnTxt,
                type: "Accept"
            }, oPositiveAction.onBtnPressed);
        },
        

        // 6. Adding Task Completion 
        _completeTask: function (taskId, approvalStatus) {
            var token = this._fetchToken();
            // @ts-ignore
            $.ajax({
                url: "/comnsui5managermanagerUI/bpmworkflowruntime/v1/task-instances/" + taskId,
                method: "PATCH",
                contentType: "application/json",
                async: false,
                data: "{\"status\": \"COMPLETED\", \"context\": {\"approved\":\"" + approvalStatus + "\"}}",
                headers: {
                    "X-CSRF-Token": token
                }
            });
            this._refreshTask(taskId);
        },

        // 7. Supported Operations
        _fetchToken: function () {
            var token;
            // @ts-ignore
            $.ajax({
                url: "/comnsui5managermanagerUI/bpmworkflowruntime/v1/xsrf-token",
                method: "GET",
                async: false,
                headers: {
                    "X-CSRF-Token": "Fetch"
                },
                // @ts-ignore
                // @ts-ignore
                success: function (result, xhr, data) {
                    token = data.getResponseHeader("X-CSRF-Token");
                }
            });
            return token;
        },

        _refreshTask: function (taskId) {
            this.getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
        }


	});
});
