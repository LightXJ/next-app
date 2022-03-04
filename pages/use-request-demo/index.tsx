import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import axios from 'axios';


function App() {
  const [query, setQuery] = useState('redux');

  const getData= useCallback(()=>{
    return new Promise((resolve, reject)=>{
      axios(`https://hn.algolia.com/api/v1/search?query=${query}`)
        .then(res=>{
          resolve(res.data);
        })
        .catch(err=>{
          reject(err);
        })
    })
  }, [query]);

  const { loading, error, data, run: runGetData } = useRequest(getData, {
    manual: true,
  });
  

  useEffect(()=>{
    runGetData();
  }, [runGetData])

  return (
    <>
     <form
        onSubmit={event => {
          runGetData()

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error ? <div>Something went wrong ...</div> : (
        <>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {data?.hits?.map(item => (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default App;