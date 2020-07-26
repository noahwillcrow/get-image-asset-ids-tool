const fetcher = (() => {
	function getRequest(url: string): Promise<unknown> {
		return new Promise<unknown>(function(resolve, reject) {
			const request = new XMLHttpRequest();
			request.onload = function() {
				if (this.status === 200) {
					resolve(this.response);
				} else {
					reject(new Error(this.statusText));
				}
			};
			request.onerror = function() {
				reject(new Error("XMLHttpRequest Error: " + this.statusText));
			};
			request.open("GET", url);
			request.send();
		});
	}

	const idRegexPattern = /(\?id\=)(\d+)/;

	function getImageAssetIdsFromDecalAssetIds(decalAssetIds: ReadonlyArray<number>) {
		const fetchPromises = decalAssetIds.map(decalAssetId =>
			getRequest(`https://assetdelivery.roblox.com/v1/asset?id=${decalAssetId}`),
		);

		return Promise.all(fetchPromises).then(results => {
			return results.map(result => {
				if (typeof result === "string") {
					const match = result.match(idRegexPattern);
					if (match !== null) {
						const imageAssetIdString = match[2];
						return parseInt(imageAssetIdString);
					}
				}
			});
		});
	}

	return {
		getImageAssetIdsFromDecalAssetIds,
	};
})();
