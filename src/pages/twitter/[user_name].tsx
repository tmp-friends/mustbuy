import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TwitterUserName: NextPage = () => {
  const router = useRouter()
  const name = router.query.user_name ?? ""

  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json())
  const { data, error } = useSWR(`/api/tweets?name=${name}`, fetcher)

  return (
    <>
      <Box>{name}</Box>
      {/* useEffectはレンダリングされたタイミングで実行されるので初期値がnullだとエラー */}
      {data?.tweets.map((value :any, key :number) => {
        {console.log(value, key)}
        return (
          <Box>
            <TwitterTweetEmbed tweetId={`${value.id}`}/>
          </Box>
        )
      })}
    </>
  )
}

export default TwitterUserName
