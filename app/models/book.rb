# == Schema Information
#
# Table name: books
#
#  id              :integer          not null, primary key
#  title           :string           not null
#  author          :string           not null
#  description     :text
#  cover_image_url :string
#  average_rating  :float
#  page_length     :integer
#  published_date  :date
#  publisher       :string
#  isbn            :string
#  language        :string
#  url_to_buy      :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Book < ActiveRecord::Base

  validates :title, :author, presence: true

  has_attached_file :image,
    styles: { normal: "230x360>" },
    default_url: "missing.png",
    default_style: :normal

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_many :book_taggings

  has_many :bookshelves,
    through: :book_taggings,
    source: :bookshelf

  has_many :statuses

  has_many :reviews

  def self.find_by_bookshelf(bookshelf_id)
    bookshelf = Bookshelf.find_by(id: bookshelf_id)
    bookshelf.books
  end

  def self.find_by_user(user_id)
    user = User.find_by(id: user_id)
    user.books
  end

  def self.user_books_with_shelves(user_id)
    Book
      .includes(:bookshelves)
      .where("bookshelves.user_id = ? ", user_id)
      .references(:bookshelves)
  end

  def self.by_user(user_id)
    Book
      .includes(:statuses)
      .where("statuses.user_id = ?", user_id)
      .references(:statuses)
  end

  def self.by_status(status_name, user_id)
    Book.by_user(user_id).where("statuses.status = ?", status_name)
  end


  def self.by_bookshelf(bookshelf_id, user_id)
    Book
      .user_books_with_shelves(user_id)
      .where("bookshelves.id = ?", bookshelf_id)
  end


  def bookshelves_from_user(user_id)
    self.bookshelves.where("bookshelves.user_id = ?", user_id)
  end

  def user_bookshelves(user_id)
    Book.bookshelves.where("bookshelves.user_id = ?", user_id)
  end

  def self.by_search(search_string)
    first_word_segment = search_string.downcase + "%"
    other_word_segment = "% " + search_string.downcase + "%"
    sql_query = "lower(books.title) LIKE ? OR lower(books.title) LIKE ?"

    Book.where(sql_query, first_word_segment, other_word_segment)
  end

end
