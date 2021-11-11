export default class DnD {
  constructor() {
    this.dndInput = document.querySelector('.dnd-input');
    this.widget = document.querySelector('.form-widget');
    this.dnd = document.querySelector('.dnd');
    this.closeDrop = document.querySelector('.dnd-close');
  }

  closeInput() {
    this.closeDrop.addEventListener('click', () => {
      if (this.widget.classList.contains('none')) {
        this.widget.classList.remove('none');
        this.dnd.classList.add('none');
      }
    });
  }

  drop() {
    this.dndInput.addEventListener('dragover', (ev) => {
      ev.preventDefault();
    });
    this.dndInput.addEventListener('drop', (ev) => {
      ev.preventDefault();
      const files = Array.from(ev.dataTransfer.files);
      console.log(files[0]);
    });
  }
}
