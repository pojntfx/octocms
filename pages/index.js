import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { useRouter } from "next/router";

function HomePage() {
  const [contents, setContents] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (router.query.owner && router.query.repo && router.query.path) {
      const octokit = new Octokit();

      const contents = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: router.query.owner,
          repo: router.query.repo,
          path: router.query.path,
        }
      );

      setContents(atob(contents.data.content));
    }
  }, [router.query]);

  return <textarea value={contents}></textarea>;
}

export default HomePage;
