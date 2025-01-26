export default function Card({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
      if (!disabled && !flipped) {
        handleChoice(card);
      }
    };
  
    return (
      <div className="card" onClick={handleClick}>
        {flipped ? (
          <img src={card.src} alt="card front" />
        ) : (
            <div className="card-back"></div>
        )}
      </div>
    );
  }