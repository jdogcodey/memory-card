import data from '../card-image.json';
import { useState } from 'react'

export default function CardGame() {
    const cards = data;
    const [imgArray, setImgArray] = useState(() => shuffleArray([...cards]));

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
        <main>
            <section>
                <p>Click on a different card each time - can you remember all 12?</p>
                <p>Current:</p>
                <p>High:</p>
            </section>
            {imgArray.map((item, index) => (
                <section key={index}>
                    <button onClick={console.log(item)}><iframe src={item} alt={`Card ${index}`}/></button>
                </section>
            ))}
        </main>
    );
}
