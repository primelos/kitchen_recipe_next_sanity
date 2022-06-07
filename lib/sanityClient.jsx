import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import createImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "g970qf5m",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const usePreviewPrescription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = (props) => (
  <PortableTextComponent components={{}} {...props} />
);

// ANOTHER PROJECT SETUP
// export const client = sanityClient({
//   projectId: "g970qf5m",
//   dataset: "production",
//   apiVersion: "2021-03-25",
//   token:
//     "skeepdvPzh05eFUGOs1ZroupGFJjWFohQyElxlkU16yirxoLCg5FeTid7wIttHyDG9ou2Rulg5yCAi6xDfgJSzlxi8N03pSxEcF8QQOts8Kyfx5jv0Be4YoQmoiKswV3SESCVW0QEdMO0NDOJAtSX2eIjZHzovT2eNnYbPu8aJVLuiw61tsm",
//   useCdn: false,
// });
