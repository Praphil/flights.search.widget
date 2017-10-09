import React from 'react';

export default ({value:option}) => {
	const airport = option.value;
	
	return <span className="widget-form-airports__select__value">
		<span className="widget-form-airports__select__value__airportName">
			{airport.name}
		</span>
		
		{airport.country ? <span className="widget-form-airports__select__value__countryName">
			<span className="widget-form-airports__select__value__comma">, </span> 
				{airport.country.name}
			</span> 
		: null}
	</span>;
};