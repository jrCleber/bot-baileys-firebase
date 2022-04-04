"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCRUDService = void 0;
const uuid_1 = require("uuid");
class CustomerCRUDService {
    constructor(customerEntitie, customerControll) {
        this.customerEntitie = customerEntitie;
        this.customerControll = customerControll;
    }
    _toLoad(customerDTO) {
        this.customerEntitie.toLoad(customerDTO);
        this.customerEntitie.customerId = (0, uuid_1.v4)();
        this.customerEntitie.metadata = {
            createAt: Date.now(),
        };
    }
    async insertDocument(customerDTO) {
        this._toLoad(customerDTO);
        this.customerControll.insertDocWithId(this.customerEntitie.waid, this.customerEntitie.toMap());
        return this.customerEntitie.customerId;
    }
    updateDocument({ idDoc, field, data }) {
        this.customerControll.updateDoc(idDoc, field, data);
    }
    async findOne({ waid }) {
        return await this.customerControll.getDocumetId(waid);
    }
}
exports.CustomerCRUDService = CustomerCRUDService;
