import { Selector } from 'testcafe';

class HomePage {
    constructor() {
        //device container
        this.deviceContainer = '.device-main-box';
        this.deviceInfo = '.device-info'; 
        this.name = '.device-name';
        this.type = '.device-type';
        this.capacity = '.device-capacity';
        this.editButton = '.device-options .device-edit';
        this.removeButton = '.device-options .device-remove';

        this.addDeviceButton = 'a.submitButton';
    }

    async verifyDeviceExists(deviceName, deviceType, deviceCapacity) {
        const device = Selector(this.deviceInfo).withText(deviceName);
        const deviceExists = await device.exists;

        if (!deviceExists) {
            return { deviceExists, nameVisible: false, typeVisible: false, capacityVisible: false };
        }

        const nameVisible = await device.find(this.name).withExactText(deviceName).visible;
        const typeVisible = await device.find(this.type).withExactText(deviceType).visible;
        const capacityVisible = await device.find(this.capacity).withExactText(deviceCapacity + " GB").visible;

        return { deviceExists, nameVisible, typeVisible, capacityVisible };
    }

    async hasEditButton(deviceName) {
        const device = Selector(this.deviceContainer).find(this.deviceInfo).withText(deviceName);
        const editButton = device.sibling(0).find(this.editButton); //finds the Edit button inside the same Container
        return editButton.exists;
    }

    async hasRemoveButton(deviceName) {
        const device = Selector(this.deviceContainer).find(this.deviceInfo).withText(deviceName);
        const removeButton = device.sibling(0).find(this.removeButton); //finds the Remove button inside the same Container
        return removeButton.exists;
    }

    async nthDevice(index) {
        return Selector(this.deviceInfo).nth(index);
    }

    async nthEditButton(index){
        const nthDeviceInfo = await this.nthDevice(index);
        return nthDeviceInfo.sibling(0).find(this.editButton);
    }

    async getNthDeviceName(index){
        const nthDeviceInfo = await this.nthDevice(index);
        return nthDeviceInfo.find(this.name).innerText;
    }
}

export default new HomePage();