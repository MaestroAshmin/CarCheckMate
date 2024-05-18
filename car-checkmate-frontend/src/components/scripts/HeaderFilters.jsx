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
    const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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
    const priceOptions = ['Price', 'Any', '$0 - $10,000', '$10,001 - $20,000', '$20,001 - $30,000', 'Greater than $30,000'];
    const verifiedOptions = ['Verified', 'Any', 'Verified'];

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };
    const handlePriceChange = (selectedOption) => {
        if (selectedOption === 'Any') {
            setMinPrice('0');
            setMaxPrice('');
        } else if (selectedOption === 'Greater than $30,000') {
            setMinPrice('30001');
            setMaxPrice('');
        } else {
            const [min, max] = selectedOption.split(' - ').map(value => value.replace('$', '').replace(/\D/g, ''))
            setMinPrice(min);
            setMaxPrice(max);
        }
        console.log(minPrice, maxPrice);
    };
    const applyFilters = async () => {
        try {
            // Remove $ symbol and parse the selected price range into minimum and maximum values
            // const [minPrice, maxPrice] = priceRange.split(' - ').map(value => value.replace('$', '').replace(/\D/g, ''));

            // Construct a FormData object
            const formData = new FormData();
            formData.append('minPrice', minPrice);
            formData.append('maxPrice', maxPrice);
            formData.append('year', year);
            formData.append('make', make);
            formData.append('model', model);
            formData.append('color', color);
            formData.append('verified', verified);
    
            // Make a POST request to the search API
            const response = await fetch('http://localhost:3000/search/filter', {
                method: 'POST',
                body: formData
            });
    
            // Parse response JSON
            const data = await response.json();
    
            // Handle search results
            // console.log(data);
            // Here you can update the UI with the search results
             // Pass the search results to the parent component
             onSearch(data.searchResults);
        } catch (error) {
            console.error('Error applying filters:', error);
            // Handle error
        }
    };
  
    return (
        <div className='ctr-main-header-filter'>
            <div className='filter-bar'>
                <FilterDropdown options={priceOptions} value={priceRange} onChange={(e) => handlePriceChange(e.target.value)} />
                <FilterDropdown options={yearOptions} value={year} onChange={(e) => setYear(e.target.value)} />
                <FilterDropdown options={makeOptions} value={make} onChange={(e) => setMake(e.target.value)} />
                <FilterDropdown options={modelOptions} value={model} onChange={(e) => setModel(e.target.value)} />
                <FilterDropdown options={colorOptions} value={color} onChange={(e) => setColor(e.target.value)} />
                <button className="btn-apply-filter" onClick={applyFilters}>Apply</button>
            </div>
            {/*<div className="filter-advanced">
                <button className="btn-advanced-filter" onClick={toggleAdvancedFilters}>
                    {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                    <span className='filter-advanced-gap'></span>
                    {showAdvancedFilters ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </button>
                {showAdvancedFilters && (
                    <div className="advanced-filters-panel">
                        the advanced filter inputs go here 
                    </div>
                )}
            </div>*/}
        </div>
    );
};
  
export default FilterBar;