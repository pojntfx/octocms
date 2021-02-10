import { Octokit } from "@octokit/core";
import { Box, Button } from "rebass";
import { Textarea } from "@rebass/forms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  return (
    <Box>
      <Textarea value={contents} />

      <Button variant="primary" mt={2}>
        Save
      </Button>
    </Box>
  );
}

export default HomePage;
