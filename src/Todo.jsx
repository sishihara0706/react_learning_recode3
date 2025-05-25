import { useState } from 'react';
import './style.css';
import { InputTodo } from './conponents/inputTodo';
import { IncompleteTodos } from './conponents/IncompleteTodos';
import { CompleteTodos } from './conponents/CompleteTodos';

export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return; //何も入力されていないときは何もしない
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    // 未完了リストから削除
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //特定の配列から指定したインデックスから第二引数で指定した分削除する
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    // 未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); //特定の配列から指定したインデックスから第二引数で指定した分削除する
    setIncompleteTodos(newIncompleteTodos);

    // 完了リストに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    // 完了リストから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);

    // 未完了リストに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <InputTodo 
        todoText={todoText} 
        onChange={onChangeText} 
        onClick={onClickAdd} 
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red"}}>
          登録できるTODOは5個までだよ～。消化しろ～。
        </p>
      )}
      <IncompleteTodos 
        todos={incompleteTodos} 
        onClickComplete={onClickComplete} 
        onClickDelete={onClickDelete} 
      />
      <CompleteTodos 
        todos={completeTodos} 
        onClickBack={onClickBack} 
      />
    </>
  );
};
