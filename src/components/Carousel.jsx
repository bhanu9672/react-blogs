import React from 'react';
import {
	Box,
	IconButton,
	useBreakpointValue,
	Stack,
	Heading,
	Text,
	Container,
	Button,
	Badge,
} from '@chakra-ui/react';
import { BiShare } from "react-icons/bi";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export default function Carousel() {

	const { articles } = useUserAuth();

	// As we have used custom buttons, we need a reference variable to
	// change the state
	const [slider, setSlider] = React.useState('');

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	const top = useBreakpointValue({ base: '90%', md: '50%' });
	const side = useBreakpointValue({ base: '30%', md: '40px' });

	return (
		<Box
			position={'relative'}
			height={'600px'}
			width={'full'}
			overflow={'hidden'}>
			{/* Left Icon */}
			<IconButton
				color={'black'}
				aria-label="left-arrow"
				variant="ghost"
				position="absolute"
				left={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickPrev()}>
				<BiLeftArrowAlt size="40px" style={{ 'background': "#EDF2F7", borderRadius: "100px" }} />
			</IconButton>
			{/* Right Icon */}
			<IconButton
				color={'black'}
				aria-label="right-arrow"
				variant="ghost"
				position="absolute"
				right={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickNext()}>
				<BiRightArrowAlt size="40px" style={{ 'background': "#EDF2F7", borderRadius: "100px" }} />
			</IconButton>
			{/* Slider */}
			<Slider {...settings} ref={(slider) => setSlider(slider)}>
				{
					articles.map(({
						id,
						title,
						description,
						imageUrl,
						createdAt,
						category,
						tag,
						createdBy,
					}) => (
						<Box
							key={id}
							height={'6xl'}
							position="relative"
							backgroundPosition="center"
							backgroundRepeat="no-repeat"
							backgroundSize="cover"
							backgroundImage={`url(${imageUrl})`}>
							{/* This is the block you need to change, to customize the caption */}
							<Container size="container.lg" height="600px" position="relative">
								<Stack
									spacing={6}
									w={'full'}
									maxW={'lg'}
									position="absolute"
									top="50%"
									transform="translate(0, -50%)">
									<Heading as='h2' size='2xl' color="white">
										{title}
									</Heading>
									<Text fontSize='3xl' color="white">
										{description}
									</Text>
									<Text fontSize={{ base: 'md', lg: 'lg' }} color="GrayText">
										<Badge ml='1' fontSize='0.9em' colorScheme='green' p={2}>
											By {createdBy}
										</Badge>
									</Text>
									<Link to={`/single-blog/${id}`}>
										<Button colorScheme='teal' size='md' leftIcon={<BiShare />}>
											Read More
										</Button>
									</Link>
								</Stack>
							</Container>
						</Box>
					))
				}
			</Slider>
		</Box>
	);
}