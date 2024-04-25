import React from "react";
import '../../pages/styles/main.css';
import '../styles/information.css';
import InfoSearchMechanic from "./InfoSearchMechanic";
import InfoCarType from "./InfoCarType";
import InfoHowToBuyCar from "./InfoHowToBuyCar";


export default function Information() {
    return (
        <div className='ctr-main-information'>
            <InfoHowToBuyCar />
            <InfoCarType />
            <InfoSearchMechanic />
        </div>
    );
}