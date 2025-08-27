"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProperty, useUpdateProperty } from "@/hooks/propertyHooks";
import {
    PROPERTY_TYPES,
    PROPERTY_TYPE_LABELS,
    PRIVATE_AMENITIES,
    COMMON_AMENITIES,
    PrivateAmenity,
    CommonAmenity,
} from "@/constants/propertyConstants";
import {
    PropertyFormInput,
    PropertyFormValues,
    propertySchema,
} from "@/schemas/propertySchema";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaTimes as X } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { PropertyImage } from "@prisma/client";

interface PropertyFormProps {
    defaultValues?: PropertyFormValues;
}

export default function PropertyForm({ defaultValues }: PropertyFormProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);

    // Estado para imagens existentes (vindas do BD) e novas (arquivos locais)
    const [existingImages, setExistingImages] = useState<PropertyImage[]>(
        (defaultValues?.images ?? []).map((img) => ({
            id: img.id ?? crypto.randomUUID(),
            url: img.url,
            width: (img as any).width ?? null,
            height: (img as any).height ?? null,
            sortOrder: (img as any).sortOrder ?? null,
            propertyId: defaultValues?.id ?? "",
            storagePath: null,
            fileName: null,
            mimeType: null,
            fileSize: null,
            altText: null,
            caption: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }))
    );
    const [newImages, setNewImages] = useState<File[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);

    // useForm tipado + defaults coerentes com o schema
    // antes:
    // const { ... } = useForm<PropertyFormValues>({ resolver: zodResolver(propertySchema), ... });

    // depois:
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<PropertyFormInput, any, PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            // <-- defaultValues devem ser compatíveis com o TFieldValues (input),
            // então tudo bem mandar number/string; coerce vai parsear.
            ...defaultValues,
            status: defaultValues?.status ?? "FOR_SALE",
            type: defaultValues?.type ?? "APARTMENT",
            price: defaultValues?.price ?? 0,

            // latitude/longitude como string (input é string no schema)
            latitude:
                (defaultValues as any)?.latitude != null
                    ? String((defaultValues as any).latitude)
                    : "",
            longitude:
                (defaultValues as any)?.longitude != null
                    ? String((defaultValues as any).longitude)
                    : "",

            // age é string no schema -> default para ""
            age:
                typeof defaultValues?.age === "string"
                    ? defaultValues?.age
                    : defaultValues?.age != null
                    ? String(defaultValues?.age)
                    : "",

            bedrooms: defaultValues?.bedrooms ?? 0,
            suites: defaultValues?.suites ?? 0,
            bathrooms: defaultValues?.bathrooms ?? 0,
            parkingSpaces: defaultValues?.parkingSpaces ?? 0,
            rooms: defaultValues?.rooms ?? 0,
            floor: defaultValues?.floor ?? 0,
            yearBuilt: defaultValues?.yearBuilt ?? 0,
            usableArea: defaultValues?.usableArea ?? 0,
            totalArea: defaultValues?.totalArea ?? 0,
            condoFee: defaultValues?.condoFee ?? 0,
            iptu: defaultValues?.iptu ?? 0,
            privateAmenities: defaultValues?.privateAmenities ?? [],
            commonAmenities: defaultValues?.commonAmenities ?? [],
            petsAllowed: defaultValues?.petsAllowed ?? false,
            furnished: defaultValues?.furnished ?? false,

            // não precisa setar images aqui; o grid usa estado local
        },
    });

    const { mutate: createProperty, isPending: isCreating } =
        useCreateProperty();
    const { mutate: updateProperty, isPending: isUpdating } =
        useUpdateProperty();

    // Remove imagem existente (marca para remoção no backend)
    const removeExistingImage = (imageId: string) => {
        setRemovedImages((prev) => [...prev, imageId]);
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    };

    // Remove nova imagem selecionada
    const removeNewImage = (index: number) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit: SubmitHandler<PropertyFormValues> = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== "images") {
                let value = (data as Record<string, any>)[key];
                if (key === "privateAmenities" || key === "commonAmenities") {
                    value = JSON.stringify(value || []);
                }
                if (value === undefined || value === null) {
                    formData.append(key, "");
                } else if (value instanceof Blob) {
                    formData.append(key, value);
                } else if (typeof value === "string") {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value)); // number/boolean -> string
                }
            }
        });

        removedImages.forEach((id) => formData.append("removedImages", id));
        newImages.forEach((file) => formData.append("images", file));

        if (defaultValues?.id) {
            updateProperty(
                { id: defaultValues.id, data: formData },
                {
                    onSuccess: () => {
                        router.push("/admin/imoveis");
                        router.refresh();
                    },
                    onError: (e) => {
                        console.error("Erro ao atualizar imóvel:", e);
                        alert(
                            "Ocorreu um erro ao atualizar o imóvel. Por favor, tente novamente."
                        );
                    },
                }
            );
        } else {
            createProperty(formData, {
                onSuccess: () => router.push("/admin/imoveis"),
                onError: (e) => {
                    console.error("Erro ao criar imóvel:", e);
                    alert(
                        "Ocorreu um erro ao criar o imóvel. Por favor, tente novamente."
                    );
                },
            });
        }
    };

    // Dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        maxSize: 20 * 1024 * 1024, // 20MB
        onDrop: (acceptedFiles, fileRejections) => {
            const totalImages =
                existingImages.length + newImages.length + acceptedFiles.length;
            if (totalImages > 10) {
                alert(
                    `Você pode adicionar no máximo 10 imagens no total. Você já tem ${
                        existingImages.length + newImages.length
                    } e está tentando adicionar ${acceptedFiles.length} mais.`
                );
                return;
            }

            setNewImages((prev) => [...prev, ...acceptedFiles]);

            fileRejections.forEach(({ file, errors }) => {
                errors.forEach(({ code, message }) => {
                    if (code === "file-invalid-type") {
                        alert(
                            `O arquivo ${file.name} não é um formato de imagem suportado. Formatos aceitos: JPG, JPEG, PNG, WEBP.`
                        );
                    } else if (code === "file-too-large") {
                        alert(
                            `O arquivo ${file.name} é muito grande. O tamanho máximo é 20MB.`
                        );
                    } else {
                        alert(
                            `Erro ao fazer upload do arquivo ${file.name}: ${message}`
                        );
                    }
                });
            });
        },
    });

    const togglePrivateAmenity = (amenity: PrivateAmenity) => {
        const current = watch("privateAmenities") || [];
        if (current.includes(amenity)) {
            setValue(
                "privateAmenities",
                current.filter((a: PrivateAmenity) => a !== amenity)
            );
        } else {
            setValue("privateAmenities", [...current, amenity]);
        }
    };

    const toggleCommonAmenity = (amenity: CommonAmenity) => {
        const current = watch("commonAmenities") || [];
        if (current.includes(amenity)) {
            setValue(
                "commonAmenities",
                current.filter((a: CommonAmenity) => a !== amenity)
            );
        } else {
            setValue("commonAmenities", [...current, amenity]);
        }
    };

    return (
        <div className="submit-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-submit">
                    <div className="submit-section">
                        <div className="row">
                            <Tabs
                                selectedIndex={activeTab}
                                onSelect={setActiveTab}
                            >
                                <TabList className="nav mb-4 tab-list">
                                    {[
                                        "Dados Gerais",
                                        "Localização",
                                        "Características",
                                        "Amenidades & Fotos",
                                    ].map((label, idx) => (
                                        <Tab
                                            key={idx}
                                            className="nav-link text-secondary px-3"
                                            selectedClassName="active"
                                        >
                                            {label}
                                        </Tab>
                                    ))}
                                </TabList>

                                <style jsx global>{`
                                    .tab-list {
                                        border-bottom: 1px solid #0d3a78 !important;
                                    }
                                    .tab-list .nav-link {
                                        border: none !important;
                                        padding-top: 0.5rem !important;
                                        padding-bottom: 0.9rem !important;
                                    }
                                    .tab-list .nav-link.active {
                                        color: #0d3a78 !important;
                                        font-weight: 600;
                                        border: 1px solid #0d3a78 !important;
                                        border-bottom: 1px solid white !important;
                                        border-radius: 0.25rem 0.25rem 0 0 !important;
                                        margin-bottom: -1px !important;
                                    }
                                `}</style>

                                {/* Dados Gerais */}
                                <TabPanel>
                                    <div className="form-submit">
                                        <h3>Dados Gerais</h3>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <label>
                                                        Título do Imóvel *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.title
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        {...register("title")}
                                                    />
                                                    {errors.title && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.title
                                                                    .message
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label>Status *</label>
                                                    <select
                                                        className={`form-control ${
                                                            errors.status
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        {...register("status")}
                                                    >
                                                        <option value="FOR_RENT">
                                                            Para Alugar
                                                        </option>
                                                        <option value="FOR_SALE">
                                                            Para Venda
                                                        </option>
                                                    </select>
                                                    {errors.status && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.status
                                                                    .message
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Tipo de Imóvel *
                                                    </label>
                                                    <select
                                                        className={`form-control ${
                                                            errors.type
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        {...register("type")}
                                                    >
                                                        {PROPERTY_TYPES.map(
                                                            (t) => (
                                                                <option
                                                                    key={t}
                                                                    value={t}
                                                                >
                                                                    {
                                                                        PROPERTY_TYPE_LABELS[
                                                                            t
                                                                        ]
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    {errors.type && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.type
                                                                    .message
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label>Preço *</label>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${
                                                            errors.price
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        {...register("price", {
                                                            valueAsNumber: true,
                                                        })}
                                                    />
                                                    {errors.price && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.price
                                                                    .message
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Código de Referência
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register(
                                                            "referenceCode"
                                                        )}
                                                    />
                                                </div>

                                                <div className="form-group col-md-12">
                                                    <label>Descrição</label>
                                                    <textarea
                                                        className={`form-control h-120 ${
                                                            errors.description
                                                                ? "is-invalid"
                                                                : ""
                                                        }`}
                                                        {...register(
                                                            "description"
                                                        )}
                                                    />
                                                    {errors.description && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors
                                                                    .description
                                                                    .message
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                {/* Localização */}
                                <TabPanel>
                                    <div className="form-submit">
                                        <h3>Localização</h3>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                {[
                                                    {
                                                        field: "street",
                                                        label: "Rua",
                                                    },
                                                    {
                                                        field: "number",
                                                        label: "Número",
                                                    },
                                                    {
                                                        field: "neighborhood",
                                                        label: "Bairro",
                                                    },
                                                    {
                                                        field: "city",
                                                        label: "Cidade",
                                                    },
                                                    {
                                                        field: "state",
                                                        label: "Estado",
                                                    },
                                                    {
                                                        field: "zipCode",
                                                        label: "CEP",
                                                    },
                                                    {
                                                        field: "latitude",
                                                        label: "Latitude",
                                                    },
                                                    {
                                                        field: "longitude",
                                                        label: "Longitude",
                                                    },
                                                ].map(({ field, label }) => (
                                                    <div
                                                        key={field}
                                                        className="form-group col-md-6"
                                                    >
                                                        <label>{label}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            {...register(
                                                                field as any
                                                            )}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                {/* Características */}
                                <TabPanel>
                                    <div className="form-submit">
                                        <h3>Características</h3>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                {[
                                                    {
                                                        field: "bedrooms",
                                                        label: "Quartos",
                                                    },
                                                    {
                                                        field: "suites",
                                                        label: "Suítes",
                                                    },
                                                    {
                                                        field: "bathrooms",
                                                        label: "Banheiros",
                                                    },
                                                    {
                                                        field: "parkingSpaces",
                                                        label: "Vagas de Garagem",
                                                    },
                                                    {
                                                        field: "rooms",
                                                        label: "Cômodos",
                                                    },
                                                    {
                                                        field: "floor",
                                                        label: "Andar",
                                                    },
                                                    {
                                                        field: "yearBuilt",
                                                        label: "Ano de Construção",
                                                    },
                                                    {
                                                        field: "usableArea",
                                                        label: "Área Utilizável (m²)",
                                                    },
                                                    {
                                                        field: "totalArea",
                                                        label: "Área Total (m²)",
                                                    },
                                                    {
                                                        field: "condoFee",
                                                        label: "Condomínio (R$)",
                                                    },
                                                    {
                                                        field: "iptu",
                                                        label: "IPTU (R$)",
                                                    },
                                                ].map(({ field, label }) => (
                                                    <div
                                                        key={field}
                                                        className="form-group col-md-6"
                                                    >
                                                        <label>{label}</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            {...register(
                                                                field as any,
                                                                {
                                                                    valueAsNumber:
                                                                        true,
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                ))}

                                                {/* age é string -> input de texto */}
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Idade do Imóvel
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register("age")}
                                                    />
                                                    {errors.age && (
                                                        <div className="invalid-feedback d-block">
                                                            {String(
                                                                errors.age
                                                                    .message
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                {/* Amenidades & Fotos */}
                                <TabPanel>
                                    <div className="form-submit">
                                        <h3>Amenidades & Fotos</h3>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5>
                                                        Amenidades Privativas
                                                    </h5>
                                                    {PRIVATE_AMENITIES.map(
                                                        (amenity) => (
                                                            <div
                                                                key={amenity}
                                                                className="form-check"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`priv-${amenity}`}
                                                                    checked={
                                                                        watch(
                                                                            "privateAmenities"
                                                                        )?.includes(
                                                                            amenity
                                                                        ) ??
                                                                        false
                                                                    }
                                                                    onChange={() =>
                                                                        togglePrivateAmenity(
                                                                            amenity
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`priv-${amenity}`}
                                                                >
                                                                    {amenity}
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                <div className="col-md-6">
                                                    <h5>Amenidades Comuns</h5>
                                                    {COMMON_AMENITIES.map(
                                                        (amenity) => (
                                                            <div
                                                                key={amenity}
                                                                className="form-check"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`comm-${amenity}`}
                                                                    checked={
                                                                        watch(
                                                                            "commonAmenities"
                                                                        )?.includes(
                                                                            amenity
                                                                        ) ??
                                                                        false
                                                                    }
                                                                    onChange={() =>
                                                                        toggleCommonAmenity(
                                                                            amenity
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`comm-${amenity}`}
                                                                >
                                                                    {amenity}
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="petsAllowed"
                                                            {...register(
                                                                "petsAllowed"
                                                            )}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="petsAllowed"
                                                        >
                                                            Aceita Animais
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="furnished"
                                                            {...register(
                                                                "furnished"
                                                            )}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="furnished"
                                                        >
                                                            Mobiliado
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="form-group col-md-12 mt-4">
                                                    <label>
                                                        Fotos do Imóvel
                                                    </label>
                                                    <div
                                                        {...getRootProps()}
                                                        className="dropzone dz-clickable primary-dropzone"
                                                    >
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        <div className="dz-default dz-message text-center">
                                                            <i
                                                                className="fa-solid fa-images"
                                                                style={{
                                                                    fontSize:
                                                                        "48px",
                                                                }}
                                                            />
                                                            <p>
                                                                Arraste e solte
                                                                ou clique para
                                                                selecionar
                                                            </p>
                                                            <small className="text-muted">
                                                                Máx. 20MB por
                                                                imagem
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-wrap gap-2 mt-3">
                                                        {/* Imagens existentes */}
                                                        {existingImages.map(
                                                            (image) => (
                                                                <div
                                                                    key={
                                                                        image.id
                                                                    }
                                                                    className="dz-image position-relative"
                                                                >
                                                                    <img
                                                                        src={
                                                                            image.url
                                                                        }
                                                                        alt={`Imagem existente ${image.id}`}
                                                                        style={{
                                                                            width: 120,
                                                                            height: 120,
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius: 15,
                                                                        }}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger position-absolute"
                                                                        style={{
                                                                            top: 5,
                                                                            right: 5,
                                                                        }}
                                                                        onClick={() =>
                                                                            removeExistingImage(
                                                                                image.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <X
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    </button>
                                                                </div>
                                                            )
                                                        )}

                                                        {/* Novas imagens */}
                                                        {newImages.map(
                                                            (file, i) => {
                                                                const src =
                                                                    URL.createObjectURL(
                                                                        file
                                                                    );
                                                                return (
                                                                    <div
                                                                        key={`new-${i}`}
                                                                        className="dz-image position-relative"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                src
                                                                            }
                                                                            alt={`Nova imagem ${
                                                                                i +
                                                                                1
                                                                            }`}
                                                                            style={{
                                                                                width: 120,
                                                                                height: 120,
                                                                                objectFit:
                                                                                    "cover",
                                                                                borderRadius: 15,
                                                                            }}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-danger position-absolute"
                                                                            style={{
                                                                                top: 5,
                                                                                right: 5,
                                                                            }}
                                                                            onClick={() =>
                                                                                removeNewImage(
                                                                                    i
                                                                                )
                                                                            }
                                                                        >
                                                                            <X
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>

                            <div className="form-group col-lg-12 mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary full-width fw-medium px-5"
                                    disabled={isCreating || isUpdating}
                                >
                                    {isCreating || isUpdating ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            />{" "}
                                            {defaultValues?.id
                                                ? "Atualizando..."
                                                : "Criando..."}
                                        </>
                                    ) : defaultValues?.id ? (
                                        "Atualizar Imóvel"
                                    ) : (
                                        "Publicar Imóvel"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
