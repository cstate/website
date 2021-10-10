---
title: Integrating cState Badges or Shields
---

In v4.1, a cState badge is available at `baseURL.example.com/index.svg`.

Inspired by shields.io, suggested by [cbergmann](https://github.com/cstate/cstate/issues/91).

Add the following to your `config.yml`:

```yaml
outputFormats:
  svg:
    isPlainText: true
    mediaType: image/svg+xml
```

Change your API code to this:

```yaml
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

(Key bit is the `svg`.)