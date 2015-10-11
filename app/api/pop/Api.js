//privates
const config = require('../../../config');
const apiKey = config.lsApiKey;
const baseUrlSymf = config.baseApiUrlSymf;
const baseUrlRails = config.baseApiUrlRails;
const request = require('superagent');
const parse = (res) => res.body.Response.Data;

const fakeApiGraph = require('../../data/sampleGraph');
const fakeApiDeck = require('../../data/sampleDeck');

//module
var lsApi = {};

//getEntity(Int) -> Promise[GraphSpecs]
lsApi.getEntity = (id) => {
  const parseThis = res => res.body.entity || {};
  return new Promise(
    (resolve, reject) => request
      .get(`${baseUrlRails}entiites/${id}.json`)
      .end((err, res) => err ? reject(err) : resolve(parseThis(res))));
};

//searchEntities(String) -> Promise[Entity]
lsApi.searchEntities = (query) => {
  const parseThis = res => parse(res).Entities.Entity || [];
  return new Promise(
    (resolve, reject) => request
      .get(baseUrlSymf + 'entities.json')
      .query({q: query, _key: apiKey})
      .end((err, res) => err ? reject(err) : resolve(parseThis(res))));
};

//getMap(Int) -> Promise[GraphSpecs]
lsApi.getMap = (id) => {
  console.log('popapi')
  const parseThis = res => res.body.map || {};
  return new Promise(
    (resolve, reject) => request
      .get(`${baseUrlRails}maps/${id}.json`)
      .end((err, res) => err ? reject(err) : resolve(parseThis(res))));
};

//getDeck(String) -> Promise[Array[ApiDeck]]
lsApi.getDeck = (id) => {
console.log('get deck')
  const parseThis = res => res.map_collection || {};
  const fakeDeck =  {
            "map_collection": {
            "id": 767,
            "title": "Mitchell Family Foundation's Fracking Lobbyist Contractors",
            "description": "",
            "user": {
            "name": "Matthew",
            "url": "/user/Matthew"
            },
            "date": "October 11, 2015",
            "maps": [
            {
            "id": "767-1",
            "title": "Introduction",
            "description": "Finally someone let me out of my cage.&nbsp;Now, time for me is nothing cause I'm counting no age.&nbsp;Now I couldn't be there, now you shouldn't be scared,&nbsp;I'm good at repairs, and I'm under each snare.<br>Intangible, bet you didn't think so I command you to: panoramic view.&nbsp;Look I'll make it all manageable.<br><br>Pick and choose, sit and lose, all you different crews, chicks and dudes, who you think is really kickin' tunes?&nbsp;Picture you gettin' down in a picture tube, like you lit the fuse!&nbsp;You think it's fictional?&nbsp;Mystical? Maybe.&nbsp;Spiritual hero who appears in you to clear your view when you're too crazy.&nbsp;Lifeless: to those the definition for what life is.&nbsp;Priceless to you because I put you on the high shit, you like it?<br><br>Gun smokin' righteous, with one toke you're psychic among those, possess you with one go...<br>",
            "entities": [{
                "id": 69673,
                "name": "The Cynthia & George Mitchell Foundation",
                "image": null,
                "url": "/org/69673/The_Cynthia_&_George_Mitchell_Foundation",
                "description": null,
                "x": 3.809969197958708,
                "y": -318.6913123376378,
                "fixed": true,
                "type": "Org",
                "hide_image": false,
                "custom": false,
                "scale": 2
                },
                {
                "id": 185772,
                "name": "Nelson H Nease",
                "image": null,
                "url": "/person/185772/Nelson_H_Nease",
                "description": "Texas attorney and lobbyist",
                "x": 265.3316345214844,
                "y": -94.15049364638412,
                "fixed": true,
                "type": "Person",
                "hide_image": false,
                "custom": false,
                "scale": 1.5
                }],
            "rels": [{
              "id": "x1",
              "entity1_id": 185772,
              "entity2_id": 69673,
              "category_id": 6,
              "category_ids": [
              6
              ],
              "is_current": 1,
              "is_directional": true,
              "end_date": null,
              "scale": 2,
              "label": "\"Ad hoc advisor\"",
              "url": null,
              "x1": 42.01679992675781,
              "y1": -51.62064743041992,
              "fixed": true,
              "custom": true
              }],
            "texts": []
            },
            {
              "id": "767-2",
              "title": "Mitchell Foundation Basically Surrounded by Evil Spawn",
              "description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus enim vitae aliquam laoreet. Aliquam erat volutpat. Integer auctor, mauris eu dignissim commodo, augue eros vestibulum metus, eget suscipit est felis non nisl. Donec ultricies elit in vulputate congue. Cras porta volutpat ex et mattis. Quisque congue urna et ante facilisis, ut tincidunt sapien tincidunt. Proin sed imperdiet nisl, vel sagittis ligula. Quisque nec est quam. Morbi facilisis condimentum pulvinar. Phasellus consequat commodo tellus eget ultrices. Donec mauris elit, luctus et accumsan nec, pulvinar sit amet sem.</p><p>Nulla et tincidunt nibh. Proin cursus pulvinar leo, in varius libero sollicitudin ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse augue ex, luctus at velit eu, maximus malesuada est. Pellentesque id dolor vitae diam euismod condimentum. Sed dapibus lectus eu ligula eleifend varius. Nullam sit amet blandit dolor. Vivamus eros nunc, pellentesque ut tempus sed, rutrum quis nisi. Maecenas posuere felis posuere lectus consectetur, et aliquam felis laoreet. Nam nisi felis, semper ac massa vitae, blandit aliquam arcu. Maecenas quis enim cursus, accumsan enim non, efficitur quam. Mauris volutpat pretium mollis. Vestibulum at maximus metus. Nullam non eros sit amet massa consectetur laoreet id sit amet ante. In mi nisi, auctor id felis at, gravida maximus orci.</p>\r\n<blockquote>Proin eu congue libero, in tempor augue. Sed ut ullamcorper justo, in dignissim ligula. Praesent a leo convallis, suscipit felis non, venenatis magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consectetur ipsum et nunc gravida, sit amet volutpat leo dapibus. Sed vitae tempor felis, et posuere erat.</blockquote>",
              "entities": [{
                "id": 69673,
                "name": "The Cynthia & George Mitchell Foundation",
                "image": null,
                "url": "/org/69673/The_Cynthia_&_George_Mitchell_Foundation",
                "description": null,
                "x": 3.809969197958708,
                "y": -318.6913123376378,
                "fixed": true,
                "type": "Org",
                "hide_image": false,
                "custom": false,
                "scale": 2,
                "status": "highlighted"
              }],
              "rels": [],
              "texts": []
              }
            ],
            "sources": []
            }
            }

  return new Promise(
    (resolve, reject) => false ? reject(err) : resolve(parseThis(fakeDeck)));
}

//getDecks(String) -> Promise[Array[ApiDeck]]
lsApi.getDecks = (topicName) => {
  const parseThis = res => res.body.map_collections || [];
  return new Promise(
    (resolve, reject) => request
      .get(`${baseUrlRails}topics/${topicName}/map_collections.json`)
      .end((err, res) => err ? reject(err) : resolve(parseThis(res))));
};

module.exports = lsApi;
