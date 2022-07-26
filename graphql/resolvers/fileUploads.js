import { finished } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export default {
    Mutation: {
        async uploadFile(parent, { file }) {
            const { createReadStream, filename, mimetype, encoding } = await file;

            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const pathName = path.join(__dirname, `../../public/images/${filename}`);

            const out = fs.createWriteStream(pathName);
            stream.pipe(out);
            await finished(out);

            return { 
                url: `http://localhost:5000/images/${filename}`
             };
        },
    },
}
