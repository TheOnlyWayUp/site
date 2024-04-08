<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
</script>

<div class="grid w-screen place-items-center">
	<div class="p-5">
		<img
			class="rounded-md"
			src="https://raw.githubusercontent.com/DenverCoder1/minimalistic-wallpaper-collection/main/images/rmradev-peaceful-lake.png"
			alt="background"
		/>
		<h1 class="text-primary-content text-3xl font-bold">Dhanush Rambhatla</h1>
		<h2 class="font-mono text-xl font-semibold">@TheOnlyWayUp</h2>
		<p class="py-2 text-xl">
			I like to <a
				class="!decoration-info font-semibold"
				href="https://github.com/TheOnlyWayUp"
				target="_blank">build things</a
			>
			and
			<a class="!decoration-info font-semibold" href="https://blog.rambhat.la">write about them</a>.
		</p>

		<div class="m-4 p-5 text-left outline-dashed">
			<p>Discord: TheOnlyWayUp</p>
			<p>Email: dhanush@rambhat.la</p>
		</div>
	</div>

	<Projects />
</div>

<style>
	a {
		text-decoration: underline;
	}
</style>
