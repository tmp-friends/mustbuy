import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Flex, FormControl, FormLabel, FormHelperText, Input } from "@chakra-ui/react";

const Home: NextPage = () => {
  const {
    handleSubmit,
    register,
  } = useForm()

  const router = useRouter()
  const onSubmit = (inputData :any) => {
    router.push(`/twitter/${inputData.name}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="name">TwitterのユーザIDを入力してください</FormLabel>
        <Input
          id="name"
          placeholder="temple_circle"
          {...register("name")}
        ></Input>
        <FormHelperText>※最新100件分のいいねツイートしか対象になりません</FormHelperText>
        <FormHelperText>※鍵アカウントの方はご利用できません</FormHelperText>
      </FormControl>

      <Flex justify="center">
        <Button
          mt={8}
          colorScheme="twitter"
          type="submit"
        >確認する</Button>
      </Flex>
    </form>
  )
}

export default Home
