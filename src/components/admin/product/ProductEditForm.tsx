"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslations } from "next-intl";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/products/productsApi";
import { useGetAllCategoriesQuery } from "@/redux/categories/categoriesApi";
import { useProductSchema } from "@/schemas/product";

interface ProductOption {
  id?: number;
  name: string;
  value: string;
  additional_price?: number;
}

interface ProductImage {
  id?: number;
  image_url: string;
  is_main: boolean;
}

interface ProductFormData {
  name: string;
  description: string;
  base_price: number;
  sku: string;
  stock_quantity: number;
  category_id: number;
}

interface ProductEditFormProps {
  productId?: number;
  initialData?: {
    name: string;
    description: string;
    base_price: number;
    sku: string;
    stock_quantity: number;
    category_id: number;
    options?: ProductOption[];
    images?: ProductImage[];
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const ProductEditForm = ({
  productId,
  initialData,
  setIsOpenModal,
}: ProductEditFormProps) => {
  const isEditing = Boolean(productId);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categoriesData } = useGetAllCategoriesQuery({});

  const [options, setOptions] = useState<ProductOption[]>(
    initialData?.options || []
  );

  const [images, setImages] = useState<ProductImage[]>(
    initialData?.images || []
  );

  const t = useTranslations();
  const schema = useProductSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      description: "",
      base_price: 0,
      sku: "",
      stock_quantity: 0,
      category_id: 0,
    },
  });

  const addOption = () => {
    setOptions([...options, { name: "", value: "", additional_price: 0 }]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (
    index: number,
    field: keyof ProductOption,
    value: string
  ) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setOptions(updatedOptions);
  };

  const addImage = () => {
    setImages([...images, { image_url: "", is_main: false }]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (
    index: number,
    field: keyof ProductImage,
    value: string
  ) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, [field]: value } : image
    );
    setImages(updatedImages);
  };

  const onSubmit = async (data: {
    name: string;
    description: string;
    base_price: number;
    sku: string;
    stock_quantity: number;
    category_id: number;
  }) => {
    const productData = {
      ...data,
      options: options
        .filter((option) => option.name.trim() && option.value.trim())
        .map((option) => ({
          id: option.id || 0,
          name: option.name,
          value: option.value,
          additional_price: option.additional_price || 0,
        })),
      images: images
        .filter((image) => image.image_url.trim() && image.is_main)
        .map((image) => ({
          id: image.id || 0,
          image_url: image.image_url,
          is_main: image.is_main,
        })),
    };

    if (isEditing) {
      updateProduct({ id: productId!, ...productData });
    } else {
      createProduct(productData);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing
          ? t("product.titleEditProduct")
          : t("product.titleCreateProduct")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("product.name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label={t("product.description")}
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            label={t("product.base_price")}
            {...register("base_price")}
            error={!!errors.base_price}
            helperText={errors.base_price?.message}
          />
          <TextField
            label={t("product.sku")}
            {...register("sku")}
            error={!!errors.sku}
            helperText={errors.sku?.message}
          />
          <TextField
            label={t("product.stock_quantity")}
            {...register("stock_quantity")}
            error={!!errors.stock_quantity}
            helperText={errors.stock_quantity?.message}
          />
          <FormControl fullWidth error={!!errors.category_id}>
            <InputLabel>{t("product.category_id")}</InputLabel>
            <Select
              {...register("category_id")}
              label={t("product.category_id")}
              defaultValue={initialData?.category_id || ""}
            >
              {categoriesData?.items.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.category_id && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, ml: 1.75 }}
              >
                {errors.category_id.message}
              </Typography>
            )}
          </FormControl>

          {/* Опції продукту */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Опції продукту
            </Typography>
            {options.map((option, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      label="Назва опції"
                      value={option.name}
                      onChange={(e) =>
                        updateOption(index, "name", e.target.value)
                      }
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Значення"
                      value={option.value}
                      onChange={(e) =>
                        updateOption(index, "value", e.target.value)
                      }
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Додаткова ціна"
                      type="number"
                      value={option.additional_price || 0}
                      onChange={(e) =>
                        updateOption(index, "additional_price", e.target.value)
                      }
                      size="small"
                      sx={{ flex: 0.5 }}
                    />
                    <IconButton
                      onClick={() => removeOption(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={addOption}
              variant="outlined"
              startIcon={<AddIcon />}
              size="small"
            >
              Додати опцію
            </Button>
          </Box>

          {/* Зображення продукту */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Зображення продукту
            </Typography>

            <RadioGroup
              value={images.findIndex((img) => img.is_main) ?? -1}
              onChange={(_, value) => {
                const selectedIndex = parseInt(value, 10);
                const updatedImages = images.map((img, i) => ({
                  ...img,
                  is_main: i === selectedIndex,
                }));
                setImages(updatedImages);
              }}
            >
              {images.map((image, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <TextField
                        label="URL зображення"
                        value={image.image_url}
                        onChange={(e) =>
                          updateImage(index, "image_url", e.target.value)
                        }
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <FormControlLabel
                        value={index}
                        control={<Radio color="primary" />}
                        label="Головне"
                      />

                      <IconButton
                        onClick={() => removeImage(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addImage}
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
              >
                Додати зображення
              </Button>
            </RadioGroup>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating
                ? t("actions.btnSaving")
                : t("actions.btnSave")}
            </Button>
            <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
              {t("actions.btnCancel")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
