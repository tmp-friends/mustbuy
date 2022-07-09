import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { Fetcher } from "swr";

const TwitterUserName: NextPage = () => {
  const router = useRouter()
  const name = router.query.user_name

  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json())
  const { data } = useSWR(`/api/tweets?name=${name}`, fetcher)

  return (
    <>
      <Box>{name}</Box>
      <Box>{JSON.stringify(data, null, 2)}</Box>
    </>
  )
}

export default TwitterUserName
