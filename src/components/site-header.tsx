import { FC } from "react";
import { Flex, Link } from "@chakra-ui/react";

export const SiteHeader: FC = () => {
  return (
    <Flex as="header" shadow="md" p={3}>
      <Link
        href="/"
        fontSize="xl"
        fontWeight="semibold"
        _hover={{ textDecoration: "none" }}
      >
        MustBuy
      </Link>
    </Flex>
  );
};
