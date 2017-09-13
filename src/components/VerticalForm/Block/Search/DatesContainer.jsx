import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as datesActions from 'actions/dates';
import DepartureDatepicker from 'components/VerticalForm/Block/Search/Datepicker/Departure';
import ReturnDatepicker from 'components/VerticalForm/Block/Search/Datepicker/Return';

class DatesContainer extends Component {
	constructor(props) {
		super(props);
		this.getReturnRef = this.getReturnRef.bind(this);
	}
	
	getReturnRef(input) {
		this.returnInput = input;
	}
	
	render() {
		const { departureDatepicker, returnDatepicker, locale } = this.props;
		const { datepickerChange:originalDatepickerChange, toggleDatePicker } = this.props.actions;
		const hightlightedDatesForDeparture = returnDatepicker.date ? [returnDatepicker.date] : [];
		const hightlightedDatesForReturn = departureDatepicker.date ? [departureDatepicker.date] : [];
		
		// Open return datepicker after selecting the departure date.
		const datepickerChange = (date, dateType) => {
			originalDatepickerChange(date, dateType);
			
			if (dateType === 'departure') {
				this.returnInput.focus();
			}
		};
		
		return <div className="form-group row">
			<DepartureDatepicker
				locale={locale}
				date={departureDatepicker.date}
				isActive={departureDatepicker.isActive}
				datepickerChange={datepickerChange}
				highlightDates={hightlightedDatesForDeparture}
			/>
			
			<ReturnDatepicker
				locale={locale}
				date={returnDatepicker.date}
				isActive={returnDatepicker.isActive}
				datepickerChange={datepickerChange}
				toggleDatePicker={toggleDatePicker}
				highlightDates={hightlightedDatesForReturn}
				getRef={this.getReturnRef}
			/>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		locale: state.system.locale,
		departureDatepicker: state.form.dates.departure,
		returnDatepicker: state.form.dates.return
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(datesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(DatesContainer);