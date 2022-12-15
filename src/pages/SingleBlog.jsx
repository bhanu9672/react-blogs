import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    SimpleGrid,
    Stack,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Image,
    Button,
    Icon,
    Heading,
    Text,
    Divider,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Tag,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { TimeIcon } from '@chakra-ui/icons';
import Sidebar from '../components/Sidebar';
import { doc, onSnapshot, Timestamp, collection, addDoc, query, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/UserAuthContext";
import LikeArticle from '../components/LikeArticle';
import { AiOutlineHome, AiOutlineLogin, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";

const SingleBlog = () => {
    const { user, comments } = useUserAuth(auth);
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    useEffect(() => {
        const docRef = doc(db, "Articles", id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id });
        });
    }, []);

    const [commentData, setCommentData] = useState({
        blogId: id,
        title: "",
        comment: "",
        createdAt: "",
        createdBy: "",
        userId: "",
    });

    const handleChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    };

    const handlePublish = () => {
        if (!commentData.title || !commentData.description) {
            toast("Please fill all the fields.", { type: "error" });
            return;
        }

        const articleRef = collection(db, "comments");
        addDoc(articleRef, {
            blogId: id,
            title: commentData.title,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            comment: commentData.description,
        })
            .then(() => {
                toast("Comment added successfully", { type: "success" });
                setCommentData("");
            })
            .catch((err) => {
                toast("Error adding Comment", { type: "error" });
            });
    };
    console.log(comments)

    // ✅ Find multiple objects that satisfy condition
    const singleComments = comments.filter(obj => {
        return obj.blogId == id;
    });
    console.log(singleComments)

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
                        <BreadcrumbLink><Link to={'/blogs'}> Blogs </Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>
                            {article && article.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <SimpleGrid columns={[1, null, 2]} spacing='40px'>
                <div>
                    <Card maxW='l00' textAlign={'center'}>
                        {
                            article && (
                                <>
                                    <CardBody>
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            borderRadius='lg'
                                            style={{ width: "100%", height: "350px" }}
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size='md'>{article.title}</Heading>
                                            <Text>
                                                {article.description}
                                            </Text>
                                        </Stack>
                                        <Box>
                                            <Tag size={`lg`} variant='solid' colorScheme='teal' paddingY={2} paddingX={2} margin={2}>
                                                {article.tag}
                                            </Tag>
                                        </Box>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' paddingLeft={100} paddingTop={10}>
                                            <Avatar name={article.createdBy} />
                                            <Box>
                                                <Heading size='sm'>{article.createdBy}</Heading>
                                            </Box>
                                            <Box>
                                                <Heading size='sm' textAlign={'end'} paddingLeft={35}>
                                                    <Icon as={TimeIcon} boxSize={5} margin={2} />
                                                    {article.createdAt.toDate().toDateString()}
                                                </Heading>
                                            </Box>
                                        </Flex>
                                    </CardBody>
                                    <Divider />
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
                                            {user && <LikeArticle id={id} likes={article.likes} />}
                                            <Text> Likes {article.likes.length}</Text>
                                        </Button>
                                        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                                            Comment
                                            {
                                                singleComments.length == null ?
                                                    <>
                                                        <Text px={2}> 0 </Text>
                                                    </>
                                                    :
                                                    <>
                                                        <Text px={2}>{singleComments.length}</Text>
                                                    </>
                                            }
                                        </Button>
                                        <Link to={`/blogs`}>
                                            <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                                                Back To Blogs
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </>
                            )
                        }
                        {article && comments !== null && singleComments != 0 && <Text>Comment List</Text>}
                        {
                            article &&
                            comments !== null &&
                            singleComments.map(
                                ({
                                    id,
                                    title,
                                    comment,
                                    createdAt,
                                    createdBy,
                                    blogId,
                                }) => (
                                    <>
                                        <Stack
                                            margin={18}
                                            direction={{ base: 'column', md: 'row' }}
                                            spacing={{ base: 10, md: 4, lg: 10 }}>
                                            <Box minW={"100%"} maxW={"100%"}>
                                                <Stack
                                                    //bg={useColorModeValue('white', 'gray.800')}
                                                    boxShadow={'lg'}
                                                    p={8}
                                                    rounded={'xl'}
                                                    align={'center'}
                                                    pos={'relative'}
                                                    _after={{
                                                        content: `""`,
                                                        w: 0,
                                                        h: 0,
                                                        borderLeft: 'solid transparent',
                                                        borderLeftWidth: 16,
                                                        borderRight: 'solid transparent',
                                                        borderRightWidth: 16,
                                                        borderTop: 'solid',
                                                        borderTopWidth: 16,
                                                        // borderTopColor: useColorModeValue('white', 'gray.800'),
                                                        pos: 'absolute',
                                                        bottom: '-16px',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                    }}>
                                                    <Heading as={'h3'} fontSize={'xl'}>
                                                        {title}
                                                    </Heading>
                                                    <Text
                                                        textAlign={'center'}
                                                        //color={useColorModeValue('gray.600', 'gray.400')}
                                                        fontSize={'sm'}>
                                                        {comment}
                                                    </Text>
                                                </Stack>
                                                <Flex align={'center'} mt={8} direction={'column'}>
                                                    <Avatar name={createdBy} mb={2} />
                                                    <Stack spacing={-1} align={'center'}>
                                                        <Text fontWeight={600}>{createdBy}</Text>
                                                    </Stack>
                                                </Flex>
                                            </Box>
                                        </Stack>
                                    </>
                                )
                            )
                        }
                        {
                            user &&
                            <>
                                <Flex
                                    minH={'100vh'}
                                    align={'center'}
                                    justify={'center'}
                                //bg={useColorModeValue('gray.50', 'gray.800')}
                                >
                                    <Stack
                                        spacing={4}
                                        w={'full'}
                                        maxW={'md'}
                                        //bg={useColorModeValue('white', 'gray.700')}
                                        rounded={'xl'}
                                        boxShadow={'lg'}
                                        p={6}
                                        my={12}>
                                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                                            Add Comment
                                        </Heading>
                                        <FormControl id="title" isRequired>
                                            <FormLabel>Comment Title</FormLabel>
                                            <Input
                                                placeholder="Enter Comment Title"
                                                _placeholder={{ color: 'gray.500' }}
                                                type="text"
                                                name="title"
                                                value={commentData.title}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                        <FormControl id="description" isRequired>
                                            <FormLabel>Comment Description</FormLabel>
                                            <Textarea
                                                placeholder='Enter Comment Description'
                                                name="description"
                                                value={commentData.description}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </FormControl>
                                        <Stack spacing={6}>
                                            <Button
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}
                                                onClick={handlePublish}
                                            >
                                                Add Comment
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Flex>
                            </>
                        }
                    </Card>
                </div>
                <div>
                    <Sidebar />
                </div>
            </SimpleGrid>
        </Box>
    )
}

export default SingleBlog