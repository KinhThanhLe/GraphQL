import { gql } from '@apollo/client'

const getBooks = gql`
	query getBooksQuery {
		books {
			name
			id
      genre
      author{
        name
      }
		}
	}
`
const getAuthors = gql`
	query getAuthorsQuery {
		authors {
			name
			id
      age
      books{
        id
				name
				genre
      }
		}
	}
`
const getSingleBook = gql`
	query getSingleBookQuery($id: ID!) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				
			}
		}
	}
`

const searchBookByName = gql`
  query searchBookByNameQuery($name: String!) {
    books(bookName: $name ) {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

const getSingleAuthor = gql`
	query getSingleAuthorQuery($id: ID!) {
		author(id: $id) {
			id
			name
			age
			books {
				id
				name
				genre
				
			}
		}
	}
`

export { getBooks, getSingleBook, getSingleAuthor, searchBookByName, getAuthors }
