import Navbar from '../../components/Navbars/Navbar';
import { fetchAllThreads } from '../../api/index';
import { IThread } from '../../api/modelsInterface';
import { toast, Flip } from 'react-toastify';
import { motion } from 'framer-motion';
import { routeVariants } from '../../variants/index';
import Sidebar from '../../components/Utilities/Sidebar';
import ThreadCard from '../../components/Cards/ThreadCard';
import ChatIllustration from '../../assets/chat-illustration.svg';

import { useEffect, useState } from 'react';

const Threads: React.FC = () => {
    const [allThreads, setAllThreads] = useState<Array<IThread>>([]);
    const [threads, setThreads] = useState<Array<IThread>>([]);
    const [search, setSearch] = useState<string>();

    const handleSearchChange = (e: any) => setSearch(e.target.value);

    useEffect(() => {
		if(search) {
			allThreads.filter(thread => 
                (thread.title.toLowerCase().includes(search.toLowerCase()) 
                    || thread.body.toLowerCase().includes(search.toLowerCase()))
					? setThreads(oldThreads => [...oldThreads, thread])
                    : null
			);
		} else {
			setThreads(allThreads);
		}
		return () => setThreads([]);
	}, [search, allThreads]);

    useEffect(() => {
        fetchAllThreads()
            .then(fetchedThreads => {
                setThreads(fetchedThreads.data);
                setAllThreads(fetchedThreads.data);
            })
            .catch(err => toast.error(err.response.data.message, { transition: Flip }))
    }, []);

    return (
        <motion.section
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <section className="flex flex-wrap w-screen h-screen box-border pt-16 overflow-x-hidden">
                {/* Sidebar */}
                <Sidebar
                    bgColor="grey-light"
                    title="Threads"
                    description="Explore top cybersecurity topics"
                    titleColor="grey-darker"
                    descriptionColor="grey-lighter"
                    illustration={ChatIllustration}
                    showSearch={true}
                    searchPlaceholder="search thread"
                    searchTitle="Search your favourite topic"
                    handleChange={handleSearchChange}
                />

                {/* Content Column */}
                <div className="flex flex-1 justify-center flex-wrap my-8 mx-2 box-border">
                    {threads.map(thread => {
                        return (
                            <ThreadCard
                                title={thread.title}
                                body={thread.body}
                                numberOfPosts={thread.numberOfPosts}
                            />
                        )
                    })}
                </div>
            </section>
        </motion.section>
    );
};

export default Threads;
