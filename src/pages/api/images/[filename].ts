// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Fetcher } from '../../../lib/Fetcher';
import { FilesApi, ObjectApiResponseModel } from '../../../sdk';
import fs from 'fs';
import path from 'path';

const handleCachedResponse = async (
    cacheDirectoryPath: string,
    res: NextApiResponse<unknown>,
) => {
    const fileNames = fs.readdirSync(cacheDirectoryPath);
    if (fileNames && fileNames.length > 0) {
        const readStream = fs.createReadStream(fileNames[0]);

        readStream.pipe(res);

        res.status(200);
    } else {
        throw new Error('File not found');
    }
};

const handleResponse = async (
    fileName: string,
    type: string,
    cache: boolean,
    res: NextApiResponse<unknown>,
) => {
    const { axiosInstance, baseUrl, configuration } = new Fetcher({
        axiosConfig: {
            responseType: 'stream',
        },
    });

    var response = await new FilesApi(
        configuration,
        baseUrl,
        axiosInstance,
    ).apiv10FilesGetFileByFileName({
        fileName,
        type,
    });

    const status = response.status;

    if (status >= 200 && status < 300) {
        const data = response.data as any;

        const contentDisposition = response.headers['content-disposition'];

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Length', response.headers['content-length']);
        res.setHeader('Content-Disposition', contentDisposition);
        res.setHeader('Cache-Control', response.headers['cache-control']);

        if (cache) {
            let serverFileName = '';
            if (contentDisposition) {
                contentDisposition.split(';').forEach((token) => {
                    if (token.trim().startsWith('filename=')) {
                        const tokens = token.trim().split('=');
                        serverFileName = tokens[1].trim();
                    }
                });
            }
            const fileDirectoryTokens = [
                __dirname,
                'image-cache',
                fileName,
                type,
            ].filter(Boolean);

            const fileDirectory = path.join(...fileDirectoryTokens);

            const filePath = path.join(fileDirectory, serverFileName);
            console.info('serverFileName', contentDisposition);
            console.info('fileDirectory:', fileDirectory);
            console.info('filePath', filePath);

            if (!fs.existsSync(fileDirectory)) {
                fs.mkdirSync(fileDirectory, { recursive: true });
            }

            if (!fs.existsSync(filePath)) {
                const writeStream = fs.createWriteStream(filePath);

                (response.data as fs.ReadStream).pipe(writeStream);
            }
        }

        res.status(status).send(data);
    } else {
        const data = response.data as ObjectApiResponseModel;
        res.status(status).send(data);
    }
};

// export default
async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
    const { filename, type } = req.query;

    let filenameValue = '';
    let typeValue = '';
    if (typeof filename === 'string') {
        filenameValue = filename.toLowerCase();
    }
    if (typeof type === 'string') {
        typeValue = type.toLowerCase();
    }

    // await handleResponse(filenameValue, typeValue, false, res);

    const filePathTokens = [
        __dirname,
        'image-cache',
        filenameValue.toLowerCase(),
        typeValue.toLowerCase(),
    ].filter(Boolean);

    const cacheDirectoryPath = path.join(...filePathTokens);

    if (!fs.existsSync(cacheDirectoryPath)) {
        await handleResponse(filenameValue, typeValue, true, res);
    } else {
        try {
            await handleCachedResponse(cacheDirectoryPath, res);
        } catch {
            await handleResponse(filenameValue, typeValue, true, res);
        }
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {};
