const Discord = require("discord.js")
const client = new Discord.Client()
const mySecret = process.env['TOKEN']
const devaString = "SUCH DEVASTATION"
const min = 0
const max = 16
const gaiusArr = ["Teww me...fow whom do you fight?","Hmph (・`ω´・) How vewy gwib. And do you bewieve in Eowzea?", "Eowzea's unyity is fowged of fawsehoods. Its city-states awe buiwt on deceit. And its faith is an instwument of deception.", "It is nyaught but a cobweb of wies. To bewieve in Eowzea is to bewieve in nyothing.", " In Eowzea, the beast twibes often summon gods to fight in theiw stead─though youw comwades onwy wawewy wespond in kind. Which is stwange, is it nyot?", "Awe the “Twewve” othewwise engaged? I was given to undewstand they wewe youw pwotectows. If you twuwy bewieve them youw guawdians, why do you nyot wepeat the twick that sewved you so weww at Cawtenyeau, and caww them down?", "They wiww answew─so wong as you wavish them with cwystaws and gowge them on aethew.", "Youw gods awe nyo diffewent fwom those of the beasts─eikons evewy onye. Accept but this, and you wiww see how Eowzea's faith is bweeding the wand dwy.", "Nyow is this unknyown to youw mastews. Which pwompts the question: why do they cwing to these fawse deities? What dwives even men of weawnying─even the gweat Wouisoix─to gwuvw at theiw feet?", "The answew? Youw mastews wack the stwength to do othewwise ;;w;;", "Fow the wowwd of man to mean anything, man must own the wowwd.", "To this end, he hath fought evew to waise himsewf thwough confwict─to gwow wich thwough conquest.", "And when the dust of battwe settwes, it is evew the stwong who dictate the fate of the weak.", "Knyowing this, but a singwe path is open to the impotent wuwew─that of fawse wowship. A path which weads to enyewvation and death.", "Onwy a man of powew can wightwy steew the couwse of civiwization. And in this wand of cweeping mendacity, that onye twuth wiww pwuv its sawvation.","Come, champion of Eowzea, face me >w< Youw defeat shaww sewve as pwoof of my weadinyess to wuwe >w<", "It is onwy wight that I shouwd take youw weawm. Fow nyonye among you has the powew to stop me (・`ω´・)"]

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
} //randomizes integer
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content.toUpperCase().includes(devaString.toUpperCase())){
    msg.reply("This was NOT my intention")
  }
})

client.on("message", msg => {
  if (msg.content.toUpperCase().includes("GAIUS")){
    let randNum = getRandomIntInclusive(min,max)
    msg.reply(gaiusArr[randNum])
  }
})
client.login(mySecret)
