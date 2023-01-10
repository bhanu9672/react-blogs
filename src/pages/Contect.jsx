import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react';
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdCall,
    MdMessage,
} from 'react-icons/md';
import { FaFacebook, FaGithub, FaTwitter, FaUserCircle, FaLinkedin } from "react-icons/fa";
import BreadcrumbSec from '../components/BreadcrumbSec'

export default function Contect() {
    return (
        <Box>
            <Box p={4}>
                <BreadcrumbSec pageName={"Contact"} />
            </Box>
            <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box
                        bg="#02054B"
                        color="white"
                        borderRadius="lg"
                        m={{ sm: 4, md: 16, lg: 10 }}
                        p={{ sm: 5, md: 5, lg: 16 }}>
                        <Box p={4}>
                            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                <WrapItem>
                                    <Box>
                                        <Heading>Contact</Heading>
                                        <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                            Fill up the form below to contact
                                        </Text>
                                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                            <VStack pl={0} spacing={3} alignItems="flex-start">
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                                                    +91-8619804757
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                                    demo@gmail.com
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                                                    Kota,Rajasthan, India
                                                </Button>
                                            </VStack>
                                        </Box>
                                        <HStack
                                            mt={{ lg: 10, md: 10 }}
                                            spacing={5}
                                            px={5}
                                            alignItems="flex-start">
                                            <a href='https://www.linkedin.com/in/bhanu9672/' target="_blank">
                                                <IconButton
                                                    aria-label="linkedinin"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<FaLinkedin size="36px" />}
                                                />
                                            </a>
                                            <a href='https://github.com/bhanu9672' target="_blank">
                                                <IconButton
                                                    aria-label="Github"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<FaGithub size="36px" />}
                                                />
                                            </a>
                                        </HStack>
                                    </Box>
                                </WrapItem>
                                <WrapItem>
                                    <Box bg="white" borderRadius="lg">
                                        <Box m={8} color="#0B0E3F">
                                            <VStack spacing={5}>
                                                <FormControl id="name">
                                                    <FormLabel>Your Name</FormLabel>
                                                    <InputGroup borderColor="#E0E1E7">
                                                        <InputLeftElement
                                                            pointerEvents="none"
                                                            children={<FaUserCircle color="gray.800" />}
                                                        />
                                                        <Input type="text" size="md" placeholder="Enter Name" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Mail</FormLabel>
                                                    <InputGroup borderColor="#E0E1E7">
                                                        <InputLeftElement
                                                            pointerEvents="none"
                                                            children={<MdEmail color="gray.800" />}
                                                        />
                                                        <Input type="text" size="md" placeholder="Enter Mail" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Message</FormLabel>
                                                    <Textarea
                                                        borderColor="gray.300"
                                                        _hover={{
                                                            borderRadius: 'gray.300',
                                                        }}
                                                        placeholder="Enter Message"
                                                    />
                                                </FormControl>
                                                <FormControl id="name" float="right">
                                                    <Button
                                                        leftIcon={<MdMessage />}
                                                        variant="solid"
                                                        bg="#0D74FF"
                                                        color="white"
                                                        _hover={{}}>
                                                        Send Message
                                                    </Button>
                                                </FormControl>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem>
                            </Wrap>
                        </Box>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}