ALTER TABLE book
ADD COLUMN book_image_id VARCHAR(36);

ALTER TABLE book
ADD CONSTRAINT book_image_id_unique UNIQUE (book_image_id);