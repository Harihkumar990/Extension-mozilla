import { Fragment,useRef } from "react"
import { UseAuth } from "../context/authcontext";

const FirstPage = () =>{
    const {dispatch} = UseAuth();
    const handleref = useRef();

    const handlesubmit = (e) =>{
        e.preventDefault()
        localStorage.setItem("name",handleref.current.value);
       
        dispatch({
            type:"NAME",
            value:handleref.current.value,
        })
    }
   
    return(
        <Fragment>
            <form onSubmit={handlesubmit} className="h-screen   bg-center bg-cover  ">
                <section className="h-screen flex flex-col align-middle  justify-center gap-10 " >
                    <p  className="text-6xl   font-medium  relative bottom-20  text-center  " >Browser Extension</p>
                    <div className=" text-center  text-xl " >
                        <p className="text-4xl p-3 text-slate-100" >Hello, What is your name ?</p>
                        <input placeholder="Enter" ref={handleref} className="px-3 m-2 text-white bg-transparent border-b-2 rounded-lg focus:outline-none " type="text" />
                    </div>

                </section>
            </form>

        </Fragment>

    )
}

export default FirstPage;