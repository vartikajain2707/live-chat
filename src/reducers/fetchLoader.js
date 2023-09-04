// import {setFetchLoader} from '../selectors';
//
// import {fromJS} from 'immutable';
//
// const initialState = fromJS({});
//
// const noop = type => () => {
//     // debug('no reducer for type %s', type);
// };
//
//
// const reducer = (state, {payload, type}) => ({
//     ['FETCH_LOADER']: () => setFetchLoader(state, payload)
//
//
// }[type] || noop(type))() || state
//
//
// export default (state = initialState, action) => reducer(state, action);
