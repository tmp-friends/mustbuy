import { Text } from "@chakra-ui/react";
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
      <Text fontSize="md">@{name}</Text>
      <Text fontSize="xs" opacity="0.7" pb="4">
        検索結果を表示するまでに数秒かかることがあります
      </Text>
      {/* useEffectはレンダリングされたタイミングで実行されるので初期値がnullだとエラー */}
      {/* TODO: dataに型付けする */}
      {data?.tweets.map((value: any, index: number) => {
        return (
          <TwitterTweetEmbed key={index} tweetId={`${value.id}`}/>
        )
      })}
    </>
  )
}

export default TwitterUserName
