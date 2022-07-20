import React,{ useState, Fragment } from 'react'
import MetaData from "../layout/MetaData";
import {useNavigate} from 'react-router-dom'
import './Search.css';

function Search() {
    let navigate=useNavigate()
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler =(e)=>{
      
        if(keyword.trim())
        {
          navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products`)
        }
    }
  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" >
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" onClick={searchSubmitHandler} >Search</button>
      </form>
    </Fragment>
  )
}

export default Search