import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import { HttpError } from "../../helpers/error";
import { tweets } from "../../components/twitter";

const TwitterUserName: NextPage = () => {
  const router = useRouter();
  const name = router.query.user_name ?? "";
  const keyword = router.query.keyword ?? "";

  const fetcher = async (url: string): Promise<any> => {
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) throw new HttpError({ status: res.status, message: "" });

    return res.json();
  };

  const { data, error } = useSWR(
    `/api/find-liked-tweets?name=${name}&keyword=${keyword}`,
    fetcher
  );

  // エラー表示
  if (error) {
    if (error.status === 404) {
      return <Text>Page not found</Text>;
    }

    if (error.status === 400) {
      return <Text>入力値エラーです</Text>;
    }

    if (error.status === 429) {
      return <Text>少し時間をおいてから再度実行してください</Text>;
    }

    return <Text>Failed to load</Text>;
  }

  // Loading表示
  if (!data) return <Text>Now Loading...</Text>;

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
