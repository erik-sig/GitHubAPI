import React from "react";

const ShowRepos = ({ currentPage, repos }) => {
  return (
    <div>
      {repos[currentPage - 1]?.map((repo) => (
        <a target='blank' key={repo.id} href={repo.html_url}>
          {repo.name.substring(0, 19)}
        </a>
      ))}
    </div>
  );
};

export default ShowRepos;
