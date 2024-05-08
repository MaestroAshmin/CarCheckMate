import React, { useState, useEffect } from 'react';
import '../../pages/styles/main.css';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const FilterDropdown = ({ options, value, onChange }) => (
    <select value={value} onChange={onChange}>
        {!value && <option value="">{options[0]}</option>}
        {options.map((option, index) => (
            <option key={option} value={option} disabled={index === 0}>
            {option}
            </option>
        ))}
    </select>
);
  
const FilterBar = ({ onSearch }) => {
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [yearOptions, setYearOptions] = useState([]);
    const [makeOptions, setMakeOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [verified, setVerified] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
    useEffect(() => {
        // Fetch year, make, model, and color options from your backend API
        const fetchOptions = async () => {
            try {
                const yearResponse = await fetch('http://localhost:3000/cars/years');
                const makeResponse = await fetch('http://localhost:3000/cars/makes');
                const modelResponse = await fetch('http://localhost:3000/cars/models');
                const colorResponse = await fetch('http://localhost:3000/cars/colors');

                const yearData = await yearResponse.json();
                const makeData = await makeResponse.json();
                const modelData = await modelResponse.json();
                const colorData = await colorResponse.json();
                console.log(yearData,makeData,modelData,colorData);
                setYearOptions(['Year', ...yearData]);
                setMakeOptions(['Make', ...makeData]);
                setModelOptions(['Model', ...modelData]);
                setColorOptions(['Color', ...colorData]);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);
  
    // Sample data, replace with your actual data
    const priceOptions = ['Price', 'Any', '$0 - $10,000', '$10,001 - $20,000', '$20,001 - $30,000'];
    const verifiedOptions = ['Verified', 'Any', 'Verified'];

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const applyFilters = () => {
        // Construct the search query based on the selected filters
        const searchQuery = {
            price,
            year,
            make,
            model,
            color,
            verified
        };

        // Call the search API with the constructed search query
        onSearch(searchQuery);
    };
  
    return (
        <div className='ctr-main-header-filter'>
            <div className='filter-bar'>
                <FilterDropdown options={priceOptions} value={price} onChange={(e) => setPrice(e.target.value)} />
                <FilterDropdown options={yearOptions} value={year} onChange={(e) => setYear(e.target.value)} />
                <FilterDropdown options={makeOptions} value={make} onChange={(e) => setMake(e.target.value)} />
                <FilterDropdown options={modelOptions} value={model} onChange={(e) => setModel(e.target.value)} />
                <FilterDropdown options={colorOptions} value={color} onChange={(e) => setColor(e.target.value)} />
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
            <button className="btn-apply-filters" onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};
  
export default FilterBar;