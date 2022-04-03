"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntitie = void 0;
class OrderEntitie {
    constructor() { }
    toLoad(props) {
        Object.assign(this, props);
    }
    toMap() {
        const nonEmptyFields = {
            customerId: '',
            productList: [],
        };
        for (const [key, value] of Object.entries(this)) {
            if (value) {
                nonEmptyFields[key] = value;
            }
        }
        return nonEmptyFields;
    }
}
exports.OrderEntitie = OrderEntitie;
