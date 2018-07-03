upsert('ampi__Project__c', 'Agresso_Unique_ID__c', fields(
  field('Agresso_Unique_ID__c', dataValue('field1')),
  field('New_Donor__c', true),
  field('Name', 'Test from OpenFn')
));

each(
  dataPath('financials[*]'),
  upsert('Financial__c', 'Unique_ID__c', fields(
    // update on external ID field
    field('Unique_ID__c', (state) => {
      const { data } = state;
      // return data.projectCode + data.period + data.activity + data.headAccount;
      return data.field1 + data.field2 + data.field3 + data.field4;
    }),
    // relate to master ampi__Project__c
    relationship('Project__r', 'Agresso_Unique_ID__c', dataValue('field1'))
  ))
);
