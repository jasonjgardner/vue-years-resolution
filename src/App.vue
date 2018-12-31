<template>
	<div id="app">
		<div v-for="(choiceSet, itr) in choices">
			<ButtonReel v-if="idx > itr" class="btn"
						:key="itr"
						:speed="Math.max(10, rate * (choices.length - itr))"
						:choices="shuffle(choiceSet)"
						@clicked="idx++"
			/>
		</div>

		<button type="reset" @click.prevent="restart">Restart</button>
	</div>
</template>

<script>
	import ButtonReel from './components/ButtonReel';

	export default {
		name: 'App',
		components: {
			ButtonReel
		},
		props: {
			choices: {
				type: Array,
				required: true
			}
		},
		data: () => {
			return {
				idx: 1,
				rate: 10
			};
		},
		methods: {
			restart() {
				this.idx = -1;
				setTimeout(() => this.idx = 1, 100);
			},
			shuffle(arr) {
				for (let itr = arr.length - 1; itr > 0; itr--) {
					const idx = Math.floor(Math.random() * (
						itr + 1
					));
					[arr[itr], arr[idx]] = [arr[idx], arr[itr]];
				}

				return arr;
			}
		}
	};
</script>

<style lang="scss">
	@import './assets/css/index';

	#app {
		align-items: center;
		display: flex;
		flex-flow: column nowrap;
	}

	button {
		display: block;
		margin: 1rem auto;
	}
</style>
