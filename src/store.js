import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

/**
 * Create Redux-store.
 *
 * @returns {Store}
 */
export function getStore() {
	// Thunk middleware allows us to create functions instead of plain objects in action-creators (for async purposes).
	// @see https://github.com/gaearon/redux-thunk#motivation

	return createStore(
		rootReducer,
		applyMiddleware(
			thunk
		)
	);
}