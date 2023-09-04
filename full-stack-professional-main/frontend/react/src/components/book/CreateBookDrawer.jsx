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
import CreateBookForm from '../shared/CreateBookForm.jsx';

const AddIcon = () => '+';
const CloseIcon = () => 'x';

const CreateBookDrawer = ({ fetchBooks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme={'teal'} onClick={onOpen}>
        Create book
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new book</DrawerHeader>

          <DrawerBody>
            <CreateBookForm onSuccess={fetchBooks} />
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

export default CreateBookDrawer;
