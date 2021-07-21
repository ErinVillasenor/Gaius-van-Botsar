//The following program is based on the guide found in FreeCodeCamp's tutorial at https://www.freecodecamp.org/news/create-a-discord-bot-with-javascript-nodejs/

const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")


const db = new Database()
const client = new Discord.Client()
const mySecret = process.env['TOKEN']
const devaString = "SUCH DEVASTATION"
const min = 0
const max = 16
 
const gaiusArr = ["Teww me...fow whom do you fight?","Hmph (・`ω´・) How vewy gwib. And do you bewieve in Eowzea?", "Eowzea's unyity is fowged of fawsehoods. Its city-states awe buiwt on deceit. And its faith is an instwument of deception.", "It is nyaught but a cobweb of wies. To bewieve in Eowzea is to bewieve in nyothing.", " In Eowzea, the beast twibes often summon gods to fight in theiw stead─though youw comwades onwy wawewy wespond in kind. Which is stwange, is it nyot?", "Awe the “Twewve” othewwise engaged? I was given to undewstand they wewe youw pwotectows. If you twuwy bewieve them youw guawdians, why do you nyot wepeat the twick that sewved you so weww at Cawtenyeau, and caww them down?", "They wiww answew─so wong as you wavish them with cwystaws and gowge them on aethew.", "Youw gods awe nyo diffewent fwom those of the beasts─eikons evewy onye. Accept but this, and you wiww see how Eowzea's faith is bweeding the wand dwy.", "Nyow is this unknyown to youw mastews. Which pwompts the question: why do they cwing to these fawse deities? What dwives even men of weawnying─even the gweat Wouisoix─to gwuvw at theiw feet?", "The answew? Youw mastews wack the stwength to do othewwise ;;w;;", "Fow the wowwd of man to mean anything, man must own the wowwd.", "To this end, he hath fought evew to waise himsewf thwough confwict─to gwow wich thwough conquest.", "And when the dust of battwe settwes, it is evew the stwong who dictate the fate of the weak.", "Knyowing this, but a singwe path is open to the impotent wuwew─that of fawse wowship. A path which weads to enyewvation and death.", "Onwy a man of powew can wightwy steew the couwse of civiwization. And in this wand of cweeping mendacity, that onye twuth wiww pwuv its sawvation.","Come, champion of Eowzea, face me >w< Youw defeat shaww sewve as pwoof of my weadinyess to wuwe >w<", "It is onwy wight that I shouwd take youw weawm. Fow nyonye among you has the powew to stop me (・`ω´・)"]

db.get("gaiusPhrases").then(gaiusPhrases => {
  if (!gaiusPhrases || gaiusPhrases.length < 1) {
    db.set("gaiusPhrases",gaiusArr)
  }
})  

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true) //defaults bot to respond to messages
  }
})


function updateGaius(gaiusMsg) {
  db.get("gaiusPhrases").then(gaiusPhrases => {
    gaiusPhrases.push([gaiusMsg])
    db.set("gaiusPhrases", gaiusPhrases)  })
} //adds new message to array

function deleteGaius(index) {
    db.get("gaiusPhrases").then(gaiusPhrases => {
      if (gaiusPhrases.length > index) {
        gaiusPhrases.splice(index,1)
      }
    db.set("gaiusPhrases", gaiusPhrases)  })
} //deletes message from array


function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
} //fetches quote from zenquotes api

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * gaiusArr.length);//(max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
} //randomizes integer
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot){
    return
  }
  if (msg.content === "ping"){
    msg.reply("pong")
  }
 
  
    if (msg.content === "$help"){
      msg.reply("Foolish Eorzean! Here are the commands you can give me\n$help to list all of my devastating commands!\nIncluding Gaius anywhere in a message will cause me to reply with one of my dialogue lines, including a number between 0 and my current dialogue array size will cause me to say that array index's value\n$new Phrase to give me a new line of dialogue that I will say, where Phrase is replaced by the phrase you would like added\n$del index will delete the line of dialogue that correlates to that index's current value in my dialogue array, and index is replaced by a number\n$list to see all of the possible strings I can currently say\n$responding (true or false) to turn my responses on or off, respectively\n$inspire for a DEVASTATINGLY inspirational quote")
    }
})

client.on("message", msg => {
  if (msg.content.toUpperCase().includes(devaString.toUpperCase())){
    msg.reply("This was NOT my intention")
  }
})


client.on("message", msg => {

  if (msg.author.bot) return 

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
  db.get("responding").then(responding =>{  
  if (responding && msg.content.toUpperCase().includes("GAIUS")){
    var myNum = parseInt(msg.content,10)
    db.get("gaiusPhrases").then(gaiusPhrases =>{  
        if (myNum >= 0 && myNum <= 16)
    {
      msg.reply(gaiusArr[myNum])
    } //replies with quote in given array index
    
    else
     {
    let randNum = getRandomIntInclusive(min,max)
    msg.reply(gaiusArr[randNum]) //randomizes array dialogue given
     }}) 
  }
  })
  if (msg.content.startsWith("$new")){
    gaiusMsg = msg.content.split("$new ")[1]
    updateGaiusPhrases(gaiusMsg)
    msg.channel.send("New devastating message added. This WAS my intention")
  } //add new message

    if (msg.content.startsWith("$del")){
    index = parseInt(msg.content.split("$del ")[1])
    deleteGaiusPhrases(index)
    msg.channel.send("Devastating message deleted. This WAS my intention")
  } //delete message

  if (msg.content.startsWith("$list"))
  {
    db.get("gaiusPhrases").then(gaiusPhrases => {
      msg.channel.send(gaiusPhrases)
    })
  }//gives all values in array

  if (msg.content.startsWith("$responding")){
      value = msg.content.split("$responding ")[1]

      if (value.toLowerCase() == "true"){
        db.set("responding", true)
        msg.channel.send("Responding is on")
      }

      else {
         db.set("responding", false)
        msg.channel.send("Responding is off")
      }
  }//toggle bot on or off using true or false

})


keepAlive()
client.login(mySecret)
