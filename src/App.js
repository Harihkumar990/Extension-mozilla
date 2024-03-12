import TaskPage from "./components/task";
import FirstPage from "./components/firstcontent";
import { UseAuth } from "./context/authcontext";
import { useEffect } from "react";
const number = Math.floor(Math.random(1,9)*10)
const App = () =>{
  
  const {name,dispatch} = UseAuth(); 
  

  useEffect(()=>{
    const username = localStorage.getItem("name");
    
    dispatch({
      type:"NAME",
      value:username
    })
  },[dispatch])

  return(
   
        <main  className="sm h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url(./content/image${number}.jpg)`}} >

            {
                name?.length > 0 ? <TaskPage/> : <FirstPage/> 
            }

        </main>

    
  )
}


export default App;