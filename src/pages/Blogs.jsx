import React from 'react'
import BreadcrumbSec from '../components/BreadcrumbSec'
import { SimpleGrid, Box, Heading, Center } from '@chakra-ui/react'
import Data from '../components/Data';
import Carousel from '../components/Carousel';

const Blogs = () => {
    return (
        <Box p={4}>
            <Box paddingBottom={4}>
                <BreadcrumbSec pageName={"Blogs"} />
            </Box>
            <Carousel />
            <Data />
        </Box>
    )
}

export default Blogs
