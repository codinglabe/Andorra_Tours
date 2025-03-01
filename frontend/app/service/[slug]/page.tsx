import MultiStepFrom from "@/components/elements/MultiStepFrom";
import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
import Link from "next/link";
const getData = async (slug: string) => {
  const res = await Fetch.get("/services/" + slug);
  return res?.data?.data;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch dynamic SEO data (replace with your actual API endpoint)
  const response = await Fetch.get("/services/" + params?.slug);
  const seoData = (await response?.data?.data) || {};

  return {
    title: seoData.seo_title || "Tours Andorra",
    description:
      seoData.meta_description ||
      "Portal de Actividades / Experiencias #1 en Andorra",
    keywords:
      seoData.meta_tags ||
      "tours andorra, andorra tours, travel andorra, travel, explore andorra,",
    openGraph: {
      title: seoData.seo_title || "Tours Andorra",
      description:
        seoData.meta_description ||
        "Portal de Actividades / Experiencias #1 en Andorra",
      images: [
        "https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png",
      ],
      url: "https://andorra-tours.vercel.app/",
    },
    twitter: {
      title: seoData.seo_title || "Tours Andorra",
      description:
        seoData.meta_description ||
        "Portal de Actividades / Experiencias #1 en Andorra",
      images: [
        "https://api.ownchoose.com/storage/logos/UVjUj1HNq6CfrXQU57QINTJH8abBZ1dxpF7DqNQo.png",
      ],
      card: "summary_large_image",
      creator: "Seba Diaz",
    },
  };
}
export default async function Service({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getData(params?.slug);
  const parsedForm = JSON.parse(service?.form?.form || "[]");
  return (
    <MasterLayout>
      <section className="section-box box-banner-hotel-detai-2">
        <div className="box-banner-hotel-detai-2-inner ">
          <div className="container pt-20 pb-20">
            <h2 className="mb-20 color-white">{service?.service_name}</h2>
            {/* <h6 className="color-white">{heading?.sub_heading}</h6> */}
          </div>
        </div>
      </section>

      <MultiStepFrom parsedForm={parsedForm} />

      <ExclusiveService />

      <Banner />
    </MasterLayout>
  );
}
