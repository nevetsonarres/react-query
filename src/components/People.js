import { useState } from 'react'
import { useQuery, usePaginatedQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async(page) => {
// const fetchPeople = async({queryKey}) => {
    //const [_key, page] = queryKey;
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`); 
    return res.json();
}

const People = () => {
    const [page, setPage] = useState(1);

    // requires 2 args
    // 1st key for the query
    // 2nd async func to grab the data
    // const { data, status } = useQuery(['people', page], fetchPeople);
    const { data, status } = useQuery(['people', page], () => fetchPeople(page));
    // console.log(data);
    // const { resolvedData, latestData, status } = usePaginatedQuery(['people', page], fetchPeople);
  
    return (  
        <div>
            <h2>People</h2>
            {/* <button onClick={() => setPage(1)}>page 1</button>
            <button onClick={() => setPage(2)}>page 2</button>
            <button onClick={() => setPage(3)}>page 3</button> */}
            {/* <p>{status}</p> */}

            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            
            {status === 'success' && (
                <>
                <button
                    // Math.max will not be less than 1
                    onClick={() => setPage(old => Math.max(old-1, 1))}
                    disabled={page === 1}
                >Previous Page</button>
                <span>{ page }</span>
                <button
                    onClick={() => setPage(old => (!data || !data.next ? old : old+1))}
                    disabled={page === !data || !data.next}
                >Next Page</button>

                    <div>
                        { data.results.map(person => {
                            return <Person key={person.name} person={person}/>
                        })}
                    </div>
                </>
            )}

        </div>
    );
}
 
export default People;