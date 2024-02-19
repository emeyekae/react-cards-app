import React, { useState , useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import "./Deck.css"

// Deck of Cards API link 
const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [draw, setDraw] = useState([]);
    const [shuffle, setShuffle] = useState(false);

    // new deck
    useEffect(function loadDeck() {
        async function fetchData() {
          const newDeck = await axios.get(`${BASE_URL}/new/shuffle/`);
          setDeck(newDeck.data);
        }
        fetchData();
      }, []);

    
      // draw a card one at a time
      async function drawCard() {
        try {
          const drawResult = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);

          if (drawResult.data.remaining === 0) throw new Error("Error: no cards remaining!");
          const card = drawResult.data.cards[0];
          setDraw(draw => [...draw,{
              id: card.code,
              name: card.suit + " " + card.value,
              image: card.image,
            },
          ]);
        } catch (err) {
          alert(err);
        }
      }
    
      // shuffle cards
      async function shuffleDeck() {
        setShuffle(true);
        try {
          await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
          setDraw([]);
        } catch (err) {
          alert(err);
        } finally {
          setShuffle(false);
        }
      }
    
      /** Return draw button (disabled if shuffling)
       */
      function renderDrawBtn() {
        if (!deck) return null;
    
        return (
          <button
            className="drawButton"
            onClick={drawCard}
            disabled={shuffle}>
            Draw a card
          </button>
        );
      }
    
      // return shuffle Button 
      function renderShuffleBtn() {
        if (!deck) return null;
        return (
          <button
            className="shuffleButton"
            onClick={shuffleDeck}
            disabled={shuffle}>
            Shuffle the deck
          </button>
        );
      }
    
      return (
        < main className="Deck-of-cards">
    
          {renderDrawBtn()}
          {renderShuffleBtn()}
    
          <div className="Deck-images">{
            draw.map(c => (
              <Cards key={c.id} name={c.name} image={c.image} />
            ))}
          </div>
    
        </main>
      );
    }
    
    export default Deck;
       