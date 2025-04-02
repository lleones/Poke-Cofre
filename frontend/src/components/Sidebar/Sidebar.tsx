"use client";
import { Box, Center, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import PAGES from "./constants/pages";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box
      h="full"
      w={open ? "220px" : "72px"}
      bg="white"
      borderRight="1px solid rgba(0, 0, 0, 0.12)"
      color="#BCBCBC"
    >
      <Center>
        <HStack
          direction="row"
          alignItems="center"
          paddingY="36px"
          onClick={() => {
            setOpen(!open);
          }}
          fontWeight="bold"
          gap={3}
        >
          <Circle bgColor="#5671A6" size="36px" color="white">
            P
          </Circle>
          {open && <Text>PokéCofre</Text>}
        </HStack>
      </Center>

      <VStack>
        {PAGES.map(({ title, path, icon }) => {
          const isOpened = pathname === path;

          return (
            <HStack
              h="48px"
              key={path}
              // disablePadding
              boxShadow={isOpened ? "6px 10px 30px #0000000F" : ""}
              borderRadius="10px"
              width={!open ? "48px" : "calc(100% - 24px)"}
              margin="auto"
              _hover={{ bgColor: "rgba(0, 0, 0, 0.04)" }}
              fontSize={16}
              padding={open ? "16px" : "4px"}
              onClick={() => router.push(path)}
              cursor="pointer"
              fontWeight={isOpened ? "bold" : ""}
              color={isOpened ? "#5671A6" : "inherit"}
            >
              {!open ? (
                <Center w="full" h="full">
                  <FontAwesomeIcon icon={icon} />
                </Center>
              ) : (
                <>
                  <FontAwesomeIcon icon={icon} />
                  <Text truncate>{title}</Text>
                </>
              )}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
