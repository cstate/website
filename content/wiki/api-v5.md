---
title: API v5 (current)
---

## Hello

The read-only API is available starting from version 4 of cState. [You can read about v4's API (which is version 1.0.0)](https://github.com/cstate/cstate/wiki/API-v4).

This page is about the latest version of the API, v2.0, for cState v5.
 
* Information is delivered in JSON (RFC 4627).
* All links will end in `/index.json`.
* The Content-Type header is: `application/json; charset=utf-8`.
* The output may not always be clean (some empty lines, commas in weird places, and so forth). This is because the JSON is generated similarly to a HTML page, however. At the time of writing, there is no obvious fix to this problem.
* The status will basically always respond with 200 - OK.
   * Because cState is static, the only **error code** it can really respond with is 404 - Not Found. If there is an error or mistake in the final JSON, the site will likely just not build, or the value will be `<no value>`, etc.
* Please report bugs, if you catch them!

## What's new?

### v2.0

* example.com/index.json (homepage) now shows a system's status and system's unresolvedIssues
* for all issues (is: issue) the informational variable is now a boolean true/false. no more <no value>
* likewise, the resolved variable is no longer a string surrounded by "", but an actual boolean
* added lastmod to issues
* there is generally less whitespace
* added custom tab links to homepage index.json
* reordered to have more important info up top

Along with the release of v2, by default, there should be no more CORS issues (meaning the API is fully usable on other sites and domains).

Add this to your netlify.toml for your site if you don't have it already:

```toml

[[headers]]
    for = "/*.json"
    [headers.values]
      Access-Control-Allow-Origin = "*"
```

Docs: https://docs.netlify.com/routing/headers/#multi-value-headers

## Capabilities

* The homepage URL + `/index.json`
* specific page
* lists



### The homepage URL + `/index.json`

>     * Getting meta information about the website (basic, meta, versions, etc)
>     * Summary of the status and status for each component/system

E.g.: https://cstate.mnts.lt/index.json

### Getting a page (issue or regular page)

>     * Getting content and characteristics of a static page (issue or simple page)

Add `/index.json` to the end of the URL. For example, if you have a permalink like this: `http://localhost:1313/issues/2018-05-25-us-east-conn-issues/` it’ll be `http://localhost:1313/issues/2018-05-25-us-east-conn-issues/index.json`.

You will then be shown the `.Content` and essential frontmatter information.
 
Link of the page + `/index.json`

E.g. with page: https://cstate.mnts.lt/pages/example-page/index.json  
E.g. with issue: https://cstate.mnts.lt/issues/2018-05-25-us-east-conn-issues/index.json

### Lists

>     * Getting a list of a certain type of pages

Homepage URL + `/<LIST>/index.json`

E.g.: https://cstate.mnts.lt/issues/index.json    

E.g.: https://cstate.mnts.lt/affected/API/index.json  