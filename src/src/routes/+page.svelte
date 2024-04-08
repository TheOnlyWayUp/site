<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
</script>

<div class="grid max-w-md place-items-center">
	<div class="p-5">
		<img
			class="max-w-md rounded-md"
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

		<div class="m-4 grid p-5 text-left outline-dashed">
			<a href="https://discord.com/users/876055467678375998" class="tooltip" data-tip="TheOnlyWayUp"
				>Discord (TheOnlyWayUp)</a
			>
			<a href="mailto:dhanush@rambhat.la" class="tooltip" data-tip="dhanush@rambhat.la"
				>Mail (dhanush@rambhat.la)</a
			><a
				href="https://www.linkedin.com/in/dhanush-r-06186524b/"
				class="tooltip"
				data-tip="Dhanush-R">LinkedIn (Dhanush R)</a
			><a href="https://github.com/TheOnlyWayUp" class="tooltip" data-tip="TheOnlyWayUp"
				>GitHub (TheOnlyWayUp)</a
			>
		</div>
	</div>

	<Projects />
</div>

<style>
	a {
		text-decoration: underline;
	}
</style>
