package com.amigoscode.book;

public record BookDTO(
        Integer id,
        String name,
        String author,
        Genre genre,
        State state,
        String bookImageId) {

}
