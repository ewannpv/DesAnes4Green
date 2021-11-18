<template>
  <v-dialog :value="dialogCart" @click:outside="closeDialog()" max-width="70%">
    <div ref="dialogRef">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <v-card>
            <v-card-title>
              <span class="text-h3">Panier</span>
            </v-card-title>
            <v-col cols="12">
              <span class="text-h4">Etapes</span>
              <v-row>
                <v-col v-for="item in itemList" :key="item[0]" class="" cols="12" sm="12">
                  <v-card color="green lighten-4 mt-3">
                    <v-card-title primary-title> {{ item[0] }} </v-card-title>
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
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
              <v-btn text color="green darken-2" @click="downloadCart()">Telecharger</v-btn>
            </v-card-actions>
          </v-card>
        </section>
      </vue-html2pdf>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Item } from '@/interfaces/item';
import * as api from '../api';

export default Vue.extend({
  computed: {
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
      const cartItems = this.items.concat(this.necessaryItems);
      this.stages.forEach((stage: string) => {
        const items = cartItems.filter((item: Item) => item.Etape === stage);
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
      const html = this.$refs.dialogRef as HTMLElement;

      const w = window.open() as Window;
      w.document.write(html.innerHTML);
      w.document.close();
      w.setTimeout(() => {
        w.print();
      }, 500);
    },
  },
});
</script>
