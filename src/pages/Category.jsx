import React from 'react'
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, IconButton, Image, Button, Icon, Tag } from '@chakra-ui/react'
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { TimeIcon } from '@chakra-ui/icons';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { useUserAuth } from "../context/UserAuthContext";
import LikeArticle from '../components/LikeArticle';
import DeleteArticle from '../components/DeleteArticle';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AiOutlineHome } from "react-icons/ai";

const Category = () => {
    const { user, articles, category } = useUserAuth();
    const { id } = useParams();
    // ✅ Find multiple objects that satisfy condition
    const cat_articles = articles.filter(obj => {
        return obj.category === id;
    });
    console.log(cat_articles)
    return (
        <Box p={4}>
            <Box paddingBottom={4}>
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={'/'}>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'sm'}
                                    mr={4}
                                    leftIcon={<AiOutlineHome />}>
                                    Home
                                </Button>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Category
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>
                            {id}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <SimpleGrid columns={[1, null, 2]} spacing='40px' paddingY={4}>
                <div>
                    {
                        cat_articles.length === 0 ? (
                            <p>No articles found!</p>
                        ) : (
                            cat_articles.map(
                                ({
                                    id,
                                    title,
                                    description,
                                    imageUrl,
                                    createdAt,
                                    category,
                                    tag,
                                    createdBy,
                                    likes,
                                    userId,
                                }) => (
                                    <>
                                        <Card align='center' mb={10}>
                                            <Link to={`/single-blog/${id}`}>
                                                <Image
                                                    objectFit='cover'
                                                    src={imageUrl}
                                                    width={'100%'}
                                                    alt='Chakra UI'
                                                />
                                            </Link>
                                            <CardBody textAlign={"center"}>
                                                <Heading size='md'>{title}</Heading>
                                                <Tag size={'md'} variant="solid" colorScheme="orange" my={2}>
                                                    {tag}
                                                </Tag>
                                                <Text>
                                                    {description}
                                                </Text>
                                            </CardBody>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' paddingLeft={70} style={{ display: "inline-flex" }}>
                                                <Avatar name={createdBy} />
                                                <Box>
                                                    <Heading size='sm'>{createdBy}</Heading>
                                                </Box>
                                                <Box textAlign={'end'} paddingLeft={35}>
                                                    <Heading size='sm'>
                                                        <Icon as={TimeIcon} boxSize={5} margin={2} />
                                                        {createdAt.toDate().toDateString()}
                                                    </Heading>
                                                </Box>
                                                {user && user.uid === userId && (
                                                    <Box textAlign={'end'} paddingLeft={35}>
                                                        <DeleteArticle id={id} imageUrl={imageUrl} />
                                                    </Box>
                                                )}
                                            </Flex>
                                            <CardFooter
                                                justify='space-between'
                                                flexWrap='wrap'
                                                sx={{
                                                    '& > button': {
                                                        minW: '136px',
                                                    },
                                                }}
                                            >
                                                <Button flex='1' variant='ghost'>
                                                    {user && <LikeArticle id={id} likes={likes} />}
                                                    <Text> Likes {likes.length}</Text>
                                                </Button>
                                                <Link to={`/single-blog/${id}`}>
                                                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                                                        Read More
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    </>
                                )
                            )
                        )
                    }
                </div>
                <div>
                    <Sidebar />
                </div>
            </SimpleGrid>
        </Box>
    )
}

export default Category