import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import GraphArea from './components/Graph/GraphArea';
import Footer from './components/Footer/Footer';

const App = () => {
    const [plotFilename, setPlotFilename] = useState('');

    const handleGraphGenerated = (filename) => {
        setPlotFilename(filename);
    };

    return (
        <div>
            <Navbar />
            <Hero onGraphGenerated={handleGraphGenerated} />
            {plotFilename && <GraphArea plotFilename={plotFilename} />}
            <Footer/>
        </div>
    );
};

export default App;
