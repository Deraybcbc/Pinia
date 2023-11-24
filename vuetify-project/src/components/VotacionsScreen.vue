<template>
    <v-btn class="button" @click="votar(index)" v-for="(opcion, index) in opciones" :key="opcion">{{ opcion }}</v-btn>
    <br> <br>
    <div v-for="(opcion, index) in opciones" :key="opcion">{{ opcion }}: {{ store.infoVotos.votos[index] || 0 }}</div>
</template>

<script setup>

//import { ref } from 'vue';
import { useAppStore } from '@/store/app.js'
const store = useAppStore();
</script>

<script>

export default {
    data() {
        return {
            opciones: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4']
        }
    },
    
    methods: {
        votar(opcion) {
            const store = useAppStore();
            store.emitir(opcion);
        },
    },
    created() {
        const store = useAppStore();
        console.log("CREADO");
        store.conectar();
    },
    mounted() {
        console.log("MONTADO");
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