import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import FORM_FACTOR from '@salesforce/client/formFactor';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';


const FIELDS = ['WorkOrder.Pickup_Label_ContentVersion__c'];

export default class WorkOrderFileViewer extends NavigationMixin(LightningElement) {
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
                this.NavigationMixin.Navigate
                {
                    "type": "standard__webPage",
                    "attributes": {
                        "url": `com.salesforce.fieldservice://v1/sObject/${this.CurrentRecord.fields.Pickup_Label_ContentVersion__c.value}`
                    }
                }+ this.e;
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

      generatePDFAndSave() {
        const fields = {};
        fields.Id = this.recordId; // Set the record Id
        fields.Create_Pickup_Label__c = true; // Set the field value to true

        // Update the record
        updateRecord({ fields })
            .then(() => {
                // Record is updated successfully
                console.log('Record updated successfully');
            })
            .catch(error => {
                // Handle any errors that may occur during the update
                console.error('Error updating record:', error);
            });
    }

      

}
