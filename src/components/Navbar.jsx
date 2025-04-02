import Logo from '../../assets/images/logo.svg';
import IconLight from '../../assets/images/icon-sun.svg';
import IconDark from '../../assets/images/icon-moon.svg';
import { usePageContext } from '../context/PageContext';
import { ACTIONS } from '../utils/Reducer';

export default function Navbar() {
  const { state, dispatch } = usePageContext();

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={Logo} alt="Logo" />
        <p className="navbar__logo-text">Extensions</p>
      </div>

      <button
        className="navbar__button"
        onClick={() =>
          dispatch({
            type: ACTIONS.TOGGLE_THEME,
            payload: !state.isDarkTheme,
          })
        }
      >
        {!state.isDarkTheme ? (
          <img
            className="navbar__button-icon"
            src={IconDark}
            alt="Dark Mode Icon"
          />
        ) : (
          <img
            className="navbar__button-icon"
            src={IconLight}
            alt="Light Mode Icon"
          />
        )}
      </button>
    </nav>
  );
}
