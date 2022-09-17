import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css'
function Favoritos(){

    const[filmes, setFilme] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@xFilmes");
        setFilme(JSON.parse(minhaLista) || []);
    },[])

    function excluirFilmes(id){
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id !== id)
        })
        setFilme(filtroFilmes);
        localStorage.setItem("@xFilmes", JSON.stringify(filtroFilmes));
        toast.success("removido com sucesso")
    }

    return(
        <div className="meus-filmes">
            <h1> Meus filmes favoritos</h1>
            {filmes.length ===0 && <span>Você ainda não possui filmes cadastrados</span>}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4119171322895195"
     crossorigin="anonymous"></script>
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}> Ver detalhes</Link>
                                <button onClick={()=> excluirFilmes(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            
        </div>
    )
}
export default Favoritos;