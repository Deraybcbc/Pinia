<template>
    <v-btn class="button" @click="votar(index)" v-for="(opcion, index) in opciones" :key="opcion">{{ opcion }}</v-btn>

    <div v-for="(opcions, index) in opciones" :key="opcions">{{ opcions }}: {{ store.infoVotos.votos[index] || 0 }}</div>

    <div>
        <canvas id="myChart"></canvas>

    </div>
</template>

<script setup>
import { useAppStore } from '@/store/app.js';
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';


const store = useAppStore();
</script>

<script>

const stores = useAppStore();

export default {

    data() {

        return {
            opciones: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4'],
            votos: [],
            myChart: null,
        }
    },

    methods: {

        async votar(opcion) {
            stores.conectar();
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
            if (this.myChart) {
                this.myChart.data.datasets[0].data = datosActualizados;
                //this.chartInstance.update();
            }
        },

        crearGraficos() {
            stores.conectar();
            const canvas = document.getElementById('myChart');
            // Check if the canvas element exists
            if (!canvas) {
                console.error("Canvas element not found.");
                return;
            }
            const ctx = canvas.getContext('2d');
            // Destroy existing chart if it exists
            if (this.myChart) {
                this.myChart.destroy();
            }

            this.myChart = new Chart(ctx, {
                type: 'bar',
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

        },

    },
    created() {
        //store = useAppStore();
        console.log("CREADO");
        stores.conectar;
        this.actualizacioVotacions();
    },

    mounted() {
        console.log("MONTADO");

        console.log("VOTACIONES", stores.getVotos());

    },

    updated() {
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