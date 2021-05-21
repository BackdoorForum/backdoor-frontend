import Navbar from '../../components/Navbars/Navbar';
import { fetchAllThreads } from '../../api/index';
import { IThread } from '../../api/modelsInterface';

import { useEffect, useState } from 'react';

const Threads: React.FC = () => {
    const [threadsInfo, setThreadsInfo] = useState<Array<IThread>>([]);

    useEffect(() => {
        fetchAllThreads()
            .then(threads => setThreadsInfo(threads.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Navbar />
            <section className="flex flex-wrap justify-center h-1/2 md:h-3/4">
                <div>
                    <h1> {threadsInfo[0]?.title} </h1>
                    <p> {threadsInfo[0]?.body} </p>
                </div>
            </section>
        </>
    );
};

export default Threads;
