// const { VoiceServer } = require("@fonoster/voice");
// const voiceServer = new VoiceServer();

// voiceServer.listen(async(req, res) => {
//   console.log(req);
//   await res.answer();
//   await res.play("sound:hello-world");
//  // await res.hangup();
// });


const { VoiceServer } = require("@fonoster/voice");
const GoogleTTS = require("@fonoster/googletts");
const GoogleASR = require("@fonoster/googleasr");
const voiceServer = new VoiceServer();
const speechConfig = { keyFilename: "./google.json" };

const main = require('./main');
const persona = main.selectPersonas();


// Set the server to use the speech APIS
voiceServer.use(new GoogleTTS(speechConfig));
voiceServer.use(new GoogleASR(speechConfig));


async function handler (request, response, verb) {
  await response.answer();
  const digits = await response.gather({source: "dtmf,speech", numDigits: 1});
 // console.log("digits: " + digits);

 switch(digits) {
  case '1':
    return true;

  case '0':
    return false;
    
  default:
    await response.say('Ha insertado una respuesta incorrecta. Las respuestas válidas son:  UNO para responder con SÍ. Y CERO para responder con NO.', { name: "es-ES-Standard-B" });

    await response.say(verb, {name: "es-ES-Standard-B"});
    return await handler(request,response, verb); 
}
  
}


persona.then(function(result) {
 // console.log(result) // "Some User token"
  const nombrePersona = result[0].nombrecompleto_persona;


  voiceServer.listen(async(req, res) => {
    console.log(req);
    await res.answer();
    // To use this verb you MUST have a TTS plugin
    // const speech = await res.gather({source: "speech"});
    // console.log(speech);
   //await res.say("You said " + speech);
   
    await res.say("Hola, esta llamada corresponde con una encuesta para conocer el estado de salud luego de recibir su vacuna contra el COVID 19. " , { name: "es-ES-Standard-B"});

    ciudadano = "Es la persona respondiendo esta encuesta el ciudadano "+nombrePersona;
    await res.say(ciudadano+ `.  Si su respuesta es SÍ. marque uno.  Si es otra persona asistiendo al ciudadano `+nombrePersona +`. Marque el cero `, { name: "es-ES-Standard-B"});
    const answ_1 = await handler(req,res, ciudadano);
    console.log('ES LA PERSONA -->'+answ_1);
     

    fiebre = 'Has presentado fiebre mayor a 38 grados los últimos dias ?';
    await res.say('Hola '+nombrePersona+ `. PARA ESTA Y TODAS LAS PREGUNTAS DE LA ENCUESTA, SI DESEAS RESPONDER CON UN: SI. MARCA UNO.  SI TU RESPUESTA ES UN:  NO. MARCA EL CERO.` + fiebre, { name: "es-ES-Standard-B" }); 
    const answ_2 = await handler(req,res,fiebre);
    console.log('FIEBRE -->'+answ_2);

    garganta = 'Has presentado dolor de garganta en los últimos dias ?';
    await res.say(garganta, { name: "es-ES-Standard-B" }); 
    const answ_3 = await handler(req,res,garganta);
    console.log('GARGANTA -->'+answ_3);
   
    tos = 'Has presentado TOS en los últimos dias ?';
    await res.say(tos, { name: "es-ES-Standard-B" });
    const answ_4 = await handler(req,res,tos);
    console.log('TOS -->'+answ_4);



    secrecion = 'Has presentado Secreción Nasal en los últimos dias ?';
    await res.say(secrecion, { name: "es-ES-Standard-B" });
    const answ_5 = await handler(req,res,secrecion);
    console.log('SECRECION NASAL -->'+answ_5);


    breath = 'Has presentado DIFICULTAD PARA RESPIRAR en los últimos dias ?';
    await res.say(breath, { name: "es-ES-Standard-B" });
    const answ_6 = await handler(req,res,breath);
    console.log('DIFICULTAD PARA RESPIRAR -->'+answ_6);

    vomito = 'Has presentado vomitos en los últimos dias ?';
    await res.say(vomito, { name: "es-ES-Standard-B" });
    const answ_7 = await handler(req,res,vomito);
    console.log('VOMITOS -->'+answ_7);

    nausea = 'Has presentado náuseas en los últimos dias ?';
    await res.say(nausea, { name: "es-ES-Standard-B" });
    const answ_8 = await handler(req,res,nausea);
    console.log('NAUSEAS -->'+answ_8);

    diarrea = 'Has presentado diarrea en los últimos dias ?'
    await res.say(diarrea, { name: "es-ES-Standard-B" });
    const answ_9 = await handler(req,res,diarrea);
    console.log('DIARREA -->'+answ_9);

    hospit = `A continuación tendrá una serie de preguntas relacionado con su cuadro clínico
    .   Ha sido usted hospitalizado?`;
    await res.say(hospit, { name: "es-ES-Standard-B" });
    const answ_10 = await handler(req,res,hospit);
    console.log('HOSPITALIZADO -->'+answ_10);
    


    
     
  


   await res.hangup();
  });



})






async function askQuestion(TextToAsk, symptom, res ) {
  
  await res.say(TextToAsk, { name: "es-ES-Standard-B" }); 
                   
  const answ_3 = await res.sgather({source: "dtmf"});

  answ_3.on("dtmf", async digit => { 

  console.log("digit: " + digit);

  if(parseInt(digit) === 1){ 

      console.log('Síntoma --> '+symptom +' - '+true);
  } else if(parseInt(digit) === 0){

    console.log('Síntoma --> '+symptom +' - '+false);
  }

}); 

}
 
