import data from '../card-image.json';
import { useState, useEffect } from 'react';

export default function CardGame() {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    const gifIds = data;
    const [imgArray, setImgArray] = useState([]);

    useEffect(() => {
        const fetchGifs = async () => {
            try {
                const promises = gifIds.map(id =>
                    fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => data.data.images.original.mp4) // Extract the GIF URL
                );
                const results = await Promise.all(promises); // Wait for all fetches to complete
                setImgArray(results); // Set the state with fetched GIF URLs
            } catch (error) {
                console.error('There has been a problem with your fetch operation', error);
            }
        };

        fetchGifs(); // Call the async function
    }, [gifIds, apiKey]); // Run effect when gifIds or apiKey change

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledArray = shuffleArray([...imgArray]);

    return (
        <main>
            <section>
                <p>Click on a different card each time - can you remember all 12?</p>
                <p>Current:</p>
                <p>High:</p>
            </section>
            {shuffledArray.map((item, index) => (
                <section key={index}>
                    <button onClick={() => console.log(item)}>
                        <iframe src={item} alt={`Card ${index}`} />
                    </button>
                </section>
            ))}
        </main>
    );
}
