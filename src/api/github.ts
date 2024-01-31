import axios from "axios";

const baseUrl = "https://api.github.com/";
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export type Release = {
  name: string;
  tag_name: string;
  html_url: string;
  assets: {
    name: string;
    download_count: number;
    browser_download_url: string;
  }[];
};

export async function fetchLatestRelease(
  user: string,
  repo: string
): Promise<Release> {
  const response = await axios.get(
    new URL(`/repos/${user}/${repo}/releases/latest`, baseUrl).toString(),
    {
      headers,
      responseType: "json",
      timeout: 5000,
    }
  );

  return response.data as Release;
}

export async function fetchTotalDownloads(
  user: string,
  repo: string
): Promise<bigint> {
  const response = await axios.get(
    new URL(`/repos/${user}/${repo}/releases`, baseUrl).toString(),
    {
      headers,
      responseType: "json",
      timeout: 10000,
      params: {
        per_page: 20,
        page: 1,
      },
    }
  );

  const releases = response.data as Release[];
  let count = BigInt(0);
  for (var i = 0; i < releases.length; ++i) {
    for (var j = 0; j < releases[i].assets.length; ++j) {
      count += BigInt(releases[i].assets[j].download_count);
    }
  }

  return count;
}
