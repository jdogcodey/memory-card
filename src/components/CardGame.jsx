import data from '../card-image.json';
import { useState, useEffect } from 'react';
import '../index.css'

export default function CardGame() {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    const gifIds = data;
    const [imgArray, setImgArray] = useState([]);
    const [clickedItems, setClickedItems] = useState([]);
    const [currentScore, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const fetchGifs = async () => {
            try {
                const promises = gifIds.map(id =>
                    fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch GIF with id: ${id} - Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(text => {
                            try {
                                return JSON.parse(text);
                            } catch (e) {
                                console.error("Response is not valid JSON", text);
                                throw e;
                            }
                        })
                        .then(data => data.data.images.original.mp4) // Extract the GIF URL
                );
                const results = await Promise.all(promises); // Wait for all fetches to complete
                setImgArray(results.filter(result => result !== null)); // Set the state with fetched GIF URLs
            } catch (error) {
                console.error('There has been a problem with your fetch operation', error);
            }
        };

        fetchGifs(); // Call the async function
    }, [gifIds, apiKey]); // Run effect when gifIds or apiKey change

    const shuffleArray = (array) => {
        const newArray = [...array]; // Create a copy of the array to avoid mutating state directly
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray; // Return the shuffled copy
    };

    const gameClick = (item) => {
        console.log(item)
        setImgArray(prevArray => shuffleArray(prevArray));
        if (!clickedItems.includes(item)) {
            const newArray = clickedItems;
            newArray.push(item);
            setClickedItems(newArray)
            setScore(currentScore + 1)
        } else {
            setClickedItems([]);
            setScore(0);
        }
    }

    useEffect(() => {
        if (currentScore > highScore) {
            setHighScore(currentScore)
        }
    }, [currentScore])

    return imgArray.length < 12 ? (
            <main>
                <p id='non-load'>I've run out of Giphy Credits - Come back in an hour!</p>
            </main>
        ) : (
            <main>
            <section id='top-section'>
                <p id='explainer'>Click on a different card each time - can you remember all 12?</p>
                <p id='current'>Current: {currentScore}</p>
                <p id='high'>High: {highScore}</p>
            </section>
            <section id='card-section'>
                {imgArray.map((item, index) => (
                    <section className='card' key={item}>
                            <button className='card-button' onClick={() => gameClick(item)}><video src={item} type ='video/mp4' alt={`Card ${index}`} autoPlay loop muted playsInline >Your browser does not support this website</video></button>
                    </section>
                ))}
            </section>
        </main>
        )
}
