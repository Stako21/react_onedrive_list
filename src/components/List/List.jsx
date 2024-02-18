import React from "react"


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
    <ul>
      {items.map(item => (
        <li key={item.Path}>
          {item.IsDir ? (
            <>
              <strong>{item.Name}</strong>
              {renderList(item.Children)}
            </>
          ) : (
            <span>{item.Name}</span>
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