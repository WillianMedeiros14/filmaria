import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import './styles.css';

import api from '../../services/api';

function Filme() {

  const { id } = useParams();
  const history = useHistory();

  const [filme, setFilme] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get(`r-api/?api=filmes/${id}`);
     
      if(response.data.length === 0){
        history.replace('/');
        return;
      }

      setFilme(response.data);
      setLoad(false);
    }

    loadFilmes();
  }, [history, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem('filmes');
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id); 

    if(hasFilme){
      toast.info('Você já possui esse filme salvo!');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');
  }

  if(load){
    return(
      <div className="filme-info">
        <h1>Carregando seu filme...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />

      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}
  
export default Filme;
  