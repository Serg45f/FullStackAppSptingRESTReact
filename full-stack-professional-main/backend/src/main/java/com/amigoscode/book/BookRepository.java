package com.amigoscode.book;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface BookRepository
        extends JpaRepository<Book, Integer> {

    boolean existsBookByName(String name);
    boolean existsBookById(Integer id);
    Book findBookByName(String name);
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE Customer c SET c.bookImageId = ?1 WHERE c.id = ?2")
//    int updateBookImageId(String bookImageId, Integer bookId);
}
