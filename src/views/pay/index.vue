<template>
    <div class='App'>
支付系统
{{ userinfo }}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {

        };
    },
    created() {

    },
    computed:{
    ...mapState('user',['userinfo'])
    },
    mounted() {

    },
    methods: {

    },
    components: {

    }
};
</script>

<style scoped lang="less">

</style>
