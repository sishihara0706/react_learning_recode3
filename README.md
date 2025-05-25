### React の Todo アプリ解説

この React コードは**簡単な TODO 管理アプリ**を構成しています。以下に、各部分の説明をまとめてみました。
なお、こちらのアプリはUdemyの講座で学習したものです。
https://www.udemy.com/share/103Fxl/
---

## 🛠 1. 使用する React 機能

このコンポーネントでは、以下の**React の機能**を活用しています：

- `useState` フック：状態管理を行う
- イベント処理 (`onClick`, `onChange`) を使って、ユーザーの操作に応じて状態を更新

---

## 📝 2. 状態管理 (`useState`)

```js
const [todoText, setTodoText] = useState('');
const [incompleteTodos, setIncompleteTodos] = useState([]);
const [completeTodos, setCompleteTodos] = useState([]);
```

上記の 3 つのステートを管理しています：

1. `todoText`：入力フォームの値（ユーザーが入力した TODO テキスト）
2. `incompleteTodos`：未完了の TODO リスト
3. `completeTodos`：完了済みの TODO リスト

---

## 🔄 3. ユーザーの操作を処理する関数

### 🏗 追加処理 (`onClickAdd`)

```js
const onClickAdd = () => {
  if (todoText === '') return;
  const newTodos = [...incompleteTodos, todoText];
  setIncompleteTodos(newTodos);
  setTodoText('');
};
```

- `todoText` が空の場合、何もしない
- 新しい TODO を `incompleteTodos` に追加
- 入力フォームをクリア

---

### 🗑 削除処理 (`onClickDelete`)

```js
const onClickDelete = (index) => {
  const newTodos = [...incompleteTodos];
  newTodos.splice(index, 1);
  setIncompleteTodos(newTodos);
};
```

- `splice(index, 1)` によって該当の TODO を削除

---

### ✅ 完了処理 (`onClickComplete`)

```js
const onClickComplete = (index) => {
  const newIncompleteTodos = [...incompleteTodos];
  newIncompleteTodos.splice(index, 1);

  const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
  setIncompleteTodos(newIncompleteTodos);
  setCompleteTodos(newCompleteTodos);
};
```

- `incompleteTodos` から削除
- `completeTodos` に追加

---

### 🔄 戻す処理 (`onClickBack`)

```js
const onClickBack = (index) => {
  const newCompleteTodos = [...completeTodos];
  newCompleteTodos.splice(index, 1);
  setCompleteTodos(newCompleteTodos);

  const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
  setIncompleteTodos(newIncompleteTodos);
};
```

- `completeTodos` から削除
- `incompleteTodos` に戻す

---

## 🖥 4. UI の構築 (JSX)

```js
<div className="input-area">
  <input placeholder="TODOを入力" value={todoText} onChange={onChangeText} />
  <button onClick={onClickAdd}>追加</button>
</div>
```

- `input` 要素：TODO の入力欄
- `button`：TODO を追加するボタン

---

### ⏳ 未完了 TODO リスト

```js
{incompleteTodos.map((todo, index) => (
  <li key={todo}>
    <div className="list-row">
      <p className="todo-item">{todo}</p>
      <button onClick={() => onClickComplete(index)}>完了</button>
      <button onClick={() => onClickDelete(index)}>削除</button>
    </div>
  </li>
))}
```

- `.map()` を使用して `incompleteTodos` の一覧を表示
- `完了ボタン` と `削除ボタン` を設定

---

### ✅ 完了 TODO リスト

```js
{completeTodos.map((todo, index) => (
  <li key={todo}>
    <div className="list-row">
      <p className="todo-item">{todo}</p>
      <button onClick={() => onClickBack(index)}>戻す</button>
    </div>
  </li>
))}
```

- `戻すボタン` をクリックすると `未完了リスト` に復帰

---

## 🎯 まとめ

この React コンポーネントは**TODO リストの管理機能**をシンプルに実装しています。

- 入力・追加・削除・完了・戻すの機能を実現
- `useState` を使った状態管理
- `.map()` を使ってリストを動的に表示

💡 以下のようにカスタマイズできると思います：

- `localStorage` に保存してリロード後もデータを保持する
- `React.memo` を使ってパフォーマンスを向上させる
- `Redux` を導入し、状態管理をより効率的にする

こんな感じで、いろいろ拡張できますね！😃

---
## 以下は全体のコード
```js
import { useState } from 'react';
import './style.css';

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

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => (
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => (
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
```