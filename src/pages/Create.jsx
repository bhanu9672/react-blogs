import React from 'react'
import BreadcrumbSec from '../components/BreadcrumbSec'
import { Box } from '@chakra-ui/react';
import AddArticle from '../components/AddArticle';

const Create = () => {
    return (
        <Box p={4}>
            <Box paddingBottom={4}>
                <BreadcrumbSec pageName={"Create Blog"} />
            </Box>
            <AddArticle />
        </Box>
    )
}

export default Create