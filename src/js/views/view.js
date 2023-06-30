import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _errorMsg = 'Recipe Not Found';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if(!render) return markup;
    this._clear();

    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((el, i) => {
      const curEL = curElements[i];

      if (!el.isEqualNode(curEL) && el.firstChild?.nodeValue.trim() !== '') {
        curEL.textContent = el.textContent;
      }
          if (!el.isEqualNode(curEL)) {Array.from(el.attributes).forEach(attr =>{

            curEL.setAttribute(attr.name,attr.value)

          })

        
          
    }



    });
    // console.log(newElements);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  msg() {
    const message = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
    <p>Start by searching for a recipe or an ingredient. Have fun!</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', message);
  }

  spinner() {
    const maker = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', maker);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderError(message = this._errorMsg) {
    const maker = `<div class="error">
         <div>
            <svg>
               <use href="${icons}#icon-alert-triangle"></use>
              </svg>
          </div>
          <p>${message}</p>
         </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', maker);
  }

  rendermsg(message = this._message) {
    const maker = `<div class="message">
         <div>
            <svg>
               <use href="${icons}#icon-smile"></use>
              </svg>
          </div>
          <p>${message}</p>
         </div> `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', maker);
  }
}