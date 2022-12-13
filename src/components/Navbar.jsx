import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    MenuGroup,
    Highlight,
    Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Link } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import { AiOutlineHome, AiOutlineLogin, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";

const Links = ['Home', 'Blogs', 'Create'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUserAuth();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link to={'/'}>
                                <Heading as='h4' size='md'>
                                    <Highlight
                                        query={['React Blogs', 'emphasize', 'Accentuate']}
                                        styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
                                    >
                                        React Blogs
                                    </Highlight>
                                </Heading>
                            </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {/* {Links.map((link) => (
                                <NavLink key={link}>
                                    <Link>{link}</Link>
                                </NavLink>
                            ))} */}
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
                            <Link to={'/blogs'}>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'sm'}
                                    mr={4}
                                    leftIcon={<FaBlogger />}>
                                    Blogs
                                </Button>
                            </Link>
                            <Link to={'/contact'}>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'sm'}
                                    mr={4}
                                    leftIcon={<AiOutlinePhone />}>
                                    Contact
                                </Button>
                            </Link>
                            {
                                user &&
                                <>
                                    <Link to={'/create'}>
                                        <Button
                                            variant={'solid'}
                                            colorScheme={'teal'}
                                            size={'sm'}
                                            mr={4}
                                            leftIcon={<AddIcon />}>
                                            Add Blog
                                        </Button>
                                    </Link>
                                </>
                            }
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {
                            user ?
                                <>
                                    <Link to={'/profile'}>
                                        <Button leftIcon={<AiOutlineUser />} colorScheme='teal' variant='solid' size={'sm'}>
                                            Profile
                                        </Button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to={'/login'}>
                                        <Button leftIcon={<AiOutlineLogin />} colorScheme='teal' variant='solid' size={'sm'}>
                                            LogIn
                                        </Button>
                                    </Link>
                                </>
                        }
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {/* {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))} */}
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
                            <Link to={'/blogs'}>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'sm'}
                                    mr={4}
                                    leftIcon={<FaBlogger />}>
                                    Blogs
                                </Button>
                            </Link>
                            <Link to={'/contact'}>
                                <Button
                                    variant={'solid'}
                                    colorScheme={'teal'}
                                    size={'sm'}
                                    mr={4}
                                    leftIcon={<AiOutlinePhone />}>
                                    Contact
                                </Button>
                            </Link>
                            {
                                user &&
                                <>
                                    <Link to={'/create'}>
                                        <Button
                                            variant={'solid'}
                                            colorScheme={'teal'}
                                            size={'sm'}
                                            mr={4}
                                            leftIcon={<AddIcon />}>
                                            Add Blog
                                        </Button>
                                    </Link>
                                </>
                            }
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

export default Navbar
