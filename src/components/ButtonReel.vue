<template>
	<button :disabled="!!disabled" @click="clicked" type="button">{{ text || title }}</button>
</template>

<script>
	export default {
		name: 'ButtonReel',
		props: {
			choices: {
				type: Array,
				required: true,
				validator: val =>
					Array.isArray(val) &&
					val.length === val.filter(v => typeof v === 'string').length,
				default: () => []
			},
			disabled: {
				type: Boolean,
				default: false
			},
			speed: {
				type: Number,
				validator: val => val > 1,
				default: 200
			},
			title: {
				type: String,
				default: 'Loading...'
			}
		},
		data: () => {
			return {
				clicks: 0,
				text: undefined,
				interval: undefined
			}
		},
		methods: {
			clicked() {
				this.clicks++;
				this.$emit('clicked') ;
				this.stop();
			},
			random() {
				return this.choices[Math.floor(Math.random() * this.choices.length)];
			},
			stop() {
				clearInterval(this.interval);
			}
		},
		mounted() {
			this.text = this.title || this.random();

			if (this.disabled) {
				return;
			}

			this.interval = setInterval(() => {
				this.text = this.random()
			}, this.speed || 100);
		},
		destroyed() {
			this.stop();
		}
	};
</script>

<style lang="scss" scoped>
	$btn-width: 33vw;

	button {
		font-size: 3rem;
		width: $btn-width;
	}
</style>
