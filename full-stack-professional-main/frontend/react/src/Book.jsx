import { Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CardWithBookImage from './components/book/BookCard.jsx';
import CreateBookDrawer from './components/book/CreateBookDrawer.jsx';
import SidebarWithHeader from './components/shared/SideBar.jsx';
import { getBooks } from './services/book.js';
import { errorNotification } from './services/notification.js';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const fetchBooks = () => {
    setLoading(true);
    getBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        errorNotification(err.code, err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <CreateBookDrawer fetchBooks={fetchBooks} />
        <Text mt={5}>Ooops there was an error</Text>
      </SidebarWithHeader>
    );
  }

  if (books.length <= 0) {
    return (
      <SidebarWithHeader>
        <CreateBookDrawer fetchBooks={fetchBooks} />
        <Text mt={5}>No books available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <CreateBookDrawer fetchBooks={fetchBooks} />
      <Wrap justify={'center'} spacing={'30px'}>
        {books.map((book, index) => (
          <WrapItem key={index}>
            <CardWithBookImage
              {...book}
              imageNumber={index}
              fetchBooks={fetchBooks}
            />
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>
  );
};

export default Book;
