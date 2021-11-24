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


// Set the server to use the speech APIS
voiceServer.use(new GoogleTTS(speechConfig));
voiceServer.use(new GoogleASR(speechConfig));

voiceServer.listen(async(req, res) => {
  console.log(req);
  await res.answer();
  // To use this verb you MUST have a TTS plugin
  // const speech = await res.gather({source: "speech"});
  // console.log(speech);
 //await res.say("You said " + speech);
  await res.say(`Si crees que a Yehudy le gusta Carlitos, pulsa uno. `, { name: "es-US-Wavenet-B" });
  //console.log("termino");

  const stream = await res.sgather({source: "dtmf"});

  stream.on("dtmf", digit => {
    console.log("digit: " + digit);
    if( digit === 1){
      res.say(`Has pulsado el uno, Yehudy es maricon. `, { name: "es-US-Wavenet-B" });
    } else {res.say(`Has pulsado otro numero, Yehudy es macho alfa. `, { name: "es-US-Wavenet-B" }); }
    
    if (digit === "#") stream.close();
 });


 // handler(req,res);
  
 // await res.hangup();
});


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