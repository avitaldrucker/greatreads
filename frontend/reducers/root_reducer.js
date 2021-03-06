import SessionReducer from './session_reducer';
import BookshelvesReducer from './bookshelves_reducer';
import BooksReducer from './books_reducer';
import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';
import BookshelfReducer from './bookshelf_reducer';
import LoadReducer from './load_reducer';
import ReviewsReducer from './reviews_reducer';
import BooksForSearchReducer from './books_for_search_reducer';

export default combineReducers({
  session: SessionReducer,
  bookshelves: BookshelvesReducer,
  books: BooksReducer,
  errors: ErrorsReducer,
  bookshelf: BookshelfReducer,
  loading: LoadReducer,
  reviews: ReviewsReducer,
  booksForSearch: BooksForSearchReducer
});
