const Marty = require('marty');
const DeckConstants = require('../constants/DeckConstants');
const Deck = require('../models/Deck');
const lsApi = require('../api/ls/api');

class DeckQueries extends Marty.Queries {
  fetchDeck(id){
    this.dispatch(DeckConstants.FETCH_DECK_STARTING);
    return lsApi.getDeck(id)
      .then(
        res => {
          const [ deck, graphs ] = Deck.parseApiDeck(res);
          this.dispatch(DeckConstants.FETCH_DECK_DONE, { deck: deck, graphs: graphs });
        })
      .catch(
        err => {
          this.dispatch(DeckConstants.FETCH_DECK_FAILED, err);
          throw new Error(err);
        });
  }
  fetchDecks(topic){
    this.dispatch(DeckConstants.FETCH_DECKS_STARTING);
    return lsApi.getDecks(topic)
      .then(
        res => {
          this.dispatch(DeckConstants.FETCH_DECKS_DONE, Deck.parseApiDecks(res));
        })
      .catch(
        err => {
          this.dispatch(DeckConstants.FETCH_DECKS_FAILED, err);
          throw new Error(err);
        });
  }
}

module.exports = DeckQueries;
