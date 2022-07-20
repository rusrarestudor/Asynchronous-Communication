import axios from 'axios';

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}` }
};

const SENSOR_API = "https://a2raresback.herokuapp.com/sensor"


class SensorService{

    getSensors(){
        return axios.get(SENSOR_API, config);
    }

    addSensor(sensor){
        return axios.post(SENSOR_API, sensor, config);
    }

    getSensorById(sensorId){
        return axios.get(`${SENSOR_API}/${sensorId}`, config);
    }

    updateSensor(sensorId, sensor){
        return axios.put(`${SENSOR_API}/${sensorId}`, sensor, config);
    }

    deleteSensor(sensorId){
        return axios.delete(`${SENSOR_API}/${sensorId}`, config);
    }

}

export default new SensorService()