package com.amigoscode.book;

public record BookUpdateRequest(
        String name,
        String author,
        Genre genre,
        State state
) {
}
