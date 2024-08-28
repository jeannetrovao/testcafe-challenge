import ApiService from '../apiService';
import HomePage from '../pageObjects/HomePage';

fixture `Test 4`
    .page`./`;  // UI Application URL

test('Test 4 - Delete device from API and verify consistency on UI', async t => {
    // 1. Get devices list from API
    const devices = await ApiService.getDevices();

    const last = devices.length-1;
    const lastDeviceId = devices[last].id;
    const lastDeviceName = devices[last].system_name;
    const lastDeviceType = devices[last].type;
    const lastDeviceCapacity = devices[last].hdd_capacity;

    // 2. Delete the last element of the list
    await ApiService.deleteDevice(lastDeviceId);

    // 3. Check if the deleted device does not exist on the page
    // 3.1 Reload the page
    await t.eval(() => location.reload(true));

    // 3.2 Assert the device is not present anymore
    const { deviceExists } = await HomePage
        .verifyDeviceExists(lastDeviceName, lastDeviceType, lastDeviceCapacity);
    await t
        .expect(deviceExists).notOk(`Device ${lastDeviceName} is still visible on UI`)
});
