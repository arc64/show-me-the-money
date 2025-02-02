const Graph = require('../../models/Graph');
const converter = require('../../models/Converter');
const _ = require('lodash');


class LsGraph {

  constructor(graph) {
    this.graph = graph;
  }

  static parseApiGraph(specs){
    var graph = new Graph(specs);

    // graph decorator
    new LsGraph(graph)
      .importEntities(specs.entities)
      .importRels(specs.rels)
      .importCaptions(specs.texts)
      ._convertCurves();

    return graph;
  }

  importEntities(entities) {
    entities.map(
      e => this.graph.addNode(converter.entityToNode(e))
    );

    return this;
  }

  importRels(rels) {
    rels.map((r) => {
      const specs = converter.relToEdgeSpecs(r);
      this.graph.connectNodes(
        this.graph.getNodeByEntityId(r.entity1_id).id,
        this.graph.getNodeByEntityId(r.entity2_id).id,
        specs
      );
    });

    return this;
  }

  importCaptions(captions) {
    const that = this;
    if (captions) {
      captions.forEach(function(t) {
        that.addCaption(t);
      });
    }

    return this;
  }

  _convertCurves() {
    _.values(this.graph.edges).forEach(e => {
      // convert control point from relative to absolute
      if (e.display.cx != null && e.display.cy != null) {
        let ax = (e.n1.display.x + e.n2.display.x) / 2;
        let ay = (e.n1.display.y + e.n2.display.y) / 2;
        e.display.cx += ax;
        e.display.cy += ay;
      }

      e.updatePosition();
      this.graph.edges[e.id] = e;
    });

    return this;
  }
}

module.exports = LsGraph;
