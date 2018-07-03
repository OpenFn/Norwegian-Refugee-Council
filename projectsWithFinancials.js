upsert('ampi__Project__c', 'Agresso_Unique_ID__c', fields(
  relationship('RecordType', 'name', 'Project'),
  field('Name', dataValue('field1')),
  field('Agresso_Unique_ID__c', dataValue('field1')),
  field('Title__c', dataValue('field2')),
  field('Expenditure_Eligibility_Start_Date__c', dataValue('field3')),
  field('Expenditure_Eligibility_End_Date__c', dataValue('field4')),
  field('Donor_Currency__c', dataValue('field8')),
  field('Country_Code__c', dataValue('field9')),
  field('Agresso_Project_Cycle__c', dataValue('field10')),
  field('Overhead__c', dataValue('field11')),
  field('Total_Budget_Donor_Currency__c', dataValue('field13')),
  field('Total_Budget_NOK__c', dataValue('field14')),
  field('NOK_to_USD_Exchange__c', dataValue('field15')),
  field('Donor_Currency_to_NOK_Exchange__c', dataValue('field16')),
  field('Agresso_Donor_ID__c', dataValue('field7')),
  field('NRC_Main_Project_Code__c', dataValue('field6')),
  field('NRC_Frame_Project_Code__c', dataValue('field17'))
));

each(
  dataPath('financials[*]'),
  upsert('Financial__c', 'Unique_ID__c', fields(
    field('Unique_ID__c', (state) => {
      const { data } = state;
      // NOTE: concatenate projectCode + period + activity + headAccount
      return data.field1 + data.field2 + data.field3 + data.field4;
    }),
    relationship('Project__r', 'Agresso_Unique_ID__c', dataValue('field1')),
    field('Period__c', dataValue('field2')),
    field('Activity__c', dataValue('field3')),
    field('Head_Account__c', dataValue('field4')),
    field('Head_Account_Description__c', dataValue('field5')),
    field('Account_Number__c', dataValue('field6')),
    field('Account_Description__c', dataValue('field7')),
    field('Amount_USD__c', dataValue('field8')),
    field('Amount_NOK__c', dataValue('field9')),
    field('Budget_USD__c', dataValue('field10')),
    field('Budget_NOK__c', dataValue('field11'))
  ))
);
