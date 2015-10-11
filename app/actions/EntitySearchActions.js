const Marty = require('marty');
const sc = require('../constants/SearchConstants');
const lsApi = require('../api/ls/api.js');

class EntitySearchActions extends Marty.ActionCreators {
  search(query){
    this.dispatch(sc.SEARCH_ENTITIES_STARTING);
    lsApi.searchEntities(query)
      .then(res => this.dispatch(sc.SEARCH_ENTITIES_DONE, res))
      .catch( err => this.dispatch(sc.SEARCH_ENTITIES_FAILED, err));
  }
  clearSearch(){
    this.dispatch(sc.CLEAR_ENTITY_SEARCH);
  }
}

module.exports = EntitySearchActions;
