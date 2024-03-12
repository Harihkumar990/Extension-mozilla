import { useReducer,useContext,createContext } from "react";
import browserreducer from "../reducer/authreducer";
const initialvalue = {
    name:"",
    time:"",
    greeting:"",
    task:null,
    TodoList:[]
}
const AuthContext = createContext(initialvalue);

const AuthProvider = ({children}) =>{
  
    
    const [{TodoList,name,time,greeting,task},dispatch] = useReducer(browserreducer,initialvalue);



    return(

        <AuthContext.Provider value={{dispatch,name,time,greeting,task,TodoList}} > 
            {children}
        </AuthContext.Provider>

    )

}


const UseAuth = () =>{
    const userhook = useContext(AuthContext);
    if(!userhook){
        alert("Context Not Work ")
    }
    
    return userhook
}

export {UseAuth,AuthProvider}