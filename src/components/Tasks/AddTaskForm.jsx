import axios from 'axios';
import React, { useState } from 'react';
import add from '../../assets/img/add.svg';

function AddTaskForm({ list, onAddTask }) {
  const [visibaleForm, setVisibaleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisibale = () => {
    setVisibaleForm(!visibaleForm);
    setInputValue('');
  };
  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks/', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisibale();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="tasks__form">
      {!visibaleForm ? (
        <div onClick={toggleFormVisibale} className="tasks__form-new">
          <img src={add} alt="add" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisibale} className="button button-grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
