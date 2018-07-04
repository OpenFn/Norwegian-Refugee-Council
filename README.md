# Norwegian Refugee Council
A Norwegian Refugee Council (https://www.nrc.no/) integration project using
OpenFn.

## Objective
To update PMIS in Salesforce with financial data from Agresso.

## Flow
1. `fetchCSVs` runs daily, connecting to an SFTP site, downloading CSVs, and
parsing those CSVs into JSON. Once the CSVs have been converted to JSON arrays,
the "Fiancials" are mapped onto their parent "Projects" so that we have a single
array of Projects with Financials:
```js
const bigList = [
    {
      name: "Some project",
      startDate: "2018-01-01",
      financials: [
        { cost: 45 },
        { cost: 46 },
      ],
    },
    {
      name: "Some other project",
      startDate: "2017-04-27",
      financials: [
        { cost: 22 },
        { cost: 23 },
      ],
    }
  ];
```
2. `postToInbox` is triggered by the successful completion of `fetchCSVs` and
breaks apart each project, storing it in an OpenFn inbox so that separate runs
can be triggered to Salesforce, providing a cleaner error-handling experience
and allowing for certain project updates to fail while other succeed on a given
day.
