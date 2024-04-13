"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonStyles = exports.ComponentTypes = exports.SlashTypes = exports.InteractionTypes = exports.Contexts = void 0;
var Contexts;
(function (Contexts) {
    Contexts[Contexts["Guild"] = 0] = "Guild";
    Contexts[Contexts["Channel"] = 2] = "Channel";
    Contexts[Contexts["DM"] = 1] = "DM";
})(Contexts || (exports.Contexts = Contexts = {}));
;
var InteractionTypes;
(function (InteractionTypes) {
    InteractionTypes[InteractionTypes["Slash"] = 1] = "Slash";
    InteractionTypes[InteractionTypes["User"] = 2] = "User";
    InteractionTypes[InteractionTypes["Message"] = 3] = "Message";
})(InteractionTypes || (exports.InteractionTypes = InteractionTypes = {}));
;
var SlashTypes;
(function (SlashTypes) {
    SlashTypes[SlashTypes["SubCommand"] = 1] = "SubCommand";
    SlashTypes[SlashTypes["SubCommandGroup"] = 2] = "SubCommandGroup";
    SlashTypes[SlashTypes["String"] = 3] = "String";
    SlashTypes[SlashTypes["Integer"] = 4] = "Integer";
    SlashTypes[SlashTypes["Boolean"] = 5] = "Boolean";
    SlashTypes[SlashTypes["User"] = 6] = "User";
    SlashTypes[SlashTypes["Channel"] = 7] = "Channel";
    SlashTypes[SlashTypes["Role"] = 8] = "Role";
    SlashTypes[SlashTypes["Mentionable"] = 9] = "Mentionable";
    SlashTypes[SlashTypes["Number"] = 10] = "Number";
    SlashTypes[SlashTypes["Attachment"] = 11] = "Attachment";
})(SlashTypes || (exports.SlashTypes = SlashTypes = {}));
;
var ComponentTypes;
(function (ComponentTypes) {
    ComponentTypes[ComponentTypes["ActionRow"] = 1] = "ActionRow";
    ComponentTypes[ComponentTypes["Button"] = 2] = "Button";
    ComponentTypes[ComponentTypes["String"] = 3] = "String";
    ComponentTypes[ComponentTypes["TextInput"] = 4] = "TextInput";
    ComponentTypes[ComponentTypes["User"] = 5] = "User";
    ComponentTypes[ComponentTypes["Role"] = 6] = "Role";
    ComponentTypes[ComponentTypes["Mentionable"] = 7] = "Mentionable";
    ComponentTypes[ComponentTypes["Channel"] = 8] = "Channel";
})(ComponentTypes || (exports.ComponentTypes = ComponentTypes = {}));
;
var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["Primary"] = 1] = "Primary";
    ButtonStyles[ButtonStyles["Secondary"] = 2] = "Secondary";
    ButtonStyles[ButtonStyles["Success"] = 3] = "Success";
    ButtonStyles[ButtonStyles["Danger"] = 4] = "Danger";
    ButtonStyles[ButtonStyles["Link"] = 5] = "Link";
})(ButtonStyles || (exports.ButtonStyles = ButtonStyles = {}));
;
