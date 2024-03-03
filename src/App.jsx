import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import './App.scss';
import lists from './api/lists.json';
import about from './api/about.json';

export const App = () => (
  <div className='body'>
    <Header about={about}/>
    <List lists={lists}/>
  </div>
)