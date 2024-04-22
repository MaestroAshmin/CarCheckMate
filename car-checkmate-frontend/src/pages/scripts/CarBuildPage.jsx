import React , {useState}from 'react';
import Select from 'react-select';
import '../styles/CarBuildPage.css';
export default function CarBuildPage({ formData, setFormData }) {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
      

    const makes = [
        { value: "Toyota", label: "Toyota" },
        { value: "Ford", label: "Ford" },
        { value: "Volkswagen", label: "Volkswagen" },
        { value: "Honda", label: "Honda" },
        { value: "BMW", label: "BMW" }
      ];
    const states = [
        { value: "NSW", label: "NSW" },
        { value: "VIC", label: "VIC" },
        { value: "QLD", label: "QLD" },
        { value: "SA", label: "SA" },
        { value: "WA", label: "WA" }
      ];
      const years = [
        { value: "2000", label: "2000" },
        { value: "2001", label: "2001" },
        { value: "2002", label: "2002" },
        { value: "2003", label: "2003" },
        { value: "2004", label: "2004" },
        { value: "2005", label: "2005" },
        { value: "2006", label: "2006" },
        { value: "2007", label: "2007" },
        { value: "2008", label: "2008" },
        { value: "2009", label: "2009" },
        { value: "2010", label: "2010" },
        { value: "2011", label: "2011" },
        { value: "2012", label: "2012" },
        { value: "2013", label: "2013" },
        { value: "2014", label: "2014" },
        { value: "2015", label: "2015" },
        { value: "2016", label: "2016" },
        { value: "2017", label: "2017" },
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" }
      ];
      
      
      const Toyota = [
        { value: "Camry", label: "Camry" },
        { value: "Corolla", label: "Corolla" },
        { value: "RAV4", label: "RAV4" },
        { value: "Prius", label: "Prius" },
        { value: "Highlander", label: "Highlander" }
      ];
      
      const Ford = [
        { value: "Mustang", label: "Mustang" },
        { value: "F-150", label: "F-150" },
        { value: "Focus", label: "Focus" },
        { value: "Escape", label: "Escape" },
        { value: "Explorer", label: "Explorer" }
      ];
      
      const Volkswagen = [
        { value: "Golf", label: "Golf" },
        { value: "Jetta", label: "Jetta" },
        { value: "Passat", label: "Passat" },
        { value: "Tiguan", label: "Tiguan" },
        { value: "Atlas", label: "Atlas" }
      ];
      
      const Honda = [
        { value: "Civic", label: "Civic" },
        { value: "Accord", label: "Accord" },
        { value: "CR-V", label: "CR-V" },
        { value: "Pilot", label: "Pilot" },
        { value: "Odyssey", label: "Odyssey" }
      ];
      
      const BMW = [
        { value: "3 Series", label: "3 Series" },
        { value: "5 Series", label: "5 Series" },
        { value: "X3", label: "X3" },
        { value: "X5", label: "X5" },
        { value: "7 Series", label: "7 Series" }
      ];
    
      const handleMakeChange = (selectedOption) => {
        setFormData({ ...formData, make: selectedOption ? selectedOption.value : null });
    };
    
    const handleModelChange = (selectedOption) => {
        setFormData({ ...formData, model: selectedOption ? selectedOption.value : null });
    };
    
    const handleStateChange = (selectedOption) => {
        setFormData({ ...formData, state: selectedOption ? selectedOption.value : null });
    };
    
    const handleYearChange = (selectedOption) => {
        setFormData({ ...formData, year: selectedOption ? selectedOption.value : null });
    };
    
    return(
            <div className='build-box'>
                <div className='reg-input-box'>
                <label className='labels'>Registration No.</label>
                    <input
                        type="text"   
                        name="registration"   
                        className='reg-input'  
                        value={formData.registration}
                        onChange={(e) => {
                            setFormData({ ...formData, registration: e.target.value });
                          }}       
                    />
                </div>

            <div className='select-two-by-two'>
                <div className='selects'>
                    <label className='labels'>Make</label>
                    <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="make"
                            options={makes}
                            onChange={handleMakeChange}
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
                <div className='selects'>
                    <label className='labels'>Model</label>
                    <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="model"
                            options={Toyota}
                            onChange={handleModelChange}
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

            <div className='select-two-by-two'>
                <div className='selects'>
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
                <div className='selects'>
                    <label className='labels'>Year</label>
                    <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="year"
                            options={years}
                            onChange={handleYearChange}
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