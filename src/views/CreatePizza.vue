
<template>
  <div class="create-pizza-container">
    {{ basket.length }}
    <div
      @click="$router.push({ name: 'basket' })"
      class="fab"
      :data-total="$store.state.basket.length"
    >
      🍕
    </div>
    <AppSize />
    <div class="make-pizza">
      <div class="pizza">
        <img
          class="pizza-item"
          :src="require('@/assets/ingredients/dish.png')"
          alt="dish"
        />
        <img
          class="pizza-item"
          :src="require('@/assets/ingredients/pizza-1.png')"
          alt="pizza"
        />
        <img
          v-for="item in $store.state.pizzaItems"
          :key="item"
          class="on-pizza-item"
          :class="item.name"
          :data-out="item.out"
          :style="`left: ${item.out.split(';')[0]}; top: ${
            item.out.split(';')[1]
          }`"
          :src="item.url"
        />
      </div>
    </div>
    <AppPrice />
    <div class="ingredients" draggable="true">
      <AppIngredient
        v-for="ingredient in $store.state.ingredients"
        :key="ingredient"
        :ingredient="ingredient"
      ></AppIngredient>
    </div>
  </div>
</template>
<script>
import AppIngredient from "@/components/AppIngredient.vue";
import AppPrice from "@/components/AppPrice.vue";
import AppSize from "@/components/AppSize.vue";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    AppIngredient,
    AppPrice,
    AppSize,
  },
  setup() {
    const store = useStore();
    const basket = computed(() => store.state.basket.length);

    watch(basket, () => {
      document.querySelector(".pizza").classList.add("new-item-added");
      setTimeout(
        () =>
          document.querySelector(".pizza").classList.remove("new-item-added"),
        500
      );
      store.state.ingredients.forEach((item) => {
        document.querySelectorAll(`.${item.name}`).forEach((x) => {
          const position = x.dataset.out.split(";");
          x.style.left = position[0];
        });
      });
    });
    onMounted(() => {
      const ingredients = document.querySelector(".ingredients");
      const pizzaDropzone = document.querySelector(".pizza");
      ingredients.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("name", e.target.alt);
      });
      pizzaDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      pizzaDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        const ingredientName = e.dataTransfer.getData("name").toLowerCase();
        const item = document.querySelectorAll(`.${ingredientName}`);
        const positions = store.state.pizzaItems.filter(
          (item) => item.name == ingredientName
        );
        store.commit(
          "addToSelecteds",
          store.state.ingredients.find((item) => item.name == ingredientName)
        );
        positions.forEach((position, index) => {
          const inValues = position.in.split(";");
          item[index].style.left = inValues[0];
          item[index].style.top = inValues[1];
        });
      });
      pizzaDropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
      });
    });
    return {
      basket,
    };
  },
};
</script>

<style  scoped>
.create-pizza-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.fab {
  cursor: pointer;
  position: fixed;
  right: 3%;
  top: 2%;
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.3rem;
}
.fab::before {
  content: attr(data-total);
  position: absolute;
  right: 0;
  font-size: 1rem;
  background: #dedede;
  color: black;
  top: -5px;
  padding: 0.2rem;
  border-radius: 50%;
}
.make-pizza {
  margin-top: 2rem;
  flex: 10;
  width: 100%;
  display: grid;
  place-items: center;
}
.pizza {
  overflow: hidden;
  position: relative;
  width: 400px;
  height: 400px;
}
.new-item-added {
  animation: rotatePizza 500ms linear;
}
@keyframes rotatePizza {
  to {
    transform: rotate(360deg);
  }
}

.pizza .pizza-item {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pizza .pizza-item:nth-child(2) {
  padding: 1rem;
}

.on-pizza-item {
  position: absolute;
  transition: left 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 4rem;
}

.ingredients {
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>