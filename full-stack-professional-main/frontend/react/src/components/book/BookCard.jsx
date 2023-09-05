import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { deleteBook } from '../../services/book.js';
import {
  errorNotification,
  successNotification,
} from '../../services/notification.js';
import UpdateBookDrawer from './UpdateBookDrawer.jsx';

export default function CardWithBookImage({
  id,
  name,
  author,
  genre,
  state,
  imageNumber,
  fetchBooks,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Center py={6}>
      <Box
        maxW={'600px'}
        minW={'400px'}
        w={'full'}
        m={2}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'lg'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'400px'}
          w={'full'}
          //   src={
          //     'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          //   }
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        {/* <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={bookProfilePictureUrl(id)}
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex> */}

        <Box p={6}>
          <Stack spacing={2} align={'center'} mb={5}>
            <Tag borderRadius={'full'}>{id}</Tag>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {name}
            </Heading>
            <Text color={'gray.500'}>Author: {author}</Text>
            <Text color={'gray.500'}>Genre: {genre}</Text>
          </Stack>
        </Box>
        <Stack direction={'row'} justify={'center'} spacing={6} p={4}>
          <Stack>
            <UpdateBookDrawer
              initialValues={{ name, author, genre, state }}
              bookId={id}
              fetchBooks={fetchBooks}
            />
          </Stack>
          <Stack>
            <Button
              bg={'red.400'}
              color={'white'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              _focus={{
                bg: 'green.500',
              }}
              onClick={onOpen}
            >
              Delete
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Book
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete {name}? You can't undo this
                    action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        deleteBook(id)
                          .then((res) => {
                            console.log(res);
                            successNotification(
                              'Book deleted',
                              `${name} was successfully deleted`
                            );
                            fetchBooks();
                          })
                          .catch((err) => {
                            console.log(err);
                            errorNotification(
                              err.code,
                              err.response.data.message
                            );
                          })
                          .finally(() => {
                            onClose();
                          });
                      }}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
