getCSV(
  '/DataExport/PMISPMFexport.csv',
  'latin1',
  {
    quote: 'off',
    delimiter: ';',
    noheader: true,
    filter: {
      type: 'startsWith',
      key: 'field1',
      value: 'JO',
    }
  }
);

alterState(state => {
  state.projects = state.data;
  state.data = {};
  return state;
});

getCSV(
  '/DataExport/PMISTXexport.csv',
  'utf8',
  {
    quote: 'off',
    delimiter: ';',
    noheader: true,
    filter: {
      type: 'startsWith',
      key: 'field1',
      value: 'JO',
    }
  }
);

alterState(state => {
  const preparedFinancials = _.groupBy(state.data, 'field1');

  const mergedProjects = state.projects.map((p) => {
    if (preparedFinancials[p.field1] != null) {
      p.financials = preparedFinancials[p.field1];
    } else {
      p.financials = [];
    }
    return p;
  });

  return {
    data: mergedProjects
  };
});
