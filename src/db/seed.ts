import { seed, reset } from 'drizzle-seed';
import { db } from './connection.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await seed(db, schema).refine((f) => ({
  rooms: {
    columns: {
      name:  f.fullName(),
      description: f.loremIpsum()
    },
    count: 10,
  },
  questions: {
    count: 10,
  }
}));

console.log('Seeding complete!');

process.exit();