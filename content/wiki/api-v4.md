---
title: cState API v4 (outdated)
---

## This is the API page for the version 4 of cState (API Version `1.0.0`). For other versions, [view the updated page](https://github.com/cstate/cstate/wiki/API)

**The read-only API is available starting from version 4.**

* Information is delivered in JSON (RFC 4627).
* All links will end in `/index.json`.
* The Content-Type header is: `application/json; charset=utf-8`.
* The output may not always be clean (you may see empty lines, commas on the next line for no reason, and so forth). This is because the JSON is generated similarly to a HTML page (but with the right headers and so forth). At the time of writing, there is no obvious fix to this problem.
* The status will basically always respond with 200 - OK.
   * Because cState is static, the only **error code** it can really respond with is 404 - Not Found. If there is an error or mistake in the final JSON, the site will likely just not build, or the value will be `<no value>`, etc.
* This is an experimental feature, but it should work without many glitches.
* Please report bugs, if you catch them!

The code for activating badges and the API (if you are on v4 but started from an earlier version):

```yml
outputs:
  page:
    - html
    - json
  section:
    - html
    - json
    - rss
  home:
    - html
    - json
    - rss
    - svg
```

## Getting basic information and summaries

The homepage URL + `/index.json`

E.g.: https://cstate.mnts.lt/index.json

* Outputs current status
* Outputs many useful config values (title, description, logo link)
* Outputs version of the API
* Outputs version of cState

### Example output

```json





{
  "is": "index",
  "cStateVersion": "4.0",
  "apiVersion": "1.0",
  "title": "Eggsample Status",
  "languageCodeHTML": "en",
  "languageCode": "en",
  "baseURL": "http://localhost:1313/", 
  "description": "We continuously monitor the status of our services and if there are any interruptions, a note will be posted here.",
  "logo": "http://localhost:1313/logo.png",
  "categories": [
    
      {
        "name": "North Coast",
        "description": "The main servers are located here.",
        "hideTitle": false,
        "closedByDefault": true
      }
    ,
      {
        "name": "East Coast",
        "hideTitle": false,
        "closedByDefault": false
      }
    ,
      {
        "name": "Uncategorized",
        "hideTitle": true,
        "closedByDefault": false
      }
    
  ],
  "systems": [
    
      {
        "name": "Gateway",
        "category": "North Coast"
      }
    ,
      {
        "name": "Backup Gateway",
        "category": "East Coast"
      }
    ,
      {
        "name": "API",
        "description": "The guts of the application.",
        "category": "Uncategorized"
      }
    ,
      {
        "name": "Media Proxy",
        "description": "This is the service responsible for serving images, audio, and video. It is reliant on our CDN.",
        "category": "Uncategorized"
      }
    
  ],

  
  "buildDate": "2019-10-06",
  "buildTime": "20:46",
  "buildTimezone": "EEST",
  "summaryStatus":
  
    "disrupted",
  
  "colorBrand": "0a0c0f",
  "colorOk": "008000",
  "colorDisrupted": "cc4400",
  "colorDown": "e60000",
  "colorNotice": "24478f",
  "alwaysKeepBrandColor": "true",

  "googleAnalytics": "UA-00000000-1"
}
```

## Getting an issue

Add `/index.json` to the end of the URL. For example, if you have a permalink like this: `http://localhost:1313/issues/2018-05-25-us-east-conn-issues/` it’ll be `http://localhost:1313/issues/2018-05-25-us-east-conn-issues/index.json`.

You will then be shown the `.Content` and essential frontmatter information.

### Example output

```
{
  "is": "issue",
  "title": "Testing New cState Features",
  "createdAt": "2019-10-04 18:05:00 +0000 UTC",
  "permalink": "http://localhost:1313/issues/2019-10-04-testing-cstate-functions/",
  "severity": "<no value>",
  "resolved": "<no value>",
  "informational": "true",
  "resolvedAt": "2019-10-04 18:05:00",
  "affected": [],
  "filename": "2019-10-04-testing-cstate-functions.md",
  "body": "\u003cp\u003eThere is a new feature in cState version 4 that lets you make what are called \u003cem\u003einformational\u003c/em\u003e posts. The main difference is that there will be no \u003cem\u003eUnresolved\u003c/em\u003e or \u003cem\u003eResolved in under a minute\u003c/em\u003e text on the pages.\u003c/p\u003e\n\n\u003cp\u003eThis is essentially a page with a date and title.\u003c/p\u003e\n"
}
```

## Getting a regular page

Link of the page + `/index.json`

E.g.: https://cstate.mnts.lt/pages/example-page/index.json

### Example output

```
{
  "is": "page",
  "title": "Example Page",
  "createdAt": "0001-01-01 00:00:00 +0000 UTC",
  "filename": "example-page.md",
  "permalink": "http://localhost:1313/pages/example-page/",
  "body": "\n\n\u003ch1 id=\"title-here\"\u003eTitle here!\u003c/h1\u003e\n\n\u003cp\u003eThis is an example page that demonstrates the capabilities of a Markdown page in cState.\u003c/p\u003e\n\n\u003cp\u003eYou can use HTML if the file extension is \u003ccode\u003e.html\u003c/code\u003e, but this one is \u003ccode\u003e.md\u003c/code\u003e.\u003c/p\u003e\n\n\u003cp\u003eLet us dive in.\u003c/p\u003e\n\n\u003cp\u003eParagraphs are separated by a blank line.\u003c/p\u003e\n\n\u003cp\u003e2nd paragraph. \u003cem\u003eItalic\u003c/em\u003e, \u003cstrong\u003ebold\u003c/strong\u003e, and \u003ccode\u003emonospace\u003c/code\u003e. Itemized lists\nlook like:\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003ethis one\u003c/li\u003e\n\u003cli\u003ethat one\u003c/li\u003e\n\u003cli\u003ethe other one\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eNote that \u0026mdash; not considering the asterisk \u0026mdash; the actual text\ncontent starts at 4-columns in.\u003c/p\u003e\n\n\u003cblockquote\u003e\n\u003cp\u003eBlock quotes are\nwritten like so.\u003c/p\u003e\n\n\u003cp\u003eThey can span multiple paragraphs,\nif you like.\u003c/p\u003e\n\u003c/blockquote\u003e\n\n\u003cp\u003eUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \u0026ldquo;it\u0026rsquo;s all\nin chapters 12\u0026ndash;14\u0026rdquo;). Three dots \u0026hellip; will be converted to an ellipsis.\nUnicode is supported. ☺\u003c/p\u003e\n\n\u003ch2 id=\"an-h2-header\"\u003eAn h2 header\u003c/h2\u003e\n\n\u003cp\u003eHere\u0026rsquo;s a numbered list:\u003c/p\u003e\n\n\u003col\u003e\n\u003cli\u003efirst item\u003c/li\u003e\n\u003cli\u003esecond item\u003c/li\u003e\n\u003cli\u003ethird item\u003c/li\u003e\n\u003c/ol\u003e\n\n\u003cp\u003eNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here\u0026rsquo;s a code sample:\u003c/p\u003e\n\n\u003cpre\u003e\u003ccode\u003e# Let me re-iterate ...\nfor i in 1 .. 10 { do-something(i) }\n\u003c/code\u003e\u003c/pre\u003e\n\n\u003cp\u003eAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\u003c/p\u003e\n\n\u003cpre\u003e\u003ccode\u003edefine foobar() {\n    print \u0026quot;Welcome to flavor country!\u0026quot;;\n}\n\u003c/code\u003e\u003c/pre\u003e\n\n\u003cp\u003e(which makes copying \u0026amp; pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\u003c/p\u003e\n\n\u003cpre\u003e\u003ccode class=\"language-python\"\u003eimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print(i)\n\u003c/code\u003e\u003c/pre\u003e\n\n\u003ch3 id=\"an-h3-header\"\u003eAn h3 header\u003c/h3\u003e\n\n\u003cp\u003eNow a nested list:\u003c/p\u003e\n\n\u003col\u003e\n\u003cli\u003e\u003cp\u003eFirst, get these ingredients:\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003ecarrots\u003c/li\u003e\n\u003cli\u003ecelery\u003c/li\u003e\n\u003cli\u003elentils\u003c/li\u003e\n\u003c/ul\u003e\u003c/li\u003e\n\n\u003cli\u003e\u003cp\u003eBoil some water.\u003c/p\u003e\u003c/li\u003e\n\n\u003cli\u003e\u003cp\u003eDump everything in the pot and follow\nthis algorithm:\u003c/p\u003e\n\n\u003cpre\u003e\u003ccode\u003efind wooden spoon\nuncover pot\nstir\ncover pot\nbalance wooden spoon precariously on pot handle\nwait 10 minutes\ngoto first step (or shut off burner when done)\n\u003c/code\u003e\u003c/pre\u003e\n\n\u003cp\u003eDo not bump wooden spoon or it will fall.\u003c/p\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\n\u003cp\u003eNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\u003c/p\u003e\n\n\u003cp\u003eHere\u0026rsquo;s a link to \u003ca href=\"http://foo.bar\"\u003ea website\u003c/a\u003e, to a \u003ca href=\"local-doc.html\"\u003elocal\ndoc\u003c/a\u003e, and to a \u003ca href=\"#an-h2-header\"\u003esection heading in the current\ndoc\u003c/a\u003e. Here\u0026rsquo;s a footnote \u003csup class=\"footnote-ref\" id=\"fnref:1\"\u003e\u003ca href=\"#fn:1\"\u003e1\u003c/a\u003e\u003c/sup\u003e.\u003c/p\u003e\n\n\u003cp\u003eTables can look like this:\u003c/p\u003e\n\n\u003cp\u003eName           Size  Material      Color\n\u0026mdash;\u0026mdash;\u0026mdash;\u0026mdash;-|\u0026mdash;\u0026ndash;|\u0026mdash;\u0026mdash;\u0026mdash;\u0026mdash;|\u0026mdash;\u0026mdash;\u0026mdash;\u0026mdash;\nAll Business      9  leather       brown\nRoundabout       10  hemp canvas   natural\nCinderella       11  glass         transparent\u003c/p\u003e\n\n\u003cp\u003eTable: Shoes sizes, materials, and colors.\u003c/p\u003e\n\n\u003cp\u003e(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\u003c/p\u003e\n\n\u003chr /\u003e\n\n\u003cp\u003eKeyword   Text\u003c/p\u003e\n\n\u003chr /\u003e\n\n\u003cp\u003ered       Sunsets, apples, and\n          other red or reddish\n          things.\u003c/p\u003e\n\n\u003cp\u003egreen     Leaves, grass, frogs\n          and other things it\u0026rsquo;s\n          not easy being.\u003c/p\u003e\n\n\u003chr /\u003e\n\n\u003cp\u003eA horizontal rule follows.\u003c/p\u003e\n\n\u003chr /\u003e\n\n\u003cp\u003eHere\u0026rsquo;s a definition list:\u003c/p\u003e\n\n\u003cp\u003eapples\u003cbr /\u003e\n  : Good for making applesauce.\u003c/p\u003e\n\n\u003cp\u003eoranges\u003cbr /\u003e\n  : Citrus!\u003c/p\u003e\n\n\u003cp\u003etomatoes\u003cbr /\u003e\n  : There\u0026rsquo;s no \u0026ldquo;e\u0026rdquo; in tomatoe.\u003c/p\u003e\n\n\u003cp\u003eAgain, text is indented 4 spaces. (Put a blank line between each\nterm and  its definition to spread things out more.)\u003c/p\u003e\n\n\u003cp\u003eHere\u0026rsquo;s a \u0026ldquo;line block\u0026rdquo; (note how whitespace is honored):\u003c/p\u003e\n\n\u003cp\u003e| Line one\n|   Line too\n| Line tree\u003c/p\u003e\n\n\u003cp\u003eand images can be specified like so:\u003c/p\u003e\n\n\u003cp\u003e\u003cimg src=\"https://via.placeholder.com/350x150\" alt=\"example image\" title=\"An exemplary image\" /\u003e\u003c/p\u003e\n\n\u003cp\u003eInline math equation: $\\omega = d\\phi / dt$. Display\nmath should get its own line like so:\u003c/p\u003e\n\n\u003cp\u003e$$I = \\int \\rho R^{2} dV$$\u003c/p\u003e\n\n\u003cp\u003eAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: `foo`, *bar*, etc.\u003c/p\u003e\n\u003cdiv class=\"footnotes\"\u003e\n\n\u003chr /\u003e\n\n\u003col\u003e\n\u003cli id=\"fn:1\"\u003eSome footnote text.\n \u003ca class=\"footnote-return\" href=\"#fnref:1\"\u003e\u003csup\u003e[return]\u003c/sup\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003c/div\u003e\n"
}
```