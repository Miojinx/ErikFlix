import './style.css';
import {Link} from 'react-router-dom'


function Header(){
    return(
        <header>
            <Link className='logo' to='/'>ErikFlix</Link>
            <Link className='favs' to='/favoritos'>Meus Filmes</Link>
        </header>
    );
}

export default Header;