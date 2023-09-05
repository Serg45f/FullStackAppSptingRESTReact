package com.amigoscode.book;

import com.amigoscode.jwt.JWTUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/books")
public class BookController {

    private final BookService bookService;
    private final JWTUtil jwtUtil;

    public BookController(BookService bookService,
                          JWTUtil jwtUtil) {
        this.bookService = bookService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<BookDTO> getBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("{bookId}")
    public BookDTO getBook(
            @PathVariable("bookId") Integer bookId) {
        return bookService.getBookById(bookId);
    }

    @PostMapping
    public BookDTO createBook(
            @RequestBody BookCreationRequest request) {
        bookService.addBook(request);
        return bookService.getBookByName(request.name());
    }

    @DeleteMapping("{bookId}")
    public void deleteBook(
            @PathVariable("bookId") Integer bookId) {
        bookService.deleteBookById(bookId);
    }

    @PutMapping("{bookId}")
    public void updateBook(
            @PathVariable("bookId") Integer bookId,
            @RequestBody BookUpdateRequest updateRequest) {
        bookService.updateBook(bookId, updateRequest);
    }

//    @PostMapping(
//            value = "{bookId}/profile-image",
//            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
//    )
//    public void uploadBookImage(
//            @PathVariable("bookId") Integer bookId,
//            @RequestParam("file") MultipartFile file) {
//        bookService.uploadBookImage(bookId, file);
//    }
//
//    @GetMapping(
//            value = "{bookId}/profile-image",
//            produces = MediaType.IMAGE_JPEG_VALUE
//    )
//    public byte[] getBookImage(
//            @PathVariable("bookId") Integer bookId) {
//        return bookService.getBookImage(bookId);
//    }

}
