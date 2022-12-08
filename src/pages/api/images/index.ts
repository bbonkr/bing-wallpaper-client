// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Fetcher } from '../../../lib/Fetcher';
import {
    ImageItemModelPagedModelApiResponseModel,
    ImagesApi,
    ObjectApiResponseModel,
} from '../../../sdk';

// export default
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        ImageItemModelPagedModelApiResponseModel | ObjectApiResponseModel
    >,
) {
    const { page, take } = req.query;

    let pageValue = 1;
    if (typeof page === 'string') {
        pageValue = parseInt(page, 10);
    }
    let takeValue = 10;
    if (typeof take === 'string') {
        takeValue = parseInt(take, 10);
    }

    const { axiosInstance, baseUrl, configuration } = new Fetcher();

    var response = await new ImagesApi(
        configuration,
        baseUrl,
        axiosInstance,
    ).apiv10ImagesGetAll({
        page: pageValue,
        take: takeValue,
    });

    const status = response.status;
    let data: ImageItemModelPagedModelApiResponseModel | ObjectApiResponseModel;
    if (status >= 200 && status < 300) {
        data = response.data;
    } else {
        data = response.data as ObjectApiResponseModel;
    }

    res.status(status).send(data);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {};
