import React from "react";
import {
	Flex,
	Heading,
	Stack,
	useColorModeValue,
	Avatar,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from '@chakra-ui/react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import BreadcrumbSec from '../components/BreadcrumbSec'
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";

const Profile = () => {
	const { logOut, user, articles, comments } = useUserAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};
	console.log(user)
	console.log(articles)
	console.log(user.uid)
	// ✅ Find multiple objects that satisfy condition
	const singleArticles = articles.filter(obj => {
		return obj.userId == user.uid;
	});
	console.log(singleArticles)
	// ✅ Find multiple objects that satisfy condition
	const singleComments = comments.filter(obj => {
		return obj.userId == user.uid;
	});
	console.log(singleComments)

	return (
		<Box p={4}>
			<BreadcrumbSec pageName={"Profile"} />
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack>
					<Card maxW='md'>
						<CardHeader>
							<Heading textAlign={'center'} pb={10} as='h3' size='lg'>User Profile</Heading>
							<Flex spacing='4'>
								<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
									<Avatar name={user.displayName} />
									<Box>
										<Heading size='sm'>{user && user.displayName}</Heading>
										<Text>{user && user.email}</Text>
									</Box>
									<Button
										variant="solid"
										bg="#0D74FF"
										color="white"
										_hover={{}}
										onClick={handleLogout}
									>
										Log out
									</Button>
								</Flex>
							</Flex>
						</CardHeader>
						<CardBody>
							<Text>
								With Chakra UI, I wanted to sync the speed of development with the speed
								of design. I wanted the developer to be just as excited as the designer to
								create a screen.
							</Text>
						</CardBody>
						<CardFooter
							justify='space-between'
							flexWrap='wrap'
							sx={{
								'& > button': {
									minW: '136px',
								},
							}}
						>
							<Button flex='1' variant='ghost' leftIcon={<BiChat />}>
								Comment
								{
									articles.length != null ?
										<><Text px={2}> {singleComments.length} </Text></>
										:
										<><Text px={2}> 0 </Text></>
								}

							</Button>
							<Button flex='1' variant='ghost' leftIcon={<FaBlogger />}>
								Total Blog
								{
									articles.length != null ?
										<><Text px={2}> {singleArticles.length} </Text></>
										:
										<><Text px={2}> 0 </Text></>
								}
							</Button>
						</CardFooter>
					</Card>
				</Stack>
			</Flex>
		</Box>
	);
};

export default Profile;
