import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { Fetcher } from "swr";

const TwitterUserName: NextPage = () => {
  const router = useRouter()
  const { userName } = router.query
  const name = typeof userName === "string" ?? ""

  const fetcher:Fetcher<Array<string>> = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR('/api/tweets', fetcher)

  return (
    <>
      <Box>{userName}</Box>
      <Box>{JSON.stringify(data, null, 2)}</Box>
    </>
  )
}

export default TwitterUserName
