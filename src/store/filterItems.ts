import { Item } from '@/interfaces/item';
import { VuexState } from '@/interfaces/vuexState';

const applyFilters = (state: VuexState): Item[] => {
  const items = state.items.filter((item) => {
    // Aplly identifiant filter.
    if (
      state.identifiantFilter.length
      && !item.ID.toLowerCase().includes(state.identifiantFilter.toLowerCase())
      && !item.Recommandation.toLowerCase().includes(state.identifiantFilter.toLowerCase())
    ) {
      return false;
    }

    // Apply family filter.
    if (state.familySearchFilter.length && state.familySearchFilter !== item.Famille) {
      return false;
    }

    // Apply difficulty filter.
    if (state.difficultyFilter && state.difficultyFilter !== item.Difficulte.length) {
      return false;
    }

    // Apply tag filter.
    for (let index = 0; index < state.tagSearchFilters.length; index += 1) {
      if (!item.Tags.includes(state.tagSearchFilters[index])) {
        return false;
      }
    }

    return true;
  });
  return items.slice(0, state.maxDisplayedItems);
};

export default applyFilters;
