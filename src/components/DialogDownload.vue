<template>
  <VueHtml2pdf :manual-pagination="true" :enable-download="true" ref="dialogRef">
    <section slot="pdf-content">
      <div ref="dialogRef">
        <v-card color="grey lighten-4">
          <v-card-title>
            <span class="text-h4" color="primary" dark>Phases du projet</span>
          </v-card-title>
          <v-col cols="12">
            <v-row>
              <v-col v-for="item in itemList" :key="item[0]" class="" cols="12" sm="12">
                <span class="text-h5 ml-3">{{ item[0] }}</span>

                <v-col v-for="child in item[1]" :key="child.ID" class="" cols="12" sm="12">
                  <v-card>
                    <v-col>
                      <v-row class="ma-2 pb-2">
                        <v-chip text-color="white" label color="primary"> {{ child.ID }}</v-chip>
                      </v-row>
                      <v-row class="ma-2"><b>Critère:</b>&ensp;{{ child.Criteres }}</v-row>
                      <v-row class="ma-2"><b>Tests:</b></v-row>
                      <v-row class="ma-2"
                        ><ul>
                          <li class="ma-2" v-for="(test, index) in child.Tests" :key="index">
                            {{ test }}
                          </li>
                        </ul></v-row
                      >
                      <v-row class="ma-2"
                        ><b>Indicateurs:</b>&ensp;
                        {{ child.Indicateurs ? child.Indicateurs : 'N/A' }}</v-row
                      >
                      <v-row class="ma-2"
                        ><ul>
                          <li class="ma-2">
                            <b>X:</b>&ensp;{{ child.Xindicateur ? child.Xindicateur : 'N/A' }}
                          </li>
                          <li class="ma-2">
                            <b>Y:</b>&ensp;{{ child.Xindicateur ? child.Yindicateur : 'N/A' }}
                          </li>
                        </ul></v-row
                      >
                    </v-col>
                  </v-card>
                </v-col>
              </v-col>
            </v-row>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-2" @click="downloadCart()">Telecharger</v-btn>
            <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </section>
  </VueHtml2pdf>
</template>