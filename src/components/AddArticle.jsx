import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Textarea,
    Select,
} from '@chakra-ui/react';
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebase";
import { toast} from "react-toastify";
import { useUserAuth } from "../context/UserAuthContext";

export default function AddArticle() {
    const { user, category } = useUserAuth(auth);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
        category: "",
        tag: "",
    });
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image || !formData.category || !formData.tag) {
            toast("Please fill all the fields.", { type: "error" });
            return;
        }

        const storageRef = ref(
            storage,
            `/images/${Date.now()}${formData.image.name}`
        );

        const uploadImage = uploadBytesResumable(storageRef, formData.image);

        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    title: "",
                    description: "",
                    image: "",
                    category: "",
                    tag: "",
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "Articles");
                    addDoc(articleRef, {
                        title: formData.title,
                        description: formData.description,
                        imageUrl: url,
                        createdAt: Timestamp.now().toDate(),
                        category: formData.category,
                        tag: formData.tag,
                        createdBy: user.displayName,
                        userId: user.uid,
                        likes: [],
                        comments: []
                    })
                        .then(() => {
                            toast("Article added successfully", { type: "success" });
                            setProgress(0);
                        })
                        .catch((err) => {
                            toast("Error adding article", { type: "error" });
                        });
                });
            }
        );
    };
    console.log(user)

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Create New Blog
                    </Heading>
                    <FormControl id="title" isRequired>
                        <FormLabel>Blog Title</FormLabel>
                        <Input
                            placeholder="Enter Blog Title"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Blog Tags</FormLabel>
                        <Input
                            type="text"
                            placeholder='Enter Blog Tag'
                            name="tag"
                            value={formData.tag}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormControl>
                    <FormControl id="category" isRequired>
                        <FormLabel>Please Select Category</FormLabel>
                        <Select name="category" value={formData.category} onChange={handleChange}>
                            <option value='' onChange={(e) => handleChange(e)}>Select Category</option>
                            {
                                category.map(({ id, title }) =>
                                    <option key={id} value={title} onChange={(e) => handleChange(e)}>{title}</option>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl id="image" isRequired>
                        <FormLabel>Blog Image</FormLabel>
                        <Input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />
                    </FormControl>
                    <FormControl id="description" isRequired>
                        <FormLabel>Blog Description</FormLabel>
                        <Textarea
                            placeholder='Enter Blog Description'
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={handlePublish}
                        >
                            Create Blog
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
}