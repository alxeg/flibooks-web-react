class BookUtils {
    static getBookAuthors(book) {
        return book.authors.map(author => BookUtils.stripSymbols(author.name)).join("; ");
    }

    static getBookSeries(book) {
        return book.series ? book.series + (book.ser_no && book.ser_no!=='0'? '[' + book.ser_no + ']' : ' ') : ' ';
    }

    static stripSymbols(str) {
        return str.replace(/^[, ]*(.*?)[ ,]*$/, "$1");
    }

    static formatSize(size) {
        return new Intl.NumberFormat().format(size);
    }

    static getHighlightRegex(searchString) {
        if (searchString) {
            let reStr = searchString.trim().split(/\s/).map(term => "("+term+")").join("|");
            return new RegExp(reStr, 'i');
        } else {
            return "";
        }

    }
}

export default BookUtils;