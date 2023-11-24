<template>
    <v-btn class="button" @click="votar(index)" v-for="(opcion,index) in opciones" :key="opcion">{{ opcion }}</v-btn>
    <br>    <br>
    <div v-for="(opcion,index) in opciones" :key="opcion">{{ opcion }}: {{ votos[index] || 0 }}</div>
</template>

<script setup>

import { ref } from 'vue';
import { useAppStore } from '@/store/app.js'
const store = useAppStore();
</script>

<script>

export default {
    data() {
        return {
            votos:ref([]),
            opciones:['Opcion 1','Opcion 2','Opcion 3','Opcion 4']
        }
    },
    methods: {
        votar(opcion) {
            const store = useAppStore();
            store.emitir(opcion);

            const votos = ref(store.getVotos);
            this.votos = votos;

        },
    },
    created() {
        const store = useAppStore(); 

        console.log("CREADO");

        store.conectar();

    },
    mounted() {
        const store = useAppStore(); 

        console.log("MONTADO");

        this.votos = store.getVotos();

    }
};
</script>

<style scoped>
.button-container {
    display: flex;
}

.button {
    margin-right: 50px;
    /* Adjust the margin as needed for horizontal separation */
}
</style>