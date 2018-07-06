// For every prepared projectWithFinancials item in the data array,
// post it to the OpenFn inbox.
each(
  dataPath('data[*]'),
  post('...')
);

// Add some notes here, finish today.
