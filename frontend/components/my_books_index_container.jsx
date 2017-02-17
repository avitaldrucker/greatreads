import { connect } from 'react-redux';
import MyBooksIndex from './my_books_index';
import { fetchUserBooks, fetchBookshelfBooks } from '../actions/book_actions';
import { fetchBookshelves } from '../actions/bookshelf_actions';
import booksArray from '../selectors/books_selector';

const mapStateToProps = state => {
  return {
    books: booksArray(state.books),
    currentUser: state.session.currentUser,
    bookshelves: state.bookshelves
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserBooks: (userId) => { return dispatch(fetchUserBooks(userId)); },
    fetchBookshelfBooks: (bookshelfId) => { return dispatch(fetchBookshelfBooks(bookshelfId)); },
    fetchBookshelves: () => { return dispatch(fetchBookshelves()); }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyBooksIndex);