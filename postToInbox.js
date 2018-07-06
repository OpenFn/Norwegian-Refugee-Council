alterState(state => {
  console.log(state);
  return state;
});

// For every prepared projectWithFinancials item in the data array,
// post it to the OpenFn inbox.
each(
  dataPath('data[*]'),
  post("https://www.openfn.org/inbox/a507d61b-7d3c-44a4-a637-56cc9eca504c", {
    body: state.data,
    headers: { "content-type": "json" },
  })
);
