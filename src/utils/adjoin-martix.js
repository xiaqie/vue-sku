export default class Adjoin {
    constructor(vertex) {
        this.vertex = vertex;
        this.quantity = vertex.length;
        this.init();
    }

    init() {
        this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
    }
    getRowToatl(params) {
        params = params.map(id => this.getVertexRow(id));
        const adjoinNames = [];
        this.vertex.forEach((item, index) => {
            const rowtotal = params.map(value => value[index]).reduce((total, current) => {
                total += current || 0;
                return total;
            }, 0);
            adjoinNames.push(rowtotal);
        });
        return adjoinNames;
    }

    getVertexRow(id) {
        const index = this.vertex.indexOf(id);
        const col = [];
        this.vertex.forEach((item, pIndex) => {
            col.push(this.adjoinArray[index + this.quantity * pIndex]);
        });
        return col;
    }

    getAdjoinVertexs(id) {
        return this.getVertexRow(id).map((item, index) => (item ? this.vertex[index] : '')).filter(Boolean);
    }

    setAdjoinVertexs(id, sides) {
        const pIndex = this.vertex.indexOf(id);
        sides.forEach((item) => {
            const index = this.vertex.indexOf(item);
            this.adjoinArray[pIndex * this.quantity + index] = 1;
        });
    }

    // 并集
    getCollection(params) {
        params = this.getRowToatl(params);
        return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
    }

    // 交集
    getUnions(params) {
        const row = this.getRowToatl(params);
        return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
    }
}