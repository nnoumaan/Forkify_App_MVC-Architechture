import {async}  from "regenerator-runtime";
import { API_URL,REQ_PER_PAGE } from "./config.js";
import {getJson} from "./helper.js"

export const state = {
    recipe:{},
    search : {
        query:"",
        result:[],
        resultsPerPage : REQ_PER_PAGE,
        page : 1,
    },
    bookmark:[],
}


export const loadRecipe = async function(id){
    
    try {
    
       
        const data  = await getJson(id);
        
        let {recipe} = data.data;
        
        
        state.recipe = {    
            
            id: recipe.id,
            title: recipe.title,
            publisher:recipe.publisher,
            sourceUrl:recipe.source_url,
            image:recipe.image_url,
            servings:recipe.servings,
            cookingTime : recipe.cooking_time,
            ingredients: recipe.ingredients
            
        };

        if(state.bookmark.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true;
 
        else state.recipe.bookmarked = false;

        state.search.page = 1;


    } 
    
        
        catch (error) {
            // throw (error)
            throw error
        }
    }

export const LoadSearch = async function(query)
    {
        try {
            // state.search.query = query
            const data =  await getJson(`?search=${query}`)
                state.search.result = data.data.recipes.map(sr=>{
                    return {
                        id: sr.id,
                        title: sr.title,
                        image:sr.image_url,
                        publisher:sr.publisher,

                        
                    }})
                    

                    

            
        } catch (error) {
            console.log("Modal Class : " + error );
        }

    }


export const getSearchResultPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page-1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.result.slice(start,end);

}


export const updateServings = function(newServings){

    state.recipe.ingredients.forEach((ing)=>{

        


        ing.quantity  = ing.quantity * (newServings /  state.recipe.servings);
        
    })

    state.recipe.servings = newServings;



}

const persistBoomarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark))
}



export const addBookmark = function(recipe){

    state.bookmark.push(recipe);

    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBoomarks()
}



export const removeBookmark = function(id){

    const index = state.bookmark.findIndex(el => el.id === id)
    state.bookmark.splice(index, 1);
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBoomarks()

    
}

const init = function(){

    const storage = localStorage.getItem('bookmark')

    if(storage) state.bookmark = JSON.parse(storage)

}

init()
