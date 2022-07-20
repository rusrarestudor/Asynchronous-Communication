import axios from 'axios';

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}` }
};

const DEVICE_API = "https://a2raresback.herokuapp.com/device"


class DeviceService{

    
   getDevices(){
        return axios.get(DEVICE_API, config);
    }

    addDevice(device){
        return axios.post(DEVICE_API, device, config);
    }

    getDeviceById(deviceId){
        return axios.get(`${DEVICE_API}/${deviceId}`, config);
    }

    updateDevice(deviceId, device){
        return axios.put(`${DEVICE_API}/${deviceId}`, device, config);
    }

    deleteDevice(deviceId){
        return axios.delete(`${DEVICE_API}/${deviceId}`, config);
    }

}

export default new DeviceService()