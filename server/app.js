import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema/schema.js';
import {ruruHTML} from 'ruru/server';

const app = express();
app.all('/graphql', createHandler({
    schema
}));

app.get('/', (_req, res) => {
    res.type('html')
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})