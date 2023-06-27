import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [itemTextUpdate, setItemTextUpdate] = useState("");

  //add new todo item to da
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8089/api/item", { item: itemText});
      setItemText((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  //create to fecth all item from db -- use useEffect hook
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get("http://localhost:8089/api/items");
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, [listItems]);

  //delete item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8089/api/item/${id}`);
      const newList = listItems.filter((item) => item._id !== id);
      setListItems(newList);
    } catch (error) {
      console.log(error);
    }
  };

  //update
  const updateItem = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8089/api/item/${isUpdating}`, {item:itemTextUpdate})
      setItemTextUpdate('');
      setIsUpdating('');
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating)
      const updatedItem = listItems[updatedItemIndex].item = itemTextUpdate
    } catch (error) {
      console.log(error)
    }
  }

  //display and hide update form
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input className="update-new-input" type="text" placeholder="Update Item"
       onChange={e=> {setItemTextUpdate(e.target.value)}} value={itemTextUpdate}></input>
      <button className="update-new-button" type="submit">Update</button>
      <button className="cancel-new-button" type="cancel" onClick={() => {setIsUpdating(0)}}>Cancel</button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder="Add toto item" onChange={(e) => { setItemText(e.target.value); }} value={itemText}></input>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map(item => (
          <div className="todo-item">
            {isUpdating === item._id 
            ? renderUpdateForm() 
            : <>
              <p className="item-content">{item.item}</p>
              <button className="update-item" onClick={() => {setIsUpdating(item._id)}}> Update </button>
              <button className="delete-item" onClick={() => {deleteItem(item._id)}}> Delete </button>
            </>
            }
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
