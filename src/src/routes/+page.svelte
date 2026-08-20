<script lang="ts">
	import { onMount } from 'svelte';
	import GhostContentAPI from '@tryghost/content-api';
	import repos from '$lib/data/repos.json';

	// ---- data ------------------------------------------------------------

	const links = [
		{ label: 'github', href: 'https://github.com/TheOnlyWayUp', hint: 'TheOnlyWayUp' },
		{ label: 'blog', href: 'https://blog.rambhat.la', hint: 'blog.rambhat.la' },
		{ label: 'mail', href: 'mailto:dhanush@rambhat.la', hint: 'dhanush@rambhat.la' },
		{
			label: 'linkedin',
			href: 'https://www.linkedin.com/in/dhanush-r-06186524b/',
			hint: 'Dhanush R'
		},
		{
			label: 'discord',
			href: 'https://discord.com/users/876055467678375998',
			hint: 'TheOnlyWayUp'
		},
		{ label: 'cv.pdf', href: '/cv.pdf', hint: 'resume' }
	];

	const projects = [
		{
			name: 'Audora',
			desc: 'Turns fiction into audiobooks where every character speaks with their own voice — casting, performance, and audio pipeline built from scratch.',
			meta: 'YC S26 · founder',
			links: [{ label: 'live', href: 'https://audora.art' }]
		},
		{
			name: 'WP Archive',
			desc: 'Digital book archival platform. Crossed 1,000,000 visits in March 2025 alone; ML-based recommendations used by 4,000+ readers.',
			meta: '2023 — present',
			links: [
				{ label: 'live', href: 'https://wpd.my' },
				{ label: 'repo ★314', href: 'https://github.com/TheOnlyWayUp/WattpadDownloader' }
			]
		},
		{
			name: 'Case Search',
			desc: 'Semantic search over 1.7M Indian court case proceedings — lawyers query in natural language instead of keywords, in real time.',
			meta: 'used by legal professionals',
			links: []
		},
		{
			name: 'API wrappers & dev tooling',
			desc: 'Async-first libraries in Python and Rust, 65,000+ downloads over 4 years: wattpad-py, wattpad-rs, mcstalker, async-animanga, discord-colorize.',
			meta: 'python · rust',
			links: [
				{ label: 'wattpad-py docs', href: 'https://wattpad-py.readthedocs.io/en/latest/' },
				{ label: 'crates.io/wattpad-rs', href: 'https://crates.io/crates/wattpad-rs' },
				{ label: 'repo ★12', href: 'https://github.com/TheOnlyWayUp/Wattpad-Py' }
			]
		},
		{
			name: 'MC Tracker',
			desc: 'Minecraft server analytics platform. 500,000+ views in its first 3 months, $2,000 in sponsorships. Built the SDK and backend.',
			meta: 'co-founder · 2021-22',
			links: []
		},
		{
			name: 'Tapas',
			desc: 'WhatsApp AI study assistant — forwards in documents and messages, get deadlines, answers, and study plans back.',
			meta: '2nd place, CHIREC Hackathon 2025',
			links: []
		},
		{
			name: 'YouTube QnA',
			desc: 'Chatbot that answers from YouTube as a knowledge base, grounded in specific timestamped references instead of hallucinations.',
			meta: '2023',
			links: [{ label: 'repo', href: 'https://github.com/TheOnlyWayUp/youtube-qna' }]
		},
		{
			name: 'PanchangamLite',
			desc: 'Vedic astrology timing calculator, originally built for family. 300+ monthly users.',
			meta: 'svelte',
			links: [
				{ label: 'live', href: 'https://panchangam.rambhat.la' },
				{ label: 'repo', href: 'https://github.com/TheOnlyWayUp/PanchangamLite' }
			]
		},
		{
			name: 'WP-DM-Export',
			desc: 'When Wattpad announced all DMs would be deleted, built an exporter so people could save theirs before the purge.',
			meta: '2024',
			links: [
				{ label: 'live', href: 'https://export.towu.dev' },
				{ label: 'repo', href: 'https://github.com/TheOnlyWayUp/WP-DM-Export' }
			]
		}
	];

	const disclosures = [
		{
			target: 'TRW',
			text: 'authentication vulnerability in Andrew Tate’s "The Real World" platform, exposing 230GB+ of data'
		},
		{
			target: 'Cognita',
			text: 'global misconfiguration exposing data of 70,000+ student accounts — coordinated disclosure and fix'
		},
		{
			target: 'Shott.in',
			text: 'payment gateway bypass enabling arbitrary pricing and free purchases — responsibly disclosed'
		},
		{
			target: 'school infra',
			text: 'Microsoft account takeover vulnerability, led to policy changes'
		}
	];

	const oss = [
		'1,200+ open-source contributions across 2023-2024',
		'LangChain, cal.com, Meta’s Audiocraft, daisyUI, koreader-calibre-plugin',
		'maintainer of libraries at 10,000-20,000+ downloads each'
	];

	// ---- latest writing (Ghost, graceful fail) ----------------------------

	type PostLite = { title: string; url: string; published_at: string };
	let posts: PostLite[] = [];

	onMount(async () => {
		try {
			const api = new GhostContentAPI({
				url: 'https://blog.rambhat.la',
				key: 'f9d45845ed380101caa340e6b8',
				version: 'v5.5'
			});
			const data = await api.posts.browse({ limit: 4 });
			posts = data.map((p: PostLite) => ({
				title: p.title,
				url: p.url,
				published_at: p.published_at
			}));
		} catch {
			/* blog unreachable — section just stays hidden */
		}
	});

	const fmtDate = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });

	const activeRepos = repos.filter((r) => !r.archived);
	const archivedRepos = repos.filter((r) => r.archived);

	// github-derived stats (baked from the live API at build time)
	const totalStars = repos.reduce((s, r) => s + r.stars, 0);
	const langCounts: [string, number][] = Object.entries(
		repos.reduce(
			(m, r) => {
				if (r.lang) m[r.lang] = (m[r.lang] ?? 0) + 1;
				return m;
			},
			{} as Record<string, number>
		)
	)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5);
	const maxLang = langCounts[0]?.[1] ?? 1;
	const bar = (n: number) => '█'.repeat(Math.max(1, Math.round((n / maxLang) * 16)));
</script>

<main class="mx-auto max-w-2xl px-5 py-14 text-[15px] leading-relaxed">
	<!-- hero -->
	<section>
		<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> whoami</p>
		<h1 class="mt-3 text-3xl font-bold tracking-tight">Dhanush Rambhatla</h1>
		<p class="text-[color:var(--dim)]">@TheOnlyWayUp · Hyderabad, India</p>
		<p class="mt-4">
			I build large-scale systems, break things responsibly, and
			<a href="https://blog.rambhat.la">write about it</a>. Currently: founder at
			<a href="https://audora.art" target="_blank" rel="noreferrer">Audora</a>
			<span class="text-[color:var(--accent)]">(YC S26)</span> — audiobooks for fiction, where
			every character has their own voice — and archival infrastructure at
			<a href="https://wpd.my" target="_blank" rel="noreferrer">WP Archive</a> (1M+ visits/month).
		</p>

		<ul class="mt-5 flex flex-wrap gap-x-4 gap-y-1">
			{#each links as l}
				<li>
					<a
						class="link-chip"
						href={l.href}
						target={l.href.startsWith('http') ? '_blank' : undefined}
						rel="noreferrer"
						title={l.hint}>[{l.label}]</a
					>
				</li>
			{/each}
		</ul>
	</section>

	<!-- projects -->
	<section class="mt-14">
		<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> ls projects/ --sort=impact</p>
		<ul class="mt-4 space-y-5">
			{#each projects as p}
				<li class="border-l-2 border-[color:var(--border)] pl-4 transition-colors hover:border-[color:var(--accent)]">
					<div class="flex flex-wrap items-baseline gap-x-3">
						<span class="font-bold text-[color:var(--accent)]">{p.name}</span>
						<span class="text-xs text-[color:var(--dim)]">{p.meta}</span>
					</div>
					<p class="mt-1 text-[color:var(--text)]">{p.desc}</p>
					{#if p.links.length}
						<p class="mt-1 space-x-3 text-sm">
							{#each p.links as pl}
								<a href={pl.href} target="_blank" rel="noreferrer">{pl.label} ↗</a>
							{/each}
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<!-- security -->
	<section class="mt-14">
		<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> cat disclosures.log</p>
		<ul class="mt-4 space-y-2">
			{#each disclosures as d}
				<li class="grid grid-cols-[7.5rem_1fr] gap-2">
					<span class="text-right text-[color:var(--accent-dim)]">{d.target}</span>
					<span>{d.text}</span>
				</li>
			{/each}
		</ul>
		<p class="mt-3 text-sm text-[color:var(--dim)]">
			all found ethically, all disclosed responsibly. if I broke your thing, I probably also told
			you how to fix it.
		</p>
	</section>

	<!-- github -->
	<section class="mt-14">
		<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> gh stats</p>
		<p class="mt-4">
			<a href="https://github.com/TheOnlyWayUp" target="_blank" rel="noreferrer">@TheOnlyWayUp</a>
			since 2020 · <span class="text-[color:var(--accent)]">★{totalStars}</span> across
			{repos.length} original repos · 153 followers
		</p>
		<div class="mt-3 space-y-0.5 text-sm">
			{#each langCounts as [lang, count]}
				<p class="whitespace-nowrap">
					<span class="inline-block w-24 text-[color:var(--dim)]"
						>{lang === 'Jupyter Notebook' ? 'jupyter' : lang.toLowerCase()}</span
					>
					<span class="text-[color:var(--accent-dim)]">{bar(count)}</span>
					<span class="text-[color:var(--dim)]"> {count}</span>
				</p>
			{/each}
		</div>
		<p class="mt-3 text-sm text-[color:var(--dim)]">
			currently learning rust. yes, I refactor every 3 business days — how did you know?
		</p>

		<p class="prompt mt-8">~/towu <span class="text-[color:var(--accent)]">$</span> git shortlog --open-source</p>
		<ul class="mt-4 list-inside space-y-1">
			{#each oss as line}
				<li><span class="text-[color:var(--accent-dim)]">*</span> {line}</li>
			{/each}
		</ul>

		<details class="mt-4 group">
			<summary
				class="cursor-pointer text-sm text-[color:var(--dim)] transition-colors hover:text-[color:var(--accent)]"
				>show all {activeRepos.length} public repos ({archivedRepos.length} archived hidden) →</summary
			>
			<div class="mt-3 overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead class="text-[color:var(--dim)]">
						<tr><th class="pr-3 font-normal">repo</th><th class="pr-3 font-normal">★</th><th class="pr-3 font-normal">lang</th><th class="font-normal">last push</th></tr>
					</thead>
					<tbody>
						{#each activeRepos as r}
							<tr class="border-t border-[color:var(--border)] align-top">
								<td class="py-1 pr-3"
									><a href={'https://github.com/TheOnlyWayUp/' + r.name} target="_blank" rel="noreferrer"
										>{r.name}</a
									></td
								>
								<td class="py-1 pr-3 text-[color:var(--dim)]">{r.stars}</td>
								<td class="py-1 pr-3 text-[color:var(--dim)]">{r.lang ?? '—'}</td>
								<td class="py-1 text-[color:var(--dim)]">{r.pushed}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</details>
	</section>

	<!-- writing -->
	{#if posts.length}
		<section class="mt-14">
			<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> tail -n {posts.length} writing/</p>
			<ul class="mt-4 space-y-2">
				{#each posts as post}
					<li class="flex flex-wrap items-baseline gap-x-3">
						<span class="text-xs text-[color:var(--dim)]">{fmtDate(post.published_at)}</span>
						<a href={post.url} target="_blank" rel="noreferrer">{post.title}</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- friends / 88x31 — being curated -->
	<section class="mt-14">
		<p class="prompt">~/towu <span class="text-[color:var(--accent)]">$</span> ls friends/</p>
		<p class="mt-4 text-[color:var(--dim)]">
			ls: the 88x31 wall is being re-hung. <span class="text-[color:var(--accent)]">check back soon.</span>
		</p>
	</section>

	<!-- footer -->
	<footer class="mt-16 border-t border-[color:var(--border)] pt-4 text-xs text-[color:var(--dim)]">
		<p>
			© {new Date().getFullYear()} Dhanush Rambhatla · built with SvelteKit ·
			<a
				href="https://github.com/TheOnlyWayUp/site"
				target="_blank"
				rel="noreferrer">source</a
			>
			· commit <span class="text-[color:var(--accent-dim)]">{__COMMIT__}</span> ({__BUILT_AT__})
		</p>
		<p class="mt-1">no cookies, no trackers — just self-hosted, anonymous page counts.</p>
	</footer>
</main>

<style lang="postcss">
	.prompt {
		@apply text-sm text-[color:var(--dim)];
	}

	a {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: var(--accent-dim);
		text-underline-offset: 3px;
	}

	a:hover {
		text-decoration-color: var(--accent);
	}

	.link-chip {
		text-decoration: none;
		color: var(--text);
	}

	.link-chip:hover {
		color: var(--accent);
	}
</style>
