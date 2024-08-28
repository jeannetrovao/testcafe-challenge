import HomePage from '../pageObjects/HomePage';
import EditDevicePage from '../pageObjects/EditDevicePage';

fixture `Test 3`
    .page`./`;  // UI URL

test('Test 3 - Rename device', async t => {

    const newDeviceName = "Renamed Device"

    //const firstDevice = await HomePage.nthDevice(0);
    const firstDeviceEditButton = await HomePage.nthEditButton(0);

    // 1. Rename first device
    await t.click(firstDeviceEditButton);
    await EditDevicePage.updateDeviceName(newDeviceName);

    // 2. Reloads the page
    await t.eval(() => location.reload(true));
    
    // 3. Assert the first device name changed
    const firstDeviceName = await HomePage.getNthDeviceName(0);
    await t
        .expect(firstDeviceName).eql(newDeviceName, `First device name should be ${newDeviceName} but is displayed as ${firstDeviceName}`);

});
