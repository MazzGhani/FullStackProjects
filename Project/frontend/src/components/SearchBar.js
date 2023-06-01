import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SearchBar() {
  const [stringInput, setStringInput] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);
  const [leastLiked, setLeastLiked] = useState([]);
  const [leastPosts, setLeastPosts] = useState([]);
  const [mostPosts, setMostPosts] = useState([]);


  const [listUsers, setListUsers] = useState([]);
  const [userContent, setUserContent] = useState([]);

  const getSearchQuery = () => {
    const url = `http://localhost:31/search?stringInput=%${stringInput}%`;

    axios.get(url).then((response) => {
      console.log(response);
      setSearchresult(response.data[1]);
    });
  };

  const getMostLiked = () => {
    const url = `http://localhost:31/search/mostLiked`;

    axios.get(url).then((response) => {
      setMostLiked(response.data);
    });
  };

  const getLeastLiked = () => {
    const url = `http://localhost:31/search/leastLiked`;

    axios.get(url).then((response) => {
      setLeastLiked(response.data);
    });
  };

  const getLeastPosts = () => {
    const url = `http://localhost:31/search/leastPosts`;

    axios.get(url).then((response) => {
      setLeastPosts(response.data);
    });
  };

  const getMostPosts = () => {
    const url = `http://localhost:31/search/mostPosts`;

    axios.get(url).then((response) => {
      setMostPosts(response.data);
    });
  };


  useEffect(() => {
    const getListOfUsers = () => {
      const url = `http://localhost:31/auth/allusers`;
      axios.get(url).then((response) => {
        setListUsers(response.data[1]);
      });
    };

    getListOfUsers();
  }, []);

  const getUserContent = (username) => {
    const url = `http://localhost:31/search/content?username=${username}`;

    axios.get(url).then((response) => {
      setUserContent(response.data);
    });
  };

  return (
    <>
      <div className="vstack gap-5">
        <div>
          <Card.Title className="text-dark">
            <h1 className="display-3"> Search</h1>
          </Card.Title>

          <input
            type="text"
            value={stringInput}
            onChange={(e) => setStringInput(e.target.value)}
          />
          <Button variant="dark" color="dark" onClick={getSearchQuery}>
            {" "}
            Search
          </Button>
        </div>
        <div>
          <Card.Title className="text-dark">
            <h1 className="display-5"> Search Results</h1>
          </Card.Title>
          {searchResult.map((data) => (
            <Card
              key={data.id}
              style={{ color: "black", width: "50%" }}
              className="mx-auto"
            >
              <Card.Body>
                <Card.Title>{data.topic}</Card.Title>
                <Card.Text>{data.data}</Card.Text>
                <Card.Text>{data.channelName}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        {/* ////////////////////////////// */}

        <Button
          variant="primary"
          color="dark"
          onClick={getMostLiked}
          className="mx-auto"
          style={{ width: "10%" }}
        >
          {" "}
          Most Liked Post
        </Button>
        {mostLiked.map((result) => (
          <Card
            key={result.id}
            style={{ color: "black", width: "50%" }}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title> Username: {result.username}</Card.Title>
              <Card.Text>{result.topic}</Card.Text>
              <Card.Text>{result.data}</Card.Text>
              <Card.Text>ChannelName: {result.channelName}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        {/* ////////////////////////////// */}
        {/* ////////////////////////////// */}
        <Button
          variant="dark"
          color="dark"
          onClick={getLeastLiked}
          className="mx-auto"
          style={{ width: "10%" }}
        >
          {" "}
          Least Liked Post
        </Button>
        {leastLiked.map((result) => (
          <Card
            key={result.id}
            style={{ color: "black", width: "50%" }}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title> Username: {result.username}</Card.Title>
              <Card.Text>{result.topic}</Card.Text>
              <Card.Text>{result.data}</Card.Text>
              <Card.Text>ChannelName: {result.channelName}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        {/* ////////////////////////////// */}
        {/* ////////////////////////////// */}

        <Button
          variant="dark"
          color="dark"
          onClick={getLeastPosts}
          className="mx-auto"
          style={{ width: "10%" }}
        >
          {" "}
          Least Posts
        </Button>
        {leastPosts.map((result) => (
          <Card
            key={result.id}
            style={{ color: "black", width: "50%" }}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title> User with Least Posts: {result.username}</Card.Title>
            </Card.Body>
          </Card>
        ))}
        {/* ////////////////////////////// */}
                {/* ////////////////////////////// */}

                <Button
          variant="primary"
          color="dark"
          onClick={getMostPosts}
          className="mx-auto"
          style={{ width: "10%" }}
        >
          {" "}
          Most Posts
        </Button>
        {mostPosts.map((result) => (
          <Card
            key={result.id}
            style={{ color: "black", width: "50%" }}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title> User with Most Posts: {result.username}</Card.Title>
            </Card.Body>
          </Card>
        ))}
        {/* ////////////////////////////// */}

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select User
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {listUsers.map((data) => (
              <Dropdown.Item key={data.id}>
                <button
                  onClick={() => {
                    getUserContent(data.username);
                  }}
                >
                  {data.username}{" "}
                </button>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ color: "black" }}>
          {" "}
          <h1>User's content:</h1>
        </div>
        {userContent.map((data) => (
          <Card
            key={data.id}
            style={{ color: "black", width: "50%" }}
            className="mx-auto"
          >
            <Card.Body>
              <Card.Title>{data.topic}</Card.Title>
              <Card.Text>{data.data}</Card.Text>
              <Card.Text>Username: {data.username}</Card.Text>
              <Card.Text>ChannelName: {data.channelName}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <br />
      </div>
    </>
  );
}

export default SearchBar;
