package com.amigoscode.book;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(
        name = "book"
//        uniqueConstraints = {
//                @UniqueConstraint(
//                        name = "book_image_id_unique",
//                        columnNames = "bookImageId"
//                )
//        }
)
public class Book {

    @Id
    @SequenceGenerator(
            name = "book_id_seq",
            sequenceName = "book_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_id_seq"
    )
    private Integer id;
    @Column(
            nullable = false
    )
    private String name;
    @Column(
            nullable = false
    )
    private String author;

    @Column(
            nullable = false
    )
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Column(
            nullable = false
    )
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(
            unique = true
    )
    private String bookImageId;

    public Book(String name, String author, Genre genre, State state) {
    }

    public Book(Integer id,
                String name,
                String author,
                Genre genre,
                State state) {
        this.id = id;
        this.name = name;
        this.author=author;
        this.genre=genre;
        this.state=state;
    }

    public Book(Integer id,
                String name,
                String author,
                Genre genre,
                State state,
                String bookImageId) {
       this(id, name, author, genre, state);
       this.bookImageId = bookImageId;
    }

    public Book() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getBookImageId() {
        return bookImageId;
    }

    public void setBookImageId(String bookImageId) {
        this.bookImageId = bookImageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Objects.equals(id, book.id) && Objects.equals(name, book.name) && Objects.equals(author, book.author) &&  genre == book.genre && state == book.state && Objects.equals(bookImageId, book.bookImageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, author, genre, state, bookImageId);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", genre=" + genre +
                ", bookImageId='" + bookImageId + '\'' +
                '}';
    }
}
