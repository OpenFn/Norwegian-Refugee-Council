// Update project
upsert('ampi__Project__c', 'Agresso_Unique_ID__c', fields(
  field('Name', dataValue('field1')), // Project Code
  field('Agresso_Unique_ID__c', dataValue('field1')), // Project Code
  field('Title__c', state => {
    return state.data.field2.substring(0,100); // Name, first 100 chars
  }),
  field('Expenditure_Eligibility_Start_Date__c', state => {
    const dateArray = state.data.field3.split('/'); // Date From
    const dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
    return new Date(dateString).toISOString();
  }),
  field('Expenditure_Eligibility_End_Date__c', state => {
    const dateArray = state.data.field4.split('/'); // Completed
    const dateString = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
    return new Date(dateString).toISOString();
  }),
  field('Donor_Currency__c', dataValue('field8')), // Currency
  field('Country_Code__c', dataValue('field9')), // Kostsed
  field('Agresso_Project_Cycle__c', dataValue('field10')), // Projeccycle
  field('Overhead__c', dataValue('field11')), // Overhead
  field('Total_Budget_Donor_Currency__c', dataValue('field13')), // Donor Contract Value
  field('Total_Budget_NOK__c', dataValue('field14')), // NOK Donor Contract Value
  field('NOK_to_USD_Exchange__c', dataValue('field15')), // NOK to_USD
  field('Donor_Currency_to_NOK_Exchange__c', dataValue('field16')), // Ex_reate_donor_currency
  field('Agresso_Donor_ID__c', dataValue('field7')), // Customer_ID
  field('Agresso_NRC_Co_Funding_Share__c', dataValue('field12')) // NRC Share
));

// NOTE: Here we find the Salesforce ID of the project, since the bulk API does
// not allow matching on external IDs in jsForce.
query(`SELECT Id FROM ampi__Project__c WHERE Agresso_Unique_ID__c = '${state.data.field1}'`);

// Add financial records via the bulk API.
bulk('Financial__c', 'upsert', { extIdField: 'Unique_ID__c', failOnError: true, allowNoOp: true },
  state => state.data.financials.map(f => {

    const year = f.field2.substring(0,4);
    const month = f.field2.substring(4);
    const sfDate = new Date(year, month, 0).toISOString();

    return {
      'Unique_ID__c': f.field1.concat(f.field2, f.field3, f.field4, f.field7),
      'Project__c': state.references[0].records[0].Id, // the sfID from the above query
      'Period__c': sfDate, // Period
      'Activity__c': f.field3, // Activity
      'Head_Account__c': f.field4, // Head account
      'Head_Account_Description__c': f.field5, // Head account(T)
      'Account_Number__c': f.field6, // Account group
      'Account_Description__c': f.field7, // Account group(T)
      'Amount_USD__c': f.field8, // Actual YTD USD
      'Amount_NOK__c': f.field9, // Actual YTD NOK
      'Budget_USD__c': f.field10, // Draft bud USD
      'Budget_NOK__c': f.field11, // Draft bud NOK
    }
  })
);
