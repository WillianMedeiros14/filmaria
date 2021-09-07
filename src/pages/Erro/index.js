import './styles.css';
import { Link } from 'react-router-dom';

import Error from '../../assets/page_not_found.svg'

export default function Erro() {
 
  return (
    <div className="not-found">
      <img src={Error} alt="Error" />
      <h2>Página não encontrada</h2>
      <Link to="/">Veja todos os filmes</Link>
    </div>
  );
}

  