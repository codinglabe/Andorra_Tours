import Fetch from '@/helper/Fetch'
import Link from 'next/link'
import React from 'react'
const getData = async () => {
    const res = await Fetch.get("/services")
    const services = res?.data?.data;
    const heading = res?.data?.heading;
    return {services,heading}
}
const ExclusiveService = async () => {
    const {services,heading} = await getData();
    return (
        <section className="section-box box-top-search-destination background-body">
            <div className="container">
                <div className="text-center wow fadeInUp">
                {heading?.heading && <h2 className="neutral-1000 wow fadeInUp">{heading?.heading}</h2>}
                {heading?.heading && <p className="text-xl-medium neutral-500 wow fadeInUp">{heading?.sub_heading}</p>}
                </div>
                <div className="box-list-populars">
                    <div className="row">
                        {
                            services && services?.map((service: any, index: any) =>(
                                <div key={index} className="col-lg-3 col-sm-6">
                                    <div className="card-popular card-top-destination background-card wow fadeInUp">
                                        <div className="card-image"> <img src={process?.env?.NEXT_PUBLIC_STORAGE_URL + service?.service_image} alt="Travila" /></div>
                                        <div className="card-info"> <Link className="card-title" href={"/service/"+service?.slug}>{service?.service_name}</Link>
                                            <div className="card-meta">
                                                <div className="meta-links"> <Link className="text-tour" href={"/service/"+service?.slug}>{service?.total_services} Tours</Link></div>
                                                <div className="card-button"> <Link href={"/service/"+service?.slug}>
                                                    <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg></Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExclusiveService