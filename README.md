# Norwegian Refugee Council
A [Norwegian Refugee Council](https://www.nrc.no/) integration project on
[OpenFn](https://www.openfn.org).

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
3. `projectsWithFinancials` executes once per project, based on `postToInbox`.
It updates a project in Salesforce based on the external ID (`Agresso_Unique_ID__c`)
and then queries Salesforce for that project's `sfId`. The `sfId` is required
to populate the relationship field that links Financials to Projects when using
the bulk API. The bulk request upserts multiple financials for that project with
a single API call.
