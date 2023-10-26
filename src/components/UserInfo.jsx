import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowRepos from "./ShowRepos";
import Button from "./Button";

const UserInfo = ({ isSubmited, search, data }) => {
  const [userRepos, setUserRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = (url) => {
    axios.get(url).then((response) => {
      setUserRepos(() => {
        const pagesLength = Math.ceil(response.data.length / 5);

        let reposArray = [];
        let min = 0;
        let max = 5;
        for (let i = 0; i < pagesLength; i++) {
          reposArray[i] = response.data.slice(min, max);
          min += 5;
          max += 5;
        }
        return reposArray;
      });
    });
  };

  useEffect(() => {
    fetchData(`https://api.github.com/users/${search}/repos`);
    setCurrentPage(1);
  }, [isSubmited]);

  const handlePage = (e) => {
    setCurrentPage(e.target.textContent);
  };

  return (
    <section>
      <div className='content-section'>
        <img src={data.avatar_url} />
        <div className='content-user'>
          <h1>{data.name}</h1>
          <h2>Repositories</h2>
          <ShowRepos currentPage={currentPage} repos={userRepos}></ShowRepos>
        </div>
      </div>
      <div className='page-btns'>
        {userRepos.map((item, index) => (
          <Button
            key={index}
            index={index}
            handlePage={handlePage}
            currentPage={currentPage}
          ></Button>
        ))}
      </div>
    </section>
  );
};

export default UserInfo;
