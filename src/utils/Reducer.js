export const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_ACTIVE: 'TOGGLE_ACTIVE',
  SET_EXTENSIONS: 'SET_EXTENSIONS',
  SET_FILTER: 'SET_FILTER', // ✅ New action for filtering
};

export const initialState = {
  extensions: [],
  isActive: false,
  isDarkTheme: false,
  filter: 'ALL',
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        isDarkTheme:
          action.payload !== undefined ? action.payload : !state.isDarkTheme,
      };

    case ACTIONS.TOGGLE_ACTIVE:
      return {
        ...state,
        extensions: state.extensions.map((ext, index) =>
          index === action.payload ? { ...ext, isActive: !ext.isActive } : ext,
        ),
      };

    case ACTIONS.SET_EXTENSIONS:
      return { ...state, extensions: action.payload };

    case ACTIONS.SET_FILTER: // ✅ Update filter state
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}
