import React, { useState } from 'react'
import SensorComponent from "./sensorsComponent";
import { ref, child, get, onValue } from "firebase/database"
import {database} from '../server';


export default function SensorsV1(props) {

    const [sensors, setSensors] = useState()

    const getValues = () => {
        const databaseRef = ref(database, "/Sensors");
        const refData = ref(database);
        get(child(refData, "/Sensors"))
            .then((data) => updateSensors(data.val()))
            .catch((error) => console.error(error));
        onValue(databaseRef, (data) => { updateSensors(data.val()) });
    }
    const updateSensors = (data) => {
        let arr = []
        for (var i in data) {
            if (typeof (data[i]) == 'object')
                arr.push(data[i])
        }
        var sensingDevice = arr.map(({ name, status, percentage }, i) => (
            <SensorComponent
                key={i}
                name={name}
                status={status}
                percentage={percentage}
            />
        ));

        setSensors(sensingDevice)
    }
    getValues();
    return (
        <div className="flex flex-col gap-5 md:flex-row justify-items-center md:justify-evenly bg-lime-200 w-full md:w-1/2 mx-auto px-28 py-12 md:p-12">
            {sensors}
        </div>
    );

}
