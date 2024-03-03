import { About } from '../About/About'
import './Header.scss'

export const Header = ({ about }) => (
  <header className="header">
    <h1 className='header__title'>OneDrive</h1>
    < About about={about} />
  </header>

)