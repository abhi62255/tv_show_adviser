import { useState } from "react"
import s from "./styles.module.css"
import { Search as SearchIcon } from "react-bootstrap-icons"

export function SearchBar({onSubmit}){

    const [value, setValue] = useState("");

    function submit(e){
        if(e.key === "Enter" && e.target.value.trim()!==""){
            onSubmit(e.target.value);
            setValue("");
        }
    }

    function handelChange(e){
        setValue(e.target.value)

    }

    return(
        <>
            <SearchIcon size={27} className={s.icon} />
            <input 
                type="text" 
                className={s.input} 
                placeholder="Search a tv show you may like"
                onKeyUp={submit}
                value={value}
                onChange={handelChange}

            ></input>
        </>
    )
}