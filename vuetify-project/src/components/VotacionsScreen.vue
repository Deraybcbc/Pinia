<template>
    <v-btn class="button" @click="votar(index)" v-for="(opcion, index) in opciones" :key="index">{{ opcion }}</v-btn>

    <div v-for="(opcions, index) in opciones" :key="index">{{ opcions }}: {{ store.infoVotos.votos[index] || 0 }}</div>

    <div>
        <canvas id="grafico"></canvas>
    </div>
</template>

<script setup>
import { useAppStore } from '@/store/app.js';
import { io } from 'socket.io-client';
const store = useAppStore();
</script>

<script>
import Chart from 'chart.js/auto';

const stores = useAppStore();

stores.conectar();

export default {

    data() {

        return {
            opciones: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4'],
            votos: [],
            myChart: null,
            canvas: null,
        }
    },

    methods: {

        async votar(opcion) {
            await stores.emitir(opcion);
        },


        // UPDATE VOTOS
        actualizacioVotacions() {
            const socket = io('http://localhost:3278');
            socket.on('actualizacioVotacions', (votosActualizados) => {
                this.actualizarGrafico(votosActualizados);
            });

            socket.on('votoActualizado', (voto) => {
                const votos = { ...this.myChart.data.datasets[0].data };
                votos[voto.opcion]++;
                this.actualizarGrafico(votos);
            });
        },

        // UPDATE GRAFICO
        actualizarGrafico(datosActualizados) {
            console.log("Actualizar gráfico");
            if (this.myChart) {
                if (this.myChart.data.datasets[0].data.join(",") !== datosActualizados.join(",")) {
                    this.myChart.data.datasets[0].data = datosActualizados;
                    //this.myChart.update();
                }
            }
        },

        crearGraficos() {
            const ctx = document.getElementById('grafico');
            // Check if the canvas element exists
            if (ctx) {
                const chartCtx = ctx.getContext('2d');
                if (chartCtx) {
                    // Destruir el gráfico existente si ya hay uno
                    if (this.myChart) {
                        this.myChart.destroy();
                    }
                    this.myChart = new Chart(chartCtx, {
                        type: 'pie',
                        data: {
                            labels: this.opciones,
                            datasets: [
                                {
                                    label: 'Votos',
                                    data: stores.infoVotos.votos || [],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        },
                    });
                }
            }



        },

    },
    created() {
        // Línea corregida: invoca la función conectar
        stores.conectar();
        console.log("CREADO");
        this.actualizacioVotacions();

    },

    mounted() {
        console.log("MONTADO");

        console.log("VOTACIONES", stores.getVotos());

    },



    updated() {
        console.log("ACTUALIZADO");
        this.crearGraficos();

    },
    destroyed() {
        console.log("DESTRUIDO");
        const socket = io('http://localhost:3278');
        socket.off('actualizacioVotacions');
    },
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