import HomePage from '../pageObjects/HomePage';
import AddDevicePage from '../pageObjects/AddDevicePage';

fixture `Test 2`
    .page`./`;  // UI URL

test('Test 2 - Add new device', async t => {

    const deviceName = "THUNDER-MAC"
    const deviceType = "MAC"
    const deviceCapacity = "1024"
    
    // 1. Add device
    await t.click(HomePage.addDeviceButton);    
    await AddDevicePage.addDevice(deviceName, deviceType, deviceCapacity);

    // 2. Check if device exists on the page and if name, type and capacity are displayed correctly
    const { deviceExists, nameVisible, typeVisible, capacityVisible } = await HomePage
    .verifyDeviceExists(deviceName, deviceType, deviceCapacity);

    await t
    .expect(deviceExists).ok(`Device ${deviceName} not found on the page`)
    .expect(nameVisible).ok(`Incorrect / not visible name for the device ${deviceName}`)
    .expect(typeVisible).ok(`Incorrect / not visible type for the device ${deviceName}`)
    .expect(capacityVisible).ok(`Incorrect / not visible capacity for the device ${deviceName}`);
});
