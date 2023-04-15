const { plainToClass, classToPlain } = require('class-transformer');
const { db } = require("../dao/FirestoreClient")


export class FirebaseDAO {

    private collectionName : string
    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    async create(entity, id) {
        console.log(id)
        await db.collection(this.collectionName).doc(id).set(entity);
    }

    async read(id) {
        const query = await db.collection(this.collectionName).where('id', '==', id).get();

        var data
        query.forEach((doc) => {
            data = {...doc.data() }});
        return { ...data };
    }

    async update(entity) {
        await db.collection(this.collectionName).doc(entity.id).update(entity);
    }

    async delete(id) {
        await db.collection(this.collectionName).doc(id).delete();
    }

    async list() {
        const snapshot = await db.collection(this.collectionName).get();
        const entities = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            entities.push({ id: doc.id, ...data });
        });
        return entities;
    }

    async 
}
