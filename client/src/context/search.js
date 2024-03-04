import React from 'react';
import {useState,useContext,createContext} from 'react'
const SearchContext=createContext()

const SearchProvider=({children})=>{
    const [keyword,setKeyword]=useState({
      keyword:"",
      results:[]
    });
    
    return(
        <SearchContext.Provider value={[keyword,setKeyword]}>
            {children}
        </SearchContext.Provider>
    )
}

//custom hook
const useSearch=()=>useContext(SearchContext)

export {useSearch,SearchProvider};