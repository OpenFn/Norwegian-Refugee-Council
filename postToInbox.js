alterState(state => {
  console.log(state);
  return state;
});

// NOTE: For every prepared projectWithFinancials item in the projects array,
// post it to the OpenFn inbox for individual error handling.
each(dataPath('projects[*]'),
  post("", { body: state.data }
));
