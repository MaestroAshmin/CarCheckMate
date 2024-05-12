import React,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
    return (
        <div>
            {reportDetails ? (
                <>
                    <p>Inspected Report ID: {id}</p>
                    <p>mechanicId: {reportDetails.mechanicId}</p>
                    <p>sellerId: {reportDetails.sellerId}</p>
                    <p>buyerId: {reportDetails.buyerId}</p>
                    
                    <p>bodyType: {reportDetails.carId.bodyType}</p>
                    {reportDetails?.carId?.carPhotos?.[0] && (
                    <img src={reportDetails.carId.carPhotos[0]} alt="Car Photo" />)}
                 
                    <p>color: {reportDetails.carId.color}</p>
                    <p>engineType: {reportDetails.carId.engineType}</p>
                    <p>fuelType: {reportDetails.carId.fuelType}</p>
        
                    <p>make: {reportDetails.carId.make}</p>
                    <p>model: {reportDetails.carId.model}</p>
                    <p>odometer: {reportDetails.carId.odometer}</p>
                    <p>postcode: {reportDetails.carId.postcode}</p>
                    <p>price: {reportDetails.carId.price}</p>
                    <p>registrationNo: {reportDetails.carId.registrationNo}</p>
                    
                    <p>state: {reportDetails.carId.state}</p>
                    <p>streetName: {reportDetails.carId.streetName}</p>
                    <p>suburb: {reportDetails.carId.suburb}</p>
                    <p>title: {reportDetails.carId.title}</p>
                    <p>transmission: {reportDetails.carId.transmission}</p>
                    <p>year: {reportDetails.carId.year}</p>


                    <p>treadDepth: {reportDetails.treadDepth}</p>
                    <p>tyreCondition: {reportDetails.tyreCondition}</p>
                    <p>wheelAlignment: {reportDetails.wheelAlignment}</p>
                    <p>brakePads: {reportDetails.brakePads}</p>
                    <p>discsDrums: {reportDetails.discsDrums}</p>
                    <p>brakeSystem: {reportDetails.brakeSystem}</p>
                    <p>steeringComponents: {reportDetails.steeringComponents}</p>
                    <p>shockAbsorbers: {reportDetails.shockAbsorbers}</p>
                    <p>suspensionSystem: {reportDetails.suspensionSystem}</p>
                    <p>headlights: {reportDetails.headlights}</p>
                    <p>brakeLights: {reportDetails.brakeLights}</p>
                    <p>indicators: {reportDetails.indicators}</p>
                    <p>seatBelts: {reportDetails.seatBelts}</p>
                    <p>seats: {reportDetails.seats}</p>
                    <p>childRestraintAnchorages: {reportDetails.childRestraintAnchorages}</p>
                    <p>windscreen: {reportDetails.windscreen}</p>
                    <p>wipers: {reportDetails.wipers}</p>
                    <p>visibilityWindows: {reportDetails.visibilityWindows}</p>
                    <p>bodyPanels: {reportDetails.bodyPanels}</p>
                    <p>chassis: {reportDetails.chassis}</p>
                    <p>engineCondition: {reportDetails.engineCondition}</p>
                    <p>exhaustSystem: {reportDetails.exhaustSystem}</p>
                    <p>drivelineComponents: {reportDetails.drivelineComponents}</p>
                    <p>fluidLeaks: {reportDetails.fluidLeaks}</p>
                    <p>hornOperation: {reportDetails.hornOperation}</p>
                    <p>roadworthy: {reportDetails.roadworthy}</p>
                    <p>additionalComments: {reportDetails.additionalComments}</p>



                </>
            ) : (
                <p>Loading...</p>
            )}
            {/* Other component content */}
        </div>
    );
}    