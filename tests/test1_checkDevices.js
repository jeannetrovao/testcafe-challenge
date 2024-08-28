import HomePage from '../pageObjects/HomePage';
import ApiService from '../apiService';

fixture `Test 1`
    .page`./`;  // UI URL

test('Test 1 - Get devices list on API and find devices on UI', async t => {

    // 1. Get devices list from API
    const devices = await ApiService.getDevices();

    // 2. Check if all devices are visible in the DOM with correct values and buttons
    for (const device of devices) {

        const apiDeviceName = device.system_name;
        const apiDeviceType = device.type;
        const apiDeviceCapacity = device.hdd_capacity;

        console.log("Checking device: " + apiDeviceName, apiDeviceType, apiDeviceCapacity);

        // 2.1. Check if device exists on the page and if name, type and capacity are displayed correctly
        const { deviceExists, nameVisible, typeVisible, capacityVisible } = await HomePage
            .verifyDeviceExists(apiDeviceName, apiDeviceType, apiDeviceCapacity);

        await t
            .expect(deviceExists).ok(`Device ${apiDeviceName} not found on the page`)
            .expect(nameVisible).ok(`Incorrect / not visible name for the device ${apiDeviceName}`)
            .expect(typeVisible).ok(`Incorrect / not visible type for the device ${apiDeviceName}`)
            .expect(capacityVisible).ok(`Incorrect / not visible capacity for the device ${apiDeviceName}`);

        // 2.2. Check if the device contains the edit and delete buttons
        const editButtonExists = await HomePage.hasEditButton(apiDeviceName);
        const removeButtonExists = await HomePage.hasRemoveButton(apiDeviceName);
        
        await t
            .expect(editButtonExists).ok(`Edit button not found for the device ${apiDeviceName}`)
            .expect(removeButtonExists).ok(`Delete button not found for the device ${apiDeviceName}`);
        }
});
