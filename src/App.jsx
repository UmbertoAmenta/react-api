import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const initialData = {
  title: "",
  content: "",
  image: "",
  tags: [],
};

export default function App() {
  const [formData, setFormData] = useState(initialData);
  const [list, setList] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then(function (response) {
      setList(response.data);
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
    setFormData((currentFormData) => {
      console.log(currentFormData);
      return { ...currentFormData, [field]: value };
    });
  };

  return (
    <div className="container">
      <h2>Le ricette di nonna</h2>
      <div>
        <ul>
          {list.map((post, id) => {
            return (
              <li key={id}>
                <span>{post.titolo || post.title}</span>
                <button type="button" onClick={() => deletePost(id)}>
                  🗑️
                </button>
                <br />
                <img
                  src={"http://localhost:3000/" + post.immagine || post.image}
                  alt={post.titolo || post.title}
                />
                <div className="description">
                  {post.contenuto || post.content}
                </div>
                {console.log("http://localhost:3000/" + post.immagine)}
                {/* {console.log(post.immagine)} */}
                {/* <div>{post.tags || ""}</div> */}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={deleteList}>
            Svuota ricettario
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
            <strong>+</strong> Aggiungi Ricetta
          </button>
        </form>
      </div>
    </div>
  );
}
