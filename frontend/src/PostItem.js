import React, { useState } from "react";

function PostItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = () => {
    const newItem = {
      title: title,
      description: description,
    };

    setItems([...items, newItem]);

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Post Item</h2>

      <input
        type="text"
        placeholder="Enter item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <hr />

      <h3>Posted Items</h3>

      {items.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostItem;