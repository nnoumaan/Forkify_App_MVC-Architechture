import View from "./view.js";
import icons from 'url:../../img/icons.svg';


class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const gotopage = +btn.dataset.goto;
      console.log(gotopage);
      handler(gotopage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numpages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    // page 1 there is other page also in right

    if (currentPage === 1 && numpages > 1) {
      return `
           <button data-goto=${
             currentPage + 1
           }  class="btn--inline pagination__btn--next">
           <span>Page ${currentPage + 1}</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </button>`;
    }

    // page 6 ,last page
    if (currentPage === numpages && numpages > 1) {
      return `
            <button data-goto=${
              currentPage - 1
            } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
            `;
    }

    // page 2 , there is othere page left and right

    if (currentPage > 1 && currentPage < numpages) {
      return `
                <button data-goto=${
                  currentPage - 1
                } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
            
            <button data-goto=${
              currentPage + 1
            } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            `;
    }
    // page 1 , but there is no other page

    return 'No Other ';
  }
}

export default new PaginationView();