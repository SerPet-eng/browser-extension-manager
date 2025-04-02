import { useState } from 'react';
import { usePageContext } from '../context/PageContext';
import { ACTIONS } from '../utils/Reducer';

export default function Filter() {
  const [currentFilter, setCurrentFilter] = useState(0);
  const { dispatch } = usePageContext();
  const filterItem = [
    { name: 'All', value: 'ALL' },
    { name: 'Active', value: 'ACTIVE' },
    { name: 'Inactive', value: 'INACTIVE' },
  ];

  return (
    <div className="filter-container">
      <h2 className="filter-container__title">Extension List</h2>
      <div className="filter-container__content">
        {filterItem.map((item, index) => (
          <div
            className={`filter-container__content-button ${
              currentFilter === index ? 'active' : ''
            }`}
            key={index}
            onClick={() => {
              dispatch({ type: ACTIONS.SET_FILTER, payload: item.value });
              setCurrentFilter(index); // Update the current filter index
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
