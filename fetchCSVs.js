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
  state.projects = state.data.filter(p => (
    p.field1.startsWith('JO') || p.field1.startsWith('NO')
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
    [DJ, ER, ET, KE, SO, SS, TZ, UG, UG, CO, NG, NO].indexOf(f.field1.substring(0,2)) === 0
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
