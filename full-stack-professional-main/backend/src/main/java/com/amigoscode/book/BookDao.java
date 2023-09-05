package com.amigoscode.book;

import java.util.List;
import java.util.Optional;

public interface BookDao {
    List<Book> selectAllBooks();
    Optional<Book> selectBookById(Integer customerId);
    void insertBook(Book book);
    boolean existsBookById(Integer bookId);
    boolean existsBookWithName(String name);
    void deleteBookById(Integer bookId);
    void updateBook(Book update);
    Optional<Book> selectBookByName(String name);
    void updateBookImageId(String bookImageId, Integer bookId);
}
