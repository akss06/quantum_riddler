import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';
import img4 from './img/img4.png';
import img5 from './img/img5.jpg';
import img6 from './img/img6.jpg';
import img7 from './img/img7.jpg';
import img8 from './img/img8.jpg';
import img9 from './img/img9.jpg';
import img10 from './img/img10.jpg';
import img11 from './img/img11.jpg';
import img12 from './img/img12.jpg';

const cardImages = [
  { src: img1, matched: false },
  { src: img2, matched: false },
  { src: img3, matched: false },
  { src: img4, matched: false },
  { src: img5, matched: false },
  { src: img6, matched: false },
  { src: img7, matched: false },
  { src: img8, matched: false },
  { src: img9, matched: false },
  { src: img10, matched: false },
  { src: img11, matched: false },
  { src: img12, matched: false }
];

function App2({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]); // Array to store matched card srcs

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setMatchedCards([]);  // Reset matched cards when the game starts
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setMatchedCards(prevMatchedCards => [...prevMatchedCards, choiceOne.src]); // Add matched card src to matchedCards
        setCards(prevCards => prevCards.map(card =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        ));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      
      {/* Button with disabled logic based on matched cards */}
      <button className = 'submit-btn'
        onClick={onComplete}  // Directly use onComplete function
        disabled={matchedCards.length !== cardImages.length}  // Disable button if game is not complete
      >
        Finish Game
      </button>
    </div>
  );
}

export default App2;
