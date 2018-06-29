getCSV(
  '/DataExport/PMISPMFexport.csv',
  'latin1',
  {
    quote: 'off',
    delimiter: ';',
  }
);

getCSV(
  '/DataExport/PMISTXexport.csv',
  'utf8',
  {
    quote: 'off',
    delimiter: ';',
  }
);

alterState((state) => {
  // TODO: map the financials onto the projects...
  return state;
})

each(
  'state.projects[*]',
  post('secret-inbox-url', {
    body: data
  });
);
