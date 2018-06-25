update('Financial__c', 'Unique_ID__c', fields(
  // update on external ID field
  field('Unique_ID__c', (state) => {
    const { data } = state;
    return data.projectCode + data.period + data.activity + data.headAccount;
  }),
  // relate to master ampi__Project__c
  relationship('ampi__Project__r', 'Agresso_Unique_ID__c', dataValue('projectCode')),
  // etc...
  feild('...', '...'),
  feild('...', '...')
));
