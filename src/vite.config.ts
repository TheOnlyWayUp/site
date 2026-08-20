import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

let commit = 'dev';
try {
	commit = execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim();
} catch {
	/* not a git checkout (e.g. docker build context) — keep 'dev' */
}

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__COMMIT__: JSON.stringify(commit),
		__BUILT_AT__: JSON.stringify(new Date().toISOString().slice(0, 10))
	}
});
