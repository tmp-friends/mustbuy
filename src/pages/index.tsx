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
  const { handleSubmit, register } = useForm();

  const router = useRouter();
  const onSubmit = (inputData: any) => {
    router.push(`/twitter/${inputData.name}`);
  };

  return (
    <Box pt={4} pb={10}>
      <Flex justify="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="name">
              TwitterのユーザIDを入力してください
            </FormLabel>

            <InputGroup py={2}>
              <InputLeftAddon>@</InputLeftAddon>
              <Input
                htmlSize={20}
                width="auto"
                id="name"
                placeholder="user id"
                {...register("name")}
              />
            </InputGroup>

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
