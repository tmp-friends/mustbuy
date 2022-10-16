import { FC } from "react";
import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import { ContentWrapper } from "./ContentWrapper";

export const SiteHeader: FC = () => {
  return (
    <Flex as="header" shadow="md" p={3}>
      <Link href="/" passHref>
        <Text fontSize="xl" fontWeight="semibold">
          MustBuy
        </Text>
      </Link>
    </Flex>
  );
};
