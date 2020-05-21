import { FETCH_PLANTS, MONTHS } from '../actions/types';

const initialState = { plants: [], month: {} }

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PLANTS:
            return {
                ...state,
                plants: action.data
            }
        default:
            return state;
    }
}