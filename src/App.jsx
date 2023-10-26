import { useEffect, useState } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import "./styles.scss";
import UserInfo from "./components/UserInfo";

function App() {
  const [search, setSearch] = useState("erik-sig");
  const [userData, setUserData] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    setNotFoundError(false);
    fetchData(`https://api.github.com/users/${search}`);
  }, [isSubmited]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search === "") return;
    setIsSubmited(!isSubmited);
  };

  const fetchData = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        setNotFoundError(true);
      });
    setIsLoading(false);
  };

  return (
    <>
      <header>GITHUB API</header>
      <main>
        <div className='input-container'>
          <input
            type='text'
            name='input-rep'
            placeholder='Digte um usuário'
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <button onClick={handleSubmit}>
            <BiSearch></BiSearch>
          </button>
        </div>
        {isLoading === true ? (
          <div>CARREGANDO...</div>
        ) : notFoundError === true ? (
          <div className='error'>Not Found...</div>
        ) : (
          <UserInfo
            isSubmited={isSubmited}
            search={search}
            data={userData}
          ></UserInfo>
        )}
      </main>
    </>
  );
}

export default App;
