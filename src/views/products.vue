<template>
    <div>
      
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary"  data-bs-toggle="modal" @click="isNew=true" data-bs-target="#productModal">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product) in products" :key="product.id">
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td class="text-end">{{product.origin_price}}</td>
              <td class="text-end">{{product.price}}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm"  data-bs-toggle="modal" data-id="{{product.id}}" @click="SelectedEditId(product.id);isNew=false"  data-bs-target="#productModal"    >
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm" data-id="{{product.id}}"  data-bs-toggle="modal" @click="SelectedId(product.id);"  data-bs-target="#delProductModal"  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="col">
            <pagenation :page="pagination"
             :get-products="getProducts"

            />
          </div>
        </div>
        
      </div>



      




  <!-- Modal -->
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
           aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input type="text" class="form-control" v-model="imageUrl"
                             placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" src="" alt="">
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100">
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" v-model="title" type="text" class="form-control" placeholder="請輸入標題">
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input id="category" v-model="category" type="text" class="form-control"
                             placeholder="請輸入分類">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input id="unit" v-model="unit" type="text" class="form-control" placeholder="請輸入單位">
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input id="origin_price" v-model="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input id="price" type="number" v-model="price" min="0" class="form-control"
                             placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" v-model="description" type="text" class="form-control"
                              placeholder="請輸入產品描述">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" v-model="content" type="text" class="form-control"
                              placeholder="請輸入說明內容">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input id="is_enabled" v-model="is_enabled" class="form-check-input" type="checkbox"
                             :true-value="1" :false-value="0">
                      <label class="form-check-label"  for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" v-if="isNew" class="btn btn-primary" @click="AddProduct">
                確認
              </button>
              <button type="button" v-else class="btn btn-primary" @click="modifyProduct">
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>




      <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
           aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="removeProduct()">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->


 



    </div>
</template>



<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>


<script>
let BaseUrl = `https://vue3-course-api.hexschool.io/`
import axios from 'axios';
import pagenation from '../components/PageBar.vue'
export default {
  name: 'ProductsView',
  props:{

  },
  components: {
    pagenation,
  },
  data(){
    return{
      isNew:false,
      showModel:false,
      EditProductModal:null,
      delIdx:0,
      EditIdx:0,
      apiPath: 'raychen',
      Caption:'新增產品',
      title:'',
      origin_price:0,
      category:'',
      price:'',
      unit:'個',
      products: [],
      tempProduct: {},
      is_enabled:false,
      description:'',
      content:'',
      imageUrl:'',
      imageUrl1:'',
      imageUrl2:'',
      imageUrl3:'',
      imageUrl4:'',
      imageUrl5:'',
      pagination: {},
     
    }
  },
  methods:{
    SelectedEditId(Id){
      this.EditIdx = Id
      // let tmp = this.products.filter((item)=>{
      //   return Id  == item.id
      // })
    },
    SelectedId(Id){
      this.delIdx = Id
    },
    checkIsManager() {
      const url = `${BaseUrl}/v2/api/user/check`;
      axios.post(url)
        .then(() => {
            this.getProducts() 
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    openModal(){
    //  this.EditProductModal.show();
    },
    getProducts(page=1) {
      var Config = JSON.parse(localStorage.getItem("token"))
      const config = {
        headers: { Authorization: Config.token },
      };
      // const url = `${BaseUrl}/v2/api/${this.apiPath}/admin/products`;
      const url = `${BaseUrl}/v2/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url,config)
        .then((response) => {
           console.log(response)
            if(response.data.success){
                this.products = response.data.products;
                this.pagination = response.data.pagination;
                console.log(this.pagination)
            }
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/');
        })
    },
    MakePagenation(){

    },
    AddProduct(){
      var Config = JSON.parse(localStorage.getItem("token"))
      const config = {
        headers: { Authorization: Config.token },
      };
      const url = `${BaseUrl}v2/api/${this.apiPath}/admin/product`;
      axios.post(url,{
        "data":{
              title: this.title,
              category: this.category,
              origin_price: this.origin_price,
              price: this.price,
              unit: this.unit || "個",
              description: this.description,
              content: this.content,
              is_enabled: this.is_enabled,
              imageUrl: this.imageUrl,
              "imagesUrl": [
              this.imageUrl1,
              this.imageUrl2,
              this.imageUrl3,
              this.imageUrl4,
              this.imageUrl5
            ]          
        }

      },config)
        .then((response) => {
          if(response.data.success){
             this.$router.push('/product');
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    modifyProduct(){
      var Config = JSON.parse(localStorage.getItem("token"))
      const config = {
        headers: { Authorization: Config.token },
      };

      const url = `${BaseUrl}/v2/api/${this.apiPath}/admin/product/${this.EditIdx}`;
      axios.put(url,{
        "data":{
              title: this.title,
              category: this.category,
              origin_price: this.origin_price,
              price: this.price,
              unit: this.unit || "個",
              description: this.description,
              content: this.content,
              is_enabled: this.is_enabled,
              imageUrl: this.imageUrl,
              "imagesUrl": [
              this.imageUrl1,
              this.imageUrl2,
              this.imageUrl3,
              this.imageUrl4,
              this.imageUrl5
            ]          
        }
      },config)
        .then((response) => {
          console.log(response.data)     
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/');
        })
    },
    removeProduct(){
      var Config = JSON.parse(localStorage.getItem("token"))
      const config = {
        headers: { Authorization: Config.token },
      };      
      const url = `${BaseUrl}/v2/api/${this.apiPath}/admin/product/${this.delIdx}`;
      axios.delete(url,config)
        .then((response) => {
            if(response.data.success){
                this.products = response.data.products;
            }
            this.getProducts()
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/');
        })
    },
    expandProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted(){
    this.getProducts() 
    // this.checkIsManager()
    this.EditProductModal = document.getElementById('productModal');

  }

}
</script>
