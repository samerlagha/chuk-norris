import React, { useState, useEffect } from "react";
import chuk from './images/chuk.png'
import './App.css'

export default function App() {

   const clickChuckCategory=(cat)=> {
     getChuckJokesByCat(cat);
  }

// it's a button component
  const CatBtn = (props) => {
    return (
      <button
      className="btn"
       onClick={() => clickChuckCategory(props.cat)} >
            {props.cat.toUpperCase()}
      </button>
    );
  };
 
  // URL used to retreive random quote, will pass in category param elsewhere

  const categoryRandomJokesUrl ="https://api.chucknorris.io/jokes/random?category=";
  // Set the random quote into a state variable
  const [categoryRandomJokes, setCategoryRandomJokes] = useState("");
  // Get the random quote by category
  const getChuckJokesByCat = async (cat) => {
    const url = `${categoryRandomJokesUrl}${cat}`;
    const response = await fetch(url);
    const data = await response.json();
    setCategoryRandomJokes(data);
  };
 
  // Get all the Categories
  const [chuckCats, setChuckCats] = useState({});
  // useEffect to get the Categories
  useEffect(() => {
    getChuckCats();
  }, []);
  // This is the main Categories URL
  const categoryUrl = "https://api.chucknorris.io/jokes/categories";
  // Called to retreive the Categories through async fetch
  // The store data in a state variable: chuckCats
  const getChuckCats = async () => {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    setChuckCats(data);
  };

  return (
    <>
    
    <main>
      
    <div className="logo">
            <div className="logo-box">
                <img src="https://assets.chucknorris.host/img/avatar/chuck-norris.png" alt="Chuck Norris"/>
                <p>
                    Chuck Norris 
                </p>
            </div>
        </div>
      
      
        <div className="Categories">
        <h1 className="Categories-title" >Categories</h1>
         <div  className="Categories-list" > 
            {Object.keys(chuckCats).map((key) => (
            
                <CatBtn    key={key} cat={chuckCats[key]} />
              
            ))}
           </div> 
       
        <img className="Categories-img" src={chuk} alt="Chuck Norris"/>

          <div className="out">
         
          <p className="out-text">
           {!categoryRandomJokes.value
            ?` The only thing Chuck Norris says on a job interview: “Hi,
             I’m Chuck Norris and I start tomorrow. Any questions?” `
            :categoryRandomJokes.value
            
            }
          
           </p>
           </div>
           </div>
    </main>
    </>
  
    
  );
}
