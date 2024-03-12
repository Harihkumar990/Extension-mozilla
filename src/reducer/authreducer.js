import { json } from "react-router"

const browserreducer = (state,{type,value})  =>{
    
    switch(type){
        case "NAME":
            return{
                ...state,
                name:value
                
            }
        case "TIME":
            return{
                ...state,
                time:value

            }
        case "GREETING":
            return{
                ...state,
                greeting:value>=0 && value<12 ? "Good Morning" : value>=12 && value < 17 ? "Good Afternoon" : "Good Evening",
            }
        case "TASK":
            return{
                ...state,
                task:value
            }
        case "CLEAR":
            return{
                ...state,
                task:null
            }
        case "TODO":
            
            return{
                ...state,
                TodoList:value
                
            }
        default:
            return state

    }


}

export default browserreducer;