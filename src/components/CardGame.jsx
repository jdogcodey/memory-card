import data from '../card-image.json';
import { useState, useEffect } from 'react';
import '../index.css'

export default function CardGame() {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    const gifIds = data;
    const [imgArray, setImgArray] = useState([
        "https://media2.giphy.com/media/vOQV5WWRUSI67s9Go6/giphy.mp4?cid=327b860736st4rilz4v32hfojdqtle4svouakbhl3u323gd9&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media4.giphy.com/media/26gsq8fim9nnlRUgU/giphy.mp4?cid=327b8607hbqxgfaughi4x9j64inm4j21j58fx8v7ytigtwhv&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media2.giphy.com/media/zMCfqXkwjmTO8/giphy.mp4?cid=327b8607nzn8n6gv8lbjkngfrm56rluyru5zg9oeen8mk855&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media1.giphy.com/media/LKqDgLlK6SuIM/giphy.mp4?cid=327b8607b317ctxz5xx1zl7qia1o8175xxauf8pwxj58cwrz&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media0.giphy.com/media/UUvaW1L0SK9Mc/giphy.mp4?cid=327b86072yq5qgc17ugzndqk39agmmn912oubt0fdqtdv6z7&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media2.giphy.com/media/61VzGiRUQp3pZ8omne/giphy.mp4?cid=327b8607c4wjy2wrm6c2blnebbkqxzeyi5pivtqz7rxguw6i&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media2.giphy.com/media/fs9BhNLjQswfFPkqGS/giphy.mp4?cid=327b8607gw01dngzpt012poy8sjhzwcptmtzod3u2w4v4xo2&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media4.giphy.com/media/3oEduFfxiiHUa7Zfgs/giphy.mp4?cid=327b86073iuan1zb99gkxkmu40333mz07tozbx9uxismywfg&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media4.giphy.com/media/14tvbepZ8vhU40/giphy.mp4?cid=327b86072npj7uqx3wsgqlxezcwe95nbgqqreaukvhu9954f&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media3.giphy.com/media/uJmW8te0R2N2XZ8Pg1/giphy.mp4?cid=327b8607bx5sxzdx5oxcmoxyhc1pebo45kgj1rvrem9z95wb&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media4.giphy.com/media/9Xh1CGm4Hzo4g/giphy.mp4?cid=327b8607pi7zjxpxvx1jbfvdxrrk1hys0bhcozvs7thlcn9c&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g",
        "https://media3.giphy.com/media/l3vQXSWNJR84X9di8/giphy.mp4?cid=327b8607naxcz2d9yififk25hsokhuz7uvqx60qqqxqv4pd6&ep=v1_gifs_gifId&rid=giphy.mp4&ct=g"
    ]);
    const [clickedItems, setClickedItems] = useState([]);
    const [currentScore, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // useEffect(() => {
    //     const fetchGifs = async () => {
    //         try {
    //             const promises = gifIds.map(id =>
    //                 fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`)
    //                     .then(response => {
    //                         if (!response.ok) {
    //                             throw new Error(`Failed to fetch GIF with id: ${id} - Status: ${response.status}`);
    //                         }
    //                         return response.text();
    //                     })
    //                     .then(text => {
    //                         try {
    //                             return JSON.parse(text);
    //                         } catch (e) {
    //                             console.error("Response is not valid JSON", text);
    //                             throw e;
    //                         }
    //                     })
    //                     .then(data => data.data.images.original.mp4) // Extract the GIF URL
    //             );
    //             const results = await Promise.all(promises); // Wait for all fetches to complete
    //             setImgArray(results.filter(result => result !== null)); // Set the state with fetched GIF URLs
    //         } catch (error) {
    //             console.error('There has been a problem with your fetch operation', error);
    //         }
    //     };

    //     fetchGifs(); // Call the async function
    // }, [gifIds, apiKey]); // Run effect when gifIds or apiKey change

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

    return (
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
    );
}
