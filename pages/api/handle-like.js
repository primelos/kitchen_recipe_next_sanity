import { sanityClient } from "../../lib/sanityClient";

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN,
});

export default async function likeButtonHandler(req, res) {
  const { _id } = JSON.parse(req.body);
  const dataApi = await sanityClient
    .patch(_id)
    .setIfMissing({ likes: 0 })
    .inc({ likes: 1 })
    .commit()
    .catch((error) => console.log(error));
  res.status(200).json({ likes: dataApi.likes });
}
