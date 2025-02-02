const React = require('react');
const Marty = require('marty');
const BaseComponent = require('./BaseComponent');
const Header = require('./Header');
const Content = require('./Content');
const Footer = require('./Footer');
const { Grid } = require('react-bootstrap');
const yarr = require('yarr.js');
const RoutesHelper = require('../routes/RoutesHelper');

class Root extends BaseComponent {
  constructor(){
    super();
  }

  render() {
    return (
      <Grid className="root" fluid={true}>
        <Header />
        <Content />
      </Grid>
    );
  }

  componentDidMount(){
    this._defineRoutes();
    yarr();
  }

  _defineRoutes(){
    const that = this;

    yarr('/', function(ctx) {
      that.app.contentActions.showHome();
    });

    yarr(`/${RoutesHelper.mapBasePath()}/:id`, function(ctx) {
      const match = ctx.params.id.match(/^\d+/);
      
      if (match) {
        const id = parseInt(match[0]);
        if (that.app.deckStore.getDeck(id)) {
          that.app.deckActions.selectSlide(id, 0);
        } else {
          that.app.deckQueries.fetchDeck(id)
            .then(res => {
              that.app.deckActions.selectSlide(id, 0);
            });
        }
      }
    });

    yarr(`/${RoutesHelper.mapBasePath()}/:id/:slide`, function(ctx) {
      const match = ctx.params.id.match(/^\d+/);

      if (match) {
        const id = parseInt(match[0]);

        if (that.app.deckStore.getDeck(id)) {
          that.app.deckActions.selectSlide(id, parseInt(ctx.params.slide));
        } else {
          that.app.deckQueries.fetchDeck(id)
            .then(res => {
              that.app.deckActions.selectSlide(id, parseInt(ctx.params.slide));
            });
        }
      }
    });

    yarr('*', function() { })
  }
}

module.exports = Marty.createContainer(Root);
