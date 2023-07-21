import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import FORM_FACTOR from '@salesforce/client/formFactor';
 

const FIELDS = ['WorkOrder.Pickup_Label_ContentVersion__c'];

export default class WorkOrderFileViewer extends LightningElement {
    @api recordId;
    url;
    isMobile = false;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Record',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.CurrentRecord = data;
            if (this.CurrentRecord.fields.Pickup_Label_ContentVersion__c.value) {
                this.url = '/sfc/servlet.shepherd/version/download/' + this.CurrentRecord.fields.Pickup_Label_ContentVersion__c.value;
            }
            if (FORM_FACTOR == 'Small') {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        }
    }
    
    handleClick() {
        if (this.url) {
          window.open(this.url, '_blank');
        }
      }

}
