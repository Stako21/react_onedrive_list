import { Header } from './components/Header/Header';
import { List } from './components/List/List'
import './App.scss'
import lists from './api/lists.json'

export const App = () => (
  <div>
    <Header />
    <List lists={lists}/>
  </div>
)