import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.css';
import './quoteBox.css';

const QuoteBox = () => { 
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuote(data.content);
            setAuthor(data.author);
        } catch (error) {
            console.error('Fetch quote failed:', error);
            setQuote('Failed to fetch quote. Please try again later.');
            setAuthor('');
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div id='quote-box'>
            <div id='text'>
                <p>{quote}</p>
            </div>

            <div id='author'>
                <p>- {author}</p>
            </div>

            <div id='buttons'>
                <a
                    id="tweet-quote"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <button id='new-quote' onClick={fetchQuote} aria-label="Get a new quote">New Quote</button>
            </div>
        </div>
    )
}

export default QuoteBox;