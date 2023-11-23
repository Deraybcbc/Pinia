<template>
    <v-btn class="button" @click="vote('Opcion 1')">Opcion 1</v-btn>
    <v-btn class="button" @click="vote('Opcion 2')">Opcion 2</v-btn>
    <v-btn class="button" @click="vote('Opcion 3')">Opcion 3</v-btn>
    <v-btn class="button" @click="vote('Opcion 4')">Opcion 4</v-btn>
</template>

<script setup>

import { ref } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3278'); // Asegúrate de usar la misma URL del servidor


const vote = (option) => {
  socket.emit('votacio', option);
};
</script>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    created() {
        console.log("CREADO");
    },
    mounted() {
        console.log("MONTADO");
        socket.on('actualizacioVotacions', (votos) => {
            console.log('Votaciones actualizadas:', votos);
            // Actualiza la interfaz de usuario con las votaciones actualizadas si es necesario
        });
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