<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class={disabled:!page.has_pre} ><a 
                  @click.prevent="getProducts(page.current_page-1)"  
                  class="page-link"   >上一頁</a></li>


                <li class="page-item"                 
                  v-for="pg in page.total_pages" :key="pg + 'page'" 
                  :class="{active: pg === page.current_page}"
                >
                     <!-- props寫法 -->
                     <!-- <a @click.prevent="getProducts(pg)" class="page-link"   
                                          
                     >{{ pg }}</a> -->

                     <!-- emit寫法 -->
                    <a @click.prevent="$emit('chgPages',pg)" class="page-link"  >
                      {{ pg }}
                    </a>


                </li>
                
                
                <li class="page-item" :class={disabled:!page.has_next}  ><a   
                  @click.prevent="getProducts(page.current_page+1)"
                  class="page-link">下一頁</a></li>
            </ul>
        </nav>
        <!-- {{ page }} -->
    </div>  

</template>

<style scoped>



</style>

<script>

export default {
  name: 'PageBar',
  props:["page","getProducts"],
  components: {
     
  },
  data(){
    return{
      msg:'',
    }
  },
  methods:{
    
  }

}
</script>