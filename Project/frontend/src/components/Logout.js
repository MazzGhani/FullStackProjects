import axios from "axios";

export const logout = () => {
    const url = "http://localhost:31/auth/logout";
    axios
      .post(url)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.clear();
    window.location.reload();
    console.log("Logged Out!");
  };