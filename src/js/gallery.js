export default class Gallery {
  constructor(inputName, inputSrc) {
    this.inputName = inputName;
    this.inputSrc = inputSrc;
    this.textName = null;
    this.textSrc = null;
    this.error = null;
  }

  init(inputButton) {
    this.inputName.addEventListener('input', this.inputNameValue.bind(this));
    this.inputName.addEventListener('keyup', this.inputEnter.bind(this));
    this.inputSrc.addEventListener('input', this.inputSrcValue.bind(this));
    this.inputSrc.addEventListener('keyup', this.inputEnter.bind(this));

    inputButton.addEventListener('click', this.inputButtonClick.bind(this));
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
      document.querySelector('.input-name').value = null;
      document.querySelector('.input-src').value = null;
      this.textName = null;
      this.textSrc = null;
    }
  }

  inputButtonClick() {
    if (this.textSrc !== null && this.textName !== null) {
      this.addBlockWithImg(this.textSrc, this.textName);
      document.querySelector('.input-name').value = null;
      document.querySelector('.input-src').value = null;
      this.textName = null;
      this.textSrc = null;
    }
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
          this.addImage(image);
        }
      }, 70);
    }
    Gallery.removeImage();
  }

  addImage(image) {
    this.error = null;
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
    const error = document.querySelector('.error');
    const inputSrc = document.querySelector('.input-src');
    error.style = 'display: block';
    inputSrc.value = null;
    error.style.left = `${inputSrc.offsetLeft}px`;
    error.style.top = `${inputSrc.offsetTop + inputSrc.offsetHeight}px`;
    this.error = null;
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
