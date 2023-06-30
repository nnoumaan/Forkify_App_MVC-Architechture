import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView.js";


class BookmarksView extends View{
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it';
    _msg = '';
    

    addHandlerRender(handler){
      window.addEventListener('load',handler);
    }

    _generateMarkup(){
        return this._data.map(bookmark => previewView.render(bookmark,false)).join('');
    }

   


}


export default new BookmarksView();