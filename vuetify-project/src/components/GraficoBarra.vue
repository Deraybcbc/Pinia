<template>
    <div>
        <canvas id="myChart"></canvas>
        <p>{{ store.infoVotos.votos }}</p>
    </div>
</template>


<script setup>

import { onUnmounted, onMounted, watch } from 'vue';
import { useAppStore } from '@/store/app.js'
import Chart from 'chart.js/auto';
const store = useAppStore();

</script>

<script>
export default {
    data() {
        return {
            myChart: null,
            opciones: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4'],
        }
    },
    onMounted() {
        this.crearGrafico();
    },

    onUnmounted() {
        if (this.myChart) {
            this.myChart.destroy();
            this.myChart = null;
        }
    },
    mounted(){
        console.log("MONTADO GRAFICO");
        this.crearGrafico();
    },


    methods: {
        crearGrafico() {
            const store = useAppStore()
            store.conectar();
            const ctx = document.getElementById('myChart').getContext('2d');

            this.myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.opciones,
                    datasets: [
                        {
                            label: 'Votos',
                            data: this.votos || [],
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


}
</script>