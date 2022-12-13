import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";

const BreadcrumbSec = ({ pageName }) => {
    return (
        <>
            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink>
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
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>
                        {pageName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}

export default BreadcrumbSec
