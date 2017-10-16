export const parseAutocompleteOptions = response => {
	let options = [];

	if (response && response.guide.autocomplete.iata instanceof Array) {
		const { airports, countries } = response.guide;
		
		options = response.guide.autocomplete.iata
			.filter(({ IATA }) => IATA in airports && airports[IATA].name) // Ignore options without information about airport.
			.map(({ IATA, directFlight, isCity }) => {
				airports[IATA].country = countries[airports[IATA].countryCode];
				airports[IATA].isCity = isCity;
	
				return {
					airport: airports[IATA],
					isDirect: directFlight
				};
			});
	}

	return options;
};