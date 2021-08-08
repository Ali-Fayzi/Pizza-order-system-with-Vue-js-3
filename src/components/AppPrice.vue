
<template>
  <p class="price">{{ price }} Rials</p>
  <button @click="$store.commit('addToBasket')">Add To Basket</button>
</template>
<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const price = computed(() => store.getters.currentPrice);
    watch(price, () => {
      const price = document.querySelector(".price");
      price.classList.add("priceChanged");
      setTimeout(() => price.classList.remove("priceChanged"), 250);
    });
    return {
      price,
    };
  },
};
</script>

<style  scoped>
.price {
  margin: 1rem 0;
  text-align: center;
  font-size: 1.4rem;
}

button {
  cursor: pointer;
  align-self: center;
  padding: 0.5rem;
  background: var(--primary-color);
  border: 0;
  border-radius: 0.5rem;
  color: white;
}

button:hover {
  opacity: 0.9;
}

.priceChanged {
  animation: priceScale 250ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

@keyframes priceScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>