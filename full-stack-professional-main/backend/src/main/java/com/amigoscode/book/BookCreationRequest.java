package com.amigoscode.book;

public record BookCreationRequest(
        String name,
        String author,
        Genre genre,
        State state
) {
}

