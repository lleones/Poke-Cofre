"use client";
import {
  Box,
  Center,
  Circle,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PAGES from "./constants/pages";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import useUserStore from "@/hooks/useUserStore";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { token, setToken } = useUserStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

      {isMounted && token && (
        <Flex
          flexDir="column"
          justifyContent="space-between"
          h="calc(100% - 130px)"
        >
          <VStack>
            {PAGES.map(({ title, path, icon }) => {
              const isOpened = pathname === path;

              return (
                <HStack
                  h="48px"
                  key={path}
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
                      <Text isTruncated>{title}</Text>
                    </>
                  )}
                </HStack>
              );
            })}
          </VStack>
          <HStack
            marginX="auto"
            h="48px"
            borderRadius="10px"
            width={!open ? "48px" : "calc(100% - 24px)"}
            _hover={{ bgColor: "rgba(0, 0, 0, 0.04)" }}
            fontSize={16}
            padding={open ? "16px" : "4px"}
            onClick={() => {
              setToken("");
              router.push("/login");
            }}
            cursor="pointer"
          >
            {!open ? (
              <Center w="full" h="full">
                <FontAwesomeIcon icon={faDoorOpen} />
              </Center>
            ) : (
              <>
                <FontAwesomeIcon icon={faDoorOpen} />
                <Text isTruncated>Logout</Text>
              </>
            )}
          </HStack>
        </Flex>
      )}
    </Box>
  );
};

export default Sidebar;
