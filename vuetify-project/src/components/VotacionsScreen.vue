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

const store = useAppStore();
</script>

<script>
import { useAppStore } from '@/store/app.js';
import Chart from 'chart.js/auto';

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

        votar(opcion) {
            stores.conectar();
            stores.emitir(opcion);
            //this.actualizar();
        },

        crearGraficos(){
            stores.conectar();
            const ctx = document.getElementById('myChart').getContext('2d');

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

        }

    },
    created() {
        //store = useAppStore();
        console.log("CREADO");
        stores.conectar;


    },

    mounted() {
        console.log("MONTADO");

        console.log("VOTACIONES", stores.getVotos());

        this.crearGraficos();

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