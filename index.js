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
let value1 = 0;


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

    await res.say("Es la persona respondiendo esta encuesta el ciudadano "+nombrePersona , { name: "es-ES-Standard-B"});
    await res.say("Si su respuesta es SÍ. marque uno.  Si es otra persona asistiendo al ciudadano "+nombrePersona + ". Marque el cero" , { name: "es-ES-Standard-B"});

    const answ_1 = await res.sgather({source: "dtmf"});

    answ_1.on("dtmf",async digit => {
       value1 = digit;
       if(parseInt(digit) === 1){
         
       await res.say('Hola nuevamente '+nombrePersona+ '. Has presentado fiebre mayor a 38 grados los últimos dias ?', { name: "es-ES-Standard-B" }); 
      
       await res.say("Si su respuesta es: SÍ. marque uno.  Si su respuesta es: NO.  Marque el cero" , { name: "es-ES-Standard-B"});

          const answ_2 = await res.sgather({source: "dtmf"});

          answ_2.on("dtmf", async digit => { 

            console.log("digit: " + digit);

            if(parseInt(digit) === 1){ 

                console.log('LE DIO FIEBRE');
            } else if(parseInt(digit) === 0){

              console.log('no le dio fiebre');
            }

          });

      
      }
     
      // else if(parseInt(value1) === 0) { res.say('entré aquí', { name: "es-ES-Standard-B" });  }


    });

    

    
      
      if (value1 === "#") answ_1.close();

    //console.log("termino"); estrellas
  
    
  
    
  
  
   // handler(req,res);
    
   // await res.hangup();
  });



})







async function handler (request, response) {
  await response.answer();
  const stream = await response.sgather({source: "dtmf,speech"});

  stream.on("transcript", (text, isFinal) => {
     console.log("transcript: %s", text);
  })

  stream.on("dtmf", digit => {
     console.log("digit: " + digit);
     if (digit === "#") stream.close();
  })
}