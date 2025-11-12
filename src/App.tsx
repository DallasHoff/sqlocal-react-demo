import { useReactiveQuery } from 'sqlocal/react';
import { db } from './sqlocal/client';
import type { FormEvent } from 'react';

type Item = { id: number; title: string | null; checked: number };

async function add() {
	await db.sql`INSERT INTO items ('title') VALUES ('')`;
}

async function remove(item: Item) {
	await db.sql`DELETE FROM items WHERE id=${item.id}`;
}

async function toggle(item: Item) {
	await db.sql`UPDATE items SET checked=${item.checked ? 0 : 1} WHERE id=${item.id}`;
}

async function edit(item: Item, event: FormEvent<HTMLInputElement>) {
	const title =
		event.target instanceof HTMLInputElement ? event.target.value : '';
	await db.sql`UPDATE items SET title=${title} WHERE id=${item.id}`;
}

export default function App() {
	const { data: items } = useReactiveQuery<Item>(
		db,
		(sql) => sql`SELECT * FROM items`,
	);

	return (
		<>
			<main className="min-w-60 px-8 py-12">
				<h1 className="text-4xl text-center">To Do</h1>
				<ul className="list max-w-100 mx-auto bg-base-200 rounded-box shadow-md my-6">
					{items.map((item) => (
						<li key={item.id} className="list-row items-center">
							<div>
								<input
									type="checkbox"
									className="checkbox checkbox-lg checkbox-primary"
									checked={!!item.checked}
									onChange={() => toggle(item)}
								/>
							</div>
							<div>
								<input
									type="text"
									className="input input-ghost"
									value={item.title ?? ''}
									onInput={(event) => edit(item, event)}
								/>
							</div>
							<div>
								<button
									type="button"
									className="btn btn-sm btn-square btn-soft btn-primary over:btn-error text-lg"
									onClick={() => remove(item)}
								>
									&times;
								</button>
							</div>
						</li>
					))}
				</ul>
				<div className="flex justify-center">
					<button
						type="button"
						className="btn btn-wide btn-primary"
						onClick={() => add()}
					>
						<span className="text-lg mb-0.5">+</span>
						New
					</button>
				</div>
			</main>
		</>
	);
}
