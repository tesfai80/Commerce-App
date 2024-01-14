
import storeConfig from '../data/storeConfig.json';

export function calculateVAT(storeConfig) {
	//storeConfig.VATPercent is 17
	if (!storeConfig.VATPercent || typeof storeConfig.VATPercent !== 'number') {
		throw new Error('VATPercent is not properly defined');
	}

	const VATRate = storeConfig.VATPercent / 100 + 1; // VATRate is 1.17

	const totalVAT = sessionData.cart.reduce((sum, item) => {
		let itemCost = item.lineTotal?.amount ?? 0; // itemCost is 500 which is 5.00 nis
		return sum + (itemCost / 100).toFixed(2) / VATRate; // 500 / 100 = 5.00 / 1.17 = 4.27
	}, 0);

	const roundedTotalVAT = Math.round(totalVAT * 100) / 100; // 4.27 * 100 = 427 / 100 = 4.27
	console.log('Total VAT:', roundedTotalVAT);

	return roundedTotalVAT;
}
