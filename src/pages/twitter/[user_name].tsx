import { Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import { tweets } from "../../components/twitter";

const TwitterUserName: NextPage = () => {
  const router = useRouter();
  const name = router.query.user_name ?? "";

  const fetcher = (url: string): Promise<any> =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `/api/find-liked-tweets?name=${name}`,
    fetcher
  );

  if (error) return <Box>Failed to load</Box>;
  if (!data) return <Box>Now Loading...</Box>;
  console.log(data);

  return (
    <>
      <Text fontSize="md" fontWeight="hairline" pb={4}>
        Results @{name}
      </Text>
      {tweets(data.tweets)}
    </>
  );
};

export default TwitterUserName;
