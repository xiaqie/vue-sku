<script>
import ShopAdjoin from '../utils/spec-adjoin-martix'
export default {
    name: 'sku',
    setup(){},
    data() {
        return {
            specsS: [],
            data: [{
                    id: '1',
                    specs: ['紫色', '套餐一', '64G']
                },
                {
                    id: '2',
                    specs: ['紫色', '套餐一', '128G']
                },
                {
                    id: '3',
                    specs: ['紫色', '套餐二', '128G']
                },
                {
                    id: '4',
                    specs: ['黑色', '套餐三', '256G']
                },
            ],
            commoditySpecs: [{
                    title: '颜色',
                    list: ['红色', '紫色', '白色', '黑色']
                },
                {
                    title: '套餐',
                    list: ['套餐一', '套餐二', '套餐三', '套餐四']
                },
                {
                    title: '内存',
                    list: ['64G', '128G', '256G']
                }
            ]
        }
    },
    created() {
      this.specsS = Array.from({length:this.commoditySpecs.length})
    },
    watch: {
      commoditySpecs(){
        this.specsS = Array.from({length:this.commoditySpecs.length})
      }
    },
    computed: {
        optionSpecs() {
            // 创建一个购物矩阵
            const shopAdjoin = new ShopAdjoin(this.commoditySpecs, this.data)
            // 获得可选项表
            const optionSpecs = shopAdjoin.querySpecsOptions(this.specsS);
            return optionSpecs
        }
    },
    methods: {
        handleClick(bool, text, index) {
            const specsS = this.specsS;
            if (specsS[index] !== text && !bool) return;
            specsS[index] = specsS[index] === text ? '' : text;
            this.specsS = specsS.slice();
        }
    },
    render() {
        const {optionSpecs,specsS} = this
        return (
            <div class="container">
              {
                this.commoditySpecs.map(({ title, list }, index) => (
                  <div key={index}>
                    <h1>{title}</h1>
                    <div wrap="wrap">
                      {
                        list.map((value, i) => {
                          const isOption = optionSpecs.includes(value); // 当前规格是否可选
                          const isActive = specsS.includes(value); // 当前规格是否被选
                          return (
                          <span
                            key={i}   
                            class={[isOption?'specOption':'specDisabled',isActive?'specAction':'']}
                            onClick={() => this.handleClick(optionSpecs.indexOf(value) > -1, value, index)}
                          >{value}
                          </span>
                        )})
                      }
                    </div>
                  </div>
                ))
              }
          </div>
        );
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.container {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 20px;
}

.title {
    font-size: 16px;
    line-height: 24px;
    color: #262626;
}

.specBox {
    margin: 5px 0 5px 0;
}

span {
    margin-right: 10px;
}

.specOption {
    background-color: #f3f3f3;
    padding: 5px 10px 5px 10px;
    color: #505257;
}

.specAction {
    background-color: #fef6f4;
    padding: 5px 10px 5px 10px;
    color: #e34a40;
    border: 1px solid #e34a40;
}

.specDisabled {
    background-color: #f3f3f3;
    padding: 5px 10px 5px 10px;
    color: #bebebe;
}
</style>
