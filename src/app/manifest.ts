import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TaskMaster - Nextjs Example",
    short_name: "TM",
    background_color: "#111827",
    theme_color: "#111827",
    icons:[
      {
        purpose:"maskable",
        sizes:"512x512",
        src:"icon512_maskable.png",
        type:"image/png"
      },
      {
        purpose:"any",
        sizes:"512x512",
        src:"icon512_rounded.png",
        type:"image/png"
      }
    ],
    orientation:"any",
    display:"standalone",
    dir:"auto",
    lang:"es-MX",
    description:"Nextjs example",
    start_url:"/",
    scope:"/"
  };
}