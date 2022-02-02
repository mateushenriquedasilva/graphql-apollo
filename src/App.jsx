import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { useState } from 'react';

function App() {

  const [pagination, setPagination] = useState(1)

  const CHARACTERS = gql`
  query{
    characters(page: ${pagination}){
      results{
          id
          name
          image
      }
    }
  }`;

  const { loading, error, data } = useQuery(CHARACTERS)

  function prev() {
    pagination < 1 ? setPagination(1) : setPagination(pagination - 1)
  }

  function next() {
    pagination > 42 ? setPagination(1) : setPagination(pagination + 1)
  }

  return (
    <div>
      <header>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {data.characters.results.map((character) => {
              return (
                <div key={character.id}>
                  <img src={character.image} alt={character.name} />
                  <p>{character.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </header>
    </div>
  )
}

export default App
