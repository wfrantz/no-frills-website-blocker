import blockedDomains from './blocked-domains.js';

browser.webRequest.onBeforeRequest.addListener(
	async requestDetails => {
		await browser.browserAction.setIcon({path: "red.svg", tabId: requestDetails.tabId})
		browser.browserAction.setTitle({
			title: `Blocked an attempt to visit ${new URL(requestDetails.url).hostname}`,
			tabId: requestDetails.tabId
		});
		return {cancel: true};
	},
	{
		urls: blockedDomains.map(domain => domain.includes('/') ? `*://*.${domain}*` : `*://*.${domain}/*`),
		types: [ 'main_frame' ]
	},
	[ 'blocking' ]
);
