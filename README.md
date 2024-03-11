# @dbdteam.js

Este es un paquete pequeño que intenta hacer que la creación de robots de discord sea sencillo y eficaz, apenas está empezando, así que si encuentras un error, no dudes a comunicarte uniéndote al [servidor oficial de Discord](https://www.dbdteam.xyz/discord), abres un foro en el canal de "support projects" y serás atendido sin duda.

## Instalación

Para usar este pequeño paquete debes: (Proximamente se subirá a NPM para un uso más sencillo)

1. Clona el repositorio: `git clone [https://github.com/tuusuario/tuproyecto.git](https://github.com/DBDTeam/dbdteamjs/tree/master)`
2. Instala las dependencias: `npm install` (o simplemente instalas `ws` usando `npm install ws`)

## Empezando a crear el bot

Primeramente se suguiere que por favor tenga conocimientos de como crear Aplicaciones de discord en [Discord Developers Applications](https://discord.com/developers/applications), una vez tenga su aplicación creada, siga los siguientes pasos (esto será simple, así que se le siguiere que sepa sobre los Intents de Discord también):

1. Obtenga el token de su aplicación.
2. Ínvite su robot a un servidor.

Una vez tenga eso hecho, es momento de empezar a crear el robot usando el paquete:

```javascript
const { Client, Presence, IntentsBitField } = require("./packge.js")

const Intents = new IntentsBitField()

Intents.add("Guilds")
Intents.add("GuildMembers")

const client = new Client({
  token: `AQUI VA EL TOKEN DEL ROBOT`,
  intents: Intents.intents,
  gateway: {
    mobilePlatform: false // Únicamente esto si quieres que el robot tenga el ícono de online en un dispositivo móvil.
  }
})

client.connect() // Establecerá la conexión entre el robot y la WS.
```
