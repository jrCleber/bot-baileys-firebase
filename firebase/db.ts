/* eslint-disable prettier/prettier */
import { DbConn } from './connection';
import { firestore } from 'firebase-admin';

/**
 * creating the class that will do the CRUD
 * @AddData https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
 * @UpdateData https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
 * @GetData https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
 * @GedAllData https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
 * @SimpleQuery https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
 * @QueryOperators https://firebase.google.com/docs/firestore/query-data/queries#query_operators
 * @CompoundQueries https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
 */
export class DbFirestore {
   constructor(public collection: string) { }

   // passing the name of the collection
   private readonly _db = new DbConn(this.collection).instance;

   /**
    * returning all documents from the collection
    * @returns returns a list of all documents in the collection
    */
   public async getAllDocuments(): Promise<
      firestore.QueryDocumentSnapshot<firestore.DocumentData>[] | null
   > {
      try {
         const querySnapshots = await this._db.collection(this.collection).get();
         return querySnapshots.docs;
      } catch (error) {
         console.log('Erro durante a busca - getAllDocuments: ', error);
         return null;
      }
   }

   /**
    * returned document by id
    * @param idDoc a string containing the id of the document to be returned
    * @returns returns the document found or null
    */
   public async getDocumetId(idDoc: string): Promise<firestore.DocumentSnapshot<firestore.DocumentData> | null> {
      try {
         const documentReference = await this._db.collection(this.collection).doc(idDoc).get();
         return documentReference;
      } catch (error) {
         console.log('Erro durante a busca - getDocumetId: ', error);
         return null;
      }
   }

   /**
    * retrieving document by id with where clause
    * @param field field name to perform the comparison
    * @param opStr comparison operators === | == | >= | <= | !== | != | array-contains | array-contains-any | in | not-in
    * @Docs https://firebase.google.com/docs/firestore/query-data/queries
    * @param value value to be compared can be string types | boolean | number | null | array | map
    * @returns returns a list of found documents
    */
   public async getDocumentWhere(
      field: string | firestore.FieldPath,
      opStr: firestore.WhereFilterOp,
      value: any,
   ): Promise<firestore.QueryDocumentSnapshot<firestore.DocumentData>[]> {
      try {
         const documentReference = await this._db
            .collection(this.collection)
            .where(field, opStr, value)
            .get();
         return documentReference.docs;
      } catch (error) {
         console.log('Erro durante a busca - getDocumentIdWhere: ', error);
         return null;
      }
   }

   /**
    * insert with dynamic id
    * @param data an object of type { key: value } - where key: string and value: string | boolean | number | null | array | map
    * but remember: none of these values can be of type undefined or contain an undefined. Undefined type is not supported by firebase
    * @returns returns the id generated dynamically by the bank
    */
   public async insertDoc(data: any): Promise<string> {
      try {
         // returns the id of the dynamically generated document
         const documentReference = await this._db.collection(this.collection).add(data);
         return documentReference.id;
      } catch (error) {
         console.log('Erro ao inserir - insertDoc: ', error);
         return '';
      }
   }

   /**
    * insert with defined id
    * @param idDoc a string that references the document to be deleted
    * @param data an object of type { key: value } - where key: string and value: string | boolean | number | null | array | map
    * but remember: none of these values can be of type undefined or contain an undefined. Undefined type is not supported by firebase    * @default {insertDate:true}
    */
   public insertDocWithId(idDoc: string, data: any): void {
      try {
         this._db
            .collection(this.collection)
            .doc(idDoc)
            .set(data)
            .then((result) => console.log('Documento inserido: ', result));
      } catch (error) {
         console.log('Erro ao inserir - insertDocWithId: ', error);
      }
   }

   /**
    * update a document
    * @param idDoc a string that references the document to be deleted
    * @param field field name to be updated in the document
    * @param fieldValue a value that must be of type string | boolean | number | null | array | map
    * but remember: none of these values can be of type undefined or contain an undefined. Undefined type is not supported by firebase
    * @returns returns a document with the result of the update
    */
   public async updateDoc(
      idDoc: string,
      field: string,
      fieldValue: any,
   ): Promise<firestore.WriteResult | undefined> {
      try {
         const data = { [field]: fieldValue };
         const writeResult = await this._db.collection(this.collection).doc(idDoc).update(data);
         return writeResult;
      } catch (error) {
         console.log('Erro ao atualizar documento - updateDoc: ', error);
      }
   }

   /**
     * updating multiple fields at once
     * this function does not automatically insert the date time of the update in the database.
     * you insert in the fields you want to update, eg:
        const manyFields = {
            name: 'your name',
            sobreNome: 'Your surname',
            updateAt: Date.now() || new Date() || firestore.FieldValue.serverTimestamp()
        }
        updateManyFields('seu id', manyFields)      
     * @param idDoc one which string references the document to be updated
     * @param manyFields an object of type { key: value } as parameters for the update
     * @returns returns a document with the result of the update
     */
   public async updateManyFields(
      idDoc: string,
      manyFields: any,
   ): Promise<firestore.WriteResult | undefined> {
      try {
         const writeResult = await this._db
            .collection(this.collection)
            .doc(idDoc)
            .update(manyFields);
         return writeResult;
      } catch (error) {
         console.log('Erro ao atualizar documento - updateManyFields: ', error);
      }
   }

   /**
    * deleting a document
    * @param idDoc a string that references the document to be deleted
    * @returns returns a document with the result of the deletion
    */
   public async deleteDoc(idDoc: string): Promise<firestore.WriteResult | undefined> {
      try {
         const res = await this._db.collection(this.collection).doc(idDoc).delete();
         return res;
      } catch (error) {
         console.log('Erro ao deletar documento - deleteDoc: ', error);
      }
   }
}
