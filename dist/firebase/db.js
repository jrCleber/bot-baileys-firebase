"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbFirestore = void 0;
const connection_1 = require("./connection");
class DbFirestore {
    constructor(collection) {
        this.collection = collection;
        this._db = new connection_1.DbConn(this.collection).instance;
    }
    async getAllDocuments() {
        try {
            const querySnapshots = await this._db.collection(this.collection).get();
            return querySnapshots.docs;
        }
        catch (error) {
            console.log('Erro durante a busca - getAllDocuments: ', error);
            return null;
        }
    }
    async getDocumetId(idDoc) {
        try {
            const documentReference = await this._db.collection(this.collection).doc(idDoc).get();
            return documentReference;
        }
        catch (error) {
            console.log('Erro durante a busca - getDocumetId: ', error);
            return null;
        }
    }
    async getDocumentWhere(field, opStr, value) {
        try {
            const documentReference = await this._db
                .collection(this.collection)
                .where(field, opStr, value)
                .get();
            return documentReference.docs;
        }
        catch (error) {
            console.log('Erro durante a busca - getDocumentIdWhere: ', error);
            return null;
        }
    }
    async insertDoc(data) {
        try {
            const documentReference = await this._db.collection(this.collection).add(data);
            return documentReference.id;
        }
        catch (error) {
            console.log('Erro ao inserir - insertDoc: ', error);
            return '';
        }
    }
    insertDocWithId(idDoc, data) {
        try {
            this._db
                .collection(this.collection)
                .doc(idDoc)
                .set(data)
                .then((result) => console.log('Documento inserido: ', result));
        }
        catch (error) {
            console.log('Erro ao inserir - insertDocWithId: ', error);
        }
    }
    async updateDoc(idDoc, field, fieldValue) {
        try {
            const data = { [field]: fieldValue };
            const writeResult = await this._db.collection(this.collection).doc(idDoc).update(data);
            return writeResult;
        }
        catch (error) {
            console.log('Erro ao atualizar documento - updateDoc: ', error);
        }
    }
    async updateManyFields(idDoc, manyFields) {
        try {
            const writeResult = await this._db
                .collection(this.collection)
                .doc(idDoc)
                .update(manyFields);
            return writeResult;
        }
        catch (error) {
            console.log('Erro ao atualizar documento - updateManyFields: ', error);
        }
    }
    async deleteDoc(idDoc) {
        try {
            const res = await this._db.collection(this.collection).doc(idDoc).delete();
            return res;
        }
        catch (error) {
            console.log('Erro ao deletar documento - deleteDoc: ', error);
        }
    }
}
exports.DbFirestore = DbFirestore;
