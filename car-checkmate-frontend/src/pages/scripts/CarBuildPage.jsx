import React , {useState}from 'react';
import Select from 'react-select';
import '../styles/CarBuildPage.css';
import carData from './buildinfo.json'; // Import the JSON file
export default function CarBuildPage({ formData, setFormData }) {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [modelData, setModelData] = useState([]);
  
    const { makes, states, years, models } = carData; // Destructure the data from the imported JSON
  
    const handleMakeChange = (selectedOption) => {
      const selectedMake = selectedOption ? selectedOption.value : null;
      const selectedModelOptions = selectedMake ? models[selectedMake] : [];
      setFormData({ ...formData, make: selectedMake, model: null });
      setModelData(selectedModelOptions);
    };
  
    const handleModelChange = (selectedOption) => {
        const selectedModel = selectedOption ? selectedOption.value : null;
        setFormData({ ...formData, model: selectedModel });
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
                        name="registrationNo"   
                        className='reg-input'  
                        value={formData.registrationNo}
                        onChange={(e) => {
                            setFormData({ ...formData, registrationNo: e.target.value });
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
                            options={modelData}
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