"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar({ transparent }: { transparent: any }) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                            <Link className="" href="/">
                                <Image
                                    src="/img/logo-labanca.png"
                                    width={250}
                                    height={50}
                                    alt="Resido Logo"
                                />
                                {/* <h5 className="fs-3 fw-bold ms-1 my-0">
                                    Labanca
                                </h5> */}
                            </Link>
                            <div
                                className="nav-toggle"
                                onClick={() => setIsToggle(!toggle)}
                            ></div>
                            {/* <div className="mobile_nav">
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
                            </div> */}
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
                            <ul className="nav-menu align-to-right ">
                                <li
                                    className={`${
                                        current === "/" ? "active" : ""
                                    } `}
                                >
                                    <Link className="menu-font" href="/">
                                        Início
                                    </Link>
                                </li>
                                <li
                                    className={`${
                                        current === "/imoveis" ? "active" : ""
                                    }`}
                                >
                                    <Link className="menu-font" href="/imoveis">
                                        Imóveis
                                    </Link>
                                </li>
                                <li
                                    className={`${
                                        current === "/contato" ? "active" : ""
                                    }`}
                                >
                                    <Link className="menu-font" href="/contato">
                                        Contato
                                    </Link>
                                </li>
                                <li>
                                    {session ? (
                                        <Link
                                            href="/admin/perfil"
                                            className="fw-medium menu-font"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target="#login"
                                            className="fw-medium menu-font"
                                            onClick={() => setLogin(!login)}
                                        >
                                            Entrar
                                        </Link>
                                    )}
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
                                <div className="d-flex align-items-center justify-content-center mt-3 mb-5">
                                    <Image
                                        src="/img/logo-labanca.png"
                                        width={250}
                                        height={50}
                                        alt="Resido Logo"
                                    />
                                </div>
                                <h4 className="modal-header-title">Login</h4>
                                {error && (
                                    <div
                                        className="alert alert-danger border-0 rounded-2 mt-2 py-2 px-3 small w-100 text-center"
                                        role="alert"
                                        style={{
                                            background: "#fff4f4",
                                        }}
                                    >
                                        {error}
                                    </div>
                                )}

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
                                        </div>

                                        {/* <div className="form-group mb-3">
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
                                        </div> */}

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
                                                        setError(
                                                            "Login ou senha inválidos"
                                                        );
                                                    } else {
                                                        setLogin(false);
                                                        router.push(
                                                            "/admin/perfil"
                                                        );
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
                                {/* <div className="modal-divider">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
