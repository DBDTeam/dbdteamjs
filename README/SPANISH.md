# @dbdteam.js

Este es un pequeño paquete que intenta hacer que la creación de bots de Discord sea fácil y eficiente, apenas está comenzando, así que si encuentras un error, no dudes en informarnos uniéndote al [Servidor Oficial de Discord](https://www.dbdteam.xyz/discord), abres un foro en el canal "proyectos de soporte" y te atenderán sin duda.

## README en otros idiomas:
[Inglés (English)](/README.md)

## Instalación

Para utilizar este pequeño paquete debes: (Pronto se subirá en NPM para facilitar su uso)

1. Clonar el repositorio: `git clone https://github.com/DBDTeam/dbdteamjs/tree/master`
2. Instale las dependencias: `npm install` (o simplemente instale `ws` usando `npm install ws`)

## Comenzando a crear el bot

En primer lugar, se sugiere que tenga conocimientos sobre cómo crear aplicaciones de Discord en [Discord Developers Applications](https://discord.com/developers/applications), una vez que haya creado su aplicación, siga los siguientes pasos (esto ser simple, por lo que también debes conocer Discord Intents):

1. Obtenga el token de su aplicación.
2. Invita a tu bot a un servidor.

Una vez hecho esto, es hora de comenzar a crear el robot usando el paquete:

## Ejemplo de uso del Intent MessageContent

```javascript
const {Client, Presence, IntentsBitField} = require("./package.js")

const Intents = new IntentsBitField()

Intents.add("Guilds")
Intents.add("GuildMembers")
Intents.add("GuildMessages")
Intents.add("MessageContent")

const client = nuevo Cliente({
    token: `AQUÍ VA EL TOKEN DEL ROBOT`,
    intents: Intents.intents,
    gateway: {
      mobilePlatform: false // Solo esto si desea que el robot tenga el ícono en línea en un dispositivo móvil.
    }
})

client.on("ready", () => {
    console.log(`He iniciado sesión exitosamente en ${client.user.username}`)

    client.presence.update({
      activities: [{ name: `¡Hola mundo!`, type: Presence.Types.Game }],
      since: 0.
      status: Presence.Status.DND
    })
})

client.on("messageCreate", async(message) => {
    if(message.user.bot) return;
    if(message.content.startsWith("!saludo")){
      message.channel.createMessage(`¡Hola, ${message.user.username}!`)
    }
})

client.connect() // Establecerá la conexión entre el robot y el WS.
```

## Ejemplo de uso de interacciones

```javascript
const {Client, Presence, IntentsBitField} = require("./pacakge.js")

const Intents = new IntentsBitField()

Intents.add("Guilds")
Intents.add("GuildMembers")
Intents.add("GuildMessages")
Intents.add("MessageContent")

const client = nuevo Cliente({
    token: `AQUÍ VA EL TOKEN DEL ROBOT`,
    intents: Intents.intents,
    gateway: {
      mobilePlatform: false // Solo esto si desea que el robot tenga el ícono en línea en un dispositivo móvil.
    }
})

client.on("ready", () => {
    console.log(`He iniciado sesión exitosamente en ${client.user.username}`)
    client.presence.updateinteraction({
      activities: [{ name: `¡Hola mundo!`, type: Presence.Types.Game }],
      since: 0.
      status: Presence.Status.DND
    })

    client.application.commands.set(
     [
       {
         nombre: "ping",
         descripción: "¡Pong!",
         opciones: [],
         tipo: SlashTypes.InteractionTypes
       }, //Puedes agregar más comandos de la aplicación agregándolo en el objeto.
     ]
    )
})

client.on("interactionCreate", async(interaction) => {
    si(interaction.isSlash){
     if(interaction.name === "ping"){
       interaction.makeReply({ content: `Pong!\nLatencia: ${client.ping}` })
     }
    }
})

client.connect() // Establecerá la conexión entre el robot y el WS.
```