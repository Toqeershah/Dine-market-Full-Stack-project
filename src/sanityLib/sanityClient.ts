//this client file make connection between Sanity & Next.Js
import { createClient } from "next-sanity";

//import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion: "2023-09-18",
  dataset: "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: true, //to save data in Cdn or server
})
