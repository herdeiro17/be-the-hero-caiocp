const crypto = require('crypto');//pacote de criptografia de dados utilizado para gerar o ID da ONG
const connection = require('../database/connection');//pequeno código que faz a linkagem com o banco de dados

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //código utilizado p/ gerar id criptgrafado p/ cada ONG
        await connection('ongs').insert( {
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //console.log(body) //este daqui é apenas para printar no terminal o que está acontecendo no programa
        return response.json({ id });
        }
}