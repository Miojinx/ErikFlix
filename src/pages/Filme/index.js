import { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'; //navigate para enviar o usuário de volta caso a página não exista
import api from "../../services/api";
import './style.css'
import {toast} from 'react-toastify';

function Filme(){

    const{id} = useParams();
    const [filme, setFilme] = useState({});
    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                api_key: '1be2715098fc79ad59feb33596d54284',
                language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", {replace: true})
                return;
            })
        }

        loadFilme();

        return()=>{console.log("Componente foi desmontado")}

    },[navigate, id])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@erikFlix");
        let filmesSalvos = JSON.parse(minhaLista) || []; //caso a lista já exista, será passada para filmesSalvos, se não, filmes salvos começará vazia
        const temFilme = filmesSalvos.some((filmesSalvos)=>filmesSalvos.id === filme.id)
        if(temFilme){
            toast.warn("Esse filme já está em sua lista!");
            return;
        }
        filmesSalvos.push(filme)//adiciona o novo filme à lista
        localStorage.setItem("@erikFlix", JSON.stringify(filmesSalvos));//salva como string a lista no local storage
        toast.success("Filme salvo com sucesso!")
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={`Imagem de ${filme.title}`}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} </strong>

            <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button><a rel="external" target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
            </div>
        </div>
    );
}

export default Filme;