import { API_URL } from "./config.js";
import { REQ_TIMEOUT } from "./config.js";



const timeout = function(s){
    return new Promise(function(_, reject){

        setTimeout(() => {

            return reject(new Error("Your Req is TimeOut Because of Poor Network"))
            
        }, s*1000);

})}


export const getJson = async function (urls){
        
try{
    // console.log(urls);

    const rest = await Promise.race([fetch(`${API_URL}${urls}`),timeout(REQ_TIMEOUT)])
    
    const data = await rest.json();
 
    if(!rest.ok) throw new Error(`${data.message} (${data.status})`)
    
    return data
}
catch(error){


    if((error.message).includes("Invalid _id")){
        throw new Error("The Reciepe You Found Is Not Availabel Please Try Again!") 
    }

    else{
        throw error 
    }


}   
}