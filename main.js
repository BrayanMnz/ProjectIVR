
const { QueryTypes } = require('sequelize');
const db = require('./models/index');
const persona = require('./models/persona');


async function selectPersonas(){

        const personas = await db.sequelize.query("SELECT * FROM Persona where id_persona = 1", { 
        type: QueryTypes.SELECT
        }); 
        
        return  personas;
}


exports.selectPersonas = selectPersonas;