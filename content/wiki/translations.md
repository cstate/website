---
title: Translations for cState
---

> ⁉ Starting with v3.0, cState supports internalization.

## Available translations

You can [view all the available translations by going into the `themes/i18n` folder (just click this link)](https://github.com/cstate/cstate/tree/master/i18n). The file names for each (like `en` or `lt`) show what code you’ll need to use.

> ⚠ If you add a code that doesn’t exist, cState will just not show any text. So don’t do that. It should also be noted that, **translations not optimized for your version may not show all required text.**

## Add your translations

cState is easy to translate.

**YOUR PULL REQUEST WILL NOT BE ACCEPTED UNTIL YOU DO ALL THESE STEPS**

1. Fork the repo.
2. Create a new file in `i18n` and name it after the ISO 639-1 abbreviation (see: [1](https://www.w3schools.com/tags/ref_language_codes.asp) or [2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)). The file extension should be `.yaml`.
3. Copy the contents of the `en.yml` file. The English file is the base.
4. Go to `static/admin/config.yml` and add your language to the `select` field.
5. Now all you need to do is translate all the strings! You can leave strings empty (comment out the whole item with `#`). It’s just YAML. For an example, look at the Lithuanian language file.
6. **Please ask for clarification, if something is not clear.**
7. Make sure to remove `# Official` from the top if you are a one-time contributor and not a maintainer. For new language files, change the comment at the top to the correct language name as well.
8. Now you’re ready to make a pull request **to `dev` branch, not master** [here](https://github.com/cstate/cstate/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

It’s recommended that you provide a way to verify the translations as well.

❤