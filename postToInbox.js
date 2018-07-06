// For every prepared projectWithFinancials item in the data array,
// post it to the OpenFn inbox.
each(
  dataPath('data[*]'),
  post('...')
);
