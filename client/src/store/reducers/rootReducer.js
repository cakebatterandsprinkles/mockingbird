import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentMonthJournalEntries: [],
  currentDayJournalEntries: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setToday:
      return {
        ...state,
        currentDayJournalEntries: [...action.payload.currentDayJournalEntries],
      };
    case actionTypes.setCalendar:
      return {
        ...state,
        currentMonthJournalEntries: [
          ...action.payload.currentMonthJournalEntries,
        ],
      };
    case actionTypes.setNewUserSettings:
      return {
        ...state,
        userEmail: action.payload.email,
      };
    default:
      return state;
  }
};

export default rootReducer;
