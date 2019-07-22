<template>
  <div>
    <Topbar/>

    <div class="container">
      <!-- Form de novo jogo -->
      <div v-if="showGameForm" class="row newgame">
        <form @submit.prevent="novoJogo" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input v-model="time1" id="time1" type="text" class="validate">
              <label for="time1">Time 1</label>
            </div>

            <div class="input-field col s12">
              <input v-model="time2" id="time2" type="text" class="validate">
              <label for="time2">Time 2</label>
            </div>

            <div class="col s12">
              <button class="btn waves-effect waves-light" type="submit" name="action">Novo Jogo</button>
            </div>
          </div>
        </form>
      </div>
 
      <!--  
      * Inputs de Estatisticas 
      -->

      <!-- Barra de times -->
      <div v-show="showScore">
        <div class="row mt20">
          <div
            class="col s6 time-item valign-wrapper"
            :class="timeAtaque == 'Time Casa' ? 'atk-clr' : '' "
            @click="clickTime1" 
          >
            <div>{{ time1 }}</div>
          </div>
          <div
            class="col s6 time-item valign-wrapper"
            :class="timeAtaque == 'Time Fora' ? 'atk-clr' : '' "
            @click="clickTime2"
          >
            <div>{{ time2 }}</div>
          </div>
        </div>
      </div>

      <!-- Inputs -->
      <div v-show="showScore" class="row">        
        <div @click="registraLance('Cruzamento Interceptado')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ cruzamentoInterceptado1 }}</div>
          <p>Cruzamento Interceptado</p>          
          <div class="indicator">{{ cruzamentoInterceptado2 }}</div>
        </div>
        <div @click="registraLance('Passe Decisivo Interceptado')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ passeDecisivo1 }}</div>
          <p>Passe Decisivo Interceptado</p>
          <div class="indicator">{{ passeDecisivo2 }}</div>
        </div>
        <div @click="registraLance('Chute Sem Perigo')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ chuteSemPerigo1 }}</div>
          <p>Chute Sem Perigo</p>
          <div class="indicator">{{ chuteSemPerigo2 }}</div>
        </div>
        <div @click="registraLance('Chute Perigoso')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ chutePerigoso1 }}</div>
          <p>Chute Perigoso</p>
          <div class="indicator">{{ chutePerigoso2 }}</div>
        </div>
        <div @click="registraLance('GOLO Anulado')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ goloAnulado1 }}</div>
          <p>GOLO Anulado !</p>
          <div class="indicator">{{ goloAnulado2 }}</div>
        </div>
        <div @click="registraLance('GOLO')" class="col s12 input-item valign-wrapper">
          <div class="indicator">{{ golo1 }}</div>
          <p>GOLO GOLO !</p>
          <div class="indicator">{{ golo2 }}</div>
        </div>

        <div class="col s12 valign-wrapper">
          <button @click="telaNovoJogo" class="btn" type="button">Novo Jogo</button>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "./components/Topbar.vue";
import db from "@/firebase/init";

export default {
  name: "app",
  components: {
    Topbar
  },
  data() {
    return {
      showGameForm: false,   // Exibe form de criação do jogo
      showScore: true,     // Exibe inputs de estatística
      time1: "",            // Nome do time 1
      time2: "",            // Nome do time 2
      timeAtaque: "",        // Time que está no ataque
      idJogo: '',

      // Dados time 1
      cruzamentoInterceptado1: 0,
      passeDecisivo1: 0,
      chuteSemPerigo1: 0,
      chutePerigoso1: 0,
      goloAnulado1: 0,
      golo1: 0,

      // Dados time 2
      cruzamentoInterceptado2: 0,
      passeDecisivo2: 0,
      chuteSemPerigo2: 0,
      chutePerigoso2: 0,
      goloAnulado2: 0,
      golo2: 0,

    };
  },
  async created() {
    // Listener para detectar a seleção de time através da tecla de atalho
    window.addEventListener("keydown", e => {
      if (e.key == "ArrowLeft") {
        this.timeAtaque = "Time Casa";
      } else if (e.key == "ArrowRight") {
        this.timeAtaque = "Time Fora";
      }
    });

    /* Dados do ultimo jogo cadastrado */
    await db.collection('jogos').orderBy('data', 'desc').limit(1).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.time1 = doc.data().time1 ;
          this.time2 = doc.data().time2 ;
          this.idJogo = doc.data().jogo ;
        })
      });

    /* Lances do ultimo jogo */
    await this.atualizaLances();

  },
  methods: {
    atualizaLances(){
      // Zerar os indicadores
      this.cruzamentoInterceptado1= 0 , 
      this.passeDecisivo1= 0 , 
      this.chuteSemPerigo1= 0 ,
      this.chutePerigoso1= 0 ,
      this.goloAnulado1= 0 ,
      this.golo1= 0 ,
      this.cruzamentoInterceptado2= 0 , 
      this.passeDecisivo2= 0 , 
      this.chuteSemPerigo2= 0 ,
      this.chutePerigoso2= 0 ,
      this.goloAnulado2= 0 ,
      this.golo2 = 0 ;

      return new Promise(async res => {

      await db.collection('lances').where('jogo', '==', this.idJogo).get()
      .then(snapshot => {
        snapshot.forEach(doc => {

          if(doc.data().timeAtk == "Time Casa"){
            
            switch (doc.data().desc) {
              case 'Cruzamento Interceptado':
                this.cruzamentoInterceptado1 += 1 ;
                break;
              case 'Passe Decisivo Interceptado':
                this.passeDecisivo1 += 1 ;
                break;
              case 'Chute Sem Perigo':
                this.chuteSemPerigo1 += 1 ;
                break;
              case 'Chute Perigoso':
                this.chutePerigoso1 += 1 ;
                break;
              case 'GOLO Anulado':
                this.goloAnulado1 += 1 ;
                break;
              case 'GOLO':   
                this.golo1 += 1 ;
                break;    
              default:
                break;
            }

          }else{

            switch (doc.data().desc) {
              case 'Cruzamento Interceptado':
                this.cruzamentoInterceptado2 += 1 ;
                break;
              case 'Passe Decisivo Interceptado':
                this.passeDecisivo2 += 1 ;
                break;
              case 'Chute Sem Perigo':
                this.chuteSemPerigo2 += 1 ;
                break;
              case 'Chute Perigoso':
                this.chutePerigoso2 += 1 ;
                break;
              case 'GOLO Anulado':
                this.goloAnulado2 += 1 ;
                break;
              case 'GOLO':   
                this.golo2 += 1 ;
                break;    
              default:
                break;
            }
          }
        })
      })  
      
      res('ok');
      })
    },
    telaNovoJogo(){
      this.showGameForm = true ;
      this.showScore = false ;
    },        
    insertJogo(){
      db.collection('jogos').add({
            jogo: this.idJogo,
            data: new Date(),
            time1: this.time1,
            time2: this.time2,
        }).then(() => {
            alert('Jogo Inserido');
            this.getUltimoJogo();
        }).catch(err => {
            console.log(err);
        })
    },
    insertLance(lance){

      db.collection('lances').add({
            jogo: this.idJogo,
            timeAtk: this.timeAtaque,
            desc: lance,
            time: new Date()
        }).then(() => {
            alert('Lance Inserido');
            this.atualizaLances();
        }).catch(err => {
            console.log(err);
        })
    },
    registraLance(lance){
      let conf = confirm('Registrar: '+lance);

      if(conf){
        this.insertLance(lance);
        console.log('lance', lance);
      }
    },
    clickTime1(){
      this.timeAtaque = "Time Casa";
    },
    clickTime2(){
      this.timeAtaque = "Time Fora";
    },
    novoJogo() {
      this.showGameForm = false;
      this.showScore = true;

      // Gera Timestamp
      let d = +new Date();

      // Define o id do jogo
      this.idJogo = `${d} - ${this.time1} vs ${this.time2}`;

      /* Insere jogo no BD */
      this.insertJogo();     

    }
  }
};
</script>

<style lang="scss">
@import "sass/base";
@import "sass/header";
@import "sass/subheader";

#app {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}

body{
  background-color: $color-4!important ;
}

input{
  color: white ;
}

.newgame {
  margin-top: 40px;
}

.atk-clr {
  background-color: $color-2 !important;
  border-radius: 10px;
  color: $color-4!important ;

}

.time-item {
  height: 100px;
  color: $color-2 ;
}

.mt20 {
  margin-top: 20px;
}



.input-item {
  height: 60px;
  border-radius: 5px;
  margin-bottom: 3px;
  background-color: $color-2 ;

  p {
    margin: 0 auto ;
  }

  }

  .btn:hover{
    background-color: $color-1 ; 
    color:$color-4 ;
  }

  .btn{
    background-color: $color-2 ;
    color:$color-4 ;
    width: 100%;
    margin-top: 35px;
  }

.indicator{
  background-color: $color-4;
  color: $color-1;
  height: 25px;
  width: 25px;
  text-align: center;
  border-radius: 20px;
}

</style>
