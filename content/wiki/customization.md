---
title: Customizing cState
---
cState can be customized in a number of different ways. Most of the major customization happens in the `config.yml` file (this is the default for Hugo websites).

> 🤔 If not specifically said otherwise, the strings and options in the `config.yml` file **must** be nested under `params`. Take a look at [cstate/example](https://github.com/cstate/example).

## Basic

### Changing site name

The title of your site will show up in `meta` tags, the browser’s title bar, and at the bottom of the footer. It is recommended to add “Status” at the end of your site’s title, so that search engines know this isn’t your main site.

In your website `config.yml` file, change the `title` string. It should **NOT** be nested under `params`.

```yml
# What is your status page called?
# Shows up in the browser bar and meta tags
title: Discord Status
```

### Changing site language

You may change language that is used in the `html[lang]` attribute that bots use to see what language your page uses.

ISO 639-1 defines abbreviations. For references, see: [Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or [w3schools](https://www.w3schools.com/tags/ref_language_codes.asp).

In your website `config.yml` file, change the `languageCode` string. It should **NOT** be nested under `params`.

```yml
# What language is this site using?
# Only alters the html[lang] attribute
#
# ISO 639-1 defines abbreviations.
# See:  https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
# Also: https://www.w3schools.com/tags/ref_language_codes.asp
languageCode: en
```

### Changing site URL

The URL of your site defined in the configuration file will be used internally by Hugo and for links within cState, especially for incidents.

> 💥 **cState & Hugo don’t support `/` in production use.** It will break RSS feeds and breaks permalinks since version 3. A proper `baseURL` is necessary for production use.

In your website `config.yml` file, change the `baseURL` string. It should **NOT** be nested under `params`.

```yml
# What is the hostname or path to the root?
# Where is the site hosted?
#
# Example: https://status.example.com/
baseURL: https://cstate.mnts.lt
```

### Changing site description

You can choose to use a different description for the footer and `meta` tags that search engines and social media crawlers use.

In your website `config.yml` file, change the `description` string.

```yml
# This is the description that is shown
# in the footer and meta tags.
#
# Default: We continuously monitor the status of our services and if there are any interruptions, a note will be posted here.
description: We continuously monitor the status of our services and if there are any interruptions, a note will be posted here.
```


### Tabs

You can add extra tabs below the main homepage summary, for example, to external sites, monitoring services, as shown in the example below.

```yml
# Tabs on homepage
customTabs:
 - name: Monitoring
   link: https://example.com/monitoring.php
```

### Google Analytics

By default, cState does not use Google Analytics. If you choose to use it, you may change the placeholder code below to your own and thereby enable the tracking service. If you set the value back to the placeholder default, the code will once again be removed.

In your website `config.yml` file, change the `googleAnalytics` string.

```yml
# Google Analytics tracking code
#
# By default, cState does not use
# Google Analytics. If you choose
# to use it, you may change the
# placeholder code below to your
# own and thereby enable the
# tracking service.
#
# To disable the analytics, change
# the value to the default:
#
# Default: UA-00000000-1
googleAnalytics: UA-00000000-1
```

### Disable complex calculations *(v4.1)*

This is part of a feature set that encourages accountability and open data analysis:

- Systems ("/affected/") page. The first 5 issues that have a positive `.Params.resolved` attribute (meaning, the issue is not in the process of being fixed) will only be factored into the calculation.

In your website `config.yml` file, change the `disableComplexCalculations` boolean (use `true` or `false`).


```
  # Disable complex server-side
  # calculations that may impact
  # your build performance
  #
  # Disables math calculations
  # for average downtime on
  # systems ("/affected/") pages
  #
  # Default: false
  # BOOLEAN; `true`, `false`
  disableComplexCalculations: false
```



### Hiding incident history **(v4.2)**

In your website `config.yml` file, change the `disableIncidentHistory` boolean (use `true` or `false`).

```yaml
  # Should incident history be hidden?
  #
  # By disabling the incident history, you also disable
  # the RSS feed. To ensure no incidents are shown, you
  # should delete them after they are resolved. This option
  # overrides any other options that tailor your incident
  # history’s look.
  #
  # Default: `false`
  # BOOLEAN; `true`, `false`
  disableIncidentHistory: false
```


### Auto-refresh *(discontinued)*

Introduced in `v2-rc1`, you can choose to enable auto page reloading. This does nothing but refresh the page; it does not send alerts! However, it may still be useful and cause users to refresh less.

The refresh rate is hard-locked at about 5 minutes (270 seconds). Typically, after 5 minutes of inactivity, some browsers may put the tab to sleep.

In your website `config.yml` file, change the `autoRefresh` boolean (use `true` or `false`).

**Auto refresh was removed in version 4.0.0 due to it not working most of the time as intended.**

```
# Auto refresh the page
# every ~5 min
#
# This does nothing but
# refresh the page; it
# does not send alerts!
#
# Default: true
# BOOLEAN; `true`, `false`
autoRefresh: true
```

## Time



### Relative time _(v5.0)_

Relative time shows x min ago instead of a date.
 
**IMPORTANT**: In the frontmatter, the dates MUST be in the UTC time zone for this to work preperly. If you use Netlify CMS, all good — the CMS picks UTC time by default. Otherwise, there may be very inaccurate times if multiple time zones are in your issue files.

**FOR YOUR CONSIDERATION**: This feature was introduced in v5. It may be a breaking change in the case when you wish to use relative time but old issues do not have UTC time (and therefore are out of sync by ±24 hours)

**If you have relative time turned on, date formats will not be shown EXCEPT for cases where the user has disabled JavaScript or relative time cannot be shown due to other reasons (i.e. the default `track` shortcode as of v5.0.0 does not use relative time).**

In your website `config.yml` file, change the `useRelativeTime` boolean (use `true` or `false`).

```yml
  # Should relative time (x min ago) be used?
  #
  # IMPORTANT: In the frontmatter, the dates MUST be in
  # the UTC time zone for this to work preperly. If you 
  # use Netlify CMS, all good — the CMS picks UTC time
  # by default. Otherwise, there may be very inaccurate
  # times if multiple time zones are in your issue files.
  #
  # FOR YOUR CONSIDERATION: This feature was introduced in
  # v5. It may be a breaking change in the case when you
  # wish to use relative time but old issues do not have
  # UTC time (and therefore are out of sync by ±24 hours)
  #
  # Read the wiki for more: 
  # https://github.com/cstate/cstate/wiki/Customization#time 
  #
  # If enabled, will display relative times in places like
  # the incident history and summaries instead of using
  # dateFormat and shortDateFormat (except for if you use
  # the old shortcode).
  #
  # Default: `true`
  # BOOLEAN; `true`, `false`
  useRelativeTime: true
```

### Skip seconds _(v5.0)_

Another option alongside `useRelativeTime` is `skipSeconds`. This option is irrelevant if you are not using relative time.

> With option ON (true): "Last checked <1 min ago"
>
> With option OFF (false; default): "Last checked 20s ago"

In your website `config.yml` file, change the `skipSeconds` boolean (use `true` or `false`).


```yml
  # If enabled, doesn't show seconds on relative times.
  #
  # With option ON (true):
  # "Last checked <1 min ago"
  #
  # With option OFF (false; default):
  # "Last checked 20s ago"
  #
  # Default: `false`
  # BOOLEAN; `true`, `false`
  skipSeconds: false
```

### Changing date formats _(v3.0)_

You can choose to use a different date format for issues and other parts of cState.

**If you have relative time turned on, date formats will not be shown EXCEPT for cases where the user has disabled JavaScript or relative time cannot be shown due to other reasons (i.e. the default `track` shortcode as of v5.0.0 does not use relative time).**

The default thus, in v5, has changed to include "UTC" at the end.

*Please follow Golang/Hugo standards for this date format:* [docs](https://gohugo.io/functions/format/#hugo-date-and-time-templating-reference).

In your website `config.yml` file, change the `dateFormat` and `shortDateFormat` values accordingly.

```yml
# What date format to use?
#
# Hugo formatting docs:
# https://gohugo.io/functions/format/#hugo-date-and-time-templating-reference
#
# Technical: GOLANG/HUGO .Date.Format & dateFormat
#
# dateFormat Default: “January 02, 2006 at 3:04 PM”
# shortDateFormat Default: “15:04 — Jan 2"
dateFormat: January 2, 2006 at 3:04 PM
shortDateFormat: 15:04 — Jan 2
```

### Last modified _(v5.0)_

In version 2 of the API, there is a `lastMod` string. The date seems to be calculated based on Git data.

This information is currently only accessible through the API, but you can add it to a template manually with `{{ .Lastmod }}`.

**Make sure `enableGitInfo` is enabled. It is on all new sites from v5.**

```
# For features like Last modified, you
# need to use a Git repository. If you
# are using Netlify, you are already
# using Git (with GitHub, GitLab, etc)
#
# So, should Git information be used
# for this website?
#
# We recommend to keep this at `true`.
# BOOLEAN; `true`, `false`
enableGitInfo: true
```

Further reading:

* https://discourse.gohugo.io/t/rendering-lastmod-date/13968
* https://mertbakir.gitlab.io/hugo/last-modified-date-in-hugo/
* https://discourse.gohugo.io/t/adding-last-modified-git-status-to-pages/25402


## Systems

A very core part of cState is the components you have on your status page. They are defined much like custom tabs and can be changed from your site’s `config.yml` file.

Each component has 3 possible values (or 4, starting with version 4), all are caps and space sensitive:

```yml
  - name: Backup Media Proxy
    displayName: Media Proxy
    category: Backup Systems
    description: This is the service responsible for serving images, audio, and video. It is reliant on Fastly.
    partial: custom/metrics
```

`name`. This is the name of the component. *(required)*  
`category`. This is what category the component belongs to. You only need to define the name. Again, caps and space sensitive. More information about categories down below. **This is required, starting with version 4.** You can simply add “Uncategorized”, if you so wish.  
`description`. If the name of the component can cause some confusion, or you just want to provide extra information, you can add a description, which will be shown once a user hovers over the question mark icon.  
`partial`. If you wish to add custom HTML to the component, you can define a partial name & location, which will be used for that component.  
`displayName`. Added in v4.1, if you have components with similar names under multiple categories, you may wish to display _API_ for two separate categories instead of _API A_ and _API B_. This is purely cosmetic — it changes the name of the system on the home page. [Learn more](https://github.com/cstate/cstate/issues/98)

Here is what the final result should look like on pages on or after v4:

```yml
# These are your systems. Change them to
# change the amount of components.
#
# For help, see the wiki:
# https://github.com/mistermantas/cstate/wiki/Customization
systems:
  - name: Gateway
    category: Uncategorized
  - name: API
    description: The guts of the application.
    category: Uncategorized
  - name: Media Proxy
    description: This is the service responsible for serving images, audio, and video. It is reliant on Fastly.
    partial: custom/metrics
    category: Uncategorized
```

Here is what the final result should look like on pages prior to v4:

```yml
# These are your systems. Change them to
# change the amount of components.
#
# For help, see the wiki:
# https://github.com/mistermantas/cstate/wiki/Customization
systems:
  - name: Gateway
  - name: API
    description: The guts of the application.
  - name: Media Proxy
    description: This is the service responsible for serving images, audio, and video. It is reliant on Fastly.
    partial: custom/metrics
```

## Categories *(v4.0)*

Categories must be defined starting with version 4. Categories are defined much like the systems on your status page itself and can be changed from your site’s `config.yml` file.

Each category has 4 possible values, the name is caps and space sensitive:

```yml
  - name: Backup Network
    description: The backup network for the European market.
    closed: false
    untitled: false
```

`name`. This is the name of the category. *(required)*  
`description`. If the name of the component can cause some confusion, or you just want to provide extra information, you can add a description, which will be shown once a user hovers over the question mark icon.  
`closed`. That would collapse the category upon first load and the user can expand by clicking on the category. This feature requires JavaScript, if the browser does not have it enabled, then the category will be shown nonetheless. Default is `false`. *(boolean)*
`untitled`. This would complerely hide the name of the category. This is useful, if you do not want to use categories because you need to set an ‘Uncategorized’ category. Or it can be used alongside other categories. Default is `false`. *(boolean)*

Categories are shown in the order that you define in this config file.

## Design

### Changing header

The default header can be changed in a number of different ways. If you wish, you may replace the header entirely by using the custom HTML feature. however, that feature is only meant to be used by developers, looking for extra control.

#### Height / size

The header can be large or small in height. A large header has a large, centered logo and a small header has a smaller, left-aligned logo.

In your website `config.yml` file, change the `useLargeHeaderDesign` boolean (use `true` or `false`).

```yml
# What header design should we use?
# Default: true
# BOOLEAN; `true`, `false`
useLargeHeaderDesign: false
```

#### Title / logo

The header can have a logo. You may enable or disable this feature, leaving only the title of the status page present on the header.

In your website `config.yml` file, change the `useLogo` boolean (use `true` or `false`).

```yml
# Should we show a logo or the title
# of the status page?
#
# Default: false
# BOOLEAN; `true`, `false`
useLogo: false
```

You can also define where the logo is located. By default, it is at the root of your website (`/logo.png`).

All static files, like media, should be housed within the `static` folder (of your site, not the cState theme). More information is available on the “File storage” section of these docs.

*We recommend using png for best quality images. You may also use bmp, jpg, or gif files for the best possible browser compatability.*

```yml
# Where is the logo located, if one is
# present at all?
#
# Recommended: png is best used for
# images like logos.
#
# Recommended: png, bmp, jpg, or gif
# for best browser support!
logo: /logo.png
```

#### Site title text color *(v4.0.1)*

In your website `config.yml` file, change the `.Params.headerTextColor` string.

```yml
  # Introduced in v4.0.1 for consistent
  # site title text color.
  #
  # If you do not use the logo, what color
  # should the site text color be?
  #
  # Removing this option will not force
  # any site text color. This is likely
  # unwanted behavior.
  #
  # Default: `white`
  # STRING; `white`, `black`, or nothing
  headerTextColor: white
```

### Color

Colors used throughout cState can be changed from your website config `config.yml`.

* For versions 4 and up
  * You can use any color: `rgb(), rgba(), hsl(), HEX`. We recommend using HEX codes. They are also the default and well-supported. You must add the `#` mark. This behavior was changed to [prevent bugs with Netlify CMS and parsing](https://github.com/cstate/cstate/issues/83).
* For version 3 and below
  * This array of colors only accepts HEX values without the `#` sign.

Here is where these colors are used:

+ `brand` color shows up on the header & on buttons
+ `ok` signifies operational status
+ `warning` signifies disrupted status
+ `down` signifies major downtime
+ `notice` signifies something that should be accounted for (like maintenance)

> 🧐 Do note that all the colors should be put in quotes: `""`. Otherwise, they [may not be outputted properly](https://github.com/cstate/cstate/issues/53).

By default these colors are picked for best contrast, readability, and accessibility.

v4 and up:

```
  # Colors throughout cState
  #
  # We recommend using HEX
  # (with the # symbol).
  #
  # Defaults:
  #
  # brand: "#0a0c0f"
  # ok: "#008000"
  # disrupted: "#cc4400"
  # down: "#e60000"
  # notice: "#24478f"
  brand: "#0a0c0f"
  ok: "#008000"
  disrupted: "#cc4400"
  down: "#e60000"
  notice: "#24478f"
```

Before v4:

```yml
# Colors throughout cState
#
# Defaults:
#
# brand: “0a0c0f”
# ok: “008000"
# warning: “cc4400"
# down: “e60000"
# notice: “24478f”
brand: “0a0c0f”
ok: “008000"
disrupted: “cc4400"
down: “e60000"
notice: “24478f”
```

In addition, you may choose whether the brand color should stay unchanged once there are disruptions or outages.

In your website `config.yml` file, change the `alwaysKeepBrandColor` boolean (use `true` or `false`).

```yml
# If the status page shows that
# there are disruptions or outages
# happening, should it keep the
# brand header color or drop it
# and use the status indication
# colors that were just defined?
#
# Default: true
# BOOLEAN; `true`, `false`
alwaysKeepBrandColor: true
```

### Incidents per page

On the homepage / incidents page, how many posts should be shown at once until your users see pagination (the “previous” and “next” links). Obscenely high amounts of incidents on the homepage may lead to decreased performance, however, Hugo has shown great performance dealing with thousands of posts, so this will mostly impact the user experience more than anything.

In your website `config.yml` file, change the `incidentPostsPerPage` numeric value (it must be an integer like `1`, `5`, or `20`).

```yml
# Incident posts shown
# in one page
#
# NUMERIC; Default: `10`
incidentPostsPerPage: 10
```

### Enable sorting / archives by year or month _(v4.0)_

![Screenshot](https://user-images.githubusercontent.com/11616378/66257961-2e5ed680-e7a8-11e9-90af-c06239c44db5.png)

We can check what month or year an issue falls under and sort the issue list so you see what month or year issues fall on more clearly than before. The sections can be linked to like this: https://cstate.mnts.lt/#2019

**Enabling this option disables pagination.**

You can disable sorting by putting in the value `none`.

In your website `config.yml` file, change the `incidentHistoryFormat` value accordingly.

```yml
  # Should incident history be separated
  # like in an archive view?
  #
  # Note: This WILL disable pagination.
  #
  # Default: `yearly`
  # STRING; `monthly`, `yearly`, `none`
  incidentHistoryFormat: "yearly"
```

### Dark mode *(v4.0)*

![image](https://user-images.githubusercontent.com/11616378/70861236-cceb7e80-1f33-11ea-9400-508ce6c11eda.png)

If your OS and browser support dark / night mode, specifically `prefers-color-scheme`, cState will automatically enable a dark UI. At the time of release, this has been tested on and works for:

* Windows 10 — Chrome
* iOS 13 — Safari
* Android 9 (Samsung Galaxy S10) — Android (with certain flags)

By default the `.Params.disableDarkMode` boolean is set it to `false`.

In your website `config.yml` file, change the `disableDarkMode` boolean (use `true` or `false`).

```yml
  # Disable dark mode
  #
  # If your OS and browser support the
  # `prefers-color-scheme` media query,
  # cState will automatically switch to
  # a darker user interface.
  #
  # cState uses its built-in colors for
  # most of the interface to ensure
  # a good user experience.
  #
  # Default: false
  # BOOLEAN; `true`, `false`
  disableDarkMode: false
```

Dark mode uses built-in hard coded colors to ensure contrast and legibility. They can be changed with custom CSS.

## Developer

### File storage

All static files, like media, should be housed within the `static` folder (of your site, not the cState theme).

cState is distributed like this:

```
archetypes/
exampleSite/
images/
layouts/
static/
```

*You should never modify any of the cState core.* Instead, you should have a folder structure similar to this:

```
content/
themes/
    cstate/
       …
layouts/
static/
```

This way, you can keep cState separate from your own content and your own site modifications.

To read more about how Hugo handles folder structure, [visit their docs](https://gohugo.io/getting-started/directory-structure/).

### Custom HTML

After its introduction in version 2.0, custom HTML support has been very fleshed out, allowing the addition of any kind of code in many places, without altering the cState core.

**Make sure `Site.Params.enableCustomHTML` is true. Add (if it's not there already) `enableCustomHTML: true` under the `Params:` tree.**

#### Where custom HTML can be added

***

##### `<head>`

You can add meta tags, custom styling, and any other type of HTML that should be loaded as soon as possible and hidden from the user.

> This file should be housed inside your website directory: `layouts/partials/custom/meta.html`.

```html
    …
    </style>
    {{ partial “custom/meta” . }}
  </head>
```

##### Above or below `<div class="header">`

You can custom scripting & styling and any other type of HTML that should be shown below or above the default header.

> These files should be housed inside your website directory:
> + `layouts/partials/custom/above-header.html`
> + `layouts/partials/custom/below-header.html`

##### Above or below `<div class="footer">`

You can custom scripting & styling and any other type of HTML that should be shown / loaded last.

> These files should be housed inside your website directory:
> + `layouts/partials/custom/above-footer.html`
> + `layouts/partials/custom/below-footer.html`

##### Bottom of `<div class="summary">`

You can add custom metrics and any other type of HTML that should be shown below the components.

> This file should be housed inside your website directory: `layouts/partials/custom/summary.html`.

***

#### Replacing other partials

> This is a potentially destructive action. **Do not attempt to do this unless you are a somewhat knowledgeable developer.**

Every file in the cState core under `layouts` can be overwritten from your own website’s `layouts` folder. This can be useful, for example, when you want to replace the header or footer.

It is recommended that you use the built-in options or [request a feature](https://github.com/mistermantas/cstate/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) instead, however.