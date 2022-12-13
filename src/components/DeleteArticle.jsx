import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { HiOutlineX } from "react-icons/hi";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react'

export default function DeleteArticle({ id, imageUrl }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "Articles", id));
            toast("Article deleted successfully", { type: "success" });
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
            onClose();
        } catch (error) {
            toast("Error deleting article", { type: "error" });
            console.log(error);
        }
    };
    return (
        <>
            <Button  leftIcon={<HiOutlineX />} colorScheme='red' onClick={onOpen}>
                Delete
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Blog
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? To Delete This Blog Post To Delete.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
