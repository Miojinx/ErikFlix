import { useEffect, useState } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './style.css';
//movie/now_playing?api_key=1be2715098fc79ad59feb33596d54284&language=PT-br

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '1be2715098fc79ad59feb33596d54284',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results);
            setLoading(false);
        }

        loadFilmes();

    }, []);


    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => { //para cada item do state filme, teremos:
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={`poster de ${filme.title}`}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;