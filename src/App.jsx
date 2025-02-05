import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    id: 1,
    title: "",
    content: "",
    author: "",
    sector: "",
    published: false,
  });
  const [list, setList] = useState([]);

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const currentList = [...list, formData];
    setList(currentList);

    // alternative
    // setList([...list, formData])
    // setList((current) => [...current, formData]);

    setFormData({
      id: 1,
      title: "",
      content: "",
      author: "",
      sector: "",
      published: false,
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
                <span>
                  {post.title} - {post.author} - {post.sector}
                </span>
                <div>
                  {post.published ? post.content : "Contenuto non pubblicato"}
                </div>

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

          <label htmlFor="postAuthor">Autore</label>
          <input
            id="postAuthor"
            type="text"
            placeholder="..."
            value={formData.author}
            required
            onChange={(event) => {
              handlerFormData("author", event.target.value);
            }}
          />

          <label htmlFor="postSector">Settore</label>
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
          </select>

          <label htmlFor="postVisibility">Da pubblicare</label>
          <input
            id="postVisibility"
            type="checkbox"
            checked={formData.published}
            onChange={(event) => {
              handlerFormData("published", event.target.checked);
            }}
          />

          <button type="submit">
            <strong>+</strong> Nuovo post
          </button>
        </form>
      </div>
    </div>
  );
}
