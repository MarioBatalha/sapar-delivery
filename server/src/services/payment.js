module.export = {
    createSplitTransaction: async (data) => {
        try {
            const result = await db.collection('payment').insertOne(data);
            return { error: false, result}
        } catch(err) {
            return { error: true, message: err.message }
        }
    }
}