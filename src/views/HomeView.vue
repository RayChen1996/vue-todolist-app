<template>
  <div class="home">
  <div v-show="LoginAction" >
    <div v-if="LoginSuccess" class="alert alert-success" role="alert">
      {{msg}}
    </div>
    <div v-else class="alert alert-danger" role="alert">
      {{msg}}
    </div>
  </div>  

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">帳號</span>
            <input type="text" class="form-control"  v-model="account" placeholder="username" aria-label="username" aria-describedby="basic-addon2">
            <!-- <span class="input-group-text" id="basic-addon2">@gmail.com</span> -->
          </div>



          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">密碼</span>
            <input type="password"  class="form-control" v-model="Password" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
          </div>

          <div class="p-3 gap-3">
            <div class="btn btn-primary" v-on:click="handleLogin" >登入</div>

            <div class="btn btn-outline-primary">取消</div>


          </div>


        </div>
      </div>
    </div>

 
  </div>
</template>

<script>
let BaseUrl = `https://vue3-course-api.hexschool.io/`
import axios from 'axios';

 

export default {
  name: 'HomeView',
  props:{

  },
  components: {
     
  },
  data(){
    return{
      msg:'',
      LoginAction:false,
      LoginSuccess:false,
      account:'ray.10315332@gmail.com',
      Password:'project-655122738317'
    }
  },
  methods:{
    handleLogin(){
      axios.post(`${BaseUrl}v2/admin/signin`,{
        "username": this.account,//    ray.10315332@gmail.com
        "password": this.Password//     project-655122738317
      })
      .then((res)=>{
        console.log(res)
        this.saveConfig(res)
        this.LoginAction = true
        let JsonData = res.data
        if(JsonData.success){
          this.LoginSuccess = true
          this.checkIsManager()          
        }else{
          this.LoginSuccess = false
        }
        this.msg = JsonData.message
      })
      .catch((err)=>{
        this.LoginAction = true
        this.LoginSuccess = false
        this.msg = err.response.data.message
        alert(err.response.data.message);
      })

      setTimeout(()=>{
        this.LoginAction = false
      },1000)
    },
    checkIsManager() {
      const url = `${BaseUrl}/v2/api/user/check`;
      axios.post(url)
        .then(() => {
          this.$router.push('/product')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    saveConfig(token){
       console.log(token)
       localStorage.setItem("token",JSON.stringify({
        "token":token.data.token,
        "uid":token.data.uid,
        "expired":token.data.expired
       }))
    },
  }

}
</script>
