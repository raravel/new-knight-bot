const { getSDK } = require('@mokoko/sdk');
const axios = require('axios');

async function LooseFetchFn(url, init) {
	const res = await axios({
		url,
		...init,
	});
	return {
		status: res.status,
		statusText: res.statusText,
		json: () => res.data,
	};
}

const sdk = getSDK({
	fetchFn: LooseFetchFn,
	apiKey: process.env.API_KEY,
});

export function useMokoko(): typeof sdk {
  return sdk;
}