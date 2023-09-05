import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik, useField } from 'formik';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Yup from 'yup';
import {
  errorNotification,
  successNotification,
} from '../../services/notification.js';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={'error'} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const MyDropzone = ({ bookId, fetchBooks }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    uploadBookProfilePicture(bookId, formData)
      .then(() => {
        successNotification('Success', 'Profile picture uploaded');
        fetchBooks();
      })
      .catch(() => {
        errorNotification('Error', 'Profile picture failed upload');
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      w={'100%'}
      textAlign={'center'}
      border={'dashed'}
      borderColor={'gray.200'}
      borderRadius={'3xl'}
      p={6}
      rounded={'md'}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the picture here ...</p>
      ) : (
        <p>Drag 'n' drop picture here, or click to select picture</p>
      )}
    </Box>
  );
};

// And now we can use these
const UpdateBookForm = ({ fetchBooks, initialValues, bookId }) => {
  return (
    <>
      <VStack spacing={'5'} mb={'5'}>
        <Image
          borderRadius={'full'}
          boxSize={'150px'}
          objectFit={'cover'}
          src={bookProfilePictureUrl(bookId)}
        />
        <MyDropzone bookId={bookId} fetchBooks={fetchBooks} />
      </VStack>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          author: Yup.string()
            .email('Must be 20 characters or less')
            .required('Required'),
          age: Yup.number()
            .min(16, 'Must be at least 16 years of age')
            .max(100, 'Must be less than 100 years of age')
            .required(),
        })}
        onSubmit={(updatedBook, { setSubmitting }) => {
          setSubmitting(true);
          updateBook(bookId, updatedBook)
            .then((res) => {
              console.log(res);
              successNotification(
                'Book updated',
                `${updatedBook.name} was successfully updated`
              );
              fetchBooks();
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <Stack spacing={'24px'}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane Eyre: An Autobiography"
              />

              <MyTextInput
                label="Author"
                name="author"
                type="text"
                placeholder="Charlotte Bronte"
              />

              <MyTextInput
                label="Genre"
                name="genre"
                type="text"
                placeholder="Romance"
              />

              <Button
                disabled={!(isValid && dirty) || isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateBookForm;
