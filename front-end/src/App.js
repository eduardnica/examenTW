import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';


function App () {
  const [articles, setArticles] = useState([])
  const [display, setDisplay]= useState({})
  const [formIsVisible,setFormIsVisible]= useState(false)
  const [title,setTitle]=useState("")
  const [resume,setResume]=useState("")
  const [date,setDate]=useState(new Date())
  const [isModify,setIsModify]=useState(false)

  useEffect(()=>{
    try{
      axios.get('http://localhost:8080/getArticles').then((res)=>{
        const article=res.data;
        setArticles(article);
      });
    }catch(err){
      console.error(err.response);
  }},[]);

  return (
    <div className="App">
      <Display articles={articles} display={display}/>
      <List articles={articles} display={setDisplay} setFormIsVisible={setFormIsVisible} formIsVisible={formIsVisible} title={title} resume={resume} date ={date} setTitle={setTitle} setDate={setDate} setResume={setResume} isModify={isModify} setIsModify={setIsModify}/>
    </div>
  );
}

function Display ({display}) {
  return (
    <div className ="Display">
      <h3>Titlu: {display.title}</h3>
      <p>Resume: {display.resume}</p>
      <p>Date: {display.date}</p>
    </div>
  )
}

function List ({articles,display,setFormIsVisible,formIsVisible,title,resume,date,setTitle,setDate,setResume,isModify,setIsModify}) {
  function addArticle(){
    setFormIsVisible(true);
  }
  return (
    <div className = "List">
      {articles.map((article) => <Article title={article.title} id={article.id} resume={article.resume} date={article.date} display={display} setTitle={setTitle} setDate={setDate} setResume={setResume} setFormIsVisible={setFormIsVisible} setIsModify={setIsModify}/> )}
      {formIsVisible && <Form title={title} resume={resume} date ={date} setTitle={setTitle} setDate={setDate} setResume={setResume} isModify={isModify}/>}
      <button onClick={addArticle}>New Article</button>
    </div>
  )
}

function Article ({title,id,resume,date,display,setTitle,setDate,setResume,setFormIsVisible,isModify,setIsModify}) {
  async function deleteArticle(e){
    e.preventDefault();
    try{
        axios.delete('http://localhost:8080/deleteArticle/'+ id)
        .then(response=>window.location.reload())
        .then(error=>console.log(error))
    }catch (err){
        console.log(err);
    }
  }

  function displayArticle(){
    display({title:title,id:id,resume:resume,date:date})

  }

  function modifyArticle(){
    setTitle(display.title)
    setResume(display.resume)
    setDate(display.date)
    setFormIsVisible(true)
    setIsModify(true)
  }
  return (
     <div className = "Article">
       <span>{title}</span>
       <div className= "buttons">
       <button className="button-delete" onClick={deleteArticle}>Delete</button>
       <button className = "button-display" onClick={displayArticle}>Display</button>
       <button className = "button-modify" onClick={modifyArticle}>Modify</button>
       </div>
  </div>)
}

function Form ({title,resume,date,setTitle,setDate,setResume,isModify,display}) {

  function submit(){
    const formValues={
      title, resume, date
    }
    try{
      axios.post('http://localhost:8080/addArticle',formValues).then((res)=>{
        
      });
    }catch(err){
      console.error(err.response);
  }}

  function modify(){
    const formValues={
      title, resume, date
    }
    try{
      axios.put('http://localhost:8080/modifyArticle'+ display.id,formValues).then((res)=>{
        
      });
    }catch(err){
      console.error(err.response);
  }
}
  
  return(
  <form className='form'>
    <label htmlFor='title'>Title:</label><input type = "text" id="title" value={title} onChange={e=>setTitle(e.target.value)}/>
    <label htmlFor='resume'>Resume:</label><input type = "text" id="resume" value={resume} onChange={e=>setResume(e.target.value)}/>
    <label htmlFor='date'>Date:</label><input type = "date" id="date" value={date} onChange={e=>setDate(e.target.value)}/>
    {isModify?<button onClick={modify}>Modify</button>:<button onClick={submit}>Submit</button>}
  </form>)
}

export default App;
