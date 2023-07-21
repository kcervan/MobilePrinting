public  class WorkOrderPDFGenerator {

    @InvocableMethod(label='Generate Work Order PDF' description='Generates a PDF and updates the Work Order')
    public static List<WorkOrderPDFResult> generatePDFAndSave(List<WorkOrderPDFRequest> requests) {
        List<ContentVersion> contentVersions = new List<ContentVersion>();
        List<WorkOrder> workOrdersToUpdate = new List<WorkOrder>();
        List<WorkOrderPDFResult> results = new List<WorkOrderPDFResult>();

        for (WorkOrderPDFRequest request : requests) {
            Id workOrderId = request.WorkOrderId;
            Boolean createPickupLabel = request.CreatePickupLabel;

            WorkOrder workOrder = [SELECT Id, Create_Pickup_Label__c FROM WorkOrder WHERE Id = :workOrderId];

            if (createPickupLabel && workOrder.Create_Pickup_Label__c) {
              //TESTING: Need to remove because of the SFS Mobile App: workOrder.Create_Pickup_Label__c = false;
                workOrdersToUpdate.add(workOrder);

                // Create the Visualforce page URL
                String pageUrl = '/apex/WorkOrderLabel?id=' + workOrderId;

                // Generate the PDF content
                PageReference pageRef = new PageReference(pageUrl);
                Blob pdfBlob = Test.isRunningTest() ? Blob.valueOf('Sample PDF') : pageRef.getContentAsPDF();

                // Create the ContentVersion record
                ContentVersion contentVersion = new ContentVersion();
                contentVersion.Title = 'WorkOrderPickupLabel.pdf';
                contentVersion.PathOnClient = 'WorkOrderPickupLabel.pdf';
                contentVersion.VersionData = pdfBlob;
                contentVersion.Origin = 'H';
                contentVersion.FirstPublishLocationId = workOrderId;
                contentVersions.add(contentVersion);

                results.add(new WorkOrderPDFResult(workOrderId, contentVersion.Id));
            }
        }

        if (!contentVersions.isEmpty()) {
            insert contentVersions;

            for (Integer i = 0; i < workOrdersToUpdate.size(); i++) {
                workOrdersToUpdate[i].Pickup_Label_ContentVersion__c = contentVersions[i].Id;
            }

            update workOrdersToUpdate;
        }

        return results;
    }

    public class WorkOrderPDFRequest {
        @InvocableVariable(required=true)
        public Id WorkOrderId;

        @InvocableVariable(required=true)
        public Boolean CreatePickupLabel;
    }

    public class WorkOrderPDFResult {
        @InvocableVariable
        public Id WorkOrderId;

        @InvocableVariable
        public Id ContentVersionId;

        public WorkOrderPDFResult(Id workOrderId, Id contentVersionId) {
            this.WorkOrderId = workOrderId;
            this.ContentVersionId = contentVersionId;
        }
    }

}