

<template>
  <div class="basket-container">
    <table>
      <tr>
        <th>Product</th>
        <th>Ingredients</th>
        <th>Size</th>
        <th>Price</th>
      </tr>
      <tr v-for="item in $store.state.basket" :key="item">
        <td>{{ item.type }}</td>
        <td v-if="item.type == 'drink'">{{ item.name }}</td>
        <td v-if="item.type == 'pizza'">{{ item.selecteds.join(",") }}</td>
        <td v-if="item.type == 'pizza'">{{ item.size.size }}</td>
        <td :colspan="item.type == 'pizza' ? '1' : '2'">{{ item.price }}₺</td>
      </tr>
    </table>
    <div class="drinks">
      <div
        :title="drink.name"
        v-for="drink in $store.state.drinks"
        :key="drink"
        class="drink-item"
        @click="$store.commit('addDrinkToBasket', drink)"
      >
        <img :src="drink.url" alt="" />
      </div>
    </div>
    <p>Total Price {{ $store.getters.totalPrice }}₺</p>
    <button @click="order">Order Now</button>
    <button @click="$router.push({name:'createPizza'})">New Pizza </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    function order() {
      console.log(store.state.basket);
    }
    return {
      order,
    };
  },
};
</script>

<style  scoped>
table {
  padding: 1rem;
  width: 80%;
  border: 1px solid var(--primary-color);
}
.drinks {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 5em;
  width: 80%;
}
.drink-item img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.drink-item {
  cursor: pointer;
  width: 5rem;
  height: 5rem;
}
td,
th {
  font-size: 1.3rem;
  text-align: center;
}
.basket-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

button {
  cursor: pointer;
  width: 50%;
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  background: var(--primary-color);
}
</style>