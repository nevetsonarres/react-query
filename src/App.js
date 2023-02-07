import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react'
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";
import { ReactQueryDevtools } from 'react-query/devtools/index';

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState('people');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star wars info</h1>
          <Navbar setPage={setPage} />
          <div className="content">
            { page === 'planets' ? <Planets /> : <People /> }
          </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
