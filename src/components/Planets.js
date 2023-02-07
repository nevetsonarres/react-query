import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async() => {
    const res = await fetch('https://swapi.dev/api/planets/');
    return res.json();
}

const Planets = () => {
    // requires 2 args
    // 1st key for the query
    // 2nd async func to grab the data
    // 3rd is the optional config params
    const { data, status } = useQuery('planets', fetchPlanets, {
        // 2 secs fresh data default is 0
        staleTime: 2000,
        // default is 3
        retry: 1,
        cacheTime: 10,
        onSuccess: () => console.log('data fetched with no issues'),
        onError: () => console.log('issues on fetching data')
    });
    console.log(data);

    return (  
        <div>
            <h2>Planets</h2>
            {/* <p>{status}</p> */}

            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            
            {status === 'success' && (
                <div>
                    { data.results.map(planet => {
                        return <Planet key={planet.name} planet={planet}/>
                    })}
                </div>
            )}

        </div>
    );
}
 
export default Planets;