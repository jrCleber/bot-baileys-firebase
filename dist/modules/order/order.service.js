"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCRUDService = void 0;
const uuid_1 = require("uuid");
class OrderCRUDService {
    constructor(orderEntitie, orderController) {
        this.orderEntitie = orderEntitie;
        this.orderController = orderController;
    }
    _toLoad(orderDTO) {
        this.orderEntitie.toLoad(orderDTO);
        this.orderEntitie.orderId = (0, uuid_1.v4)();
        this.orderEntitie.metadata = orderDTO.metadata;
    }
    insertDocument(orderDTO) {
        this._toLoad(orderDTO);
        console.log('order: ', this.orderEntitie.toMap());
        this.orderController.insertDocWithId(this.orderEntitie.orderId, this.orderEntitie.toMap());
        return { orderId: this.orderEntitie.orderId };
    }
}
exports.OrderCRUDService = OrderCRUDService;
