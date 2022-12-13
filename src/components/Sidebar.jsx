import React from 'react'
import {
    Box,
    Stack,
    Flex,
    Heading,
    Text,
    StackDivider,
    Tag,
    Avatar,
    Button,
} from '@chakra-ui/react'
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from 'react-router-dom';
import { BiShare } from "react-icons/bi";

const Sidebar = () => {
    const { category, articles, comments } = useUserAuth();
    return (
        <div>
            <>
                <Box p={5} shadow='md' borderWidth='1px' marginBottom={10}>
                    <Heading fontSize='xl'>Categories</Heading>
                    {
                        category.map(({ id, title }) =>
                            <Box key={id}>
                                <Link to={`/category/${title}`}>
                                    <Text mt={4} >{title}</Text>
                                </Link>
                                <Text shadow='md' borderWidth='1px' marginTop={2}></Text>
                            </Box>
                        )
                    }
                </Box>
            </>
            <>
                <Box p={5} shadow='md' borderWidth='1px' marginBottom={10}>
                    <Heading fontSize='xl' paddingY={15}>Tranding Posts</Heading>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            articles.length === 0 ? (
                                <p>No articles found!</p>
                            ) : (
                                articles.slice(0, 5).map(
                                    ({
                                        id,
                                        title,
                                        createdAt,
                                        createdBy,
                                    }) => (
                                        <Box key={id}>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name={createdBy} />
                                                <Box>
                                                    <Heading size='sm'>{createdBy}</Heading>
                                                    <Text>{createdAt.toDate().toDateString()}</Text>
                                                </Box>
                                            </Flex>
                                            <Text pt={3}>
                                                {title}
                                            </Text>
                                        </Box>
                                    )
                                )
                            )
                        }
                    </Stack>
                </Box>
            </>
            <>
                <Box p={5} shadow='md' borderWidth='1px' marginBottom={10}>
                    <Heading fontSize='xl' paddingY={15}>Comments</Heading>
                    <Stack divider={<StackDivider />} spacing='4'>
                        {
                            comments.length === 0 ? (
                                <p>No comments found!</p>
                            ) : (
                                comments.slice(0, 5).map(
                                    ({
                                        id,
                                        title,
                                        createdAt,
                                        createdBy,
                                        comment,
                                    }) => (
                                        <Box key={id}>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name={createdBy} />
                                                <Box>
                                                    <Heading size='sm'>{createdBy}</Heading>
                                                    <Text>{createdAt.toDate().toDateString()}</Text>
                                                </Box>
                                            </Flex>
                                            <Text pt={3}>
                                                {title}
                                            </Text>
                                            <Text pt={3}>
                                                {comment}
                                            </Text>
                                        </Box>
                                    )
                                )
                            )
                        }
                    </Stack>
                </Box>
            </>
        </div>
    )
}

export default Sidebar