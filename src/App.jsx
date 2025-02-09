import { useState, useEffect } from "react";
import axios from "axios";

const initialData = {
  titolo: "",
  contenuto: "",
  immagine: "",
  tags: [],
  dellaTradizione: false,
  difficoltà: "",
  tempistiche: "",
};

export default function App() {
  const [formData, setFormData] = useState(initialData);
  const [list, setList] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then(function (response) {
      setList(response.data);
    });
  };

  const handlerSubmitFormData = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/posts", formData)
      .then(function (response) {
        // console.log(response.data);
        // setList(response.data);
        const currentList = [...list, response.data];
        setList((currentList) => [...currentList, response.data]);
        setFormData(initialData);
      });
  };

  const handlerDeletePost = (postId) => {
    axios.delete(`http://localhost:3000/posts/${postId}`).then(() => {
      setList((currentList) =>
        currentList.filter((post) => post.id !== postId)
      );
    });
  };

  // ha effetto solo sul client
  const deleteList = () => setList([]);

  useEffect(fetchPosts, []);

  const handlerFormData = (field, value) => {
    setFormData((currentFormData) => {
      // console.log(currentFormData);
      return { ...currentFormData, [field]: value };
    });
  };

  // ha effetto solo sul client
  const handleSubmit = (event, id) => {
    event.preventDefault();
    const currentList = [...list, formData];
    setList(currentList);
    console.log(currentList);

    // alternative
    // setList([...list, formData])
    // setList((current) => [...current, formData]);

    setFormData({
      titolo: "",
      contenuto: "",
      immagine: "",
      tags: [],
      dellaTradizione: false,
      difficoltà: "",
      tempistiche: "",
    });
    // return currentList;
  };

  // ha effetto solo sul client
  const deletePost = (id) => {
    setList((current) => {
      return current.filter((formData, postid) => postid !== id);
    });
  };

  return (
    <div className="container">
      <h2>Le ricette di nonna</h2>
      <div>
        <ul>
          {list.map((post) => {
            return (
              <li key={post.id}>
                <span>{post.titolo}</span>
                {post.dellaTradizione ? (
                  <div>Ricetta tradizionale</div>
                ) : (
                  <div>Ricetta rivisitata</div>
                )}
                <button
                  type="button"
                  onClick={() => handlerDeletePost(post.id)}
                >
                  🗑️
                </button>
                <br />
                <div className="imgSlot">
                  <img
                    // src={
                    //   `http://localhost:3000/${post.immagine}` || post.immagine
                    // }
                    src={"http://localhost:3000/" + post.immagine}
                    alt={post.titolo}
                  />
                </div>
                <div className="description">{post.contenuto}</div>
                <div>
                  <span>{post.difficoltà}</span>
                  <span>{post.tempistiche}</span>
                </div>
                {/* {console.log("http://localhost:3000/" + post.immagine)} */}
                {/* {console.log(post.immagine)} */}
                {/* <div>{post.tags || ""}</div> */}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handlerSubmitFormData}>
          <button type="button" onClick={deleteList}>
            Svuota ricettario
          </button>

          <label htmlFor="postTitolo">Titolo*</label>
          <input
            id="postTitolo"
            type="text"
            placeholder="..."
            value={formData.titolo}
            required
            onChange={(event) => {
              handlerFormData("titolo", event.target.value);
            }}
          />

          <label htmlFor="postContenuto">Contenuto*</label>
          <input
            id="postContenuto"
            type="text"
            placeholder="..."
            value={formData.contenuto}
            required
            onChange={(event) => {
              handlerFormData("contenuto", event.target.value);
            }}
          />

          <label htmlFor="postImmagine">Immagine</label>
          <input
            id="postImmagine"
            type="text"
            placeholder="..."
            value={formData.immagine}
            // required
            onChange={(event) => {
              handlerFormData("immagine", event.target.value);
            }}
          />

          <label htmlFor="postDifficoltà">Difficoltà</label>
          <select
            name="postDifficoltà"
            id="postDifficoltà"
            required
            value={formData.difficoltà}
            onChange={(event) => {
              handlerFormData("difficoltà", event.target.value);
            }}
          >
            <option value="" hidden>
              Seleziona un opzione
            </option>
            <option value="😏">Bassa</option>
            <option value="😏🥴">Media</option>
            <option value="😏🥴🤯">Elevata</option>
          </select>

          <label htmlFor="postTempistiche">Tempistiche</label>
          <select
            name="postTempistiche"
            id="postTempistiche"
            required
            value={formData.tempistiche}
            onChange={(event) => {
              handlerFormData("tempistiche", event.target.value);
            }}
          >
            <option value="" hidden>
              Seleziona un opzione
            </option>
            <option value="⏲️">Meno di un'ora</option>
            <option value="🕝⏲️">Diverse ore</option>
            <option value="🗓️🕝⏲️">Giorni</option>
          </select>

          <div>
            <label htmlFor="postDellaTradizione">Ricetta tradizionale</label>
            <input
              id="postDellaTradizione"
              type="checkbox"
              checked={formData.dellaTradizione}
              onChange={(event) => {
                handlerFormData("dellaTradizione", event.target.checked);
              }}
            />
          </div>

          <button type="submit">
            <strong>+</strong> Aggiungi Ricetta
          </button>
        </form>
      </div>
    </div>
  );
}
