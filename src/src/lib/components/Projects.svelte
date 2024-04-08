<script lang="ts">
	import GhostContentAPI from '@tryghost/content-api';
	import type { Post, PostMetadata } from '$lib/types/Post';
	import { projects_to_show } from '$lib/stores';
	import { fade } from 'svelte/transition';

	import { onMount } from 'svelte';
	const api = new GhostContentAPI({
		url: 'https://blog.rambhat.la',
		key: 'f9d45845ed380101caa340e6b8',
		version: 'v5.5'
	});

	let projects: Array<Post> = [];

	onMount(async () => {
		console.log('om');

		let data = await api.posts.browse({
			include: 'tags,authors',
			filter: 'tag:projects' // Thanks https://github.com/TryGhost/Ghost/issues/12299#issuecomment-729349475
		});

		// projects = [];
		// data.forEach((project: Post) => {
		// 	project.metadata = JSON.parse(project.excerpt);
		// 	projects.push(project);
		// });
		projects = data;
	});
</script>

<h2 class="text-center font-mono text-2xl underline decoration-double">Projects</h2>
<div class="w-screen">
	<div class="flex flex-col justify-center sm:flex-row sm:flex-wrap">
		{#each projects as project}
			<div
				class="card m-5 max-w-md flex-none bg-white shadow-xl"
				transition:fade={{ delay: 100, duration: 100 }}
			>
				{#if project.feature_image}
					<figure class="border-b-primary h-40 border">
						<img src={project.feature_image} alt={project.feature_image_alt} />
					</figure>
				{/if}
				<div class="card-body">
					<h2 class="card-title">
						{project.title}
					</h2>
					<p
						class="h-40 overflow-hidden"
						style="-webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);"
					>
						<!-- Thanks https://stackoverflow.com/a/73194222/ -->

						{@html project.html}
					</p>
					<div class="card-actions justify-end">
						{#each project.tags || [] as tag}
							{#if !tag.name.startsWith('#') || tag.name == 'projects'}
								<a class="badge badge-outline hover:badge-info p-4" href={tag.url}>
									<span class="hover:text-white">{tag.name}</span>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
