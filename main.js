const { QueryTypes } = require("sequelize");
const db = require("./models/index");
const persona = require("./models/persona");
const call = require("./calls");

async function selectPersonas() {
  const personas = await db.sequelize.query(
    "select * from PERSONA P where P.primeradosis = true and encuestado = false and ivr = true;",
    {
      type: QueryTypes.SELECT,
      raw: true,
    }
  );

  return personas;
}

async function insertSurvey(persona, objeto) {
  const sql = `INSERT INTO public.survey (fiebre, uci, diarrea, garganta,  hospitalizado, nausea,  respirar, secrecionnasal, tos, persona) VALUES('${objeto.fiebre}', '${objeto.uci}', '${objeto.diarrea}', '${objeto.garganta}', '${objeto.hospitalizado}', '${objeto.nausea}', '${objeto.respirar}', '${objeto.secrecionnasal}', '${objeto.tos}', '${persona.id_persona}');`;

  return db.sequelize.query(sql, {
    type: QueryTypes.INSERT,
  });
}

async function selectPhone(persona) {
  const movilQuery = `select C.movil_contacto  from Persona P join contacto C on C.id_contacto = P.contacto and P.id_persona = '${persona.id_persona}';`;

  const phone = await db.sequelize.query(movilQuery, {
    type: QueryTypes.SELECT,
  });

  return phone;
}

async function funcion(list) {
  for await (const auxPersona of list) {
    let object = {
      fiebre: false,
      uci: false,
      diarrea: false,
      hospitalizado: false,
      nausea: false,
      respirar: false,
      secrecionnasal: false,
      tos: false,
      garganta: false,
    };

    const phone = await selectPhone(auxPersona);

    await call.call(
      phone[0].movil_contacto.replace(/-/g, ""),
      auxPersona.nombrecompleto_persona
    );

    // insertSurvey(auxPersona, object).then(function(result) {
    //         console.log(result);

    // }).catch(error => console.log('error', error));
  }
}

const personas = selectPersonas();

personas.then(async function (result) {
  await funcion(result);
  console.log(JSON.stringify(result));
});

exports.selectPersonas = selectPersonas;
exports.selectPhone = selectPhone;

exports.insertSurvey = insertSurvey;
