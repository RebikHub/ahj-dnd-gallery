export default class DnD {
  constructor() {
    this.dndInput = document.querySelector('.dnd-input');
  }

  drop() {
    this.dndInput.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.dndInput.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const files = Array.from(evt.dataTransfer.files);
      console.log(files[0]);
    });
  }
}
