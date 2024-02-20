import React from "react";
import bytes from "bytes";
// import cn from "classnames";
// import 'bulma/css/bulma.css';
import './List.scss';


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

  return result;
}

// Рекурсивний відображувач списку
const renderList = (items) => {
  return (
    <ul class="content">
      {items.map(item => (
        <li className={item.IsDir ? 'folder' : 'file'} key={item.Path}>
          {item.IsDir ? (
            <>
              <button class="button">+</button>
              <span className="folder__name">
                {item.Name}
              </span>
              {renderList(item.Children)}
            </>
          ) : (
            <>
              <span className={item.Name.includes('.bak') ? 'bak' : 'nobak'}>
                {`${item.Name}`}
              </span>
              <span className={item.Name.includes('.bak') ? 'bak' : 'nobak'}>
                {`${bytes(item.Size)}`}
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export const List = ({ lists }) => {
  const preparedList = getPreparedList(lists);

  return (
    <div>
      {renderList(preparedList)}
    </div>
  );
};