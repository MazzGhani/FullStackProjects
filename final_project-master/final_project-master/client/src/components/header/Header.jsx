import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">CMPT 353</span>
        <span className="headerTitleBg"> Welcome </span>
      </div>
      {/*Settings logo (usask profile pic)  */}
      <img
        className="headerImg"
        src="https://www.circleofcare.com/wp-content/uploads/2019/03/group-people-with-their-hands-together-web.jpg"
        alt=""
      />
    </div>
  );
}
