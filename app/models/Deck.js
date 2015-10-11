const Graph = require('./Graph');
const _ = require('lodash');
const lsConverter = require('../api/ls/Converter');

class Deck {

  constructor(specs){
    this.id = specs.id || -1;
    this.title = specs.title || 'empty deck';
    this.description = specs.description;
    this.graphIds = specs.graphIds || [];
    this.author = specs.author || {};
    this.date = specs.date || 'no date';
    this.source = specs.source || {};
  }

  hasSlides() {
    return this.graphIds.length > 1;
  }

  authorUrl() {
    return this.source.url + this.author.url;
  }

  //parseApiGraph(apiDecks): { decks: [Deck], graphs: [Graph] }
  static parseApiDecks(apiDecks) {
    const [decks, graphs] = _.unzip(apiDecks.map(this.parseApiDeck));
    return { decks: decks, graphs: _.flatten(graphs)};
  }

  //parseApiDeck(apiDeck): [Deck,[Graph]]
  static parseApiDeck(apiDeck) {
    console.log('deck parse deck')
    return [
      new Deck({
        id: apiDeck.id,
        title: apiDeck.title,
        description: apiDeck.description,
        graphIds: apiDeck.maps.map(m => m.id),
        author: apiDeck.user,
        date: apiDeck.date,
        source: { name: 'littlesis', url: 'http://littlesis.org' }
      }),
      apiDeck.maps.map(lsConverter.parseApiGraph)
    ];
  }
}

module.exports = Deck;
