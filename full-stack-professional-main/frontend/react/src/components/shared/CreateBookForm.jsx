import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { saveBook } from '../../services/book.js';
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

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={'error'} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
const CreateBookForm = ({ onSuccess }) => {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          author: '',
          genre: '',
          state: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          author: Yup.string()
            .max(30, 'Must be 15 characters or less')
            .required('Required'),
          genre: Yup.string()
            .oneOf(
              ['FICTION', 'COMEDY', 'HISTORY', 'DRAMA', 'TRILLER'],
              'Invalid gender'
            )
            .required('Required'),
          state: Yup.string()
            .oneOf(['FREE', 'IN_USE'], 'Invalid gender')
            .required('Required'),
        })}
        onSubmit={(book, { setSubmitting }) => {
          setSubmitting(true);
          saveBook(book)
            .then((res) => {
              console.log(res);
              successNotification(
                'Book saved',
                `${book.name} was successfully saved`
              );
              onSuccess(res.headers['authorization']);
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
        {({ isValid, isSubmitting }) => (
          <Form>
            <Stack spacing={'24px'}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane Eyre: An Autobiography "
              />

              <MyTextInput
                label="Author"
                name="author"
                type="text"
                placeholder="Charlotte Bronte"
              />

              <MySelect label="Genre" name="genre">
                <option value="">Select genre</option>
                <option value="FICTION">Fiction</option>
                <option value="COMEDY">Comedy</option>
                <option value="HISTORY">History</option>
                <option value="DRAMA">Drama</option>
                <option value="TRILLER">Triller</option>
              </MySelect>

              <MySelect label="State" name="state">
                <option value="">Select state</option>
                <option value="FREE">Free</option>
                <option value="IN_USE">In use</option>
              </MySelect>

              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateBookForm;
