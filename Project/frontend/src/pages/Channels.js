import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./css/channels.css";
import ShowChannels from "../components/ShowChannels";
import TopBar from "../components/TopBar";

function Channels() {
  const date = new Date("YYYY-MM-DD");
  const [channelData, setChannelData] = useState([]);
  const [channelName, setChannelName] = useState("");
  const isLoggedIn = localStorage.getItem("userId");
  const [removeChannel, setRemoveChannel] = useState("");

  const getChanels = async () => {
    await axios.get("http://localhost:31/channels").then((response) => {
      setChannelData(response.data[1]);
    });
  };

  useEffect(() => {
    getChanels();
  }, []);

  const createChannel = () => {
    const url = "http://localhost:31/channels/";
    const params = new URLSearchParams();
    params.append("channelName", channelName);
    params.append("date", date);
    axios.post(url, params).then(()=>{
      getChanels();
    })
  };

  const deleteChannel = () => {
    const url = `http://localhost:31/channels?removeChannel=${removeChannel}`;
    axios.delete(url).then((response) => {
      getChanels();
    })
  };

  return (
    <div>
            <TopBar />

      <div>
        <h1>Channels</h1>
        {isLoggedIn ? (
          <>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button onClick={createChannel}> Create Channel</button>

            {isLoggedIn === "1" ? (
              <>
              <div style={{color:"black"}}>Enter ID to Delete Channel</div>
                <input
                  type="text"
                  value={removeChannel}
                  onChange={(e) => setRemoveChannel(e.target.value)}
                />
                <button onClick={deleteChannel}> Delete Channel</button>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="container">
          <h1 style={{ color: "black" }}>Channels </h1>
          <div>
            {channelData.map((data) => (
              <div key={data.id}>
                <ShowChannels data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channels;
