import React,{useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import api from "../../services/api";
import './filme.css'

import {toast} from "react-toastify";


function Filme(){
    const {id}= useParams();
    const navigate= useNavigate();
    const [filme, setFilme]= useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"f5984d8616be1614331f2870352d0d1e",
                    language:"pt-br",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme nao encontrado");
                /* Redirecting the user to the home page. */
                navigate("/",{replase:true});
                return;
            })
        }
        loadFilme();

        return () =>{
            console.log("O componente foi desmontado");
        }
    },[navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@xFilmes");
        let meusFilmes = JSON.parse(minhaLista) || [];
        // some é uma propriedade que faz a comparação se tem ou nao id iguais
        // devolve true ou false
        const hasFilmes = meusFilmes.some((meusFilmes)=> meusFilmes.id === filme.id);
        if(hasFilmes){
            toast.warn("esse fime ja esta na sua lista");
            return;
        }
        meusFilmes.push(filme);
        localStorage.setItem("@xFilmes", JSON.stringify(meusFilmes));
        toast.success("Filme salvo");
        
    }
    if(loading){
        return(
            <div className="filme-info">
                <h1> Carregando detalhes...</h1>
            </div>
        )
    }
   
    return(
       <div className="filme-info">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4119171322895195"
     crossorigin="anonymous"></script>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            
            <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
            </div>
            
            
       </div>
    )
}
export default Filme;