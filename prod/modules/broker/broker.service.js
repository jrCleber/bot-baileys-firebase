"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokerService = void 0;
class BrokerService {
    constructor(brokerController, customerController, orderController) {
        this.brokerController = brokerController;
        this.customerController = customerController;
        this.orderController = orderController;
    }
}
exports.BrokerService = BrokerService;
