import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    image: "",
    tags: [],
  });
  const [list, setList] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then(function (response) {
      setFormData(response.data);
    });
  };

  useEffect(fetchPosts, []);

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const currentList = [...list, formData];
    setList(currentList);

    // alternative
    // setList([...list, formData])
    // setList((current) => [...current, formData]);

    setFormData({
      id: "",
      title: "",
      content: "",
      image: "",
      tags: [],
    });
  };

  const deleteList = () => setList([]);

  const deletePost = (id) => {
    setList((current) => {
      return current.filter((formData, postid) => postid !== id);
    });
  };

  const handlerFormData = (field, value) => {
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Blog in costruzione</h2>
      <div>
        <ul>
          {list.map((post, id) => {
            return (
              <li key={id}>
                <span>{post.title}</span>
                <div>{post.content}</div>
                <img src={post.image} alt="" />
                <div>{post.tags}</div>
                <button onClick={() => deletePost(id)}>🗑️</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={deleteList}>
            Svuota lista
          </button>
          <label htmlFor="postTitle">Titolo</label>
          <input
            id="postTitle"
            type="text"
            placeholder="..."
            value={formData.title}
            required
            onChange={(event) => {
              handlerFormData("title", event.target.value);
            }}
          />

          <label htmlFor="postContent">Contenuto</label>
          <input
            id="postContent"
            type="text"
            placeholder="..."
            value={formData.content}
            required
            onChange={(event) => {
              handlerFormData("content", event.target.value);
            }}
          />

          <label htmlFor="postimage">Immagine</label>
          <input
            id="postimage"
            type="text"
            placeholder="..."
            value={formData.image}
            // required
            onChange={(event) => {
              handlerFormData("image", event.target.value);
            }}
          />

          {/* <label htmlFor="postSector">Settore</label>
          <select
            name="postSector"
            id="postSector"
            required
            value={formData.sector}
            onChange={(event) => {
              handlerFormData("sector", event.target.value);
            }}
          >
            <option value="" hidden>
              Seleziona un opzione
            </option>
            <option value="frontEnd">FrontEnd</option>
            <option value="backEnd">BackEnd</option>
            <option value="design">UI/UX</option>
          </select> */}

          <button type="submit">
            <strong>+</strong> Nuovo post
          </button>
        </form>
      </div>
    </div>
  );
}
