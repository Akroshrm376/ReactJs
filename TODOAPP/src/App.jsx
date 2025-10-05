import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [temItem, setTempItem] = useState("");
  const [enabledEdit, setEnabledEdit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleAdd() {
    if (!temItem.trim()) return;
    if (enabledEdit) {
      addEditedItem();
    } else {
      setList((prev) => [...prev, temItem]);
      setTempItem("");
    }
  }

  function handleEdit(index) {
    setEnabledEdit(true);
    setCurrentIndex(index);
    setTempItem(list[index]);
  }

  function addEditedItem() {
    let duplicatelist = [...list];
    duplicatelist[currentIndex] = temItem;
    setList(duplicatelist);
    setTempItem("");
    setEnabledEdit(false);
  }

  function handleDeleteItem(index) {
    let duplicatelist = [...list];
    let updatedList = duplicatelist.filter(
      (item) => item !== duplicatelist[index]
    );
    setList(updatedList);
  }

  return (
    <>
      <div className="container">
        <header>ToDO App</header>
        <div className="c-1">
          <input
            className="input-field"
            type="text"
            value={temItem}
            onChange={(e) => {
              setTempItem(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                console.log("xxxxx");
                handleAdd();
              }
            }}
          />
          <button className="sub-btn" onClick={handleAdd}>
            {enabledEdit ? "Edit" : "Add"}
          </button>
        </div>
        {list.length > 0 && (
          <div className="chip-container">
            {list.map((item, index) => (
              <div className="chip-div" key={item}>
                <p className="chipitem"> {item}</p>
                <div className="chip-btns">
                  <button className="editbtn" onClick={() => handleEdit(index)}>
                    ✍️
                  </button>
                  <button
                    className="delbtn"
                    onClick={() => handleDeleteItem(index)}>
                    ␡
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
