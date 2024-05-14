import React,{ useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderNav from '../../components/scripts/HeaderNav';
import UserNav from '../../components/scripts/UserNav';
import Footer from '../../components/scripts/footer';

export default function InspectedReport()  {
    const { id } = useParams();
    const [inspectedData,setInspectedData] = useState([])
    const [reportDetails, setReportDetails] = useState(null);
    // Now 'id' contains the value of the ID parameter from the URL

    console.log(reportDetails)


    const getAllForms = async () => {
        try {
            const response = await axios.get('http://localhost:3000/inspections/inspected-form');
            setInspectedData(response.data);
        } catch (error) {
            console.error('Error fetching all forms:', error);
            throw error;
        }
    };

    // Use the 'id' for further processing or rendering
    useEffect(() => {
        getAllForms();
        // Filter inspectedData to find the report with matching id
        const filteredReport = inspectedData.find(report => report._id === id);
        setReportDetails(filteredReport);
    }, [id, inspectedData]);

    const transformText = (text) => {
        if (typeof text !== 'string') {
            return text;
        }
        return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                    <UserNav />
                    <p className='user-title'>M e c h a n i c</p>
                    <div className='ctr-user-content'>
                        <div className='ctr-inspection-report'>
                            <h3>Inspection Report</h3>
                            {reportDetails ? (
                                <>
                                    {/*<p>Inspected Report ID: <span>{id}</span></p>
                                    <p>mechanicId: <span>{reportDetails.mechanicId}</span></p>
                                    <p>sellerId: <span>{reportDetails.sellerId}</span></p>
                                    <p>buyerId: <span>{reportDetails.buyerId}</span></p>*/}
                                    
                                    <p className='report-title'>{reportDetails.carId.title}</p>
                                    <div className='report-car-details'>
                                        <div className='report-details'>
                                            <h4>Location:</h4>
                                            <p>
                                                <span className='report-details-span'>
                                                    {reportDetails.carId.streetName},&nbsp;
                                                    {reportDetails.carId.suburb}&nbsp;
                                                    {reportDetails.carId.state}&nbsp;
                                                    {reportDetails.carId.postcode}
                                                </span>
                                            </p>

                                            <br />

                                            <h4>Vehicle Details:</h4>
                                            <p>Body Type: <span className='report-details-span'>{transformText(reportDetails.carId.bodyType)}</span></p>
                                            <p>Color: <span className='report-details-span'>{transformText(reportDetails.carId.color)}</span></p>
                                            <p>Make: <span className='report-details-span'>{transformText(reportDetails.carId.make)}</span></p>
                                            <p>Model: <span className='report-details-span'>{transformText(reportDetails.carId.model)}</span></p>
                                            <p>Year: <span className='report-details-span'>{transformText(reportDetails.carId.year)}</span></p>
                                            <p>Odometer: <span className='report-details-span'>{transformText(reportDetails.carId.odometer)}</span></p>
                                            <p>Price: <span className='report-details-span'>{transformText(reportDetails.carId.price)}</span></p>
                                            <p>Registration No.: <span className='report-details-span'>{transformText(reportDetails.carId.registrationNo)}</span></p>

                                            <br />
                                        </div>

                                        {reportDetails?.carId?.carPhotos?.[0] && (
                                        <img src={reportDetails.carId.carPhotos[0]} alt="Car Photo" />)}
                                    </div>
                                    
                                    <div className='report-car-inspect-details'>
                                        <div className='report-details'>
                                            <h4>Engine and Fuel:</h4>
                                            <p>Engine Type: <span className='report-details-span'>{transformText(reportDetails.carId.engineType)}</span></p>
                                            <p>Fuel Type: <span className='report-details-span'>{transformText(reportDetails.carId.fuelType)}</span></p>

                                            <br />

                                            <h4>Engine and Exhaust:</h4>   
                                            <p>Engine Condition: <span className='report-details-span'>{transformText(reportDetails.engineCondition)}</span></p>
                                            <p>Exhaust System: <span className='report-details-span'>{transformText(reportDetails.exhaustSystem)}</span></p>

                                            <br />

                                            <h4>Transmission:</h4>
                                            <p><span className='report-details-span'>{transformText(reportDetails.carId.transmission)}</span></p>

                                            <br />

                                            <h4>Tyres and Wheels:</h4>
                                            <p>Tread Depth: <span className='report-details-span'>{transformText(reportDetails.treadDepth)}</span></p>
                                            <p>Tyre Condition: <span className='report-details-span'>{transformText(reportDetails.tyreCondition)}</span></p>
                                            <p>Wheel Alignment: <span className='report-details-span'>{transformText(reportDetails.wheelAlignment)}</span></p>

                                            <br />

                                            <h4>Brakes:</h4>
                                            <p>Brake Pads: <span className='report-details-span'>{transformText(reportDetails.brakePads)}</span></p>
                                            <p>Discs/Drums: <span className='report-details-span'>{transformText(reportDetails.discsDrums)}</span></p>
                                            <p>Brake System: <span className='report-details-span'>{transformText(reportDetails.brakeSystem)}</span></p>

                                            <br />
                                        </div>

                                        <div className='report-details'>
                                            <h4>Steering and Suspension:</h4>
                                            <p>Steering Components: <span className='report-details-span'>{transformText(reportDetails.steeringComponents)}</span></p>
                                            <p>Shock Absorbers: <span className='report-details-span'>{transformText(reportDetails.shockAbsorbers)}</span></p>
                                            <p>Suspension System: <span className='report-details-span'>{transformText(reportDetails.suspensionSystem)}</span></p>

                                            <br />

                                            <h4>Lights and Signals:</h4>
                                            <p>Headlights: <span className='report-details-span'>{transformText(reportDetails.headlights)}</span></p>
                                            <p>Brake Lights: <span className='report-details-span'>{transformText(reportDetails.brakeLights)}</span></p>
                                            <p>Indicators: <span className='report-details-span'>{transformText(reportDetails.indicators)}</span></p>

                                            <br />

                                            <h4>Safety Features:</h4>
                                            <p>Seat Belts: <span className='report-details-span'>{transformText(reportDetails.seatBelts)}</span></p>
                                            <p>Seats: <span className='report-details-span'>{transformText(reportDetails.seats)}</span></p>
                                            <p>Child Restraint Anchorages: <span className='report-details-span'>{transformText(reportDetails.childRestraintAnchorages)}</span></p>

                                            <br />

                                            <h4>Windscreen and Visibility:</h4>              
                                            <p>Windscreen: <span className='report-details-span'>{transformText(reportDetails.windscreen)}</span></p>
                                            <p>Wipers: <span className='report-details-span'>{transformText(reportDetails.wipers)}</span></p>
                                            <p>Visibility Windows: <span className='report-details-span'>{transformText(reportDetails.visibilityWindows)}</span></p>

                                            <br />
                                        </div>

                                        <div className='report-details'>
                                            <h4>Body and Chassis:</h4>
                                            <p>Body Panels: <span className='report-details-span'>{transformText(reportDetails.bodyPanels)}</span></p>
                                            <p>Chassis: <span className='report-details-span'>{transformText(reportDetails.chassis)}</span></p>

                                            <br />

                                            <h4>Driveline and Fluids:</h4>
                                            <p>Driveline Components: <span className='report-details-span'>{transformText(reportDetails.drivelineComponents)}</span></p>
                                            <p>Fluid Leaks: <span className='report-details-span'>{transformText(reportDetails.fluidLeaks)}</span></p>

                                            <br />

                                            <h4>Other Features:</h4>
                                            <p>Horn Operation: <span className='report-details-span'>{transformText(reportDetails.hornOperation)}</span></p>
                                            <p>Roadworthy: <span className='report-details-span'>{transformText(reportDetails.roadworthy)}</span></p>
                                            <p>Additional Comments: <span className='report-details-span'>{transformText(reportDetails.additionalComments)}</span></p>

                                            <br />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                            {/* Other component content */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}    