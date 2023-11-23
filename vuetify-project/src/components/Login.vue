<template>
    <v-container>

        <v-card class="mx-auto" color="purple-lighten-1" max-width="500">
            <v-toolbar flat color="purple">
                <v-btn icon="mdi-account"></v-btn>

                <v-toolbar-title class="font-weight-light">Login </v-toolbar-title>

            </v-toolbar>

            <v-card-text>
                <v-text-field 
                v-model="user" 
                clearable variant="outlined" 
                prepend-inner-icon="mdi-account"
                base-color="white" 
                label="Usuario"></v-text-field>

                <v-text-field v-model="passwd" 
                clearable 
                variant="outlined" 
                prepend-inner-icon="mdi-lock-outline"
                :type="showPassword ? 'text' : 'password'" 
                base-color="white" 
                label="Contraseña"></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="success" size="large" type="submit"
                    variant="elevated" @click="login()">
                    Acceder
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-container>
</template>

<script setup>
import {setLoginInfo} from '@/store/app.js'
</script>

<script>
export default {
    data(){
        return{
            user:"",
            passwd:"",
            image:"",
            showPassword: false,
            correcto:false
        }
    },
    methods:{
        login(){
            if(this.user=="user" && this.passwd=="1234"){
                this.correcto=true;
            }
            setLoginInfo(this.correcto,this.user,this.image)
            console.log(this.user + this.passwd);
            console.log(this.correcto);
        },

    },
};
</script>