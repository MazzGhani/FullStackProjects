import "./post.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postInfo">
        <div className="postCats">
          <Link className="postCat" to={`/post/${post.categories}`}>
            <span className="postCat">{post.categories} </span>
          </Link>
        </div>
        <Link className="postTitle" to={`/post/${post._id}`}>
          <span className="postTitle">{post.topic} </span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString(0)}
        </span>
      </div>
      <p className="postDesc">{post.data}</p>
    </div>
  );
}
