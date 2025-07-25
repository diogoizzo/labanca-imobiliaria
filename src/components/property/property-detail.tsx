"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const Select = dynamic(() => import("react-select"), { ssr: false });

import ModalVideo from "react-modal-video";
import Lightbox from "react-18-image-lightbox";

import { galleryImg, propertyFeature } from "../../app/data/property";

import "../../../node_modules/react-modal-video/css/modal-video.css";
import "../../../node_modules/react-18-image-lightbox/style.css";

export default function PropertyDetail() {
    const [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState<boolean>(true);
    let [open2, setOpen2] = useState<boolean>(true);
    let [open3, setOpen3] = useState<boolean>(true);
    let [open4, setOpen4] = useState<boolean>(false);
    let [open5, setOpen5] = useState<boolean>(false);
    let [open6, setOpen6] = useState<boolean>(false);
    let [open7, setOpen7] = useState<boolean>(false);
    let [open8, setOpen8] = useState<boolean>(true);
    let [open9, setOpen9] = useState<boolean>(true);
    let [open10, setOpen10] = useState<boolean>(true);
    let [show, setShow] = useState<boolean>(false);
    let [show2, setShow2] = useState<boolean>(false);
    let [show3, setShow3] = useState<boolean>(false);

    let [activeIndex, setActiveIndex] = useState<number>(0);
    let [photo, setPhoto] = useState<boolean>(false);

    const onImageClick = (index: number) => {
        setActiveIndex(index);
        setPhoto(true);
    };

    const rating = [
        { value: "1", label: "01 Star" },
        { value: "1", label: "02 Star" },
        { value: "1", label: "03 Star" },
        { value: "1", label: "04 Star" },
        { value: "1", label: "05 Star" },
    ];

    return (
        <>
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen(!open)}
                        className={open ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">
                            Detalhes e Características
                        </h4>
                    </Link>
                </div>
                <div
                    id="clOne"
                    className={`panel-collapse collapse ${open ? "show" : ""}`}
                >
                    <div className="block-body">
                        <ul className="deatil_features">
                            {propertyFeature.map((item: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <strong>{item.title}</strong>
                                        {item.value}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen2(!open2)}
                        className={open2 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Descrição</h4>
                    </Link>
                </div>
                <div
                    id="clTwo"
                    className={`panel-collapse collapse ${open2 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <p>
                            Este imóvel excepcional oferece o equilíbrio
                            perfeito entre conforto, estilo e conveniência.
                            Localizado em uma das áreas mais desejadas de Barra
                            do Piraí, ele é ideal para quem busca qualidade de
                            vida e praticidade.
                        </p>
                        <p>
                            Com acabamentos de alta qualidade e um design
                            moderno, cada detalhe foi pensado para proporcionar
                            o máximo de bem-estar. Desfrute de espaços amplos e
                            bem iluminados, perfeitos para relaxar ou receber
                            amigos e familiares.
                        </p>
                    </div>
                </div>
            </div>

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen3(!open3)}
                        className={open3 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Comodidades</h4>
                    </Link>
                </div>
                <div
                    id="clThree"
                    className={`panel-collapse collapse ${open3 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <ul className="avl-features third color">
                            <li>Ar Condicionado</li>
                            <li>Piscina</li>
                            <li>Aquecimento Central</li>
                            <li>Lavanderia</li>
                            <li>Academia</li>
                            <li>Alarme</li>
                            <li>Cobertura de Janela</li>
                            <li>Internet</li>
                            <li>Permite Animais</li>
                            <li>Wi-Fi Grátis</li>
                            <li>Estacionamento</li>
                            <li>Spa & Massagem</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen4(!open4)}
                        className={open4 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">
                            Vídeo da Propriedade
                        </h4>
                    </Link>
                </div>

                <div
                    id="clFour"
                    className={`panel-collapse collapse ${open4 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <div className="property_video">
                            <div className="thumb">
                                <Image
                                    className="pro_img img-fluid w100"
                                    src="/img/pl-6.jpg"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: "100%", height: "auto" }}
                                    alt="7.jpg"
                                />
                                <div className="overlay_icon">
                                    <div className="bb-video-box">
                                        <div className="bb-video-box-inner">
                                            <div className="bb-video-box-innerup">
                                                <Link
                                                    href="#"
                                                    onClick={() =>
                                                        setIsOpen(true)
                                                    }
                                                    className="text-primary"
                                                >
                                                    <i className="fa-solid fa-play"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalVideo
                    channel="youtube"
                    youtube={{ mute: 0, autoplay: 0 }}
                    isOpen={isOpen}
                    videoId="yba7hPeTSjk"
                    onClose={() => setIsOpen(false)}
                />
            </div>

            {/* <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen5(!open5)}
                        className={open5 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Planta Baixa</h4>
                    </Link>
                </div>
                <div
                    id="clFive"
                    className={`panel-collapse collapse ${open5 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <div className="accordion" id="floor-option">
                            <div className="card">
                                <div className="card-header" id="firstFloor">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            onClick={() => setShow(!show)}
                                            className={`btn btn-link ${
                                                show ? "" : "collapsed"
                                            }`}
                                        >
                                            Primeiro Andar<span>740 m²</span>
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="firstfloor"
                                    className={`collapse ${show ? "show" : ""}`}
                                >
                                    <div className="card-body">
                                        <Image
                                            src="/img/floor.jpg"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="seconfFloor">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            onClick={() => setShow2(!show2)}
                                            className={`btn btn-link ${
                                                show2 ? "" : "collapsed"
                                            }`}
                                        >
                                            Segundo Andar<span>710 m²</span>
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="secondfloor"
                                    className={`collapse ${
                                        show2 ? "show" : ""
                                    }`}
                                >
                                    <div className="card-body">
                                        <Image
                                            src="/img/floor.jpg"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="third-garage">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            onClick={() => setShow3(!show3)}
                                            className={`btn btn-link ${
                                                show3 ? "" : "collapsed"
                                            }`}
                                        >
                                            Garagem<span>520 m²</span>
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="garages"
                                    className={`collapse ${
                                        show3 ? "show" : ""
                                    }`}
                                >
                                    <div className="card-body">
                                        <Image
                                            src="/img/floor.jpg"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen6(!open6)}
                        className={open6 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Localização</h4>
                    </Link>
                </div>
                <div
                    id="clSix"
                    className={`panel-collapse collapse ${open6 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.3838103135677!2d80.87929001488125!3d26.827742183164247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfe8bc34b51bb%3A0xa3ca86eec63f6f8!2sINFOSYS%20DIGITAL%20COMPUTER%20(Prabhat%20Computer%20Classes)!5e0!3m2!1sen!2sin!4v1680238790732!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: "0" }}
                                loading="lazy"
                                title="myframe"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen7(!open7)}
                        className={open7 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Galeria</h4>
                    </Link>
                </div>

                <div
                    id="clSev"
                    className={`panel-collapse collapse ${open7 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <ul className="list-gallery-inline">
                            {galleryImg.map((item: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            href="#"
                                            className="mfp-gallery"
                                            onClick={() => onImageClick(index)}
                                        >
                                            <Image
                                                src={item}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                                className="img-fluid mx-auto"
                                                alt=""
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {photo && (
                            <Lightbox
                                mainSrc={galleryImg[activeIndex]}
                                nextSrc={
                                    galleryImg[
                                        (activeIndex + 1) % galleryImg.length
                                    ]
                                }
                                prevSrc={
                                    galleryImg[
                                        (activeIndex + galleryImg.length - 1) %
                                            galleryImg.length
                                    ]
                                }
                                onCloseRequest={() => setPhoto(false)}
                                onMovePrevRequest={() =>
                                    setActiveIndex(
                                        (activeIndex + galleryImg.length - 1) %
                                            galleryImg.length
                                    )
                                }
                                onMoveNextRequest={() =>
                                    setActiveIndex(
                                        (activeIndex + 1) % galleryImg.length
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* <div className="rating-overview">
                <div className="rating-overview-box">
                    <span className="rating-overview-box-total">4.2</span>
                    <span className="rating-overview-box-percent">de 5.0</span>
                    <div className="star-rating" data-rating="5">
                        <i className="fas fa-star fs-xs mx-1"></i>
                        <i className="fas fa-star fs-xs mx-1"></i>
                        <i className="fas fa-star fs-xs mx-1"></i>
                        <i className="fas fa-star fs-xs mx-1"></i>
                        <i className="fas fa-star fs-xs mx-1"></i>
                    </div>
                </div>

                <div className="rating-bars">
                    <div className="rating-bars-item">
                        <span className="rating-bars-name">Serviço</span>
                        <span className="rating-bars-inner">
                            <span
                                className="rating-bars-rating high"
                                data-rating="4.7"
                            >
                                <span
                                    className="rating-bars-rating-inner"
                                    style={{ width: "85%" }}
                                ></span>
                            </span>
                            <strong>4.7</strong>
                        </span>
                    </div>
                    <div className="rating-bars-item">
                        <span className="rating-bars-name">
                            Custo-benefício
                        </span>
                        <span className="rating-bars-inner">
                            <span
                                className="rating-bars-rating good"
                                data-rating="3.9"
                            >
                                <span
                                    className="rating-bars-rating-inner"
                                    style={{ width: "75%" }}
                                ></span>
                            </span>
                            <strong>3.9</strong>
                        </span>
                    </div>
                    <div className="rating-bars-item">
                        <span className="rating-bars-name">Localização</span>
                        <span className="rating-bars-inner">
                            <span
                                className="rating-bars-rating mid"
                                data-rating="3.2"
                            >
                                <span
                                    className="rating-bars-rating-inner"
                                    style={{ width: "52.2%" }}
                                ></span>
                            </span>
                            <strong>3.2</strong>
                        </span>
                    </div>
                    <div className="rating-bars-item">
                        <span className="rating-bars-name">Limpeza</span>
                        <span className="rating-bars-inner">
                            <span
                                className="rating-bars-rating poor"
                                data-rating="2.0"
                            >
                                <span
                                    className="rating-bars-rating-inner"
                                    style={{ width: "20%" }}
                                ></span>
                            </span>
                            <strong>2.0</strong>
                        </span>
                    </div>
                </div>
            </div> */}

            {/* <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen8(!open8)}
                        className={open8 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">102 Avaliações</h4>
                    </Link>
                </div>
                <div
                    id="clEight"
                    className={`panel-collapse collapse ${open8 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <div className="author-review">
                            <div className="comment-list">
                                <ul>
                                    <li className="article_comments_wrap">
                                        <article>
                                            <div className="article_comments_thumb">
                                                <Image
                                                    src="/img/user-1.jpg"
                                                    width={80}
                                                    height={80}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="comment-details">
                                                <div className="comment-meta">
                                                    <div className="comment-left-meta">
                                                        <h4 className="author-name">
                                                            Rosalina Kelian
                                                        </h4>
                                                        <div className="comment-date">
                                                            19 de Junho de 2025
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-text">
                                                    <p>
                                                        Excepteur sint occaecat
                                                        cupidatat non proident,
                                                        sunt in culpa qui
                                                        officia deserunt mollit
                                                        anim laborumab.
                                                        perspiciatis unde omnis
                                                        iste natus error.
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                    <li className="article_comments_wrap">
                                        <article>
                                            <div className="article_comments_thumb">
                                                <Image
                                                    src="/img/user-5.jpg"
                                                    width={80}
                                                    height={80}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="comment-details">
                                                <div className="comment-meta">
                                                    <div className="comment-left-meta">
                                                        <h4 className="author-name">
                                                            Rosalina Kelian
                                                        </h4>
                                                        <div className="comment-date">
                                                            15 de Maio de 2025
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="comment-text">
                                                    <p>
                                                        Excepteur sint occaecat
                                                        cupidatat non proident,
                                                        sunt in culpa qui
                                                        officia deserunt mollit
                                                        anim laborumab.
                                                        perspiciatis unde omnis
                                                        iste natus error.
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link
                            href="#"
                            scroll={false}
                            className="reviews-checked text-primary"
                        >
                            <i className="fas fa-arrow-alt-circle-down mr-2"></i>
                            Ver Mais Avaliações
                        </Link>
                    </div>
                </div>
            </div> */}

            {/* <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen9(!open9)}
                        className={open9 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Próximo</h4>
                    </Link>
                </div>
                <div
                    id="clNine"
                    className={`panel-collapse collapse ${open9 ? "show" : ""}`}
                >
                    <div className="block-body">
                        <div className="nearby-wrap">
                            <div className="nearby_header">
                                <div className="nearby_header_first">
                                    <h5>Escolas Próximas</h5>
                                </div>
                                <div className="nearby_header_last">
                                    <div className="nearby_powerd">
                                        Desenvolvido por{" "}
                                        <img
                                            src="/img/edu.png"
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="neary_section_list">
                                <div className="neary_section">
                                    <div className="neary_section_first">
                                        <h4 className="nearby_place_title">
                                            Escola Ilha Verde
                                            <small>(3.52 km)</small>
                                        </h4>
                                    </div>
                                    <div className="neary_section_last">
                                        <div className="nearby_place_rate">
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <small className="reviews-count">
                                            (421 Avaliações)
                                        </small>
                                    </div>
                                </div>

                                <div className="neary_section">
                                    <div className="neary_section_first">
                                        <h4 className="nearby_place_title">
                                            Colégio Intermediário Ragni
                                            <small>(0.52 km)</small>
                                        </h4>
                                    </div>
                                    <div className="neary_section_last">
                                        <div className="nearby_place_rate">
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star-half filled"></i>
                                        </div>
                                        <small className="reviews-count">
                                            (470 Avaliações)
                                        </small>
                                    </div>
                                </div>

                                <div className="neary_section">
                                    <div className="neary_section_first">
                                        <h4 className="nearby_place_title">
                                            Escola Primária Rose Wood
                                            <small>(0.47 km)</small>
                                        </h4>
                                    </div>
                                    <div className="neary_section_last">
                                        <div className="nearby_place_rate">
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <small className="reviews-count">
                                            (204 Avaliações)
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="nearby-wrap">
                            <div className="nearby_header">
                                <div className="nearby_header_first">
                                    <h5>Alimentação Próxima</h5>
                                </div>
                                <div className="nearby_header_last">
                                    <div className="nearby_powerd">
                                        Desenvolvido por{" "}
                                        <img
                                            src="/img/food.png"
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="neary_section_list">
                                <div className="neary_section">
                                    <div className="neary_section_first">
                                        <h4 className="nearby_place_title">
                                            Hotel The Rise
                                            <small>(2.42 km)</small>
                                        </h4>
                                    </div>
                                    <div className="neary_section_last">
                                        <div className="nearby_place_rate">
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                        </div>
                                        <small className="reviews-count">
                                            (105 Avaliações)
                                        </small>
                                    </div>
                                </div>

                                <div className="neary_section">
                                    <div className="neary_section_first">
                                        <h4 className="nearby_place_title">
                                            Bar e Restaurante Blue Ocean
                                            <small>(1.52 km)</small>
                                        </h4>
                                    </div>
                                    <div className="neary_section_last">
                                        <div className="nearby_place_rate">
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star filled"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <small className="reviews-count">
                                            (40 Avaliações)
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen10(!open10)}
                        className={open10 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">
                            Enviar Mensagem para o Corretor
                        </h4>
                    </Link>
                </div>
                <div
                    id="clTen"
                    className={`panel-collapse collapse ${
                        open10 ? "show" : ""
                    }`}
                >
                    <div className="block-body">
                        <form className="form-submit">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Seu Nome"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Seu E-mail"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control ht-80"
                                            placeholder="Mensagem"
                                        ></textarea>
                                    </div>
                                </div>
                                {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <Select
                                            options={rating}
                                            placeholder="Escolha a Avaliação"
                                            className="form-control"
                                        />
                                    </div>
                                </div> */}

                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary fw-medium px-lg-5 rounded"
                                            type="submit"
                                        >
                                            Enviar Mensagem
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
