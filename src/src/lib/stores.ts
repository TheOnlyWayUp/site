import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let projects_to_show: Writable<number> = writable(1);