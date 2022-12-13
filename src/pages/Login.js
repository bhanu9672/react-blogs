import React, { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
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
import BreadcrumbSec from '../components/BreadcrumbSec'
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { logIn, googleSignIn } = useUserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(email, password);
			navigate("/profile");
		} catch (err) {
			setError(err.message);
		}
	};

	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate("/profile");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Box p={4}>
			<Box paddingBottom={4}>
				<BreadcrumbSec pageName={"Log In"} />
			</Box>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Log in to your account</Heading>
						<Text fontSize={'lg'} color={'gray.600'}>
							to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
						</Text>
					</Stack>
					{error && <Alert status='error'><AlertIcon />{error}</Alert>}
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}>
						<Stack spacing={4}>
							<FormControl id="email">
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>
							<Stack spacing={10}>
								<Button
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									onClick={handleSubmit}
								>
									Sign in
								</Button>
							</Stack>
							<Stack>
								<GoogleButton
									className="g-btn"
									type="dark"
									onClick={handleGoogleSignIn}
								/>
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Don't have an account ? <Link to={'/signup'} color={'blue.400'}> Sign Up </Link>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</Box>
	);
};

export default Login;
