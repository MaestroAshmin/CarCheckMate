import React , {useState}from 'react';
import Select from 'react-select';
import '../styles/CarLocationPage.css';

export default function CarLocationPage({ formData, setFormData }) {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
      
    const states = [
        { value: "NSW", label: "NSW" },
        { value: "VIC", label: "VIC" },
        { value: "QLD", label: "QLD" },
        { value: "SA", label: "SA" },
        { value: "WA", label: "WA" }
      ];

      const suburbsNSW = [
        { value: "Sydney", label: "Sydney" },
        { value: "Newcastle", label: "Newcastle" },
        { value: "Wollongong", label: "Wollongong" },
        { value: "Central Coast", label: "Central Coast" },
        { value: "Bondi", label: "Bondi" }
    ];
    
    const suburbsVIC = [
        { value: "Melbourne", label: "Melbourne" },
        { value: "Geelong", label: "Geelong" },
        { value: "Ballarat", label: "Ballarat" },
        { value: "Bendigo", label: "Bendigo" },
        { value: "Frankston", label: "Frankston" }
    ];
    
    const suburbsQLD = [
        { value: "Brisbane", label: "Brisbane" },
        { value: "Gold Coast", label: "Gold Coast" },
        { value: "Sunshine Coast", label: "Sunshine Coast" },
        { value: "Townsville", label: "Townsville" },
        { value: "Cairns", label: "Cairns" }
    ];
    
    const suburbsSA = [
        { value: "Adelaide", label: "Adelaide" },
        { value: "Mount Gambier", label: "Mount Gambier" },
        { value: "Whyalla", label: "Whyalla" },
        { value: "Murray Bridge", label: "Murray Bridge" },
        { value: "Port Lincoln", label: "Port Lincoln" }
    ];
    
    const suburbsWA = [
        { value: "Perth", label: "Perth" },
        { value: "Fremantle", label: "Fremantle" },
        { value: "Broome", label: "Broome" },
        { value: "Geraldton", label: "Geraldton" },
        { value: "Albany", label: "Albany" }
    ];

    const postcodesNSW = [
        { value: "2000", label: "2000" },
        { value: "2150", label: "2150" },
        { value: "2300", label: "2300" },
        { value: "2450", label: "2450" },
        { value: "2600", label: "2600" }
    ];
    
    const postcodesVIC = [
        { value: "3000", label: "3000" },
        { value: "3150", label: "3150" },
        { value: "3200", label: "3200" },
        { value: "3450", label: "3450" },
        { value: "3750", label: "3750" }
    ];
    
    const postcodesQLD = [
        { value: "4000", label: "4000" },
        { value: "4150", label: "4150" },
        { value: "4300", label: "4300" },
        { value: "4550", label: "4550" },
        { value: "4700", label: "4700" }
    ];
    
    const postcodesSA = [
        { value: "5000", label: "5000" },
        { value: "5150", label: "5150" },
        { value: "5300", label: "5300" },
        { value: "5450", label: "5450" },
        { value: "5600", label: "5600" }
    ];
    
    const postcodesWA = [
        { value: "6000", label: "6000" },
        { value: "6150", label: "6150" },
        { value: "6200", label: "6200" },
        { value: "6450", label: "6450" },
        { value: "6700", label: "6700" }
    ];
    
    
    const handleStateChange = (selectedOption) => {
        setFormData({ ...formData, state: selectedOption ? selectedOption.value : null });
    };
    


    return(
        <div className='loc-container'>
                <div className='loc'>      
                    <label className='labels'>Street</label>
                    <input
                        type="text"   
                        name="street"   
                        className='street-input'  
                        value={formData.street}
                        onChange={(e) => {
                            setFormData({ ...formData, street: e.target.value });
                            }}       
                    />
                </div>
                <div className='loc'>
                    <label className='labels'>Suburb</label>
                    <input
                        type="text"   
                        name="suburb"   
                        className='suburb-input'  
                        value={formData.suburb}
                        onChange={(e) => {
                            setFormData({ ...formData, suburb: e.target.value });
                        }}       
                    />
                </div>
                <div className='post-state'>
                    
                <div className='loc'>           
                <label className='labels'>Postcode</label>
                <input
                    type="text"   
                    name="postcode"   
                    className='postcode-input'  
                    value={formData.postcode}
                    onChange={(e) => {
                        setFormData({ ...formData, postcode: e.target.value });
                    }}       
                />
                </div>

                <div className='selects-loc'>
                    <label className='labels'>State</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="state"
                        options={states}
                        onChange={handleStateChange}
                    />
                    <div
                        style={{
                        color: 'hsl(0, 0%, 40%)',
                        display: 'inline-block',
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginTop: '1em',
                        }}
                    ></div>
                </div>
            </div>
                
        </div>
    )
}