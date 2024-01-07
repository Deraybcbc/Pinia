    import { defineStore } from 'pinia'
    import { io } from 'socket.io-client';

    const socket = io('http://localhost:3278');
    export const useAppStore = defineStore('app', {
        state: () => ({
            loginInfo: {
                loggedIn: false,
                username: '',
                image: '',
            },
            infoVotos: {
                votos: []
            }
        }),
        actions: {
            setLoginInfo({ loggedIn, username, image }) {
                this.loginInfo.loggedIn = loggedIn;
                this.loginInfo.username = username;
                this.loginInfo.image = image;
            },
            setVotos(votos) {
                this.infoVotos.votos = votos;
            },
            getVotos() {
                return this.infoVotos.votos;
            },
            isLoggedIn() {
                return this.loginInfo.loggedIn;
            },
            getLoginInfo() {
                return this.loginInfo;
            },
            conectar() {

                // Asegúrate de usar la misma URL del servidor

                socket.on('actualizacioVotacions', (votosActualizados) => {
                    this.setVotos(votosActualizados);
                    const votos = this.getVotos();
                });
            },
            emitir(opcion) {

                socket.emit('votacio', opcion);
            },
            desconectar() {
                // Cierra la conexión del socket cuando sea necesario

                if (this.socket) {
                    this.socket.disconnect();
                }
            }
        },
    })