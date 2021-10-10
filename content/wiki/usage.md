---
title: Usage
---

cState is a powerful status page software. Here is how you can use it.

## Install & upgrade

The [README](https://github.com/mistermantas/cstate/blob/master/README.md) has information on how to set up and upgrade your instance of cState.

For this tutorial, it assumed that you have set up your site like this:

```
content/
  issues/
    test-issue.md
  pages/
    example-page.md
layouts/
static/
  logo.png
themes/
  cstate/
    ...
config.yml
```

The cState core is housed under the `cstate/` directory and synced with this repository.

**Requirements differ by version (they are listed in the README) and you [can also look at migration guides](https://github.com/cstate/cstate/wiki/Usage#Migration-guides)**


## Altering configuration file

The `config.yml` is just a text document like any other and it [follows the standard YAML rules](https://codebeautify.org/yaml-validator).

If you do not like spoopy files, use Netlify CMS. See [how to enable it here](https://github.com/cstate/cstate/wiki/Usage#netlify-cms).

## Adding or editing pages

In the `content/pages` folder, you can add a page like any other. It will not be related or connected to the issues. This is good for things like About pages. Here is what `content/pages/example-page.md` looks like:

```md
—
title: Example Page
description: This is an example page that demonstrates the capabilities of a Markdown page in cState.
—

Title here!
===========

This is an example page that demonstrates the capabilities of a Markdown page in cState.

You can use HTML if the file extension is `.html`, but this example one is `.md`.
```

Netlify CMS has a tab for creating and editing Pages.

## Creating incidents (method 1)

Incidents are simply Markdown files (like `test-issue.md`) that are under `content/issues/`. They are formatted in such a way that cState can recognize the inputted data and generate your status page appropriately.

### Who this is for

If you are more technically inclined or do not want to be tied to a freemium CMS/specific hosting, with this method you can:

* Edit files on your own computer as with any text file
* Edit on GitHub.com, GitLab.com, or similar (assuming the site is built by GitLab Pages, Netlify, Vercel, etc)

### Creating issue files

So, if you want to add a new issue, you will create a file such as `major-us-east-outage.md` then set it up with the right data, like this:

```md
—
title: Major outage in East US
date: 2017-02-30 14:30:00
resolved: true
resolvedWhen: 2017-02-30 16:00:00
severity: down
affected:
  - API
section: post
—

*Monitoring* - After hitting the ole reboot button Example Chat App is now recovering. We’re going to continue to monitor as everyone reconnects. {{/*< track "2018-04-13 16:50:00" >*/}}

*Investigating* - We’re aware of users experiencing unavailable guilds and issues when attempting to connect. We’re currently investigating. {{/*< track "2018-04-13 15:54:00" >*/}}
```

Time to break that down.

`title`: This is the one of the most important parts of an incident. *(required)*  
`date`: An ISO-8601 formatted date. Does not include time zone. This is when you first discovered the issue. *(required)*  
`resolved`: Whether issue should affect overall status. Either `true` or `false`. *(boolean, required)*  
`resolvedWhen`: An ISO-8601 formatted date. Does not include time zone. This is when downtime stopped. You may set the time that downtime ended without completely resolving the issue (thus leaving time for monitoring).  
`severity`: If an issue is not resolved, it will have an applied severity. There are 3 levels of severity: `notice`, `disrupted`, and `down`. If there are multiple issues, the status page will take the appearance of the more drastic issue (such as `disrupted` instead of `notice`). *(required)*  
`affected`. Add the items that were present in the config file which should alter the status of each individual system (component). *(array, required)*  
`section`. This must be `issue`, so that Hugo treats it as one. *(required)*  
`informational`. Makes issue look more like a blog post and removes any references to downtime length. *(boolean, v4 onwards)*  

You may have also noticed that all this data is encapsulated within the bounds of three dashes `---`. Underneath that is some space for Markdown-formatted text. This is where you can detail the issue at hand and update your users on the status of the issue.

Apart from obvious Markdown formatting (like `*italic*, **bold**), you can also embed dates using this shortcode: `{{/*< track "2018-04-13 15:54:00" >*/}}`. That is an ISO 8601 date. Keep in mind that you must define seconds. **PLEASE REMOVE THE SLASH AND STAR AFTER THE SQUARE BRACKETS. SEE [EXAMPLE ON GITHUB WIKI HERE](https://github.com/cstate/cstate/wiki/Usage#creating-incidents-method-1)**

## Creating incidents (method 2)

All that may seem daunting, as it requires you to push the changed Git repository to GitHub, GitLab, or whatever else you are using.

With tools that provide a CMS-like UI, creating issues can be less of a pain.

### Forestry.io

[Forestry](https://forestry.io/) is a great alternative to Netlify CMS as it offers a much smoother UI and login experience. It is not completely free, however.

[Read more about setup here](https://forestry.io/docs/quickstart/configure-cms/) and contact Forestry for support; as of v5 cState does not officially have default Forestry CMS files, but it works absolutely fine if you edit the fields you wish to use!

### Netlify CMS

1. Deploy cState on Netlify as per the production instructions on the README.
2. Enable **Identity**.
3. Make sure **Invite only** is checked in Identity's settings. (Unless you need more than 5 people on the free plan, see note 1.)
4. Enable **Git Gateway** and generate an access token for your cState repo. (You might want to enable SSO login, like with GitHub or Google, see note 2.)
5. Go back to the main Identity screen and click **Invite users**. Send yourself an email.
6. From here on out, you should get a link like this: `https://status.example.com/#invite_token=AKdyV8eXVInNXaWQ5mq1v6`. **While later versions automatically redirect you with this link, if you have JavaScript turned off, or are using an older version, or the link just doesn't work, add `/admin/` so that it looks like this: `https://status.example.com/admin/#invite_token=AKdyV8eXVInNXaWQ5mq1v6`** Now — setup your account!

**This is it** — the next time you go to `/admin`, you’ll be able to create / manage issues.

> 💡 As discussed in issue [#62](https://github.com/cstate/cstate/issues/62), email templates cannot be overriden by default. However, if in the Netlify Identity UI, you set the email templates to point to `netlify/confirmation.html`, `netlify/recovery.html`, `netlify/change.html`, and `netlify/invite.html`, all new users will receive the correct link every time, with JavaScript enabled or disabled. But Netlify CMS only works with JavaScript, so. Just a footnote.

##### Notes

1. The default version of Identity supports 5 invite only admins. This might not be enough — you can choose to allow anyone to sign up and restrict people by roles. So, if you want 10 admins, you can choose to setup an **Admin** role and give it out that way. The obvious downside of this is that anyone can sign up by going to `/admin`, albeit without any permissions. You may also consider paying to Netlify for Identity’s services to up your member quota.
2. It’s also worth mentioning that Netlify Identity, at the time of writing, supports single sign on for quick logins with services like GitLab, GitHub, BitBucket, and even Google. SSO is typically easier to set up than an email and password.

## Setting up monitoring

cState does not have monitoring built-in at this point in time. It is supposed to be a hub for getting up to date information about downtime and analyzing it. You may use a free service such as [Uptime Robot](https://uptimerobot.com) to track uptime and link to their monitoring tools with [custom tabs](https://github.com/mistermantas/cstate/wiki/Customization#tabs).

**However, [our community has something that might work for you — see this discussion](https://github.com/cstate/cstate/issues/124) and [this one](https://github.com/cstate/cstate/issues/198) for your options.**

If you use another monitoring tool that has a small embed, you can also use [custom HTML partials on the systems](https://github.com/mistermantas/cstate/wiki/Customization#systems) to add monitoring right under the title of the component.

[CF Workers has a monitoring site tool you can use for free.](https://github.com/eidam/cf-workers-status-page)

Just keep in mind that on the free plan you have to change the wrangler.toml and CRON to ping the servers, at most, every 2 minutes.

https://github.com/eidam/cf-workers-status-page#workers-kv-free-tier

## Migration guides

**How can I see what version of cState I have?**  

Starting with v3, the version is displayed in the web developer tools, specifically the console (if you have JavaScript on). You can see that by pressing F12, or Ctrl+Shift+I, or right clicking and clicking Inspect Element. For those without access to JavaScript, you can view the source of the homepage — the version should be displayed in the `meta[generator]` head tag. Ctrl+F "generator" or "cState" and you should find the version there. In addition, with v4 you can also see the version from the [API index](https://github.com/cstate/cstate/wiki/API) which is easy to access with a link from anywhere,  even mobile.

### v4 to v5

[See here](https://github.com/cstate/cstate/pull/151)

### v3 to v4

> 🚸 We always recommend **making a backup.** You are probably using GitHub, which is in its own a sort of backup system, but for your sanity a backup might help, especially if you are a beginner.

1. Update cState [like normal](https://github.com/cstate/cstate#updating-). Basically, the `themes/cstate` directory where the cState submodule is, should be up to date.
2. **UPDATE YOUR `config.yml` ACCORDINGLY OR CSTATE WILL NOT WORK AS EXPECTED.**

* Colors in your `config.yml` should now have the `#` mark. [Read more](https://github.com/cstate/cstate/wiki/Customization#color)

Example:

```yaml
params:
  brand: "#0a0c0f"
  ok: "#008000"
  disrupted: "#cc4400"
  down: "#e60000"
  notice: "#24478f"
```

* Every system/component must have a category now, regardless whether or not you want them.
  * [Click here, if you want to use categories.](https://github.com/cstate/cstate/wiki/Customization#categories-v40)
  * If you do not need them, for each system/component add `category: Uncategorized`, and add this bit of code to your `config.yml` file:

```yaml
params:
  categories:     
    - name: Uncategorized
      untitled: true
```

The end result looks like this:

```yaml
params:
  categories:
    - name: Uncategorized
      untitled: true
  systems:
    - name: Website
      category: Uncategorized
```

* To enable the [API](https://github.com/cstate/cstate/wiki/API), add:

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
```

Remember: cState is static, so the API is read-only. Nobody can push unwanted changes to your status page.

3. Consider whether you want to enable or disable any of the new features, such as: dark mode, archival type incident history views, informational posts.
4. Try serving your page locally with `hugo serve`.
5. If everything works, push the changes to your Git server (probably GitHub): `git add -A; git commit -m "Update cState"; git push origin master; exit`.



### v2 to v3

> ⚠ **The minimum Hugo version is now `0.48`.** A new version of Go brings variable overwrites, which may be used in parts of cState in the future.

1. Update cState like normal.
2. Make sure your `baseURL` is **NOT A SLASH IN A PRODUCTION**. Moving forward, if the `baseURL` is not properly defined, RSS and other functionality may not be supported, as well as cause unexpected behavior.
3. Add some values to your `config.yml` file to enable new functionality and ensure compatability:

Add `defaultContentLanguage` & `preserveTaxonomyNames` to the very bottom of the config file as well as a `taxonomies` object:

```yml
defaultContentLanguage: en

preserveTaxonomyNames: true

taxonomies:
  affected: affected
```
