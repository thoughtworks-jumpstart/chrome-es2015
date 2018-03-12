const StickyNote = require("../src/StickyNote");

// A Sticky Notes app.
class StickyNotesApp {
  // Initializes the Sticky Notes app.
  constructor() {
    // Shortcuts to DOM Elements.
    this.notesContainer = document.getElementById("notes-container");
    this.noteMessageInput = document.getElementById("message");
    this.addNoteButton = document.getElementById("save");
    this.notesSectionTitle = document.getElementById("notes-section-title");

    // Saves notes on button click.
    this.addNoteButton.addEventListener("click", () => this.saveNote());

    // Toggle for the button.
    this.noteMessageInput.addEventListener("keyup", () => this.toggleButton());

    // Loads all the notes.
    for (let key in localStorage) {
      this.displayNote(key, localStorage[key]);
    }
    // Listen for updates to notes from other windows.
    window.addEventListener("storage", e =>
      this.displayNote(e.key, e.newValue)
    );
  }

  // Saves a new sticky note on localStorage.
  saveNote() {
    if (this.noteMessageInput.value) {
      let key = Date.now().toString();
      localStorage.setItem(key, this.noteMessageInput.value);
      this.displayNote(key, this.noteMessageInput.value);
      StickyNotesApp.resetMaterialTextfield(this.noteMessageInput);
      this.toggleButton();
    }
  }

  // Resets the given MaterialTextField.
  static resetMaterialTextfield(element) {
    element.value = "";
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
    element.blur();
  }

  // Creates/updates/deletes a note in the UI.
  displayNote(key, message) {
    let note = document.getElementById(key);
    // If no element with the given key exists we create a new note.
    if (!note) {
      note = document.createElement("sticky-note");
      note.id = key;
      this.notesContainer.insertBefore(
        note,
        this.notesSectionTitle.nextSibling
      );
    }
    // If the message is null we delete the note.
    if (!message) {
      return note.deleteNote();
    }
    note.setMessage(message);
  }

  // Enables or disables the submit button depending on the values of the input field.
  toggleButton() {
    if (this.noteMessageInput.value) {
      this.addNoteButton.removeAttribute("disabled");
    } else {
      this.addNoteButton.setAttribute("disabled", "true");
    }
  }
}

module.exports = StickyNotesApp;
