"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar({ transparent }: { transparent: any }) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();
    const searchParams = useSearchParams();
    let [scroll, setScroll] = useState<boolean>(false);

    const location = usePathname();
    const current = location;

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.scrollTo(0, 0);

        // Auto-open login modal if URL has showLogin param
        if (searchParams.get("showLogin") === "true") {
            setLogin(true);
        }

        const handlerScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("scroll", handlerScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handlerScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [windowWidth]);

    return (
        <>
            <div
                className={`header ${scroll ? "header-fixed" : ""} ${
                    transparent
                        ? "header-transparent dark"
                        : "header-light head-shadow"
                }`}
            >
                <div className="container">
                    <nav
                        id="navigation "
                        className={
                            windowWidth > 991
                                ? "navigation navigation-landscape"
                                : "navigation navigation-portrait"
                        }
                    >
                        <div className="nav-header" style={{ lineHeight: "0" }}>
                            <Link className="nav-brand text-logo" href="/">
                                <Image
                                    src="/img/logo.svg"
                                    width={50}
                                    height={50}
                                    alt="Resido Logo"
                                />
                                <h5 className="fs-3 fw-bold ms-1 my-0">
                                    Labanca
                                </h5>
                            </Link>
                            <div
                                className="nav-toggle"
                                onClick={() => setIsToggle(!toggle)}
                            ></div>
                            <div className="mobile_nav">
                                <ul>
                                    <li>
                                        <Link
                                            href="#"
                                            onClick={() => setLogin(!login)}
                                        >
                                            <Image
                                                src="/img/svg/users.svg"
                                                width={35}
                                                height={35}
                                                alt="User Icon"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className={`nav-menus-wrapper  ${
                                toggle ? "nav-menus-wrapper-open" : ""
                            }`}
                            style={{
                                transitionProperty: toggle ? "none" : "left",
                            }}
                        >
                            <span
                                className="nav-menus-wrapper-close-button"
                                onClick={() => setIsToggle(!toggle)}
                            >
                                ✕
                            </span>
                            <ul className="nav-menu align-to-right">
                                <li
                                    className={`${
                                        current === "/" ? "active" : ""
                                    }`}
                                >
                                    <Link href="/">Início</Link>
                                </li>
                                <li
                                    className={`${
                                        current === "/imoveis" ? "active" : ""
                                    }`}
                                >
                                    <Link href="/imoveis">Imóveis</Link>
                                </li>
                                <li
                                    className={`${
                                        current === "/contato" ? "active" : ""
                                    }`}
                                >
                                    <Link href="/contato">Contato</Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#login"
                                        className="fw-medium text-muted-2"
                                        onClick={() => setLogin(!login)}
                                    >
                                        Entrar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="nav-overlay-panel"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: toggle ? "block" : "none",
                            }}
                        ></div>
                    </nav>
                </div>
            </div>
            <div className="clearfix"></div>

            {login && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "#0000008a" }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered login-pop-form"
                        role="document"
                    >
                        <div className="modal-content" id="registermodal">
                            <span
                                className="mod-close"
                                onClick={() => setLogin(!login)}
                            >
                                <span className="svg-icon text-primary svg-icon-2hx">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            opacity="0.3"
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="10"
                                            fill="currentColor"
                                        ></rect>
                                        <rect
                                            x="7"
                                            y="15.3137"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            transform="rotate(-45 7 15.3137)"
                                            fill="currentColor"
                                        ></rect>
                                        <rect
                                            x="8.41422"
                                            y="7"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            transform="rotate(45 8.41422 7)"
                                            fill="currentColor"
                                        ></rect>
                                    </svg>
                                </span>
                            </span>
                            <div className="modal-body">
                                <h4 className="modal-header-title">
                                    Acessar Conta
                                </h4>
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <span className="svg-icon text-primary svg-icon-2hx">
                                        <svg
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                opacity="0.3"
                                                d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <div className="login-form">
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="nome@exemplo.com"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                            <label>Endereço de E-mail</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Senha"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                            <label>Senha</label>
                                            {error && (
                                                <div className="text-danger small mt-2">
                                                    {error}
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="flex-shrink-0 flex-first">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="save-pass"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="save-pass"
                                                        >
                                                            Lembrar Senha
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 flex-first">
                                                    <Link
                                                        href="#"
                                                        className="link fw-medium"
                                                    >
                                                        Esqueceu a Senha?
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button
                                                type="button"
                                                className="btn btn-lg btn-primary fw-medium full-width rounded-2"
                                                onClick={async () => {
                                                    setLoading(true);
                                                    setError("");
                                                    const result = await signIn(
                                                        "credentials",
                                                        {
                                                            redirect: false,
                                                            email,
                                                            password,
                                                        }
                                                    );
                                                    if (result?.error) {
                                                        setError(result.error);
                                                    } else {
                                                        setLogin(false);
                                                    }
                                                    setLoading(false);
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                ) : null}
                                                Entrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-divider">
                                    <span>Ou acesse com</span>
                                </div>
                                <div className="social-login mb-3">
                                    <ul>
                                        <li>
                                            <Link
                                                href="#"
                                                className="btn connect-fb"
                                            >
                                                Facebook
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="btn connect-google"
                                            >
                                                Google
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <p className="mt-4">
                                        Não tem uma conta?{" "}
                                        <Link
                                            href="/create-account"
                                            className="link fw-medium"
                                        >
                                            Criar uma Conta
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
