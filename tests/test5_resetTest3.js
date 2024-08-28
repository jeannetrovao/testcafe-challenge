import ApiService from '../apiService';

fixture `Test 5`

test('Test 5 - Reset the devices list after tests', async t => {
    // 1. Get devices list from API
    const devices = await ApiService.getDevices();

    // 1.2. Get Device id from the first item
    const firstDeviceId = devices[0].id;

    // 2. Update the first device changed on Test 3
    const putResponse = await t.request({
        url: `http://localhost:3000/devices/${firstDeviceId}`, //API URL
        method: 'PUT',
        body: {
            "system_name": "DESKTOP-SMART",
            "type": "WINDOWS",
            "hdd_capacity": "10"
        }
    });
    // 2.1. Check if API response was successful
    await t.expect(putResponse.status).eql(200, 'Failed to update device');
});
