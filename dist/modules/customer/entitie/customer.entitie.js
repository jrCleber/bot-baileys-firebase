"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEntitie = void 0;
class CustomerEntitie {
    constructor() { }
    toLoad(props) {
        Object.assign(this, props);
    }
    toMap() {
        const nonEmptyFields = {
            pushName: '',
            metadata: {
                createAt: 0,
                updateAt: 0,
            },
            waid: '',
        };
        for (const [key, value] of Object.entries(this)) {
            if (value) {
                nonEmptyFields[key] = value;
            }
        }
        return nonEmptyFields;
    }
}
exports.CustomerEntitie = CustomerEntitie;
