upsert('ampi__Project__c', 'Agresso_Unique_ID__c', fields(
  // NOTE: Delete the following line to use default record type and stop inserts
  relationship('RecordType', 'name', 'Project'),
  field('Name', dataValue('field1')), // Project Code
  field('Agresso_Unique_ID__c', dataValue('field1')), // Project Code
  field('Title__c', dataValue('field2')), // Name
  field('Expenditure_Eligibility_Start_Date__c', dataValue('field3')), // Date From
  field('Expenditure_Eligibility_End_Date__c', dataValue('field4')), // Completed
  field('Donor_Currency__c', dataValue('field8')), // Currency
  field('Country_Code__c', dataValue('field9')), // Kostsed
  field('Agresso_Project_Cycle__c', dataValue('field10')), // Projeccycle
  field('Overhead__c', dataValue('field11')), // Overhead
  field('Total_Budget_Donor_Currency__c', dataValue('field13')), // Donor Contract Value
  field('Total_Budget_NOK__c', dataValue('field14')), // NOK Donor Contract Value
  field('NOK_to_USD_Exchange__c', dataValue('field15')), // NOK to_USD
  field('Donor_Currency_to_NOK_Exchange__c', dataValue('field16')), // Ex_reate_donor_currency
  field('Agresso_Donor_ID__c', dataValue('field7')), // Customer_ID
  field('NRC_Main_Project_Code__c', dataValue('field6')), // Main_Project
  field('NRC_Frame_Project_Code__c', dataValue('field17')) // Frame_Project
));

each(
  dataPath('financials[*]'),
  upsert('Financial__c', 'Unique_ID__c', fields(
    field('Unique_ID__c', (state) => {
      const { data } = state;
      // NOTE: Here we concatenate projectCode + period + activity + headAccount
      return data.field1 + data.field2 + data.field3 + data.field4;
    }),
    relationship('Project__r', 'Agresso_Unique_ID__c', dataValue('field1')), // Project
    field('Period__c', dataValue('field2')), // Period
    field('Activity__c', dataValue('field3')), // Activity
    field('Head_Account__c', dataValue('field4')), // Head account
    field('Head_Account_Description__c', dataValue('field5')), // Head account(T)
    field('Account_Number__c', dataValue('field6')), // Account group
    field('Account_Description__c', dataValue('field7')), // Account group(T)
    field('Amount_USD__c', dataValue('field8')), // Actual YTD USD
    field('Amount_NOK__c', dataValue('field9')), // Actual YTD NOK
    field('Budget_USD__c', dataValue('field10')), // Draft bud USD
    field('Budget_NOK__c', dataValue('field11')) // Draft bud NOK
  ))
);
