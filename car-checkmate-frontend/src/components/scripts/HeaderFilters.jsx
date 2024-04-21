import React, { useState } from 'react';
import '../../pages/styles/main.css';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const FilterDropdown = ({ options, value, onChange }) => (
    <select value={value} onChange={onChange}>
        {!value && <option value="">{options[0]}</option>}
        {options.map((option) => (
            <option key={option} value={option}>
            {option}
            </option>
        ))}
    </select>
);
  
const FilterBar = () => {
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
    // Sample data, replace with your actual data
    const priceOptions = ['Price', 'Any', '$0 - $10,000', '$10,001 - $20,000', '$20,001 - $30,000'];
    const yearOptions = ['Year', 'Any', '2022', '2021', '2020', '2019'];
    const makeOptions = ['Make', 'Any', 'Toyota', 'Honda', 'Ford', 'Chevrolet'];
    const modelOptions = ['Model', 'Any', 'Camry', 'Civic', 'F-150', 'Silverado'];

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const applyFilters = () => {
        // Implement the filter logic here
    };
  
    return (
        <div className='ctr-main-header-filter'>
            <div className='filter-bar'>
                <FilterDropdown options={priceOptions} value={price} onChange={(e) => setPrice(e.target.value)} />
                <FilterDropdown options={yearOptions} value={year} onChange={(e) => setYear(e.target.value)} />
                <FilterDropdown options={makeOptions} value={make} onChange={(e) => setMake(e.target.value)} />
                <FilterDropdown options={modelOptions} value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="filter-advanced">
                <button className="btn-advanced-filter" onClick={toggleAdvancedFilters}>
                    {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                    <span className='filter-advanced-gap'></span>
                    {showAdvancedFilters ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </button>
                {showAdvancedFilters && (
                    <div className="advanced-filters-panel">
                        {/* the advanced filter inputs go here */}
                    </div>
                )}
            </div>
        </div>
    );
};
  
export default FilterBar;