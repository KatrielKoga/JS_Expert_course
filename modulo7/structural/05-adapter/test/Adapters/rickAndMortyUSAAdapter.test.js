import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter';
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA';

describe('#RickAndMortyUSAAdapter', () => {
	beforeEach(() => jest.clearAllMocks());
	test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON', async () => {
		const USAIntegration = jest
			.spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
			.mockResolvedValue([]);
		const result = await RickAndMortyUSAAdapter.getCharacters();
		expect(result).toEqual([]);
		expect(USAIntegration).toHaveBeenCalled();
	});
});
