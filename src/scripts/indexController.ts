function onStartButtonClicked() {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	const decalIdsTextArea = <HTMLInputElement>document.getElementById("decal-ids-textarea");
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	const imageIdsTextArea = <HTMLInputElement>document.getElementById("image-ids-textarea");

	const decalIdLines = decalIdsTextArea.value.split("\n");
	const decalIds = decalIdLines.map(decalIdLine => parseInt(decalIdLine));

	fetcher.getImageAssetIdsFromDecalAssetIds(decalIds).then(imageIds => {
		imageIdsTextArea.value = imageIds.reduce((accumulator, imageId) => {
			if (typeof imageId === "number" && !isNaN(imageId)) {
				return accumulator + imageId + "\n";
			} else {
				return accumulator + "Could not fetch image asset id\n";
			}
		}, "");
	});
}
