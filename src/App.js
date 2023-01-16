import { useEffect, useState } from "react";
import backArrow from "./assets/back_icon.png";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterPosts, setfilterPosts] = useState([]);
  const [activatePost, setActivatePost] = useState(false);
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setPosts(json);
        setfilterPosts(json);
      });
  };

  const setSearch = (e) => {
    let string = e.target.value;
    setSearchString(string);
    if (string !== "") {
      const filterPost = posts.filter((item) => {
        return item.title.toLowerCase().indexOf(string) >= 0;
      });
      setfilterPosts(filterPost);
    } else {
      setfilterPosts(posts);
    }
  };

  const makeSinglePost = (data) => {
    setSinglePost(data);
    setActivatePost(true);
  };
  const getback = () => {
    setActivatePost(false);
    setSinglePost({});
  };
  return (
    <>
      {!activatePost ? (
        <div className="App">
          <div className="search-filter">
            <input
              placeholder="Search a post"
              className="search_input"
              onChange={setSearch}
              value={searchString}
            />
          </div>
          <div className="post-area">
            {filterPosts.length > 0 &&
              filterPosts.map((data, index) => (
                <div
                  className="post"
                  key={index}
                  onClick={(e) => makeSinglePost(data)}
                >
                  <div className="title">{data.title}</div>
                  <div className="body">{data.body}</div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="App">
          <div className="d-flex cursor-Pointer" onClick={getback}>
            <img src={backArrow} width={15} height={15} alt="back" />
            <div className="ml-2">Go Back</div>
          </div>
          <div className="post-area">
            <div className="post">
              <div className="title">{singlePost.title}</div>
              <div className="body">{singlePost.body}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
