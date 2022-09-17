import { Link } from "react-router-dom";
import './Header.css'

function Header(){
    return(
        <header>
           <Link className="logo" to="/">X Filmes</Link>
           <Link className="favoritos" to="favoritos" >Favoritos</Link>
        </header>
        
    )
}
export default Header;