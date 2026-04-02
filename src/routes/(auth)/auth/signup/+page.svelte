<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import { getUser } from '$lib/remote/user.remote';

	let error = $state('');
	let loading = $state(false);

	const signup = async (e: Event) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const username = form.username.value;
		const email = form.email.value;
		const password = form.password.value;
		const passwordConf = form.password_confirm.value;

		if (!username || !email || !password || !passwordConf) {
			error = 'All fields are required';
			return;
		}

		if (password !== passwordConf) {
			error = "Passwords don't match";
			return;
		}

		loading = true;
		error = '';

		await authClient.signUp.email(
			{ email, password, name: username },
			{
				onSuccess: async () => {
					getUser().refresh();
					goto(resolve('/__dashboard'));
				},
				onError: (ctx) => {
					error = ctx.error.message ?? 'Sign up failed';
					loading = false;
				}
			}
		);
	};
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body gap-4">
		<h2 class="card-title text-xl">Create an account</h2>

		<form onsubmit={signup} class="flex flex-col gap-3">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Username</span>
				</div>
				<input
					required
					type="text"
					id="username"
					placeholder="yourname"
					class="input-bordered input w-full"
				/>
			</label>

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

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Confirm Password</span>
				</div>
				<input
					required
					type="password"
					id="password_confirm"
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
				Create account
			</button>
		</form>

		<p class="text-center text-sm text-base-content/60">
			Already have an account?
			<a href={resolve('/auth/login')} class="link font-medium link-primary">Sign in</a>
		</p>
	</div>
</div>
