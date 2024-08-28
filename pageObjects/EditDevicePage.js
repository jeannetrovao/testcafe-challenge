import { Selector, t } from 'testcafe';

class EditDevicePage {
    constructor() {
        this.deviceNameField = Selector('input[name="system_name"]');
        this.updateButton = Selector('button.submitButton');
    }

    async updateDeviceName(newName) {
        await t
            .typeText(this.deviceNameField, newName, { replace: true })
            .click(this.updateButton);
    }
}

export default new EditDevicePage();