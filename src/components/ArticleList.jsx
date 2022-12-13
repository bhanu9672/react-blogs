import React from 'react'
import {
	Box,
	Heading,
	Image,
	Text,
	Divider,
	HStack,
	Tag,
	Wrap,
	WrapItem,
	Button,
	Avatar,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { BiShare } from "react-icons/bi";
import { useUserAuth } from "../context/UserAuthContext";
import DeleteArticle from './DeleteArticle';

const ArticleList = () => {
	const { articles, user } = useUserAuth();
	return (
		<Box>
			<Heading as="h2">
				Latest Blogs
			</Heading>
			<Divider marginTop="5" />
			<Wrap spacing="30px">
				{
					articles.length === 0 ? (
						<p>No articles found!</p>
					) : (
						articles.map(
							({
								id,
								title,
								description,
								imageUrl,
								createdAt,
								category,
								tag,
								createdBy,
								userId,
							}) => (
								<>
									<WrapItem
										width={{ base: '100%', sm: '45%', md: '45%', lg: '31.32%' }}
										key={id.key}
										paddingY={5}
									>
										<Box w="100%" textAlign={"center"}
											boxShadow={'2xl'}
											rounded={'md'}>
											<Box borderRadius="lg" overflow="hidden">
												<Link to={`/single-blog/${id}`}>
													<Image
														transform="scale(1.0)"
														src={imageUrl}
														alt="some text"
														objectFit="contain"
														width="100%"
														transition="0.3s ease-in-out"
														_hover={{
															transform: 'scale(1.05)',
														}}
													/>
												</Link>
											</Box>
											<Tag size={'lg'} variant="solid" colorScheme="teal" mt={3}>
												{category}
											</Tag>
											<Heading fontSize="xl" marginTop="2">
												<Link to={`/single-blog/${id}`}>
													{title}
												</Link>
											</Heading>
											<Text as="p" fontSize="md" marginTop="2">
												{description}
											</Text>
											<Flex
												flex='1'
												gap='4'
												alignItems='center'
												flexWrap='wrap'
												paddingLeft={70}
											>
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
											</Flex>
											<Flex
												flex='1'
												gap='4'
												alignItems='center'
												flexWrap='wrap'
												paddingLeft={70}
											>
												{user && user.uid === userId && (
													<Box textAlign={'end'} paddingLeft={35}>
														<DeleteArticle id={id} imageUrl={imageUrl} />
													</Box>
												)}
												<Link to={`/single-blog/${id}`}>
													<Button colorScheme='teal' variant='solid' leftIcon={<BiShare />} margin={5}>
														Read More
													</Button>
												</Link>
											</Flex>
										</Box>
									</WrapItem>
								</>
							)
						)
					)
				}
			</Wrap>
		</Box>
	);
};

export default ArticleList;