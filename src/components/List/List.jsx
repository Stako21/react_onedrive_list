import React, { useState } from "react";
import bytes from "bytes";
import 'bulma/css/bulma.css';
import './List.scss';

const ListItem = ({ item }) => {
  if (item.IsDir) {
    return <FolderItem item={item} />;
  } else {
    return <FileItem item={item} />;
  }
};

const FolderItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <li className="folder" key={item.Path}>
      <div className="isfolder">
        <button
          className="button is-small is-info is-outlined"
          onClick={toggleExpansion}
        >
          {expanded ? '-' : '+'}
        </button>
        <span className="folder__title">
          {item.Name}
        </span>
      </div>
      {expanded && (
        <ul className="content">
          {item.Children.map(child => (
            <ListItem item={child} key={child.ID} />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileItem = ({ item }) => {
  return (
    <li className="file" key={item.ID}>
      <span className={item.Name.includes('.bak') ? 'file__name bak' : 'file__name nobak'}>
        {item.Name}
      </span>
      <span className={item.Name.includes('.bak') ? 'file__size bak' : 'file__size nobak'}>
        {bytes(item.Size)}
      </span>
      <span className={item.Name.includes('.bak') ? 'file__date bak' : 'file__date nobak'}>
        {isDate(item.ModTime)}
      </span>
    </li>
  );
};

function isDate(dates) {
  const date = dates.slice(0, 10);
  const time = dates.slice(-9, -1);

  return `${date}  (${time})`;
}

export const List = ({ lists }) => {
  const preparedList = getPreparedList(lists);

  return (
    <div className="wrapper">
      {/* <div className="container"> */}
        <ul className="content">
          {preparedList.map(item => (
            <ListItem item={item} key={item.Path} />
          ))}
        </ul>
      {/* </div> */}
    </div>
  );
};

function getPreparedList(lists) {
  const map = {};
  const result = [];

  // Створення мапи для швидкого доступу за шляхом
  lists.forEach(item => {
    map[item.Path] = item;
    map[item.Path].Children = []; // Додавання поля Children
  });

  // Додавання дочірніх елементів відповідним батьківським елементам
  lists.forEach(item => {
    if (item.Path.includes('/')) {
      const parentPath = item.Path.substring(0, item.Path.lastIndexOf('/'));
      map[parentPath].Children.push(item);
    } else {
      result.push(item);
    }
  });

  // Сортування тільки дочірніх елементів (файлів) за датою від найновіших
  Object.values(map).forEach(parent => {
    if (parent.Children.length > 0) {
      parent.Children.sort((a, b) => new Date(b.ModTime) - new Date(a.ModTime));
    }
  });

  console.log(result);

  return result;
}
