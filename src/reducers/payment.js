import * as actions from '../actions/types';

const initialState = {
    payments: [],
    errorMessage: '',
    loading: false,
    actionState: 0
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PAYMENT_ACTION_START:
            return {
                ...state,
                loading: true,
                errorMessage: '',
                actionState: 1
            }
        case actions.PAYMENT_ACTION_FAILURE:
                return {
                    ...state,
                    errorMessage: action.error,
                    loading: false,
                    actionState: 2
                }

        case actions.PAYMENT_ACTION_SUCCESS:
            return {
                ...state,
                payments: state.payments.concat(action.payload),
                errorMessage: '',
                loading: false,
                actionState: 2
            }
        default:
            return state;
    }
};

export default paymentReducer;