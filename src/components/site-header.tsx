import { FC } from "react";
import { Box, Flex, Link, Heading } from "@chakra-ui/react";

export const SiteHeader: FC = () => {
  return (
    <Box py={6}>
      <Flex
        as="header"
        shadow="md"
        p={3}
        position="fixed"
        top="0"
        width="100%"
        background="whiteAlpha.600"
      >
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Heading as="h1" fontSize="xl" fontWeight="bold">
            MustBuy
          </Heading>
        </Link>
      </Flex>
    </Box>
  );
};
