<template>
	<button :disabled="!!isDisabled"
			:type="type"
			:aria-label="description"
			class="btn"
			@click="clicked">
		<span>{{ text || label }}</span>
	</button>
</template>

<script>
	export default {
		name: 'ButtonReel',
		props: {
			choices: {
				type: Array,
				required: true,
				default: () => [],
				validator: val => Array.isArray(val) && val.length === val.filter(v => typeof v === 'string').length,
			},
			disabled: {
				type: Boolean,
				default: false
			},
			speed: {
				type: Number,
				default: 200,
				validator: val => val > 1
			},
			label: {
				type: String,
				default: 'Loading...'
			},
			type: {
				type: String,
				default: 'button',
				validator: val => ['button', 'submit', 'reset'].includes(val)
			},
			description: {
				type: String,
				default: 'Press to stop',
				required: false
			},
			randomize: {
				type: Boolean,
				default: true,
				required: false
			}
		},
		data() {
			return {
				isDisabled: this.disabled || false,
				clicks: 0,
				text: undefined,
				interval: undefined
			};
		},
		destroyed() {
			this.stop();
		},
		mounted() {
			this.text = this.label || this.random();

			if (this.isDisabled) {
				return;
			}

			let idx = 0,
				fn = (() => this.text = this.random());

			if (!this.randomize) {
				fn = (() => {
					if (idx >= length) {
						idx = 0;
					}

					this.text = this.choices[idx];

					idx++;
				});
			}

			const length = this.choices.length;

			this.interval = setInterval(fn, this.speed || 100);
		},
		methods: {
			clicked() {
				if (this.interval) {
					this.$emit('stopped', `${this.text}`);
				}

				this.stop();
			},
			random() {
				return this.choices[Math.floor(Math.random() * this.choices.length)];
			},
			stop() {
				this.isDisabled = true;
				clearInterval(this.interval);
			}
		}
	};
</script>
