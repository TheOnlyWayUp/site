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

		projects = [];
		data.forEach((project: Post) => {
			let content = project.html;

			project.metadata = JSON.parse(
				`{${((content.split('Deployment Data')[1] || '').split('{')[1] || '').split('}')[0]}}`
			);
			projects.push(project);
		});
	});
</script>

<h2 class="text-center font-mono text-2xl underline decoration-double">Projects</h2>
<div class="w-screen">
	<div class="flex flex-col justify-center sm:flex-row sm:flex-wrap">
		{#each projects as project}
			<div
				class="card group m-5 max-w-md flex-none shadow-xl transition-all hover:scale-105"
				class:bg-white={(project.metadata || {}).LiveURL}
				class:bg-slate-100={!(project.metadata || {}).LiveURL}
				transition:fade={{ delay: 100, duration: 100 }}
			>
				{#if project.feature_image}
					<a href={project.url}>
						<figure class="h-40 transition-all group-hover:h-48">
							<img src={project.feature_image} alt={project.feature_image_alt} />
						</figure>
					</a>
				{/if}
				<div class="card-body border-t-info border-4">
					<a class="card-title" href={project.url}>
						{project.title}
					</a>
					<div class="flex space-x-2">
						{#if project.metadata}
							{#if project.metadata.LiveURL}
								<a class="badge badge-secondary p-4" href={project.metadata.LiveURL} target="_blank"
									>Demo</a
								>
							{/if}
							{#if project.metadata.Repository}
								<a
									class="badge badge-primary p-4"
									href={project.metadata.Repository}
									target="_blank">Repository</a
								>
							{/if}
						{/if}
					</div>
					<p
						class="h-fit max-h-40 min-h-20 overflow-hidden"
						style="-webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);"
					>
						<!-- Thanks https://stackoverflow.com/a/73194222/ -->

						{project.excerpt}
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
					<a href={project.url} class="btn group-hover:btn-primary mt-5" target="_blank">Read</a>
				</div>
			</div>
		{/each}
	</div>
</div>
