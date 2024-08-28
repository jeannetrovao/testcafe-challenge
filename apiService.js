import { t } from 'testcafe';

class ApiService {

    constructor() {
        this.apiURL = 'http://localhost:3000';  // base URL for API
    }

    async getDevices() {
        // Get devices list from API
        const response = await t.request({
            url: `${this.apiURL}/devices`,
            method: 'GET'
        });
        // Check if API response was successful
        await t.expect(response.status).eql(200, 'Failed to fetch device list from API');
        // Send the 'devices' array
        return response.body;
    }

    async deleteDevice(id){
        // Delete the device with the id
        const response = await t.request({
        url: `http://localhost:3000/devices/${id}`, //API URL
        method: 'DELETE'
        });
        // Check if API response was successful
        await t
            .expect(response.status).eql(200, 'Failed to execute request on API')
            .expect(response.body).eql(1, 'Failed to delete device from API'); 
    }
    
    // async getDeviceById(id) {
    //     const response = await t.request({
    //         url: `${this.apiURL}/devices/${id}`,
    //         method: 'GET'
    //     });
    //     return response.body;
    // }
}

export default new ApiService();