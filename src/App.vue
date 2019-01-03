<template>
	<div id="app">
		<header>
			<h1>New Year&rsquo;s Resolution <span>Generator</span></h1>

			<p>By <a href="https://jasongardner.co">Jason</a><br><em>Source code available on <a
					href="#">GitHub</a></em></p>
		</header>

		<main>
			<form :class="{'finished': finished}">
				<fieldset>
					<legend>In
						<time :datetime="year">{{ year }}</time>
						I will&hellip;
					</legend>

					<TransitionGroup name="button" tag="div">
						<ButtonReel v-for="(choiceSet, itr) in choices"
									v-if="idx > itr"
									:key="itr"
									:speed="Math.max(10, rate * (choices.length - itr))"
									:choices="shuffle(choiceSet)"
									:description="'Press to select your resolution randomly'"
									:randomize="choiceSet.length < 20"
									class="btn"
									@stopped="advance"
						/>
					</TransitionGroup>
				</fieldset>

				<Transition name="fade">
					<button v-if="idx > 1"
							class="btn" type="reset"
							@click.prevent="restart">
						Restart
					</button>
				</Transition>
			</form>
		</main>

		<Transition name="fade">
			<section v-if="history.length" id="history">
				<h1>My <time :datetime="year">{{ year }}</time> Resolutions</h1>

				<ol>
					<li v-for="(resolution, itr) in history" :key="itr">
						{{ resolution }}
					</li>
				</ol>
			</section>
		</Transition>
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
		data() {
			return {
				year: (new Date()).getFullYear(),
				history: [],
				currentResolution: [],
				idx: 1,
				rate: 10,
				finished: false
			};
		},
		methods: {
			advance(text) {
				++this.idx;
				this.currentResolution.push(`${text}`.trim());
				this.finished = this.currentResolution.length === this.choices.length;

				if (this.finished) {
					this.history.push(this.currentResolution.join(' '));
				}
			},
			restart() {
				this.finished = false;
				this.currentResolution = [];
				this.idx = -1;

				setTimeout(() => (
					this.idx = 1
				), 100);
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

	.button-enter,
	.button-leave-to {
		opacity: 0;
	}

	.button-enter-active,
	.button-leave-active {
		transition: all .3s, opacity .3s ease-out;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>

<style lang="scss" scoped>
	#app {
		box-sizing: border-box;
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		min-height: 100vh;
		width: 100%;

		header {
			background-color: var(--color-background-header, black);
			box-sizing: border-box;
			color: white;
			padding: 0 var(--size-base) var(--size-base);

			p {
				font: 300 .825rem var(--font-family-serif);
			}
		}

		h1 {
			font: 800 2rem/1.125 var(--font-family-title);
			text-transform: uppercase;

			span {
				color: var(--color-title-accent, gold);
				display: block;
				letter-spacing: .125em;
			}
		}

		a {
			color: currentColor;
			font-weight: bold;
			text-decoration: none;
		}
	}

	main {
		flex: 1;
		padding: var(--size-base);
	}

	legend {
		border-bottom: 2px solid currentColor;
		font: bolder 1.5rem/2 var(--font-family-serif);
		width: 100%;
	}

	fieldset {
		border: 0;
		flex: 1;
		margin-top: var(--size-base);
		padding: 0;

		> div {
			align-items: center;
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			padding-top: var(--size-base);
		}

		.btn {
			font-size: 3rem;
			height: calc(3 * var(--size-base) + 3rem);
			margin: 0;
			overflow: hidden;
			word-wrap: normal;
			text-align: center;
			width: 100%;

			&:disabled {
				width: max-content;
			}
		}
	}

	.btn:disabled {
		display: inline-block;
		padding-left: 0;
		padding-right: .45em;
		text-align: left;
	}

	.btn[type='reset'] {
		font-size: 1rem;
		font-weight: normal;
		letter-spacing: .125em;
		margin: var(--size-base) 0 var(--size-base) auto;
		text-transform: uppercase;
	}

	.finished fieldset {
		border-bottom: 2px solid currentColor;
		padding-bottom: var(--size-base);
		padding-top: 0;

		.btn {
			font-size: 4rem;
			font-style: normal;
			padding-bottom: 0;
			padding-top: 0;
			width: auto;
		}
	}

	#history {
		background-color: var(--color-background-secondary);
		box-sizing: border-box;
		padding: var(--size-base) calc(2 * var(--size-base));

		h1 {
			font: bold 1.125rem/1.5 var(--font-family-serif);
			font-style: italic;
			text-transform: uppercase;
		}

		ol,
		ul {
			margin-top: 0;
			padding-left: 0;
		}

		li:focus {
			text-decoration: line-through;
		}
	}
</style>
