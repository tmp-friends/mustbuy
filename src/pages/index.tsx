import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

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
        <FormLabel htmlFor="name">TwitterのUserIdを入力してください</FormLabel>
        <Input
          id="name"
          placeholder="temple_circle"
          {...register("name")}
        ></Input>
      </FormControl>

      <Button
        mt={4}
        colorScheme="teal"
        type="submit"
      >Submit</Button>
    </form>
  );
};

export default Home;
