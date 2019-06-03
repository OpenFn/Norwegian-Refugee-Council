// NOTE: For every prepared projectWithFinancials item in the projects array,
// post it to the OpenFn inbox for individual error handling. Now linked to
// both A-L and M-Z fetch jobs.
each(
  dataPath("projects[*]"),
  alterState(state => {
    const financials = state.data.financials;
    console.log(
      `Isolating ${state.data.field2}: project ${state.data.field1} with ${
        financials.length
      } financials.`
    );

    var i,
      j,
      temparray,
      chunk = 1000;

    for (i = 0, j = financials.length; i < j; i += chunk) {
      temparray = financials.slice(i, i + chunk);
      state.data.financials = temparray;
      post("", {
        body: state => {
          return state.data;
        }
      })(state);
    }

    return state;
  })
);