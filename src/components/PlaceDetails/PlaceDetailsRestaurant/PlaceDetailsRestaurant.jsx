import { useEffect, useState } from 'react'
import './PlaceDetailsRestaurant.css'
import { CiLocationOn } from "react-icons/ci";
import PhotoSlider from './../../../shared/PhotoSlider/PhotoSlider'
import { FaBookOpen } from 'react-icons/fa';
import SectionRating from '../../../shared/SectionRating/SectionRating';
import ServiceSection from './../../../shared/ServiceSection/ServiceSection'
import ContactSection from './../../../shared/ContactSection/ContactSection'
import GetRateStars from '../../../shared/GetRateStars/GetRateStars';
import Button from '../../../shared/Button/Button';
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { CiParking1 } from "react-icons/ci";
import { BsAirplane } from "react-icons/bs";
import { IoWifiSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom"
import * as restaurantServices from '../../../helpers/RestaurantsServices/RestaurantsServices';
import { mainURL } from '../../../helpers/ExploreServices/ExploreURLs';
import React from 'react'
import img from '../../../assets/images/betalwai2.png'
function PlaceDetailsRestaurant() {

    const { id } = useParams();
    const [restuarant, setRestuarant] = useState();
    const [loading, setLoading] = useState(false);
    const [restuarantImages, setImages] = useState([]);
    const navigate = useNavigate();

    const restuarantServices = [
        {
            title: 'مسبح و أنشطة أطفال',
            icon: <LiaSwimmingPoolSolid />,
        },
        {
            title: 'انتظار مجاني للسيارات',
            icon: <CiParking1 />,
        },
        {
            title: 'انترنت عالي السرعة',
            icon: <IoWifiSharp />,
        },
        {
            title: 'خدمة توصيل من و إلى المطار',
            icon: <BsAirplane />,
        },
    ]

    const getrestuarant = async () => {
        try {
            setLoading(true);
            const response = await restaurantServices.getRestaurantByID(id);
            setRestuarant(response.data);
            console.log('restuarant response', response.data);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getrestuarant();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (restuarant) {
            setImages(restuarant.images.map((str) =>  str));
        }
        setLoading(false);
        console.log('restuarant Images', restuarantImages);
    }, [restuarant]);
    return (
        <>
            {!loading && restuarant &&
                <div className='place-details-restaurant'>
                    <div className="place-hero" style={{ backgroundImage: `url(${mainURL + restuarant.cover_image})` }}></div>
                    <div className="details-content">
                        <div className="place-header">
                            <div className="place-title">
                                <h1>{restuarant.name}</h1>
                                <div className="rate-location-container">
                                    <div className="place-rating-container">
                                        <GetRateStars rating={4} />
                                    </div>
                                    <div className="place-location">
                                        <CiLocationOn />
                                        <p className='m-0'>{restuarant.city + " - " + restuarant.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="place-logo">
                                <img src={mainURL + restuarant.logo} alt="place-logo" />
                            </div>
                        </div>
                        <div className="place-description">
                            <p className='m-0'> {restuarant.secondary_description.split('.').join('.\n\n').split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</p>

                        </div>
                        <div className="place-gallery">
                            <PhotoSlider imgs={restuarantImages} />
                        </div>
                        <div className='green-line' ></div>
                        <div className="detail-rating-services">
                            <SectionRating />
                            <ServiceSection services={restuarantServices} />
                            <div className="restaurant-images position-relative">
                                <img src={mainURL + restuarant.menu} alt="restaurant photo" />
                                <div className="restaurant-images-icon">
                                    <p className='m-0'>قائمة الطعام </p>
                                    <FaBookOpen />
                                </div>
                                <div className="book-button position-absolute">
                                    <Button btnText="إحجز الآن" radius={9} onClick={() => navigate(`/booking`)} />
                                </div>
                            </div>
                        </div>
                        <div className='green-line' ></div>
                        <ContactSection />
                    </div>
                </div >
            }
        </>
    )
}

export default PlaceDetailsRestaurant