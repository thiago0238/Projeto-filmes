import React,{useEffect, useState} from 'react';
import api from '../../services/api'
import './Home.css'
import {Link} from 'react-router-dom'

// url da API movie/now_playing?api_key=f5984d8616be1614331f2870352d0d1e
function Home(){
    const [filmes, setFilme] = useState([]);
    const [loanding, setLoading] = useState(true);
    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:"f5984d8616be1614331f2870352d0d1e",
                    language:"pt-br",
                    page:1,
                }
            })
            /* Logging the first 10 results of the API call. */
            // console.log(response.data.results.slice(0,10));
            setFilme(response.data.results)
            setLoading(false)
        }
        loadFilme();
    },[]);
    if(loanding){
        return(
            <div className="loading" >
                <h2> Caregando Filmes...</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                        
                    )
                })}
            </div>
    </div>
    )
}
export default Home;