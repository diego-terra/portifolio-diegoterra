import { createFileRoute } from "@tanstack/react-router";
import { DiegoTerraLanding } from "@/components/DiegoTerraLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diego Terra — Landing pages que convertem" },
      {
        name: "description",
        content:
          "Estúdio de landing pages, sites institucionais e e-commerce. Design sob medida, código rápido e foco total em conversão.",
      },
      { property: "og:title", content: "Diego Terra — Landing pages que convertem" },
      {
        property: "og:description",
        content:
          "Landing pages, sites e e-commerces feitos à mão. Rápidos, precisos e desenhados pra vender.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <DiegoTerraLanding />;
}
