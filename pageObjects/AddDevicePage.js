import { Selector, t } from 'testcafe';

class AddDevicePage {
    constructor() {
        this.deviceNameField = Selector('input[name="system_name"]');
        this.deviceTypeField = Selector('select[name="type"]');
        this.deviceCapacityField = Selector('input[name="hdd_capacity"]');
        this.saveButton = Selector('button.submitButton');
    }

    async fillDeviceName(name) {
        await t.typeText(this.deviceNameField, name);
    }

    async selectDeviceType(type) {
        await t
            .click(this.deviceTypeField)
            .click(this.deviceTypeField.find('option').withText(type));
    }

    async fillDeviceCapacity(capacity) {
        await t.typeText(this.deviceCapacityField, capacity);
    }

    async saveDevice() {
        await t.click(this.saveButton);
    }

    async addDevice(name, type, capacity) {
        await this.fillDeviceName(name);
        await this.selectDeviceType(type);
        await this.fillDeviceCapacity(capacity);
        await this.saveDevice();
    }
}

export default new AddDevicePage();