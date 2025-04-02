import Filter from '../components/Filter';
import { usePageContext } from '../context/PageContext';
import { ACTIONS } from '../utils/Reducer';

export default function ExtensionPage() {
  const { state, dispatch } = usePageContext();

  const filteredItem = state.extensions.filter((extension) => {
    switch (
      state.filter // ✅ Use state.filter, not extension.filter
    ) {
      case 'ACTIVE':
        return extension.isActive;
      case 'INACTIVE':
        return !extension.isActive;
      default:
        return true; // ✅ Return true to include all items
    }
  });

  return (
    <>
      <Filter />

      <div className="extension-container">
        {filteredItem.map((item, index) => (
          <div className="extension-container__card" key={index}>
            <div className="extension-container__card-header">
              <img
                className="extenstion-container__card-header-logo"
                src={item.logo}
                alt={`Logo of ${item.name}`}
              />
              <div className="extension-container__card-header-description">
                <p className="extension-container__card-header-title">
                  {item.name}
                </p>
                <p className="extension-container__card-header-text">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="extension-container__card-footer">
              <button className="extension-container__card-footer-button">
                Remove
              </button>
              <button
                className={`extension-container__card-footer-switcher ${
                  item.isActive ? 'active' : ''
                }`}
                onClick={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_ACTIVE,
                    payload: index,
                  })
                }
              >
                <div className="circle"></div>
              </button>
            </div>
          </div> // ✅ Use item.id as key
        ))}
      </div>
    </>
  );
}
