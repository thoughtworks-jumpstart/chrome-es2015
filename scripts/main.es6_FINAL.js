"use strict";

const StickyNotesApp = require("../src/StickyNotesApp");
const StickyNote = require("../src/StickyNote");

// On load start the app.
window.addEventListener("load", () => new StickyNotesApp());

document.registerElement("sticky-note", StickyNote);
