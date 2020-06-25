import Adjoin from "./adjoin-martix";
export default class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [
      ...total,
      ...current.list,
    ], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }

  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }

  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach((item) => {
      const params = [];
      item.list.forEach((value) => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    return params;
  }

  applyCommodity(params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}
