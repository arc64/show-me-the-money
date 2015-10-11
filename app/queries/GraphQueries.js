const Marty = require('marty');
const GraphConstants = require('../constants/GraphConstants');
const Graph = require('../models/Graph');
const lsApi = require('../api/pop/api');
const LsConverter = require('../api/ls/Converter');

class GraphQueries extends Marty.Queries {
  getGraph(id){
    this.dispatch(GraphConstants.RECEIVE_GRAPH_STARTING);
    return lsApi.getMap(id)
      .then(res =>
        this.dispatch(GraphConstants.RECEIVE_GRAPH_DONE, LsConverter.parseApiGraph(res)))
      .catch(err =>
        this.dispatch(GraphConstants.RECEIVE_GRAPH_FAILED, id, err));

  }
}

module.exports = GraphQueries;
