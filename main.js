
const { QueryTypes } = require('sequelize');
const db = require('./models/index');
const persona = require('./models/persona');


async function selectPersonas(){

        const personas = await db.sequelize.query("select * from PERSONA P where P.primeradosis = true and encuestado = false and ivr = true;", { 
        type: QueryTypes.SELECT,
        raw: true
        }); 
        
        return  personas;
}


async function insertSurvey(persona, objeto) {

      const sql =  `INSERT INTO public.survey (fiebre, uci, diarrea, garganta,  hospitalizado, nausea,  respirar, secrecionnasal, tos, persona) VALUES('${objeto.fiebre}', '${objeto.uci}', '${objeto.diarrea}', '${objeto.garganta}', '${objeto.hospitalizado}', '${objeto.nausea}', '${objeto.respirar}', '${objeto.secrecionnasal}', '${objeto.tos}', '${persona.id_persona}');`;

      return db.sequelize.query(sql, {
        type: QueryTypes.INSERT
      })

}




const personas = selectPersonas();

personas.then(function(result) { 

        result.forEach(auxPersona => {

                let object = {
                        "fiebre": false,
                        "uci": false,
                        "diarrea": false,
                        "hospitalizado": false,
                        "nausea": false,
                        "respirar": false,
                        "secrecionnasal": false,
                        "tos": false,
                        "garganta": false
                }

                console.log(auxPersona.nombrecompleto_persona);
                object.diarrea = true;

                // console.log(object);
                // console.log(' ');

                insertSurvey(auxPersona, object).then(function(result) {
                        console.log(result);
                        
                }).catch(error => console.log('error', error));
                
                
        })

       

})


exports.selectPersonas = selectPersonas;

exports.insertSurvey = insertSurvey;