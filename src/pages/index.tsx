import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const { handleSubmit, register, reset } = useForm();

  const router = useRouter();
  const onSubmit = (inputData: any) => {
    router.push({
      pathname: `/twitter/${inputData.name}`,
      query: { keyword: inputData.keyword },
    });
    reset();
  };

  return (
    <Box pt={4} pb={10}>
      <Flex justify="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Box pb={6}>
              <FormLabel htmlFor="name">
                1. TwitterのユーザIDを入力してください
              </FormLabel>

              <InputGroup py={2}>
                <InputLeftAddon>@</InputLeftAddon>
                <Input
                  htmlSize={20}
                  width="auto"
                  id="name"
                  placeholder="temple_circle"
                  {...register("name")}
                />
              </InputGroup>
            </Box>

            <Box pb={4}>
              <FormLabel htmlFor="keyword">
                2. 検索したいタグを入力してください
              </FormLabel>

              <InputGroup py={2}>
                <InputLeftAddon>#</InputLeftAddon>
                <Input
                  htmlSize={20}
                  width="auto"
                  id="keyword"
                  placeholder="芸カ27"
                  {...register("keyword")}
                />
              </InputGroup>
            </Box>

            <FormHelperText>
              ※最新100件分のいいねツイートしか対象になりません
            </FormHelperText>

            <FormHelperText>※鍵アカウントの方はご利用できません</FormHelperText>
          </FormControl>

          <Flex justify="center">
            <Button mt={8} colorScheme="twitter" type="submit">
              確認する
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default Home;
