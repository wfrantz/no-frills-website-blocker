# No Frills Website Blocker

A browser extension template for blocking websites by domain.

## Why it exists

I needed a browser extension for blocking distracting websites and settled on [Impulse Blocker](https://github.com/raicem/impulse-blocker). It worked well, but I wasn't totally comfortable granting the `<all_urls>` permission that Impulse Blocker and so many other extensions require to do their job. So I challenged myself to develop a website blocker with a small codebase that can be easily audited for peace of mind.

## Stuff to know

- This is a template, not a complete extension that can be installed from your browser's add-on repository. You need to customize the hard-coded blocklist or it will only block `example.com`, `example.net`, and `example.org`.

- The extension will block navigation to any URL under a blocked domain, but will not affect any other requests. Consequently, it will not affect embedded content from a blocked domain and cannot be used as an ad blocker.

- Subdomains of domains on the blocklist are always blocked.

- There is a toolbar icon that displays a green circle normally but changes to red (with a descriptive tooltip) on a per-tab basis when a site is blocked. This is the entire user interface.

## Firefox instructions

0. Make sure you're using Firefox Developer Edition or another variant that allows you to install [unsigned extensions](https://wiki.mozilla.org/Add-ons/Extension_Signing). You will have to set `xpinstall.signatures.required` to false in `about:config`.

1. Clone or download this repository and open `manifest.json`. Add an extension ID under the [`browser_specific_settings` key](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings), which is required for permanently installing unsigned extensions in Firefox. It will look something like this:

		"browser_specific_settings": {
		  "gecko": {
		    "id": "your-id-here"
		  }
		}

2. Open `blocked-domains.js` and replace the example domains with whichever domains you want to block, one per line with no delimiters.

3. Create a ZIP file with all the repository files at the top level (i.e. no folders within the archive). Name it anything you want, but change the extension from `zip` to `xpi`. (`build.bat` does this for you if you're on Windows.)

4. Drag and drop your XPI file onto an open Firefox window. Click through the dialogs to confirm the installation.

To update the list of blocked domains, repeat starting from step 2.
