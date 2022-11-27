import React from 'react';
import classNames from 'classnames';

import x from '../../assets/img/x.svg';

import './List.scss';
import Badge from '../Badge/Badge';
import axios from 'axios';

function List({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
  onClick1,
}) {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete(`http://localhost:3001/lists/` + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames(item.className, {
              active: item.active
                ? item.active
                : activeItem && activeItem.id === item.id,
            })}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span onClick={onClick1}>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={x}
                alt="x"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
