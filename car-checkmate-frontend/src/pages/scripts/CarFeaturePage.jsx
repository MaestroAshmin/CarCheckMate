import React , {useState}from 'react';
import Select from 'react-select';
import '../styles/CarFeaturePage.css';
export default function CarAdPage({ formData, setFormData }) {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
      

    const colors = [
        { value: "Red", label: "Red" },
        { value: "Blue", label: "Blue" },
        { value: "Green", label: "Green" },
        { value: "Yellow", label: "Yellow" },
        { value: "Black", label: "Black" },
        { value: "White", label: "White" },
        { value: "Silver", label: "Silver" },
        { value: "Gray", label: "Gray" },
        { value: "Orange", label: "Orange" },
        { value: "Purple", label: "Purple" },
    ];
    
    const odometer = [
        { value: "0-5000", label: "0-5000 miles" },
        { value: "5000-10000", label: "5000-10000 miles" },
        { value: "10000-20000", label: "10000-20000 miles" },
        { value: "20000-30000", label: "20000-30000 miles" },
        { value: "30000-40000", label: "30000-40000 miles" },
        { value: "40000-50000", label: "40000-50000 miles" },
        { value: "50000+", label: "50000+ miles" },
    ];
    
    const transmission = [
        { value: "Automatic", label: "Automatic" },
        { value: "Manual", label: "Manual" },
        { value: "CVT", label: "CVT" },
        { value: "Semi-automatic", label: "Semi-automatic" },
    ];
    
    const fuelType = [
        { value: "Gasoline", label: "Gasoline" },
        { value: "Diesel", label: "Diesel" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "Electric", label: "Electric" },
    ];
    
    const engineType = [
        { value: "Inline-4", label: "Inline-4" },
        { value: "V6", label: "V6" },
        { value: "V8", label: "V8" },
        { value: "Inline-6", label: "Inline-6" },
        { value: "Electric", label: "Electric" },
    ];
    
    const bodyType = [
        { value: "Sedan", label: "Sedan" },
        { value: "SUV", label: "SUV" },
        { value: "Truck", label: "Truck" },
        { value: "Hatchback", label: "Hatchback" },
        { value: "Coupe", label: "Coupe" },
        { value: "Convertible", label: "Convertible" },
        { value: "Van", label: "Van" },
    ];
    
    const handleColorChange = (selectedOption) => {
        setFormData({ ...formData, color: selectedOption });
    };

    const handleOdometerChange = (selectedOption) => {
        setFormData({ ...formData, odometer: selectedOption });
    };
    const handleTransmissionChange = (selectedOption) => {
        setFormData({ ...formData, transmission: selectedOption });
    };

    const handleFuelTypeChange = (selectedOption) => {
        setFormData({ ...formData, fuelType: selectedOption });
    };

    const handleEngineTypeChange = (selectedOption) => {
        setFormData({ ...formData, engineType: selectedOption });
    };

    const handleBodyTypeChange = (selectedOption) => {
        setFormData({ ...formData, bodyType: selectedOption });
    };
  

    return(
        <div className='feature-container'>
            

            <div className='select-two-by-two'>
                <div className='selects'>
                <label className='labels'>Color</label>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={colors}
                    onChange={handleColorChange}
                />
                </div>
                <div className='odo'>
                <label className='labels'>Odometer</label>
                <input
                    type="text"   
                    name="odometer"   
                    className='odometer-input'  
                    value={formData.odometer}
                    onChange={(e) => {
                        setFormData({ ...formData, odometer: e.target.value });
                        }}       
                />
                </div>
            </div>
            <div className='select-two-by-two'>
                <div className='selects'>
                    <label className='labels'>Transmission</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="color"
                        options={transmission}
                        onChange={handleTransmissionChange}
                    />
                </div>
                <div className='selects'>
                <label className='labels'>Fuel Type</label>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={fuelType}
                    onChange={handleFuelTypeChange}
                />
                </div>
            </div>
            <div className='select-two-by-two'>
            <div className='selects'>
            <label className='labels'>Engine Type</label>
            <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                options={engineType}
                onChange={handleEngineTypeChange}
            />
            </div>
            <div className='selects'>
            <label className='labels'>Body Type</label>
            <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                options={bodyType}
                onChange={handleEngineTypeChange}
            />
            </div>
            </div>
        </div>
    )
}




















   
 
