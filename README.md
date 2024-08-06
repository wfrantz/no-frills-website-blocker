# No Frills Website Blocker

A browser extension template for blocking websites by domain.

## Why it exists

I needed a browser extension for blocking distracting websites and settled on [Impulse Blocker](https://github.com/raicem/impulse-blocker). It worked well, but I wasn't totally comfortable granting the `<all_urls>` permission that Impulse Blocker and so many other extensions required to do their job at the time. So I challenged myself to develop a website blocker with a small codebase that can be easily audited for peace of mind.

(Update: Some years later, Manifest V3 allows for blocking requests without granting any host permissions at all. I've updated No Frills Website Blocker to take advantage of this.)

## Stuff to know

- This is a template, not a complete extension that can be installed from your browser's add-on repository. You need to customize the hard-coded blocklist or it will only block the example domains.

- The extension will block navigation to any URL under a blocked domain, but will not affect any other requests. Consequently, it will not affect embedded content from a blocked domain and cannot be used as an ad blocker.

- Subdomains of domains on the blocklist are always blocked.

## Building and installation

Make sure you're using Firefox Developer Edition or another variant that allows you to install [unsigned extensions](https://wiki.mozilla.org/Add-ons/Extension_Signing). You will have to set `xpinstall.signatures.required` to false in `about:config`. Vanilla Chromium usually (?) supports persistently installing unsigned extensions in developer mode--YMMV for other Chromium-based browsers. You'll also need to have Node JS installed.

1. Open `blocked-domains.txt` and replace the example domains with whichever domains you want to block, one per line with no delimiters.

2. Run the build:

		npm install --include=dev
		node build.mjs

3.
	(Firefox) Drag and drop `out.xpi` onto a blank Firefox tab. Click 	through the dialogs to confirm the installation.

	(Chromium, first install) Navigate to `chrome://extensions`, make sure developer mode is enabled, click the `Load unpacked` button, and select the project directory.

	(Chromium, updates) Navigate to `chrome://extensions` and click the refresh icon on the No Frills Website Blocker card, or just restart your browser.

To update the list of blocked domains, repeat starting from step 1.
