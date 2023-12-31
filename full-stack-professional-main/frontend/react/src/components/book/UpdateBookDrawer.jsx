import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import UpdateBookForm from './UpdateBookForm.jsx';

const CloseIcon = () => 'x';

const UpdateBookDrawer = ({ fetchBooks, initialValues, bookId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={'gray.200'}
        color={'black'}
        rounded={'full'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update book</DrawerHeader>

          <DrawerBody>
            <UpdateBookForm
              fetchBooks={fetchBooks}
              initialValues={initialValues}
              bookId={bookId}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme={'teal'}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateBookDrawer;
