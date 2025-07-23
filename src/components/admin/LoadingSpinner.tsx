"use client";
import React from "react";

export default function LoadingSpinner() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
        >
            <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
                <span className="visually-hidden">Carregando...</span>
            </div>
        </div>
    );
}
