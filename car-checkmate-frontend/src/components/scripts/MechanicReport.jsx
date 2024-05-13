import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Popup({ message, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="popup">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function MechanicReport(props) {
    const [formState, setFormState] = useState({
        treadDepth: '',
        tyreCondition: '',
        wheelAlignment: '',
        brakePads: '',
        discsDrums: '',
        brakeSystem: '',
        steeringComponents: '',
        shockAbsorbers: '',
        suspensionSystem: '',
        headlights: '',
        brakeLights: '',
        indicators: '',
        seatBelts: '',
        seats: '',
        childRestraintAnchorages: '',
        windscreen: '',
        wipers: '',
        visibilityWindows: '',
        bodyPanels: '',
        chassis: '',
        engineCondition: '',
        exhaustSystem: '',
        drivelineComponents: '',
        fluidLeaks: '',
        hornOperation: '',
        roadworthy: '',
        additionalComments: '',
        eRWCSubmitted: false,
        informationTruthChecked: false,
        carId:'',
        mechanicId:'',
        sellerId:'',
        buyerId:''

    });

    useEffect(() => {
        // Your logic to fetch initial form state values goes here
        // For example:
        setFormState({
            carId:props.carId,
            mechanicId:props.mechanicId,
            sellerId:props.sellerId,
            buyerId:props.buyerId,
            inspectionId:props.inspectionId

          
        });
    }, []);

    const sendFormData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/inspections/submit-inspection-form', formState);
            return response.data; // Return response data if needed
        } catch (error) {
            throw error; // Rethrow error to handle it in the caller function
        }
    };

    console.log(formState)
    const [showPopup, setShowPopup] = useState(false);
    const [invalidField, setInvalidField] = useState('');

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Submit logic
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if at least one radio button is selected for each set
        const isValid = (
            formState.tyreCondition !== '' &&
            formState.wheelAlignment !== ''
        );
    
        if (!isValid) {
            setInvalidField('Please ensure to complete all fields');
            setShowPopup(true);
            return;
        }

        // Additional validation logic for checkboxes
        if (!formState.eRWCSubmitted || !formState.informationTruthChecked) {
            setInvalidField('Please check for declaration checkboxes.');
            setShowPopup(true);
            return;
        }

        // Submit logic here
        sendFormData();
        console.log("sent")
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        const element = document.getElementsByName(invalidField)[0];
        if (element) {
            element.focus();
        }
    };

    return (
        <div className='ctr-user-content'>
            <div>
                <h3>Inspection Report</h3>
                <h4>Car Id:&nbsp;<span>CR1234</span></h4>
                <br />

                <form onSubmit={handleSubmit}>
                    {/* Topic 1: Wheels and Tyres */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Wheels and Tyres</legend>
                            <div className='input-box'>
                                <p className='sub-topic-report'>Tread Depth:</p>
                                <input
                                        type="text"
                                        name="treadDepth"
                                        value={formState.treadDepth}
                                        onChange={handleChange}
                                        placeholder='The tread depth measurement'
                                />
                            </div>
                            <div>
                                <p className='sub-topic-report'>
                                    Tyre Condition:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="tyreCondition"
                                            value="good"
                                            checked={formState.tyreCondition === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="tyreCondition"
                                            value="fair"
                                            checked={formState.tyreCondition === 'fair'}
                                            onChange={handleChange}
                                        />
                                        <label>Fair</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="tyreCondition"
                                            value="poor"
                                            checked={formState.tyreCondition === 'poor'}
                                            onChange={handleChange}
                                        />
                                        <label>Poor</label>
                                    </div>
                                </div>
                            </div>
 
                            <div>
                                <p className='sub-topic-report'>
                                    Wheel Alignment:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="wheelAlignment"
                                            value="within_limits"
                                            checked={formState.wheelAlignment === 'within_limits'}
                                            onChange={handleChange}
                                        />
                                        <label>Within Limits</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="wheelAlignment"
                                            value="needs_adjustment"
                                            checked={formState.wheelAlignment === 'needs_adjustment'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Adjustment</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 2: Brakes */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Brakes</legend>
                            <div>
                                <p className='sub-topic-report'>Brake Pads:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakePads"
                                            value="good"
                                            checked={formState.brakePads === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakePads"
                                            value="worn"
                                            checked={formState.brakePads === 'worn'}
                                            onChange={handleChange}
                                        />
                                        <label>Worn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakePads"
                                            value="needs_replacement"
                                            checked={formState.brakePads === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>Discs/Drums:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="discsDrums"
                                            value="good"
                                            checked={formState.discsDrums === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="discsDrums"
                                            value="worn"
                                            checked={formState.discsDrums === 'worn'}
                                            onChange={handleChange}
                                        />
                                        <label>Worn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="discsDrums"
                                            value="needs_replacement"
                                            checked={formState.discsDrums === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>Brake System:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakeSystem"
                                            value="functioning_properly"
                                            checked={formState.brakeSystem === 'functioning_properly'}
                                            onChange={handleChange}
                                        />
                                        <label>Functioning Properly</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakeSystem"
                                            value="needs_attention"
                                            checked={formState.brakeSystem === 'needs_attention'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Attention</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 3: Steering and Suspension */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Steering and Suspension</legend>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>Steering Components:</p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="steeringComponents"
                                            value="good"
                                            checked={formState.steeringComponents === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="steeringComponents"
                                            value="worn"
                                            checked={formState.steeringComponents === 'worn'}
                                            onChange={handleChange}
                                        />
                                        <label>Worn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="steeringComponents"
                                            value="needs_replacement"
                                            checked={formState.steeringComponents === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>Shock Absorbers:</p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="shockAbsorbers"
                                            value="good"
                                            checked={formState.shockAbsorbers === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="shockAbsorbers"
                                            value="worn"
                                            checked={formState.shockAbsorbers === 'worn'}
                                            onChange={handleChange}
                                        />
                                        <label>Worn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="shockAbsorbers"
                                            value="needs_replacement"
                                            checked={formState.shockAbsorbers === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>Suspension System:</p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="suspensionSystem"
                                            value="functioning_properly"
                                            checked={formState.suspensionSystem === 'functioning_properly'}
                                            onChange={handleChange}
                                        />
                                        <label>Functioning Properly</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="suspensionSystem"
                                            value="needs_attention"
                                            checked={formState.suspensionSystem === 'needs_attention'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Attention</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 4: Lights and Electrical Components */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Lights and Electrical Components</legend>
                            <div>
                                <p className='sub-topic-report'>Headlights:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="headlights"
                                            value="working"
                                            checked={formState.headlights === 'working'}
                                            onChange={handleChange}
                                        />
                                        <label>Working</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="headlights"
                                            value="not_working"
                                            checked={formState.headlights === 'not_working'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Working</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>Brake Lights:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakeLights"
                                            value="working"
                                            checked={formState.brakeLights === 'working'}
                                            onChange={handleChange}
                                        />
                                        <label>Working</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="brakeLights"
                                            value="not_working"
                                            checked={formState.brakeLights === 'not_working'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Working</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>Indicators:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="indicators"
                                            value="working"
                                            checked={formState.indicators === 'working'}
                                            onChange={handleChange}
                                        />
                                        <label>Working</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="indicators"
                                            value="not_working"
                                            checked={formState.indicators === 'not_working'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Working</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>


                    {/* Topic 5: Seats and Restraints */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Seats and Restraints</legend>
                            <div>
                                <p className='sub-topic-report'>Seat Belts:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seatBelts"
                                            value="good"
                                            checked={formState.seatBelts === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seatBelts"
                                            value="frayed"
                                            checked={formState.seatBelts === 'frayed'}
                                            onChange={handleChange}
                                        />
                                        <label>Frayed</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seatBelts"
                                            value="needs_replacement"
                                            checked={formState.seatBelts === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>Seats:</p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seats"
                                            value="good"
                                            checked={formState.seats === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seats"
                                            value="torn"
                                            checked={formState.seats === 'torn'}
                                            onChange={handleChange}
                                        />
                                        <label>Torn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="seats"
                                            value="needs_repair"
                                            checked={formState.seats === 'needs_repair'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Repair</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>Child Restraint Anchorages:</p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="childRestraintAnchorages"
                                            value="present_and_functional"
                                            checked={formState.childRestraintAnchorages === 'present_and_functional'}
                                            onChange={handleChange}
                                        />
                                        <label>Present and Functional</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="childRestraintAnchorages"
                                            value="present_but_not_functional"
                                            checked={formState.childRestraintAnchorages === 'present_but_not_functional'}
                                            onChange={handleChange}
                                        />
                                        <label>Present but Not Functional</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="childRestraintAnchorages"
                                            value="not_present"
                                            checked={formState.childRestraintAnchorages === 'not_present'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Present</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>


                    {/* Topic 6: Windscreen and Windows */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Windscreen and Windows</legend>
                            <div>
                                <p className='sub-topic-report'>
                                    Windscreen:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="windscreen"
                                            value="no_cracks"
                                            checked={formState.windscreen === 'no_cracks'}
                                            onChange={handleChange}
                                        />
                                        <label>No Cracks</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="windscreen"
                                            value="minor_crack"
                                            checked={formState.windscreen === 'minor_crack'}
                                            onChange={handleChange}
                                        />
                                        <label>Minor Crack</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="windscreen"
                                            value="major_crack"
                                            checked={formState.windscreen === 'major_crack'}
                                            onChange={handleChange}
                                        />
                                        <label>Major Crack</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>
                                    Wipers:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="wipers"
                                            value="working"
                                            checked={formState.wipers === 'working'}
                                            onChange={handleChange}
                                        />
                                        <label>Working</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="wipers"
                                            value="not_working"
                                            checked={formState.wipers === 'not_working'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Working</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>
                                        Visibility through Windows:
                                    </p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="visibilityThroughWindows"
                                            value="clear"
                                            checked={formState.visibilityThroughWindows === 'clear'}
                                            onChange={handleChange}
                                        />
                                        <label>Clear</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="visibilityThroughWindows"
                                            value="not_clear"
                                            checked={formState.visibilityThroughWindows === 'not_clear'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Clear</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 7: Body and Chassis */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Body and Chassis</legend>
                            <div>
                                <p className='sub-topic-report'>
                                    Body Panels:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="bodyPanels"
                                            value="no_damage"
                                            checked={formState.bodyPanels === 'no_damage'}
                                            onChange={handleChange}
                                        />
                                        <label>No Damage</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="bodyPanels"
                                            value="minor_damage"
                                            checked={formState.bodyPanels === 'minor_damage'}
                                            onChange={handleChange}
                                        />
                                        <label>Minor Damage</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="bodyPanels"
                                            value="major_damage"
                                            checked={formState.bodyPanels === 'major_damage'}
                                            onChange={handleChange}
                                        />
                                        <label>Major Damage</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>
                                    Chassis:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="chassis"
                                            value="no_rust"
                                            checked={formState.chassis === 'no_rust'}
                                            onChange={handleChange}
                                        />
                                        <label>No Rust</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="chassis"
                                            value="minor_rust"
                                            checked={formState.chassis === 'minor_rust'}
                                            onChange={handleChange}
                                        />
                                        <label>Minor Rust</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="chassis"
                                            value="major_rust"
                                            checked={formState.chassis === 'major_rust'}
                                            onChange={handleChange}
                                        />
                                        <label>Major Rust</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 8: Engine and Driveline */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Engine and Driveline</legend>
                            <div>
                                <p className='sub-topic-report'>
                                    Engine Condition:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="engineCondition"
                                            value="good"
                                            checked={formState.engineCondition === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="engineCondition"
                                            value="needs_attention"
                                            checked={formState.engineCondition === 'needs_attention'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Attention</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>
                                        Exhaust System:
                                    </p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="exhaustSystem"
                                            value="good"
                                            checked={formState.exhaustSystem === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="exhaustSystem"
                                            value="needs_replacement"
                                            checked={formState.exhaustSystem === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="clearfix">
                                    <p className='sub-topic-report'>
                                        Driveline Components:
                                    </p>
                                </div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="drivelineComponents"
                                            value="good"
                                            checked={formState.drivelineComponents === 'good'}
                                            onChange={handleChange}
                                        />
                                        <label>Good</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="drivelineComponents"
                                            value="worn"
                                            checked={formState.drivelineComponents === 'worn'}
                                            onChange={handleChange}
                                        />
                                        <label>Worn</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="drivelineComponents"
                                            value="needs_replacement"
                                            checked={formState.drivelineComponents === 'needs_replacement'}
                                            onChange={handleChange}
                                        />
                                        <label>Needs Replacement</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    
                    {/* Topic 9: Other Safety Components */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Other Safety Components</legend>
                            <div>
                                <p className='sub-topic-report'>
                                    Fluid Leaks:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="fluidLeaks"
                                            value="yes"
                                            checked={formState.fluidLeaks === 'yes'}
                                            onChange={handleChange}
                                        />
                                        <label>Yes</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="fluidLeaks"
                                            value="no"
                                            checked={formState.fluidLeaks === 'no'}
                                            onChange={handleChange}
                                        />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='sub-topic-report'>
                                    Horn Operation:
                                </p>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="hornOperation"
                                            value="working"
                                            checked={formState.hornOperation === 'working'}
                                            onChange={handleChange}
                                        />
                                        <label>Working</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="hornOperation"
                                            value="not_working"
                                            checked={formState.hornOperation === 'not_working'}
                                            onChange={handleChange}
                                        />
                                        <label>Not Working</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Topic 10: Lights and Electrical Components */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Is The Vehicle Roadworthy?</legend>
                            <div>
                                <div className='role-container'>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="roadworthy"
                                            value="yes"
                                            checked={formState.roadworthy === 'yes'}
                                            onChange={handleChange}
                                        />
                                        <label>Yes, it is.</label>
                                    </div>
                                    <div className='role-radio'>
                                        <input
                                            type="radio"
                                            name="roadworthy"
                                            value="no"
                                            checked={formState.roadworthy === 'no'}
                                            onChange={handleChange}
                                        />
                                        <label>No, it is not.</label>
                                    </div>
                                </div>
                            </div>
                            <div className='input-box'>
                                <p className='sub-topic-report'>Additional Comments or Observations:</p>
                                <textarea
                                    name="additionalComments"
                                    value={formState.additionalComments}
                                    onChange={handleChange}
                                    placeholder='Enter additional comments or observations here...'
                                ></textarea>
                            </div>
                        </fieldset>
                    </div>

                    <br />
                    {/* Declaration checkboxes */}
                    <div className='ctr-report'>
                        <fieldset>
                            <legend>Declaration</legend>
                            <label>
                                <input
                                    type="checkbox"
                                    name="eRWCSubmitted"
                                    checked={formState.eRWCSubmitted}
                                    onChange={handleChange}
                                    required
                                />&nbsp;
                                I declare that I have submitted the eRWC.
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="informationTruthChecked"
                                    checked={formState.informationTruthChecked}
                                    onChange={handleChange}
                                    required
                                />&nbsp;
                                I declare that all the above information is true and has been checked by me.
                            </label>
                        </fieldset>
                    </div>

                    <button type="submit" className='btn-mechanic-submit-report'>Submit Report</button>
                </form>
            </div>
            {showPopup && <Popup message={invalidField} onClose={handleClosePopup} />}
        </div>
    );
}

export default MechanicReport;













    




