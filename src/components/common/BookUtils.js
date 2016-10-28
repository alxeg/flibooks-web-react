class BookUtils {
    static getBookAuthors(book) {
        return BookUtils.stripSymbols(book.authors.map(author => author.name).join("; "));
    }

    static getBookSeries(book) {
        return book.series ? book.series + ' [' + book.ser_no + ']' : ' ';
    }

    static stripSymbols(str) {
        return str.replace(/^[, ]*(.*?)[ ,]$/, "$1");
    }
}

export default BookUtils;