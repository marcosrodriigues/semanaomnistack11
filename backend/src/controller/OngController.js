const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection');

module.exports = {
    async index(req, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();

        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
    
            return response.json({ id });
        } catch (err) {
            return response.json({error: "Ocorreu um erro ao cadastrar. " + err})
        }
        
    }
}