import { Box } from '@chakra-ui/react'
import React from 'react'
import ArticleList from '../components/ArticleList'
import Carousel from '../components/Carousel'

const Home = () => {
    return (
        <>
            <Box p={4}>
                <Carousel />
                <ArticleList />
            </Box>
        </>
    )
}

export default Home