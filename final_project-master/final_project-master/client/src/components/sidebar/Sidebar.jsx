import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

// from https://mui.com/components/material-icons/
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/posts");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">HOW YOU CAN HELP</span>
        <img
          src="https://28lmum2vtojcme2sq2p5zblo-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/4-unexpected-benefits-of-volunteering-2-804x452.jpg"
          alt=""
        />
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">WHO'S BEEN HELPED?</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.categories}`} className="link">
              <li className="sidebarListItem">{c.categories}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle"> FOLLOW US</span>
        <div className="sidebarSocial">
          <FacebookIcon className="top_icon" />
          <TwitterIcon className="top_icon" />
          <InstagramIcon className="top_icon" />
          <GitHubIcon className="top_icon" />
        </div>
      </div>
    </div>
  );
}
