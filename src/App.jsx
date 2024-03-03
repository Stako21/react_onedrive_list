import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import './App.scss';
import { useEffect, useState } from 'react';


export const App = () => {
  const [lists, setLists] = useState([]);
  const [about, setAbout] = useState({});

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('/api/lists.json');
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    const fetchAbout = async () => {
      try {
        const response = await fetch('/api/about.json');
        const data = await response.json();
        setAbout(data);
      } catch (error) {
        console.error('Error fetching about:', error);
      }
    };

    fetchLists();
    fetchAbout();
  }, []);

  return (
    <div className='body'>
      <Header about={about}/>
      <List lists={lists}/>
    </div>
  );
};
