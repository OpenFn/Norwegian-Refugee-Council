// NOTE: For every prepared projectWithFinancials item in the projects array,
// post it to the OpenFn inbox for individual error handling. Now linked to
// both A-L and M-Z fetch jobs.
alterState(state => {
  const interval = 1500;
  var promise = Promise.resolve();
  state.data.projects.forEach(p => {
    promise = promise.then(() => {
      console.log('doing the thing with one financial.');
      const financials = p.financials;
      console.log(
        `Isolating ${p.field2}: project ${p.field1} with ${financials.length} financials.`
      );

      var i,
        j,
        temparray,
        chunk = 1000;

      for (i = 0, j = financials.length; i < j; i += chunk) {
        temparray = financials.slice(i, i + chunk);
        state.data.financials = temparray;
        post('', {
          body: state => {
            return state.data;
          },
        })(state);
      }
      return new Promise(function(resolve) {
        setTimeout(resolve, interval);
      });
    });
  });
  return state;
});
