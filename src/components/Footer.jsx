import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
	Button,
	Heading,
	Highlight,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import { AddIcon } from '@chakra-ui/icons';
import { AiOutlineHome, AiOutlineLogin, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";

const Logo = () => {
	return (
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
	);
};

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	const { user } = useUserAuth();
	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}>
			<Container
				as={Stack}
				maxW={'1xl'}
				py={10}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}>
				<Box>
					<Stack direction={'row'} spacing={6}>
						<Link to={'/'}><Logo /></Link>
					</Stack>
				</Box>
				<Box>
					<Stack direction={'row'} spacing={0}>
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
				<Stack direction={'row'} spacing={6}>
					<SocialButton label={'Twitter'} href={'#'}>
						<FaTwitter />
					</SocialButton>
					<SocialButton label={'YouTube'} href={'#'}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={'Instagram'} href={'#'}>
						<FaInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}