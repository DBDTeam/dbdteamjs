"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenuInteraction = void 0;
const Collection_1 = require("../../utils/Collection");
const ComponentInteraction_1 = require("./ComponentInteraction");
class SelectMenuInteraction extends ComponentInteraction_1.ComponentInteraction {
    #data;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
    }
    async _____patch() {
        this.values = this.#data.data.values;
        const resolvedData = this.#data.data.resolved;
        if (resolvedData) {
            this.resolved = new Collection_1.Collection();
            const resolveTypes = {
                channels: this.guild?.channels,
                roles: this.guild?.roles,
                users: this.guild?.members,
            };
            // Recorremos los tipos presentes en resolvedData
            for (const [type, resolvedItems] of Object.entries(resolvedData)) { //@ts-ignore
                const cache = resolveTypes[type]; // Seleccionamos la caché correspondiente al tipo
                if (!cache)
                    continue; // Si no hay caché para este tipo, saltamos
                // @ts-ignore Recorremos los elementos dentro del tipo 
                for (const [id, item] of Object.entries(resolvedItems)) {
                    let entity = cache.cache.get(id); // Intentamos obtenerlo de la caché
                    if (!entity) {
                        // @ts-ignore Si no está en la caché, intentamos fetchearlo
                        entity = await cache.fetch(id);
                    }
                    //@ts-ignore
                    this.resolved.set(id, entity);
                }
            }
        }
    }
}
exports.SelectMenuInteraction = SelectMenuInteraction;
