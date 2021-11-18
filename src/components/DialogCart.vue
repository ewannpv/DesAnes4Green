<template>
  <v-dialog :value="dialogCart" @click:outside="closeDialog()" max-width="70%">
    <div>
      <v-card color="grey lighten-4">
        <v-card-title>
          <span class="text-h4" color="primary" dark>Phases du projet</span>
        </v-card-title>
        <v-sheet class="ma-7 v-sheet--offset" elevation="4" color="green" max-width="calc(100%)">
          <v-sparkline
            auto-line-width="true"
            class="pa-2"
            show-labels="true"
            label-size="5"
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="8"
            auto-draw
            stroke-linecap="round"
            height="50"
          ></v-sparkline>
        </v-sheet>
        <v-card-text>
          <v-col cols="12">
            <v-list class="full-width">
              <v-list-group
                v-for="item in itemList"
                :key="item[0]"
                v-model="itemList.active"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title> {{ item[0] }} ({{ item[1].length }})</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item v-for="child in item[1]" :key="child.ID">
                  <v-list-item-content>
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
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text large color="green darken-2" @click="closeDialog()">Fermer</v-btn>

          <v-btn text large color="light-blue darken-3" @click="downloadCart()">Telecharger</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="d-none">
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
                            <v-chip text-color="white" label color="primary">
                              {{ child.ID }}</v-chip
                            >
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
            </v-card>
          </div>
        </section>
      </VueHtml2pdf>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import VueHtml2pdf from 'vue-html2pdf';
import store from '@/store';
import { Item } from '@/interfaces/item';
import * as api from '../api';

export default Vue.extend({
  data(): unknown {
    return {
      downloading: false,
      labels: api.getFamilyNames().map((e: string) => e.substring(0, 5)),
    };
  },
  components: { VueHtml2pdf },
  computed: {
    familyHisto() {
      return api.getFamilyHisto();
    },
    value(): number[] {
      const values: number[] = [];
      this.familyHisto.forEach((e) => {
        values.push(this.cartItems.filter((item: Item) => item.Famille === e[0]).length);
      });
      return values;
    },
    cartItems(): Item[] {
      return this.items.concat(this.necessaryItems);
    },
    dialogCart(): boolean {
      return store.getters.DIALOG_CART;
    },
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    necessaryItems(): Item[] {
      return store.getters.NECESSARY_ITEMS;
    },
    stages(): string[] {
      return api.getAllStages();
    },
    itemList(): unknown[][] {
      const sortedItems: unknown[][] = [];
      this.stages.forEach((stage: string) => {
        const items = this.cartItems.filter((item: Item) => item.Etape === stage);
        sortedItems.push([stage, items]);
      });
      return sortedItems;
    },
  },
  methods: {
    closeDialog(): void {
      store.dispatch('UPDATE_DIALOG_CART', false);
    },
    downloadCart(): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html = this.$refs.dialogRef as any;
      html.generatePdf();
    },
  },
});
</script>
