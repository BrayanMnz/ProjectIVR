
const { QueryTypes } = require('sequelize');
const db = require('./models/index');
const persona = require('./models/persona');


async function selectPersonas(){

    try {
        const personas = await db.sequelize.query("SELECT * FROM Persona", { 
        type: QueryTypes.SELECT
        }); 
        console.log(personas);
    } catch (error) {
        console.log(error);
    }

}


selectPersonas();