list('/DataExport');

getCSV(
  '/DataExport/PMISPMFexport.csv',
  'latin1',
  {
    quote: 'off',
    delimiter: ';',
    noheader: true,
    colParser:{
      "field11": "number",
      "field12": "number",
      "field13": "number",
      "field14": "number",
      "field15": "number",
      "field16": "number",
  	},
  }
);

alterState(state => {
  // NOTE: Choose countries to include here.
  // WARNING: The longer this list becomes, the longer the execution will take.
  state.selectedCountries = [
    'CO',
    'DJ',
    'ER',
    'ET',
    'KE',
    'NG',
    'NO',
    'SO',
    'SS',
    'TZ',
    'UG',
  ];

  state.projects = state.data.filter(p => (
    state.selectedCountries.some(x => (p.field1.startsWith(x)))
  ));
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
    colParser:{
  		"field8": "number",
  		"field9": "number",
      "field10": "number",
      "field11": "number",
  	},
  }
);

alterState(state => {
  const filteredFinancials = state.data.filter(f => (
    state.selectedCountries.some(x => (f.field1.startsWith(x)))
  ));
  const preparedFinancials = _.groupBy(filteredFinancials, 'field1');

  const mergedProjects = state.projects.map((p) => {
    if (preparedFinancials[p.field1] != null) {
      p.financials = preparedFinancials[p.field1];
    } else {
      p.financials = [];
    }
    return p;
  });

  return {
    data: { projects: mergedProjects }
  };
});
