// This is a Sticky Note custom element.
class StickyNote extends HTMLElement {
  // Fires when an instance of the element is created.
  createdCallback() {
    this.classList.add(...StickyNote.CLASSES);
    this.innerHTML = StickyNote.TEMPLATE;
    this.messageElement = this.querySelector(".message");
    this.dateElement = this.querySelector(".date");
    this.deleteButton = this.querySelector(".delete");
    this.deleteButton.addEventListener("click", () => this.deleteNote());
  }

  // Fires when an attribute of the element is added/deleted/modified.
  attributeChangedCallback(attributeName) {
    // We display/update the created date message if the id changes.
    if (attributeName == "id") {
      let date;
      if (this.id) {
        // date = new Date(parseInt(this.id));
      } else {
        date = new Date();
      }

      // Format the date
      let dateFormatterOptions = { day: "numeric", month: "short" };
      let shortDate = new Intl.DateTimeFormat(
        "en-US",
        dateFormatterOptions
      ).format(date);

      this.dateElement.textContent = `Created on ${shortDate}`;
    }
  }

  // Sets the message of the note.
  setMessage(message) {
    this.messageElement.textContent = message;
    // Replace all line breaks by <br>.
    this.messageElement.innerHTML = this.messageElement.innerHTML.replace(
      /\n/g,
      "<br>"
    );
  }

  // Deletes the note by removing the element from the DOM and the data from localStorage.
  deleteNote() {
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this);
  }
}

// Initial content of the element.
StickyNote.TEMPLATE = `
    <div class="message"></div>
    <div class="date"></div>
    <button class="delete mdl-button mdl-js-button mdl-js-ripple-effect">
      Delete
    </button>`;

// StickyNote elements top level style classes.
StickyNote.CLASSES = [
  "mdl-cell--4-col-desktop",
  "mdl-card__supporting-text",
  "mdl-cell--12-col",
  "mdl-shadow--2dp",
  "mdl-cell--4-col-tablet",
  "mdl-card",
  "mdl-cell",
  "sticky-note"
];

module.exports = StickyNote;
