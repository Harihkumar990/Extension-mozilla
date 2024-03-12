import { Fragment, useEffect, useRef, useState } from "react"
import { UseAuth } from "../context/authcontext";
import {v4 as uuid} from "uuid"



const TaskPage = () =>{
    const [isTodoShow,setisTodoShow] = useState(false);
    
    const {name,dispatch,time,greeting,task,TodoList} = UseAuth();
    const handleref = useRef();
    const [ischecked,setischecked] = useState(false)
    const comp = useRef()
    useEffect(()=>{
        const checkstatus = localStorage.getItem("ischecked");

        checkstatus === "true" ? setischecked(true) : setischecked(false)
    },[])

    useEffect(()=>{
        dispatch({
            type:"TASK",
            value:localStorage.getItem("task")
        })
    },[dispatch])
    const handlesubmit = e =>{
        e.preventDefault();
        localStorage.setItem("task",handleref.current.value)
        dispatch({
            type:"TASK",
            value:handleref.current.value
        })
    }
    const handlecheck = (e) =>{
       
        if(e.target.checked){
            setischecked(ischecked => !ischecked)
            
        }else{
            setischecked(ischecked => !ischecked)
            
        }
        localStorage.setItem("ischecked",e.target.checked)
    }
    const handleclearTask = () =>{
        dispatch({
            type:"CLEAR"
        })
        localStorage.removeItem("task")
        localStorage.removeItem("ischecked")
    }
    
    useEffect(()=>{
        const getCurretnTime = () =>{
            const time = new Date();
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
    
            const hour = hours < 10 ? `0${hours}` : hours
            const minute = minutes < 10 ? `0${minutes}` : minutes
            const second = seconds < 10 ? `0${seconds}` : seconds
    
            const currentTime = `${hour} : ${minute}`;
            const currentSecond = `${second}`
            setTimeout(getCurretnTime,1)
            dispatch({
                type:"TIME",
                value:[currentTime,currentSecond],
            })

               
            dispatch({
                type:"GREETING",
                value:hour
            })   
            
        }
        
        getCurretnTime()
    },[dispatch])

    const hanldeTodoInput = () =>{

      dispatch({
        type:"TODO",
        value:JSON.parse(localStorage.getItem("TodoList"))
      })
      setisTodoShow(isTodoShow => !isTodoShow)
       
        
    }

    const handleTodoSubmit = (e) =>{
       
        e.preventDefault()
        if(comp.current.value?.length > 0){
            dispatch({
                type:"TODO",
                value:[...TodoList,{ _id:uuid(),todo:comp.current.value,isCompleted:false }]
            })
        }

    }

    const handleTodoCompleted = e =>{
        let array = TodoList.map(elem => elem._id === e.target.dataset.id ? {...elem,isCompleted:!elem.isCompleted} : elem)
        dispatch({
            type:"TODO",
            value:array
        })
        

    
    }
    useEffect(()=>{
        if(TodoList?.length>0){
                
            localStorage.setItem("TodoList",JSON.stringify(TodoList));
        }
        return 
    },[TodoList])
    

    const RemoveTodoElement = (e) =>{
        const array = TodoList.filter(elem => elem._id !== e.target.dataset.id)
        dispatch({
            type:"TODO",
            value:array
        })
        console.log(array)

    }
     return(
        <Fragment>
            <section   className="  text-center flex flex-col align-middle justify-center h-screen   " >
                <div className="  relative bottom-16  text-white   " > 
                    <span className="font-family  text-5xl md:text-9xl " >{time[0] }</span>
                    <span className="font-family   text-xl md:text-2xl" >{time[1]}</span>
                </div>
                <div className="gap-3 relative bottom-10 flex flex-col  " >
                <span className="md:text-3xl text-2xl  font-bold text-sky-200" > {greeting}, {name}</span>
                    
                </div>
                {
                    name !== null && task === null ? (<form onSubmit={handlesubmit} className="gap-3 relative bottom-10 flex flex-col  p-8 m-7">
                    <span className="md:text-xl text-xl text-slate-300" >What is the Today Task</span>
                    <input  ref={handleref} className="mx-20 text-white bg-transparent  rounded-lg placeholder:text-center p-2  border-b-4 focus:outline-none " placeholder="Enter Today Task" />
                </form>) :(
                <main className=" grid gap-y-2 place-content-center  " >
                    <span className="text-white text-xl  " >Today, Task</span>
                    <div className=" w-72   break-words flex justify-between gap-2 " >
                        
                        
                        <label className={ ` ${ischecked ? "line-through" : "" }   text-white break-words flex gap-24  w-72`}  >
                        <input   onChange={handlecheck} type="checkbox" className="break-words"  checked = {ischecked} />
                            {task}
                        
                            </label>
                        <button onClick={handleclearTask} className="border text-white  h-7 rounded-lg" >Clear</button>
                    </div>
                </main>)
                }
                <main  className=" border  bottom-10 right-5 absolute  " >
                    <div className="absolute right-0  z-10 " >
                       <button onClick={hanldeTodoInput}   className="bg-black border rounded-lg w-14 h-8 text-white" >ToDo</button>
                    </div>
                   
                </main>
                <div className="overflow-auto text-white  bottom-24 max-h-56  absolute right-5  " >
                    
                {
                    isTodoShow &&  TodoList.map(elem => 
                        <div key = {elem._id}  className="m-1 flex justify-between w-60 break-words " >
                            <input checked = {elem.isCompleted}  data-id = {elem._id}  onChange={handleTodoCompleted}  type="checkbox"  className="  break-words" />
                            <p className={`${elem.isCompleted ? "line-through" : ""}  border-b-2 rounded-md px-2`} >{elem.todo}</p>
                            <span  data-id ={elem._id} onClick={RemoveTodoElement} className="material-symbols-outlined  cursor-pointer ">remove</span>
                        </div>)
                }

                    
                </div>
                <div className="bottom-14 absolute right-5" >
                {  isTodoShow && <form onSubmit={handleTodoSubmit} >

                    <input ref={comp} type="text" placeholder="Enter Todo"  className="bg-transparent rounded-lg  border-b-red-500 text-white border-b-4 focus:outline-none "  />
                    </form>
                }
                </div>
            </section>
        </Fragment>
    )
}


export default TaskPage;