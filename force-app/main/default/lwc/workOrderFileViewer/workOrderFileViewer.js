import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class WorkOrderFileViewer extends LightningElement {
    @api recordId; // This will hold the Work Order Id
    @track file;
    @track error;

    // Wire adapter to fetch the related file
    @wire(getRecord, { recordId: '$recordId', fields: ['WorkOrder.Pickup_Label_ContentVersion__c'] })
    wiredRecord({ error, data }) {
        if (data) {
            this.file = data.fields.Pickup_Label_ContentVersion__c.value;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.file = undefined;
        }
    }
}
