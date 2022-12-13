import React, { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import BreadcrumbSec from '../components/BreadcrumbSec'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const { signUp } = useUserAuth();
	const [name, setName] = useState("");
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			//await signUp(email, password);
			await createUserWithEmailAndPassword(auth, email, password);
			updateProfile(auth.currentUser, { displayName: name });
			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<Box p={4}>
			<Box paddingBottom={4}>
				<BreadcrumbSec pageName={"Sign up"} />
			</Box>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'} textAlign={'center'}>
							Sign up to your account
						</Heading>
						<Text fontSize={'lg'} color={'gray.600'}>
							to enjoy all of our cool features ✌️
						</Text>
					</Stack>
					{error && <Alert status='error'><AlertIcon />{error}</Alert>}
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}>
						<Stack spacing={4}>
							<FormControl id="email" isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									placeholder="Enter your name"
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</FormControl>
							<FormControl id="email" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									placeholder="Email address"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputRightElement h={'full'}>
										<Button
											variant={'ghost'}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									onClick={handleSubmit}
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Already a user? <Link to={'/login'} color={'blue.400'}>Login</Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</Box>
	);
};

export default SignUp;
