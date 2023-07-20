import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['WorkOrder.Pickup_Label_ContentVersion__c'];

export default class WorkOrderFileViewer extends LightningElement {
    @api recordId; // Work Order record ID

    fileId;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            this.fileId = data.fields.Pickup_Label_ContentVersion__c.value;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.fileId = undefined;
        }
    }
}
