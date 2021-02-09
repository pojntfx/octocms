import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

function HomePage() {
  const [contents, setContents] = useState("");

  useEffect(async () => {
    const octokit = new Octokit();

    const contents = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "pojntfx",
        repo: "family-site",
        path: "src/constants.json",
      }
    );

    setContents(atob(contents.data.content));
  }, []);

  return <textarea value={contents}></textarea>;
}

export default HomePage;
