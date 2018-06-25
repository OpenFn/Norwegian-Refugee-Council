// fetch the CSVs using SFTP
fetch();

// parse and maniuplate them into a nice array
alterState();

// send each item to be loaded to Salesforce
each(
  'item[*]',
  post('openfn.org/inbox/blah...')
);
