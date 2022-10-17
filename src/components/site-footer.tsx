import { FC } from "react";
import { Box, Divider, Flex, Link } from "@chakra-ui/react";

export const SiteFooter: FC = () => {
  return (
    <Box>
      <Divider size="xl" pb={2} />
      <Flex as="footer" pt={4} justify="center" height="10vh">
        <Link
          href="https://twitter.com/temple_circle"
          textColor="gray.500"
          _hover={{ textDecoration: "none" }}
        >
          <Box>©komekami</Box>
        </Link>
      </Flex>
    </Box>
  );
};
