async function onTabUpdated(tabId, changeInfo, tab) {

	if (changeInfo.status === 'loading') {

		const url = new URL(tab.url);
		const params = url.searchParams;
		const q = params.get('q');

		if (q && q.indexOf('site:pinterest.com') < 0) {

			params.set('q', q + ' -site:pinterest.com');
			url.search = params.toString();

			await chrome.tabs.update(tabId, {
				url: url.toString()
			});
		}
	}
}


chrome.tabs.onUpdated.addListener(onTabUpdated);