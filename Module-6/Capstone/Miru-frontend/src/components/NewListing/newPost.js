import { useState, useEffect, useContext, React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../helpers/api";
import { UserContext } from "../Contexts/UserContext";
import SearchByCategory from "../Activities/searchByCategory";
import SearchByCity from "../Activities/searchByCity";
import { getCityOptions } from "../api/getCityOptions";
import { getCategoryOptions } from "../api/getCategoryOptions";
import "./newPost.css";

function NewPost() {
  const [post, setPost] = useState({});
  const [charRemaining, setCharRemaining] = useState(0);
  const { categoryOptions, setCategoryOptions } = useContext(UserContext);
  const { cityOptions, setCityOptions } = useContext(UserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const postData = await instance.get("/activity/" + id);
        setPost(postData.data);
      }
    };
    fetchData();
    /* send Api request to get all uniq cities then stores them in cityOptions state.*/
    getCityOptions().then((cities) => {
      setCityOptions(cities);
    });

    /* send Api request to get all uniq categories then stores them in categoryOptions state.*/
    getCategoryOptions().then((categories) => {
      setCategoryOptions(categories);
    });
  }, [id]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    if (value !== "Categories") {
      setPost({ ...post, [id]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    id !== undefined
      ? instance.put("/activity/" + id, post).then(() => navigate("/activity/" + id))
      : instance.post("/activity/", post).then(() => navigate(`/activity/listings`));
  };

  const getBase64Update = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_) => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };

  const onchange = (event) => {
    let files = Array.from(event.target.files);
    files = files.map(async (file) => ({
      content: await getBase64Update(file),
      fileName: file.name,
      contentType: file.type,
      length: file.size,
    }));
    Promise.all(files).then((result) => setPost({ ...post, images: result }));
  };

  const cancelPost = () => {
    if (id) {
      navigate("/activity/" + id);
    } else {
      navigate("/");
    }
  };

  (() => {
    document.addEventListener("keyup", (event) => {
      if (event.target.matches(".count-chars")) {
        const value = event.target.value;
        const valueLength = value.length;

        const maxChars = parseInt(event.target.getAttribute("data-max-chars"));
        let remainingChars = maxChars - valueLength;

        if (valueLength > maxChars) {
          event.target.value = value.substr(0, maxChars);
          return;
        }
        setCharRemaining(remainingChars);
      }
    });
  })();

  return (
    <div className="container p-2 post">
      <h2>Post Your Favorite Activity</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-outline">
          <label className="form-label" htmlFor="name">
            {" "}
            Name :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="name"
            value={post.name || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="description">
            {" "}
            Description :
          </label>
          <textarea
            className="form-control form-control-sm count-chars"
            maxLength={500}
            data-max-chars={500}
            type="text"
            id="description"
            value={post.description || ""}
            onChange={handleTextChange}
            required
          />
          {post.description ? <p style={{ color: "red" }}>{`${charRemaining} / ${500} characters remaining`}</p> : null}
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="street_address">
            {" "}
            Street Address :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="street_address"
            value={post.street_address || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        {/* <div className="form-outline">
          <label className="form-label" htmlFor="city">
            {" "}
            City :
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="city"
            value={post.city || ""}
            onChange={handleTextChange}
            required
          />
        </div> */}

        <div className="form-outline">
          <label className="form-label" htmlFor="city">
            {" "}
            City :{" "}
          </label>
          <br></br>

          <SearchByCity handleCityChange={handleTextChange} cityOptions={cityOptions} id="City" />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="state">
            {" "}
            State :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="state"
            value={post.state || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        <div className="form-outline">
          <label className="form-label" htmlFor="zip_code">
            {" "}
            Zip Code :{" "}
          </label>
          <input
            className="form-control form-control-sm"
            type="text"
            id="zip_code"
            value={post.zip_code || ""}
            onChange={handleTextChange}
            required
          />
        </div>

        {!id && (
          <div className="form-outline">
            <label className="form-label" htmlFor="image">
              {" "}
              Image :{" "}
            </label>
            <input
              multiple
              className="form-control form-control-sm"
              type="file"
              id="image"
              onChange={onchange}
              required
            />
          </div>
        )}

        <div className="form-outline">
          <label className="form-label" htmlFor="category">
            {" "}
            Category :{" "}
          </label>
          <br></br>
          <SearchByCategory handleCategoryChange={handleTextChange} categoryOptions={categoryOptions} id="Category" />
        </div>

        <br />
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={cancelPost}>
          Cancel
        </button>
      </form>
    </div>
  );
}
export default NewPost;
