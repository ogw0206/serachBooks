import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { getBooks } from './utils/books';

function App() {

  const baseURL="https://www.googleapis.com/books/v1/volumes?q=";
  
  const [books,setBooks]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [bookData,setBookData]=useState([]);


  const onClickSearch=()=>{
    const fetchBooksData=async()=>{
      setIsLoading(true)
      let res=await getBooks(baseURL+`${books}`+`&maxResults=30`);
      //各書籍の詳細なデータを取得
      setIsLoading(false);
      console.log(res.items);
      setBookData(res.items)
    };
    fetchBooksData();

  }


  return (
    <>
      <div className='inputArea'>
        <input className="input" type="text" placeholder='本の名前を入力してね' value={books}  onChange={(e)=>setBooks(e.target.value)} />
        <button onClick={onClickSearch}>検索</button>
      </div>
      {isLoading ? 
      <div className='loadingText'>検索中です...</div> 
        : 
        <div className="booksArea">
          {bookData.map((bookData,i)=>{
            return (
            <div className='booksBox' key={i}>
              <a href={bookData.volumeInfo.infoLink} target="_blank"><img src={bookData.volumeInfo.imageLinks?.thumbnail} alt={bookData.volumeInfo.title} /></a>
              <p><a href={bookData.volumeInfo.infoLink} target="_blank">{bookData.volumeInfo.title}</a></p>
              <small>{bookData.volumeInfo.authors}</small>
              <p>{bookData.searchInfo?.textSnippet}</p>
            </div>
            )
          })}

        </div>
      }
    </>
  );
}

export default App;
