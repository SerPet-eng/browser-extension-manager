import {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { reducer, initialState, ACTIONS } from '../utils/Reducer';

const PageContext = createContext(null);

export function usePageContext() {
  return useContext(PageContext);
}

export default function PageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);

  // Fetch Data 🫙🦴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public/data.json'); // ✅ Fixed path
        const data = await response.json();
        dispatch({ type: ACTIONS.SET_EXTENSIONS, payload: data });
      } catch (error) {
        console.error(error);
        setError(`Something went wrong: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  // Persist Theme Mode and Active🛝
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedActive = localStorage.getItem('isActive');
    if (savedTheme !== null) {
      dispatch({ type: ACTIONS.TOGGLE_THEME, payload: savedTheme === 'true' }); // ✅ Now sets the theme correctly
    }
    if (savedActive !== null) {
      dispatch({
        type: ACTIONS.TOGGLE_ACTIVE,
        payload: savedActive === 'true',
      });
    }
  }, []);

  // Set Theme and Active every render 🖼️
  useEffect(() => {
    localStorage.setItem('theme', state.isDarkTheme.toString());
    localStorage.setItem('isActive', state.isActive.toString());
  }, [state.isDarkTheme, state.isActive]);

  const value = useMemo(
    () => ({ state, dispatch, error, setError }),
    [state, dispatch], // ✅ Removed dispatch from dependencies
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}
