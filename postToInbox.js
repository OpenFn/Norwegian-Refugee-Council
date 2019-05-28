// NOTE: For every prepared projectWithFinancials item in the projects array,
// post it to the OpenFn inbox for individual error handling. Now linked to
// both A-L and M-Z fetch jobs.
each(dataPath('projects[*]'),
  post("", { body: state => {
    return state.data;
  }}
));
