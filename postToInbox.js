// NOTE: For every prepared projectWithFinancials item in the projects array,
// NRC posts it to their OpenFn inbox so that each item can fail or succeed
// individually.
alterState(state => {
  const interval = 1000;
  var promise = Promise.resolve();
  state.data.projects.forEach(p => {
    promise = promise.then(() => {
      const f = p.financials;
      console.log(
        `Isolating ${p.field2}: project ${p.field1} with ${f.length} financials.`
      );

      var i,
        j,
        temparray,
        chunk = 1000;

      for (i = 0, j = f.length; i < j; i += chunk) {
        temparray = f.slice(i, i + chunk);
        state.data.f = temparray;
        post('', {
          body: state => {
            return state.data;
          },
        })(state);
        return new Promise(resolve => {
          setTimeout(resolve, interval);
        });
      }
    });
  });
  return state;
});