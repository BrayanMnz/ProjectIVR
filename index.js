const { VoiceServer } = require("@fonoster/voice");
const GoogleTTS = require("@fonoster/googletts");
const GoogleASR = require("@fonoster/googleasr");
const voiceServer = new VoiceServer();
const speechConfig = { keyFilename: "./google.json" };

const { QueryTypes } = require("sequelize");
const db = require("./models/index");

const main = require("./main");

// Set the server to use the speech APIS
voiceServer.use(new GoogleTTS(speechConfig));
voiceServer.use(new GoogleASR(speechConfig));

async function handler(request, response, verb, option) {
  await response.answer();
  // const digits = await response.gather({ source: "dtmf,speech", numDigits: 1 });

  let text = "9";

  if (option == "1") {
    const speech = await response.gather({ source: "speech" });
    console.log("You said " + speech);

    if (
      speech.includes("see") ||
      speech.includes("si") ||
      speech.includes("s")
    ) {
      text = "1";
    }
    if (speech.includes("no") || speech.includes("not")) {
      text = "0";
    }
  }
  if (option == "0") {
    const digits = await response.gather({
      source: "dtmf,speech",
      numDigits: 1,
    });
    text = digits;
  }

  // console.log("digits: " + digits);
  switch (text) {
    case "1":
      return true;

    case "0":
      return false;

    default:
      await response.say(
        "Ha insertado una respuesta incorrecta. Las respuestas válidas son:  UNO para responder con SÍ. Y CERO para responder con NO.",
        { name: "es-US-Standard-B" }
      );

      await response.say(verb, { name: "es-US-Standard-B" });
      return await handler(request, response, verb, option);
  }
}

async function insertSurvey(persona, objeto) {
  const sql = `INSERT INTO public.survey (fiebre, uci, diarrea, garganta,  hospitalizado, nausea,  respirar, secrecionnasal, tos, persona) VALUES('${objeto.fiebre}', '${objeto.uci}', '${objeto.diarrea}', '${objeto.garganta}', '${objeto.hospitalizado}', '${objeto.nausea}', '${objeto.respirar}', '${objeto.secrecionnasal}', '${objeto.tos}', '${persona.id_persona}');`;

  const sqlupdate = `UPDATE public.persona SET encuestado=true WHERE id_persona=:idvar`
  db.sequelize.query(sqlupdate, {
    replacements: { idvar: persona.id_persona},
    type: QueryTypes.UPDATE,
  })

  return db.sequelize.query(sql, {
    type: QueryTypes.INSERT,
  });
}

voiceServer.listen(async (req, res) => {
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

 const nombrePersona = req.metadata.persona.nombrecompleto_persona;

  //const nombrePersona = "Brayan";
  console.log(req);
  await res.answer();
  // To use this verb you MUST have a TTS plugin
  //   const speech = await res.gather({source: "speech"});
  //   console.log(speech);
  //  await res.say("You said " + speech);

  await res.say(
    "Hola, esta llamada corresponde con una encuesta para conocer el estado de salud luego de recibir su vacuna contra el COVID 19. " +
      "Para responder las preguntas con su voz, pulse uno. Si desea responder con el teclado de su dispositivo pulse el cero.  UNO para voz, CERO para teclas. ",
    { name: "es-US-Standard-B" }
  );
  const option = await res.gather({ source: "dtmf,speech", numDigits: 1 });
  const auxoption = "1";

  let ciudadano = "";
  if (option == "1") {
    ciudadano =
      "Es la persona respondiendo esta encuesta el ciudadano " +
      nombrePersona +
      ".  Responda Sí ó no con su voz.";
  } else {
    ciudadano =
      "Es la persona respondiendo esta encuesta el ciudadano " +
      nombrePersona +
      `.  Si su respuesta es SÍ. marque uno.  Si es otra persona asistiendolo. Marque el cero `;
  }

  await res.say(
    "Hola, esta llamada corresponde con una encuesta para conocer el estado de salud luego de recibir su vacuna contra el COVID 19. " +
      ciudadano,
    { name: "es-US-Standard-B" }
  );
  const answ_1 = await handler(req, res, ciudadano, option);
  console.log("ES LA PERSONA -->" + answ_1);

  // await res.say(
  //   ciudadano +
  //     `.  Si su respuesta es SÍ. marque uno.  Si es otra persona asistiendolo. Marque el cero `,
  //   { name: "es-US-Standard-B" }
  // );

  fiebre = "Has presentado fiebre mayor a 38 grados los últimos dias ?";
  await res.say(
    "Hola " +
      nombrePersona +
      `. PARA ESTA Y TODAS LAS PREGUNTAS DE LA ENCUESTA, SI DESEAS RESPONDER CON UN: SI. MARCA UNO.  SI TU RESPUESTA US UN:  NO. MARCA EL CERO.` +
      fiebre,
    { name: "es-US-Standard-B" }
  );
  const answ_2 = await handler(req, res, fiebre, option);
  // //console.log('FIEBRE -->'+answ_2);
  object.fiebre = answ_2;

  // garganta = "Has presentado dolor de garganta en los últimos dias ?";
  // await res.say(garganta, { name: "es-US-Standard-B" });
  // const answ_3 = await handler(req, res, garganta, option);
  // //console.log('GARGANTA -->'+answ_3);
  // object.garganta = answ_3;

  // tos = "Has presentado TOS en los últimos dias ?";
  // await res.say(tos, { name: "es-US-Standard-B" });
  // const answ_4 = await handler(req, res, tos, option);
  // // console.log('TOS -->'+answ_4);
  // object.tos = answ_4;

  // secrecion = "Has presentado Secreción Nasal en los últimos dias ?";
  // await res.say(secrecion, { name: "es-US-Standard-B" });
  // const answ_5 = await handler(req, res, secrecion, option);
  // //console.log('SECRECION NASAL -->'+answ_5);
  // object.secrecionnasal = answ_5;

  // breath = "Has presentado DIFICULTAD PARA RESPIRAR en los últimos dias ?";
  // await res.say(breath, { name: "es-US-Standard-B" });
  // const answ_6 = await handler(req, res, breath, option);
  // //console.log('DIFICULTAD PARA RESPIRAR -->'+answ_6);
  // object.respirar = answ_6;

  // vomito = "Has presentado vomitos en los últimos dias ?";
  // await res.say(vomito, { name: "es-US-Standard-B" });
  // const answ_7 = await handler(req, res, vomito, option);
  // //console.log('VOMITOS -->'+answ_7);
  // object.vomito = answ_7;

  // nausea = "Has presentado náuseas en los últimos dias ?";
  // await res.say(nausea, { name: "es-US-Standard-B" });
  // const answ_8 = await handler(req, res, nausea, option);
  // //console.log('NAUSEAS -->'+answ_8);
  // object.nausea = answ_8;

  // diarrea = "Has presentado diarrea en los últimos dias ?";
  // await res.say(diarrea, { name: "es-US-Standard-B" });
  // const answ_9 = await handler(req, res, diarrea, option);
  // //console.log('DIARREA -->'+answ_9);
  // object.diarrea = answ_9;

  // hospit = `A continuación tendrá una serie de preguntas relacionado con su cuadro clínico
  // .   Ha sido usted hospitalizado?`;
  // await res.say(hospit, { name: "es-US-Standard-B" });
  // const answ_10 = await handler(req, res, hospit, option);
  // // console.log('HOSPITALIZADO -->'+answ_10);
  // object.hospitalizado = answ_10;

  console.log("termino");

  //await res.hangup();

  console.log(object);

  insertSurvey(req.metadata.persona, object);
});

setInterval(main.mainFunction, 5 *1000);