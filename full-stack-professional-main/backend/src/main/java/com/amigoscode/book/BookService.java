package com.amigoscode.book;

import com.amigoscode.exception.DuplicateResourceException;
import com.amigoscode.exception.RequestValidationException;
import com.amigoscode.exception.ResourceNotFoundException;
import com.amigoscode.s3.S3Buckets;
import com.amigoscode.s3.S3Service;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepo;
    private final BookDTOMapper bookDTOMapper;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public BookService(BookRepository bookRepo,
                           BookDTOMapper bookDTOMapper,
                           S3Service s3Service,
                           S3Buckets s3Buckets) {
        this.bookRepo = bookRepo;
        this.bookDTOMapper = bookDTOMapper;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }

    public List<BookDTO> getAllBooks() {
        return bookRepo.findAll()
                .stream()
                .map(bookDTOMapper)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Integer id) {
        return bookRepo.findById(id)
                .map(bookDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "book with id [%s] not found".formatted(id)
                ));
    }

    public BookDTO getBookByName(String name) {
        return bookDTOMapper.apply(bookRepo.findBookByName(name));
    }

    public void addBook(BookCreationRequest bookCreationRequest) {
        // check if email exists
        String name = bookCreationRequest.name();
        if (bookRepo.existsBookByName(name)) {
            throw new DuplicateResourceException(
                    "name already taken"
            );
        }

        // add
        Book book = new Book();
                book.setName(bookCreationRequest.name());
                book.setAuthor(bookCreationRequest.author());
                book.setGenre(bookCreationRequest.genre());
                book.setState(bookCreationRequest.state());

        System.out.println(book);
        bookRepo.save(book);
    }

    public void deleteBookById(Integer bookId) {
        checkIfBookExistsOrThrow(bookId);
        bookRepo.deleteById(bookId);
    }

    private void checkIfBookExistsOrThrow(Integer bookId) {
        if (!bookRepo.existsBookById(bookId)) {
            throw new ResourceNotFoundException(
                    "book with id [%s] not found".formatted(bookId)
            );
        }
    }

    public void updateBook(Integer bookId,
                               BookUpdateRequest updateRequest) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "book with id [%s] not found".formatted(bookId)
                ));

        boolean changes = false;

        if (updateRequest.name() != null && !updateRequest.name().equals(book.getName())) {
            if (bookRepo.existsBookByName(updateRequest.name())) {
                throw new DuplicateResourceException(
                        "book name already taken"
                );
            }
            book.setName(updateRequest.name());
            changes = true;
        }

        if (updateRequest.author() != null && !updateRequest.author().equals(book.getAuthor())) {
            book.setAuthor(updateRequest.author());
            changes = true;
        }

        if (updateRequest.genre() != null && !updateRequest.genre().equals(book.getGenre())) {
            book.setGenre(updateRequest.genre());
            changes = true;
        }

        if (updateRequest.state() != null && !updateRequest.state().equals(book.getState())) {
            book.setState(updateRequest.state());
            changes = true;
        }

        if (!changes) {
           throw new RequestValidationException("no data changes found");
        }

        bookRepo.save(book);
    }

//    public void uploadBookImage(Integer bookId,
//                                           MultipartFile file) {
//        checkIfBookExistsOrThrow(bookId);
//        String bookImageId = UUID.randomUUID().toString();
//        try {
//            s3Service.putObject(
//                    s3Buckets.getBook(),
//                    "book-images/%s/%s".formatted(bookId, bookImageId),
//                    file.getBytes()
//            );
//        } catch (IOException e) {
//            throw new RuntimeException("failed to upload book image", e);
//        }
//        bookDao.updateBookImageId(bookImageId, bookId);
//    }
//
//    public byte[] getBookImage(Integer bookId) {
//        var book = bookDao.selectBookById(bookId)
//                .map(bookDTOMapper)
//                .orElseThrow(() -> new ResourceNotFoundException(
//                        "book with id [%s] not found".formatted(bookId)
//                ));
//
//        if (StringUtils.isBlank(book.bookImageId())) {
//            throw new ResourceNotFoundException(
//                    "book with id [%s] profile image not found".formatted(bookId));
//        }
//
//        byte[] bookImage = s3Service.getObject(
//                s3Buckets.getBook(),
//                "book-images/%s/%s".formatted(bookId, book.bookImageId())
//        );
//        return bookImage;
//    }
}

