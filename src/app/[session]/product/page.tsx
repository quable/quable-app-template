"use client";
import { useTranslations } from "next-intl";
import { DataTable, EmptyState } from "@quable/ui";
import { useQuery } from "@tanstack/react-query";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { getProducts } from "@/lib/actions/products";
import Image from "next/image";

export const ProductsPage = () => {
  const t = useTranslations("products_page");
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        if (!params.value) return <></>;
        return (
          <Image
            src={params.value}
            alt={params.row.name}
            width={100}
            height={100}
          />
        );
      },
    },
    {
      field: "code",
      headerName: t("columns.product_code"),
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "name",
      headerName: t("columns.product_name"),
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "productType",
      headerName: t("columns.product_type"),
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      align: "right",
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <OpenInNew
              sx={{ ml: 1, cursor: "pointer", color: "text.secondary" }}
              fontSize="small"
              onClick={() =>
                window.open(
                  params.row.directUrl,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <Typography sx={{ mb: 2 }} fontWeight={600} variant="body-lg">
        {t("title")}
      </Typography>
      <DataTable
        loading={isLoading}
        columns={columns}
        rowCount={products?.length || 0}
        rows={products || []}
        getRowId={(row) => row.code}
        rootProps={{ className: "products-page-list-wrapper" }}
        slotProps={{
          footer: {
            getRowCountText(count) {
              return t("footer.row_count", { count });
            },
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <EmptyState
              title={t("no_products")}
              description={t("no_products_description")}
            />
          ),
        }}
      />
    </div>
  );
};

export default ProductsPage;
