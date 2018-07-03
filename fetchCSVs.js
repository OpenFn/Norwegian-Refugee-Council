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
    },
    colParser:{
      "field11": "number",
      "field12": "number",
      "field13": "number",
      "field14": "number",
      "field15": "number",
      "field16": "number",
  		"field17": "omit",
  	},
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
    },
    colParser:{
  		"field8": "number",
  		"field9": "number",
      "field10": "number",
      "field11": "number",
  	},
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
