import axios from 'axios';

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}` }
};

const MEASUREMENT_API = "https://a2raresback.herokuapp.com/measurement"

class MeasurementService{
    getMeasurement(){
        return axios.get(MEASUREMENT_API, config);
    }

    addMeasurement(measurement){
        return axios.post(MEASUREMENT_API, measurement, config);
    }
}

export default new MeasurementService;