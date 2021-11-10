export default class Gallery {
  constructor() {
    this.widget = document.querySelector('.form-widget');
    this.inputName = document.querySelector('.input-name');
    this.inputSrc = document.querySelector('.input-src');
    this.addButton = document.querySelector('.btn-add');
    this.downloadButton = document.querySelector('.btn-download');
    this.errorDiv = document.querySelector('.error');
    this.dnd = document.querySelector('.dnd');
    this.textName = null;
    this.textSrc = null;
    this.error = null;
  }

  events() {
    this.inputName.addEventListener('input', this.inputNameValue.bind(this));
    this.inputName.addEventListener('keyup', this.inputEnter.bind(this));
    this.inputSrc.addEventListener('input', this.inputSrcValue.bind(this));
    this.inputSrc.addEventListener('keyup', this.inputEnter.bind(this));
    this.addButton.addEventListener('click', this.inputButtonClick.bind(this));
    this.downloadButton.addEventListener('click', this.downloadClick.bind(this));
  }

  inputNameValue(e) {
    this.textName = e.target.value;
  }

  inputSrcValue(e) {
    this.textSrc = e.target.value;
    document.querySelector('.error').style = 'display: none';
  }

  inputEnter(e) {
    if (e.key === 'Enter' && this.textName !== null && this.textSrc !== null) {
      this.addBlockWithImg(this.textSrc, this.textName);
      this.inputName.value = null;
      this.inputSrc.value = null;
      this.textName = null;
      this.textSrc = null;
    }
  }

  inputButtonClick() {
    if (this.textSrc !== null && this.textName !== null) {
      this.addBlockWithImg(this.textSrc, this.textName);
      this.inputName.value = null;
      this.inputSrc.value = null;
      this.textName = null;
      this.textSrc = null;
    }
  }

  downloadClick() {
    this.widget.classList.add('none');
    this.dnd.classList.remove('none');
  }

  addBlockWithImg(url, name) {
    if (url) {
      const image = document.createElement('img');
      image.src = url;
      image.alt = name;

      image.onerror = () => {
        this.error = true;
      };
      setTimeout(() => {
        if (this.error) {
          this.verifyUrl();
        } else {
          this.error = null;
          Gallery.addImage(image);
        }
      }, 70);
    }
    Gallery.removeImage();
  }

  static addImage(image) {
    const widget = document.querySelector('.images-list');
    const divImg = document.createElement('div');
    const span = document.createElement('span');
    divImg.classList.add('image');
    span.classList.add('close-image');
    divImg.appendChild(image);
    divImg.appendChild(span);
    widget.appendChild(divImg);
  }

  verifyUrl() {
    this.errorDiv.style = 'display: block';
    this.inputSrc.value = null;
    this.errorDiv.style.left = `${this.inputSrc.offsetLeft}px`;
    this.errorDiv.style.top = `${this.inputSrc.offsetTop + this.inputSrc.offsetHeight}px`;
    this.closeErrorBlock();
  }

  closeErrorBlock() {
    document.body.addEventListener('click', () => {
      if (this.errorDiv.style.display === 'block') {
        this.errorDiv.style.display = 'none';
      }
    });
  }

  static removeImage() {
    const closeList = document.querySelectorAll('.close-image');
    for (const item of closeList) {
      item.addEventListener('click', () => {
        item.closest('.image').remove();
      });
    }
  }
}
