<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import { getUser } from '$lib/remote/user.remote';

	let error = $state('');
	let loading = $state(false);

	const login = async (e: Event) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const email = form.email.value;
		const password = form.password.value;

		if (!email || !password) {
			error = 'All fields are required';
			return;
		}

		loading = true;
		error = '';

		await authClient.signIn.email(
			{ email, password },
			{
				onSuccess: async () => {
					getUser().refresh();
					goto(resolve('/__dashboard'));
				},
				onError: (ctx) => {
					error = ctx.error.message ?? 'Login failed';
					loading = false;
				}
			}
		);
	};
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body gap-4">
		<h2 class="card-title text-xl">Sign in to your account</h2>

		<form onsubmit={login} class="flex flex-col gap-3">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Email</span>
				</div>
				<input
					required
					type="email"
					id="email"
					placeholder="you@example.com"
					class="input-bordered input w-full"
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<input
					required
					type="password"
					id="password"
					placeholder="••••••••"
					class="input-bordered input w-full"
				/>
			</label>

			{#if error}
				<div role="alert" class="alert py-2 text-sm alert-error">
					<span>{error}</span>
				</div>
			{/if}

			<button type="submit" class="btn mt-1 w-full btn-primary" disabled={loading}>
				{#if loading}
					<span class="loading loading-sm loading-spinner"></span>
				{/if}
				Sign in
			</button>
		</form>

		<p class="text-center text-sm text-base-content/60">
			Don't have an account?
			<a href={resolve('/auth/signup')} class="link font-medium link-primary">Sign up</a>
		</p>
	</div>
</div>
