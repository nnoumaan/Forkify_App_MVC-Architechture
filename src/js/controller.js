import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchViews from './views/searchViews.js';
import  resultsView  from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import searchViews from './views/searchViews.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';



// import { from } from "core-js/core/array";


// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    if (!id) return recipeView.msg();
    if (!id) return;

    recipeView.spinner();
    

    
    resultsView.update(model.getSearchResultPage())
    bookMarkView.update(model.state.bookmark);
    
    await model.loadRecipe(id);
    
    
    
    // console.log(model.state.recipe);
    
    recipeView.render(model.state.recipe);


  }
  catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearch = async function () {
  
  
  resultsView.spinner();
  
  const query = searchViews.getQuery();
  
  if(!query) return;
  
  await model.LoadSearch(query);
  // resultsView.render(model.state.search.result);
  resultsView.render(model.getSearchResultPage(1));
  
  paginationView.render(model.state.search);
  
};
const controlPagination = function(gotopage){
  
  resultsView.render(model.getSearchResultPage(gotopage));
  
  paginationView.render(model.state.search);
  
  
  
};

const controlServings = function(newServings){
  model.updateServings(newServings);
  
  
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  
  
}




const contolAddBookmark = function(){
  //  1.Add Remove Bookmark
  
  
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else{model.removeBookmark(model.state.recipe.id )}


  // 2. Update recipe view
  recipeView.update(model.state.recipe)
  
  // 3. Render Bookmarks
  
  bookMarkView.render(model.state.bookmark)
  
  
  
}


const controlBookmark = function(){
  bookMarkView.render(model.state.bookmark)
}


const init = function () {
  
  bookMarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(contolAddBookmark);
  searchViews.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  

};


init();

// controlSearch();

// window.addEventListener('hashchange',function(){
//   showRecipe();
// })

// window.addEventListener('load',showRecipe)
